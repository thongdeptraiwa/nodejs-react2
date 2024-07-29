var express = require('express');
var router = express.Router();

var tai_khoan_models = require("../models/tai_khoan");

//token
const JWT = require('jsonwebtoken');
const config = require("../config");
//checkToken
const checkToken = require("./checkToken");

/**
 * @swagger
 * /tai_khoan/add:
 *   post:
 *     tags:
 *     - Tài khoản
 *     summary: Đăng kí
 *     parameters:
 *       - name: username
 *         in: body 
 *         description: Email
 *         schema:
 *          type: string
 *       - name: password
 *         in: body 
 *         description: mật khẩu
 *         schema:
 *          type: string
 *       - name: ho_ten
 *         in: body 
 *         description: họ tên
 *         schema:
 *          type: string
 *       - name: sdt
 *         in: body 
 *         description: số điện thoại
 *         schema:
 *          type: string
 *       - name: dia_chi
 *         in: body 
 *         description: địa chỉ
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Đăng kí thành công
 *       400:
 *         description: lỗi API
 *       401:
 *         description: Tài khoản đã tồn tại
 */
//đăng kí
//http://localhost:3000/tai_khoan/add
router.post('/add', async function (req, res, next) {
    try {
        const { username, password, ho_ten, sdt, dia_chi } = req.body;
        const trang_thai = 1; // 1: hoạt động
        const _id_role = "6698e0771cdaa852e43d7aad"; // role user
        //check trung
        const check = await tai_khoan_models.findOne({ "username": username });
        if (check) {
            res.status(401).json({ "status": false, "message": "Tài khoản đã tồn tại" });
        } else {
            const newItem = { username, password, ho_ten, sdt, dia_chi, trang_thai, _id_role };
            await tai_khoan_models.create(newItem);
            res.status(200).json({ "status": true, "message": "Đăng kí thành công" });
        }
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

//get list tai_khoan
//http://localhost:3000/tai_khoan/list
// ***luồng chạy*** 
// checkToken sẽ chạy trc nếu true sẽ qua đây
router.get('/list', checkToken, async function (req, res, next) {
    try {
        var list = await tai_khoan_models.find({},).populate("_id_role");
        res.status(200).json(list);
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

//delete tai_khoan
//http://localhost:3000/tai_khoan/delete
router.delete('/delete', async function (req, res, next) {
    try {
        const { _id_tai_khoan } = req.body;
        await tai_khoan_models.findByIdAndDelete(_id_tai_khoan);
        res.status(200).json({ "status": true, "message": "Delete Thành công" });
    } catch (e) {
        res.status(400).json({ "status": false, "message": "Delete Thất bại" });
    }
})

//sua
//http://localhost:3000/tai_khoan/edit
router.post('/edit', async function (req, res, next) {
    try {
        const { username, password, ho_ten, sdt, dia_chi, avt, trang_thai, _id_role } = req.body;

        const itemEdit = await tai_khoan_models.findOne({ "username": username });

        if (itemEdit) {
            // itemEdit.username = username ? username : itemEdit.username;
            itemEdit.password = password ? password : itemEdit.password;
            itemEdit.ho_ten = ho_ten ? ho_ten : itemEdit.ho_ten;
            itemEdit.sdt = sdt ? sdt : itemEdit.sdt;
            itemEdit.dia_chi = dia_chi ? dia_chi : itemEdit.dia_chi;
            itemEdit.avt = avt ? avt : itemEdit.avt;
            itemEdit.trang_thai = trang_thai ? trang_thai : itemEdit.trang_thai;
            itemEdit._id_role = _id_role ? _id_role : itemEdit._id_role;
            await itemEdit.save();
            res.status(200).json({ "status": true, "message": "Thành công", "user": itemEdit });
        } else {
            res.status(401).json({ "status": false, "message": "tài khoản ko tồn tại" });
        }

    } catch (e) {
        res.status(400).json({ "status": false, "message": "Thất bại" });
    }
});


/**
 * @swagger
 * /tai_khoan/Login:
 *   post:
 *     tags:
 *     - Tài khoản
 *     summary: Đăng nhập
 *     parameters:
 *       - name: username
 *         in: body 
 *         description: Email
 *         schema:
 *          type: string
 *       - name: password
 *         in: body 
 *         description: mật khẩu
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Trả về object user, token và refreshToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: lỗi API
 *       401:
 *         description: sai mật khẩu
 *       402:
 *         description: sai tài khoản
 */
//đăng nhập
//http://localhost:3000/tai_khoan/Login
router.post('/Login', async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const check_username = await tai_khoan_models.findOne({ "username": username }, " -__v ");
        if (check_username) {
            if (password == check_username.password) {

                //token
                const token = JWT.sign({ user: username, data: "data ne" }, config.SECRETKEY, { expiresIn: '30s' });
                const refreshToken = JWT.sign({ user: username }, config.SECRETKEY, { expiresIn: '1h' })

                res.status(200).json({ "status": true, "user": check_username, token: token, refreshToken: refreshToken });

            } else {
                res.status(401).json({ "status": false, "message": "sai mật khẩu" });
            }
        } else {
            res.status(402).json({ "status": false, "message": "sai tài khoản " });
        }
    } catch (e) {
        res.status(400).json({ "status": false, "message": "lỗi" });
    }
});

//refreshToken
//http://localhost:3000/tai_khoan/refreshToken
router.post("/refreshToken", async function (req, res, next) {
    const { refreshToken } = req.body;

    JWT.verify(refreshToken, config.SECRETKEY, async function (err) {
        if (err) {
            res.status(401).json({ err: err });
        } else {
            var newToken = JWT.sign({ "data": "Thong dep trai wa" }, config.SECRETKEY, { expiresIn: '30s' });
            res.status(200).json({ token: newToken });
        }
    });

});


module.exports = router;