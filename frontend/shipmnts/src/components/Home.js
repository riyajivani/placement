import React, { useState } from 'react'
import './home.css'
import axios from 'axios'

function Home() {

     const [data, setData] = useState([])
     const [file, setFile] = useState(null)
     const [error, setError] = useState('')
     const [isReview, setIsReview] = useState(false)

     const handleSubmit = async (e) => {
          e.preventDefault()
          console.log("file submitted")
          if (!file) {
               setError('Please upload a file');
               return;
          }

          const formData = new FormData();
          formData.append('file', file);

          try {
               const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                    },
               });
               setData(response.data);
               setIsReview(true);
          } catch (err) {
               setError('Error uploading file');
          }
     }

     const handleConfirm = async () => {
          console.log("submitted")
          console.log(data)
          try {
               const res = await axios.post('http://localhost:5000/confirm', { data: data });
               console.log(res)
               console.log('Data successfully added to database');
               setIsReview(true);
               window.location.reload()

          } catch (err) {
               setError('Error confirming data');
          }
     }

     const handleCancel = () => {
          setData([]);
          setFile(null)
          window.location.reload()
     }

     return (
          <div className='container'>
               <h2>Upload Files</h2>

               {!isReview ?
                    (
                         <form onSubmit={handleSubmit}>
                              <input type='file'
                                   className='file-accept'
                                   accept='.xls and .xlsx'
                                   onChange={(e) => { setFile(e.target.files[0]) }} />

                              {file && <button type='submit' className='btn-yes' onClick={handleSubmit}>submit</button>}
                         </form>
                    )
                    :
                    (<>
                         <div className='table-container'>
                              <table>
                                   <thead>
                                        <tr>
                                             <th>Company Name</th>
                                             <th>Company Address</th>
                                             <th>Company Phone</th>
                                             <th>Company Email</th>
                                             <th>Company Website</th>
                                             <th>Number of Employees</th>
                                             <th>Founded Date</th>
                                             <th>Industry Type</th>
                                             <th>Contact Name</th>
                                             <th>Contact Email</th>
                                             <th>Contact Phone</th>
                                             <th>Date of Birth</th>
                                             <th>Contact Type</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {data.map((row, index) => (
                                             <tr key={index}>
                                                  <td>{row.companyName}</td>
                                                  <td>{row.companyAddress}</td>
                                                  <td>{row.companyPhone}</td>
                                                  <td>{row.companyEmail}</td>
                                                  <td>{row.companyWebsite}</td>
                                                  <td>{row.numberOfEmployees}</td>
                                                  <td>{row.foundedDate}</td>
                                                  <td>{row.industryType}</td>
                                                  <td>{row.contactName}</td>
                                                  <td>{row.contactEmail}</td>
                                                  <td>{row.contactPhone}</td>
                                                  <td>{row.dateOfBirth}</td>
                                                  <td>{row.contactType}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                         <div className="btns">
                              <button className='btn-yes' onClick={handleConfirm}>confirm</button>
                              <button className='btn-no' onClick={handleCancel}>cancel</button>
                         </div>
                    </>)
               }

               {error && <p className='error-info'>{error}</p>}
          </div>
     )
}

export default Home


// src/components/FileUpload.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [isReview, setIsReview] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please upload a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setData(response.data);
//       setIsReview(true);
//     } catch (err) {
//       setError('Error uploading file');
//     }
//   };

//   const handleConfirm = async () => {
//     try {
//       await axios.post('http://localhost:5000/confirm', { data });
//       alert('Data successfully imported');
//     } catch (err) {
//       setError('Error confirming data');
//     }
//   };

//   return (
//     <div>
//       {!isReview ? (
//         <form onSubmit={handleSubmit}>
//           <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
//           <button type="submit">Upload</button>
//         </form>
//       ) : (
//    <div>
//      <table>
//        <thead>
//          <tr>
//            <th>Company Name</th>
//            <th>Company Address</th>
//            <th>Company Phone</th>
//            <th>Company Email</th>
//            <th>Company Website</th>
//            <th>Number of Employees</th>
//            <th>Founded Date</th>
//            <th>Industry Type</th>
//            <th>Contact Name</th>
//            <th>Contact Email</th>
//            <th>Contact Phone</th>
//            <th>Date of Birth</th>
//            <th>Contact Type</th>
//          </tr>
//        </thead>
//        <tbody>
//          {data.map((row, index) => (
//            <tr key={index}>
//              <td>{row.companyName}</td>
//              <td>{row.companyAddress}</td>
//              <td>{row.companyPhone}</td>
//              <td>{row.companyEmail}</td>
//              <td>{row.companyWebsite}</td>
//              <td>{row.numberOfEmployees}</td>
//              <td>{row.foundedDate}</td>
//              <td>{row.industryType}</td>
//              <td>{row.contactName}</td>
//              <td>{row.contactEmail}</td>
//              <td>{row.contactPhone}</td>
//              <td>{row.dateOfBirth}</td>
//              <td>{row.contactType}</td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//      <button onClick={handleConfirm}>Confirm</button>
//    </div>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default FileUpload;

