const mongoose = require('mongoose');

/* This is creating a schema for the employee model. */
const employeeSchema =  new mongoose.Schema({
    id: {type: Number, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    startDate: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
    department: {type: String, required: true}
});

module.exports = mongoose.model('Employee', employeeSchema);