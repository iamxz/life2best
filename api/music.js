var express = require('express');
var request = require('request');
var router = express.Router();
var weixin = require('weixin-api');
weixin.token = 'life2bestbyiamxz';
/* GET home page. */
router.get('/', function(req, res) {
    if(weixin.checkSignature(req)) {
        res.send(req.query.echostr);
    } else {
        res.render('index', { title: 'left2best' });
    }
});

weixin.textMsg(function(msg) {
    var msg =msg;
    var resMsg = {};

    var musicApi = 'http://www.xiami.com/web/search-songs?key='+msg.content;
    request.get(musicApi,function(error, response, body){
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);

            var articles = new Array();
            for(var i=0;i<info.length;i++){
                articles[i] = {
                    title : info[i][title],
                    description : info[i][author],
                    picUrl  : info[i][cover],
                    url : info[i][src],
                };
            }


            if(info.length){

                weixin.sendMsg({
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "news",
                    articles : articles,
                    funcFlag : 0
                });


                //      weixin.sendMsg({
                // 		fromUserName :msg.toUserName,
                // 		toUserName : msg.fromUserName,
                // 		msgType : "music",
                // 		title : info[0].title,
                // 		description :info[0].author,
                // 		musicUrl : info[0].src,
                // 		HQMusicUrl : info[0].cover,
                // 		funcFlag : 0
                // });
            }else {
                weixin.sendMsg({
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "text",
                    content : "对不起,居然没找到~",
                    funcFlag : 0
                });
            }
        }
    });


});





// 监听图片消息
weixin.imageMsg(function(msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function(msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function(msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function(msg) {
    console.log("eventMsg received");
    console.log(JSON.stringify(msg));
});

// Start
router.post('/', function(req, res) {
    // loop
    weixin.loop(req, res);

});

module.exports = router;
