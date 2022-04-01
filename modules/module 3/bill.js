const config = require('../../config/config3');
const sql = require('mssql')

const db = {};

db.insertBill = (id_product, username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_product", sql.Int, id_product)
            .input("username", sql.NChar(25), username)
            .query('INSERT INTO bill(id_product, username) VALUES (@id_product, @username)',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordsets)
            })
    })
}

db.selectBillByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query('SELECT * FROM bill WHERE username = @username',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}
module.exports = db;