var mongoose = require('mongoose');
var { Head } = require('../untils/config.js');
var url = require('url');
mongoose.set('useCreateIndex',true);
var UserSchema = new mongoose.Schema({
	username : { type : String , required : true , index : { unique : true } },
	password : { type : String , required : true },
	date : { type : Date , default : Date.now() },
	nickname:{type:String , required:false,default:'千锋彭于晏'}
});

var UserModel = mongoose.model('newuserdb' , UserSchema);
UserModel.createIndexes();

var save = (data)=>{
	var user = new UserModel(data);
	return user.save()
		   .then(()=>{
		   		return true;
		   })
		   .catch(()=>{
			   
		   		return false;
		   });
};

let getUserMsg =body=>{
    let {username,password} = body;
    return UserModel.find({username:username,password:password})
    .then(data=>{
        console.log(data.length)
        return {err:0,msg:data};
    }).catch(err=>{
        return {err:2,msg:'false'};
    })
}

var findLogin = (data)=>{
	return UserModel.findOne(data)
	.then(data=>{
        console.log(data.length)
        return {err:0,msg:data};
    }).catch(err=>{
        return {err:2,msg:'false'};
    })
}

var updatePassword = (email , password)=>{
	return UserModel.update({email} , { $set : { password } })
		   .then(()=>{
		   		return true;
		   })
		   .catch(()=>{
		   		return false;
		   });
}

let updateInfo =(body)=>{
    let {nickname,username,password} = body;

    return UserModel.updateOne({username:username},{$set:{nickname:nickname,password:password}})
    .then(()=>{
        return {err:0,msg:true};
    }).catch(err=>{
        return {err:-4,msg:false};
    })
}

module.exports = {
	save,
	findLogin,
	updatePassword,
	getUserMsg,
	updateInfo
};