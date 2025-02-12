import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudentForm({ onClose }) {
  const [formData, setFormData] = useState({
    rollNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    grade: "",
    section: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Student registered successfully!");
        onClose(); // Close the form after submission
      } else {
        const data = await response.json();
        alert(data.message || "Error registering student");
      }
    } catch (error) {
      console.error("Error: server error", error.message);
      alert("Server error!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Roll Number</Label>
        <Input name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
      </div>
      <div>
        <Label>First Name</Label>
        <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <Label>Last Name</Label>
        <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <Label>Date of Birth</Label>
        <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
      </div>
      <div>
        <Label>Grade</Label>
        <Input type="number" name="grade" value={formData.grade} onChange={handleChange} required />
      </div>
      <div>
        <Label>Section</Label>
        <Input name="section" value={formData.section} onChange={handleChange} required />
      </div>
      <div>
        <Label>Contact Phone</Label>
        <Input name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}
