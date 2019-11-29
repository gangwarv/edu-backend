
module.exports = {
    transformDocument(data){
        return {
            ...data._doc,
            _id: data.id,
            id: data.id
        }
    }
}