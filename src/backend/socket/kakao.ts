
export interface TK001_REQUEST {
    // Length: number;        // 10
    // Type: string;          // 5
    // SendDate: string;      // 14
    // ReSendDate: string;    // 14
    // Flag: string;          // 1
    // ResultCode: string;    // 6
    // filler: string;        // 50
    CustName: string;
    CustPhone: string;
    UniqueID: string;
    SendType: string;
    MsgType: string;
    MsgContents: string;
    SendPhone: string;
    RecvPhone: string;
}

export interface TK001RequestConstructor {
    new (
        // Length: number,  
        // Type: string,        
        // SendDate: string,    
        // ReSendDate: string,   
        // Flag: string,         
        // ResultCode: string,    
        // filler: string,        
        CustName: string,
        CustPhone: string,
        UniqueID: string,
        SendType: string,
        MsgType: string,
        MsgContents: string,
        SendPhone: string,
        RecvPhone: string
        ): TK001_REQUEST;
}

export class TK001Request implements TK001_REQUEST {
    // Length: number;        // 10
    // Type: string;          // 5
    // SendDate: string;      // 14
    // ReSendDate: string;    // 14
    // Flag: string;          // 1
    // ResultCode: string;    // 6
    // filler: string;        // 50
    CustName: string;
    CustPhone: string;
    UniqueID: string;
    SendType: string;
    MsgType: string;
    MsgContents: string;
    SendPhone: string;
    RecvPhone: string;

    constructor(
        // Length: number,  
        // Type: string,        
        // SendDate: string,    
        // ReSendDate: string,   
        // Flag: string,         
        // ResultCode: string,    
        // filler: string,        
        CustName: string,
        CustPhone: string,
        UniqueID: string,
        SendType: string,
        MsgType: string,
        MsgContents: string,
        SendPhone: string,
        RecvPhone: string) {

        // this.Length     = Length;
        // this.Type       = Type;             
        // this.SendDate   = SendDate;
        // this.ReSendDate = ReSendDate;     
        // this.Flag       = Flag;       
        // this.ResultCode = ResultCode;       
        // this.filler     = filler; 
        this.CustName   = CustName;
        this.CustPhone  = CustPhone;
        this.UniqueID   = UniqueID;
        this.SendType   = SendType;
        this.MsgType    = MsgType;
        this.MsgContents = MsgContents;
        this.SendPhone  = SendPhone;
        this.RecvPhone  = RecvPhone;
    }
}

export interface TK002_REQUEST {
    UniqueID: string;
    MonthCnt: string;
}

export interface TK002RequestConstructor {
    new (     
        UniqueID: string,
        MonthCnt: string
        ): TK002_REQUEST;
}

export class TK002Request implements TK002_REQUEST {
    UniqueID: string;
    MonthCnt: string;

    constructor(
        UniqueID: string,
        MonthCnt: string) {
        this.UniqueID   = UniqueID;
        this.MonthCnt   = MonthCnt;
    }
}

export interface TK002_RESPONSE_invoice {
    YyyymmInv: number;
    Service: string;
    Name: string;
    AmtUse: number;
    AmtDc: number;
    AmtCurInv: number;
    AmtPmt: number;
    AmtUnpmt: number;
    AmtSupply: number;
    AmtVat: number;
    AmtTrunc: number;
    CalcStartDay: number;
    CalcEndDay: number;
    ProdUseDtls: TK002_RESPONSE_produsedtls;
}

export interface TK002_RESPONSE_invoices {
    invoice: TK002_RESPONSE_invoice[];
}

export interface TK002_RESPONSE_produsedtl {
    ChrgItmGrp: string;
    ChrgItm: string;
    AmtUse: number;
    AmtDc: number;
    AmtCurInv: number;
    AmtPmt: number;
    AmtUnpmt: number;
    AmtSupply: number;
    AmtVat: number;
    AmtTrunc: number;
}

export interface TK002_RESPONSE_produsedtls {
    produsedtl: TK002_RESPONSE_produsedtl[];
}

export interface TK002_RESPONSE_customer {
    Name: string;
    Id: number;
    IdSo: number;
    Address: string;
    Phone: string;
    HandPhone: string;
    Email: string;
    AccountName: string;
    AccountId: number;
    IssueDate: number;
    PayMethod: string;
    Media: string;
    FinancialName: string;
    Account: number;
    Status: number;
    Social: number;
    Products: string;
    SumAmtCurInv: number;
    SumAmtCurNonpmt: number;
    Invoices: TK002_RESPONSE_invoices;
}

export interface TK002_RESPONSE_code {
    Code: string;
}

export interface TK002_RESPONSE_list {
    customer: TK002_RESPONSE_customer;
    code: TK002_RESPONSE_code;
}

export interface TK002ResponseConstructor {
    new (     
        customer: TK002_RESPONSE_customer,
        code: TK002_RESPONSE_code
        ): TK002_RESPONSE_list;
}

export class TK002Response implements TK002_RESPONSE_list {
    customer: TK002_RESPONSE_customer;
    code: TK002_RESPONSE_code;

    constructor(
        customer: TK002_RESPONSE_customer,
        code: TK002_RESPONSE_code) {
        this.customer   = customer;
        this.code       = code;
    }
}

export interface TK003_REQUEST {
    UniqueID: string;
}

export interface TK003RequestConstructor {
    new (     
        UniqueID: string
        ): TK003_REQUEST;
}

export class TK003Request implements TK003_REQUEST {
    UniqueID: string;

    constructor(
        UniqueID: string) {
        this.UniqueID   = UniqueID;
    }
}

export interface TK003_RESPONSE_list {
    Seq: string;
    Msg: string;
}

export interface TK003_RESPONSE_code {
    Code: string;
}

export interface TK003ResponseConstructor {
    new (     
        Seq: string,
        Msg: string
        ): TK003_RESPONSE_list;
}

export class TK003Response implements TK003_RESPONSE_list {
    Seq: string;
    Msg: string;

    constructor(
        Seq: string,
        Msg: string) {
        this.Seq   = Seq;
        this.Msg   = Msg;
    }
}

