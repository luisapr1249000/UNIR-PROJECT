import request from "supertest";
import app from "../../app";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import { loginAndGetCookies } from "../helpers/auth.helper";
import {
  createEndpoint,
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../constants/constants";
import { createUserFixture } from "../../__fixtures__/user.fixture";

describe("User Routes", () => {
  let userId = "";
  let username = "";
  let userCookies = "";
  let user2Cookies = "";
  let adminCookies = "";

  const userEndpoint = createEndpoint("users");

  beforeAll(async () => {
    await setUpDBForTest();

    const { cookies: adminCookie } = await loginAndGetCookies(true);
    adminCookies = adminCookie;
    const { user, cookies } = await loginAndGetCookies();
    const { cookies: cookie2 } = await loginAndGetCookies();
    username = user.username;
    userId = user._id.toString();
    userCookies = cookies;
    user2Cookies = cookie2;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe(`PUT ${userEndpoint}`, () => {
    it("should return 200 for successful update", async () => {
      const updateData = { firstName: "updatedUser" };

      const response = await request(app)
        .put(userEndpoint)
        .set("Cookie", userCookies)
        .send(updateData);

      expect(response.status).toBe(200);
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app)
        .put(userEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if unauthorized", async () => {
      const response = await request(app)
        .put(userEndpoint)
        .send({ username: "newUser" });

      expect(response.status).toBe(401);
    });
  });

  describe(`DELETE ${userEndpoint}/:userId`, () => {
    let userIdToDelete = "";
    let userCookiesToDelet = "";
    let userDeleteEndpoint = "";
    beforeEach(async () => {
      const { user, cookies } = await loginAndGetCookies();
      userIdToDelete = user._id.toString();
      userCookiesToDelet = cookies;
      userDeleteEndpoint = createEndpoint("users", userIdToDelete);
    });
    it("should return 204 if user deleted successfully as admin", async () => {
      const response = await request(app)
        .delete(userDeleteEndpoint)
        .set("Cookie", adminCookies);
      expect(response.statusCode).toBe(204);
    });
    it("should return 204 if user deleted successfully as the user themselves", async () => {
      const response = await request(app)
        .delete(userDeleteEndpoint)
        .set("Cookie", userCookiesToDelet);
      expect(response.statusCode).toBe(204);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .delete(createEndpoint("users", NON_VALID_OBJECT_ID))
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .delete(createEndpoint("users", NON_EXISTED_OBJECT_ID))
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 403 if a non-admin attempts to delete another user", async () => {
      const response = await request(app)
        .delete(userDeleteEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 401 if no authorization token is provided", async () => {
      const response = await request(app).delete(userDeleteEndpoint);

      expect(response.status).toBe(401);
    });
  });

  describe(`GET ${userEndpoint}/:userId`, () => {
    const userIdEnpoint = createEndpoint("users", userId);
    const userNonValidIdEnpoint = createEndpoint("users", NON_VALID_OBJECT_ID);
    const userNonexistedIdEnpoint = createEndpoint(
      "users",
      NON_EXISTED_OBJECT_ID,
    );

    it("should retrieve user successfully by ID", async () => {
      const response = await request(app).get(userIdEnpoint);

      expect(response.status).toBe(200);

      expect(response.body).not.toHaveProperty("cart");
      expect(response.body).not.toHaveProperty("savedProducts");
      expect(response.body).not.toHaveProperty("wishlist");
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app).get(userNonValidIdEnpoint);

      expect(response.status).toBe(400);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app).get(userNonexistedIdEnpoint);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe(`GET ${userEndpoint}/:username`, () => {
    const usernameEndpoint = createEndpoint("users", username);
    const nonexistedUsernameEndpoint = createEndpoint("users", "__fw");

    it("should retrieve user successfully by username", async () => {
      const response = await request(app).get(usernameEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 404 if user does not exist", async () => {
      const nonExistentUsername = "nonExistentUser123";
      const response = await request(app).get(nonExistentUsername);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe(`GET ${userEndpoint} with pagination`, () => {
    const userEndpointQuery = (page: number | string) =>
      `${userEndpoint}/?page=${page}`;

    it("should retrieve paginated list of users", async () => {
      const response = await request(app).get(userEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 404 if no users found on page", async () => {
      const response = await request(app).get(userEndpointQuery(1));
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid pagination parameters", async () => {
      const response = await request(app).get(userEndpointQuery("fwerfwr"));

      expect(response.status).toBe(400);
    });
  });
});
