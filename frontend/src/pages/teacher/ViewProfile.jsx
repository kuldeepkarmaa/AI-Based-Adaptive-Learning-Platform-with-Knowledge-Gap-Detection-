import {useEffect,useState} from "react";
import API from "../../services/api";

export default function ViewProfile(){

const [teacher,setTeacher]=useState({});

useEffect(()=>{

load();

},[]);

const load=async()=>{

const res=await API.get("/teacher/profile");

setTeacher(res.data.data);

}

return(

<div className="max-w-3xl mx-auto p-5">

<div className="bg-white rounded-xl shadow p-6 space-y-4">

<h1 className="text-2xl font-bold">

Teacher Details

</h1>

<p><b>Name :</b> {teacher.fullName}</p>

<p><b>Designation :</b> {teacher.designation}</p>

<p><b>Subject :</b> {teacher.subject}</p>

<p><b>Email :</b> {teacher.email}</p>

<p><b>Mobile :</b> {teacher.mobile}</p>

<p><b>Rating :</b> ⭐ {teacher.rating}</p>

<p><b>Bio :</b></p>

<p>{teacher.bio}</p>

</div>

</div>

)

}