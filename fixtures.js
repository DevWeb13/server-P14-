require('dotenv').config();
const mongoose = require('mongoose');

const Employee = require('./models/Employee');
const data = require('./employees.js');


// Replace process.env.MONGODB_URI with YOUR mongodb url !!!!!
const cleAPI = process.env.MONGODB_URI || '';

async function start() {
  /* Connecting to the MongoDB database. */
  try {
    await mongoose.connect(cleAPI,
      {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log('Connexion à MongoDB réussie !');
    for (const fixture in data) {
      console.log(fixture);
      const employee = new Employee(data[fixture]);
      await employee.save();
      console.log('Employee added successfully')
    }
  }
  catch (error) {
    console.log(error);
  }
}

start();