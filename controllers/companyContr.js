const InterviewDb =require("../model/companydb");

module.exports.addInterview = async function(req,res){
    const {title,date,companyName}=req.body;

    console.log(req.body);
    try {
        const interviewData = 
            {
              Company:companyName,
              Title:title,
              Date : date
            }
          ;
          // Create an instance of the Company model with only the interview data
      const newCompany = new InterviewDb({
         interviews: interviewData,
         });
      const interviewSave = await newCompany.save();

      if (interviewSave) {
        console.log("interview saved successfully");
        // return res.status(201).send("New employee saved successfully");
         const formSubmitted = true;

         return  res.render('company', { formSubmitted });;
      } else {
        throw "student data not saved";
      }
    } catch (error) {
        return next(new Error('Something went wrong!'));
    }
}

// module.exports.allotStudent = async function(req,res){
// res.redirect("./login/placement")

// }
































// module.exports.addStudent = async function(req,res){
//     const {name,batch,email,interview_id}=req.body;

//     console.log(req.body);
//     try {
//         const studentData = 
//             {
//               Name:name,
//               Batch:batch,
//               Email : email
//             }
//           ;
//           // Create an instance of the Company model with only the interview data
//       const newCompany = new InterviewDb({
//         students: studentData,
//          });
//       const studentSave = await newCompany.save();

//       if (studentSave) {
//         console.log("student added successfully");
//         // return res.status(201).send("New employee saved successfully");
//          const formSubmitted = true;

//          return  res.render('company', { formSubmitted });;
//       } else {
//         throw "student data not saved";
//       }
//     } catch (error) {
//         return next(new Error('Something went wrong!'));
//     }
// }

module.exports.sendInterview = async function(req,res){
    try {
        const interview = await InterviewDb.find();
        res.json(interview);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching interviews' });
    }
}

module.exports.allotStudent = async function(req,res){
    try {
        const interviewId = req.params.id;
        const studuentData = req.body; // Assuming the student data is sent in the request body
        // const interviewId = studentData.interviewId;
        console.log(studuentData+interviewId);
    
        // ... Code to allot the student to the interview based on interviewId and studentData ...
    
        // Send a response back to the frontend indicating successful allotment
        res.json({ success: true, message: 'Student allotted successfully.' });
      } catch (error) {
        console.error('Error allotting student:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
}



// module.exports.addStudent = async function(req,res){
//     try {
//         const interview = await InterviewDb.find();
//         res.json(interview);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching students' });
//     }
// }

// module.exports.updateStudent = async function(req,res){
//     console.log("inside update student");
//     try {

//         const interviewId = req.params.id;
//         console.log("In update student interviewid"+ interviewId);
//         const studentData = req.body; // This will contain the data sent from the frontend form
//         console.log("In update student student data"+studentData);
    
//         // Find the Company document that contains the interview with the given interviewId
//         const company = await InterviewDb.findOne({ 'interviews._id': interviewId });
//         console.log(company);
    
//         if (!company) {
//           return res.status(404).json({ success: false, message: 'Interview not found.' });
//         }
    
//         // Find the interview with the given interviewId in the Company document
//         const interview = company.interviews;
    
//         if (!interview) {
//           return res.status(404).json({ success: false, message: 'Interview not found.' });
//         }
    
//         // Add the studentData to the students array of the interview
//         company.students.push(studentData);
    
//         // Save the updated Company document back to the database
//         await company.save();
    
//         res.json({ success: true, message: 'Student allotted successfully.' });
//     //     const interviewId = req.params.id;
//     //    const {name ,batch,email} = req.body;
//     //     const interview= await InterviewDb.findById(req.params.id).catch(function(err){ console.log(err)});
//     //     if(interview){

//     //     }
//         // Retrieve the data sent from the frontend, e.g., student details, and update the database accordingly
//         // ...
    
//         // Send a response back to the client
//         // res.json({ message: 'Student allotted successfully!' });
//       } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred.' });
//       }
// }

// module.exports.showStudent = async function(req,res){
//     res.redirect('/login/placementCell/company/allotStudent');
// }
module.exports.deleteInterview = async function(req,res){
    // in this the question will be deleted
    const interv= await InterviewDb.findById(req.params.id).catch(function(err){ console.log(err)})
    if(interv){
        await InterviewDb.deleteOne({ _id: req.params.id }).catch(function(err){ console.log(err)})

    }
    else{
        res.send('interview does not exist')
    }
}


module.exports.showStudent = async function (req,res){
    res.render('company');
}



























// const InterviewDb = require("../model/companydb");
// const Company = require('../model/companydb'); // Assuming the model file is named 'company.js'

// // Controller function to display the list of companies with their interviews and students
// module.exports.listCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find().exec();
//     res.render('company', { companies }); // Assuming you have a view file named 'companies.hbs'
//   } catch (error) {
//     res.status(500).send('Error fetching data');
//   }
// };

// // Controller function to add a new interview to a company
// module.exports.addInterview = async (req, res) => {
//   try {
//     const {date, title } = req.body; // Assuming you get companyId from the form or request
//     const interview = Company({
//         interviews:{
//             Date:date,
//             Title:title
//         }
//     });
//     res.redirect('/login/placementCell/company'); // Redirect to the companies page after adding the interview
//   } catch (error) {
//     res.status(500).send('Error adding interview');
//   }
// };

// // Controller function to add a new student to an interview
// module.exports.addStudent = async (req, res) => {
//   try {
//     const { companyId, interviewId, name, batch, email } = req.body; // Assuming you get companyId and interviewId from the form or request
//     const student = { name, batch, email };
//     await Company.updateOne({ _id: companyId, 'interviews._id': interviewId }, { $push: { 'interviews.$.students': student } });
//     res.redirect('/login/placementCell/company'); // Redirect to the companies page after adding the student
//   } catch (error) {
//     res.status(500).send('Error adding student');
//   }
// };

// // Controller function to update an interview's date and company
// module.exports.updateInterview = async (req, res) => {
//   try {
//     const { companyId, interviewId, date, company } = req.body; // Assuming you get companyId and interviewId from the form or request
//     await Company.updateOne({ _id: companyId, 'interviews._id': interviewId }, { $set: { 'interviews.$.date': date, 'interviews.$.company': company } });
//     res.redirect('/login/placementCell/company'); // Redirect to the companies page after updating the interview
//   } catch (error) {
//     res.status(500).send('Error updating interview');
//   }
// };

// Controller function to delete an interview
// module.exports.deleteInterview = async (req, res) => {
//   try {
//     const { companyId, interviewId } = req.body; // Assuming you get companyId and interviewId from the form or request
//     await Company.findByIdAndUpdate(companyId, { $pull: { interviews: { _id: interviewId } } });
//     res.redirect('/login/placementCell/company'); // Redirect to the companies page after deleting the interview
//   } catch (error) {
//     res.status(500).send('Error deleting interview');
//   }
// };

// module.exports = exports;


// module.exports.addInterview = async function (req,res){
//     const {title,date}= req.body;

//     console.log(req.body);
//     try {
//         const interview = new InterviewDb({ 
//             Date: date,
//             Title:title
//         });
//       const interviewSave = await interview.save();

//       if (interviewSave) {
//         console.log("interview saved successfully");
//         // return res.status(201).send("New employee saved successfully");
//          const formSubmitted = true;

//          return  res.render('company', { formSubmitted });;
//       } else {
//         throw "student data not saved";
//       }



//     } catch (error) {
//         return next(new Error('Something went wrong!'));
//     }

    

    
// }