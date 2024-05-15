import sys
from pyspark import SparkConf, SparkContext
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import shutil

nltk.download('stopwords')
nltk.download('punkt')

def remove_stopwords_and_punctuation(text):
    text = text.replace("'", '').lower()
    # Tokenize the text
    words = nltk.word_tokenize(text)
    
    # Remove punctuation
    words = [word for word in words if word not in string.punctuation]
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.lower() not in stop_words]
    # Reconstruct the text without stopwords and punctuation
    clean_text = ' '.join(words)
    return clean_text

def remove_stopwords_punctuation_and_stem(text):
    """
    Remove stop words, punctuation, and perform stemming on the input text.
    
    Args:
    text (str): Input text
    
    Returns:
    str: Text with stop words, punctuation, and stemming removed
    """
    text = text.replace("'", '').lower()
    # Tokenize the text
    words = nltk.word_tokenize(text)

    # Get the list of English stop words
    stop_words = set(stopwords.words('english'))

    # Initialize Porter Stemmer
    stemmer = PorterStemmer()

    # Filter out stop words, punctuation, and perform stemming
    filtered_words = [stemmer.stem(word) for word in words if word.lower() not in stop_words and word not in string.punctuation]

    # Join the filtered words back into a sentence
    filtered_sentence = ' '.join(filtered_words)

    return filtered_sentence

def main(filepath, savepath):
    conf = SparkConf().setAppName('Word Count Analysis')
    sc = SparkContext(conf=conf)
    
    wordsRDD = (sc
                .textFile(filepath, 8)
                .map(remove_stopwords_punctuation_and_stem)
                .flatMap(lambda x: x.split()))

    wordCountRDD = (wordsRDD
                    .map(lambda x: (x, 1))
                    .reduceByKey(lambda x, y: x + y)
                    .sortBy(lambda x: x[1], ascending=False))

    # delete the output directory if it already exists
    shutil.rmtree(savepath, ignore_errors=True)
    wordCountRDD.saveAsTextFile(savepath)
    
    sc.stop()

# the script entry point
# parameters: file path
# python NER_Analysis.py file_path save_path
if __name__ == "__main__":
    args = sys.argv
    if len(args) != 3:
        print("Usage: wrod_Analysis.py file_path save_path")
        sys.exit(1)
    main(args[1], args[2])
