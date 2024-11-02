import request from "supertest";
import app from "../../app";
import {
  createUserData,
  createUserFixture,
} from "../../__fixtures__/user.fixture";
import { setUpDBForTest, disconnectDB } from "../db/setUpDB";
import { createEndpoint } from "../constants/constants";
import { loginAndGetCookies } from "../helpers/auth.helper";

describe("Auth Routes", () => {
  const signupEndpoint = createEndpoint("auth", "signup");
  const loginEndpoint = createEndpoint("auth", "login");
  const refreshTokenEndpoint = createEndpoint("auth", "token/refresh");
  const getAuthUserEndpoint = createEndpoint("auth", "user/me");

  let userCookies: string;
  beforeAll(async () => {
    await setUpDBForTest();
    const { cookies } = await loginAndGetCookies();
    userCookies = cookies;
  });

  beforeAll(async () => {
    await disconnectDB();
  });

  describe(`POST ${signupEndpoint}`, () => {
    it("should sign up a new user successfully", async () => {
      const { username, email, password } = createUserData();

      const response = await request(app)
        .post(signupEndpoint)
        .send({ username, email, password });

      expect(response.status).toBe(201);
    });
  });

  it("should return error if user already exists", async () => {
    const existingUser = createUserFixture();

    const response = await request(app).post(signupEndpoint).send(existingUser);

    expect(response.status).toBe(400);
  });

  it("should return error on validation failure", async () => {
    const response = await request(app).post(signupEndpoint).send({});

    expect(response.status).toBe(400);
  });

  describe(`POST ${loginEndpoint}`, () => {
    it("should log in a user successfully", async () => {
      const { user, password } = await createUserFixture();

      const response = await request(app)
        .post(loginEndpoint)
        .send({ username: user.username, password });
      expect(response.status).toBe(200);
    });

    it("should log in a user successfully using email", async () => {
      const { user, password } = await createUserFixture();

      const response = await request(app)
        .post(loginEndpoint)
        .send({ email: user.email, password });
      expect(response.status).toBe(200);
    });

    it("should return error if user not found", async () => {
      const response = await request(app)
        .post(loginEndpoint)
        .send({ loginValue: "nonexistentUser", password: "wrongPassword" });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "User not found");
    });

    it("should return error if password is incorrect", async () => {
      const { user } = await createUserFixture();
      const response = await request(app)
        .post(loginEndpoint)
        .send({ loginValue: user.username, password: "wrongPassword" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe(`GET ${refreshTokenEndpoint}`, () => {
    it("should refresh the access token successfully", async () => {
      const response = await request(app)
        .get(refreshTokenEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(200);
    });

    it("should return unauthorized if no refresh token is provided", async () => {
      const response = await request(app).get(refreshTokenEndpoint);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });

    it("should return forbidden if refresh token is invalid", async () => {
      const invalidRefreshToken = "invalidRefreshToken";

      const response = await request(app)
        .get(refreshTokenEndpoint)
        .set("Cookie", [`refreshToken=${invalidRefreshToken}`]);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("error", "Invalid refresh token");
    });
  });
  describe(`GET ${getAuthUserEndpoint}`, () => {
    it("should return the authenticated user data", async () => {
      const response = await request(app)
        .get(getAuthUserEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(getAuthUserEndpoint);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });
  });
});
