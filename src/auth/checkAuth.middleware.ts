import { NextFunction, Request, Response } from "express";
import ApiKeyService from "../services/apikey.service";
import { FlattenMaps, Types } from "mongoose";

const HEADER = { API_KEY: "x-api-key", AUTHORIZATION: "authorization" };

interface APIKeyRequest extends Request {
  apiKey?:
    | (FlattenMaps<
        {
          createdAt: NativeDate;
          updatedAt: NativeDate;
        } & {
          key: string;
          status: boolean;
          permissions: string[];
        }
      > & {
        _id: Types.ObjectId;
      })
    | null; // Add your custom property here
}

export const checkApiKey = async (
  req: APIKeyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      res.status(403).json({ message: "Missing API key" });
    }

    const checkKey = await ApiKeyService.getApiKey(key as string);
    if (!checkKey) {
      res.status(403).json({ message: "Forbidden Error" });
    }

    req.apiKey = checkKey;
    return next();
  } catch (error) {}
};

export const checkPermission = (permission: string) => {
  return (req: APIKeyRequest, res: Response, next: NextFunction) => {
    const userPermission = req.apiKey?.permissions || [];
    if (!userPermission.includes(permission)) {
      return res.status(403).json({ message: "Forbidden Error" });
    }
    return next();
  };
};
