var express = require('express');
var wechat = require('wechat');
var router = express.Router();
var app = express();
var config = require("../config");

var oauth = new wechat.OAuth(config.weixin.appid, config.weixin.appsecret);
app.use(express.query());

app.use('/wechat', wechat({
  token: config.weixin.token,
  appid: config.weixin.appid,
  encodingAESKey: config.weixin.encodingAESKey
}, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;

}));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'left2best' });
});



module.exports = router;
