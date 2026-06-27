const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:String,

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },

    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    questions:[
        {
            question:String,

            options:[String],

            answer:Number
        }
    ]
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Quiz",quizSchema);