const config = require('../../config/config1');
const sql = require('mssql')

const db = {};

db.selectPassword = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query('SELECT password FROM account WHERE username = @username',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].password)
            })
    })
}

db.selectName = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query('SELECT name FROM account WHERE username = @username',
            (err, result)=>{
                if(err) return err;
                else resolve(result.recordset[0].name)
            })
    })
}

db.hasAccount = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);
        pool.request()
            .input('username', sql.NChar(25), username)
            .query('SELECT * FROM account WHERE username = @username',
            (err, result)=>{
                if(err) return reject(err)
                else resolve(result.rowsAffected>0)
            })
    })
}

db.insertAccount = (username, password, name)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .input('password', sql.NChar(128), password)
            .input('name', sql.NVarChar(128), name)
            .query('INSERT INTO account (username, password, name) VALUES (@username, @password, @name)',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result)
            })
    })
}

module.exports = db;