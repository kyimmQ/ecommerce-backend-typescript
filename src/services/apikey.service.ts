import apikeyModel from "../models/apikey.model";
import crypto from "crypto";

class ApiKeyService {
  static async getApiKey(apiKey: string) {
    const key = await apikeyModel.findOne({ key: apiKey, status: true }).lean();
    return key;
  }

  static async createApiKey() {
    const key = await apikeyModel.create({
      key: crypto.randomBytes(64).toString("hex"),
      permissions: "0000",
    });
  }
}

export default ApiKeyService;
