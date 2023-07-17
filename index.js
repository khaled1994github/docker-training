const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');


// init app
const PORT = 4000;
//const PORT = process.evn.PORT || 4000;
const app = express();

const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient =  redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
  });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connect to redis'));
redisClient.connect();

// mongo DB connect
/*DB_USER = "root";
DB_PASSWORD = 'example';
DB_PORT = 27017;
DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI).then(()=> console.log('connect to db...')).catch((err) => console.log('failed to connect to db: ', err))*/

// postgresql connect
DB_USER = "root";
DB_PASSWORD = 'example';
DB_PORT = 5432;
DB_HOST = 'postgres';
const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
    connectionString,
  });
client
.connect(URI)
.then(()=> console.log('connect to postgres db...'))
.catch((err) => console.log('failed to connect to postgres db: ', err))


app.get('/', (req, res) =>{ 
    redisClient.set('products', 'product....');
    res.send('<h1>Hello khaled!</h1>');
});

app.get('/data', async (req, res) =>{ 
    const products = await redisClient.get('products');
    res.send(`<h1>Hello khaled!</h1> <h2>${products}</h2>`);
});

app.listen(PORT, () => console.log(`app is up and running on port:${PORT}`));