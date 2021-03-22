# Photon

## Description
Photon is an application capable of:
* Extracting and analyzing energy related data from various sources
* Detecting and identifying real, high growth opportunities within the energy market and industry
* Showcasing that information to the user in an easy to use graph-based visual interface

## Motivation
* Every day, we learn about emerging technologies and developments that have the potential to be groundbreaking. But how do we detect the early proof-of-concept, non-obvious opportunities with real growth potential?
* This leads us to the broad topic of Energy. It’s one of the biggest drivers for global issues like climate change, and when starting new projects and companies, it’s important to make sure the problem is relevant.
* The process of determining whether a problem is prossiming enough is not trivial. How can we gather and treat the vast amount of data revolving around energy to detect the most promising, emerging and non-obvious problems that need to be solved?

## [Data sources](https://github.com/EduRibeiro00/feup-lapd/wiki/Sources-API-Information)
### Social Media API's
* [Reddit API](https://pushshift.io/api-parameters/)
* [Twitter API](https://developer.twitter.com/en/docs/twitter-api/api-reference-index)
### News API's
* [Usearch API](https://usearch.com/)
### Patents API's
* [European Patent Office API](https://developers.epo.org/)

## Requirements
* Docker + docker-compose
* NPM
* .env in api/ with the following information:
> DATABASE_URI=neo4j://localhost:7687
> DATABASE_USERNAME=neo4j
> DATABASE_PASSWORD=test
> DATABASE_HTTP=7474
> DATABASE_BOLT=7687
> SERVER_PORT=5000

## Usage
### API Usage 
* cd api
* docker-compose up -d neo (localhost:7474)
* npm install
* npm run build
* npm run dev

## Developers
* [Eduardo Ribeiro](https://github.com/EduRibeiro00)
* [Martim Pinto da Silva](https://github.com/motapinto)
* [Miguel Pinto](https://github.com/MiguelDelPinto)
* [Nuno Cardoso](https://github.com/nmtc01)