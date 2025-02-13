import React, { useEffect, useState } from "react";
import Profilecard from "@/component/profilecard/profilecard";
import Sidebars from "@/component/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import StudentForm from "@/component/form/studentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Students = () => {
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 30; // Show 30 profiles per page

  useEffect(() => {
    fetch("http://localhost:3000/api/students")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  const handleChanges = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter profiles based on search query
  const filteredProfiles = searchQuery
    ? profiles.filter((student) =>
        student.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber?.toString().includes(searchQuery)
      )
    : profiles;

  // Calculate the profiles to be displayed on the current page
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  // Handle pagination logic
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex min-h-screen text-white overflow-hidden relative">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebars />
      </div>
      <div className="flex-1 ml-1 p-4">
        {/* Top-right button */}
        <div className="fixed top-4 right-4">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white hover:bg-gray-200 text-black border border-gray-300"
          >
            Add New Student
          </Button>
        </div>

        {/* Search bar */}
        <div className="ml-64 mt-4 p-4 w-full max-w-md">
          <Label className="block text-white mb-2">Search Student</Label>
          <Input
            name="searchStudent"
            value={searchQuery}
            onChange={handleChanges}
            placeholder="Search by name or roll number"
            className="border border-gray-300 p-2 rounded text-white w-full"
          />
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
        <div className="flex-1 ml-64 mt-20 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
            {currentProfiles.length > 0 ? (
              currentProfiles.map((student) => (
                <Profilecard key={student.id} student={student} />
              ))
            ) : (
              <p className="col-span-full text-center">No students found</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-white hover:bg-gray-200 text-black border border-gray-300 mr-2"
          >
            Previous
          </Button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-white hover:bg-gray-200 text-black border border-gray-300 ml-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Students;
