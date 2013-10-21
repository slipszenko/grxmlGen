// Create a namespace for the program, if not already created
var szko = szko ? szko : {};

szko.grxmlGen = (function () {
    "use strict";

    var createCommandParameterString = function(subRules) {
        // Build up the parameters of the array recursively, so that any number of parameters can be added
        var grammarString = '<item repeat="1"><one-of>';
        for(var i = 0; i < subRules.length; i++) {
            if(typeof subRules[i] !== "undefined"
                && typeof subRules[i] === "object") {
                grammarString += createCommandParameterString(subRules[i]);
            } else {
                grammarString += '<item>' + subRules[i] + '</item>'
            }
        }
        grammarString += '</item></one-of>';
        return grammarString;
    },


    createCommandString = function(rules) {
        // Loop over all starting words, creating a start point for the grammar
        // aka, the main command word
        var grammarString = "";
        for(var i = 0; i < rules.length; i++) {
            grammarString += '<item repeat="0-">';
            grammarString += rules[i][0];
            // If there is an array then this specifies the parameters, build these
            if(typeof rules[i][1] !== "undefined"
                && typeof rules[i][1] === "object") {
                grammarString += createCommandParameterString(rules[i][1]);
            }
            grammarString += '</item>';
        }
        return grammarString;
    },


    // Returns a file blob with the grammar rules in
    generateGrammar = function(rules, asBlob) {
        asBlob = (typeof asBlob === "undefined") ? false : asBlob;

        // Start the grammar
        var grammarString = '<grammar mode="voice" xml:lang="en-US" tag-format="semantics/1.0" version="1.0" root="location">';
        grammarString += '<rule id="commands">';

        grammarString += createCommandString(rules);

        // Add the closing string
        grammarString += '</rule></grammar>';

        // Return as a string if requested
        if(!asBlob) {
            return grammarString;
        }

        // Return as a blob instead
        var grammarParts = [grammarString];
        var grammarBlob = new Blob(grammarParts, {type : 'application/srgs, application/srgs+xml'});
        var url = URL.createObjectURL(grammarBlob);
        return url;
    };


    // Return exposes some private functions as public
    return {
        generateGrammar : generateGrammar.bind(szko.grxmlGen)
    };

}());