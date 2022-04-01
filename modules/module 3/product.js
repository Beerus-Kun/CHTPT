const config = require('../../config/config3');
const sql = require('mssql')

const db = {};

db.selectAll = ()=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .query('SELECT * FROM product',
            (err, result)=>{
                pool.close();
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.hasIdProduct = (id_product)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_product", sql.Int, id_product)
            .query('SELECT * FROM product WHERE id_product = @id_product',
            (err, result)=>{
                pool.close();
                if(err) return reject(err);
                else resolve(result.rowsAffected>0)
            })
    })
}

db.selectProduct = (id_product)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_product", sql.Int, id_product)
            .query('SELECT * FROM product WHERE id_product = @id_product',
            (err, result)=>{
                pool.close();
                if(err) return reject(err);
                else resolve(result.recordset[0])
            })
    })
}

db.insertProduct = (name, image, price)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("name", sql.NVarChar(128), name)
            .input("image", sql.NChar(128), image)
            .input("price", sql.Int, price)
            .query('INSERT INTO product (name, image, price) VALUES (@name, @image, @price)',
            (err, result)=>{
                pool.close();
                if(err) return reject(err);
                else resolve(result)
            })
    })
}

module.exports = db;