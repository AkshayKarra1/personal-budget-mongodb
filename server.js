const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Budget = require('./models/budget');
const app = express();
const port = 3000;

// Connect to your MongoDB database
async function connectToDb() {
  try {
    await mongoose.connect(
      'mongodb+srv://akshay:personal_budget@cluster0.8daphed.mongodb.net/personal_budget?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('connected to DB');
  } catch (error) {
    console.log('connection failed');
  }
}

connectToDb();

app.use(bodyParser.json());

// Endpoint to fetch budget data
app.get('/get-budget', async (req, res) => {
  try {
    const budgetData = await Budget.find();
    res.json({ myBudget: budgetData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to add new budget data
app.post('/add-budget', async (req, res) => {
  const { title, budget, color } = req.body;
  try {
    const newBudgetItem = new Budget({ title, budget, color });
    await newBudgetItem.save();
    res.status(201).json({ message: 'Budget item added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation error
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
