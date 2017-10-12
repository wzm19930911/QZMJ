/*
登录场景
2017/10/11 by 墨子
*/
var Websocket = require("websocket");
var Auth = require("auth");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },
    start: function () {
        
    },
    //点击游客登录
    on_guest_click: function(){
        Auth.guest_login();
    },
});
