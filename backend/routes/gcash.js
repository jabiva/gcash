const router = require('express').Router()

let gCashTransaction = require('../models/gcash.model')


router.route('/').get((req,res)=>{

    gCashTransaction.find()
    .then(gCashTransaction => res.json(gCashTransaction))
    .catch(err => res.status(400).json('Error:' + err))
})
//create add transac
router.route('/add').post(async (req, res) => {
  const dateCash = req.body.dateCash;
  const typeTransaction = req.body.typeTransaction;
  const amountCash = parseFloat(req.body.amountCash);

  try {
    const latestTransaction = await gCashTransaction.findOne().sort({ _id: -1 });

    let previousTotal = 0;
    if (latestTransaction) {
      previousTotal = latestTransaction.total;
    }
    const total = previousTotal + amountCash;

    const newgCashTransaction = new gCashTransaction({
      dateCash,
      typeTransaction,
      amountCash,
      total,
    });

    await newgCashTransaction.save();

    res.json('New Cash-in Added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

//     const newgCashTransaction = new gCashTransaction({dateCash,amountCash,dateCollect,amountCollect})

//     newgCashTransaction.save()
//     .then(gCashTransaction => res.json('New Record Added!'))
//     .catch(err => res.status(400).json('Error:' + err))
// })


//create add collection
router.route('/collection').post(async(req,res)=>{
    const dateCollect = req.body.dateCollect
    const typeTransaction = req.body.typeTransaction
    const amountCollect = req.body.amountCollect
    try {
        const latestTransaction = await gCashTransaction.findOne().sort({ _id: -1 })
    
        let previousTotal = 0
        if (latestTransaction) {
          previousTotal = latestTransaction.total
        }
        const total = previousTotal - amountCollect

        if(total <0){
            return res.status(400).json("Invalid input amount, insufficient balance!")
        }
        const newgCashTransaction = new gCashTransaction({
          dateCollect,
          typeTransaction,
          amountCollect,
          total,
        })
        await newgCashTransaction.save()
    
        res.json('New Collection Record Added!')
      } catch (err) {
        res.status(400).json('Error: ' + err)
      }
})
//create add expenses
router.route('/expenses').post(async(req,res)=>{
    const expensesDescription = req.body.expensesDescription
    const typeTransaction = req.body.typeTransaction
    const expensesDate = req.body.expensesDate
    
    const expensesAmount = req.body.expensesAmount
    try {
        const latestTransaction = await gCashTransaction.findOne().sort({ _id: -1 })
    
        let previousTotal = 0
        if (latestTransaction) {
          previousTotal = latestTransaction.total
        }
        const total = previousTotal - expensesAmount

        if(total <0){
            return res.status(400).json("Invalid input amount, insufficient balance!")
        }
        const newgCashTransaction = new gCashTransaction({
          expensesDate,
            expensesDescription,
            typeTransaction,
            expensesAmount,
          total,
        })
        await newgCashTransaction.save()
    
        res.json('New Expenses Record Added!')
      } catch (err) {
        res.status(400).json('Error: ' + err)
      }
})
//read
router.route('/:id').get((req,res)=>{
    gCashTransaction.findById(req.params.id)
    .then(gCashTransaction =>res.json(gCashTransaction))
    .catch(err => res.status(400).json('Error:'+ err))
})

//update
router.route('/update/:id').post((req,res)=>{

gCashTransaction.findById((req.params.id))
.then(gCashTransaction => {
    gCashTransaction.dateCash = req.body.dateCash
    gCashTransaction.amountCash = req.body.amountCash
    gCashTransaction.dateCollect = req.body.dateCollect
    gCashTransaction.amountCollect = req.body.amountCollect

    gCashTransaction.save()
    .then(() => res.json('Record has been updated!'))
    .catch(err => res.status(400).json('Error:' + err))
})
.catch(err => res.status(400).json('Error:' + err))
})

//delete
router.route('/:id').delete(async(req,res)=>{
    const transactionId = req.params.id

    try {
      // find the gCashTransaction record to be deleted
      const deletedTransaction = await gCashTransaction.findById(transactionId)
  
      if (!deletedTransaction) {
        return res.status(404).json('Record not found.')
      }
      // retrieve the previous total value from the latest gCashTransaction
      const latestTransaction = await gCashTransaction.findOne().sort({ _id: -1 })
  
      let previousTotal = 0
      if (latestTransaction) {
        previousTotal = latestTransaction.total
      }
      // calculate the new total by minus the deleted amount value from the previous total
      const newTotal = previousTotal - (deletedTransaction.amountCash || 0) - (deletedTransaction.amountCollect || 0) - (deletedTransaction.expensesAmount || 0);

  
      // delete the gCashTransaction record by ID
      await gCashTransaction.findByIdAndDelete(transactionId)
  
      // update the last total value in the database
      if (latestTransaction) {
        latestTransaction.total = newTotal
        await latestTransaction.save()
      }
      res.json('Record has been deleted and total amount has been updated.')
    } catch (err) {
      res.status(400).json('Error: ' + err)
    }

})
    // gCashTransaction.findByIdAndDelete(req.params.id)
    // .then(gCashTransaction =>res.json("Record has been deleted!"))
    // .catch(err => res.status(400).json('Error:'+ err))
module.exports = router