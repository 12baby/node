const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve('static')));

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '524105035',
    database: 'loadData',
    insecureAuth: true
});
connection.connect(err => {
    if (err) {
        throw err;
    }
});
app.get('/getProduct', (req, res) =>{
    connection.query('select * from content limit 0,3', (err, result) =>{
        // console.log(result);
        res.render('getProduct', {
            data: result
        })
    });
    
});
app.post('/show', (req, res) =>{
    console.log(req.body);
    const limit = req.body.limit;
    const count = req.body.page;
    const start = (count - 1) * limit;
    console.log(limit +','+ count +','+ start);
    connection.query('select * from content limit ' + start +',' + limit, (err, result) =>{
        if (err) {
            res.send({code:1, msg: '加载失败'});
        } else {
            if (result.length > 0){
                res.send({code:0, result: result});
            } else {
                res.send({code:2, msg: '加载完毕'});
            }
        }
    });
});
app.listen(8880);