import { faker } from "@faker-js/faker/.";
import { Category } from "../models/category.model";
import { getOrCreateUser } from "./user.fixture";
export const createCategoryData = () => {
  return {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  };
};

export const createCategoryFixture = async (userId: string) => {
  const category = new Category({
    author: userId,
    ...createCategoryData(),
  });

  await category.save();
  console.log("Category fixture created:", category);

  return category;
};

export const getOrCreateCategory = async () => {
  const userId = await getOrCreateUser();
  let category = await Category.findOne();
  if (!category) {
    const newCategory = await createCategoryFixture(userId);
    category = newCategory;
  }
  return category._id.toString();
};
