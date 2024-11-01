import request from "supertest";
import app from "../../app";
import { createUserFixture } from "../../__fixtures__/user.fixture";
import { createEndpoint } from "../constants/constants";

export const loginAndGetCookies = async (
  isAdmin = false,
  hasUserAddressDirection = false,
) => {
  const endpoint = createEndpoint("auth", "login");
  const { user, password } = await createUserFixture(
    isAdmin,
    hasUserAddressDirection,
  );

  const response = await request(app)
    .post(endpoint)
    .send({ username: user.username, password });

  const cookies = response.headers["set-cookie"];
  return { user, cookies };
};
