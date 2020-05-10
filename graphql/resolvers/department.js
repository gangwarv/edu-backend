const Department = require("../../models/shared/department");
const Course = require("../../models/shared/course");
const { generateNext } = require("../../helpers/sequence");

const addDepartment = async (_, { dept: { id, name, isActive } }, req) => {
  req.passed("course-create");
  if (!id) id = await generateNext("department", 3);
  const doc = await Department.findByIdAndUpdate(
    id,
    { name, isActive },
    { new: true, upsert: true, runValidators: true }
  );
  await Course.updateMany({ department: id }, { departmentName: name });

  return doc;
};

const deleteDepartment = async (_, { id }, req) => {
  req.passed("course-delete");

  const courseCount = await Course.countDocuments({ department: id });

  if (courseCount > 0) {
    throw new Error("Kindly detach all its associated entities first.");
  }
  const deptCount = await Department.countDocuments({ _id: id });

  if (deptCount === 0) {
    throw new Error("Academic Department does not exists!");
  }
  return Department.findByIdAndDelete(id);
};

const departments = (_, args) => {
  const { isActive } = args;
  const filter = {};
  if (isActive !== undefined && isActive !== null) {
    filter["isActive"] = isActive;
  }
  return Department.find(filter);
};
const department = (_, { id }) => {
  return Department.findById(id);
};

module.exports = {
  Query: {
    departments,
    department,
  },
  Mutation: {
    addDepartment,
    deleteDepartment,
  },
};
