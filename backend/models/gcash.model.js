const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gCashInSchema = new Schema({

    dateCash:{
        type: String,
        trim: true
    },
    amountCash:{
        type: Number,
        trim: true
    },
    dateCollect:{
        type: String,
        trim: true
    },
    amountCollect:{
        type: Number,
        trim: true
    },
    expensesDate:{
        type: String
    },
    typeTransaction:{
        type: String,
        required: true
    },
    expensesDescription:{
        type: String
    },
    expensesAmount:{
        type: Number,
        trim: true
    },
    total:{
        type: Number,
        trim: true
    }
}, {
    timestamps: true
})

const gCashTransaction = mongoose.model('tables', gCashInSchema)
module.exports = gCashTransaction