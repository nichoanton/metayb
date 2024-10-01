const mongoose = require('mongoose');

const assemblyLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bikeType: { type: String, required: true, enum: ['Honda', 'Yamaha', 'Enfield'] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssemblyLog', assemblyLogSchema);
