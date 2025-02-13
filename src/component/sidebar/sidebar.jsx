import { cn } from "@/lib/utils";
import { Home, Package, List, ChevronDown, School, GraduationCap, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebars() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-[#121212] text-white flex flex-col p-4">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6">KICKS</div>
      
      {/* Navigation */}
      <nav className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <Home className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/students" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <Package className="w-5 h-5" /> total students
        </Link>
        <Link to="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <School className="w-5 h-5" /> Courses & Classes:
        </Link>
        <Link to="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <GraduationCap className="w-5 h-5" /> reports
        </Link>
        <Link to="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <Mail className="w-5 h-5" /> notifications
        </Link>
        
        {/* Categories Dropdown */}
        {/* <div>
          <div 
            className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <span className="flex items-center gap-2">
              <List className="w-5 h-5" /> Categories
            </span>
            <ChevronDown className={cn("w-5 h-5 transition-transform", { "rotate-180": isCategoriesOpen })} />
          </div>
          {isCategoriesOpen && (
            <div className="ml-6 space-y-2 mt-2 text-gray-300">
              <Link to="/category/sneakers" className="block p-2 hover:bg-gray-700 rounded">Sneakers</Link>
              <Link to="/category/running" className="block p-2 hover:bg-gray-700 rounded">Running Shoes</Link>
              <Link to="/category/casual" className="block p-2 hover:bg-gray-700 rounded">Casual</Link>
            </div>
          )}
        </div> */}
      </nav>
    </div>
  );
}
