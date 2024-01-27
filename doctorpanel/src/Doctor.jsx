import React, { useEffect, useState } from 'react';
import Header from './header';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Doctor = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUser, setSearchedUser] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/getPatientHistory/${id}`, {
//           withCredentials: true,
//         });

//         // Assuming the response contains the user data
//         setUser(response.data.user);

//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//         // Handle error or display a message to the user
//       }
//     };

//     fetchData();
//   }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getPatientHistory/${searchTerm}`, {
        withCredentials: true,
      });

      // Assuming the response contains the searched user data
      setUser(response.data.result);

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching searched user data:', error.message);
      // Handle error or display a message to the user
    }
  };
console.log(user)
  return (
    <div className="doctorpanel">
      <Header />

      <Typography variant="h3" className="heading">
        Users
      </Typography>
      <TextField
        id="outlined-basic"
        label="Search user"
        variant="outlined"
        className='inputfield'
        style={{ marginTop: '10px' }}
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <button onClick={handleSearchSubmit}>Search</button>

      <ToastContainer />
<div>

{user.map((patentData) => {
        return (
           
          <div className="patentdata" key={patentData.id}>
              <h1>Medical History Yet...</h1>
            <h1>Name : {patentData.first_name}</h1>
              <h1>Report ID: {patentData.report_id}</h1>
              <h1>Report Name: {patentData.report_name}</h1>
              <h1>Doctor ID: {patentData.doctors_id}</h1>
              <h1>Doctor Name: {patentData.doctors_name}</h1>
          </div>
        );
      })}
</div>
      
    </div>
  );
};

export default Doctor;
