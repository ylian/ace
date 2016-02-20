define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var XojoHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var keywords = (
        "AddHandler|AddressOf|Aggregates|And|Array|As|Assigns|Attributes|Break|ByRef|ByVal|Call|Case|Catch|Class|Const|Continue|CType|Declare|Delegate|Dim|Do|DownTo|Each|Else|Elseif|End|Enum|Event|Exception|Exit|Extends|False|Finally|For|Function|Global|GoTo|Handles|If|Implements|In|Inherits|Inline68K|Interface|Is|IsA|Lib|Loop|Me|Mod|Module|Namespace|New|Next|Nil|Not|Object|Of|Optional|Or|ParamArray|Private|Property|Protected|Public|Raise|RaiseEvent|Rect|Redim|RemoveHandler|Return|Select|Self|Shared|Soft|Static|Step|Sub|Super|Then|To|True|Try|Until|Using|Wend|While|With|WeakAddressOf|Xor"
    );
    keywords += '|' + keywords.toLowerCase();

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords
    }, "identifier");

    this.$rules = {
        start: [
        {
            token: "comment",
            regex: /('|\/\/|\brem\b).*/
        },
        {
            token: "string",
            regex: /\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\"/
        },
        {
            token: "keyword.operator",
            regex: /[-+*\/]|=?\&lt;|=?\&gt;|=/
        },
        {
            token: "constant.numeric",
            regex: /\b(?:[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?)|(?:0x[a-f0-9]+)\b/
        },
        {
            token: keywordMapper,
            regex: "[a-zA-Z][a-zA-Z0-9_]*\\b"
        }]
    }
    
    this.normalizeRules();
};

oop.inherits(XojoHighlightRules, TextHighlightRules);

exports.XojoHighlightRules = XojoHighlightRules;
});
