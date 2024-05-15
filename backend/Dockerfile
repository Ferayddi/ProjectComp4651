# First stage: Node.js environment
#FROM node:20.12.2-alpine3.18 AS node_base
#Fred
FROM node:20.12.2-buster AS node_base   
#
WORKDIR /user/src/app

COPY package*.json ./

RUN npm ci

# Second stage: Python environment
# FROM python:3.9-slim AS python_base
#Fred
FROM python:3.9-buster AS python_base
##
RUN apt-get update && apt-get install -y \
    python3-dev \
    python3-pip \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

ENV PYSPARK_PYTHON=python3
ENV PYTHONPATH="${PYTHONPATH}:/user/src/app"

WORKDIR /user/src/app

COPY pyspark/requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt

RUN python -m spacy download en_core_web_sm
RUN python -c "import nltk; nltk.download('punkt');"
RUN python -c "from transformers import pipeline; nlp = pipeline('text-classification', model='distilbert/distilbert-base-uncased-finetuned-sst-2-english');"

COPY pyspark/ ./

# Final stage: Combine Node.js and Python environments
FROM node_base
COPY --from=python_base /user/src/app .

WORKDIR /user/src/app

# Fred Copy Python environment
COPY --from=python_base /usr/local /usr/local
COPY --from=python_base /user/src/app /user/src/app
######

COPY . .

# Fred 
ENV PYTHONPATH="${PYTHONPATH}:/user/src/app"
#######
# Verify Python installation in final stage
# RUN python --version 
RUN python3 --version
# RUN pip --version

EXPOSE 8080

CMD ["npm", "start"]
