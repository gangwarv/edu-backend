const { transformDocument } = require('../../helpers/transform')
const Category = require('../../models/shared/category');

const addCategory = ({ name }) => {
    return Category.create({
        name,
        isActive: true
    })
        .then(_ => {
            return transformDocument(_);
        })
}

const categories = ({ isActive }) => {
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return Category.find(filter);
}

module.exports =
    {
        addCategory,
        categories
    }