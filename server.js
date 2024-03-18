const express    = require ('express')
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const cors       = require ('cors')
require("dotenv").config();
const server  = express()
const PORT = process.env.REACT_APP_SERVERPORT

const dal  = require ('./dal.js') // Connecting to Mongoose at the Dal
const User = require("./schemas/User.js")

// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase-admin/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL-_Mq_-9fXa6DfzQkCLv3AAMOyasC05g",
  authDomain: "bbwolfbank.firebaseapp.com",
  projectId: "bbwolfbank",
  storageBucket: "bbwolfbank.appspot.com",
  messagingSenderId: "46657686596",
  appId: "1:46657686596:web:04f8fcfb35c2af72ba4011"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

server.use(cors({
  origin: ['http://localhost:3001', 'https://bbwbank-frontend.onrender.com','https://theo-buenofullstackbankingapplication.onrender.com'] 
}))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

server.get("/", (req, res) => { // Backend Home Route test
  res.send("Hello world! This is a successful routing test if you were looking for the BigBadWolf Bank's backend");
});
server.get('/account/all', async (req, res) => { // 'dal' call '/all'
  try{
    const allUsers = await dal.all()
    console.log(`All users sent as res.send. I.e.: ${allUsers[1].name}`)
    res.send(allUsers)
  } catch (e) {res.send(`${e.message}; The above text was an error message.`)}
}) 
server.get('/all', async (req, res) => { // Backup No Dal call: '/all'
  try{
    const allUsers = await User.find()
    console.log(`Backups '/All' call used. Sent as res.send. I.e.: ${allUsers[2].name}`)
    res.send(allUsers)
  } catch (e) {console.log(`${e.message}; The above text was an error message.`)}
}) 

server.get('/account/newUser/:name/:email/:password', async (req, res) => { // 'dal' call '/newUser'
//newUser('testMushroom', 'testemail2@ntnd.js', 'testracer')
  try{
    const newUser = await dal.newUser(req.params.name, req.params.email, req.params.password) 
    res.send(newUser)
  } catch (e) {res.send(newUser)}
})
server.get('/account/login/:email/:password', async(req, res) => { // 'dal' call   '/login'
  try{
    const loggedUser = await dal.login(req.params.email, req.params.password)
    res.send(loggedUser)
  } catch (e) {res.send(loggedUser)}  
})
server.get('/account/:email/deposit/:amount', async (req, res) => { // 'dal' call  '/addMoney'
  try{
    const depOp = await dal.addMoney(req.params.email, req.params.amount)    
    res.send(depOp)
  } catch(e) {res.send(depOp)}
})
server.get('/account/:email/withdraw/:amount', async (req, res) => { // 'dal' call  '/removeMoney'
  try{
    const depOp = await dal.removeMoney(req.params.email, req.params.amount)    
    res.send(depOp)
  } catch(e) {res.send(depOp)}
})

// TODO : ADM OPs need to have Auth Added for gen access
server.get('/account/byemail/:email', async (req, res) => { // AdminOp: Locate by Email
  try{
    const response = await dal.findEmail(req.params.email) 
    console.log(response) 
    res.send(response)
  } catch (e) {res.send(`${e.message}; The above text was an error message.`)}
})
server.get('/account/byname/:name', async (req, res) => { // AdminOp: Locate by FullName
  try{
    const response = await dal.findName(req.params.name) 
    console.log(response) 
    res.send(response)
  } catch (e) {res.send(`${e.message}; The above text was an error message.`)}
})

// TODO: Logged In OPs need to have Auth Added for 
server.get('/account/:email/updtpw/:newpassword', async (req, res) => {
  try{
    const update = await dal.changePW( req.params.email, req.params.newpassword )
    console.log(update)
    res.send(update)    
  } catch (e) {res.send(update)}
})

// Validation of Login inside Backend
// server.get('/account/passwordval/:password', async (req, res) => {
//   try{
//     const validPWs = await dal.validPW( req.params.password )
//     const trueorfalse = await (validPWs === req.params.password) ? (true) : (false) 
//     res.send(trueorfalse)
//   }catch(e){res.send(e.message)}
// })
// server.get('/account/emailval/:email', async (req, res) => {
//   try{
//     const validEMLs = await dal.validEML( req.params.email )
//     const trueorfalse = await (validEMLs === req.params.email) ? (true) : (false) 
//     res.send(trueorfalse)
//   }catch(e){res.send(e.message)}
// })
server.get('/account/pwemlval/:email/:password', async (req, res) => {
  try{
    const userInfo     = await dal.validLogin( req.params.email )
    const PWofEML      = await userInfo.password
    const pwMatchOrNot = await (PWofEML === req.params.password) ? (true) : (false)
    if (pwMatchOrNot) {res.send(true) //userInfo
    } else {res.send(false)} //"login failed, credentials don't match."
    
  }catch(e){res.send(e.message)}
})



// //createTest() // add user - #V2 //
// async function createTest() {
//   try{
//     const user = await User.create({ 
//       name: 'BlueShell', 
//       email: 'shellserviceprime@ntd.js', 
//       password: '1placedown',  
//     })
//     console.log(user)
//   }catch(e){    console.log(e.message)}
// }

// //findOne() //TODO: change value to req.params.email and add to api
// async function findOne() {
//   try{
//     const user = await User.findOne({ email: 'hailkingboo@ntd.js' })
//     console.log(user)
//   } catch (e) {console.log(e.message)}
// }

// //getName()
// async function getName() {
//   try{
//     const user = await User.findByName('Didi Kong')
//     console.log(user)
//   } catch (e) {console.log(e.message)}
// }

// //getEmail()
// async function getEmail() {
//   try{
//     const user = await User.findByEmail('hailkingboo@ntd.js')
//     console.log(`${user[0].name}'s balance is ${user[0].balance} coins`)
//     console.log(user[0])
//   } catch (e) {console.log(e.message)}
// }

// TODO: ADMIN ACCESS ONLY SECTION TODO:

// call to delete user account - limited to ADMIN role - //TODO: change value to req.params.email and add to api
async function delAccount() { 
  try{
    const user = await User.deleteOne({ email: "gumba@nintendo.jp" })
    console.log(user)
  }catch(e){console.log(e.message)}
}

//queryByBalance()
async function queryByBalance() {  
  try {
    const user = await User.where('balance')
      .gte(0)    // replace 0 with query #1
      .lte(99)   // replace 0 with query #2
      .select("name")
      .select('balance')
//      .select('-__id')
      console.log(user)
  } catch(e) {console.log(e.message)} }
//queryByName()
async function queryByName() {  
  try {
    const user = await User.where('name')
      .equals('Ash Ketchun') // replace name with query #
      .select("name")
      .select("email")
      .select('balance')
      console.log(user)
  } catch(e) {console.log(e.message)} }

server.listen(PORT, () => {
  console.log(`Running at server.js on port: ${PORT}`)
} )

/*

//myproject.users.find({ email: "gumba@nintendo.jp" })

server.get("/all", async (req, res) => {
  const User = await User.find({});
  res.send(User);
});


*/

