import * as JWT from "jsonwebtoken";

export const createTokenPair = async (
  paload: any,
  publicKey: string,
  privateKey: string
) => {
  try {
    const accessToken = JWT.sign(paload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1 day",
    });
    const refreshToken = JWT.sign(paload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decoded) => {
      // if (err) console.log("decode err: ", err);
      // if (decoded) console.log("decoded success: ", decoded);
    });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {}
};
