var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var config = require("../config");


router.all('/wechat', wechat({
  token: config.weixin.token,
  appid: config.weixin.appid,
  encodingAESKey: config.weixin.encodingAESKey
}, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;

  console.log(message);
}));

// router.get("/wechat",function (req,res,next){
//     if(wechat.checkSignature(req.query,config.weixin.token)){
//       res.send(req.query.echostr);
//     };
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'left2best' });
});



module.exports = router;
