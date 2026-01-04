const mongoose = require('mongoose');

const petInfoSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  petName: { 
    type: String, 
    required: true 
  },
  petType: { 
    type: String, 
    required: true,
    enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Other']
  },
  breed: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number 
  },
  weight: { 
    type: Number 
  },
  dietaryRecommendations: [{
    foodType: String,
    portionSize: String,
    frequency: String
  }],
  careInstructions: [String],
  healthNotes: String
}, { 
  timestamps: true 
});

module.exports = mongoose.model('PetInfo', petInfoSchema);
