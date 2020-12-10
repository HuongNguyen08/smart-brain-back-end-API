const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); // to connect from the frontend to backend
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'smart_brain'
    }
  });

// check if server connects to database or not
//   db.select('*'). from('users').then(data => {
//       console.log(data);
//   });


const app = express();

app.use (bodyParser.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com', 
//             password: 'cookies',   
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password:'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id:'987',
//             has: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }

app.get('/', (req, res) => {
    res.send(database.users);
})

//signin --> POST = success/fail
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//register --> POST = success/fail
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//profile/ :userId --> GET: user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//image --> PUT --> user
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
    console.log('app is running on port 3000')
})
