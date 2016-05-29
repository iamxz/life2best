/**
 * Created by xue on 2016/5/29.
 */

module.exports = function (req,res,next) {
    var message = req.weixin;
    console.log(message);


    res.reply('hehe');


};