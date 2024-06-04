const User = require("../models/user");

const profile_index = (req, res) => {
  const users = User.find()
    .then((users) => {
      const user = users[0];
      res.render("profile", {
        user,
        title: "Profile",
        currentPath: "/profile",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { profile_index };
