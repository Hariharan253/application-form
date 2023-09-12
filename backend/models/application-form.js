const mongoose = require("mongoose");

// const uniqueValidator = require("mongoose-unique-validator");

const applicationFormSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    email_address: {type: String, required: true},
    phone: {type: String, required: true}
});

// applicationFormSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Applicationform", applicationFormSchema);
