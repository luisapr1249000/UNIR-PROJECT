import { faker } from "@faker-js/faker/.";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";

// Helper to fetch or create a category
const getOrCreateCategory = async () => {
  let category = await Category.findOne();
  if (!category) {
    category = new Category({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    });
    await category.save();
  }
  return category;
};
export const createProductFixture = async (userId: string) => {
  const category = await getOrCreateCategory();
  const product = new Product({
    author: userId,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    quantity: faker.number.float({ min: 1, max: 100 }),
    categories: [category._id],
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
  });

  await product.save();
  console.log("Product fixture created:", product);

  return product;
};
