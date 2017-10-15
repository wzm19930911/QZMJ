/*
用户验证登录模块
2017/10/11 by 墨子
*/
var Utils = require("utils");
var Stype = require("stype");
var Cmd = require("cmd");
var Websocket = require("websocket");
var auth = {
     guest_login:function(){
       var key = null;
       if(!key){
           key  = Utils.randomString(32);
       }
       Websocket.send_cmd(Stype.Auth,Cmd.Auth.GUEST_LOGIN,key);
     }



    
}
module.exports = auth;