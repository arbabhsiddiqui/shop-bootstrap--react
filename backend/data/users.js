import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin user",
    email: "zackh41@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "zaid",
    email: "zaid@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "khan",
    email: "kham@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
