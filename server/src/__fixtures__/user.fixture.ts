import { faker } from "@faker-js/faker";

import { User } from "../models/user.model";

export const createUserFixture = async (isAdmin = false) => {
  const authInfo = createUserData();
  const user = new User({
    ...authInfo,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    bio: faker.lorem.sentence(),
    avatar: {
      originalName: faker.system.commonFileName(),
      url: faker.image.avatar(),
      contentType: "image/png",
      size: faker.helpers.rangeToNumber({ min: 10000, max: 500000 }).toString(),
    },
    lastLogin: faker.date.recent(),
    savedProducts: [],
    wishlist: [],
    cart: [],
    isSeller: faker.datatype.boolean(),
    role: isAdmin ? "admin" : faker.helpers.arrayElement(["user", "admin"]),
  });
  await user.save();
  return { user, password: authInfo.password };
};

export const createUserData = () => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email().toLowerCase(),
    password: "12345678",
  };
};
