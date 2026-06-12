const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  desc: {
    type: String,
    trim: true
  },

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['Em andamento', 'Concluído', 'Atrasado'],
    default: 'Em andamento'
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)
