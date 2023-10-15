const mongoose = require('mongoose');

// Define a schema for budget data
const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^#([0-9a-fA-F]{6})$/.test(v);
      },
      message: 'Color must be in hexadecimal format, e.g., #ED4523',
    },
  },
});

module.exports = mongoose.model('Budget', budgetSchema);
