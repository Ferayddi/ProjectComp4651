# ProjectComp4651

## Welcome!
For the comp4651 course, our group has developped a web application that aims to provide a way of dataset collection!
Through the web application, the user can either upload their own raw data, which is a text file, or they can crawl reddit or google using a search query.

Then, they can select their desired data file and perform three types of analysis:
- Word count analysis
- Sentiment analysis
- NER analysis

The result of those anylisis is in text format, and is sent back in the server response, for the user to download.

Spark has been utilized in the analysis step of the application, and utilizes techniques such as RDDs or dataframes in order to parralellize tasks.

Our deliverable is in the forms of docker images, which will leverage the power of cloud computing when deployed to Kubernetes, since scaling and management would be automated.

