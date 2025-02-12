import React, { useEffect, useState } from "react";
import Profilecard from "@/component/profilecard/profilecard";
import Sidebars from "@/component/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import StudentForm from "@/component/form/studentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Students = () => {
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/students")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  return (
    <div className="flex min-h-screen text-white overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebars />
      </div>
      <div className="fixed top-4 right-4">
        <Button 
         onClick={() => setShowForm(true)}
        className="bg-white hover:bg-gray-200 text-black border border-gray-300">
          Add New Students
        </Button>
      </div>

      {/* Student Form Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Student</DialogTitle>
          </DialogHeader>
          <StudentForm onClose={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 ml-64 mt-15 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
          {profiles.length > 0 ? (
            profiles.map((student) => (
              <Profilecard key={student.id} student={student} />
            ))
          ) : (
            <p className="col-span-full text-center">No students found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
