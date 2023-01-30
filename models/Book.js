const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
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
        }

    },
    {
        timestamps: true
    }
)

const book = mongoose.model('Book', BookSchema)
module.exports = book