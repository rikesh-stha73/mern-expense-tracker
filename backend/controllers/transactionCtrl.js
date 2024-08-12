//!User Registration
const Transaction = require("../model/Transaction");
const asyncHandler = require("express-async-handler");   

const transactionController = {

    //!add
    create: asyncHandler(async (req, res) =>{
        const {type, category, amount, date, description } = req.body;
        if(!type  || !amount || !date){
            throw new Error("Type , Amount and Date are required to create a transaction");
        }
        //!Create
        const transaction = await Transaction.create({
            user : req.user,
            type,
            category,
            amount,
            date,
            description
        });
        res.status(201).json({transaction});
    }),
   
    //!Lists 
    getFilteredTreansactions: asyncHandler(async (req, res) =>{
      const {startDate, endDate, type, category} = req.query;
      let filters = {
        user: req.user,
      };
      if(startDate){
        filters.date = {...filters.date, $gte:new Date(startDate)};
      }
      if(endDate){
        filters.date = {...filters.date, $gte:new Date(endDate)};
      }
      if(type){
        filters.type = type;
      }
      if(category){
        if(category === "All"){
          
        }else if(category === "Uncategorized"){
          filters.category = 'Uncategorized';
        }else{
          filters.category = category;
        }
      }
      const transactions = await Transaction.find(filters).sort({date: -1});

      res.status(200).json({transactions}); 
    }),


    //! Update
        update: asyncHandler(async (req, res) =>{
           //!Find the transaction
           const transaction = await Transaction.findById(req.params.id);
           if(transaction && transaction.user.toString()===req.user.toString()){
            (transaction.type = req.body.type || transaction.type);
            (transaction.category = req.body.category || transaction.category);
            (transaction.amount = req.body.amount || transaction.amount);
            (transaction.date = req.body.date || transaction.date);
            (transaction.description = req.body.description || transaction.description);
            const updatedTransaction = await transaction.save();
            res.status(200).json({updatedTransaction});
        }
        }),

    //! Delete
    delete: asyncHandler(async (req, res) =>{
        //!Find the transaction
        const transaction = await Transaction.findById(req.params.id);
        if(transaction && transaction.user.toString()===req.user.toString()){
            await Transaction.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Transaction deleted successfully"});
        }
    }),

};

module.exports = transactionController;