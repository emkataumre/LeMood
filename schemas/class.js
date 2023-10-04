import mongoose from "mongoose";

const Class = mongoose.Schema({
  className: { type: String },
  fieldOfStudy: { type: String },
  internationalClass: { type: Boolean },
  startDate: { type: Date },
});

export default mongoose.model("Class", Class);
