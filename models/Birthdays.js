const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        birthday: {
            type: Date,
            required: true,
          }
    },
    {
        timestamps: true
    }
);

const Birthday = mongoose.model('Birthday', birthdaySchema);
module.exports = Birthday;