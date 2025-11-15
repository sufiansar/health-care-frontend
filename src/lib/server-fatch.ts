import { getCookie } from "@/services/tokenHandlers";

const backEndUrl =
  process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

const serverFetch = async (
  endPoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const { headers, ...rest } = options;

  const accessToken = await getCookie("accessToken");

  const response = await fetch(`${backEndUrl}${endPoint}`, {
    headers: {
      ...headers,
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    ...rest,
  });

  return response;
};

export const serverFetchClient = {
  get: async (endPoint: string, options: RequestInit = {}) =>
    serverFetch(endPoint, { method: "GET", ...options }),

  post: async (endPoint: string, options: RequestInit = {}) =>
    serverFetch(endPoint, { method: "POST", ...options }),

  put: async (endPoint: string, options: RequestInit = {}) =>
    serverFetch(endPoint, { method: "PUT", ...options }),

  patch: async (endPoint: string, options: RequestInit = {}) =>
    serverFetch(endPoint, { method: "PATCH", ...options }),

  delete: async (endPoint: string, options: RequestInit = {}) =>
    serverFetch(endPoint, { method: "DELETE", ...options }),
};
