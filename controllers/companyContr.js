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

