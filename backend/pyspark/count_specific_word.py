from pyspark import SparkConf, SparkContext
import re
import os
import sys
import json

os.environ['PYSPARK_PYTHON'] = "C:\Python310/python.exe"

def removePunctuation(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text.lower()).strip()

def wordCount(wordListRDD):
    return wordListRDD.map(lambda x: (x, 1)).reduceByKey(lambda a, b: a + b)

def main(filepath, target_word):
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"The file {filepath} does not exist.")

    conf = SparkConf().setAppName('Spark Programming')
    sc = SparkContext(conf=conf)
    try:
        shakespeareRDD = sc.textFile(filepath, 8).map(removePunctuation)
        shakespeareWordsRDD = shakespeareRDD.flatMap(lambda x: x.split())
        top10WordsAndCounts = shakespeareWordsRDD.filter(lambda x: x == target_word)
        word_count = top10WordsAndCounts.count()
        print(f"The word '{target_word}' occurs {word_count} times in the file.")
        # with open(output_file, 'w') as file:
        #     json.dump(result, file)
    finally:
        sc.stop()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: spark_test.py <file> <output_file>")
        sys.exit(1)
    filepath = sys.argv[1]
    target_word = sys.argv[2]
    main(filepath, target_word)