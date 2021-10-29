const {
  Juniors,
  Languages,
  Technologies,
  Company,
  Publication,
  Admins,
} = require("../models/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const jwtgenerater =  (payload) => {
  const token =  jwt.sign({ id: payload }, SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
};

const finder = async (payload) => {
  const user = await payload.collections.findOne(payload.gmail);
  return user;
};

const finderId = async (payload) => {
  const user = await payload.collections.findById(payload.id);
  return user;
};

const decoder = async (payload) => {
  const decoded = await jwt.verify(payload, SECRET);
  return decoded;
};

module.exports = {
  jwtgenerater,
  finder,
  finderId,
  decoder,
};
