import React, { useEffect, useState } from "react";
import Sidebars from "@/component/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Course Card Component
const CourseCard = ({ course }) => {
  return (
    <Card className="bg-white text-black">
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{course.name}</h3>
        <div className="space-y-2">
          <p className="text-gray-600">Grade: {course.grade}</p>
          <p className="text-gray-600">Section: {course.section}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Course Form Component
const CourseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Course Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="grade">Grade</Label>
        <Input
          id="grade"
          type="number"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <Label htmlFor="section">Section</Label>
        <Input
          id="section"
          value={formData.section}
          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">Add Course</Button>
    </form>
  );
};

// Main Courses Component
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 30;

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredCourses = searchQuery
    ? courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.grade.toString().includes(searchQuery)
      )
    : courses;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex min-h-screen text-white overflow-hidden relative">
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebars />
      </div>
      <div className="flex-1 ml-1 p-4">
        <div className="fixed top-4 right-4">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white hover:bg-gray-200 text-black border border-gray-300"
          >
            Add New Course
          </Button>
        </div>

        <div className="ml-64 mt-4 p-4 w-full max-w-md">
          <Label className="block text-white mb-2">Search Courses</Label>
          <Input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, section, or grade"
            className="border border-gray-300 p-2 rounded text-white w-full"
          />
        </div>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <CourseForm onClose={() => setShowForm(false)} />
          </DialogContent>
        </Dialog>

        <div className="flex-1 ml-64 mt-20 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="col-span-full text-center">No courses found</p>
            )}
          </div>
        </div>

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

export default Courses;