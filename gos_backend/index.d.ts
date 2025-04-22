// decoration file for types

import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId;
      sessionId;
      userRole;
    }
  }
}
export {};
