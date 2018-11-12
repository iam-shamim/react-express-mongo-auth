import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var YearSchema = new Schema({
    name: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});
const DepartmentModel = mongoose.model('department', YearSchema);

module.exports = DepartmentModel;