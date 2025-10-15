import { Outlet } from "react-router-dom"
import FacultySidebar from "./Components/FacultySidebar"
import LoginPage from "./Components/LoginPage"
import SynLearnNavbar from "./Components/SynLearnNavbar"
import UploadDocumentPage from "./Components/UploadDocumentPage"

const Body=()=>{
    return (
        <>
        <SynLearnNavbar/>
        {/* <LoginPage/> */}
       <Outlet/>
        
        </>
    )
}
export default Body