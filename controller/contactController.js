const ContactForm = require("../models/contactForm");

const contact_index = (req, res) => {
  res.render("contact", {
    title: "Conntact-Form",
    currentPath: "/contact-form",
  });
};

const contact_form_post = (req, res) => {
  const contactForm = new ContactForm(req.body);
  contactForm
    .save()
    .then((result) => {
      console.log(result);
      console.log("submitted");
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, error: "Falied to save the form" });
    });
};

module.exports = {
  contact_index,
  contact_form_post,
};
