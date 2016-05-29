var express = require('express');
var wechat = require('wechat');
var router = express.Router();
var app = express();
var config = require("../config");


app.use(express.query());

app.use('/wechat', wechat({
  token: config.weixin.token,
  appid: config.weixin.appid,
  encodingAESKey: config.weixin.encodingAESKey
}, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  res.send("sdfs");
}));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'left2best' });
});
router.all('/weixin', function(req, res, next) {
  console.log(req)
  res.send(req.query.echostr);
});





module.exports = router;
