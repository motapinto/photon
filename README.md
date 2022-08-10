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

## Requirements
* Docker
* NPM
* .env (create from .env.example in backend/)

## Usage
### Docker Usage - Both Frontend and Backend
* `docker-compose up`
* `docker-compose exec photon-backend npm run seed`

### Backend Usage 
`cd backend`
* `npm install`
* `npm run neo4`
* `npm run seed` (optional)
* `npm run dev`

**Note:** If you want to use mock data, instead of real data, you can use *npm run seed* to test our application. If not, just skip that instruction.

### Frontend Usage
* cd frontend
* `npm install`
* `npm start`
* `npm build` (optional)
* `npm eject` (optional)

**Note:** Check README.md file inside photon folder to see in more detail *npm start, npm build and npm eject* commands results.

## Gallery
### Architecture

<p>
<img src="images/architecture.png" width="982px">
</p>

### App

<p>
<img src="images/graph.png" width="280px">
<img src="images/elem.png" width="420px">
<img src="images/nodes.png" width="282px">
</p>

## Developers
* [Eduardo Ribeiro](https://github.com/EduRibeiro00)
* [Martim Pinto da Silva](https://github.com/motapinto)
* [Miguel Pinto](https://github.com/MiguelDelPinto)
* [Nuno Cardoso](https://github.com/nmtc01)

**Note:** This project was done in close collaboration with the [Research Center for Assistive Information and Communication Solutions – AICOS](https://www.aicos.fraunhofer.pt/en/home.html) from [Fraunhofer Portugal](https://www.fraunhofer.pt/en/about_us.html).
