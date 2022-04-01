const express = require('express');
const router = express.Router();
const Product1 = require('../modules/module 1/product');
const Product2 = require('../modules/module 2/product');
const Product3 = require('../modules/module 3/product');

router.post('/create_new', async (req, res, next) => {
    try{
        let server = req.body.server;
        let image = req.body.image;
        let price = req.body.price;
        let name = req.body.name;
        let Product;
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if(server == 2){
            Product = Product2;
        }else if(server == 3){
            Product = Product3;
        }else{
            Product = Product1;
        }

        // kiem tra body yeu cau
        if(image && price && name ){
            let insert = await Product.insertProduct(name, image, price);
            return res.json({
                code: 200,
                message: 'them thanh cong'
            })
            
            
        }else{
            return res.json({
                code: 400,
                message: 'thieu body: image, price, name'
            })
        }
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
})

router.get('/one/:id', async (req, res, next) => {
    try{
        let server = req.body.server;
        let Product;
        let idProduct = req.params.id
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if(server == 2){
            Product = Product2;
        }else if(server == 3){
            Product = Product3;
        }else{
            Product = Product1;
        }

        let data = await Product.selectProduct(idProduct);

        return res.json({
            code: 200,
            data: data
        })

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
})

router.get('/all', async (req, res, next) => {
    try{
        let server = req.body.server;
        let Product;
        // let data = await Account1.selectAccount();

        // ket noi server theo nguoi dung yeu cau
        if(server == 2){
            Product = Product2;
        }else if(server == 3){
            Product = Product3;
        }else{
            Product = Product1;
        }

        let data = await Product.selectAll();

        return res.json({
            code: 200,
            data: data
        })

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
})

module.exports = router;