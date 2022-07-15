# local-search-test
## Backend project setup
```
cd backend
npm install
npm start (or npm run start:dev for the development environment)
```

## Frontend project setup
```
cd frontend
npm install (if it fails, use npm install -f)
npm start (or npm run start:dev for development)
```

# publish to heroku
heroku git:remote -a local-search-test
git push heroku main:main
