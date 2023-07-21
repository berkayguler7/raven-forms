import { Schema, model } from "mongoose";
const slugify = require('slugify');

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        string: true,
    });
    next();
});

const Category = model('Category', CategorySchema);
module.exports = Category;