"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket = require("socket.io");
var mongoose = require("mongoose");
var redis = require("socket.io-redis");
var socket_1 = require("./socket");
var bodyParser = require('body-parser');
var Backend = /** @class */ (function () {
    function Backend() {
        // Create expressjs application
        this.kakaoDb = new socket_1.KakaoDb();
        this.kakaoSocket = new socket_1.KakaoSocket(null, this.kakaoDb);
        this.kakao_app = express();
        // this.app = express();
        // Setup routes
        this.routes();
        // Create server
        this.kakao_server = http.createServer(this.kakao_app);
        // Create database connections
        this.kakaoInitial();
        // Create database connections
        this.databases();
        // Handle websockets
        this.sockets();
    }
    // Configure routes
    Backend.prototype.routes = function () {
        var _this = this;
        console.log("Server kakaoRoutes");
        this.kakao_app.use(function (request, result, next) {
            result.header("Access-Control-Allow-Origin", "*");
            result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.kakao_app.use(bodyParser.json());
        this.kakao_app.use(bodyParser.urlencoded({ extended: true }));
        this.kakao_app.get('/', function (req, res) {
            res.send("{type: 'text'}");
        });
        this.kakao_app.all('*', function (req, res, next) {
            res.setHeader("Content-Type", "application/json");
            next();
        });
        // 키보드
        this.kakao_app.get('/keyboard', function (request, result, next) {
            var re;
            var content = "keyboard";
            try {
                _this.kakaoSocket.getKeyboardResponse(content, function (err, data) {
                    if (err) {
                        console.log('keyboard:응답 에러');
                    }
                    else {
                        re = data;
                        result.status(200).send(re);
                        console.log('keyboard:응답 성공');
                    }
                });
            }
            catch (exception) {
                console.log('keyboard:응답 에러:' + exception);
            }
        });
        // 응답
        this.kakao_app.post('/message', function (request, result, next) {
            console.log("kakao message" + JSON.stringify(request.body));
            var user_key = request.body.user_key;
            var type = request.body.type;
            var content = request.body.content;
            var re;
            _this.kakao_io.emit('chat message', content);
            try {
                _this.kakaoSocket.getMessageResponseNew(content, user_key, type, function (err, data) {
                    if (err) {
                        console.log('message:응답 에러:' + err);
                        re = data;
                        result.status(200).send(re);
                    }
                    else {
                        re = data;
                        console.log("response:" + JSON.stringify(re));
                        result.status(200).send(re);
                        console.log('message:응답 성공');
                    }
                });
            }
            catch (exception) {
                console.log('message:응답 에러:' + exception);
            }
        });
        // 친구 추가
        this.kakao_app.post('/friend', function (request, result, next) {
            console.log('friend add');
            console.log('user key : ' + request.body.user_key);
            var user_key = request.body.user_key;
            var re;
            try {
                re = { text: 'param : ' + user_key };
            }
            catch (exception) {
                console.log('friend:응답 에러');
            }
            finally {
                result.status(200).send(re);
                console.log('friend:응답 성공');
            }
        });
        // 친구 삭제
        this.kakao_app.delete('/friend/:user_key', function (request, result, next) {
            console.log('friend del');
            console.log('user key : ' + request.params.user_key);
            var user_key = request.params.user_key;
            var re;
            try {
                // this.kakaoDb.dbClearCustomer(user_key);
                _this.kakaoSocket.clearCustomer(user_key, function (err, data) {
                    if (err) {
                        // console.log('message:응답 에러:'+err);
                        re = { text: 'failure' };
                        result.status(200).send(re);
                    }
                    else {
                        re = { text: 'success' };
                        // console.log("response:" + JSON.stringify(re));
                        result.status(200).send(re);
                        console.log('friend:응답 성공');
                    }
                });
                // re = {text:'param : ' + user_key};
            }
            catch (exception) {
                console.log('friend del:응답 에러');
            }
            finally {
                //result.status(200).send(re);
                console.log('friend del:응답 성공');
            }
        });
        // 채팅방 삭제
        this.kakao_app.delete('/chat_room/:user_key', function (request, result, next) {
            console.log('chat_room del');
            console.log('user key : ' + request.params.user_key);
            var user_key = request.body.user_key;
            var re;
            try {
                re = { text: 'param : ' + user_key };
            }
            catch (exception) {
                console.log('chat_room del:응답 에러');
            }
            finally {
                result.status(200).send(re);
                console.log('chat_room del:응답 성공');
            }
        });
    };
    // Configure databases
    Backend.prototype.databases = function () {
        // MongoDB URL
        var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chat';
        // Get MongoDB handle
        this.mongo = mongoose.connect(MONGODB_URI, { useMongoClient: true });
        mongoose.Promise = global.Promise;
    };
    // Database initail 
    Backend.prototype.kakaoInitial = function () {
        var Q = require('q');
        var GKakaoSocket = this.kakaoSocket;
        var GKakaoDb = this.kakaoDb;
        var systemResult;
        Q.all([this.kakaoDb.dbSelectScenarioSystem("system")]).then(function (results) {
            systemResult = results[0][0];
        }).then(function () {
            GKakaoSocket.setSystemScenario(systemResult);
            GKakaoSocket.setKakaoDb(GKakaoDb);
        }).done();
    };
    // Configure sockets
    Backend.prototype.sockets = function () {
        // Get socket.io handle
        this.kakao_io = socket(this.kakao_server);
        // Set Redis adapter
        var REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
        this.kakao_io.adapter(redis(REDIS_URL));
        // Set room socket
        //let roomSocket = new RoomSocket(this.kakao_io);
    };
    Backend.prototype.listen = function () {
        // Get port
        var port = process.env.PORT || 2580;
        // Start listening
        this.kakao_server.listen(port);
        // add error handler
        this.kakao_server.on('error', function (error) {
            console.log('ERROR', error);
        });
        // start listening on port
        this.kakao_server.on('listening', function () {
            console.log("==> Listening on port " + port + ". Open up http://localhost:" + port + "/ in your browser.");
        });
    };
    return Backend;
}());
exports.Backend = Backend;
//# sourceMappingURL=index.js.map