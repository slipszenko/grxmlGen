// Create a namespace for the program, if not already created
var szko = szko ? szko : {};

szko.grxmlGen = (function () {
    "use strict";

    // Private vars
    var rules = [],


    init = function() {
        console.log("grxmlGen Initiated");
    };


    // Return exposes some private functions as public
    return {
        init : init.bind(szko.grxmlGen)
    };

}());