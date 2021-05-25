const mongoose = require("mongoose");
const Person = require("./models/Person");
const connectDB = require("./config/connectDB");
mongoose.set("useFindAndModify", false);
connectDB();

const person = new Person({
    _id: 1,
    name: "Jhon Snow",
    age: "28",
    favoriteFoods: ["BBQ", "pizza", "burritos"],
});

person.save((error) => {
    if (error) console.log(error);
});

Person.create(
    [
        {
            _id: 2,
            name: "Mark Zuckerbureg",
            age: "30",
            favoriteFoods: ["shawerma", "salade", "burritos"],
        },
        {
            _id: 3,
            name: "Ned Stark",
            age: "59",
            favoriteFoods: ["BBQ", "koskos", "burritos"],
        },
    ],

    (err) => {
        if (err) return console.log(err); // saved
    }
); 
Person.find({}, (err, data) => {
    err
        ? console.log("there is and error", err)
        : console.log("this is the data: ", data);
});

Person.findOne({ favoriteFoods: "pizza" }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("searching result : ", data);
    }
});
var id = 1;
Person.findById(id, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Result : ", data);
    }
});

var findEditThenSave = function (personId) {
    var foodToAdd = "hamburger";
    Person.findById(personId, function (err, data) {
        data.favoriteFoods.push(foodToAdd);
        data.save();
    });
};

findEditThenSave(1); 

var findAndUpdate = function (personName, doc) {
    var ageToSet = 20;

    Person.findOneAndUpdate(
        { name: personName },
        { $set: { age: ageToSet } },
        { new: true },
        function (err, done) {
            if (err) {
                console.log("Error Ocurred");
            }
            console.log(done);
        }
    );
};

findAndUpdate("Jhon Snow");
 
var user_id = 1;
Person.findByIdAndRemove(user_id, function (err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log("Removed User : ", docs);
    }
});

Person.remove({ name: "Mary" }, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log("Result :", result);
    }
});
 
var queryChain = function () {
    const foodToSearch = "burritos";
    Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 1 }) // -1 for descending
        .limit(2)
        .select({ age: 0 })
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
};
queryChain();
