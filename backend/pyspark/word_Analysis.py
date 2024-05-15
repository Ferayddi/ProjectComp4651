import sys
from pyspark import SparkConf, SparkContext
import nltk
import string
from nltk.stem import PorterStemmer
from pyspark.ml.feature import StopWordsRemover

nltk.download('punkt')

def main(filepath, savepath):
    conf = SparkConf().setAppName('Word Count Analysis')
    sc = SparkContext(conf=conf)
    
    eng_stopwords = StopWordsRemover.loadDefaultStopWords("english")
    
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

        # Initialize Porter Stemmer
        stemmer = PorterStemmer()

        # Filter out stop words, punctuation, and perform stemming
        filtered_words = [stemmer.stem(word) for word in words if word.lower() not in eng_stopwords and word not in string.punctuation]

        # Join the filtered words back into a sentence
        filtered_sentence = ' '.join(filtered_words)

        return filtered_sentence
    
    wordsRDD = (sc
                .textFile(filepath, 8)
                .map(remove_stopwords_punctuation_and_stem)
                .flatMap(lambda x: x.split()))

    wordCountRDD = (wordsRDD
                    .map(lambda x: (x, 1))
                    .reduceByKey(lambda x, y: x + y)
                    .sortBy(lambda x: x[1], ascending=False))


    # Convert RDD to a list of tuples
    list_of_tuples = wordCountRDD.collect()

    # Write list of tuples to the text file
    with open(savepath, 'w') as f:
        f.write('\n'.join(map(str, list_of_tuples)))
    
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
