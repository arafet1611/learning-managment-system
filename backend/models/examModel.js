import mongoose from "mongoose";

const examSchema = mongoose.Schema(
  {
    exam_name: {
      type: String,
      required: true,
      unique: true,
    },
    no_of_questions: {
      type: Number,
      default: 0,
    },
    total_marks: {
      type: Number,
      required: true,
      default: 20,
    },
    total_time: {
      type: Number,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    active: {
      type: Boolean,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
