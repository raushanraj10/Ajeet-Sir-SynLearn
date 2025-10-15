import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppStore from "./Components/Utils/Appstore";
import Body from "./Body";
import UploadDocumentPage from "./Components/UploadDocumentPage";
import FacultyHome from "./Components/FacultyHome";
import LoginPage from "./Components/LoginPage";
import RegisterStudent from "./RegisterStudent";
import LoginPageStudent from "./LoginPageStudent";
import StudentSidebarDocs from "./Components/StudentSidebarDocs";


function App() {
  return (
     <Provider store={AppStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<LoginPageStudent/>}/>
        <Route path="/login-by-admin" element={<LoginPage/>}/>
         <Route path="/studenthome" element={<StudentSidebarDocs/>}/>
        <Route path="/uploaddoc/:semester/:branch" element={<UploadDocumentPage/>}/>
         <Route path="/facultyhome" element={<FacultyHome/>}/>
         <Route path="/register" element={<RegisterStudent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
  )
}

export default App
