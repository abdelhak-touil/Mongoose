const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PersonSchema = new schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    favoriteFoods: {
        type: Array,
    },
});

module.exports = Person = mongoose.model("man", PersonSchema);
