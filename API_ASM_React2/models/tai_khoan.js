const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const tai_khoan = new Schema({
    _id_tai_khoan: { type: ObjectId }, // khóa chính
    username: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    password: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    ho_ten: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    sdt: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    dia_chi: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
    },
    avt: {
        type: String, // kiểu dữ liệu
        required: false, // ko bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
        // giá trị mặc định
        default: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
    },
    trang_thai: {
        type: Number, // kiểu dữ liệu
    },
    _id_role: {
        type: ObjectId, ref: 'role' //khóa ngoại
    }
});
module.exports = mongoose.models.tai_khoan || mongoose.model('tai_khoan', tai_khoan);
