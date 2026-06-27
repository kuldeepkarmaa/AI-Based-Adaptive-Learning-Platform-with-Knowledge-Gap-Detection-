const Quiz=require("../models/Quiz");

exports.createQuiz=async(req,res)=>{

try{

const quiz=await Quiz.create({

title:req.body.title,
description:req.body.description,
course:req.body.course,
questions:req.body.questions,
teacher:req.user._id

});

res.status(201).json({
success:true,
data:quiz
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};

exports.getTeacherQuiz=async(req,res)=>{

try{

const quiz=await Quiz.find({
teacher:req.user._id
}).populate("course");

res.json({
success:true,
data:quiz
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};