# -*- coding: utf-8 -*-
"""CrawlingCodeipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1bWgUcI5E497ITHVI2fgznsDjgdrrcvCv

# Crawling using Reddit
"""

import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install('praw')
install('asyncpraw')
install('prawcore')
install('asyncprawcore')
install("bs4")

import praw
import asyncpraw
import prawcore
import re
import asyncprawcore
import sys
import asyncio

def remove_links(text):
    # Define a regex pattern to match URLs
    url_pattern = re.compile(r'https?://\S+|www\.\S+')

    # Substitute matched URLs with an empty string
    cleaned_text = re.sub(url_pattern, '', text)

    return cleaned_text

def clean_reddit_text(text):
  # Clean the page_contents
    # pattern = re.compile(r'^\s*[a-z]*([A-Z].*?\.)[^.]*$')


    line_split_content = text.split('\n')
    #Clean again
    page_contents = ""

    # CLEANING lines with fewer than 6 words, remove lines that are empty

    for line in line_split_content:
      #if line is not a string
      if isinstance(line, str) != True:
        continue
      #if line is just a line character
      if line == "\n" or line == "":
        continue

      page_contents += line + "\n"


    cleaned_page_contents = re.sub(r'[^a-zA-Z0-9\n\s.]', '', page_contents)
    return cleaned_page_contents

#SYNCHRONOUS code:
# try:
#     reddit =  praw.Reddit(
#         client_id= "7mKGH9zDIjWgHv55IGVbIw",
#         client_secret = "twwgm3--p52-Qg2JQsVLsBbF7G-mvQ",
#         user_agent="USERAGENT",
#         # username="USERNAME",
#         # password="PASSWORD",
#     )

#     print(reddit.read_only)

#     subreddit =  reddit.subreddit("python")


# except prawcore.exceptions.ResponseException:
#     print("Invalid credentials. Please check your Reddit app's settings.")

"""## Retrieving reddit top posts"""

# #SYNCHRONOUS
# top_posts =  subreddit.top(limit = 10)

# for post in top_posts:
#   print(f"Title - {post.title}")
#   print(f"ID - {post.id}")
#   print(f"Author - {post.author}")
#   print(f"URL - {post.url}")
#   print(f"Title - {post.title}")
#   print(f"Post score - {post.score}")
#   print(f"Post comments count - {post.num_comments}")
#   print(f"Created with - {post.created_utc}")
#   print(f"\n")

"""## Retrieving reddit new posts"""

# #SYNCHRONOUS
# new_posts = subreddit.new(limit=10)
# for post in new_posts:
#   print(f"Title - {post.title}")
#   print(f"ID - {post.id}")
#   print(f"Author - {post.author}")
#   print(f"URL - {post.url}")
#   print(f"Title - {post.title}")
#   print(f"Post score - {post.score}")
#   print(f"Post comments count - {post.num_comments}")
#   print(f"Created with - {post.created_utc}")
#   print(f"\n")

"""## Retrieving posts by search"""

#SYNCHRONOUS Retrieve Posts content by query
# def searchRedditPostsByQuery(query, num_posts):
#   search_posts = subreddit.search(query, limit=num_posts)
#   content_text = ""
#   for post in search_posts:
#     # print(f"Title - {post.title}")
#     # print(f"ID - {post.id}")
#     # print(f"Author - {post.author}")
#     # print(f"URL - {post.url}")
#     # print(f"Title - {post.title}")
#     # print(f"Post score - {post.score}")
#     # print(f"Post comments count - {post.num_comments}")
#     # print(f"Created with - {post.created_utc}")
#     # print(f"Post content - {post.selftext}")
#     content_text += post.selftext
#     # print(f"\n")
#     content_text += "\n"

#   return content_text

#ASYNCHRONOUS Retrieve Posts content by query
async def searchRedditPostsByQuery(query, num_posts):
    try:
      reddit = asyncpraw.Reddit(
          client_id= "7mKGH9zDIjWgHv55IGVbIw",
          client_secret = "twwgm3--p52-Qg2JQsVLsBbF7G-mvQ",
          user_agent="USERAGENT",
          # username="USERNAME",
          # password="PASSWORD",
      )

      # Check if the Reddit instance is read-only
      read_only =  reddit.read_only
      print(read_only)

      # Access the subreddit
      subreddit =  await reddit.subreddit("all")

    except asyncprawcore.exceptions.ResponseException:
        print("Invalid credentials. Please check your Reddit app's settings.")

    search_posts = subreddit.search(query, limit=num_posts)
    # print(search_posts)
    content_text = ""
    async for post in search_posts:

      content_text += post.selftext
      print(post.selftext)
      # content_text += "\n"
    # print(content_text)
    return content_text

