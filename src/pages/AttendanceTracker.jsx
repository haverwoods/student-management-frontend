import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { Check, X, AlertTriangle, Search } from "lucide-react";

import Sidebars from "@/component/sidebar/sidebar";

const AttendanceTracker = () => {
  // Sample student data (would come from API in real app)
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Thompson",
      present: true,
      image: null,
      roll: "001",
      remarks: "",
    },
    {
      id: 2,
      name: "Liam Davis",
      present: false,
      image: null,
      roll: "002",
      remarks: "Late notification from parent",
    },
    {
      id: 3,
      name: "Olivia Martinez",
      present: true,
      image: null,
      roll: "003",
      remarks: "",
    },
    {
      id: 4,
      name: "Noah Wilson",
      present: null,
      image: null,
      roll: "004",
      remarks: "",
    },
    {
      id: 5,
      name: "Ava Johnson",
      present: true,
      image: null,
      roll: "005",
      remarks: "",
    },
    {
      id: 6,
      name: "Sophia Lee",
      present: true,
      image: null,
      roll: "006",
      remarks: "",
    },
    {
      id: 7,
      name: "Jackson Brown",
      present: false,
      image: null,
      roll: "007",
      remarks: "Medical leave",
    },
    {
      id: 8,
      name: "Isabella Taylor",
      present: true,
      image: null,
      roll: "008",
      remarks: "",
    },
    {
      id: 9,
      name: "Lucas Harris",
      present: null,
      image: null,
      roll: "009",
      remarks: "",
    },
    {
      id: 10,
      name: "Mia Clark",
      present: true,
      image: null,
      roll: "010",
      remarks: "",
    },
  ]);

  // State for search term, date, and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());
  const [currentTab, setCurrentTab] = useState("all");
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Format date without date-fns
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Statistics calculation
  const stats = {
    total: students.length,
    present: students.filter((s) => s.present === true).length,
    absent: students.filter((s) => s.present === false).length,
    unmarked: students.filter((s) => s.present === null).length,
  };

  // Handle attendance change
  const handleAttendanceChange = (id, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, present: status } : student
      )
    );
  };

  // Handle remarks change
  const handleRemarksChange = (id, remarks) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, remarks } : student
      )
    );
  };

  // Filter students based on search and tab
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.includes(searchTerm);

    if (currentTab === "all") return matchesSearch;
    if (currentTab === "present")
      return matchesSearch && student.present === true;
    if (currentTab === "absent")
      return matchesSearch && student.present === false;
    if (currentTab === "unmarked")
      return matchesSearch && student.present === null;

    return matchesSearch;
  });

  // Bulk actions
  const markAllPresent = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, present: true }))
    );
  };

  const markAllAbsent = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, present: false }))
    );
  };

  // Custom table implementation
  const CustomTable = ({ children }) => (
    <div className="w-full border rounded-md">{children}</div>
  );

  const CustomTableHeader = ({ children }) => (
    <div className="bg-gray-100 border-b sticky top-0">{children}</div>
  );

  const CustomTableRow = ({ children, className = "" }) => (
    <div
      className={`flex border-b last:border-b-0 hover:bg-gray-50 ${className}`}
    >
      {children}
    </div>
  );

  const CustomTableHeaderCell = ({ className = "", children }) => (
    <div className={`p-3 font-medium text-sm text-gray-500 ${className}`}>
      {children}
    </div>
  );

  const CustomTableCell = ({ className = "", children }) => (
    <div className={`p-3 ${className}`}>{children}</div>
  );

  const CustomTableBody = ({ children }) => <div>{children}</div>;

  return (
    <div className="flex ">
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebars />
      </div>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-cyan-50">
              Daily Attendance
            </h1>
            <p className="text-muted-foreground">
              Track and manage student attendance
            </p>
          </div>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(date)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate || new Date());
                  setCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.present}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.present / stats.total) * 100)}% of class
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.absent}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.absent / stats.total) * 100)}% of class
              </p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unmarked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {stats.unmarked}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.unmarked / stats.total) * 100)}% of class
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Class Attendance</CardTitle>
            <CardDescription>
              Manage attendance for {formatDate(date)}
            </CardDescription>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or roll number..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={markAllPresent}>
                  Mark All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent}>
                  Mark All Absent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={currentTab}
              onValueChange={setCurrentTab}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="all">
                  All Students ({students.length})
                </TabsTrigger>
                <TabsTrigger value="present">
                  Present ({stats.present})
                </TabsTrigger>
                <TabsTrigger value="absent">
                  Absent ({stats.absent})
                </TabsTrigger>
                <TabsTrigger value="unmarked">
                  Unmarked ({stats.unmarked})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={currentTab} className="m-0">
                <ScrollArea className="h-[460px]">
                  <CustomTable>
                    <CustomTableHeader>
                      <CustomTableRow>
                        <CustomTableHeaderCell className="w-12">
                          Roll
                        </CustomTableHeaderCell>
                        <CustomTableHeaderCell>Student</CustomTableHeaderCell>
                        <CustomTableHeaderCell className="w-32 text-center">
                          Status
                        </CustomTableHeaderCell>
                        <CustomTableHeaderCell className="w-64">
                          Remarks
                        </CustomTableHeaderCell>
                      </CustomTableRow>
                    </CustomTableHeader>
                    <CustomTableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <CustomTableRow key={student.id}>
                            <CustomTableCell className="font-medium w-12">
                              {student.roll}
                            </CustomTableCell>
                            <CustomTableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={student.image}
                                    alt={student.name}
                                  />
                                  <AvatarFallback>
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>{student.name}</div>
                              </div>
                            </CustomTableCell>
                            <CustomTableCell className="w-32">
                              <div className="flex justify-center space-x-1">
                                <Button
                                  size="sm"
                                  variant={
                                    student.present === true
                                      ? "default"
                                      : "outline"
                                  }
                                  className={
                                    student.present === true
                                      ? "bg-green-600 hover:bg-green-700"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleAttendanceChange(student.id, true)
                                  }
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    student.present === false
                                      ? "default"
                                      : "outline"
                                  }
                                  className={
                                    student.present === false
                                      ? "bg-red-600 hover:bg-red-700"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleAttendanceChange(student.id, false)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    student.present === null
                                      ? "default"
                                      : "outline"
                                  }
                                  className={
                                    student.present === null
                                      ? "bg-amber-600 hover:bg-amber-700"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleAttendanceChange(student.id, null)
                                  }
                                >
                                  <AlertTriangle className="h-4 w-4" />
                                </Button>
                              </div>
                            </CustomTableCell>
                            <CustomTableCell className="w-64">
                              <Input
                                placeholder="Add remarks..."
                                value={student.remarks}
                                onChange={(e) =>
                                  handleRemarksChange(
                                    student.id,
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            </CustomTableCell>
                          </CustomTableRow>
                        ))
                      ) : (
                        <CustomTableRow className="h-32">
                          <CustomTableCell
                            colSpan={4}
                            className="text-center w-full"
                          >
                            No students found matching your criteria.
                          </CustomTableCell>
                        </CustomTableRow>
                      )}
                    </CustomTableBody>
                  </CustomTable>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredStudents.length} of {students.length} students
            </div>
            <Button>Save Attendance</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceTracker;
