const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
     name: { type: String, required: true },
     address: { type: String },
     phone: { type: String },
     email: { type: String },
     website: { type: String },
     numberOfEmployees: { type: Number },
     foundedDate: { type: Date },
     industryType: {
          type: String,
          enum: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Other'],
          required: true
     },
});

const Company = mongoose.model('Company', companySchema);

const contactSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     phone: { type: String },
     dateOfBirth: { type: Date },
     contactType: {
          type: String,
          enum: ['Primary', 'Secondary', 'Other'],
          required: true
     },
     company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
     Company,
     Contact
};
