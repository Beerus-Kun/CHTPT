const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Bill1 = require('../modules/module 1/bill');
const Bill2 = require('../modules/module 2/bill');
const Bill3 = require('../modules/module 3/bill');

const Product1 = require('../modules/module 1/product');
const Product2 = require('../modules/module 2/product');
const Product3 = require('../modules/module 3/product');

const Account1 = require('../modules/module 1/account');
const Account2 = require('../modules/module 2/account');
const Account3 = require('../modules/module 3/account');

router.post('/buy', async (req, res, next) => {
    try {
        let server = req.body.server;
        let username = req.body.username;
        let password = req.body.password;
        let id_product = req.body.id_product;
        let Bill;
        let Product;
        let Account;
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if (server == 2) {
            Bill = Bill2;
            Product = Product2;
            Account = Account2;
        } else if (server == 3) {
            Bill = Bill3;
            Product = Product3;
            Account = Account3;
        } else {
            Bill = Bill1;
            Product = Product1;
            Account = Account1;
        }

        // kiem tra body yeu cau
        if (username && password && id_product) {

            let existUsername = await Account.hasAccount(username);
            // kiem tra username trong database
            if (!existUsername) {
                return res.json({
                    code: 400,
                    message: 'tai khoan hoac mat khau khong dung'
                })
            } else {
                let encryptPassword = await Account.selectPassword(username);
                let match = await bcrypt.compare(password, encryptPassword.trim());

                if (match) {
                    let existProduct = await Product.hasIdProduct(id_product);
                    if(existProduct){
                        let insert = await Bill.insertBill(id_product, username);
                        return res.json({
                            code: 200,
                            message: 'them thanh cong'
                        })
                    }else{
                        return res.json({
                            code: 400,
                            message: 'khong co id product nay'
                        })
                    }
                    
                } else {
                    return res.json({
                        code: 400,
                        message: 'tai khoan hoac mat khau khong dung'
                    })
                }
            }

        } else {
            return res.json({
                code: 400,
                message: 'thieu body: username, password, id_product'
            })
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

router.get('/all', async (req, res, next) => {
    try {
        let server = req.body.server;
        let username = req.body.username;
        let password = req.body.password;
        let Bill;
        let Account;

        // ket noi server theo nguoi dung yeu cau
        if (server == 2) {
            Bill = Bill2;
            Account = Account2;
        } else if (server == 3) {
            Bill = Bill3;
            Account = Account3;
        } else {
            Bill = Bill1;
            Account = Account1;
        }

        // kiem tra body yeu cau
        if (username && password) {

            let existUsername = await Account.hasAccount(username);
            // kiem tra username trong database
            if (!existUsername) {
                return res.json({
                    code: 400,
                    message: 'tai khoan hoac mat khau khong dung'
                })
            } else {
                let encryptPassword = await Account.selectPassword(username);
                let match = await bcrypt.compare(password, encryptPassword.trim());

                if (match) {
                    let data = await Bill.selectBillByUsername(username);
                    return res.json({
                        code: 200,
                        message: 'lay du lieu thanh cong',
                        data: data
                    })
                } else {
                    return res.json({
                        code: 400,
                        message: 'tai khoan hoac mat khau khong dung'
                    })
                }
            }

        } else {
            return res.json({
                code: 400,
                message: 'thieu body: username, password'
            })
        }

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

router.get('/all', async (req, res, next) => {
    try {
        let server = req.body.server;
        let Product;
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if (server == 2) {
            Product = Product2;
        } else if (server == 3) {
            Product = Product3;
        } else {
            Product = Product1;
        }

        let data = await Product.selectAll();

        return res.json({
            code: 200,
            data: data
        })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

module.exports = router;