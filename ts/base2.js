var BEnum;
(function (BEnum) {
    BEnum[BEnum["Top"] = 0] = "Top";
    BEnum[BEnum["Left"] = 1] = "Left";
})(BEnum || (BEnum = {}));
var bEnum = BEnum[BEnum.Top];
console.log(bEnum);
var BClass = /** @class */ (function () {
    function BClass() {
    }
    return BClass;
}());
var bClass = {
    fun: function (age) {
        return age;
    }
};
var BClassInstance = /** @class */ (function () {
    function BClassInstance() {
        this.bClass = {
            fun: function (age) {
                return age;
            }
        };
    }
    return BClassInstance;
}());
var bClassInstance = new BClassInstance();
console.log(bClassInstance.bClass.fun(2));
