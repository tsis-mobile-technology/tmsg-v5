import * as express from 'express';
import * as http from 'http';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as socket from 'socket.io';
import * as mongoose from 'mongoose';
import * as redis from 'socket.io-redis';

import { KakaoSocket, KakaoDb } from './socket';

var bodyParser    = require('body-parser');

declare var process, __dirname;

export class Backend {
  // private app: express.Application;
  public kakao_app: any;
  private kakaoDb: any;
  public kakaoSocket: any;
  private kakao_server: any;
  private kakao_io: any;
  private mongo: mongoose.MongooseThenable;
  private port: number;

  constructor() {
    // Create expressjs application
    this.kakaoDb = new KakaoDb();
    this.kakaoSocket = new KakaoSocket(null, this.kakaoDb);
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
  private routes(): void {
    console.log("Server kakaoRoutes");

    this.kakao_app.use((request: express.Request, result: express.Response, next: express.NextFunction) => {
        result.header("Access-Control-Allow-Origin", "*");
        result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    this.kakao_app.use(bodyParser.json());
    this.kakao_app.use(bodyParser.urlencoded({extended:true}));

    this.kakao_app.get( '/', function(req, res) {
        res.send("{type: 'text'}");
    });

    this.kakao_app.all('*', function(req, res, next) {
        res.setHeader("Content-Type", "application/json");
        next();
    });

    // 키보드
    this.kakao_app.get('/keyboard', (request: express.Request, result: express.Response, next: express.NextFunction) => {
        var re;
        var content = "keyboard";
        try {
            this.kakaoSocket.getKeyboardResponse(content, function(err, data) {
                if(err) {
                    console.log('keyboard:응답 에러');
                } else {
                    re = data;
                    result.status(200).send(re);
                    console.log('keyboard:응답 성공');
                }
            });
        } catch (exception) {
            console.log('keyboard:응답 에러:'+ exception);
        }

    });

    // 응답
    this.kakao_app.post('/message', (request: express.Request, result: express.Response, next: express.NextFunction) => {
        console.log("kakao message" + JSON.stringify(request.body));
        var user_key = request.body.user_key;
        var type = request.body.type;
        var content = request.body.content;
        var re;
        this.kakao_io.emit('chat message', content);
        try {
            //this.kakaoSocket.getMessageResponseNew(content, user_key, type, function(err, data) {
            this.kakaoSocket.getMessageResponseOld(content, user_key, type, function(err, data) {    
                if(err) {
                    console.log('message:응답 에러:'+err);
                    re = data;
                    result.status(200).send(re);
                } else {
                    re = data;
                    console.log("response:" + JSON.stringify(re));
                    result.status(200).send(re);
                    console.log('message:응답 성공');
                }
            });
        } catch (exception) {
            console.log('message:응답 에러:' + exception);
        }
    });

    // 친구 추가
    this.kakao_app.post('/friend', (request: express.Request, result: express.Response, next: express.NextFunction) => {
        console.log('friend add');
        console.log('user key : '+request.body.user_key);
        var user_key = request.body.user_key;
        var re;
        try {
            re = {text:'param : ' + user_key};
        } catch (exception) {
            console.log('friend:응답 에러');
        } finally {
            result.status(200).send(re);
            console.log('friend:응답 성공');
        }
    });

    // 친구 삭제
    this.kakao_app.delete('/friend/:user_key', (request: express.Request, result: express.Response, next: express.NextFunction) => {
        console.log('friend del');
        console.log('user key : ' + request.params.user_key);
        var user_key = request.params.user_key;
        var re;
        try {
            // this.kakaoDb.dbClearCustomer(user_key);
            
            this.kakaoSocket.clearCustomer(user_key, function(err, data) {
                if(err) {
                    // console.log('message:응답 에러:'+err);
                    re = {text:'failure'};
                    result.status(200).send(re);
                } else {
                    re = {text:'success'};
                    // console.log("response:" + JSON.stringify(re));
                    result.status(200).send(re);
                    console.log('friend:응답 성공');
                }
            });
            // re = {text:'param : ' + user_key};
        } catch (exception) {
            console.log('friend del:응답 에러');
        } finally {
            //result.status(200).send(re);
            console.log('friend del:응답 성공');
        }
    });

    // 채팅방 삭제
    this.kakao_app.delete('/chat_room/:user_key', (request: express.Request, result: express.Response, next: express.NextFunction) => {
        console.log('chat_room del');
        console.log('user key : '+request.params.user_key);
        var user_key = request.body.user_key;
        var re;
        try {
            re = {text:'param : ' + user_key};
        } catch (exception) {
            console.log('chat_room del:응답 에러');
        } finally {
            result.status(200).send(re);
            console.log('chat_room del:응답 성공');
        }
    });
  }

    // Configure databases
    private databases(): void {
        // MongoDB URL
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chat';

        // Get MongoDB handle
        this.mongo = mongoose.connect(MONGODB_URI, { useMongoClient: true });
        (<any>mongoose).Promise = global.Promise;
    }

    // Database initail 
    private kakaoInitial(): void {
        var Q = require('q');
        var GKakaoSocket = this.kakaoSocket;
        var GKakaoDb = this.kakaoDb;
        var systemResult;

        Q.all([this.kakaoDb.dbSelectScenarioSystem("system")]).then(function(results) {
            systemResult = results[0][0];
        }).then(function() {
            GKakaoSocket.setSystemScenario(systemResult);
            GKakaoSocket.setKakaoDb(GKakaoDb);
        }).done();
    }

  // Configure sockets
  private sockets(): void {
    // Get socket.io handle
    this.kakao_io = socket(this.kakao_server);

    // Set Redis adapter
	// Perpose redis?
	// break...
    //const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
    //this.kakao_io.adapter(redis(REDIS_URL));

    // Set room socket
    //let roomSocket = new RoomSocket(this.kakao_io);
  }

  public listen(): void {
    // Get port
    const port = process.env.PORT || 2580;

    // Start listening
    this.kakao_server.listen(port);

    // add error handler
    this.kakao_server.on('error', error => {
      console.log('ERROR', error);
    });

    // start listening on port
    this.kakao_server.on('listening', () => {
      console.log(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    });
  }
}
