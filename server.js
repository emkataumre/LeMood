//Imports & server setup
import cors from "cors";
import express from "express";
import * as url from "url";
import mongoose from "mongoose";
import Class from "./schemas/class.js";
import { ObjectId } from "mongodb";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const system = express();
const port = 4000;
system.use(express.json());
system.use(express.urlencoded({ extended: true }));
system.use(cors());
system.use(express.static("public"));

//Database connection & setup
let uri = "mongodb://127.0.0.1:27017/LMS";
mongoose.connect(uri).catch((err) => console.log(err));

const myClass = Class;

//Endpoints
system.get("/", (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

system.get("/form", (req, res) => {
  res.sendFile("pages/form.html", { root: __dirname });
});

system.get("/login", (req, res) => {
  res.sendFile("pages/login.html", { root: __dirname });
});

system.get("/createLogin", (req, res) => {
  res.sendFile("pages/createLogin.html", { root: __dirname });
});

system.post("/classes", async (req, res) => {
  const instertedClass = new myClass({
    className: req.body.className,
    fieldOfStudy: req.body.fieldOfStudy,
    internationalClass: req.body.internationalClass,
    startDate: req.body.startDate,
  });
  instertedClass
    .save()
    .then((result) => {
      console.log({ message: "Inserted a new doc", result });
      res.status(201).json(instertedClass);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

system.get("/classes", async (req, res) => {
  myClass
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

system.get("/classes/:id", async (req, res) => {
  myClass.findOne({ _id: req.params.id }).then((result) => {
    console.log(new ObjectId(req.params.id));
    res.status(200).json({
      message: "Successfully retreived",
      id: new ObjectId(req.params.id),
    });
  });
});

system.delete("/classes/:id", async (req, res) => {
  await myClass.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Successfully deleted",
      id: new ObjectId(req.params._id),
    });
  });
});

system.put("/classes/:id", async (req, res) => {
  await myClass
    .updateOne({ _id: new ObjectId(req.params.id) }, req.body)
    .then((result) => {
      if (result.modifiedCount === 1) {
        res.status(200).json({
          message: "Successfully updated",
          id: new ObjectId(req.params.id),
        });
      } else {
        res.status(500).json({ message: "Error" });
      }
    });
});

system.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
