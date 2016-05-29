/**
 * Created by xue on 2016/5/29.
 */
var _list = [
    "1,天气预报",
    "2,电话号码",
    "3,笑话",
    "4,点歌",
    "5,查快递",
    "6,查区号",
].join("\n");

module.exports = function (req,res,next) {
    res.reply({


        content: _list,
        type: 'text'

    })
};