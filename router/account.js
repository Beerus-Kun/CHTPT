const express = require('express');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const Mailer = require('../../mail');
const router = express.Router();
const Account1 = require('../modules/module 1/account');
const Account2 = require('../modules/module 2/account');
const Account3 = require('../modules/module 3/account');
// var Auth = require('../../auth');
// const Validation = require('../../validation');
// const Defaults = require('../../default');
// const isImageURL = require('image-url-validator').default;
 
router.post('/signup', async (req, res, next) => {
    try{
        let server = req.body.server;
        let username = req.body.username;
        let password = req.body.password;
        let repassword = req.body.repassword;
        let name = req.body.name;
        let Account;
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if(server == 2){
            Account = Account2;
        }else if(server == 3){
            Account = Account3;
        }else{
            Account = Account1;
        }

        // kiem tra body yeu cau
        if(username && password && repassword && name ){
            // kiem tra mat khau nhap lai
            if(password != repassword){
                return res.json({
                    code: 400,
                    message: 'mat khau nhap lai khong khop'
                })
            }

            // kiem tra do dai mat khau
            if(password.trim() == ""){
                return res.json({
                    code: 400,
                    message: 'Vui long nhap mat khau co it nhat 1 ky tu'
                })
            }

            let existUsername = await Account.hasAccount(username);
            // kiem tra username trong database
            if(existUsername){
                return res.json({
                    code: 400,
                    message: 'username nay da co nguoi su dung'
                })
            }

            // ma hoa mat khau
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                else {
                    password = hash;
                    // luu tai khoan vao co so du lieu
                    let insertAccount = await Account.insertAccount(username, password, name);
                    return res.json({
                        code: 200,
                        message: 'them tai khoan thanh cong'
                    });
                }
            })
        }else{
            return res.json({
                code: 400,
                message: 'thieu body: username, password, repassword, name'
            })
        }
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
})

router.post('/login', async (req, res, next) => {
    try{
        let server = req.body.server;
        let username = req.body.username;
        let password = req.body.password;
        let Account;
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if(server == 2){
            Account = Account2;
        }else if(server == 3){
            Account = Account3;
        }else{
            Account = Account1;
        }

        if(username && password){

            let existUsername = await Account.hasAccount(username);
            // kiem tra username trong database
            if(!existUsername){
                return res.json({
                    code: 400,
                    message: 'tai khoan hoac mat khau khong dung'
                })
            }else{
                let encryptPassword = await Account.selectPassword(username);
                let match = await bcrypt.compare(password, encryptPassword.trim());

                if(match){
                    let name = await Account.selectName(username);

                    return res.json({
                        code: 200,
                        message: 'dang nhap thanh cong',
                        name: name
                    })
                }else{
                    return res.json({
                        code: 400,
                        message: 'tai khoan hoac mat khau khong dung'
                    })
                }
            }

        }else{
            return res.json({
                code: 400,
                message: 'thieu body: username, password, name'
            })
        }
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
})

module.exports = router;