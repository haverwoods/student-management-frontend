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
    schedule: "",
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
          <Label htmlFor="section">Section</Label>
          <Input
            id="section"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
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

        <div>
          <Label htmlFor="schedule">Schedule</Label>
          <Input
            id="schedule"
            placeholder="e.g., Mon & Wed 9AM-10AM"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full">
          Add Course
        </Button>
      </form>
    </div>
  );
};

export default Courseform;
