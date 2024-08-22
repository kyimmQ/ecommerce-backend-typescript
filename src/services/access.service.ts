"use strict";

// const shopModel = require("../models/shop.model");
// const bcrypt = require("bcrypt");
import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "../auth/authUtils";
import { getInfoData } from "../utils";

const SHOP_ROLE = {
  SHOP: "SHOP",
  ADMIN: "ADMIN",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
};

// Define the shape of the input parameters
interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

// Define the shape of the response object
interface SignUpResponse {
  code: number;
  message: string;
  metadata: any;
}

class AccessService {
  static signUp = async ({
    name,
    email,
    password,
  }: SignUpParams): Promise<SignUpResponse> => {
    try {
      // check email exists
      // lean: return js object
      const shopExist = await shopModel.findOne({ email }).lean();
      if (shopExist) {
        return {
          code: 400,
          message: "Email already exists",
          metadata: null,
        };
      }

      //  hash password
      const hashPassword = await bcrypt.hash(password, 10);
      //  create user
      const newShop = await shopModel.create({
        name,
        email,
        password: hashPassword,
        roles: [SHOP_ROLE.SHOP],
      });

      if (newShop) {
        // create publickey and private key for security
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });
        console.log("publicKey", publicKey);
        console.log("privateKey", privateKey);
        const publicKeyString = await KeyTokenService.generateKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: 400,
            metadata: null,
            message: "publicKey error",
          };
        }

        // const publicKeyObject = crypto.createPublicKey(publicKeyString); // ?
        const tokenPair = await createTokenPair(
          {
            userId: newShop._id,
            email: newShop.email,
            roles: newShop.roles,
          },
          publicKey,
          privateKey
        );

        if (!tokenPair) {
          return {
            code: 400,
            metadata: null,
            message: "tokenPair error",
          };
        }
        return {
          code: 201,
          metadata: {
            shop: getInfoData(["_id", "name", "email"], newShop),
            tokens: tokenPair,
          },
          message: "Sign Up Successfully",
        };
      }

      // sign up error
      return {
        code: 500,
        message: "Error creating new user",
        metadata: null,
      };
    } catch (error) {
      return {
        code: 500,
        message: error instanceof Error ? error.message : "Error signing up",
        metadata: null,
      };
    }
  };
}

export default AccessService;
