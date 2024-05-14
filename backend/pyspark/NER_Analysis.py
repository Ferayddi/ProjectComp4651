import spacy
from pyspark.sql import SparkSession
from pyspark.sql.functions import udf, explode, split, collect_list, concat_ws, flatten, col, count
from pyspark.sql.types import ArrayType, StringType, StructType, StructField, MapType, IntegerType
from collections import defaultdict 
import sys

def main(filepath, savepath):
    # Load spaCy NER model
    nlp = spacy.load("en_core_web_sm")
    labels = nlp.get_pipe("ner").labels

    # Initialize Spark session
    spark = SparkSession.builder \
        .appName("NER_Analysis") \
        .getOrCreate()

    # Function to extract named entities from text using spaCy
    def extract_entities_spacy(text):
        try:
            doc = nlp(text)
            entity_dict = defaultdict(list)
            for ent in doc.ents:
                entity_dict[ent.label_].append(ent.text)
            return tuple(entity_dict.get(label, None) for label in labels)
        except:
            return tuple(None for _ in labels)

    # Define schema for UDF return type
    StructFields = []
    for label in labels:
        StructFields.append(StructField(label.lower(), ArrayType(StringType())))
    schema = StructType(StructFields)

    # Register UDF
    extract_entities_spacy_udf = udf(extract_entities_spacy, schema)

    # read the data
    text_df = spark.read.text(filepath).filter("trim(value) != ''")

    # apply the UDF to the dataframe
    result_df = text_df.withColumn("entities", extract_entities_spacy_udf("value"))

    # Select the nested columns from the exploded struct
    expanded_df = result_df.select(
        "entities.cardinal",
        "entities.date",
        "entities.event",
        "entities.fac",
        "entities.gpe",
        "entities.language",
        "entities.law",
        "entities.loc",
        "entities.money",
        "entities.norp",
        "entities.ordinal",
        "entities.org",
        "entities.percent",
        "entities.person",
        "entities.product",
        "entities.quantity",
        "entities.time",
        "entities.work_of_art"
    )

    # Show the expanded DataFrame
    expanded_df.show(truncate=False)

    # List of columns to aggregate
    columns_to_aggregate = expanded_df.columns

    # Define aggregation expressions for each column
    agg_exprs = [flatten(collect_list(col_name)).alias(f"{col_name}") for col_name in columns_to_aggregate]

    # Perform aggregation using agg function
    aggregated_df = expanded_df.agg(*agg_exprs)
    
    final_json = {}
    for column in aggregated_df.columns:
        # Explode the column
        exploded_df = aggregated_df.select(explode(col(column)).alias(column))
        # Count the occurrences of each entity
        count_df = exploded_df.groupBy(column).agg(count("*").alias("count"))
        # Convert DataFrame to dictionary
        result_dict = dict(count_df.collect())
        # Convert dictionary to JSON
        final_json[column] = result_dict
        
    rdd = spark.sparkContext.parallelize([final_json])

    # Define schema for DataFrame
    schema = StructType([
        StructField(k, MapType(StringType(), IntegerType()), True) for k, v in final_json.items()
    ])

    # Create DataFrame
    final_df = spark.createDataFrame(rdd, schema)

    final_df.write.json(savepath, mode="overwrite")

    # Stop Spark session
    spark.stop()


# the script entry point
# parameters: file path
# python NER_Analysis.py file_path save_path
if __name__ == "__main__":
    args = sys.argv
    if len(args) != 3:
        print("Usage: NER_Analysis.py file_path save_path")
        sys.exit(1)
    main(args[1], args[2])

        
    