var mongoose = require("mongoose");

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  let result = await exec.apply(this, arguments);

  if (this._mongooseOptions.lean) {
    // console.log("isnull or undefined", result == null);
    // console.log("isObject", typeof result == "object");
    // console.log(
    //   "isArray",
    //   Array.isArray(result),
    //   Array.isArray(result) && result.length
    // );
    if (result) {
      if (Array.isArray(result)) result.forEach((x) => (x.id = x._id));
      else result.id = result._id;
    }
  }

  return result;
};