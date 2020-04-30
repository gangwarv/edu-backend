const Course = require("../../models/shared/course");
const Department = require("../../models/shared/department");

const { generateNext } = require("../../helpers/sequence");

const addCourse = async ({ course }, req) => {
  req.passed("course-create");
  const dept = await Department.findById(course.department);
  let newCourse = {
    ...course,
    departmentName: dept.name,
  };
  // generate code
  if (!newCourse.code)
    newCourse = { ...newCourse, code: await generateNext("course", 3, "C") };
  //end

  var createdCourse = null;

  const id = newCourse.id;
  if (id)
    createdCourse = await Course.findByIdAndUpdate({ _id: id }, newCourse, {
      new: true,
    });
  else {
    createdCourse = await Course.create(newCourse);
  }

  if (dept.courses.indexOf(createdCourse.id) === -1) {
    dept.courses.push(createdCourse.id);
    await dept.save();
  }

  return createdCourse;
};
// toggleCourse = async ({ id }) => {
//   req.passed("course-create");
//   try {
//     const course = await Course.findById(id);
//     const dept = await Department.findById(course.department);

//     if (!course.isActive && !dept.isActive) {
//       throw new Error(
//         "Please activate department first before activating it's courses."
//       );
//     }

//     course.isActive = !course.isActive;

//     return course.save();
//   } catch (err) {
//     throw err;
//   }
// };

const courses = async ({ isActive, department }, req, res) => {
  const filter = {};

  if (isActive !== undefined) filter["isActive"] = isActive;
  if (department) {
    filter["department"] = department;
  }

  return Course.find(filter);
};

const course = ({ id }, req) => {
  return Course.findById(id);
};

const deleteCourse = async ({ id }, req) => {
  req.passed("course-delete");
  const count = await Course.countDocuments({ _id: id });

  if (count === 0) {
    throw new Error("Course does not exists!");
  }
  return Course.findByIdAndDelete(id);
};

const modifyCourses = async ({ ids, command, data }, req) => {
  req.passed("course-create");
  let change = {};
  if (command === "activate" || command === "block")
    change.isActive = command === "activate";
  if (command === "open-admission" || command === "close-admission") {
    change.admissionOpen = command === "open-admission";
    change.admissionLastDate =
      command === "open-admission"
        ? data != null
          ? new Date(data)
          : new Date()
        : null;
  }

  await Course.updateMany({ _id: { $in: [...ids] } }, { $set: change });

  return Course.find({ _id: { $in: ids } });
};

module.exports = {
  addCourse,
  //   toggleCourse,
  deleteCourse,
  courses,
  course,
  modifyCourses,
};
