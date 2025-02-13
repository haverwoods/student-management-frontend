import React from "react";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const Teacherprofile = ({ teacher }) => {

  return (
    <Card className="w-72 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="flex items-start justify-between p-4">
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              teacher Profile
            </h2>
          
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="px-4 pb-2">
        <h3 className="text-sm text-gray-600 font-medium">profile details</h3>
        {/* <p className="text-sm text-gray-500 mt-1">
          Student in Grade {student.grade} {student.section}
        </p> */}
      </div>

      {/* Stats Section */}
      <div className="px-4 pb-4">
        <div className="mt-4 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Name</span>
            <span className="text-gray-900">
              {teacher.firstName} {teacher.lastName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">email</span>
            <span className="text-gray-900">
            {teacher.email} 
            </span>
          </div>
       
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Contact</span>
            <span className="text-gray-900">{teacher.phone}</span>
          </div>
    
        </div>
      </div>
    </Card>
  );
};

export default Teacherprofile;
