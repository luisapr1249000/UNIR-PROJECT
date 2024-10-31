import { faker } from "@faker-js/faker/.";
import { Category } from "../models/category.model";
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
