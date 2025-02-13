import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart, TrendingUp, Truck } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Label, XAxis } from "recharts";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import StatCard from "@/component/statscard/statscard";
import student from "@/component/table/User";
import Sidebars from "@/component/sidebar/sidebar";
import Student from "@/component/table/User";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "@/component/table/userform";

// Dashboard component that displays an area chart with sales data
const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/students")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);
  // Data for the area chart
  const chartData = [
    { month: "Jan", totalStudents: 850, newEnrollments: 50 },
    { month: "Feb", totalStudents: 890, newEnrollments: 40 },
    { month: "Mar", totalStudents: 920, newEnrollments: 30 },
    { month: "Apr", totalStudents: 900, newEnrollments: 20 },
    { month: "May", totalStudents: 880, newEnrollments: 15 },
    { month: "Jun", totalStudents: 850, newEnrollments: 10 },
    { month: "Jul", totalStudents: 840, newEnrollments: 25 },
    { month: "Aug", totalStudents: 920, newEnrollments: 80 },
    { month: "Sep", totalStudents: 980, newEnrollments: 60 },
    { month: "Oct", totalStudents: 995, newEnrollments: 25 },
    { month: "Nov", totalStudents: 985, newEnrollments: 20 },
    { month: "Dec", totalStudents: 975, newEnrollments: 15 },
  ];
  const [showForm, setShowForm] = useState(false);
  // Configuration for chart colors and labels
  const chartConfig = {
    totalStudents: {
      label: "Total Students",
      color: "#FF5252", // Vibrant red
    },
    newEnrollments: {
      label: "New Enrollments",
      color: "#40C4FF", // Bright blue
    },
  };

  return (
    <div>
      <div className=" flex">
        {/* //sidebar component */}
        <div className="fixed top-0 left-0 h-full">
          <Sidebars />
        </div>
        <div className="flex-1 ml-64 p-4">
          {/* Header Section */}
          <div>
            <h1 className="text-4xl text-[#B0B0B0] font-bold text-center">
              Admin Dashboard
            </h1>
            {/* <Button className="mx-auto block">Add user</Button> */}
          </div>
          <motion.div className=" mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              name="Total students"
              value="700"
              icon={TrendingUp}
              icon2={ShoppingBag}
              color2="#0000"
              color="#ffffff"
              bgcolor="#4A69E2"
            />
            <StatCard
              name="attendece rate"
              value="78%"
              icon={TrendingUp}
              icon2={ShoppingCart}
              color="#ffffff"
              color2="#0000"
              bgcolor="#4A69E2"
            />
            <StatCard
              name="total courses"
              value="10"
              icon2={Truck}
              icon={TrendingUp}
              color="#ffffff"
              color2="#0000"
              bgcolor="#4A69E2"
            />
          </motion.div>

          <div className="  mx-auto h-full max-w-4xl">
            <Card className="bg-[#1E1E1E] border border-gray-700">
              {/* Card Header with title and description */}
              <CardHeader>
                <CardTitle>
                  <p className="text-[#FFFFFF]"> students</p>
                </CardTitle>
              </CardHeader>
              {/* Card Content - Area Chart Display */}
              <CardContent>
                <ChartContainer config={chartConfig}>
                  {/* // Area chart for the shoe and tshirt data points  */}
                  <AreaChart
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    {/* Grid lines for better readability */}
                    <CartesianGrid vertical={false} />
                    {/* X-Axis displaying months (shortened to 3 letters) */}
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#B0B0B0" }} // Light Gray for Axes & Labels
                      tickFormatter={(value) => value.slice(0, 3)} //show only first 3 characters
                    />
                    {/* Tooltip for displaying data points on hover */}
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    {/* Area for T-Shirt sales (blue) */}
                    <Area
                      dataKey="newEnrollments"
                      type="monotone"
                      fill={chartConfig.newEnrollments.color}
                      fillOpacity={0.4}
                      stroke={chartConfig.newEnrollments.color}
                      stackId="a"
                    />
                    {/* Area for Shoe sales (red-pink) */}
                    <Area
                      dataKey="totalStudents"
                      type="monotone"
                      fill={chartConfig.totalStudents.color}
                      fillOpacity={0.4}
                      stroke={chartConfig.totalStudents.color}
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              {/* // Card footer with the trend information  */}
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none text-[#FFFFFF]">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-[#B0B0B0]">
                      January - December 2024
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* // Table for displaying recent orders */}
            <div className="mt-5 flex flex-col gap-4">
              {/* Button Container */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-white hover:bg-gray-200 text-black border border-gray-300"
                >
                  Add New User
                </Button>

                {/* Student Form Modal */}
                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New user</DialogTitle>
                    </DialogHeader>
                    <UserForm onClose={() => setShowForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Table Component */}
              <div>
                <Student />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
