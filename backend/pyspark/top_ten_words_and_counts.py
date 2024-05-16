from pyspark import SparkConf, SparkContext
import re
import os
import sys
import json

os.environ['PYSPARK_PYTHON'] = r"C:\Python310\python.exe"

def removePunctuation(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text.lower()).strip()

def wordCount(wordListRDD):
    return wordListRDD.map(lambda x: (x, 1)).reduceByKey(lambda a, b: a + b)

def main(filepath, output_file):
    if not os.path.exists(filepath):
        print(f"The file {filepath} does not exist.")
        sys.exit(1)  

    conf = SparkConf().setAppName('Spark Programming')
    sc = SparkContext(conf=conf)
    try:
        shakespeareRDD = sc.textFile(filepath).map(removePunctuation)
        shakespeareWordsRDD = shakespeareRDD.flatMap(lambda x: x.split())
        top10WordsAndCounts = wordCount(shakespeareWordsRDD).takeOrdered(10, lambda x: -x[1])
        result = [{'word': word, 'count': count} for word, count in top10WordsAndCounts]
        with open(output_file, 'w') as file:
            json.dump(result, file)
    except Exception as e:
        print(f"An error occurred: {e}")
        sc.stop()
        sys.exit(2) 
    else:
        sc.stop()
        sys.exit(0) 

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: spark_test.py <file> <output_file>")
        sys.exit(1)
    filepath = sys.argv[1]
    output_file = sys.argv[2]
    main(filepath, output_file)