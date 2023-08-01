const express = require("express");
const mainRouter = express.Router();
const homeControll = require("../controllers/home");
const employecontrol = require("../controllers/employeeContr");
const isAuthenticated = require('../middlewares/authMiddleware');
const studentControl = require('../controllers/studentContr');
const companyController = require("../controllers/companyContr");




mainRouter.get('/',homeControll.homeScr);
mainRouter.get('/register',employecontrol.userReg);
mainRouter.post('/register',employecontrol.signup);
mainRouter.get('/login',employecontrol.userLog);
mainRouter.post('/login',employecontrol.userLogin);
mainRouter.get('/logout',employecontrol.userLogout);



mainRouter.get('/login/placementCell',isAuthenticated,employecontrol.userLogged);
mainRouter.get('/login/placementCell/student',isAuthenticated,employecontrol.showStudentDetails);
mainRouter.post('/login/placementCell/student',isAuthenticated,employecontrol.studentDetails);
mainRouter.get('/login/placementCell/company',isAuthenticated,employecontrol.showCompanyDetails);
mainRouter.post('/login/placementCell/company',isAuthenticated,employecontrol.companyDetails);



// mainRouter.get('/login/placementCell/student/addStudent',isAuthenticated,employecontrol.showStudentDetails);
// mainRouter.post('/login/placementCell/student/',isAuthenticated,employecontrol.studentDetails);
  
mainRouter.post('/login/placementCell/student/addStudent',isAuthenticated,studentControl.addStudent);
mainRouter.get('/login/placementCell/student/addStudent',isAuthenticated,studentControl.sendStudent);
mainRouter.delete('/login/placementCell/student/delete/:id',isAuthenticated,studentControl.delStudent);
mainRouter.get('/login/placementCell/student/download',isAuthenticated,studentControl.downloadCsv);
// mainRouter.get('/login/placementCell/student/download',isAuthenticated,studentControl.downloadCsvfile);

// mainRouter.get('/login/placementCell/company/interviews',isAuthenticated,companyController.listCompanies);
mainRouter.post('/login/placementCell/company/addinterview',isAuthenticated,companyController.addInterview);
mainRouter.get('/login/placementCell/company/addinterview',isAuthenticated,companyController.sendInterview);
mainRouter.post('/login/placementCell/company/allotStudent/:id',isAuthenticated,companyController.allotStudent);
mainRouter.get('/login/placementCell/company/allotStudent/:id',isAuthenticated,companyController.showStudent);
// mainRouter.post('/login/placementCell/company/allotStudent/:id',isAuthenticated,companyController.updateStudent);
// mainRouter.get('/login/placementCell/company/allotStudent/:id',isAuthenticated,companyController.showStudent);
// mainRouter.post('/login/placementCell/company/updateinterview',isAuthenticated,companyController.updateInterview);
mainRouter.delete('/login/placementCell/company/deleteinterview/:id',isAuthenticated,companyController.deleteInterview);


module.exports=mainRouter;