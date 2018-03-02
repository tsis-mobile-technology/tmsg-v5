"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KakaoDb = /** @class */ (function () {
    function KakaoDb() {
        this.Q = require("q");
        this.mysql = require('mysql');
        this.pool = null;
        // this.pool = this.mysql.createPool({
        //   connectionLimit: 2,
        //   host: '14.63.213.246',
        //   user: 'smarttest',
        //   password: 'test1234',
        //   port: 10003,
        //   database: 'SMART_MESSAGE_VERTWO',
        //   debug: false
        // });
        this.pool = this.mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'icr',
            password: '1q2w3e4r5t',
            port: 3306,
            database: 'SMART_MESSAGE_VERTWO',
            debug: false
        });
        // console.log("KakaoDB constructor()");
        // this.pool = this.mysql.createPool({
        //   connectionLimit: 20,
        //   host: '125.132.2.20',
        //   user: 'icr',
        //   password: '1q2w3e4r5t^Y',
        //   port: 3306,
        //   database: 'SMART_MESSAGE_VERTWO',
        //   debug: false
        // });
    }
    KakaoDb.prototype.dbCheckHistory = function (user_key) {
        var defered = this.Q.defer();
        this.pool.query('select a.*, b.step, b.trun from TB_AUTOCHAT_HISTORY as a, TB_AUTOCHAT_SCENARIO as b where a.UNIQUE_ID = ? and b.REQ_MESSAGE = a.MESSAGE order by a.wrtdate desc LIMIT 1', [user_key], defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbLoadAuthOkCustomer = function (user_key) {
        var defered = this.Q.defer();
        this.pool.query("SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ? AND YN_AUTH = 'Y' ", user_key, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbLoadAuthIngCustomer = function (user_key) {
        var defered = this.Q.defer();
        this.pool.query("SELECT * FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ? AND WRTDATE > DATE_ADD(now(), INTERVAL - 5 MINUTE)", user_key, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbClearCustomer = function (user_key) {
        var defered = this.Q.defer();
        console.log("dbClearCustomer:" + user_key);
        this.pool.query('DELETE FROM TB_AUTOCHAT_CUSTOMER WHERE UNIQUE_ID = ?', user_key, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbBeforeSelectScenario = function (content, user_key) {
        var defered = this.Q.defer();
        this.pool.query('SELECT a.* FROM TB_AUTOCHAT_SCENARIO as a, (select * from TB_AUTOCHAT_HISTORY where UNIQUE_ID = ? order by wrtdate desc LIMIT 1)  as b WHERE a.REQ_MESSAGE = b.MESSAGE', user_key, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbSelectScenario = function (content) {
        var defered = this.Q.defer();
        this.pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE REQ_MESSAGE = ?', content, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbSelectScenarioSystem = function (content) {
        var defered = this.Q.defer();
        this.pool.query('SELECT * FROM TB_AUTOCHAT_SCENARIO WHERE ETC3 = ?', content, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbSaveHistory = function (content, user_key, res_message) {
        var defered = this.Q.defer();
        var post = { UNIQUE_ID: user_key, MESSAGE: content, ETC1: res_message };
        this.pool.query('INSERT INTO TB_AUTOCHAT_HISTORY SET ?', post, defered.makeNodeResolver());
        return defered.promise;
    };
    KakaoDb.prototype.dbSaveCustomer = function (updateType, content, user_key) {
        //var post = {UNIQUE_ID:user_key, NAME:content};
        var post = { UNIQUE_ID: user_key };
        console.log("db values:" + JSON.stringify(post));
        if (updateType == "Init") {
            this.pool.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, function (err, rows, fields) {
                if (err)
                    console.log("Query Error:", err);
            });
        }
        else if (updateType == "Name") {
            // this.pool.query('INSERT INTO TB_AUTOCHAT_CUSTOMER SET ?', post, function(err, rows, fields) {
            //   if(err) console.log("Query Error:", err);
            // });
            this.pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET NAME = ?, WRTDATE = now() WHERE UNIQUE_ID = ?', [content, user_key], function (err, rows, fields) {
                if (err)
                    console.log("Query Error:", err);
            });
        }
        else if (updateType == "Phone") {
            this.pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET PHONE = ?, WRTDATE = now() WHERE UNIQUE_ID = ?', [content, user_key], function (err, rows, fields) {
                if (err)
                    console.log("Query Error:", err);
            });
        }
        else if (updateType == "Auth") {
            this.pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET YN_AUTH = ?, PHONE = null, NAME = null, ETC1 = null, WRTDATE = now() WHERE UNIQUE_ID = ?', ["Y", user_key], function (err, rows, fields) {
                if (err)
                    console.log("Query Error:", err);
            });
        }
        else if (updateType == "Otp") {
            this.pool.query('UPDATE TB_AUTOCHAT_CUSTOMER SET ETC1 = ?, WRTDATE = now() WHERE UNIQUE_ID = ?', [content, user_key], function (err, rows, fields) {
                if (err)
                    console.log("Query Error:", err);
            });
        }
    };
    return KakaoDb;
}());
exports.KakaoDb = KakaoDb;
//# sourceMappingURL=kakaodb.js.map