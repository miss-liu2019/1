
var { Email , Head } = require('../untils/config.js');
var UserModel = require('../models/users.js');
var fs = require('fs');
var url = require('url');
var { setCrypto , createVerify } = require('../untils/base.js');

var login = async (req,res,next)=>{
	var { username , password} = req.body;
	

	var result = await UserModel.findLogin({
		username,
		password
	});
	res.send(result)

};

var register = async (req,res,next)=>{
	console.log(req.body)
	var { username , password} = req.body;

	
	var result = await UserModel.save({
		username,
		password,
	});

	if(result){
		res.send({
			msg : '注册成功',
			status : 0
		});
	}
	else{
		res.send({
			msg : '注册失败',
			status : -2
		});
	}


};


var logout = async (req,res,next)=>{
	req.session.username = '';
	res.send({
		msg : '退出成功',
		status : 0
	});
};

var getUser = async (req,res,next)=>{
	
	if(req.session.username){
		res.send({
			msg : '获取用户信息成功',
			status : 0,
			data : {
				username : req.session.username,
				isAdmin : req.session.isAdmin,
				userHead : req.session.userHead
			}
		});
	}
	else{
		res.send({
			msg : '获取用户信息失败',
			status : -1
		});
	}

};

var findPassword = async (req,res,next)=>{
	var { email , password , verify } = req.body;
	
	if( email === req.session.email && verify === req.session.verify ){
		var result = await UserModel.updatePassword(email , setCrypto(password));
		if(result){
			res.send({
				msg : '修改密码成功',
				status : 0
			});
		}
		else{
			res.send({
				msg : '修改密码失败',
				status : -1
			});
		}
	}
	else{
		res.send({
			msg : '验证码失败',
			status : -1
		});
	}

};
let getUserMsg =async (req,res,next)=>{
	console.log(req.body)
	let result = await UserModel.getUserMsg(req.body)
	console.log(result)
	res.send(result)
}

let updateUserInfo = async (req,res,next) => {
	console.log(req.body)
	let result = await UserModel.updateInfo(req.body)
	res.send(result)
}

module.exports = {
	login,
	register,
	logout,
	getUser,
	getUserMsg,
	updateUserInfo
};