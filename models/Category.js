import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import slugify from "slugify";

const CategorySchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
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

CategorySchema.plugin(mongooseUniqueValidator, { message: '{VALUE} is already in use.' });

CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Category = model('Category', CategorySchema);

export default Category;
