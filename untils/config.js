
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var Mongoose = {
	url : 'mongodb://localhost:27017/miaomiao',
	connect(){
		mongoose.connect(this.url , { useNewUrlParser: true }, (err)=>{
			if(err){
				console.log('数据库连接失败');
				return;
			}
			console.log('数据库连接成功');
		});
	}
};





module.exports = {
	Mongoose,
};