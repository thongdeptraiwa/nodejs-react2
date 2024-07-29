var express = require('express');
var router = express.Router();

var san_pham_models = require("../models/san_pham")

//add
//http://localhost:3000/san_pham/add
router.post('/add', async function (req, res, next) {
    try {
        const { ten_san_pham, gia, img, trang_thai, luot_mua, mieu_ta, _id_loai } = req.body;
        const newItem = { ten_san_pham, gia, img, trang_thai, luot_mua, mieu_ta, _id_loai };
        if (newItem) {
            await san_pham_models.create(newItem);
            res.status(200).json({ "status": true, "message": "Them thành công" });
        } else {
            res.status(200).json({ "status": false, "message": "Them thất bại" });
        }
    } catch (e) {
        res.status(400).json({ "status": false, "message": "Them thất bại" });
    }
});

/**
 * @swagger
 * /san_pham/list-loai:
 *   get:
 *     tags:
 *     - Sản Phẩm
 *     summary: Lấy danh sách sản phẩm theo loại sản phẩm
 *     parameters:
 *       - name: _id_loai
 *         in: query 
 *         description: ID loại sản phẩm ( nếu ko để trống sẽ trả về hết danh sách sản phẩm)
 *         schema:
 *          type: mongobdID
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm theo loại (data)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       201:
 *         description: Trả về tất cả sản phẩm (data)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: lỗi API
 */
//get list san_pham theo loại
//http://localhost:3000/san_pham/list-loai
router.get('/list-loai', async function (req, res, next) {
    try {
        const { _id_loai } = req.query;
        if (_id_loai) {
            //xuất loại
            const list_loai = await san_pham_models.find({ _id_loai: _id_loai }, " _id_san_pham img ten_san_pham gia ");
            res.status(200).json({ "status": true, "data": list_loai });
        } else {
            //nếu ko có _id_loai thì xuất tất cả
            const list = await san_pham_models.find({}, " _id_san_pham img ten_san_pham gia ");
            res.status(201).json({ "status": true, "data": list });
        }

    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

/**
 * @swagger
 * /san_pham/chi_tiet_san_pham:
 *   get:
 *     tags:
 *     - Sản Phẩm
 *     summary: Lấy thông tin chi tiết của sản phẩm
 *     parameters:
 *       - name: _id_san_pham
 *         in: query 
 *         description: ID sản phẩm
 *         schema:
 *          type: mongobdID
 *     responses:
 *       200:
 *         description: Trả về 1 product (data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: lỗi API
 * components:
 *   schemas:
 *     tai_khoans:
 *       type: object
 *       properties:
 *         _id:
 *           type: mongobdID
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         ho_ten:
 *           type: string
 *         sdt:
 *           type: string
 *         avt:
 *           type: string
 *         tang_thai:
 *           type: string
 *         _id_role:
 *           type: mongobdID
 *     roles:
 *       type: object
 *       properties:
 *         _id:
 *           type: mongobdID
 *         ten_role:
 *           type: string
 *     san_phams:
 *       type: object
 *       properties:
 *         _id:
 *           type: mongobdID
 *         ten_san_pham:
 *           type: string
 *         gia:
 *           type: int
 *         img:
 *           type: string
 *         trang_thai:
 *           type: int
 *         luot_mua:
 *           type: int
 *         mieu_ta:
 *           type: string
 *         _id_loai:
 *           type: mongobdID
 *     loais:
 *       type: object
 *       properties:
 *         _id:
 *           type: mongobdID
 *         ten_loai:
 *           type: string
 */
//chi tiet san pham
//http://localhost:3000/san_pham/chi_tiet_san_pham
router.get('/chi_tiet_san_pham', async function (req, res, next) {
    try {
        const { _id_san_pham } = req.query;

        const item = await san_pham_models.findById(_id_san_pham, " _id_san_pham img ten_san_pham gia mieu_ta ");
        res.status(200).json({ "status": true, "data": item });

    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

//delete tai_khoan
//http://localhost:3000/san_pham/delete
// router.delete('/delete', async function (req, res, next) {
//     try {
//         const { _id_tai_khoan } = req.body;
//         await tai_khoan_models.findByIdAndDelete(_id_tai_khoan);
//         res.status(200).json({ "status": true, "message": "Delete Thành công" });
//     } catch (e) {
//         res.status(400).json({ "status": false, "message": "Delete Thất bại" });
//     }
// })

//sua
//http://localhost:3000/san_pham/edit
// router.post('/edit', async function (req, res, next) {
//     try {
//         const { username, password, ho_ten, sdt, dia_chi, trang_thai, _id_role } = req.body;

//       const itemEdit = await cateModel.findOne({"username": username});

//       if (itemEdit) {
//         // itemEdit.username = username ? username : itemEdit.username;
//         itemEdit.password = password ? password : itemEdit.password;
//         itemEdit.ho_ten = ho_ten ? ho_ten : itemEdit.ho_ten;
//         itemEdit.sdt = sdt ? sdt : itemEdit.sdt;
//         itemEdit.dia_chi = dia_chi ? dia_chi : itemEdit.dia_chi;
//         itemEdit.trang_thai = trang_thai ? trang_thai : itemEdit.trang_thai;
//         itemEdit._id_role = _id_role ? _id_role : itemEdit._id_role;
//         await itemEdit.save();
//         res.status(200).json({ "status": true, "message": "Thành công" });
//       } else {
//         res.status(400).json({ "status": false, "message": "id ko tồn tại" });
//       }

//     } catch (e) {
//       res.status(400).json({ "status": false, "message": "Thất bại" });
//     }
//   });


module.exports = router;