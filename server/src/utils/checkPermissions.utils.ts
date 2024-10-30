import { AddressDirection } from "../models/addressDirection.model";
import { Category } from "../models/category.model";
import { Comment } from "../models/comment.model";
import { Order } from "../models/orders.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";

export const checkUser = async (userId: string) => {
  try {
    const user = await User.exists({ _id: userId });
    return user || false;
  } catch (e) {
    console.error("Error checking product ownership:", e);
    return false;
  }
};

export const checkProductOwnerShip = async (userId: string) => {
  try {
    const product = await Product.exists({ author: userId });
    return product || false;
  } catch (e) {
    console.error("Error checking product ownership:", e);
    return false;
  }
};

export const checkCommentOwnerShip = async (userId: string) => {
  try {
    const comment = await Comment.exists({ author: userId });
    return comment || false;
  } catch (e) {
    console.error("Error checking product ownership:", e);
    return false;
  }
};

export const checkAddressDirectionOwnerShip = async (userId: string) => {
  try {
    const address = await AddressDirection.exists({ user: userId });
    return address || false;
  } catch (e) {
    console.error("Error checking product ownership:", e);
    return false;
  }
};

export const checkCategoryOwnerShip = async (userId: string) => {
  try {
    const category = await Category.exists({ author: userId });
    return category || false;
  } catch (e) {
    console.error("Error checking product ownership:", e);
    return false;
  }
};

export const checkOrderOwnerShip = async (userId: string) => {
  try {
    const category = await Order.exists({ author: userId });
    return category || false;
  } catch (e) {
    console.error("Error checking product ownership:", e);
    return false;
  }
};
