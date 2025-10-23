import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import BASE_URL from "./Components/constants/BASE_URL";
import {
  ArrowLeft,
  GraduationCap,
  FileText,
  ExternalLink,
  Download,
  Search,
  Filter,
} from "lucide-react";
// Custom shimmer component
function Shimmer() {
  return (
    <div className="w-full h-48 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded-xl"></div>
  );
}

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "abc",
    emailId: "raushan@gmail.com",
    collegeName: "Bakhtiyarpur Engineering College (BEC), Bakhtiyarpur",
    registration: "",
    gender: "Male",
    branch: "CSE",
    roll: "22CS27",
    mobilenumber: "",
    semester: "",
  });

  const branchOptions = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities",
  ].map((branch) => ({ label: branch, value: branch }));

  const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobilenumber") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (name === "registration") {
      if (/^\d{0,11}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));

        // Call check existence only if registration length is 11
        if (value.length === 11) {
          checkIfExists(value);
        } else {
          setFormErrors((prev) => ({ ...prev, registration: "" }));
        }
      }
    } else if (name === "semester") {
      setFormData((prev) => ({ ...prev, semester: value }));
      setFormErrors((prev) => ({ ...prev, semester: "" }));

      if (value === "1") {
        setFormErrors((prev) => ({ ...prev, registration: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBranchSelect = (selected) => {
    setFormData((prev) => ({ ...prev, branch: selected.value }));
    setFormErrors((prev) => ({ ...prev, branch: "" }));
  };

  const handleSemesterSelect = (selected) => {
    const value = selected.value;
    setFormData((prev) => ({ ...prev, semester: value }));
    setFormErrors((prev) => ({ ...prev, semester: "" }));

    if (value === "1") {
      setFormErrors((prev) => ({ ...prev, registration: "" }));
    }
  };

  // Checks existence of registration number via API
  const checkIfExists = async (registrationNumber) => {
    try {
      const response = await axios.post(`${BASE_URL}/check-existence`, {
  registration: registrationNumber,
});


      if (response.data.exists) {
        setFormErrors((prev) => ({
          ...prev,
          registration: "Registration number already exists.",
        }));
        await Swal.fire({
          icon: "error",
          title: "Duplicate Registration Number",
          text: "This registration number is already registered.",
        });
      } else {
        setFormErrors((prev) => ({ ...prev, registration: "" }));
      }
    } catch (error) {
      console.error("Existence check error:", error);
      // Optional: Show error or ignore
    }
  };

  const validateFields = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full Name is required.";
    if (!formData.emailId.trim()) errors.emailId = "Email is required.";
    if (!formData.branch.trim() || !branchOptions.some((b) => b.value === formData.branch))
      errors.branch = "Please select a valid branch.";
    if (!formData.roll.trim()) errors.roll = "Roll Number is required.";
    if (!formData.gender.trim()) errors.gender = "Gender is required.";
    if (!formData.mobilenumber.trim()) {
      errors.mobilenumber = "Mobile Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobilenumber)) {
      errors.mobilenumber = "Mobile Number must be a valid 10-digit Indian number.";
    }
    if (!formData.semester.trim() || !semesterOptions.some((s) => s.value === formData.semester))
      errors.semester = "Please select a valid semester.";
    if (formData.semester !== "1") {
      if (!formData.registration.trim()) {
        errors.registration = "Registration Number is required for semester > 1.";
      } else if (!/^\d{11}$/.test(formData.registration)) {
        errors.registration = "Registration Number must be exactly 11 digits.";
      }
    }

    // If registration error already set by existence check, keep it
    if (formErrors.registration) {
      errors.registration = formErrors.registration;
    }

    return errors;
  };

  const registerStudent = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/register-student`, formData);
      return response.data;
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      await Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors in the form before submitting.",
      });
      return;
    }

    setLoading(true);

    // Double check registration existence before submit for safety
    if (formData.registration.length === 11) {
      try {
        const res = await axios.post("http://localhost:5000/check-existence", {
          registration: formData.registration,
        });
        if (res.data.exists) {
          setLoading(false);
          setFormErrors((prev) => ({
            ...prev,
            registration: "Registration number already exists.",
          }));
          await Swal.fire({
            icon: "error",
            title: "Duplicate Registration Number",
            text: "This registration number is already registered.",
          });
          return;
        }
      } catch (err) {
        // continue to registration (optional: handle error)
      }
    }

    try {
      await registerStudent();
      setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Student registered successfully!",
      });
      navigate("/");
    } catch (err) {
      setLoading(false);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to register student. Please try again.",
      });
    }
  };

  if (loading) return <Shimmer />;

  return (
    <>
     <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-sky-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
                SynLearn
              </span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </nav>
    <div className="min-h-screen bg-[#eaf3fb] flex items-center justify-center p-6 relative">
      
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-stone-800 mb-2">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            SynLearn
          </span>
        </h2>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                formErrors.fullName
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            {formErrors.fullName && (
              <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                formErrors.emailId
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            {formErrors.emailId && (
              <p className="text-xs text-red-500 mt-1">{formErrors.emailId}</p>
            )}
          </div>

          {/* College Name readonly */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              College Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              readOnly
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Branch <span className="text-red-500">*</span>
            </label>
            <Select
              options={branchOptions}
              value={branchOptions.find((b) => b.value === formData.branch) || null}
              onChange={handleBranchSelect}
              className="mt-1"
              placeholder="Select Branch"
              isClearable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: formErrors.branch ? "red" : "#d1d5db",
                  boxShadow: formErrors.branch
                    ? "0 0 0 2px rgba(239,68,68,.5)"
                    : "",
                }),
              }}
            />
            {formErrors.branch && (
              <p className="text-xs text-red-500 mt-1">{formErrors.branch}</p>
            )}
          </div>

          {/* Semester */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Semester <span className="text-red-500">*</span>
            </label>
            <Select
              options={semesterOptions}
              value={semesterOptions.find((s) => s.value === formData.semester) || null}
              onChange={handleSemesterSelect}
              className="mt-1"
              placeholder="Select Semester"
              isClearable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: formErrors.semester ? "red" : "#d1d5db",
                  boxShadow: formErrors.semester
                    ? "0 0 0 2px rgba(239,68,68,.5)"
                    : "",
                }),
              }}
            />
            {formErrors.semester && (
              <p className="text-xs text-red-500 mt-1">{formErrors.semester}</p>
            )}
          </div>

          {/* Roll Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                formErrors.roll
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            {formErrors.roll && (
              <p className="text-xs text-red-500 mt-1">{formErrors.roll}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="registration"
              value={formData.registration}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                formErrors.registration
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              placeholder={
                formData.semester === "1" ? "(Optional for Semester 1)" : undefined
              }
              required={formData.semester !== "1"}
            />
            {formErrors.registration && (
              <p className="text-xs text-red-500 mt-1">{formErrors.registration}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                formErrors.gender
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.gender && (
              <p className="text-xs text-red-500 mt-1">{formErrors.gender}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
              maxLength={10}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none ${
                formErrors.mobilenumber
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            {formErrors.mobilenumber && (
              <p className="text-xs text-red-500 mt-1">{formErrors.mobilenumber}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register Student
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/loginpage" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
