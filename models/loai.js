const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const loai = new Schema({
    _id_loai: { type: ObjectId }, // khóa chính
    ten_loai: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
    },
});
module.exports = mongoose.models.loai || mongoose.model('loai', loai);
