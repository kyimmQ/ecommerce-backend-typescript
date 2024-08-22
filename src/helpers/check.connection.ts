"use-strict";
import mongoose from "mongoose";

const countConnection = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections: ${numConnection}`);
};

module.exports = { countConnection };
