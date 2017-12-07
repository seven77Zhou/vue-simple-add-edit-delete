 const express = require('express');
const mysql = require('mysql');

const app = express();
app.listen(7788);


app.use(express.static('static'));

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1349929744',
	database: 'hero_data'
});

//app.get('/', (req, res) => {
//	//由于上面使用了express.static('static')，这页就不会显示
//	res.write('welcome Index');
//	res.end();
//});
//添加英雄
app.get('/addhero', (req, res) => {
	let name = req.query.name;
	let skill = req.query.skill;
	let id = req.query.id
	//判断
	if (name && skill) { //简化
		let sql = `INSERT INTO hero_data.msg_table VALUES(${id},'${name}','${skill}')`;
		db.query(sql, (err, data) => {
			
			if (err) {
				res.send({
					err: -1,
					msg: "数据库方面有问题"
				})
				res.end();
			} else {
				console.log(11)
				res.send({
					err: 0,
					msg: '添加留言成功',
					data: data
				});
				res.end();
			}
		})
	}
});
//获取英雄

app.get('/getHero', (req, res) => {	
	const PAGE_SIZE = 5;
	let n = PAGE_SIZE*(req.query.page-1);
	let sql = `SELECT * FROM msg_table ORDER BY ID DESC LIMIT ${n},${PAGE_SIZE}`;//直接写PAGE_SIZE报错
	db.query(sql,(err,data) => {
		if (err) {
			res.send({
				err: -1,
				msg: "数据库方面有问题"
			});
			res.end();
		} else {
			res.send(data);
			res.end();
		}
	})
})
//获取页数
app.get('/getPageNum',(req,res) => {
	let sql = `SELECT * FROM msg_table`;
	db.query(sql,(err,data) => {
		if(err){
			res.send({
				err: -1,
				msg: "数据库方面有问题"
			});
			res.end();
		}else{
			res.send(data);
			res.end();
		}
	})
})
//删除数据
app.get('/removeHero',(req,res) => {
	let id = req.query.id;
	let sql =`DELETE FROM msg_table WHERE ID=${id}`;
	db.query(sql,(err,data) => {
		if(err){
			res.send({
				err: -1,
				msg: "数据库方面有问题"
			});
			res.end();
		}else{
			res.send({
				err: 0,
				msg: "数据删除成功"
			});
			res.end();
		}
	})
})
//修改数据
app.get('/editHero',(req,res) => {
	let id = req.query.id;
	let name = req.query.name;
	let skill = req.query.skill;
	
	let sql = `UPDATE msg_table SET name='${name}',skill='${skill}' WHERE ID=${id};`;
	db.query(sql,(err,data) => {
		if(err){
			res.send({
				err: -1,
				msg: "数据库方面有问题"
			});
			res.end();
		}else{
			res.send({
				err: 0,
				msg: "数据修改成功"
			});
			res.end();
		}
	})
})
