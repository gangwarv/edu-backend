const Course = require("../../models/shared/course");
const Department = require("../../models/shared/department");

const { generateNext } = require("../../helpers/sequence");

const addCourse = async ({ course }, req) => {
  req.passed("course-create");
  const dept = await Department.findById(course.department);

  const newCourse = { ...course, departmentName: dept.name };
  course.departmentName = dept.name;
  // generate code,id
  if (!course.code) newCourse.code = await generateNext("courseCode", 3);
  if (!course.id) newCourse.id = await generateNext("course", 3);
  //end
  return Course.findByIdAndUpdate(newCourse.id, newCourse, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  }).catch(async (err) => {
    // reset code,id to previous only if generated
    if (!course.code) await generateNext("courseCode");
    if (!course.id) await generateNext("course");
    return err;
  });
};

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
      command === "open-admission" ? new Date(data) : null;
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
