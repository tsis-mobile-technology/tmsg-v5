"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var mongoose = require("mongoose");
var moment = require("moment");
var room_model_1 = require("./room.model");
var MessageSchema = new mongoose.Schema({
    room: {
        type: String,
        index: true
    },
    created: Date,
    from: String,
    to: String,
    message: String
});
var MessageModel = mongoose.model('Message', MessageSchema);
var Message = /** @class */ (function () {
    function Message(message) {
        this.room = message.room;
        this.created = moment(message.created).toDate();
        this.from = message.from;
        this.to = message.to;
        this.message = message.message;
    }
    Message.create = function (message) {
        return new rxjs_1.Observable(function (observer) {
            room_model_1.Room.find(message.room).subscribe(function (room) {
                message.created = new Date();
                MessageModel.create(message, function (error, message) {
                    if (!error && message) {
                        observer.next(new Message(message));
                    }
                    observer.complete();
                });
            }, function (error) { return observer.error(new Error()); });
        });
    };
    Message.list = function (room) {
        return new rxjs_1.Observable(function (observer) {
            MessageModel.find({ room: room }, function (error, messages) {
                if (!error && messages) {
                    observer.next(messages.map(function (message) { return new Message(message); }));
                }
                else {
                    observer.next([]);
                }
                observer.complete();
            });
        });
    };
    Message.remove = function (room) {
        return new rxjs_1.Observable(function (observer) {
            MessageModel.remove({ room: room }, function (error) {
                if (!error) {
                    observer.complete();
                }
                else {
                    observer.error(new Error(error));
                }
            });
        });
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.model.js.map