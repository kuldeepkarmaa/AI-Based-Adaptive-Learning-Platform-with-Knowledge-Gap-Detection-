import {useState,useEffect} from "react";
import API from "../../services/api";
import {useNavigate} from "react-router-dom";

export default function CreateQuiz(){

const navigate=useNavigate();

const[courses,setCourses]=useState([]);

const[data,setData]=useState({

title:"",
description:"",
course:"",
questions:[
{
question:"",
options:["","","",""],
answer:0
}
]

});

useEffect(()=>{

loadCourses();

},[]);

const loadCourses=async()=>{

const res=await API.get("/teacher/courses");

setCourses(res.data.data);

};

const submit=async(e)=>{

e.preventDefault();

await API.post("/quiz",data);

navigate("/teacher/quiz");

};

return(

<form

onSubmit={submit}

className="space-y-5 max-w-3xl"

>

<input

placeholder="Quiz Title"

className="border w-full p-3 rounded"

onChange={(e)=>setData({...data,title:e.target.value})}

/>

<textarea

placeholder="Description"

className="border w-full p-3 rounded"

onChange={(e)=>setData({...data,description:e.target.value})}

/>

<select

className="border w-full p-3 rounded"

onChange={(e)=>setData({...data,course:e.target.value})}

>

<option>

Select Course

</option>

{

courses.map((c)=>(

<option

key={c._id}

value={c._id}

>

{c.title}

</option>

))

}

</select>

<h2>

Question

</h2>

<input

placeholder="Question"

className="border p-3 rounded w-full"

onChange={(e)=>{

const q=[...data.questions];

q[0].question=e.target.value;

setData({...data,questions:q});

}}

/>

{

data.questions[0].options.map((o,index)=>(

<input

key={index}

placeholder={`Option ${index+1}`}

className="border p-3 rounded w-full my-2"

onChange={(e)=>{

const q=[...data.questions];

q[0].options[index]=e.target.value;

setData({...data,questions:q});

}}

/>

))

}

<select

className="border p-3 rounded"

onChange={(e)=>{

const q=[...data.questions];

q[0].answer=e.target.value;

setData({...data,questions:q});

}}

>

<option value="0">

Option 1 Correct

</option>

<option value="1">

Option 2 Correct

</option>

<option value="2">

Option 3 Correct

</option>

<option value="3">

Option 4 Correct

</option>

</select>

<button

className="bg-purple-600 text-white px-6 py-3 rounded"

>

Create Quiz

</button>

</form>

);

}