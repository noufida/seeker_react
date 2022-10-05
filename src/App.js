import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/user/LoginPage';
import {AuthProvider} from './context/authContext'
import {JobProvider} from './context/jobContext'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/user/homePage';
import RegisterPage from './pages/user/RegisterPage'
import VerifyPage from './pages/user/verifyPage'
import ForgotPassword from './pages/user/forgotPassword';
import EmployerReg from './pages/employer/employerRegPage';
import EmployerHomePage from './pages/employer/employerHomePage';
import JobPost from './pages/employer/jobPostPage'
import JobJd from './pages/employer/jdPage'
import MyJob from './pages/employer/myJobPage'
import CandidatePage from './pages/employer/candidatePage'
import AddSkillPage from './pages/employer/addSkillPage'
import DashboardPage from './pages/employer/dashboardPage'
import JobDetailPage from './pages/employer/jobDetailPage'
import UploadResumePage from './pages/user/uploadResumePage'
import SplitPage from './pages/user/splitPage'
import ProfilePage from './pages/user/profilePage'
import QualificationPage from './pages/user/qualificationPage'
import ExperiencePage from './pages/user/experiencePage'
import SkillSetPage from './pages/user/skillSetPage'
import JobPage from './pages/user/jobPage'
import SingleJob from './pages/user/singleJobPage'
import RecJob from './pages/user/recJobPage'
import AccountPage from "./pages/user/accountPage";
import ApplicantPage from "./pages/employer/applicantPage";
import ApplicantProfPage from "./pages/employer/applicantProfPage";
import PaymentPage from './pages/employer/paymentPage'
import PlanPage from './pages/employer/planPages'
import ApplicationPage from './pages/user/applicationPage'
import AccountCompPage from './pages/employer/accouontPage'
import { EmpProvider } from './context/empContext';
import PrivateRoute from './utils/privateRoute';
import EmpRoute from './utils/EmpRoute';
import AdminRoute from './utils/AdminRoute';
// import ValidRoute from './utils/ValidEmpRoute';
import SavePage from './pages/user/savePage'
import SearchPage from './pages/user/SearchPage'
import DashPage from './pages/admin/dashPage'

import Registrations from './pages/admin/regPage'
import DetailC from './pages/admin/detailPage'
import Companies from './pages/admin/companyPage'
import User from './pages/admin/userPage'
import Location from './pages/admin/locationPage'
import Category from './pages/admin/categoryPage'
import Plans from './pages/admin/planPage'

import Unauthorized from './utils/Unauthorized'

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <JobProvider>
          <EmpProvider>
        <Routes>
        <Route element={<Unauthorized/>} exact path='/nopermission'/>

          <Route element={<HomePage/>} exact path='/'/>
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegisterPage/>} path='/register'/>
          <Route element={<VerifyPage/>} path='/verify'/>
          <Route  element={<ForgotPassword/>} path='/forgot_password'/>
          
          <Route element={<JobPage/>}  path='/jobs'/>
          <Route element={<SearchPage/>}  path='/search/:str'/>
          {/* candidates */}
          <Route element={<PrivateRoute/>}  >
          <Route element={<SplitPage/>}  path='/path'/>
          <Route element={<AccountPage/>}  path='/candidate/account'/>
          <Route element={<ApplicationPage/>}  path='/candidate/applications'/>
          <Route element={<UploadResumePage/>}  path='/candidate/resume'/>
          <Route element={<ProfilePage/>}  path='/candidate/profile'/>
          <Route element={<QualificationPage/>}  path='/candidate/qualification'/>
          <Route element={<ExperiencePage/>}  path='/candidate/experience'/>
          <Route element={<SkillSetPage/>}  path='/candidate/skill'/>
          <Route element={<RecJob/>}  path='/recommended_jobs'/>
          <Route element={<SavePage/>}  path='/saved'/>
          <Route element={<SingleJob/>}  path='/jobs/:id'/>
          <Route  element={<EmployerHomePage/>} path='/employer/home'/>
          </Route>

          {/* employer */}
          
          <Route  element={<EmployerReg/>} path='/employer/register'/>
          <Route element={<EmpRoute/>}  >
          <Route  element={<CandidatePage/>} path='/employer/candidates/:str'/>
          <Route  element={<MyJob/>} path='/employer/myjobs'/>
          <Route  element={<JobPost/>} path='/employer/postjob'/>
          <Route  element={<JobJd/>} path='/employer/postjob/:id/jd'/>
          <Route  element={<AddSkillPage/>} path='/employer/postjob/:id/addskill'/>

          <Route  element={<DashboardPage/>} path='/employer/dashboard'/>
    
          <Route  element={<JobDetailPage/>} path='/employer/job/:id'/> 
          <Route  element={<ApplicantPage/>} path='/employer/job/:id/applicants'/> 
          <Route  element={<ApplicantProfPage/>} path='/employer/job/:id/applicants/:aid'/> 
          <Route  element={<PaymentPage/>} path='/employer/payment'/>
          <Route  element={<PlanPage/>} path='/employer/plans'/>
          <Route  element={<AccountCompPage/>} path='/employer/account'/>
          </Route>

          <Route element={<AdminRoute/>}  >
          <Route  element={<DashPage/>} path='/admin'/>
          <Route  element={<Registrations/>} path='/admin/registrations'/>
          <Route  element={<DetailC/>} path='/admin/company/:id/'/>
          <Route  element={<Companies/>} path='/admin/companies/'/>
          <Route  element={<User/>} path='/admin/users/'/>
          <Route  element={<Location/>} path='/admin/locations/'/>
          <Route  element={<Category/>} path='/admin/categories/'/>
          <Route  element={<Plans/>} path='/admin/plans/'/>
         </Route>
        </Routes>
        </EmpProvider>
        </JobProvider>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
