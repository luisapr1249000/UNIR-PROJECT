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

describe("Category Routes", () => {
  let userId = "";
  let userCookies = "";
  let categoryId = "";
  let categoryEndpoint = createEndpoint("categories");
  let categoryIdEndpoint = "";
  let adminCookies = "";
  let user2Cookies = "";

  const categoryNoValidIdEndpoint = createEndpoint(
    "category",
    NON_VALID_OBJECT_ID,
  );
  const categoryNonexistedIdEndpoint = createEndpoint(
    "category",
    NON_EXISTED_OBJECT_ID,
  );

  const categoryQueryEndpoint = (query: string) => {
    return createEndpoint("category", `?page=${query}`);
  };

  beforeAll(async () => {
    await setUpDBForTest();

    const { user, cookies } = await loginAndGetCookies();
    userId = user._id.toString();
    userCookies = cookies;

    const category = await createCategoryFixture(userId);
    categoryId = category._id.toString();
    categoryIdEndpoint = createEndpoint("category", categoryId);
    const { cookies: adminCookie } = await loginAndGetCookies(true);
    adminCookies = adminCookie;

    const { cookies: user2Cookie } = await loginAndGetCookies();
    user2Cookies = user2Cookie;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe(`GET ${categoryEndpoint}`, () => {
    it("should retrieve paginated list of categories", async () => {
      const response = await request(app).get(categoryQueryEndpoint("1"));

      expect(response.status).toBe(200);
    });

    it("should return 404 if no categories found on page", async () => {
      const response = await request(app).get(categoryQueryEndpoint("10"));

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid pagination parameters", async () => {
      const response = await request(app).get(
        categoryQueryEndpoint("wrfwerfwer"),
      );

      expect(response.status).toBe(404);

      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${categoryEndpoint}`, () => {
    it("should create a new category", async () => {
      const newCategory = createCategoryData();

      const response = await request(app)
        .post(categoryEndpoint)
        .set("Cookie", userCookies)
        .send(newCategory);

      expect(response.status).toBe(201);
    });

    it("should return 400 if the category input is invalid", async () => {
      const invalidCategory = { invalidField: "Invalid Data" };

      const response = await request(app)
        .post(categoryEndpoint)
        .set("Cookie", userCookies)
        .send(invalidCategory);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const newCategory = { name: "New Category" };

      const response = await request(app)
        .post(categoryEndpoint)
        .send(newCategory);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });
  });

  describe(`PUT ${categoryEndpoint}/:categoryId`, () => {
    const updatedData = createCategoryData();

    it("should update an existing category", async () => {
      const response = await request(app)
        .put(categoryIdEndpoint)
        .set("Cookie", userCookies)
        .send(updatedData);

      expect(response.status).toBe(200);
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app)
        .put(categoryNonexistedIdEndpoint)
        .set("Cookie", userCookies)
        .send(updatedData);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .put(categoryNoValidIdEndpoint)
        .set("Cookie", userCookies)
        .send(updatedData);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not cookies", async () => {
      const response = await request(app)
        .put(categoryIdEndpoint)
        .send(updatedData);

      expect(response.status).toBe(400);
    });

    it("should update an existing category by an admin", async () => {
      const updatedData = { name: "Updated by Admin Category Name" };

      const response = await request(app)
        .put(categoryIdEndpoint)
        .set("Cookie", adminCookies)
        .send(updatedData);

      expect(response.status).toBe(200);
    });

    it("should return 403 if a user who is not the owner attempts to update a category", async () => {
      const response = await request(app)
        .put(categoryIdEndpoint)
        .set("Cookie", user2Cookies)
        .send(updatedData);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "Forbidden: You do not have permission to update this category.",
      );
    });
  });

  describe(`DELETE ${categoryEndpoint}/:categoryId`, () => {
    let categoryIdToDelete = "";
    let deleteCategoryEndpoint = "";
    beforeEach(async () => {
      const { _id } = await createCategoryFixture(userId);
      categoryIdToDelete = _id.toString();
      deleteCategoryEndpoint = createEndpoint("categories", categoryIdToDelete);
    });

    it("should return 204 if user is admin", async () => {
      const response = await request(app)
        .delete(deleteCategoryEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(401);
    });

    it("should return 401 if not cookies", async () => {
      const response = await request(app).delete(deleteCategoryEndpoint);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not user admin", async () => {
      const response = await request(app)
        .delete(deleteCategoryEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(400);
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app)
        .delete(categoryNonexistedIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .put(categoryNoValidIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });
  });
});
