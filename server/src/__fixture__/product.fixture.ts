import { faker } from "@faker-js/faker/.";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { getOrCreateCategory } from "./category.fixture";

export const createProductData = async (categoryId?: string) => {
  const category = await getOrCreateCategory();

  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    quantity: faker.number.float({ min: 1, max: 100 }),
    categories: [categoryId ?? category],
    specifications: {
      dimensions: {
        width: faker.number.float({ min: 10, max: 200 }).toString(),
        depth: faker.number.float({ min: 10, max: 200 }).toString(),
        height: faker.number.float({ min: 10, max: 200 }).toString(),
      },
      material: faker.commerce.productMaterial(),
      finish: faker.vehicle.color(),
      assemblyRequired: faker.datatype.boolean(),
      weightCapacity: faker.number.float({ min: 10, max: 500 }),
    },
    brand: [faker.company.name()],
    images: [
      {
        originalName: faker.system.fileName(),
        url: faker.image.url(),
        contentType: "image/jpeg",
        size: `${faker.number.float({ min: 500, max: 5000 })} KB`,
      },
    ],
  };
};

export const createProductFixture = async (
  userId: string,
  categoryId?: string,
) => {
  const data = await createProductData(categoryId);
  const product = new Product({
    author: userId,
    ...data,
  });

  await product.save();
  console.log("Product fixture created:", product);

  return product;
};
