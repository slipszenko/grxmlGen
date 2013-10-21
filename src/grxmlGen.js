// Create a namespace for the program, if not already created
var szko = szko ? szko : {};

szko.grxmlGen = (function () {
    "use strict";

    // Private vars
    var things = [],


    createCommandParameterString = function(subRules) {
        var grammarString = '<item repeat="1"><one-of>';
        for(var i = 0; i < subRules.length; i++) {
            grammarString += '<item>' + subRules[i] + '</item>'
        }
        grammarString += '</item></one-of>';
        return grammarString;
    },


    createCommandString = function(rules) {
        var grammarString = "";
        for(var i = 0; i < rules.length; i++) {
            grammarString += '<item repeat="0-">';
            grammarString += rules[i][0];
            if(typeof rules[i][1] !== "undefined"
                && typeof rules[i][1] === "object") {
                grammarString += createCommandParameterString(rules[i][1]);
            }
            grammarString += '</item>';
        }
        return grammarString;
    },


    // Returns a file blob with the grammar rules in
    generateGrammar = function(rules, asString) {
        asString = (typeof asString === "undefined") ? false : true;
        console.log(rules);

        // Start the grammar
        var grammarString = '<grammar mode="voice" xml:lang="en-US" tag-format="semantics/1.0" version="1.0" root="location">';
        grammarString += '<rule id="commands">';

        grammarString += createCommandString(rules);

        // Add the final string
        grammarString += '</rule></grammar>';


        // Return as a string if requested
        if(asString) {
            return grammarString;
        }

        // Return as a blob instead
    };


    // Return exposes some private functions as public
    return {
        generateGrammar : generateGrammar.bind(szko.grxmlGen)
    };

}());