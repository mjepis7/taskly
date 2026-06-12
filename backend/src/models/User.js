const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },

  cpf: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\d{11}$/
  },

  dataNascimento: {
    type: Date,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  senha: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
