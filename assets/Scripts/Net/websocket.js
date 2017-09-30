var websocket = {
    sock: null,
    cmd_handler: null, //用来存放对应的命令服务
    is_connected: false,
    _onOpen: function (Event) {
        console.log("ws connect server success");
        this.is_connected = true;
    },
    //接收到服务器
    _onMessage: function (Event) {
        var cmd_json = Event.data;
        if (!cmd_json || !this.cmd_handler) {
            return;
        }
        var cmd = JSON.parse(cmd_json);
        if (!cmd) {
            return;
        }
        var stype = cmd[0]; //获取服务类型
        if (this.cmd_handler[stype]) {   //如果对应的服务不为空则传递数据过去
            this.cmd_handler[stype](cmd);
        }
        console.log("serverr callback: " + cmd);
    },
    _onerror: function (Event) {
        this._onclose();
    },
    _onclose: function (_sok) {
        this.is_connected = false;
        if (this.sock) {
            this.close();
        }
    },
    //发送数据
    send: function (body) {
        if (this.is_connected && this.sock) {
            this.sock.send(body);
        }
    },
    //发送对象
    send_object: function (obj) {
        if (this.is_connected && this.sock && obj) {
            var str = JSON.stringify(obj);
            console.log(str);
            if (str) {
                this.sock.send(str);
            }
        }
    },
    //连接到服务器
    connect: function (url) {
        this.sock = new WebSocket(url);
        this.sock.onopen = this._onOpen.bind(this);
        this.sock.onmessage = this._onMessage.bind(this);
        this.sock.onerror = this._onerror.bind(this);
        this.sock.onclose = this._onclose.bind(this);
    },
    //关闭socket
    close: function () {
        if (this.sock !== null) {
            this.sock.close();
            this.sock = null;
        }
        this.is_connected = false;
    },
    //注册命令
    register_cmd_handler: function (handler) {
        this.cmd_handler = handler;
    }
};
websocket.connect("ws://127.0.0.1:8000/ws");
console.log("connect to server......");
module.exports = websocket;