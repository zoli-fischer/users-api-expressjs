# users-react-app-with-api-expressjs
User management application with RESTful API

## Application

> ./app

One page react application.

## RESTful API

> ./api

RESTful API with expressjs.

Start server. {env} - dev, test, prod
cd api & npm run {env}
```

## Database

> ./db

Configuration file: database.json

Update database. {env} - dev, test, prod
```bash
cd db & npm run {env}
```

### Development

Create new migration script. {scope} - dev, test, prod, global
```bash
cd db & npm run migrate create:{scope} {name}
```
