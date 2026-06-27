import { useParams } from "react-router-dom";

export default function StudentDetails(){

const {id}=useParams();

const student={

fullName:"Rahul Sharma",

email:"rahul@gmail.com",

course:"React Development",

progress:72,

marks:86,

completedLessons:18,

totalLessons:25,

phone:"9876543210",

city:"Indore"

};

return(

<div className="max-w-5xl mx-auto space-y-6">

<div className="bg-white rounded-xl shadow p-6">

<h1 className="text-3xl font-bold">

{student.fullName}

</h1>

<p>

{student.email}

</p>

</div>

<div className="grid md:grid-cols-2 gap-5">

<div className="bg-white rounded-xl shadow p-5">

<h2 className="font-bold mb-4">

Basic Details

</h2>

<p>

Phone : {student.phone}

</p>

<p>

City : {student.city}

</p>

<p>

Course : {student.course}

</p>

</div>

<div className="bg-white rounded-xl shadow p-5">

<h2 className="font-bold mb-4">

Performance

</h2>

<p>

Progress : {student.progress}%

</p>

<p>

Marks : {student.marks}/100

</p>

<p>

Completed Lessons

</p>

<p>

{student.completedLessons}/{student.totalLessons}

</p>

</div>

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold mb-4">

Topics Completed

</h2>

<ul className="list-disc pl-5 space-y-2">

<li>HTML</li>

<li>CSS</li>

<li>JavaScript</li>

<li>React Basics</li>

<li>Hooks</li>

</ul>

</div>

</div>

);

}