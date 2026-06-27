import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Badge from "../../components/dashboard/Badge";
import ProgressBar from "../../components/dashboard/ProgressBar";
import API from "../../services/api";

// TODO: replace with GET /api/teacher/students
export default function Students(){

const navigate=useNavigate();

const [students,setStudents]=useState([]);

useEffect(()=>{

fetchStudents();

},[]);

const fetchStudents=async()=>{

try{

const res=await API.get("/teacher/students");

setStudents(res.data.data);

}
catch(err){

console.log(err);

}

};

return(

<div className="max-w-7xl mx-auto">

<h1 className="text-2xl font-bold mb-6">

Students

</h1>

<div className="grid gap-5">

{

students.map(student=>(

<div
key={student._id}
onClick={()=>navigate(`/teacher/students/${student._id}`)}
className="bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition"
>

<div className="flex justify-between">

<div>

<h2 className="font-bold text-lg">

{student.fullName}

</h2>

<p>

{student.email}

</p>

</div>

<div>

<p>

Course

</p>

<p className="font-semibold">

{student.course}

</p>

</div>

<div>

<p>

Progress

</p>

<p>

{student.progress}%

</p>

</div>

</div>

</div>

))

}

</div>

</div>

);

}


