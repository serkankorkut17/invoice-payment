import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: SchemaType.types.ObjectId,
        ref: 'User',
        required: true,
    },
    bill_type: {
        type: String,
        required: true,
    },
    bill_amount: {
        type: Number,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    payment_status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Invoice || mongoose.model('Invoice', userSchema);