var express = require('express');
var router = express.Router();

var role_models = require("../models/role")

/**
 * @swagger
 * /role/add:
 *   post:
 *     tags:
 *     - Role
 *     summary: Thêm role mới
 *     parameters:
 *       - name: ten_role
 *         in: body 
 *         description: tên role mới
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Thêm role mới thành công 
 *       400:
 *         description: lỗi API
 *       401:
 *         description: chưa nhập ten_loai 
 */
//add role 
//http://localhost:3000/role/add
router.post('/add', async function (req, res, next) {
    try {
        const { ten_role } = req.body;
        const newItem = { ten_role };
        if (newItem) {
            await role_models.create(newItem);
            res.status(200).json({ "status": true, "message": "Thêm role mới thành công " });
        } else {
            res.status(401).json({ "status": false, "message": "chưa nhập ten_role " });
        }
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

/**
 * @swagger
 * /role/list:
 *   get:
 *     tags:
 *     - Role
 *     summary: Lấy danh sách role
 *     responses:
 *       200:
 *         description: Trả về danh sách role (data)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: lỗi API
 */
//get list role
//http://localhost:3000/role/list
router.get('/list', async function (req, res, next) {
    try {
        var list = await role_models.find({},);
        res.status(200).json(list);
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

//delete role
//http://localhost:3000/role/delete
router.delete('/delete', async function (req, res, next) {
    try {
        const { _id_role } = req.body;
        await role_models.findByIdAndDelete(_id_role);
        res.status(200).json({ "status": true, "message": "Delete Thành công" });
    } catch (e) {
        res.status(400).json({ "status": false, "message": "Delete Thất bại" });
    }
})


module.exports = router;