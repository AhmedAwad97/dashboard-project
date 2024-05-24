const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dashboardRouter = require("./Routes/dashboard/dashboardRouter");

const app = express();
app.use(bodyParser.json());

//connect to db
const dbURI =
  "mongodb+srv://awad55397:ahmedaw97@dashboard.ej1kdqa.mongodb.net/dashboard?retryWrites=true&w=majority&appName=dashboard";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    })
  )
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
app.use(express.static("public")); // let the css,js,media to be accessed by views files
app.use(bodyParser.urlencoded({ extended: true })); //middleware for getting the url body sent by form
app.use(morgan("tiny")); //for logging

app.get("/", (req, res) => {
  res.redirect("dashboard");
});

app.get("/settings", (req, res) => {
  res.render("settings", { title: "Settings", currentPath: "/settings" });
});

app.get("/profile", (req, res) => {
  res.render("profile", { title: "Profile", currentPath: "/profile" });
});

app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects", currentPath: "/projects" });
});

app.get("/courses", (req, res) => {
  res.render("courses", { title: "Courses", currentPath: "/courses" });
});

app.get("/friends", (req, res) => {
  res.render("friends", { title: "Friends", currentPath: "/friends" });
});

app.get("/files", (req, res) => {
  res.render("files", { title: "Files", currentPath: "/files" });
});

app.get("/plans", (req, res) => {
  res.render("plans", { title: "Plans", currentPath: "/plans" });
});

app.get("/contact-form", (req, res) => {
  res.render("contact", {
    title: "Conntact-Form",
    currentPath: "/contact-form",
  });
});

app.get("/crud", (req, res) => {
  res.render("crud", { title: "CRUD", currentPath: "/crud" });
});

app.use("/dashboard", dashboardRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page-Not-Found" });
});
