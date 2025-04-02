import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const Attendencestats = ({
  stats,
}) => {
    // const stats = {
    //     total: students.length,
    //     present: students.filter((s) => s.present === true).length,
    //     absent: students.filter((s) => s.present === false).length,
    //     unmarked: students.filter((s) => s.present === null).length,
    //   };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">
                   Total Students
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{stats.total}</div>
               </CardContent>
             </Card>
             <Card className="bg-green-50">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Present</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-green-600">
                   {stats.present}
                 </div>
                 <p className="text-xs text-muted-foreground">
                   {Math.round((stats.present / stats.total) * 100)}% of class
                 </p>
               </CardContent>
             </Card>
             <Card className="bg-red-50">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Absent</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-red-600">
                   {stats.absent}
                 </div>
                 <p className="text-xs text-muted-foreground">
                   {Math.round((stats.absent / stats.total) * 100)}% of class
                 </p>
               </CardContent>
             </Card>
             <Card className="bg-amber-50">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Unmarked</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-amber-600">
                   {stats.unmarked}
                 </div>
                 <p className="text-xs text-muted-foreground">
                   {Math.round((stats.unmarked / stats.total) * 100)}% of class
                 </p>
               </CardContent>
             </Card>
           </div>
  )
}

export default Attendencestats