import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function TeacherForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before sending", formData);

    try {
      const response = await fetch("http://localhost:3000/api/teacher", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      });
      
      
      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Teacher registered successfully!",
          variant: "success",
        });
        onClose(); // Close the form after submission
      } else {
        // Handle error response from the server
        toast({
          title: "Error",
          description: data.message || "Registration failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Registration process unsuccessful. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>First Name</Label>
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Last Name</Label>
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Register Teacher
      </Button>
    </form>
  );
}