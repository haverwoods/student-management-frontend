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
  const [users, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from API
  useEffect(() => {
    axios
      .get(" http://localhost:3000/api/auth/users")
      .then((response) => {
        setuser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching student data.",err.message)
      });
  }, []);



  return (
    <div className="bg-[#121212] p-4 text-[#E0E0E0] rounded-lg">
      <Table className="w-full border-separate border-spacing-y-2">
        <TableCaption className="text-[#AAAAAA]">
          users
        </TableCaption>
        <TableHeader className="bg-[#333333] text-white">
          <TableRow>
            <TableHead className="w-[100px] p-2">Id</TableHead>
            <TableHead className="p-2"> Name</TableHead>
            <TableHead className="p-2">email</TableHead>
            <TableHead className="p-2">password</TableHead>
            <TableHead className="p-2">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="bg-[#222222] hover:bg-[#2A2A2A]"
            >
              <TableCell className="p-2">{user.id}</TableCell>
              <TableCell className="p-2">{user.name}</TableCell>
              <TableCell className="p-2">{user.email}</TableCell>
              <TableCell className="p-2">{user.password}</TableCell>
              <TableCell className="p-2">{user.role}</TableCell>
              </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-[#383838] text-[#F5F5F5]">
          <TableRow>
            <TableCell colSpan={7} className="p-2 text-right">
              Total users: {users.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Student;