export class KakaoSocket {
    private mtIP: string;
    private mtURL: string;
    private mtPort: number;
    private hpURL: string;
    private IN0002_URL: string;
    private IN0002_PARAM: string;
    private ls: any;
    private nOTP: any;
    private options: any;
    private kakaoDb: any;
    private inputDatas: TB_AUTOCHAT_SCENARIO[];
    // public  Q             = require("q");
    private validator     = require('validator');
    private net           = require('net');
    private spawn         = require('child_process').spawn;
    // private fastXmlParser = require('fast-xml-parser');
    private errorSuccess  = '{"keyboard":{"type":"text"}, "message":{"text":"고객님의 죄송합니다!. 시스템 점검중으로 잠시후 다시 시도하여 주십시요.\n 처음으로 가시려면 "#"을 입력해 주세요."}}';
                        //  위 시스템 회신 문자는  SYS_ERR

    /* private io의 경우 본 api 서버가 기동 될때 한번 불러와서 여러번 사용한다. 
       그렇게 되면 본 class를 사용하는 쪽에서 한번에 생성해야 한다.
    */
    // constructor(private io: TB_AUTOCHAT_SCENARIO[]) {
     constructor( private io: any, private db: any) {
        this.inputDatas = io;
        this.kakaoDb = db;
        this.mtURL = "http://125.132.2.120:30063";
        //DEV
        this.mtIP = "125.132.2.120";
        this.mtPort = 30063;
        //LIVE
        //this.mtIP = "125.132.2.111";
        //this.mtPort = 30063;

        this.hpURL = "http://172.16.180.224:30034"; //dev
        // this.hpURL = "http://172.16.28.27:30034"; //live
        this.IN0002_URL = "/interface/tbroad/xml_module/CustInvoiceDtlXml";
        //this.IN0002_PARAM = "KEY_NUM=1234561234567&MONTH_CNT=2&NM_CUST=홍길동&CORP=3200&ID_INSERT=U000000000";
        this.IN0002_PARAM = "CORP=TBRD&KEY_NUM=MC0GCCqGSIb3DQIJAyEAgw8aXEa%2FEaSbidYQzkCI9WfamqzaFtL%2F7NOaD8JNWGU%3D&NM_CUST=%C1%A4%BC%B1%BF%B5&MONTH_CNT=2";
        this.options = {
                            attrPrefix: "@_",
                            textNodeName: "#text",
                            ignoreNonTextNodeAttr: true,
                            ignoreTextNodeAttr: true,
                            ignoreNameSpace: true,
                            textNodeConversion: true
                        };

    }


    public setSystemScenario(results: any): void {
        this.inputDatas = results;
    }

    public setKakaoDb(Db: any): void {
        this.kakaoDb = Db;
    }

    // Add signal
    public findScenario(tagName: string): string {
        if( this.inputDatas != null ) {

        // this.inputData.filter(function (item) { console.log(item.REQ_MESSAGE); return item.REQ_MESSAGE === tagName; });
            var rtnObj: TB_AUTOCHAT_SCENARIO[] = this.inputDatas.filter( inputData => inputData.REQ_MESSAGE === ""+tagName);
            if( rtnObj != null ) {
                return rtnObj[0].RES_MESSAGE;
            }
            else {
                return null;
            }
        }
        else { return this.errorSuccess;}
    }

    public getKeyboardResponse(content: string, callback: any): void {
        var re;
        var Q = require('q');
        Q.all([this.kakaoDb.dbSelectScenario(content)]).then(function(results){
            re = results[0][0][0];
        }).then(function() {
            callback(null, JSON.parse(re.RES_MESSAGE).keyboard);
        })
        .done();
    }

    public clearCustomer(content: string, callback: any): void {
        var re;
        var Q = require('q');
        console.log('clearCustomer:content : ' + content);
        Q.all([this.kakaoDb.dbClearCustomer(content)]).then(function(results){
            re = results[0][0][0];
        }).then(function() {
            callback(null, re);
        })
        .done();
    }

