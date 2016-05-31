/**
 * Created by xue on 2016/5/29.
 */

var menu = require("./menu");
var web  = require("request");
var fs    = require("fs");
var winston  = require("winston");
var lowdb = require('lowdb');
var cheerio = require('cheerio');
var db = lowdb('./data/db.json');





var logger = new (winston.Logger)({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'life2best.log' })
    ]
});
var _menu = [
    "0,返回上级菜单",
    "1,天气预报",
    "2,电话号码",
    "3,笑话",
    "4,点歌",
    "5,查快递",
    "6,查区号",
].join("\n");

module.exports = function (req,res,next) {
    var message = req.weixin;
    var _thisUser = message.FromUserName;
    logger.log("info",message);

    if(message.MsgType == "text"){

        var content = message.Content;

        //电话归属地 https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=
        if(content == "0"){
            db.set(_thisUser,0).value();
            res.reply("返回上级菜单");
            return;
        }
        if(content == "1"){
            db.set(_thisUser,1).value();
            res.reply("请输入地区,例如： “北京”");
        }

        if(content == "2"){
            db.set(_thisUser,2).value();
            res.reply("请输入查询的公司名称")
        }

        if(content == "3"){
            db.set(_thisUser,3).value();
            res.reply('“屎克郎，你不是移‍民了吗？怎么又回来了？”\n“再不回来，就饿死了！”\n“怎么会这样子!”\n“那是一个鸟不拉屎的地方!”')
        }
        if(content == "4"){
            db.set(_thisUser,4).value();
            res.reply("请输入歌曲名")
        }
        if(content == "5"){
            db.set(_thisUser,5).value();
            res.reply("请输入快递单号")
        }
        if(content == "6"){
            db.set(_thisUser,6).value();
            res.reply("请输入地区名称")
        }


        if(db.get(_thisUser)){
            logger.log("info","菜单的 值");
            logger.log("info",db.get(_thisUser));
            if(db.get(_thisUser) == 1){
                logger.log("info","进入菜单1");
                var weather  = fs.readFileSync("./data/weather.db","utf-8");
                var index = weather.indexOf(content);
               if(index >-1){
                   //天气预报   "http://www.weather.com.cn/data/cityinfo/101020100.html"
                   var code = weather.substring(index-10,index-1);
                   logger.log("info",code);
                   if(code.length ==9){
                       var _url ="http://www.weather.com.cn/data/cityinfo/" + code + ".html";
                       logger.log("info",_url);
                       web(_url,function (error, response, body) {
                           if(error){
                               db.set(_thisUser,0).value();
                               res.reply("查询失败");
                               return;
                           }
                           logger.log("info",body);
                           if(/^\{/gi.test(body.trim())){
                               var weatherinfo = JSON.parse(body);
                               var data = weatherinfo["weatherinfo"];
                               res.reply(data.city + "天气 ：" + data.weather+"\n温度：" + data.temp1 + "到" +data.temp2 + "度");
                           }else{
                               db.set(_thisUser,0).value();
                               res.reply("天气查询失败！");
                           }
                       });
                   }else{
                       res.reply("请重新输入正确的城市");
                   }
                   return;
               }
            }

            //电话号码
            if(db.get(_thisUser) == 2){
                logger.log("info","进入菜单2");
                var phone = lowdb('./data/phone.json');
                    phone.defaults({ phone: []}).value();
                var _url ="http://www.baidu.com/s?wd=" +encodeURIComponent( content + "电话");
                logger.log("info",_url);
                web(_url,function (error, response, body) {
                    if(error){
                        db.set(_thisUser,0).value();
                        res.reply("查询失败");
                        return;
                    }

                    $ = cheerio.load(body,{
                        // ignoreWhitespace: true,
                        // xmlMode: true
                    });
                    var phoneText ='';
                    $("table.op_kefutable_table tr").each(function (i,item) {
                        console.log($(this).html());
                        var title =$(this).find("td.op_kefutable_td1").text();
                        var tel =$(this).find("td.op_kefutable_td2").text();
                        var _thisText = (title|| content) + ":" +tel + "\n";
                        phone.get("phone").push(content +" | "+ _thisText).value();
                        phoneText +=_thisText;
                    });
                    logger.log("info",phoneText);
                    res.reply(phoneText);
                });
                return;
            };

            //笑话
            if(db.get(_thisUser) == 3){
                res.reply("正在开发中");
                return;
            }


            //歌曲
            if(db.get(_thisUser) == 4){
                res.reply("正在开发中");
                return;
            }

            //快递单号
            if(db.get(_thisUser) == 5){
                res.reply("正在开发中");
                return;
            }

            //区号
            if(db.get(_thisUser) == 6){
                res.reply("正在开发中");
                return;
            }

            logger.log("info","离开菜单");
            res.reply(_menu)

        }



        setTimeout(function () {
            db.set(_thisUser,0).value();
            res.reply(_menu);
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