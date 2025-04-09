import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Courseform = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    teacher: "",
    startDay: "",
    endDay: "",
    startTime: "",
    endTime: "",
  });
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
    "sunday",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    //to check all data
    console.log(formData);
    // Check if all required fields are filled
    const requiredFields = [
      "name",
      "grade",
      "section",
      "startDay",
      "endDay",
      "startTime",
      "endTime",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        console.log("formData before submit:", formData);
        // Show toast notification for the missing field
        toast({
          title: "Error",
          description: `${field} is required!`,
          duration: 3000,
        });
        return;
      }
      
    }
    try {
      const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Error Response:", data);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Course added successfully",
          duration: 3000,
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add course",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "server error!",
        duration: 3000,
      });
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
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
            onChange={(e) =>
              setFormData({ ...formData, grade: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="section">Section</Label>
          <Input
            id="section"
            value={formData.section}
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="teacher">Assigned Teacher ID</Label>
          <Input
            id="teacher"
            placeholder="add teacher name"
            value={formData.teacher}
            onChange={(e) =>
              setFormData({ ...formData, teacher: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Day</Label>
            <select
              value={formData.startDay}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDay: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            >
                <option value="">Select start day</option>

              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>End Day</Label>
            <select
              value={formData.endDay}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDay: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Start Time</Label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startTime: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>End Time</Label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endTime: e.target.value,
                })
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Add Course
        </Button>
      </form>
    </div>
  );
};

export default Courseform;
