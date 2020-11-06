const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profileid");
const image = require("./controllers/image");

const db = knex ({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const app = express();
app.use(express.json());
app.use(cors());

// root
app.get('/', (req,res) => { res.send('Success') })

// signin
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) })

// register
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

// profile/:id
app.get('/profile/:id', (req, res) => { profile.handleId(req, res, db) })

// image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => { console.log(`App is running on port ${process.env.PORT}`) })
