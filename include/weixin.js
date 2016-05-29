/**
 * Created by xue on 2016/5/29.
 */
var menu = require("./menu");
var web  = require("request");
var FS    = require("fs");
var winston  = require("winston");
var weather  = FS.readFileSync("./data/weather.db","utf-8");


var logger = new (winston.Logger)({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'life2best.log' })
    ]
});
var _list = [
    "1,天气预报",
    "2,电话号码",
    "3,笑话",
    "4,点歌",
    "5,查快递",
    "6,查区号",
].join("\n");

var current = {};
module.exports = function (req,res,next) {
    var message = req.weixin;

    logger.log("info",message);

    if(message.MsgType == "text"){
        if(/\?|help/gi.test(message.Content)){
            res.reply({
                content: _list,
                type: 'text'
            });
        }



        if(message.Content == "0"){
            res.reply("返回上一级" + current[message.FromUserName] || 0);
        }
        logger.log("info","选择的是" +current[message.FromUserName]);
        if(current[message.FromUserName]){
            if(current[message.FromUserName] == 1){
                var index = weather.indexOf(message.Content);
                logger.log("info","code的顺序是" +index);
               if(index >-1){
                   //天气预报   "http://www.weather.com.cn/data/sk/101110101.html"
                   var code = weather.substring(index-10,index-1);
                   web("http://www.weather.com.cn/data/sk/" + code + ".html",function (error, response, body) {
                       logger.log("info",body);
                       res.reply("天气")
                   })
               }else{
                   res.reply("请输入正确的城市")
               }
            }
        }

        if(message.Content == "1"){
            current[message.FromUserName] =1;
            res.reply("请输入地区,例如： “北京”");
        }

        if(message.Content == "2"){
            current[message.FromUserName]  = 2 ;

            res.reply("请输入查询的公司名称")

        }

        if(message.Content == "3"){
            current[message.FromUserName]  = 3 ;
            res.reply('“屎克郎，你不是移‍民了吗？怎么又回来了？”\n“再不回来，就饿死了！”\n“怎么会这样子!”\n“那是一个鸟不拉屎的地方!”')
        }
        if(message.Content == "4"){
            current[message.FromUserName]  = 4;
            res.reply("请输入歌曲名")
        }
        if(message.Content == "5"){
            current[message.FromUserName]  = 5 ;
            res.reply("请输入快递单号")
        }
        if(message.Content == "6"){
            current[message.FromUserName]  = 6 ;
            res.reply("请输入地区名称")
        }


        setTimeout(function () {
            res.reply("输入错误")
        },0);


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