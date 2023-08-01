const StudentDB = require('../model/studentDb');

module.exports.addStudent = async function(req,res){
    const {batch,name,email,placed,scores,interviews,resultStatus} = req.body;
    // console.log(req.body.scores);
    console.log(req.body);
    try {
        const student = new StudentDB({ Batch: batch,
            Name: name,
            Email: email,
            Placed: placed,
            Scores: scores,
            Interviews: interviews,
            ResultStatus: resultStatus});
      const studentSave = await student.save();

      if (studentSave) {
        console.log("student data saved successfully");
        // return res.status(201).send("New employee saved successfully");
         const formSubmitted = true;

         return  res.render('student', { formSubmitted });;
      } else {
        throw "student data not saved";
      }



    } catch (error) {
        return next(new Error('Something went wrong!'));
    }



    // try{
    //     const studentData= req.body;
    //     console.log("Add new student data:", JSON.stringify(studentData));
    //     await StudentDB.create({...studentData});
    //     res.status(201).json({"message":"New student added successfully!"})
    //     }catch (err) {
    //         return next(new Error('Something went wrong!'));
    // };

    // return res.redirect('/login/placementCell/student/addStudent');

}

module.exports.sendStudent = async function(req,res){
    try {
        const students = await StudentDB.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching students' });
    }
}

module.exports.delStudent = async function(req,res){
    // in this the question will be deleted
    const stud= await StudentDB.findById(req.params.id).catch(function(err){ console.log(err)})
    if(stud){
        await StudentDB.deleteOne({ _id: req.params.id }).catch(function(err){ console.log(err)})

    }
    else{
        res.send('student does not exist')
    }
}



module.exports.downloadCsv = async function(req,res){
    try {
      const students = await getStudentData(); // Replace this with your function to fetch student data
      const csvData = convertToCSV(students); // Replace this with your function to convert student data to CSV format
  
      // Set response headers for file download
      res.setHeader('Content-disposition', 'attachment; filename=students.csv');
      res.setHeader('Content-type', 'text/csv');
  
      // Send the CSV data as response
      res.send(csvData);
    } catch (error) {
      console.error('Error downloading student data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  function convertToCSV(students) {
    const fields = ['Batch', 'Name', 'Email', 'Placed', 'ResultStatus'];
    const courseFields = students.reduce((acc, student) => {
      student.Scores.forEach((score) => {
        if (!acc.includes(score.course)) {
          acc.push(score.course);
        }
      });
      return acc;
    }, []);
  
    const interviewFields = ['Interview Date', 'Company'];
  
    const rows = [];
  
    // Add CSV header row
    const headerRow = fields.concat(courseFields).concat(interviewFields);
    rows.push(headerRow.join(','));
  
    // Add data rows
    students.forEach((student) => {
      const dataRow = [
        student.Batch,
        student.Name,
        student.Email,
        student.Placed,
        student.ResultStatus,
      ];
  
      // Add course scores
      courseFields.forEach((course) => {
        const score = student.Scores.find((score) => score.course === course);
        dataRow.push(score ? score.score : '');
      });
  
      // Add interview data
      student.Interviews.forEach((interview) => {
        dataRow.push(interview.date, interview.company);
      });
  
      rows.push(dataRow.join(','));
    });
  
    // Join all rows with newlines to create CSV string
    const csvString = rows.join('\n');
    return csvString;
  }
  
  async function getStudentData() {
    try {
      const students = await StudentDB.find({}, {
        Batch: 1,
        Name: 1,
        Email: 1,
        Placed: 1,
        ResultStatus: 1,
        'Scores.course': 1,
        'Scores.score': 1,
        'Interviews.date': 1,
        'Interviews.company': 1,
      }).exec();
      return students;
    } catch (error) {
      throw error;
    }
  }
  