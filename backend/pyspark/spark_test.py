import sys

def count_words(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            words = content.split()
            return len(words)
    except FileNotFoundError:
        print("File not found. Please check the file path.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python word_count.py <file_path>")
        sys.exit(1)

    filepath = sys.argv[1]
    word_count = count_words(filepath)

    if word_count is not None:
        print(f"The file '{filepath}' contains {word_count} words.")

if __name__ == "__main__":
    main()