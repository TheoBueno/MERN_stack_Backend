// Welcome to the Data Access Layer (DAL): a programming pattern that separates the application's business logic from the data storage and retrieval operations.

const mongoose        = require("mongoose")
require("dotenv").config();
const User = require("./schemas/User")

// Connection Converted to Mongoose
const url             = process.env.REACT_APP_MONGO_URI
const dbName          = 'myproject';
const connection      = url+dbName 

try { // Connecting to Mongoose & MongoDB
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", function () {
    console.log("DAL connection established successfully");
  });
} catch (err) {
  console.log("Mongoose error at Dal Connection point", err);
}

async function all() { // DAL call: /account/all
  try{
    const allUsers = await User.find()
//    console.log(allUsers)  // uncomment to Console.log All
    console.log(`Request for '/All' Answered from DAL. I.e.: ${allUsers[0].name}`)
    return(allUsers)
  }catch(e){ 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
async function newUser(name, email, password) { // DAL call: /account/newUser
  try{
    const user = await User.create({name,    email,    password, })
    console.log(user)
    return(user)
  } catch(e) { 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
async function login(email, password){ //  DAL call: /account/login
  try{
    const profile = await User.findOne({ email: email, password: password })
    console.log(profile)
    return(profile)
  } catch(e) { 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
async function addMoney(email, amount){ //  DAL call: /account/:email/deposit
  try{
    const transaction = await User.updateOne({ email: email }, { $inc: { balance: amount } })
    console.log(transaction)
    console.log(`${amount} was added to ${email}'s account balance`)
    return(`$${amount} were deposited to ${email}'s account balance`)
  } catch(e) { 
    console.log(`$${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
async function removeMoney(email, amount){ //  DAL call: /account/:email/withdraw
  try{
    const transaction = await User.updateOne({ email: email }, { $inc: { balance: -amount } })
    console.log(transaction)
    console.log(`$${amount} were withdrawn from ${email}'s account balance`)
    return(`$${amount} were withdrawn from ${email}'s account balance`)
  } catch(e) { 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
// VALIDATION QUERIES:

async function validLogin(email){ //  DAL call: //account/pwval/:email
  try{
    const profile = await User.findOne(
      { email: email },
        { 'email':1,'password':1,'name':1, 'balance':1, '_id':0 }
      )
    console.log(profile)
    return(profile)
  } catch(e) { 
    console.log(`Error, ${e.message}, Email not Found.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}

async function validEML(email){ //  DAL call: //account/pwval/:email
  try{
    const profile = await User.findOne(
      { email: email }
      ,     { 'email':1, '_id':0 }
      )
    console.log(profile)
    return(profile.email)
  } catch(e) { 
    console.log(`Error, ${e.message}, Email not Found.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}

async function validPW(password){ //  DAL call: //account/pwval/:password
  try{
    const profile = await User.findOne(
      { password: password }
      ,     { 'password':1, '_id':0 }
      )
    console.log(profile)
    return(profile.password)
  } catch(e) { 
    console.log(`Error, ${e.message}, Password not Found.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}

//ADMIN OPERATIONS: TODO: Add Authentication
async function findEmail(email){ //  DAL call: //account/byemail
  try{
    const profile = await User.findOne({ email: email })
    console.log(profile)
    return(profile)
  } catch(e) { 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
async function findName(name){ //  DAL call: //account/byname
  try{
    const profile = await User.findOne({ name: name })
    console.log(profile)
    return(profile)
  } catch(e) { 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}
 
// Logged In OPERATIONS TODO: Logged In OPs need to have Auth Added for 
 async function changePW(email, newPassword){ //  DAL call: /account/:email/updtpw
  try{
    const update = await User.updateOne({ email: email }, { $set: { password: newPassword } })
    console.log(update)
    console.log(`Password for ${email}'s account updated`)
    return(`Password for ${email}'s account updated`)
  } catch(e) { 
    console.log(`${e.message}; The above text was an error message.`); 
    return(`An Error occured. Error Details: ${e.message}`)}
}


module.exports = { newUser, validPW, validEML, validLogin, login, changePW, findEmail, findName, addMoney, removeMoney,  all}