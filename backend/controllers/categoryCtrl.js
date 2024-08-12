//!User Registration
const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");   
const Transaction = require("../model/Transaction");

const categoryController = {

    //!add
    create: asyncHandler(async (req, res) =>{

        const {name, type} = req.body;
        if(!name || !type){
            throw new Error("Name and Type are mandatory to create a category");
        }

        //Convert the name to lowercase
        const normalizedName = name.toLowerCase();

        //!Check if type is valid
        const validTypes = ['income', 'expense'];
        if(!validTypes.includes(type.toLowerCase())){
            throw new Error("Invalid category type" + type);
        }
        
        //! Check if category already exists on the user
        const categoryExists = await Category.findOne({
            user: req.user,
             name: normalizedName,
            });

        if(categoryExists){
            throw new Error(
                `Category ${categoryExists.name} already exists in the database`
            );
        }
        //!Create category
        const category = await Category.create({
            user: req.user,
            name: normalizedName,
            type,
        });
        res.status(201).json({category});
    
    }),
   
    //!Lists 
    lists: asyncHandler(async (req, res) =>{
        const categories = await Category.find({user: req.user});
        res.status(200).json({categories});
    }),

    //!Get Category by ID
    getCategoryById : asyncHandler(async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    //! Update
    update: asyncHandler(async (req, res) =>{
            
           const categoryId = req.params.id;
           const { type, name} = req.body;
           const normalizedName = name.toLowerCase();
           const category = await Category.findById(categoryId);
           if(!category && category.user.toString()!==req.user.toString()){
            res.status(404);
            throw new Error("Category not found");
           }
           const oldName = category.name;

           //!Update category property
           category.type = type;
           category.name = name;
           const updatedCategory = await category.save();

           //!Update affected transactions
           if(oldName!==updatedCategory.name){
            await Transaction.updateMany(
            {
                user: req.user, 
                category: oldName,
            },
            { $set: {category: updatedCategory.name}}
            );
        }
            res.status(200).json({updatedCategory});
        }),

    //! Delete
    delete: asyncHandler(async (req, res) =>{
        const category = await Category.findById(req.params.id);
        if(category && category.user.toString()===req.user.toString()){
            const defaultCategory = 'Uncategorized'
            await Transaction.updateMany(
                {
                    user: req.user, 
                    category: category._id,
                },
                { $set: {category: defaultCategory}}
            )
            await Category.findByIdAndDelete(req.params.id);    
            res.status(200).json({message: "Category deleted successfully"});
        }else{
            res.status(404);
            throw new Error("Category not found");
        }
    }),

};

module.exports = categoryController;