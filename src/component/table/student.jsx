import React, { useState, useEffect } from "react";
import axios from "axios"; // Optional, you can also use fetch

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/students/")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching student data.",err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-[#121212] p-4 text-[#E0E0E0] rounded-lg">
      <Table className="w-full border-separate border-spacing-y-2">
        <TableCaption className="text-[#AAAAAA]">
          A list of students.
        </TableCaption>
        <TableHeader className="bg-[#333333] text-white">
          <TableRow>
            <TableHead className="w-[100px] p-2">Roll Number</TableHead>
            <TableHead className="p-2">First Name</TableHead>
            <TableHead className="p-2">Last Name</TableHead>
            <TableHead className="p-2">Date of Birth</TableHead>
            <TableHead className="p-2">Grade</TableHead>
            <TableHead className="p-2">Section</TableHead>
            <TableHead className="p-2">Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              className="bg-[#222222] hover:bg-[#2A2A2A]"
            >
              <TableCell className="p-2">{student.rollNumber}</TableCell>
              <TableCell className="p-2">{student.firstName}</TableCell>
              <TableCell className="p-2">{student.lastName}</TableCell>
              <TableCell className="p-2">{student.dateOfBirth}</TableCell>
              <TableCell className="p-2">{student.grade}</TableCell>
              <TableCell className="p-2">{student.section}</TableCell>
              <TableCell className="p-2">{student.contactPhone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-[#383838] text-[#F5F5F5]">
          <TableRow>
            <TableCell colSpan={7} className="p-2 text-right">
              Total Students: {students.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Student;
