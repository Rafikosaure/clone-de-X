import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    pseudonym: { type: String, require: true },
    picture: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    mpEnabled: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true } }
);
userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("User", userSchema);
