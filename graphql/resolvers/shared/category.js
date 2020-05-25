const Category = require("../../../models/shared/category");
const { generateNext } = require("../../../helpers/sequence");

const addCategory = async (_, { id, name, isActive }, req) => {
  req.passed("category-create");
  if (!id) id = await generateNext("category", 1);
  return Category.findByIdAndUpdate(
    id,
    { name, isActive },
    { new: true, upsert: true }
  );
};

const deleteCategory = async (_, { id }, req) => {
  req.passed("category-delete");
  // const courseCount = await Course.countDocuments({ department: id });

  // if (courseCount > 0) {
  //     throw new Error("Kindly detach all its associated entities first.")
  // }
  const count = await Category.countDocuments({ _id: id });

  if (count === 0) {
    throw new Error("Category does not exists!");
  }
  return Category.findByIdAndDelete(id);
};

const categories = (_, args) => {
  const { isActive } = args;
  const filter = {};
  if (isActive !== undefined && isActive !== null) {
    filter["isActive"] = isActive;
  }
  return Category.find(filter);
};
const category = (_,{ id }) => {
  return Category.findById(id);
};

module.exports = {
  Query: {
    categories,
    category,
  },
  Mutation: {
    addCategory,
    deleteCategory,
  },
};
