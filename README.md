# Canada Vaccine Tracker

This is a tiny little [Next.js](https://expressjs.com/) app to track the percentage of Canadians who have received vaccines over time. The data synced with what is on [COVID-19 Tracker Canada's Vaccination page](https://covid19tracker.ca/vaccinationtracker.html). The data is pulled in using [their API](https://api.covid19tracker.ca/docs/1.0/overview).

Check it out @ [canada-vaccine-tracker.ca/](https://canada-vaccine-tracker.ca/) 😎

## Getting started

### [Install `npm`](https://www.npmjs.com/get-npm)

`npm` is a javascript package manager. It downloads project dependencies and runs node applications.

You'll need node version `v12` or higher to run the app.

### [Install `docker`](https://docs.docker.com/install/)

A docker container allows a developer to package up an application and all of its parts. This means we can build an app in any language, in any stack, and then run it anywhere — whether locally or on a server.

## Build and run with npm

```bash
# install dependencies
npm install

# run application in 'dev' mode
# (ie, the server restarts when you save a file)
npm run dev

# run application in 'prod' mode
npm start
```

The app should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running application.

### Run tests with npm

```bash
# run unit tests
npm test

# run linting
npm run lint
```

## Build and run as a Docker container

```bash
# build an image locally
docker build -t pcraig3/vacs:<tag> --build-arg GITHUB_SHA_ARG=<tag> .

# run the container
docker run -it -p 3000:3000 pcraig3/vacs:<tag>
```

The container should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running docker container.

## Deploy to Cloud Run

Obviously you can't push your stuff to _my_ Cloud Run, but if somehow you were interested in putting up a copycat version, these steps will work.

```bash
# build and upload a container
gcloud builds submit --tag gcr.io/can-vacs/vacs:<tag>

# deploy container to Cloud Run
gcloud run deploy --image gcr.io/can-vacs/vacs:<tag> --platform managed
```
