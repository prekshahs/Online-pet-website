const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  services: [String],
  operatingHours: String,
  rating: { 
    type: Number, 
    default: 0 
  },
  emergencyAvailable: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

hospitalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema);
