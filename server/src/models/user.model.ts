import bcrypt from "bcrypt";
import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { UserDocument } from "../types/user";

export const imageSchema = new Schema({
  originalName: String,
  url: String,
  contentType: String,
  size: String,
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    firstName: String,
    lastName: String,
    bio: String,
    phoneNumber: Number,
    avatar: imageSchema,
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    savedProducts: [
      { type: Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
    cart: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
    isSeller: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
    methods: {
      comparePasswords(candidatePassword: string): boolean {
        return bcrypt.compareSync(candidatePassword, this.password ?? "");
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this?.password, salt);
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.plugin(mongoosePaginate);
export const User = model<UserDocument, PaginateModel<UserDocument>>(
  "User",
  userSchema,
);

// export const User = model("Users", userSchema);
