const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Garante que não teremos dois usuários com o mesmo e-mail
  },
  senha: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true // Cria automaticamente os campos "createdAt" e "updatedAt"
});

module.exports = mongoose.model('User', UserSchema);