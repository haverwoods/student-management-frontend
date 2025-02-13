import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Sidebars from "./component/sidebar/sidebar";
import Students from "./pages/students";
import Profilecard from "./component/profilecard/profilecard";
import Courses from "./component/course/course";
import Teachers from "./pages/teacher";
import { ToastProvider } from "./components/ui/toast";


const App = () => {
  return (
    
      <div className=" ">
    

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teacher" element={<Teachers />} />
        <Route path="/sidebar" element={<Sidebars />} />
      </Routes>
        

      </div>
    
  );
};

export default App;
