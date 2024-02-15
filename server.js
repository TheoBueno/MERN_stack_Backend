const express    = require ('express')
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const cors       = require ('cors')
require("dotenv").config();
const app  = express()
const PORT = process.env.REACT_APP_SERVERPORT // || 5000

const dal  = require ('./dal.js') // Connecting to Mongoose at the Dal
const User = require("./schemas/User.js")

/* // TODO: uncomment to serve from server.js if dal.js is down.
const url             = process.env.REACT_APP_MONGO_URI
const dbName          = 'myproject';
const connection      = url+dbName // url+dbName

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
*/

app.use(cors({
  origin: ['http://localhost:3001', 'https://www.digitalocean.com/'] 
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// TODO: THESE are the CORRECT VERSION

app.get("/", (req, res) => { // Backend Home Route test
  res.send("Hello world! This is a successful routing test if you were looking for the BigBadWolf Bank's backend");
});
app.get('/account/all', async (req, res) => { // 'dal' call '/all'
  try{
    const allUsers = await dal.all()
    console.log(`All users sent as res.send. I.e.: ${allUsers[1].name}`)
    res.send(allUsers)
  } catch (e) {res.send(`${e.message}; The above text was an error message.`)}
}) 
app.get('/all', async (req, res) => { // Backup call: '/all'
  try{
    const allUsers = await User.find()
    console.log(`Backups '/All' call used. Sent as res.send. I.e.: ${allUsers[2].name}`)
    res.send(allUsers)
  } catch (e) {console.log(`${e.message}; The above text was an error message.`)}
}) 
app.get('/account/newUser/:name/:email/:password', async (req, res) => { // 'dal' call '/newUser'
//newUser('testMushroom', 'testemail2@ntnd.js', 'testracer')
  try{
    const newUser = await dal.newUser(req.params.name, req.params.email, req.params.password) 
    res.send(newUser)
  } catch (e) {res.send(newUser)}
})
app.get('/account/login/:email/:password', async(req, res) => { // DAL call '/login'
  try{
    const loggedUser = await dal.login(req.params.email, req.params.password)
    res.send(loggedUser)
  } catch (e) {res.send(loggedUser)}  
})
app.get('/account/:email/deposit/:amount', async (req, res) => { // 'dal' call '/addMoney'
  try{
    const depOp = await dal.addMoney(req.params.email, req.params.amount)    
    res.send(depOp)
  } catch(e) {res.send(depOp)}
})
app.get('/account/:email/withdraw/:amount', async (req, res) => { // 'dal' call '/removeMoney'
  try{
    const depOp = await dal.removeMoney(req.params.email, req.params.amount)    
    res.send(depOp)
  } catch(e) {res.send(depOp)}
})

// TODO: ADM OPs need to have Auth Added for gen access
app.get('/account/byemail/:email', async (req, res) => { // AdminOp: Locate by Email
  try{
    const response = await dal.findEmail(req.params.email) 
    console.log(response) 
    res.send(response)
  } catch (e) {res.send(`${e.message}; The above text was an error message.`)}
})
app.get('/account/byname/:name', async (req, res) => { // AdminOp: Locate by FullName
  try{
    const response = await dal.findName(req.params.name) 
    console.log(response) 
    res.send(response)
  } catch (e) {res.send(`${e.message}; The above text was an error message.`)}
})

// TODO: Logged In OPs need to have Auth Added for 
app.get('/account/:email/updtpw/:newpassword', async (req, res) => {
  try{
    const update = await dal.changePW( req.params.email, req.params.newpassword )
    console.log(update)
    res.send(update)    
  } catch (e) {res.send(update)}
})

// Validation of Login inside Backend
app.get('/account/passwordval/:password', async (req, res) => {
  try{
    const validPWs = await dal.validPW( req.params.password )
    const trueorfalse = await (validPWs === req.params.password) ? (true) : (false) 
    res.send(trueorfalse)
  }catch(e){res.send(e.message)}
})
app.get('/account/emailval/:email', async (req, res) => {
  try{
    const validEMLs = await dal.validEML( req.params.email )
    const trueorfalse = await (validEMLs === req.params.email) ? (true) : (false) 
    res.send(trueorfalse)
  }catch(e){res.send(e.message)}
})
app.get('/account/pwemlval/:email/:password', async (req, res) => {
  try{
    const userInfo     = await dal.validLogin( req.params.email )
    const PWofEML      = await userInfo.password
    const pwMatchOrNot = await (PWofEML === req.params.password) ? (true) : (false)
    if (pwMatchOrNot) {res.send(true) //userInfo
    } else {res.send(false)} //"login failed, credentials don't match."
    
  }catch(e){res.send(e.message)}
})



//createTest() // add user - #V2 //
async function createTest() {
  try{
    const user = await User.create({ 
      name: 'BlueShell', 
      email: 'shellserviceprime@ntd.js', 
      password: '1placedown',  
    })
    console.log(user)
  }catch(e){    console.log(e.message)}
}

//findOne() //TODO: change value to req.params.email and add to api
async function findOne() {
  try{
    const user = await User.findOne({ email: 'hailkingboo@ntd.js' })
    console.log(user)
  } catch (e) {console.log(e.message)}
}

//getName()
async function getName() {
  try{
    const user = await User.findByName('Didi Kong')
    console.log(user)
  } catch (e) {console.log(e.message)}
}

//getEmail()
async function getEmail() {
  try{
    const user = await User.findByEmail('hailkingboo@ntd.js')
    console.log(`${user[0].name}'s balance is ${user[0].balance} coins`)
    console.log(user[0])
  } catch (e) {console.log(e.message)}
}


/*
//updateTest() // update user field value // TODO:USE SAVE METHOD TO USE VALIDATION // .save returns an error "user.save is not a function"
async function updateTest() {  
  try{
    const user = await User.find({ name: "Mario Mario" })
    user.password = 'peaches'
    // await user.save() // not working
    console.log(user)
  } catch (e) {console.log(e.message)} }
*/

//boilerplate
// async function find() {  try{} catch (e) {console.log(e.message)} }

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




/*
//runTest() // add user - #1  //
async function runTest() {
  try{  
    const user = new User({ 
      name: 'Little Boo', 
      email: 'hailkingboo@ntd.js', 
      password: 'vacuumAll', 
    })
    await user.save() //    await user.update()
    console.log(user)
  } catch (e) {
    console.log(e.message)
}}


//boilerplate
async function find() {
  try{}catch(e){console.log(e.message)}
}


*/

//(() => console.log("user saved"))




/*
app.get("/all", async (req, res) => {
  const response = await User.find({})
  res.send(response);
});
*/


app.get('/find/:email', async (req, res) => {
  const response = myproject.users.find({ email: req.params.email })  
})

app.listen(PORT, () => {
  console.log(`Running at server.js on port: ${PORT}`)
} )

/*

//myproject.users.find({ email: "gumba@nintendo.jp" })

app.get("/all", async (req, res) => {
  const User = await User.find({});
  res.send(User);
});


*/
/*

// All User's Data
app.get('/account/all', async (req, res) => {
  //else get all User with dal
  await dal.all()
    .then((docs) => {
      console.log(docs)
      res.send(docs)
    })
}) 

// Login:
app.get('/account/:email', async (req, res) => {
  //else get all User with dal
  dal.find(req.params.email)
    .then((docs) => {
      console.log(docs)
      res.send(docs)
    })
})   
*/

  /*

//deposit - '/account/deposit/:email/:password/:amount'
//TODO: if logged in status can be confirmed, password and/or email could be removed
app.get('/deposit/:email/:password/:amount', async (req, res) => {
  res.send({
    email:    req.params.email,
    password: req.params.password,
    amount:   req.parans.amount
  })
})

//withdraw - '/account/withdraw/:email/:password/:amount'
//TODO: if logged in status can be confirmed, password and/or email could be removed
app.get('/withdraw/:email/:password/:amount', async (req, res) => {
  res.send({
    email:    req.params.email,
    password: req.params.password,
    amount:   req.params.amount
  })
})

//balance - '/account/balance/:email/:password/'
//TODO: if logged in status can be confirmed, password and/or email could be removed
app.get('/account/balance/, function', async (req, res) => {
  res.send({
    email:    req.params.email,
    password: req.params.password,
    amount:   req.params.amount,
  })
})
*/

// const PORT = process.env.REACT_APP_PORT || 5000 // declared up top

