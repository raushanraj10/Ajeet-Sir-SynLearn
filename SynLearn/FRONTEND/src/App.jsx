import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AppStore from "./Components/Utils/Appstore";
import Body from "./Body";
import UploadDocumentPage from "./Components/UploadDocumentPage";
import FacultyHome from "./Components/FacultyHome";
import LoginPage from "./Components/LoginPage";
import RegisterStudent from "./RegisterStudent";
import LoginPageStudent from "./LoginPageStudent";
import StudentSidebarDocs from "./Components/StudentSidebarDocs";
import HomePage from "./Pages/HomePage";
import CategoriesPage from "./Pages/CategoriesPage";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};



function App() {
  return (
    <Provider store={AppStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<HomePage />} />
           <Route path="/categoriespage" element={<CategoriesPage />} />
            <Route path="/loginpage" element={<LoginPageStudent />} />
            <Route path="login-by-admin" element={<LoginPage />} />
            <Route path="studenthome" element={<StudentSidebarDocs />} />
            <Route path="uploaddoc/:semester/:branch" element={<UploadDocumentPage />} />
            <Route path="facultyhome" element={<FacultyHome />} />
            <Route path="register" element={<RegisterStudent />} />

            {/* ✅ Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
