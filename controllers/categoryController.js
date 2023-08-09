import Category from '../models/Category.js';

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: 'Categories fetched successfully',
            type: 'success',
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            type: 'warn',
            message: "Categories couldn't be fetched",
        });
    }
}

export { getCategories };