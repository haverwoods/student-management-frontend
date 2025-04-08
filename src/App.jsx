import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Sidebars from "./component/sidebar/sidebar";
import Students from "./pages/students";
import Profilecard from "./component/profilecard/profilecard";
import Courses from "./component/course/course";
import Teachers from "./pages/teacher";
import { ToastProvider } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";
import AttendanceTracker from "./pages/AttendanceTracker";
import Exam from "./pages/exam";
import Fees from "./pages/fees";
import Counter from "./pages/counter";


const App = () => {
  return (
    
      <div className=" ">  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teacher" element={<Teachers />} />
        <Route path="/Attendance" element={<AttendanceTracker />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/sidebar" element={<Sidebars />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <Toaster/>
        

      </div>
    
  );
};

export default App;
