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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Sidebars from "@/component/sidebar/sidebar";
import Attendance from "@/component/attendence/attendence";


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
  const handleRemarksChange = (id, event) => {
    const newRemarks = event.target.value;
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, remarks: newRemarks } : student
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
        //attendece stats card
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
        {/* <Attendencestats      
        /> */}
        {/* //attendece table  */}
        <Attendance
          date={date}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          students={students}
          filteredStudents={filteredStudents}
          stats={stats}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          markAllPresent={markAllPresent}
          markAllAbsent={markAllAbsent}
          handleAttendanceChange={handleAttendanceChange}
          handleRemarksChange={handleRemarksChange}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default AttendanceTracker;
