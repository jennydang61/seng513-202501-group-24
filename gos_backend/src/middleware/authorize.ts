// for security, also checking the authorization on the backend endpoints for admin only routes

import { RequestHandler } from "express";
import { FORBIDDEN } from "../constants/http";
import appAssert from "../utils/appAssert";

const authorize = (requiredRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const userRole = req.userRole; // Assume `req.userRole` is set by the `authenticate` middleware

    appAssert(
      requiredRoles.includes(userRole),
      FORBIDDEN,
      "You do not have permission to access this resource"
    );

    req.userId = req.userId;
    req.userRole = req.userRole; // set the user's role for later use
    req.sessionId = req.sessionId;
    next();
  };
};

export default authorize;