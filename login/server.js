const express = require("express");
const expressStatic = require("express-static");
const bodyParser = require("body-parser");

var server = express(); //创建服务器  

server.use(bodyParser.urlencoded({
	extended : false,  //表示可扩展
	//limit : 2*1024*1024  //表示限制传输数据大小
})); 

var users = {};
server.post('/log', function(req, res) {
	var user = req.body.user;
	var pass = req.body.pass;

	if (users[user]==null) {  //user是变量，不能用点
		res.send({"ok":false,"message":"用户不存在"}); //send和write一样，但send能直接发json数据
	}else if (users[user]!=pass) {
		res.send({"ok":false,"message":"用户名或密码错误"});
	}else {
		res.send({"ok":true,"message":"登陆成功"});
	}
	res.end();
});

server.post('/reg',function(req, res) {
	var user = req.body.user;
	var pass = req.body.pass;

	if (users[user]) {
		res.send({"ok":false,"message":"用户已存在"});
	}else {
		users[user] = pass;
		res.send({"ok":true,"message":"注册成功"});
	}
	res.end();
});

server.use(expressStatic("./www"));  //请求页面部分，里面包含了get、post

server.listen(8888);  //不能够用.listen()的方式直接加载创建服务器后