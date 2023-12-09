import Course from "../models/courseModel.js";
import Student from "../models/studentModel.js";
const createCourse = async (req, res) => {
  const { course_name, course_outline, total_units } = req.body;

  const existingCourse = await Course.findOne({ course_name });

  if (existingCourse) {
    res.status(400).json({ error: "Course with the same name already exists" });
    return;
  }
  const course = new Course({
    course_name: course_name,
    course_outline: course_outline,
    total_units: total_units,
    created_by: req.user._id,
  });

  try {
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400);
    throw new Error("Unable to create course");
  }
};

const getCourses = async (req, res) => {
  const courses = await Course.find({});

  res.json(courses);
};

const getSpecificCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    const courseData = courses.filter((course) => {
      return course.created_by.equals(req.user._id);
    });

    res.status(200).send(courseData);
  } catch (error) {
    console.error("Error fetching specific courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCoursebyid = async (req, res) => {
  try {
    const courses = await Course.find({});
    const course = courses.filter((course) => {
      return course._id.equals(req.params.id);
    });

    res.status(200).send(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateCourse = async (req, res) => {
  const { course_name, course_outline, total_units } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.course_name = course_name;
    course.course_outline = course_outline;
    course.total_units = total_units;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
};

const subcribeToCourse = async (req, res) => {
  try {
    const { course_id } = req.body;

    const course = await Course.findById(course_id);

    if (course) {
      const student = await Student.findById(req.user._id);
      student.course.push(course_id);

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error subscribing to course", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;

  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  } else {
    res.json({ message: "The course has been deleted" });
  }
};

export {
  createCourse,
  getCourses,
  getSpecificCourses,
  updateCourse,
  deleteCourse,
  subcribeToCourse,
  getCoursebyid,
};
