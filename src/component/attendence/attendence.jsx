import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Check, X, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


const Attendance = ({
  date,
  searchTerm,
  setSearchTerm,
  students,
  filteredStudents,
  stats,
  currentTab,
  setCurrentTab,
  markAllPresent,
  markAllAbsent,
  handleAttendanceChange,
  handleRemarksChange,
  formatDate,
}) => {

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
    <Card>
      <CardHeader>
        <CardTitle>Class Attendance</CardTitle>
        <CardDescription>Manage attendance for {formatDate(date)}</CardDescription>
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
        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Students ({students.length})</TabsTrigger>
            <TabsTrigger value="present">Present ({stats.present})</TabsTrigger>
            <TabsTrigger value="absent">Absent ({stats.absent})</TabsTrigger>
            <TabsTrigger value="unmarked">Unmarked ({stats.unmarked})</TabsTrigger>
          </TabsList>

          <TabsContent value={currentTab} className="m-0">
            <ScrollArea className="h-[460px]">
              <CustomTable>
                <CustomTableHeader>
                  <CustomTableRow>
                    <CustomTableHeaderCell className="w-12">Roll</CustomTableHeaderCell>
                    <CustomTableHeaderCell>Student</CustomTableHeaderCell>
                    <CustomTableHeaderCell className="w-32 text-center">Status</CustomTableHeaderCell>
                    <CustomTableHeaderCell className="w-64">Remarks</CustomTableHeaderCell>
                  </CustomTableRow>
                </CustomTableHeader>
                <CustomTableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <CustomTableRow key={student.id}>
                        <CustomTableCell className="font-medium w-12">{student.roll}</CustomTableCell>
                        <CustomTableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.image} alt={student.name} />
                              <AvatarFallback>
                                {student.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>{student.name}</div>
                          </div>
                        </CustomTableCell>
                        <CustomTableCell className="w-32">
                          <div className="flex justify-center space-x-1">
                            <Button size="sm" variant="outline" className={student.present === true ? "bg-green-600 hover:bg-green-700" : ""} onClick={() => handleAttendanceChange(student.id, true)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className={student.present === false ? "bg-red-600 hover:bg-red-700" : ""} onClick={() => handleAttendanceChange(student.id, false)}>
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className={student.present === null ? "bg-amber-600 hover:bg-amber-700" : ""} onClick={() => handleAttendanceChange(student.id, null)}>
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          </div>
                        </CustomTableCell>
                        <CustomTableCell className="w-64">
                          <Input
                            placeholder="Add remarks..."
                            value={student.remarks}
                            onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                            className="h-8 text-sm"
                            type="text"
                            maxLength={500}
                          />
                        </CustomTableCell>
                      </CustomTableRow>
                    ))
                  ) : (
                    <CustomTableRow className="h-32">
                      <CustomTableCell colSpan={4} className="text-center w-full">
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
  );
};

export default Attendance;
