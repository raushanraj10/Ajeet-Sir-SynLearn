import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppStore from "./Components/Utils/Appstore";
import Body from "./Body";
import UploadDocumentPage from "./Components/UploadDocumentPage";
import FacultyHome from "./Components/FacultyHome";


function App() {
  return (
     <Provider store={AppStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/uploaddoc/:semester/:branch" element={<UploadDocumentPage/>}/>
         <Route path="/facultyhome" element={<FacultyHome/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
  )
}

export default App