    public getMessageResponseNew(content: string, user_key: string, type: string, callback: any): void {
        var re;
        var etc3;
        var kakaoDb = this.kakaoDb;
        var customerAuthOkInfo = null;
        var customerAuthIngInfo = null;
        var customerHistoryInfo = null;
        var kakaoSocket = this;
        var Q = require('q');
        var validator = require('validator');
        var bFlag = true; //insertHistoryAndCallback call true/false check
        // var localeString = require('number-to-locale-string');

        if(user_key != null && content != null) {

            Q.all([this.kakaoDb.dbLoadAuthOkCustomer(user_key), this.kakaoDb.dbLoadAuthIngCustomer(user_key), this.kakaoDb.dbCheckHistory(user_key)]).then(function(results){
                customerAuthOkInfo = results[0][0][0];
                customerAuthIngInfo = results[1][0][0];
                customerHistoryInfo = results[2][0][0];
            }).then(function() { // case#4 one-bridge
                if(content == "#" || content == "처음으로") content = "keyboard";
                Q.all([kakaoDb.dbSelectScenario(content)]).then(function(results) { 
                    if( results[0][0][0] != null ) {
                        re = kakaoSocket.setStartButton(results[0][0][0].RES_MESSAGE, results[0][0][0].STEP);
                        etc3 = results[0][0][0].ETC3;
                    }
                }).then(function() {
                    if(re == null) {
                        if( customerAuthOkInfo != null ) {
                            re = kakaoSocket.findScenario("INPUT_ERR");
                        } else if ( customerAuthOkInfo == null && customerAuthIngInfo != null ) {
                            /* Name 있니?, Phone 있니?, 인증번호가 있니? 확인해서 인증 처리를 한다. */
                            if( customerAuthIngInfo.PHONE == null ) {
                                if( validator.isDecimal(content) != true ) { // 숫자 비교해서 같은면
                                    re = kakaoSocket.findScenario("PHONE_NOK");
                                    // 혹시 두번 호출해서 오류가 올라오나 막아본다, 2017.10.18
                                    //if(re != null) kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                } else {
                                    Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Phone", content, user_key)]).then(function(results) {
                                        console.log("dbSaveCustomer call!");
                                    }).then(function() {
                                        re = kakaoSocket.findScenario("NAME");
                                        console.log("dbSaveCustomer call! ==> " + JSON.stringify(re));
                                    }).then(function() {
                                        if(re != null) kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                    }).done();
                                }
                            } else if( customerAuthIngInfo.PHONE != null && customerAuthIngInfo.NAME == null ) {
                                Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Name", content, user_key)]).then(function(results) {
                                    console.log("dbSaveCustomer call!");
                                    customerAuthIngInfo.NAME = content;
                                }).then(function() {
                                    // OTP && 기간계 연동 코드 추가
                                    Q.all([kakaoSocket.getMTEventJSONTypeTK001Request(customerAuthIngInfo.NAME, customerAuthIngInfo.PHONE, user_key, kakaoSocket.kakaoDb, null)]).then(function(results) {
                                        
                                        if( results != null && results == "success" ) {
                                            //re = results;
                                            console.log("if:rtnStr:" + results + "," + kakaoSocket.nOTP);
                                            Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Otp", kakaoSocket.nOTP, user_key)]).then(function(results) {
                                                console.log("dbSaveCustomer call!");
                                            }).done();
                                        } else {
                                            if( results == "E99999" || results == "E00001" || results == "E00002" ||
                                                results == "E00003" || results == "E00004" || results == "E10000" ||
                                                results == "E00005" || results == "E00006") {
                                                re = kakaoSocket.findScenario(results);
                                            } else {
                                                re = kakaoSocket.findScenario("SYS_ERR");
                                            }
                                            console.log("else:rtnStr:" + results + "," + kakaoSocket.nOTP);
                                            if( re != null ) {
                                                kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                                bFlag = false;
                                            }
                                        }
                                    }).then(function() {
                                        // callback(null, re);
                                        re = kakaoSocket.findScenario("AUTH");
                                        //20170824
                                        if( re != null && bFlag == true) {
                                            kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                            bFlag = false;
                                        }
                                    }).done();
                                }).then(function() {
                                    if( re != null && bFlag == true ) {
                                        //test20180227
                                        kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                        bFlag = false;
                                    }
                                }).done();
                            } else if( customerAuthIngInfo.PHONE != null && customerAuthIngInfo.NAME != null && customerAuthIngInfo.ETC1 != null ) {
                                if( customerAuthIngInfo.ETC1 == content ) {
                                    Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Auth", null, user_key)]).then(function(results) {
                                        console.log("dbSaveCustomer call!");
                                    }).then(function() {
                                        re = kakaoSocket.findScenario("AUTH_OK");
                                    }).then(function() {
                                        if( re != null )
                                            kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                    }).done();
                                } else {
                                    // 인증번호 입력 오류 재입력 요청
                                    re = kakaoSocket.findScenario("AUTH_NOK");
                                }
                            } else {
                                re = kakaoSocket.findScenario("INPUT_ERR");
                            }
                        } else {
                            /* 인증 유도 */
                            re = kakaoSocket.findScenario("SESSION_ERR");
                        }

                    }
                    else { 
                        if( etc3 == "interface" && customerAuthOkInfo != null ) {
                            /* 20180227 new version TK003 start */
                            re = null;
                            Q.all([kakaoSocket.getMTEventJSONTypeTK003Request( user_key, kakaoSocket.kakaoDb, null)]).then(function(results) {
                                if( results != null ) {
console.log("rtnStr:" + results.length);
                                    if( results == "E99999" || results == "E00001" || results == "E00002" ||
                                        results == "E00003" || results == "E00004" || results == "E10000" ||
                                        results == "E00005" || results == "E00006") {
                                          re = kakaoSocket.findScenario(results);
                                    } else if( String(results).length > 6) {
console.log(JSON.stringify(results));
                                        var jsonData = JSON.parse(results);
                                        var Seq: string = "";
                                        var Msg: string = "";
                                        
                                        if( jsonData != null && jsonData.pay != null && jsonData.pay.length > 1 ) {
                                            var responseBody = jsonData.pay[0];
console.log("0. responseBody:" + JSON.stringify(responseBody));

                                            for ( var i = 0; i < jsonData.pay.length; i++ ) {
                                                responseBody = jsonData.pay[i];
                                                Seq = Seq + responseBody.Seq;
                                                Msg = Msg + responseBody.Msg;

                                                if ( i+1 < jsonData.pay.length ) {
                                                    Seq = Seq + ",";
                                                    Msg = Msg + ",";
                                                }
                                            }
                                        } else {
                                            var responseBody = jsonData.pay[0];
console.log("1. responseBody:" + JSON.stringify(responseBody));
                                            Seq = responseBody.Seq;
                                            Msg = responseBody.Msg;
                                        }

                                        var printString = "고객님 안녕하세요!" +
                                        "\r\n" + 
                                        "\r\n" + "" + Msg + 
                                        "\r\n\r\n" + "감사합니다.";
                                        re = {"keyboard":{"buttons":["처음으로"], "type":"buttons"},"message":{"text":printString}};
                                    } else {
                                        re = kakaoSocket.findScenario("SYS_ERR");
                                    }
                                }
                            }).then(function() {
                                // callback(null, re);
                                if( re != null )
                                    kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                            }).done();
                            /* 20180227 new version TK003 end */
                        } else if( etc3 == "interface" && customerAuthOkInfo == null ) {
                            re = kakaoSocket.findScenario("PHONE");
                            
                            Q.all([kakaoSocket.kakaoDb.dbClearCustomer(user_key)]).then(function(results) {
                                console.log("dbClearCustomer call!");
                            }).then(function() {
                                Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Init", null, user_key)]).then(function(results) {
                                    console.log("dbSaveCustomer call!");
                                }).done();
                            }).done();
                        } else {
                            console.log("re:" + JSON.stringify(re));
                        }
                    }
                }).then(function() {
                    if( re != null )
                        kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                }).done();
            }).done();
        } else {
            callback("user Key 또는 입력 정보가 NULL 입니다.", this.findScenario("SYS_ERR"));
        }
    }

    public getMessageResponseOld(content: string, user_key: string, type: string, callback: any): void {
        var re;
        var etc3;
        var kakaoDb = this.kakaoDb;
        var customerAuthOkInfo = null;
        var customerAuthIngInfo = null;
        var customerHistoryInfo = null;
        var kakaoSocket = this;
        var Q = require('q');
        var validator = require('validator');
        var bFlag = true; //insertHistoryAndCallback call true/false check
        // var localeString = require('number-to-locale-string');

        if(user_key != null && content != null) {

            Q.all([this.kakaoDb.dbLoadAuthOkCustomer(user_key), this.kakaoDb.dbLoadAuthIngCustomer(user_key), this.kakaoDb.dbCheckHistory(user_key)]).then(function(results){
                customerAuthOkInfo = results[0][0][0];
                customerAuthIngInfo = results[1][0][0];
                customerHistoryInfo = results[2][0][0];
            }).then(function() { // case#4 one-bridge
                if(content == "#" || content == "처음으로") content = "keyboard";
                Q.all([kakaoDb.dbSelectScenario(content)]).then(function(results) { 
                    if( results[0][0][0] != null ) {
                        re = kakaoSocket.setStartButton(results[0][0][0].RES_MESSAGE, results[0][0][0].STEP);
                        etc3 = results[0][0][0].ETC3;
                    }
                }).then(function() {
                    if(re == null) {
                        if( customerAuthOkInfo != null ) {
                            re = kakaoSocket.findScenario("INPUT_ERR");
                        } else if ( customerAuthOkInfo == null && customerAuthIngInfo != null ) {
                            /* Name 있니?, Phone 있니?, 인증번호가 있니? 확인해서 인증 처리를 한다. */
                            if( customerAuthIngInfo.PHONE == null ) {
                                if( validator.isDecimal(content) != true ) { // 숫자 비교해서 같은면
                                    re = kakaoSocket.findScenario("PHONE_NOK");
                                    // 혹시 두번 호출해서 오류가 올라오나 막아본다, 2017.10.18
                                    //if(re != null) kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                } else {
                                    Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Phone", content, user_key)]).then(function(results) {
                                        console.log("dbSaveCustomer call!");
                                    }).then(function() {
                                        re = kakaoSocket.findScenario("NAME");
                                        console.log("dbSaveCustomer call! ==> " + JSON.stringify(re));
                                    }).then(function() {
                                        if(re != null) kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                    }).done();
                                }
                            } else if( customerAuthIngInfo.PHONE != null && customerAuthIngInfo.NAME == null ) {
                                Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Name", content, user_key)]).then(function(results) {
                                    console.log("dbSaveCustomer call!");
                                    customerAuthIngInfo.NAME = content;
                                }).then(function() {
                                    // OTP && 기간계 연동 코드 추가
                                    Q.all([kakaoSocket.getMTEventJSONTypeTK001Request(customerAuthIngInfo.NAME, customerAuthIngInfo.PHONE, user_key, kakaoSocket.kakaoDb, null)]).then(function(results) {
                                        
                                        if( results != null && results == "success" ) {
                                            //re = results;
                                            console.log("if:rtnStr:" + results + "," + kakaoSocket.nOTP);
                                            Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Otp", kakaoSocket.nOTP, user_key)]).then(function(results) {
                                                console.log("dbSaveCustomer call!");
                                            }).done();
                                        } else {
                                            if( results == "E99999" || results == "E00001" || results == "E00002" ||
                                                results == "E00003" || results == "E00004" || results == "E10000" ||
                                                results == "E00005" || results == "E00006") {
                                                re = kakaoSocket.findScenario(results);
                                            } else {
                                                re = kakaoSocket.findScenario("SYS_ERR");
                                            }
                                            console.log("else:rtnStr:" + results + "," + kakaoSocket.nOTP);
                                            if( re != null ) {
                                                kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                                bFlag = false;
                                            }
                                        }
                                    }).then(function() {
                                        // callback(null, re);
                                        re = kakaoSocket.findScenario("AUTH");
                                        //20170824
                                        if( re != null && bFlag == true) {
                                            kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                            bFlag = false;
                                        }
                                    }).done();
                                }).then(function() {
                                    if( re != null && bFlag == true ) {
                                        //test20180227
                                        kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                        bFlag = false;
                                    }
                                }).done();
                            } else if( customerAuthIngInfo.PHONE != null && customerAuthIngInfo.NAME != null && customerAuthIngInfo.ETC1 != null ) {
                                if( customerAuthIngInfo.ETC1 == content ) {
                                    Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Auth", null, user_key)]).then(function(results) {
                                        console.log("dbSaveCustomer call!");
                                    }).then(function() {
                                        re = kakaoSocket.findScenario("AUTH_OK");
                                    }).then(function() {
                                        if( re != null )
                                            kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                                    }).done();
                                } else {
                                    // 인증번호 입력 오류 재입력 요청
                                    re = kakaoSocket.findScenario("AUTH_NOK");
                                }
                            } else {
                                re = kakaoSocket.findScenario("INPUT_ERR");
                            }
                        } else {
                            /* 인증 유도 */
                            re = kakaoSocket.findScenario("SESSION_ERR");
                        }

                    }
                    else { 
                        if( etc3 == "interface" && customerAuthOkInfo != null ) {
                            //20170824
                            re = null;
                            Q.all([kakaoSocket.getMTEventJSONTypeTK002Request( user_key, kakaoSocket.kakaoDb, null)]).then(function(results) {
                                if( results != null ) {
                                    console.log("rtnStr:" + results.length);
                                    if( results == "E99999" || results == "E00001" || results == "E00002" ||
                                        results == "E00003" || results == "E00004" || results == "E10000" ||
                                        results == "E00005" || results == "E00006") {
                                          re = kakaoSocket.findScenario(results);
                                    } else if( String(results).length > 6) {
console.log(JSON.stringify(results));
                                        var jsonData = JSON.parse(results);
                                        var amtCurInv = new Number();
                                        var amtUse = new Number();
                                        var amtDc = new Number();
                                        var amtSupply = new Number();
                                        var amtVat = new Number();
                                        var amtUnpmt = new Number();
                                        var amtTrunc = new Number();
                                        var amtPmt = new Number();
                                        var service: string = "";
                                        var name: string = "";
                                        var calcStartDay: string = "";
                                        var calcEndDay: string = "";
                                        var media: string = "";
                                        var financialName: string = "";
                                        var payMethod: string = "";
                                        
                                        if( jsonData != null && jsonData.list != null && jsonData.list.customer.length > 1 ) {
                                            var responseBody = jsonData.list.customer[0];
                                            console.log("responseBody:" + JSON.stringify(responseBody));

                                            for ( var i = 0; i < jsonData.list.customer.length; i++ ) {
                                                responseBody = jsonData.list.customer[i];
                                                service = service + responseBody.Invoices.invoice.Service;
                                                name = name + responseBody.Invoices.invoice.Name;
                                                amtCurInv = amtCurInv + responseBody.Invoices.invoice.AmtCurInv;
                                                amtUse = amtUse + responseBody.Invoices.invoice.AmtUse;
                                                amtDc = amtDc + responseBody.Invoices.invoice.AmtDc;
                                                amtSupply = amtSupply + responseBody.Invoices.invoice.AmtSupply;
                                                amtVat = amtVat + responseBody.Invoices.invoice.AmtVat;
                                                amtUnpmt = amtUnpmt + responseBody.Invoices.invoice.AmtUnpmt;
                                                amtTrunc = amtTrunc + responseBody.Invoices.invoice.AmtTrunc;
                                                amtPmt = amtPmt + responseBody.Invoices.invoice.AmtPmt;
                                                media = media + responseBody.Media;
                                                financialName = financialName + responseBody.FinancialName;
                                                payMethod = payMethod + responseBody.PayMethod;

                                                if (i == 0 ) {
                                                    calcStartDay = responseBody.Invoices.invoice.CalcStartDay;
                                                    calcEndDay = responseBody.Invoices.invoice.CalcEndDay;
                                                } else {
                                                    calcStartDay = calcStartDay < responseBody.Invoices.invoice.CalcStartDay ? calcStartDay : responseBody.Invoices.invoice.CalcStartDay;
                                                    calcEndDay = calcEndDay < responseBody.Invoices.invoice.CalcEndDay ? responseBody.Invoices.invoice.CalcEndDay : calcEndDay;
                                                }
                                                if ( i+1 < jsonData.list.customer.length ) {
                                                    service = service + ",";
                                                    name = name + ",";
                                                    media = media + ",";
                                                    financialName = financialName + ",";
                                                    payMethod = payMethod + ",";
                                                }
                                            }
                                        } else {
                                            var responseBody = jsonData.list.customer;
                                            console.log("responseBody:" + JSON.stringify(responseBody));
                                            service = service + responseBody.Invoices.invoice.Service;
                                            name = name + responseBody.Invoices.invoice.Name;
                                            amtCurInv = amtCurInv + responseBody.Invoices.invoice.AmtCurInv;
                                            amtUse = amtUse + responseBody.Invoices.invoice.AmtUse;
                                            amtDc = amtDc + responseBody.Invoices.invoice.AmtDc;
                                            amtSupply = amtSupply + responseBody.Invoices.invoice.AmtSupply;
                                            amtVat = amtVat + responseBody.Invoices.invoice.AmtVat;
                                            amtUnpmt = amtUnpmt + responseBody.Invoices.invoice.AmtUnpmt;
                                            amtTrunc = amtTrunc + responseBody.Invoices.invoice.AmtTrunc;
                                            amtPmt = amtPmt + responseBody.Invoices.invoice.AmtPmt;
                                            calcStartDay = responseBody.Invoices.invoice.CalcStartDay;
                                            calcEndDay = responseBody.Invoices.invoice.CalcEndDay;
                                            media = media + responseBody.Media;
                                            financialName = financialName + responseBody.FinancialName;
                                            payMethod = payMethod + responseBody.PayMethod;
                                        }

                                        var printString = "고객님 안녕하세요!" +
                                        "\r\n" + String(responseBody.Invoices.invoice.YyyymmInv).substring(4) + "월 요금내역은 다음과 같습니다" +
                                        "\r\n\r\n[기본 정보]" + 
                                        "\r\n" + "- 고객명 : " + responseBody.Name + //: "김두수"
                                        "\r\n" + "- 고객번호 : " + responseBody.Id + //: 1006218626
                                        "\r\n" + "- 서비스 상태 : " + responseBody.Status + //: "사용중"
                                        "\r\n" + "- 전화번호(1) : " + responseBody.Phone + //: "041-549-5938"
                                        "\r\n" + "- 전화번호(2) : " + responseBody.HandPhone + //: "010-4417-5938"
                                        "\r\n" + "- 이메일 : " + responseBody.Email + //: "dskim@tbroad.com"
                                        "\r\n\r\n[청구 정보]" + 
                                        "\r\n" + "- 납부자명 : " + responseBody.AccountName + //: "김두수"
                                        "\r\n" + "- 납부자번호 : " + responseBody.AccountId + //: 1001155633
                                        "\r\n" + "- 청구매체 : " + kakaoSocket.convertArrayCount(media) + //responseBody.Media + //: "이메일"
                                        "\r\n" + "- 은행/카드명 : " + kakaoSocket.convertArrayCount(financialName) + //responseBody.FinancialName + //: "신한카드"
                                        "\r\n" + "- 납부방법 : " + kakaoSocket.convertArrayCount(payMethod) +  //responseBody.PayMethod + //: "신용카드"
                                        "\r\n" + "- 납부예정일 : " + responseBody.IssueDate + //: 15
                                        "\r\n\r\n[" + String(responseBody.Invoices.invoice.YyyymmInv).substring(4) + "월 청구 정보]" + 
                                        "\r\n" + "- 사용일 : " + calcStartDay + " ~ " + calcEndDay + //: 20170731
                                        "\r\n" + "- 당월청구금액 : " + amtCurInv.toLocaleString("krw") + "원" + //: 6600 
                                        "\r\n" + "- 청구월 : " + responseBody.Invoices.invoice.YyyymmInv + //: 201708
                                        "\r\n" + "- 서비스명 : " + kakaoSocket.convertArrayCount(service) + //: "디지털방송"
                                        "\r\n" + "- 사용료 : " + amtUse.toLocaleString("krw") +  "원" + //: 27600
                                        "\r\n" + "- 할인금액 : " + amtDc.toLocaleString("krw") +  "원" + //: -21000
                                        "\r\n" + "- 청구금액 : " + amtSupply.toLocaleString("krw") +  "원" + //: 6000
                                        "\r\n" + "- 부가세 : " + amtVat.toLocaleString("krw") +  "원" + //: 600
                                        "\r\n" + "- 절사 : " + amtTrunc.toLocaleString("krw") +  "원" + //: 0
                                        "\r\n\r\n" + "감사합니다.";
                                        // "\r\n" + "- 상품명 : " + name + //: "I-DIGITAL HD_2012"
                                        //"\r\n" + "- 상품정보 : " + responseBody.Products + //: ""
                                        //"\r\n" + "- 주소 : " + responseBody.Address + //: "충청남도 아산시 신창면 행목로 152 대주아파트 102동 106호"
                                        // "\r\n" + "- 당월청구금액 : " + responseBody.Invoices.invoice.AmtCurInv.toLocaleString() + "원" + //: 6600
                                        // "\r\n" + "- 서비스명 : " + responseBody.Invoices.invoice.Service + //: "디지털방송"
                                        // "\r\n" + "- 상품명 : " + responseBody.Invoices.invoice.Name + //: "I-DIGITAL HD_2012"
                                        // "\r\n" + "- 사용료 : " + responseBody.Invoices.invoice.AmtUse.toLocaleString() +  "원" + //: 27600
                                        //  "\r\n" + "- 할인금액 : " + responseBody.Invoices.invoice.AmtDc.toLocaleString() +  "원" + //: -21000
                                        //  "\r\n" + "- 청구금액 : " + responseBody.Invoices.invoice.AmtSupply.toLocaleString() +  "원" + //: 6000
                                        //  "\r\n" + "- 부가세 : " + responseBody.Invoices.invoice.AmtVat.toLocaleString() +  "원" + //: 600
                                        //  "\r\n" + "- 미납액 : " + responseBody.Invoices.invoice.AmtUnpmt.toLocaleString() +  "원" + //: 0
                                        //  "\r\n" + "- 절삭 : " + responseBody.Invoices.invoice.AmtTrunc +  "원" + //: 0
                                        //  "\r\n" + "- 납부금액 : " + responseBody.Invoices.invoice.AmtPmt.toLocaleString() + "원" ; //: 6600
                                        // "\r\n" + "- 상품정보 : " + responseBody.Products + //: ""
                                        //"\r\n" + "- 상품정보 : " + responseBody.Products + //: ""
                                        // "\r\n" + "Social    : " + responseBody.Social + //: "N"
                                        // "\r\n" + "- 총 청구금액 : " + responseBody.SumAmtCurInv + //: ""
                                        //"\r\n" + "계열사코드   : " + responseBody.IdSo + //: 4200
                                        //"\r\n" + "은행/카드번호 : " + responseBody.Account + //: "451842120342****"
                                        // "\r\n" + "- 총 미납금액 : " + responseBody.SumAmtCurNonpmt + //: ""
                                        // "\r\n" + "- 납부금액 : " + amtPmt.toLocaleString("krw") + "원" + //: 6600
                                        // "\r\n" + "- 미납액 : " + amtUnpmt.toLocaleString("krw") +  "원" + //: 0
                                        re = {"keyboard":{"buttons":["처음으로"], "type":"buttons"},"message":{"text":printString}};
                                    } else {
                                        re = kakaoSocket.findScenario("SYS_ERR");
                                    }
                                }
                            }).then(function() {
                                // callback(null, re);
                                if( re != null )
                                    kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                            }).done();
                        } else if( etc3 == "interface" && customerAuthOkInfo == null ) {
                            re = kakaoSocket.findScenario("PHONE");
                            
                            Q.all([kakaoSocket.kakaoDb.dbClearCustomer(user_key)]).then(function(results) {
                                console.log("dbClearCustomer call!");
                            }).then(function() {
                                Q.all([kakaoSocket.kakaoDb.dbSaveCustomer("Init", null, user_key)]).then(function(results) {
                                    console.log("dbSaveCustomer call!");
                                }).done();
                            }).done();
                        } else {
                            console.log("re:" + JSON.stringify(re));
                        }
                    }
                }).then(function() {
                    if( re != null )
                        kakaoSocket.insertHistoryAndCallback(content, user_key, re, null, function(err, data){callback(err, data);});
                }).done();
            }).done();
        } else {
            callback("user Key 또는 입력 정보가 NULL 입니다.", this.findScenario("SYS_ERR"));
        }
    }

    public setStartButton(res_message: any, step: any): any {
        var re = res_message;
        var msg = JSON.parse(res_message);
        if( step != '1' ) {
            if( msg.keyboard.buttons && msg.keyboard.buttons != null /*&& msg.keyboard.buttons.length > 0*/ ) {
                msg.keyboard.buttons.push("처음으로");
                re = JSON.stringify(msg);
            } else { /* 왜 이걸 했을까? */
                msg.keyboard.push("{\"buttons\":[\"일반 문의\"]}");
                re = JSON.stringify(msg);
            }
        }

        return re;
    }

    public insertHistoryAndCallback(content: string, user_key: string, re: any, err:any, callback: any) {
        var Q = require('q');
        Q.all([this.kakaoDb.dbSaveHistory(content, user_key, re)]).then(function(results) {
            console.log(JSON.stringify(results));
        }).then(function() {
            console.log("insertHistoryAndCallback:" + err + "," + JSON.stringify(re));
            callback(err, re);
        }).done();
    }

    // public checkCustomerInfo(rtnStr: any): any {
    //     var updateType = null;
    //     var contentValidation = null;
    //     var re = null;

    //     if( rtnStr == null) {
    //         updateType = "INS_PHONE";
    //         re = this.findScenario("PHONE");
    //         return re;
    //     } else if (rtnStr != null && rtnStr.PHONE == null ) {
    //         updateType = "UPD_PHONE";
    //         re = this.findScenario("PHONE");
    //         return re;
    //     } else if (rtnStr != null && rtnStr.PHONE != null && rtnStr.NAME == null ) {
    //         updateType = "NAME";
    //         re = this.findScenario("NAME");
    //         return re;
    //     } else if (rtnStr != null && rtnStr.PHONE != null && rtnStr.NAME != null && rtnStr.YN_AUTH == 'N' ) {
    //         updateType = "AUTH";
    //         re = this.findScenario("AUTH");
    //     } else if (rtnStr != null && rtnStr.PHONE != null && rtnStr.NAME != null && rtnStr.YN_AUTH == 'Y' ) {
    //         updateType = "AUTH_OK";
    //         re = null;
    //         return re;
    //     } else {
    //         re = this.findScenario("AUTH_NOK");
    //     }

    //     return re;
    // }

    public getMTEventJSONTypeTK001Request(name:string, phone:string, uniqueid:string, pool:any, rtnStr:any): string {
        var Q      = require("q");
        var deferred = Q.defer();
        // local case
        this.ls = this.spawn('/Users/gotaejong/projects/WorkspacesHTML5/tmsg-v5/shorturl');
        //this.ls = this.spawn('/Users/gotaejong/Addondisk/tmsg-v3/shorturl');
        // linux case
        //this.ls = this.spawn('/home/proidea/workspaceHTML5/tmsg-v5/shorturl');
        // tbroad case
        //this.ls = this.spawn('/home/icr/201708/tmsg-v3/shorturl');
        var mtIP = this.mtIP;
        var mtPort = this.mtPort;
        this.ls.stdout.on(
            'data', (data) => {
                this.nOTP = data;
                if( this.nOTP != null ) {
                    var requestBody = this.setTK001RequestData(TK001Request, name, phone, uniqueid, this.nOTP);
                    var sendData = this.setTK001RequestHeader( JSON.stringify(requestBody));

                    console.log('CONNECTED TO: ' + mtIP + ':' + mtPort + "," + sendData);
                    var client = new this.net.Socket();
                    client.setTimeout(10000);
                    client.connect(mtPort, mtIP, function () {
                        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
                        client.write(sendData);
                    });
                    // Add a 'data' event handler for the client socket
                    // data is what the server sent to this socket
                    client.on('data', function (data) {
                        console.log("data:" + data);
                        var str = new String(data);
                        //test 0000000102TK00120170823230327201708232303281E99999
                        var returnCode = str.substring(44).substring(0, 6);
console.log("returnCode:" + returnCode);
                        if( returnCode == "E00000")
                            deferred.resolve("success");
                        else
                            deferred.resolve(returnCode);

                        client.destroy();
                    });
                    // Add a 'close' event handler for the client socket
                    client.on('close', function () {
                        console.log('Connection closed');
                        //
                        //deferred.promise;
                    });

                    client.on('timeout', function() {
                        console.log('Socket Timeout'); 
                        deferred.resolve("timeout");
                    })

                    client.on('error', function(error) {
                        console.log('Socket Error:' + error); 
                        deferred.resolve("socketerr");
                    })
                }
                else {
                    deferred.resolve("syscallerr");
                }
            }
        );

        this.ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            deferred.resolve("syscallerr");
        // retry ? 
        });

        this.ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            //deferred.resolve("success");
            //
            //deferred.promise;
        });

        return deferred.promise;
    }

    public getMTEventJSONTypeTK002Request(uniqueid:string, pool:any, rtnStr:any): string {
        var Q      = require("q");
        var deferred = Q.defer();
        var readBuffer:string;
        var bytes = require('utf8-byte-length');

        var mtIP = this.mtIP;
        var mtPort = this.mtPort;

        var requestBody = this.setTK002RequestData(TK002Request, uniqueid, "0");
        var sendData = this.setTK002RequestHeader( JSON.stringify(requestBody));

        // var sendData = messageSize + sendMessage;
        console.log('CONNECTED TO: ' + mtIP + ':' + mtPort + "," + sendData);
        readBuffer = "";
        var client = new this.net.Socket();
        client.setTimeout(1200);
        client.setEncoding('utf8');
        client.setNoDelay(true);
        //client.setKeepAlive(true,1200);
        client.connect(mtPort, mtIP, function () {
            // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
            client.write(sendData);
        });

        // Add a 'data' event handler for the client socket
        // data is what the server sent to this socket
        client.on('data', function (data) {
            
            readBuffer = readBuffer + data;
            console.log(readBuffer);
            //client.destroy();
        });//.resume().on('data', function (data) {console.log("2nd data:" + data.toString());});
        // Add a 'close' event handler for the client socket
        client.on('close', function () {
            console.log('Connection closed');
            
        });

        client.on('timeout', function() {
            console.log('Socket Timeout'); 
            // deferred.resolve("timeout");
            var returnCode = readBuffer.substring(44).substring(0, 6);
            console.log("returnCode:" + returnCode);
            if( returnCode == "E00000") {
                var returnJSON = readBuffer.substring(100).substring(0);
                deferred.resolve(returnJSON);
            }
            else if( String(returnCode).length > 1 ) {
                deferred.resolve(returnCode);
            } else {
                //client.setNoDelay(true); 동 코드를 넣지 않을 경우 Timeout이 두번 발생할 경우 문제가 있다. 
                //deferred.resolve("E99999");
            }
        });

        client.on('error', function(error) {
            console.log('Socket Error:' + error); 
            deferred.resolve("socketerr");
        });

        return deferred.promise;
    }

    public getMTEventJSONTypeTK003Request(uniqueid:string, pool:any, rtnStr:any): string {
        var Q      = require("q");
        var deferred = Q.defer();
        var readBuffer:string;
        var bytes = require('utf8-byte-length');

        var mtIP = this.mtIP;
        var mtPort = this.mtPort;

        var requestBody = this.setTK003RequestData(TK003Request, uniqueid);
        var sendData = this.setTK003RequestHeader( JSON.stringify(requestBody));

        // var sendData = messageSize + sendMessage;
        console.log('CONNECTED TO: ' + mtIP + ':' + mtPort + "," + sendData);
        readBuffer = "";
        var client = new this.net.Socket();
        client.setTimeout(1200);
        client.setEncoding('utf8');
        client.setNoDelay(true);
        //client.setKeepAlive(true,1200);
        client.connect(mtPort, mtIP, function () {
            // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
            client.write(sendData);
        });

        // Add a 'data' event handler for the client socket
        // data is what the server sent to this socket
        client.on('data', function (data) {
            
            readBuffer = readBuffer + data;
            console.log(readBuffer);
            //client.destroy();
        });//.resume().on('data', function (data) {console.log("2nd data:" + data.toString());});
        // Add a 'close' event handler for the client socket
        client.on('close', function () {
            console.log('Connection closed');
            
        });

        client.on('timeout', function() {
            console.log('Socket Timeout'); 
            // deferred.resolve("timeout");
            var returnCode = readBuffer.substring(44).substring(0, 6);
            console.log("returnCode:" + returnCode);
            if( returnCode == "E00000") {
                var returnJSON = readBuffer.substring(100).substring(0);
                deferred.resolve(returnJSON);
            }
            else if( String(returnCode).length > 1 ) {
                deferred.resolve(returnCode);
            } else {
                //client.setNoDelay(true); 동 코드를 넣지 않을 경우 Timeout이 두번 발생할 경우 문제가 있다. 
                //deferred.resolve("E99999");
            }
        });

        client.on('error', function(error) {
            console.log('Socket Error:' + error); 
            deferred.resolve("socketerr");
        });

        return deferred.promise;
    }

    private getNowyyyymmddhhmmss(): string {
        var now = new Date();
        var yyyy = now.getFullYear();
        var mm = now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1); // getMonth() is zero-based
        var dd  = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
        var hh = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
        var min = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        var ss = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
        return "".concat("" + yyyy).concat("" + mm).concat("" + dd).concat("" + hh).concat("" + min).concat("" + ss);
    }

    public getNowmSevendays(): string {
        var now = new Date();
        var mm;        

        if( now.getDate() > 7 ) {
            mm = now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1); // getMonth() is zero-based
        } else {
            mm = (now.getMonth() -1) < 9 ? "0" + ((now.getMonth() - 1) + 1) : ((now.getMonth() - 1) + 1); // getMonth() is zero-based
        }
        
        return "".concat("" + mm).concat("" + "월");
    }

    public convertArrayCount(input: string): string { 

        var array = input.split(",");
        var results = new Array();
        for (var j=0; j<array.length; j++) {

            var key = array[j].toString();
            if( results.indexOf(key) == -1 )
                results.push(key);
            if (results[key] != null) {

                results[key] = results[key] + 1;
            } else {

                results[key] = 1;
            }
        }

        var str = "";

        for (var i = 0; i < results.length; i++) {
            // str = str + "\t" + results[results[i].toString()] + ": " + "\t" + results[i] + "\n";
            if( i== 0 ) {
                str = str + results[i] + " ";
            } else {
                str = str + results[i] + " " + results[results[i].toString()] + "개";
            }
            
            if ( i+1 < results.length ) {
                str = str + ",";
            }
        }

        return str;
    }

    public setTK001RequestHeader(requestBody: string ): string {
        var bytes = require('utf8-byte-length');

        // var Length = 100 + requestBody.length;
        var Length = 100 + bytes(requestBody);
        var Type = "TK001";
        var SendDate = this.getNowyyyymmddhhmmss();
        var ReSendDate = this.getNowyyyymmddhhmmss();
        var Flag = "S";
        var ResultCode = "E00000";
        var filler = " ";
//console.log("Length:" + Length + "(" + (100 + requestBody.length) + ")");
        return this.lpad(Length, 10) +
            Type + 
            SendDate +
            ReSendDate +
            Flag +
            ResultCode +
            this.lpadBlank(filler, 50) +
            requestBody;
    }

    public setTK001RequestData(reqJsondata: TK001RequestConstructor, name:string, phone:string, uniqueid:string, otpnum:number): TK001Request {
        return new reqJsondata(name, phone, uniqueid, "SMS", "KAKAO", "인증문자 번호는 " + otpnum + "입니다! 5분이내 입력을 부탁 드립니다.", phone, "07081870000");

    }

    public setTK002RequestHeader(requestBody: string ): string {
        var bytes = require('utf8-byte-length');

        // var Length = 100 + requestBody.length;
        var Length = 100 + bytes(requestBody);
        var Type = "TK002";
        var SendDate = this.getNowyyyymmddhhmmss();
        var ReSendDate = this.getNowyyyymmddhhmmss();
        var Flag = "S";
        var ResultCode = "E00000";
        var filler = " ";
//console.log("Length:" + Length + "(" + (100 + requestBody.length) + ")");
        return this.lpad(Length, 10) +
            Type + 
            SendDate +
            ReSendDate +
            Flag +
            ResultCode +
            this.lpadBlank(filler, 50) +
            requestBody;
    }

    public setTK003RequestHeader(requestBody: string ): string {
        var bytes = require('utf8-byte-length');

        // var Length = 100 + requestBody.length;
        var Length = 100 + bytes(requestBody);
        var Type = "TK003";
        var SendDate = this.getNowyyyymmddhhmmss();
        var ReSendDate = this.getNowyyyymmddhhmmss();
        var Flag = "S";
        var ResultCode = "E00000";
        var filler = " ";
console.log("Length:" + Length + "(" + (100 + requestBody.length) + ")");
        return this.lpad(Length, 10) +
            Type + 
            SendDate +
            ReSendDate +
            Flag +
            ResultCode +
            this.lpadBlank(filler, 50) +
            requestBody;
    }

    public setTK002RequestData(reqJsondata: TK002RequestConstructor, uniqueid:string, monthcnt:string): TK002Request {
        return new reqJsondata(uniqueid,monthcnt);

    }

    public setTK002ResponseData(reqJsondata: TK002ResponseConstructor, customer: TK002_RESPONSE_customer, code: TK002_RESPONSE_code ): TK002Response {
        return new reqJsondata(customer, code);
    }

    public setTK003RequestData(reqJsondata: TK003RequestConstructor, uniqueid:string): TK003Request {
        return new reqJsondata(uniqueid);

    }

    public setTK003ResponseData(reqJsondata: TK003ResponseConstructor, Seq:string, Msg:string ): TK003Response {
        return new reqJsondata(Seq, Msg);
    }

    // public setTK002ResponseData(reqJsondata: TK002ResponseConstructor, list:TK002_RESPONSE_list): TK002Response {
    //     return new reqJsondata(list);
    // }

    public lpad(num:number, size:number): string {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    public lpadBlank(char:string, size:number): string {
        var s = char+"";
        while (s.length < size) s = " " + s;
        return s;
    }
}


export interface TB_AUTOCHAT_SCENARIO {
    SEQ: number;
    STEP: number;
    TRUN: number;
    REQ_MESSAGE: string;
    RES_MESSAGE: string;
    WRTDATA: string;
    ETC1: string;
    ETC2: string;
    ETC3: string;
}
