import { Types } from "mongoose";

export const NON_EXISTED_OBJECT_ID = new Types.ObjectId().toString();
export const NON_VALID_OBJECT_ID = "fwer";
export const API_URL = "/api/v1";
export const createEndpoint = (endpoint: string, subpath?: string) =>
  `${API_URL}/${endpoint}${subpath ? `/${subpath}` : ""}`;

export const createQueryEndpoint = (
  fullUrl: string,
  page: string,
  limit = "10",
) => {
  return `${fullUrl}?page={${page}&limit=${limit}}`;
};
