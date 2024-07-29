var express = require('express');
var router = express.Router();

var loai_models = require("../models/loai")

/**
 * @swagger
 * /loai/add:
 *   post:
 *     tags:
 *     - Loại
 *     summary: Thêm loại sản phẩm
 *     parameters:
 *       - name: ten_loai
 *         in: body 
 *         description: tên loại sản phẩm mới
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: thêm thành công
 *       400:
 *         description: lỗi API
 *       401:
 *         description: chưa nhập ten_loai 
 */
//add role 
//http://localhost:3000/loai/add
router.post('/add', async function (req, res, next) {
    try {
        const { ten_loai } = req.body;
        const newItem = { ten_loai };
        if (newItem) {
            await loai_models.create(newItem);
            res.status(200).json({ "status": true, "message": "thêm thành công" });
        } else {
            res.status(401).json({ "status": false, "message": "chưa nhập ten_loai " });
        }
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

/**
 * @swagger
 * /loai/list:
 *   get:
 *     tags:
 *     - Loại
 *     summary: Lấy danh sách loại sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách loại (data)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: lỗi API
 */
//get list loai
//http://localhost:3000/loai/list
router.get('/list', async function (req, res, next) {
    try {
        var list = await loai_models.find({}, " -__v");
        res.status(200).json({ "status": true, "data": list });
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

//delete loai
//http://localhost:3000/loai/delete
router.delete('/delete', async function (req, res, next) {
    try {
        const { _id_loai } = req.body;
        await loai_models.findByIdAndDelete(_id_loai);
        res.status(200).json({ "status": true, "message": "Delete Thành công" });
    } catch (e) {
        res.status(400).json({ "status": false, "message": "Delete Thất bại" });
    }
})


module.exports = router;