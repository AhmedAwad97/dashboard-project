const UserInfo = require("../models/user-info");
const User = require("../models/user");

//handle the setting page
const settings_index = async (req, res) => {
  try {
    const userInfos = await UserInfo.find();
    const userinfo = userInfos[userInfos.length - 1];
    const users = await User.find(); //find if theres any useres collection with User Model
    const user = users[0]; // get the first data record, that will represent the user who is using the dashboard
    //render the settings page after send the respond and send the user,title,current path as variables to the setting.ejs file
    res.render("settings", {
      user: user,
      userinfo: userinfo,
      title: "Settings",
      currentPath: "/settings",
    });
  } catch (err) {
    console.log(err);
  }
};

const settings_Gen_Info_post = (req, res) => {
  const {
    userId, //will be handled through the hidden input in the .ejs file so  the backend can use it
    email,
    "first-name": firstName,
    "last-name": lastName,
  } = req.body;

  //create a new user info record
  const userInfo = new UserInfo({
    userId: userId,
    "first-name": firstName,
    "last-name": lastName,
    email: email,
    updatedAt: Date.now(),
  });

  return userInfo
    .save()
    .then((result) => {
      //check if the user has data record with id = userId, if yes, update it
      return User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "first-name": firstName,
            "last-name": lastName,
            email: email,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
    })
    .then((result) => {
      console.log("User Updated Successfully");
      res.redirect("/settings");
    })
    .catch((err) => {
      console.log(err);
    });
};

const settings_Secu_info_post = (req, res) => {
  const { userId, email, password } = req.body;
  //create a new user info record
  const userInfo = new UserInfo({
    userId: userId,
    email: email,
    password: password,
    passwordUpdatedAt: Date.now(),
  });
  userInfo
    .save()
    .then((result) => {
      //update the user record
      return User.findByIdAndUpdate(
        userId,
        { $set: { password: password, updatedAt: Date.now() } },
        { new: true } //return the modified document
      );
    })
    .then((result) => {
      console.log("Password updated successfully");
      res.redirect("/settings");
    })
    .catch((err) => {
      console.log(err);
    });
};

//export the modules to be used in the router file
module.exports = {
  settings_index,
  settings_Gen_Info_post,
  settings_Secu_info_post,
};
