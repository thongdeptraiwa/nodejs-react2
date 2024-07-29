const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const role = new Schema({
    _id_role: { type: ObjectId }, // khóa chính
    ten_role: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
    },
});
module.exports = mongoose.models.role || mongoose.model('role', role);
