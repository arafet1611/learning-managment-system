import Course from "../models/courseModel.js";

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

const deleteCourse = async (req, res) => {
  const id = req.params.id;

  Course.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      res.status(404);
      throw new Error("Course not found");
    } else {
      res.json({ message: "The course has been deleted" });
    }
  });
};

export {
  createCourse,
  getCourses,
  getSpecificCourses,
  updateCourse,
  deleteCourse,
};
