const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a Name'],
    trim: true,    
  },
  email: {
    type: String,
    trim: true,    
    required: [true, 'Please enter Email Address'],
    lowercase: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email address.',
    ],
    validate: {
      validator: async function(email) {
        const user = await this.constructor.findOne({ email });
        if(user) {
          if(this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified email address is already in use.'
    },
    dropDups: true,
  },
  password: {
    type: String,
    minLength: [8, 'Password must be at least 6 characters'],
    required: [true, 'Please enter a password'],
    trim: true,
  },
  balance: {
    type: Number,
    min: [0, 'Overdrafting from your account is not allowed, please enter a positive amount'],
    default: 0,
  },
  accounts: {
    checking: Number, savings: Number
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now() 
  },
  updatedAt: {
    type: Date,
    default: () => Date.now() 
  },
})

userSchema.statics.findByEmail = function(email) {
  return this.where({ email: new RegExp(email, 'i')}) // where or find work the same here.
}

userSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i')})
}

userSchema.query.byName= function(name) { // query here means it's like a method to a 'find' query
  return this.where({ name: new RegExp(name, 'i')})
}

const User = mongoose.model('users', userSchema)
module.exports = User

// module.exports = mongoose.model('users', userSchema)

/*Basic Schema
const userSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
  balance: {type: Number},
})
*/