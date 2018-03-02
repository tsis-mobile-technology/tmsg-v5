"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var mongoose = require("mongoose");
var moment = require("moment");
var message_model_1 = require("./message.model");
var RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    created: Date
});
var RoomModel = mongoose.model('Room', RoomSchema);
var Room = /** @class */ (function () {
    function Room(room) {
        this.name = room.name;
        this.created = moment(room.created).toDate();
    }
    Room.find = function (name) {
        return new rxjs_1.Observable(function (observer) {
            RoomModel.findOne({ name: name }, function (error, room) {
                if (!error && room) {
                    observer.next(new Room(room));
                }
                observer.complete();
            });
        });
    };
    Room.create = function (name) {
        return new rxjs_1.Observable(function (observer) {
            var created = new Date();
            RoomModel.create({ name: name, created: created }, function (error, room) {
                if (!error && room) {
                    observer.next(new Room(room));
                    observer.complete();
                }
                else {
                    observer.error(new Error());
                }
            });
        });
    };
    Room.list = function () {
        return new rxjs_1.Observable(function (observer) {
            RoomModel.find({}, function (error, rooms) {
                if (!error && rooms) {
                    observer.next(rooms.map(function (room) { return new Room(room); }));
                }
                else {
                    observer.next([]);
                }
                observer.complete();
            });
        });
    };
    Room.prototype.remove = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            RoomModel.remove({ name: _this.name }).exec();
            message_model_1.Message.remove(_this.name).subscribe(function (x) { }, function (error) { return observer.error(new Error(error)); }, function () { return observer.complete(); });
        });
    };
    Room.prototype.messages = function () {
        return message_model_1.Message.list(this.name);
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.model.js.map