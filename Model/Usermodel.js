const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    
    trim: true,
    minlength: 8
  },
  email : {
    type: String,
    required: true,
    
    trim: true,
    minlength: 14 
  },
  count : {
      type : Number
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;