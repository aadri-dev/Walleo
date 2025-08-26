import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
}, {
    timestamps: true // createdAt, updatedAt
});

const Account = mongoose.model('Account', accountSchema);

export default Account;