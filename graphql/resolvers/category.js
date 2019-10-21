const Category = require('../../models/shared/category');
const { generateNext } = require('../../helpers/sequence');

const addCategory = async ({ id, name, isActive }) => {
    let newDoc;
    // let seq = await generateNext('category', 4);
    if (id)
        newDoc = await Category.findByIdAndUpdate(id, { name, isActive }, { new: true });
    else
        newDoc = await Category.create({
            name: name + seq,
            isActive: true
        });

    return newDoc;
}

const deleteCategory = async ({ id }, req) => {
    // const courseCount = await Course.countDocuments({ department: id });

    // if (courseCount > 0) {
    //     throw new Error("Kindly detach all its associated entities first.")
    // }
    const count = await Category.countDocuments({ _id: id });

    if (count === 0) {
        throw new Error("Category does not exists!")
    }
    return Category.findByIdAndDelete(id);
}

const categories = (args) => {
    const { isActive } = args;
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return Category.find(filter);
}
const category = ({ id }) => {
    return Category.findById(id);
}

module.exports = {
    categories,
    category,
    addCategory,
    deleteCategory
}