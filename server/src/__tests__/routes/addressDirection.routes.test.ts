import request from "supertest";
import app from "../../app";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import { loginAndGetCookies } from "../helpers/auth.helper";
import { createUserFixture } from "../../__fixtures__/user.fixture";
import {
  createCategoryData,
  createCategoryFixture,
} from "../../__fixtures__/category.fixture";
import {
  createEndpoint,
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../constants/constants";
import { createAddressFixture } from "../../__fixtures__/addressDirection.fixture";

describe("Address Directions Routes", () => {
  let addressDirectionEndpoint = createEndpoint("users", "address-direction");
  let user1Cookies = "";
  let addressDirectionData = {};
  let addressDirectionId = "";
  let addressDirectionIdEndpoint = "";
  const noValidIdAddressDirectionEndpoint = createEndpoint(
    "users",
    `address-direction/${NON_VALID_OBJECT_ID}`,
  );
  const nonexistedAddressDirectionIdEndpoint = createEndpoint(
    "users",
    `address-direction/${NON_EXISTED_OBJECT_ID}`,
  );

  beforeAll(async () => {
    await setUpDBForTest();
    const { user, cookies } = await loginAndGetCookies(false, true);
    user1Cookies = cookies;
    addressDirectionId = user.addressDirections[0]._id.toString();
    addressDirectionEndpoint = createEndpoint(
      "users",
      `address-direction/${addressDirectionId}`,
    );
  });

  beforeEach(async () => {
    addressDirectionData = await createAddressFixture();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe(`POST ${addressDirectionEndpoint}`, () => {
    it("should successfully create a new address direction for the authenticated user", async () => {
      const response = await request(app)
        .post(addressDirectionEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);
      expect(response.status).toBe(201);
    });

    it("should return 400 if validation fails", async () => {
      const response = await request(app)
        .post(addressDirectionEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe(`PUT ${addressDirectionEndpoint}/:addressDirectionId`, async () => {
    it("should successfully update an address direction for the authenticated user", async () => {
      const response = await request(app)
        .put(addressDirectionIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(200);
    });
    it("should successfully update an address direction for the authenticated user", async () => {
      const response = await request(app)
        .put(addressDirectionIdEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(200);
    });
    it("should return 404 if the object id is not valid", async () => {
      const response = await request(app)
        .put(noValidIdAddressDirectionEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Address not found");
    });

    it("should return 404 if the object id is not found", async () => {
      const response = await request(app)
        .put(nonexistedAddressDirectionIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Address not found");
    });
  });
  describe(`DELETE ${addressDirectionEndpoint}/:addressDirectionId`, async () => {
    let cookiesForTestDelete = "";
    let addressDirectionIdToDelete = "";
    let addressDirectionIdToDeleteEndpoint = "";
    beforeEach(async () => {
      const { user, cookies } = await loginAndGetCookies(false, true);
      cookiesForTestDelete = cookies;
      addressDirectionIdToDelete = user.addressDirections[0]._id.toString();
      addressDirectionIdToDeleteEndpoint = createEndpoint(
        "users",
        `adress-direction/${addressDirectionIdToDelete}`,
      );
    });

    it("should successfully delete an address direction for the authenticated user", async () => {
      const response = await request(app)
        .delete(addressDirectionIdToDeleteEndpoint)
        .set("Cookie", cookiesForTestDelete);

      expect(response.status).toBe(204);
    });

    it("should return 404 if the object id is not valid", async () => {
      const response = await request(app)
        .delete(noValidIdAddressDirectionEndpoint)
        .set("Cookie", cookiesForTestDelete);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Address not found");
    });

    it("should return 404 if the object id is not found", async () => {
      const response = await request(app)
        .delete(nonexistedAddressDirectionIdEndpoint)
        .set("Cookie", cookiesForTestDelete);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Address not found");
    });
  });
});
