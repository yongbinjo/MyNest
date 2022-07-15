"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CatSchema = exports.Cat = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var class_validator_1 = require("class-validator");
var options = {
    timestamps: true
};
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true, unique: true }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)()
    ], Cat.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], Cat.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], Cat.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsString)()
    ], Cat.prototype, "imgUrl");
    Cat = __decorate([
        (0, mongoose_1.Schema)(options)
    ], Cat);
    return Cat;
}(mongoose_2.Document));
exports.Cat = Cat;
exports.CatSchema = mongoose_1.SchemaFactory.createForClass(Cat);
exports.CatSchema.virtual('readOnlyData').get(function () {
    return {
        id: this.id,
        email: this.email,
        name: this.name
    };
});
