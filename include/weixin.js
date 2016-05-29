/**
 * Created by xue on 2016/5/29.
 */
var menu = require("./menu");

var _list = [
    "1,天气预报",
    "2,电话号码",
    "3,笑话",
    "4,点歌",
    "5,查快递",
    "6,查区号",
].join("\n");

module.exports = function (req,res,next) {
    var message = req.weixin;
    console.log(message);

    if(message.MsgType == "text"){
        if(/^[\?|help]/gi.test(message.Content)){
            res.reply({
                content: _list,
                type: 'text'
            });
        }

        if(message.Content == "0"){
            reply("返回上一级");
        }

        if(message.Content == "1"){
            res.reply("请输入查询的公司名称")
        }

        if(message.Content == "2"){
            res.reply("请输入地区")
        }

        if(message.Content == "3"){
            res.reply('“屎克郎，你不是移‍民了吗？怎么又回来了？”\n“再不回来，就饿死了！”\n“怎么会这样子!”\n“那是一个鸟不拉屎的地方!”')
        }
        if(message.Content == "4"){
            res.reply("请输入歌曲名")
        }
        if(message.Content == "5"){
            res.reply("请输入快递单号")
        }
        if(message.Content == "6"){
            res.reply("请输入地区名称")
        }
    }




    if(message.MsgType == "event"){
        //订阅
        if(message.Event == "subscribe"){
            res.reply({
                content: _list,
                type: 'text'
            });
        }

        //退订
        if(message.Event == "unsubscribe"){
            res.reply('客观不要走 ( ▼-▼ )');
        }
    }

};