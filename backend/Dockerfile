FROM node:20.12.2-alpine3.18

WORKDIR /user/src/app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 8080


FROM python:3.9-slim AS python_base

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

COPY pyspark/ ./



CMD ["npm", "start"]