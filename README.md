# Company Contact Data Upload and Storage
This project allows you to upload company and contact data from an Excel file (demo.xls) to a MongoDB database using Node.js, Express, and Mongoose.

# Workflow

Upload Data: Use the /upload endpoint to upload an Excel file (demo.xls) containing company and contact data.

Process and Store: After uploading, use the /confirm endpoint to process the uploaded data, check for duplicates, and store valid entries in the database.

Installation

Clone the repository:
git clone https://github.com/your/repository.git
cd repository

Install dependencies:
npm install

Configure MongoDB:
Make sure MongoDB is installed and running locally or update the MongoDB URI in database.js file.

Start the server:
npm start

# Usage
Uploading Data
Prepare your data in an Excel file format (demo.xls).
Send a POST request to http://localhost:5000/upload with the Excel file attached as file form-data.
