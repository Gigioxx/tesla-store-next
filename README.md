# Next.js Tesla Store

To run locally, you need the database:

```
docker-compose up -d
```

- The -d, means **detached**

## Configure environment variables

Rename file **.env.template** to **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/tesladb
```

- Rebuild node modules and start Next development project:

```
yarn install
yarn dev
```

## Fill the database with test information

- Call the following:

```
http://localhost:3000/api/seed
```
