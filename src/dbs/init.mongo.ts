"use strict";
import mongoose from "mongoose";
import config from "../configs/config.mongodb";

const { host, port, name } = config.db;

const connectionString = `mongodb://${host}:${port}/${name}`;

// singleton
class Database {
  private static instance: Database;
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    // if (1 === 1) {
    //   mongoose.set("debug", true);
    //   mongoose.set("debug", { color: true });
    // }

    // poolSize: opended connections from the app to db
    // The opened connection can defer their closing step so that they can
    // be pass to other waiting database operations
    mongoose
      .connect(connectionString, {
        maxPoolSize: 50,
      })
      .then((_) => console.log(`Connected to ${type} successfully`))
      .catch((_) => console.log("Error connect to database"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database.getInstance();
