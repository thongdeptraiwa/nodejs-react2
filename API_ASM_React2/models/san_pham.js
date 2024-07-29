const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const san_pham = new Schema({
    _id_san_pham: { type: ObjectId }, // khóa chính
    ten_san_pham: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    gia: {
        type: Number, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    img: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    trang_thai: {
        type: Number, // kiểu dữ liệu
    },
    luot_mua: {
        type: Number, // kiểu dữ liệu
    },
    mieu_ta: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    _id_loai: {
        type: ObjectId, ref: 'loai' //khóa ngoại
    }
});
module.exports = mongoose.models.san_pham || mongoose.model('san_pham', san_pham);