#BOTH SYNCHRONOUS AND ASYNCHRONOUS
async def crawlReddit(query, num_posts, bool_print):
  content = await searchRedditPostsByQuery(query, num_posts)
  content = clean_reddit_text(content)
  content = remove_links(content)
  if bool_print == 1:
    print(content)
  return content

# result = await crawlReddit("Beagles", 10, 1)

"""# Crawling using Google search"""

import requests
import re
from itertools import islice


from bs4 import BeautifulSoup

def fetch_page(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    response = requests.get(url, headers=headers)

    if response.status_code // 100 != 2:  # Check if status code is not in the 200 range
        return False


    return response.text



def fetch_pages(query):
    # Replace 'your_search_engine_url' with the URL of the search engine or site you are targeting
    url = f'https://www.google.com/search?q={query}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    response = requests.get(url, headers=headers)
    return response.text

def parse_links(html):
    soup = BeautifulSoup(html, 'html.parser')
    links = []


    for link in soup.find_all('a'):
        href = link.get('href')
        # print(href)
        if 'U&url=' in href and not 'webcache' in href:
            # Cleaning the link
            start = href.find('U&url=') + 6
            end = href.find('&', start)
            url = href[start:end]
            links.append(url)

    return links

def fetch_content_of_links(links, num_links):
    page_contents = ""  # Initialize page_contents as an empty string

    counter = 0
    for url in links:
        try:
            html_content = fetch_page(url)
            if html_content == False:
              continue
            soup = BeautifulSoup(html_content, 'html.parser')
            # Extracts text from the body of the HTML
            text = soup.get_text()
            if (counter == num_links):
              break
            page_contents += text + "\n"  # Append text with a newline separator
            counter += 1
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch page: {url} due to {e}")

    # Clean the page_contents
    pattern = re.compile(r'^\s*[a-z]*([A-Z].*?\.)[^.]*$')


    line_split_content = page_contents.split('\n')
    #Clean again
    page_contents = ""

    # CLEANING lines with fewer than 6 words, remove lines that are empty
    content_set = set()

    for line in line_split_content:
      #if line is not a string
      if isinstance(line, str) != True:
        continue
      #if line is just a line character
      if line == "\n":
        continue
      #if line length suggest this is not a sentence
      if len(line.split()) < 8:
        continue
      #if line does not contain a dot, it is likely not a sentence containing information, but instead headers
      if "." not in line:
        continue
      match = pattern.match(line)
      if match is None:
        continue
      if 'blocked by network security' in match.group(1):
        continue

      if match.group(1) is not None:
          #If not a sentence
          if len(match.group(1).split()) < 8:
            continue
          if not match.group(1) in content_set:
            page_contents += match.group(1) + "\n"
            content_set.add(match.group(1))


    cleaned_page_contents = re.sub(r'[^a-zA-Z0-9\n\s.]', '', page_contents)
    return cleaned_page_contents

def crawl_google_search(query,num_links, bool_print):
  html_content_of_search = fetch_pages(query)
  # print(html_content)
  links = parse_links(html_content_of_search)
  page_contents = fetch_content_of_links(links, num_links)
  if bool_print == 1:
    print("Pages found by search and will be crawled:")
    for link in links:
        print(link)

    print("Crawled text:")
    print(page_contents)
  return page_contents

crawl_google_search("Beagles", 10, 1)

# crawl_google_search("Eagles", 10, 1)

"""# Exporting for use in javascript server"""

def main():
    if len(sys.argv) < 4:
        print("Not enough arguments")
        return

    command = sys.argv[1]
    query = sys.argv[2]
    limit = int(sys.argv[3])
    bool_print = int(sys.argv[4])

    if command == "reddit_crawl":
      content =  asyncio.run(crawlReddit(query, limit, bool_print))
      return content;

    elif command == "google_crawl":
        result = asyncio.run(crawl_google_search(query, limit,bool_print))
        return result;
    else:
        result = "Unknown command"

    return False;

if __name__ == "__main__":
    main()

# sys.argv = ['script.py', 'reddit_crawl', 'dogs', '10', '1']

# # Run main function and print the result
# result = main()
# print(result)