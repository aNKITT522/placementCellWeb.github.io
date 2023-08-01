
const EmployeeDb = require('../model/employeeDb');


module.exports.signup = async function (req, res) {
  const { username, email, password } = req.body;
  console.log('Received user data:', { username, email, password });

  try {
    const checkEmail = await EmployeeDb.findOne({ email: email });
    if (checkEmail) {
      console.log("User already exists with this email");
      return res.json({ "message": "User Already Exists With This Email" });
    } else {
      const employee = new EmployeeDb({ username, email, password });
      const employeeSave = await employee.save();
      if (employeeSave) {
        console.log("Employee saved successfully");
        // return res.status(201).send("New employee saved successfully");
         const formSubmitted = true;

         return  res.render('registration', { formSubmitted });;
      } else {
        throw "Employee not saved";
      }
    }
  } catch (error) {
    console.log("Error in saving employee", error);
    return res.status(500).send("Internal Server Error");
    }
};


module.exports.userReg = async function(req,res){
    
    res.render('registration');
}


module.exports.userLogin = async function(req,res){
    const {email,password}= req.body;
    // let loginDetails=await EmployeeDb.findOne({email,password});
    // Authentication and user login logic here...

    
//   res.redirect('/dashboard'); // Redirect the user to the dashboard after login
    
  try {
    // Finding login details based on email and password
    const loginDetails = await EmployeeDb.findOne({ email, password });

    if (loginDetails) {
      // Login successful, handle further actions (e.g., create session, redirect, etc.)
      console.log('Login successful:', loginDetails);
      
    //   res.send('Login successful!');
    // After successful login, set user data in the session
  req.session.user = {email};
    return res.redirect('/login/placementCell');
    } else {
      // No matching user found, handle failed login
      console.log('Invalid credentials');
      res.send('Invalid credentials');
    }
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.log('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports.userLog = async function(req,res){
    
    res.render('logIn');
}
module.exports.userLogged = async function(req,res){


    res.render('main');
}
module.exports.userLogout = async function(req,res){
    req.session.destroy();
    res.redirect('/login'); // Redirect the user to the login page after logout
}

module.exports.showStudentDetails = async function(req,res){
    res.render('student');
    
}
module.exports.studentDetails = async function(req,res){
    
    return res.redirect('/login/placementCell/student');
}
module.exports.showCompanyDetails = async function(req,res){
    res.render('company');
    
}
module.exports.companyDetails = async function(req,res){
    
     res.redirect('/login/placementCell/company');
}




