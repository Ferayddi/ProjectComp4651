from pyspark.ml import Pipeline
from pyspark.ml.feature import SQLTransformer
from pyspark.sql import SparkSession
from pyspark.sql.functions import udf
from pyspark.sql.types import FloatType
from transformers import pipeline
import json
import sys

sentiment_analysis = pipeline("text-classification", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")

def analyze_sentiment(text):
    # Call the Hugging Face model to get sentiment score
    try:
        result = sentiment_analysis(text)[0]
        # Extract the score from the result
        if result['label'] == 'POSITIVE':
            score = result['score'] - (1 - result['score'])
        else:
            score = - result['score'] + (1 - result['score'])
        # Return the score
        return score
    except:
        return 0.0

def main(filepath, savepath):
    spark = SparkSession.builder \
        .appName("Sentiment Analysis with PySpark ML and Hugging Face") \
        .getOrCreate()
        
    text_df = spark.read.text(filepath).filter("trim(value) != ''")
    
    # Register the UDF with Spark
    analyze_sentiment_udf = udf(analyze_sentiment, FloatType())
    spark.udf.register("analyze_sentiment_udf", analyze_sentiment, FloatType())
    
    # Define SQL Transformer to add sentiment score column
    sql_transformer = SQLTransformer(
        statement="SELECT *, analyze_sentiment_udf(value) AS sentiment_score FROM __THIS__"
    )

    # Define the pipeline
    pipeline = Pipeline(stages=[sql_transformer])

    # Fit the pipeline to the data
    model = pipeline.fit(text_df)

    # Transform the data
    data_with_sentiment = model.transform(text_df).cache()
    
    sentiment_score_stats = data_with_sentiment.describe("sentiment_score")
    Q1, median, Q3 = data_with_sentiment.approxQuantile("sentiment_score", [0.25, 0.5, 0.75], 0.01)
    # number of positive sentiment scores
    num_positive = data_with_sentiment.filter("sentiment_score > 0").count()
    num_negative = data_with_sentiment.filter("sentiment_score < 0").count()

    # add the row with the quantiles to the DataFrame
    sentiment_score_stats = sentiment_score_stats.union(
        spark.createDataFrame([("q1", Q1), ("median", median), ("q3", Q3), ("IQR", Q3-Q1), ("positiveCount", float(num_positive)),  ("negativeCount", float(num_negative))], ["summary", "sentiment_score"])
    )

    # Initialize an empty dictionary to store the data
    json_data = {}

    # Iterate over the rows of the DataFrame and populate the dictionary
    for row in sentiment_score_stats.collect():
        json_data[row["summary"]] = int(float(row["sentiment_score"])) if 'count' in row["summary"].lower() else float(row["sentiment_score"])
    
    with open(savepath, 'w') as f:
        json.dump(json_data, f)
        
    spark.stop()
    

# the script entry point
# parameters: file path
# python sentiment_analysis.py file_path save_path
if __name__ == "__main__":
    args = sys.argv
    if len(args) != 3:
        print("Usage: sentiment_analysis.py file_path save_path")
        sys.exit(1)
    main(args[1], args[2])
