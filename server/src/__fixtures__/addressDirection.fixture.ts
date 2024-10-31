import { faker } from "@faker-js/faker/.";
import { AddressDirection } from "../models/addressDirection.model";

export const createAddressFixture = async (userId: string) => {
  const address = new AddressDirection({
    user: userId,
    pinCode: faker.location.zipCode(),
    locality: faker.location.streetAddress(),
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    cityDistrictTown: faker.location.city(),
    state: faker.location.state(),
    alternatePhone: faker.phone.number(),
    addressType: faker.helpers.arrayElement(["home", "work"]),
  });

  await address.save();
  console.log("Address fixture created:", address);

  return address;
};
