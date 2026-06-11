const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  desc: { 
    type: String 
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  status: { 
    type: String, 
    default: 'Em andamento'
  },
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Task', TaskSchema);