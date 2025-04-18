import { cn } from "@/lib/utils";
import {
  Home,
  Package,
  List,
  ChevronDown,
  School,
  GraduationCap,
  Mail,
  Book,
  CalendarCheck,
  Shapes,
  BookCheck,
  CircleDollarSign,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebars() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [CategoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-[#121212] text-white flex flex-col p-4">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6">school dashboard</div>

      {/* Navigation */}
      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>
        <Link
          to="/students"
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
        >
          <Package className="w-5 h-5" /> total students
        </Link>
        <div
          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
          onClick={() => setCategoriesOpen(!CategoriesOpen)}
        >
          <span className="flex items-center gap-2">
            <Shapes className="w-5 h-5" /> teacher Management
          </span>
          <ChevronDown
            className={cn("w-5 h-5 transition-transform", {
              "rotate-180": CategoriesOpen,
            })}
          />
        </div>
        {CategoriesOpen && (
          <div className="ml-6 space-y-2 mt-2 text-gray-300">
            <Link
              to="/teacher"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <GraduationCap className="w-5 h-5" /> teachers
            </Link>
          </div>
        )}
        <Link
          to="/orders"
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
        >
          <Mail className="w-5 h-5" /> notifications
        </Link>
        <Link
          to="/exam"
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
        >
          <BookCheck className="w-5 h-5" /> exam
        </Link>
        <Link
          to="/fees"
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
        >
          <CircleDollarSign className="w-5 h-5" /> fees
        </Link>
        {/* Categories Dropdown */}
        <div>
          <div
            className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <span className="flex items-center gap-2">
              <Shapes className="w-5 h-5" /> Classroom Management
            </span>
            <ChevronDown
              className={cn("w-5 h-5 transition-transform", {
                "rotate-180": isCategoriesOpen,
              })}
            />
          </div>
          {isCategoriesOpen && (
            <div className="ml-6 space-y-2 mt-2 text-gray-300">
              <Link
                to="/Courses"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <School className="w-5 h-5" /> Class
              </Link>
              <Link
                to="/Courses"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <Book className="w-5 h-5" /> Courses
              </Link>
              <Link
                to="/Attendance"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <CalendarCheck className="w-5 h-5" /> Attendance
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
