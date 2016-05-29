/**
 * Created by xue on 2016/5/29.
 */
var menu = require("./menu");


module.exports = function (req,res,next) {
    var message = req.weixin;
    console.log(message);

    if(message.MsgType == "text"){
        if(/^[？|help]/gi.test(message.Content)){
            menu(req,res,next)
        }
    }


    if(message.MsgType == "event"){
        //订阅
        if(message.Event == "subscribe"){
            res.reply({
                content: 'text object',
                type: 'text'
            })
        }

        //退订
        if(message.Event == "unsubscribe"){
            res.reply('客观不要走 ( ▼-▼ )');
        }
    }

};