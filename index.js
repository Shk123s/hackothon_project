const express = require("express");
const connection = require("./database");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(bodyParser.json({ type: "application/json" }));
const getPatientHistory = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params)
    if (!req.params.id) {
      res.status(400).send({
        message: "missing parameter",
      });
    } else {
        const queryStrng =
         "select patient_log.patient_id,patients.first_name, reports.id as report_id  ,reports.name as report_name,doctors.id as doctors_id ,doctors.name as doctors_name from patient_log inner join reports join doctors  join patients on  patient_log.patient_id = reports.patient_id  and patient_log.doctor_id=doctors.id and reports.patient_id=patients.id  where patient_log.patient_id = ?";
        const [results] = await connection.promise().query(queryStrng,[id]);
        if (!results || results.length === 0) {
          res.status(404).send({message:" no user found"})
        }
        
     else{
      res.status(200).send({
        message: "done successfully",
        result: results,
        
      });
      // console.log(results);
     }
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error,
    });
    // console.log(error);
  }
};
const getdoctors = async (req, res) => {
  try {
   
    let queryStrng = `select * from doctors`;
    const [results] = await connection
      .promise()
      .query(queryStrng);
    res.status(201).send({
      message: " list of doctors  ",
      results,
    });
    console.log(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error while operation",
    });
  }
};
const Addreports = async (req, res) => {
    try {
        const { report_date,name, diagnosis, treatment_plan, notes,patient_id } = req.body;
        console.log(req.body);
        let queryStrng = `insert into reports(report_date,name, diagnosis, treatment_plan, notes,patient_id) values(? ,? ,?,? ,?,?)`;
        const [results] = await connection
          .promise()
          .query(queryStrng, [report_date,name, diagnosis, treatment_plan, notes,patient_id]);
        res.status(201).send({
          message: "reports successfully added ",
          results,
        });
        console.log(results);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "error while operation",
        });
      }
};
const getreports = async (req, res) => {
  try {
   
    const queryStrng = "select * from reports";
    const [results] = await connection.promise().query(queryStrng);
    //  console.log(results)///
    if (results[0].affectedRows === 0) {
      res.status(404).send({
        message: "user Not found",
      });
    } else {
      res.status(200).send({
        message: "List of reports",
        results,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({
      message: "no data",
      error,
    });
  }
};
// const getUserbyid = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const queryStrng = "select * from users where id=?";
//     const [results] = await connection.promise().query(queryStrng, [id]);

//     if (results.length === 0) {
//       res.send({ message: " user not found" });
//     } else {
//       res.status(200).send({
//         message: "user found",
//         result: results[0],
//       });
//     }
//     // console.log(results[0])
//   } catch (error) {
//     res.status(500).send({
//       message: "internal server error",
//     });
//   }
// };
const getPatientDetails =  async (req,res)=>{
 try {
  const queryStrng = "select *  from patients  "
 const [results] = await connection.promise().query(queryStrng);
if (!results || results.length === 0) {
  res.status(404).send({message:"user not found"})
}
else{
  res.status(200).send({
    message:" patients List ",
    list :results
  });
  // console.log(resultsCount)
  //  console.log(results);
}
  
 } catch (error) {
  res.status(500).send({
    message:"Internal server error",
    error:error
  });
  console.log(error);
 }
};

// app.post("/users", );
app.get("/doctors",getdoctors );
app.get("/reports",getreports )
app.get("/patients",getPatientDetails )
app.get("/getPatientHistory/:id",getPatientHistory );
app.post("/reports",Addreports );
// app.get("/users/:id" );
app.listen(3000, () => {
  console.log("3000 server started");
});