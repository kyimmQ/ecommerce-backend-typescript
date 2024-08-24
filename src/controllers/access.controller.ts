"use strict";

import { NextFunction, Request, Response } from "express";
import AccessService from "../services/access.service";

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`[P]::signUp::`, req.body);
      res.status(201).json(await AccessService.createNewUser(req.body));
    } catch (error) {
      next(error);
    }
  };
}

export default new AccessController();
