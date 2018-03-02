"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
// App component
var app_component_1 = require("./app.component");
var header_1 = require("./header");
var body_1 = require("./body");
var tailer_1 = require("./tailer");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule // by Default imports
            ],
            declarations: [
                app_component_1.AppComponent,
                header_1.HeaderComponent,
                body_1.BodyComponent,
                tailer_1.TailerComponent
            ],
            exports: [],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map