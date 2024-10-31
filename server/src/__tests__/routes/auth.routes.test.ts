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
  const getAuthUserEndpoint = createEndpoint("auth", "user/me"); // Assuming the route is defined as /auth/user

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
      const { username, email, password } = createUserData(); // Generate user data

      const response = await request(app)
        .post(signupEndpoint)
        .send({ username, email, password });

      expect(response.status).toBe(201);
    });
  });

  it("should return error if user already exists", async () => {
    const existingUser = createUserFixture(); // Create a user fixture

    const response = await request(app).post(signupEndpoint).send(existingUser);

    expect(response.status).toBe(400);
  });

  it("should return error on validation failure", async () => {
    const response = await request(app).post(signupEndpoint).send({}); // Sending an empty request body

    expect(response.status).toBe(400);
  });

  describe(`POST ${loginEndpoint}`, () => {
    it("should log in a user successfully", async () => {
      const { user, password } = await createUserFixture(); // Generate user data

      const response = await request(app)
        .post(loginEndpoint) // First, sign up the user
        .send({ username: user.username, password });
      expect(response.status).toBe(200);
    });

    it("should log in a user successfully using email", async () => {
      const { user, password } = await createUserFixture(); // Generate user data

      const response = await request(app)
        .post(loginEndpoint) // First, sign up the user
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
      const { user } = await createUserFixture(); // Generate user data
      const response = await request(app)
        .post(loginEndpoint)
        .send({ loginValue: user.username, password: "wrongPassword" }); // Attempt to log in with incorrect password

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });

    // it("should return error on server error", async () => {
    //   // Simulate a server error condition as needed.

    //   const response = await request(app)
    //     .post(loginEndpoint)
    //     .send({ loginValue: "testUser", password: "testPass" });

    //   expect(response.status).toBe(500);
    //   expect(response.body).toHaveProperty("message", expect.anything()); // Ensure a message is returned
    // });
  });

  describe(`GET ${refreshTokenEndpoint}`, () => {
    it("should refresh the access token successfully", async () => {
      const response = await request(app)
        .get(refreshTokenEndpoint)
        .set("Cookie", userCookies); // Attach the refresh token cookie

      expect(response.status).toBe(200);
    });

    it("should return unauthorized if no refresh token is provided", async () => {
      const response = await request(app).get(refreshTokenEndpoint); // No cookies provided

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });

    it("should return forbidden if refresh token is invalid", async () => {
      const invalidRefreshToken = "invalidRefreshToken"; // Simulate an invalid refresh token

      const response = await request(app)
        .get(refreshTokenEndpoint)
        .set("Cookie", [`refreshToken=${invalidRefreshToken}`]); // Attach invalid refresh token cookie

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("error", "Invalid refresh token");
    });

    // it("should return error on server error", async () => {
    //   // Simulate a server error condition as needed.

    //   const response = await request(app)
    //     .get(refreshTokenEndpoint)
    //     .set("Cookie", ["refreshToken=validToken"]); // Use a valid token for testing

    //   expect(response.status).toBe(500);
    //   expect(response.body).toHaveProperty("message", expect.anything()); // Ensure a message is returned
    // });
  });
  describe(`GET ${getAuthUserEndpoint}`, () => {
    it("should return the authenticated user data", async () => {
      const response = await request(app)
        .get(getAuthUserEndpoint)
        .set("Cookie", userCookies); // Attach cookies from login

      expect(response.status).toBe(200);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(getAuthUserEndpoint); // No cookies provided

      expect(response.status).toBe(401); // Adjust based on your actual behavior
      expect(response.body).toHaveProperty("error", "Unauthorized"); // Adjust based on your error handling
    });
  });
});
