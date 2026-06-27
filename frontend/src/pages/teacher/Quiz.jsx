import {useState,useEffect} from "react";
import API from "../../services/api";
import {useNavigate} from "react-router-dom";

export default function Quiz(){

const navigate=useNavigate();

const[quiz,setQuiz]=useState([]);

useEffect(()=>{

fetchQuiz();

},[]);

const fetchQuiz=async()=>{

const res=await API.get("/quiz");

setQuiz(res.data.data);

};

return(

<div className="space-y-6">

<div className="flex justify-between">

<h1 className="text-3xl font-bold">
Quiz
</h1>

<button

onClick={()=>navigate("/teacher/quiz/create")}

className="bg-purple-600 text-white px-5 py-2 rounded"

>

New Quiz

</button>

</div>

<div className="bg-white rounded-xl shadow">

<table className="w-full">

<thead>

<tr className="border-b">

<th className="p-4">
Title
</th>

<th>
Course
</th>

<th>
Questions
</th>

</tr>

</thead>

<tbody>

{

quiz.map((q)=>(

<tr
key={q._id}
className="border-b hover:bg-gray-50 cursor-pointer"
>

<td className="p-4">

{q.title}

</td>

<td>

{q.course?.title}

</td>

<td>

{q.questions.length}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

);

}