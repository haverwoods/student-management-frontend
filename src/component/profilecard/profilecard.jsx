import React from "react";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const Profilecard = ({ student }) => {
  const dob = new Date(student.dateOfBirth); 
  const created = new Date(student.createdAt);

const newdob = dob.toLocaleDateString('en-US', { // Adjust locale as needed
    year: 'numeric',
    month: 'long', // or 'short' or 'numeric'
    day: 'numeric' 
});
const createdat = created.toLocaleDateString('en-US', { // Adjust locale as needed
    year: 'numeric',
    month: 'long', // or 'short' or 'numeric'
    day: 'numeric' 
});
  return (
    <Card className="w-72 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="flex items-start justify-between p-4">
        <div className="flex gap-3">
          {/* <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div> */}
               <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={`${student.firstName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
                  {console.log('Image path:', `${student.profileImage}`)}
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Student Profile
            </h2>
            <p className="text-sm text-gray-500">{student.rollNumber}</p>
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
              {student.firstName} {student.lastName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Grade</span>
            <span className="text-gray-900">
            {student.grade} {student.section}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">DOB</span>
            <span className="text-gray-900">{newdob}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Contact</span>
            <span className="text-gray-900">{student.contactPhone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">profile created at </span>
            <span className="text-gray-900">{createdat}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Profilecard;
