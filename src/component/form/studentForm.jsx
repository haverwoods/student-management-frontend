import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
import { toast, useToast } from "@/hooks/use-toast";
import { CloudUpload } from "lucide-react";

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
  const [image, setImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const { toast } = useToast();
  
  

  const handleFileChange = (event) => {
    // Update image state with the selected file
    setImage(event.target.files[0]);
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData instance
    const formDataToSend = new FormData();
    
    // Add all form fields explicitly
    formDataToSend.append("rollNumber", formData.rollNumber);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);
    formDataToSend.append("grade", formData.grade);
    formDataToSend.append("section", formData.section);
    formDataToSend.append("contactPhone", formData.contactPhone);
  
    // Add the image if it exists
    if (image) {
      formDataToSend.append("profileImage", image, image.name); // Add filename
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        body: formDataToSend,
      });
  
      const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      toast({
        title: "Success",
        description: "Student registered successfully!",
        className: "bg-black text-white",
        duration: 3000,
      });
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: data.message || "Error registering student",
        duration: 3000,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Server error!",
      duration: 3000,
    });
  }
  };
  
  return (
    
    <form onSubmit={handleSubmit} className="space-y-2">
    
  
      {/* //image and file uplaod section */}
      <div className="flex items-center justify-between">
        <Label>Profile Picture</Label>
        <label
          htmlFor="file-upload"
          className="py-3 px-3 flex items-center space-x-2 cursor-pointer border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50"
        >
          <CloudUpload size={20} />
          <span>Upload</span>
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
         {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Profile Preview"
            className="mt-2 w-28 h-28 object-cover rounded-full"
          />
        )}
      </div>
      <div>
        <Label>Roll Number</Label>
        <Input
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
      </div>
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
        <Label>Date of Birth</Label>
        <Input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Grade</Label>
        <Input
          type="number"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Section</Label>
        <Input
          name="section"
          value={formData.section}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Contact Phone</Label>
        <Input
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
