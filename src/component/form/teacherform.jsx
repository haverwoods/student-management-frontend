import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider } from "@radix-ui/react-toast";


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

    try {
      const response = await fetch("http://localhost:3000/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
            title: "Success",
            description: "Teacher registered successfully!",
            variant: "success",
          });
        onClose(); // Close the form after submission
      } else {
        const data = await response.json();
        alert(data.message || "Error registering teacher");
      }
    } catch (error) {
      console.error("Error: server error", error.message);
      alert("Server error!");
    }
  };

  return (
    <ToastProvider>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>First Name</Label>
        <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <Label>Last Name</Label>
        <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <Label>Email</Label>
        <Input name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label>Phone</Label>
        <Input name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">Register Teacher</Button>
    </form>
    </ToastProvider>
  );
}
