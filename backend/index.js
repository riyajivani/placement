const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const cors = require('cors');
require("./database")
const { Company, Contact } = require('./model');

const app = express();
app.use(cors());
app.use(express.json());


const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
     const file = req.file;
     const workbook = xlsx.readFile(file.path);
     const sheet = workbook.Sheets[workbook.SheetNames[0]];
     const data = xlsx.utils.sheet_to_json(sheet);

     const formattedData = data.map((row) => ({
          companyName: row['Company Name'],
          companyAddress: row['Company Address'],
          companyPhone: row['Company Phone'],
          companyEmail: row['Company Email'],
          companyWebsite: row['Company Website'],
          numberOfEmployees: row['Number of Employees'],
          foundedDate: row['Founded Date'],
          industryType: row['Industry Type'],
          contactName: row['Contact Name'],
          contactEmail: row['Contact Email'],
          contactPhone: row['Contact Phone'],
          dateOfBirth: row['Date of Birth'],
          contactType: row['Contact Type'],
     }));

     res.json(formattedData);
});

app.post('/confirm', async (req, res) => {
     const data = req.body.data;

     console.log("Received data to confirm:", data);

     const session = await mongoose.startSession();
     session.startTransaction();

     try {
          for (const row of data) {
               let existingCompany = await Company.findOne({ 
                    name: row.companyName,
                    email: row.companyEmail
               }).session(session);

               if (!existingCompany) {
                    const company = new Company({
                         name: row.companyName,
                         address: row.companyAddress,
                         phone: row.companyPhone,
                         email: row.companyEmail,
                         website: row.companyWebsite,
                         numberOfEmployees: row.numberOfEmployees,
                         foundedDate: row.foundedDate,
                         industryType: row.industryType,
                    });

                    const savedCompany = await company.save({ session });

                    const contact = new Contact({
                         name: row.contactName,
                         email: row.contactEmail,
                         phone: row.contactPhone,
                         dateOfBirth: row.dateOfBirth,
                         contactType: row.contactType,
                         company: savedCompany._id,
                    });

                    await contact.save({ session });
               } else {
                    console.log(`Company '${row.companyName}' already exists. Skipping...`);
               }
          }

          await session.commitTransaction();
          session.endSession();

          res.sendStatus(200);
     } catch (error) {
          await session.abortTransaction();
          session.endSession();
          console.error('Error saving data:', error);
          res.status(500).send('Error saving data');
     }
});


app.listen(5000, () => {
     console.log('Server running on http://localhost:5000');
});
