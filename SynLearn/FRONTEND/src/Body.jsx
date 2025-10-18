import { Outlet } from "react-router-dom"
import FacultySidebar from "./Components/FacultySidebar"
import LoginPage from "./Components/LoginPage"
import SynLearnNavbar from "./Components/SynLearnNavbar"
import UploadDocumentPage from "./Components/UploadDocumentPage"
import { useEffect, useState } from "react"
import axios from "axios"
import BASE_URL from "./Components/constants/BASE_URL"
import { addadmin } from "./Components/Utils/AdminSlice"
import { adduser } from "./Components/Utils/UserSlice"
import { useDispatch } from "react-redux"
import Footer from "./Components/Footer"




const Body=()=>{

   const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const callstudent = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getstudentprofile`, { withCredentials: true });
     
      dispatch(adduser(res?.data?.user));
    } catch (error) {
      console.error("Student fetch failed:", error);
    }
  };

  const calladmin = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getadminprofile`, { withCredentials: true });
      dispatch(addadmin(res.data));
    } catch (error) {
      console.error("Admin fetch failed:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([callstudent(), calladmin()]);
      setLoading(false);
    };

    loadData();
  }, []);

//    if (loading) return <Shimmer />;


    return (
       <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      {/* <SynLearnNavbar /> */}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
    )
}
export default Body