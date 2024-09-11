const express = require("express");
const app = express();
const userModel = require("./models/user");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  const { name, email, imageUrl } = req.body;
  console.log("user", req.body);
  try {
    let userCreated = await userModel.create({
      name,
      email,
      imageUrl,
    });
    // res.json(userCreated);
    res.redirect("/read");
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/edit/:userId", async (req, res) => {
  const users = await userModel.findOne({
    _id: req.params.userId,
  });
  res.render("edit", { users });
  console.log("users", users);
});

app.post("/update/:updateId", async (req, res) => {
  const { name, email, imageUrl } = req.body;
  const users = await userModel.findOneAndUpdate(
    {
      _id: req.params.updateId,
    },
    { name, email, imageUrl },
    { new: true }
  );
  res.redirect("/read");
  console.log("users", users);
});

app.get("/delete/:id", async (req, res) => {
  const deletedUsers = await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/read");
  console.log("deletedUsers", deletedUsers);
});

app.listen(3000);
