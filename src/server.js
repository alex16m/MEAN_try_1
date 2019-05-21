var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongo = require("mongoose");

var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function(
  err,
  response
) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to " + db, " + ", response);
  }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: "5mb" }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow_origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema(
  {
    name: { type: String },
    address: { type: String }
  },
  { versionKey: false }
);

var model = mongo.model("users", UsersSchema, "users");

app.post("/api/SaveUser", function(req, res) {
  var mod = new model(req.body);
  if (req.body.mode == "Save") {
    mod.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: "Record has been Inserted..!!" });
      }
    });
  }
});
