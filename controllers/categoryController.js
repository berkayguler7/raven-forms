import Category from "../models/Category.js";

const createCategory = async (req, res) => {
    try {
        const category = await Category.create({
            ...req.body,
        });

        res.status(200).json({
            message: "Category created successfully",
            type: "success",
            category,
        });
    } catch (error) {
        res.status(400).json({
            type: "warn",
            message: error,
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        res.status(200).json({
            message: "Categories fetched successfully",
            type: "success",
            categories,
        });
    } catch (error) {
        res.status(400).json({
            type: "warn",
            message: error,
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            slug: req.params.slug,
        });

        res.status(200).json({
            message: "Category fetched successfully",
            type: "success",
            category,
        });
    } catch (error) {
        res.status(400).json({
            type: "warn",
            message: error,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            {
                ...req.body,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            message: "Category updated successfully",
            type: "success",
            category,
        });
    } catch (error) {
        res.status(400).json({
            type: "warn",
            message: error,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete({
            slug: req.params.slug,
        });

        res.status(200).json({
            message: "Category deleted successfully",
            type: "success",
        });
    } catch (error) {
        res.status(400).json({
            type: "warn",
            message: error,
        });
    }
};

export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};