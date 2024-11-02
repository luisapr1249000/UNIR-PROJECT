import { faker } from "@faker-js/faker";

export const createAddressFixture = async () => {
  const address = {
    pinCode: faker.location.zipCode(),
    locality: faker.location.streetAddress(),
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    cityDistrictTown: faker.location.city(),
    state: faker.location.state(),
    alternatePhone: faker.phone.number(),
    addressType: faker.helpers.arrayElement(["home", "work"]),
  };

  console.log("Address fixture created:", address);

  return address;
};
