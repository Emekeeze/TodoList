const express = require("express");
const bodyParser = require("body-parser");
const date = require (__dirname + "/date.js")
const app = express();
app.set("view engine", "ejs");
let doings = ["Wash Clothes", "Cook Food", "Read"];
let workitems = [];

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  let day = date()

  res.render("list", { ListTitle: day, newitemsonlist: doings });
});
app.post("/", (req, res) => {
  let newItem = req.body.newitem;
  if (req.body.list === "work") {
    workitems.push(newItem);
    res.redirect("/work");
  } else {
    doings.push(newItem);
    res.redirect("/");
  }
});
app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "work List", newitemsonlist: workitems });
});
app.post("/work", function (req, res) {
  let item = req.body.workitem;
  workitems.push(item);
  res.redirect("/");
});
app.get("/about", function (req, res) {
    res.render("about");
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
