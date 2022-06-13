
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Employee = require('./models/Employee');


/* Connecting to the MongoDB database. */
mongoose.connect('mongodb+srv://DevWeb13:NhLvSJm8bVsb2gX@cluster0.nqxxv.mongodb.net/?retryWrites=true&w=majority',
  {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
const port = process.env.PORT || 5000;


/* Parsing the body of the request. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Allowing the frontend to access the backend. */
app.use(cors({
  origin: '*'
}));
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


/* A GET request to the /employees route. It is using the Employee model to find all the employees in
the database. If it is successful, it will return a status of 200 and the employees. If it is not
successful, it will return a status of 400 and the error. */
app.get('/employees', (_req, res) => {
  Employee.find()
    .then(employees => res.status(200).json(employees))
    .catch(error => res.status(400).json({ error }));
});


/* Creating a new employee with the data from the request body. */
app.post('/employees', (req, res) => {
  const employee = new Employee({
    ...req.body
  });
  employee.save()
    .then(() => res.status(201).json({ message: 'Employee added successfully' }))
    .catch(error => res.status(400).json({ error }));
});

app.listen(port, () => console.log('Server started at http://localhost:' + port));
