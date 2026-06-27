const express=require("express");

const router=express.Router();

const {protect}=require("../middleware/authMiddleware");

const {

createQuiz,
getTeacherQuiz

}=require("../controllers/quizController");

router.post("/",protect,createQuiz);

router.get("/",protect,getTeacherQuiz);

module.exports=router;