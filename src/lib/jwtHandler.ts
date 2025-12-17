"use server";

import jwt from "jsonwebtoken";

export const verifyAccessToken = async (token: string) => {
  try {
    const verifiedAccessToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    return {
      success: true,
      message: "Token is valid",
      payload: verifiedAccessToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid token",
    };
  }
};

export const verifyResetPasswordToken = async (token: string) => {
  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.RESET_PASSWORD_JWT_SECRET!
    ) as jwt.JwtPayload;

    return {
      success: true,
      message: "Token is valid",
      payload: verifiedToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid token",
    };
  }
};
