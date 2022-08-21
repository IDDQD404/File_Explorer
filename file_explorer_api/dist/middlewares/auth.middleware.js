"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const Secret_key_1 = require("../auth/Secret_key");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        console.log('Restricted request...');
        if (req.headers.authorization) {
            console.log(req.headers.authorization.split(' ')[1]);
            if (jwt.verify(req.headers.authorization.split(' ')[1], Secret_key_1.secret_key.secret)) {
                console.log('This token is valid');
                next();
            }
            else {
                res.send({ "error": "Not valid token" });
                console.log('Not valid token');
            }
        }
        else {
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=auth.middleware.js.map