const Sequence = require('../models/shared/sequence');

module.exports.generateNext = async function (collectionName, length) {
    let count = await Sequence.countDocuments({ _id: collectionName });
    console.log('count', count)
    if (count == 0) {
        await Sequence.create({ _id: collectionName, sequence_value: 0 });
    }
    return Sequence.findByIdAndUpdate(collectionName, { $inc: { sequence_value: 1 } }, { new: true })
        .then(doc => {
            if (length) {
                let no = `0000000000${doc.sequence_value}`;
                return no.substr(no.length - length);
            }
            return doc.sequence_value;
        });
}