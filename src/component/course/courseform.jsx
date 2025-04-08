import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Courseform = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    teacher: "",
    schedule: {
        startDay: "", 
        endDay: "", 
        startTime: "", 
        endTime: ""
      },
  });
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
            onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) })}
            required
          />
        </div>


        <div>
          <Label htmlFor="teacher">Assigned Teacher</Label>
          <Input
            id="teacher"
            placeholder="add teacher name"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          />
        </div>

        
               {/* Structured Schedule */}
               <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Day</Label>
            <select
              value={formData.schedule.startDay}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  schedule: { ...formData.schedule, startDay: e.target.value } 
                })
              }
              className="w-full p-2 border rounded"
            >
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>End Day</Label>
            <select
              value={formData.schedule.endDay}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  schedule: { ...formData.schedule, endDay: e.target.value } 
                })
              }
              className="w-full p-2 border rounded"
            >
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Start Time</Label>
            <Input
              type="time"
              value={formData.schedule.startTime}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  schedule: { ...formData.schedule, startTime: e.target.value } 
                })
              }
            />
          </div>

          <div>
            <Label>End Time</Label>
            <Input
              type="time"
              value={formData.schedule.endTime}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  schedule: { ...formData.schedule, endTime: e.target.value } 
                })
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Add Course
        </Button>
      </form>
    </div>
  );
};

export default Courseform;
