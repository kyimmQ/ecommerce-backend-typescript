"use strict";

import keytokenModel from "../models/keytoken.model";
import crypto from "crypto";
import { Types } from "mongoose";

interface GenerateKeyParams {
  userId: Types.ObjectId;
  publicKey: string;
}

class KeyTokenService {
  static generateKeyToken = async ({
    userId,
    publicKey,
  }: GenerateKeyParams) => {
    // const publicKeyString = publicKey.toString();
    const tokens = await keytokenModel.create({
      user: userId,
      publicKey,
    });
    return tokens ? tokens.publicKey : null;
  };
}

export default KeyTokenService;
