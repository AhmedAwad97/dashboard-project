const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    sendAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const ContactForm = mongoose.model("contactForm", ContactFormSchema);
module.exports = ContactForm;
