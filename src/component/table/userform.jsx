import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(" http://localhost:3000/api/auth/users", {
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
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label>email</Label>
        <Input name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label>password</Label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      {/* <div>
        <Label>role</Label>
        <Input type="number" name="grade" value={formData.grade} onChange={handleChange} required />
      </div> */}
        <div>
        <Label>Role</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">
              {formData.role || "Select Role"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleRoleSelect("admin")}>
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleSelect("teacher")}>
              Teacher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}
