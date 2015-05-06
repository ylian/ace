/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SwiftHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start:
       [ { token: 'comment.block.swift',
           regex: '/\\*',
           push:
            [ { token: 'comment.block.swift', regex: '\\*/', next: 'pop' },
              { defaultToken: 'comment.block.swift' } ] },
         { token: 'comment.line.swift',
           regex: '//',
           push:
            [ { token: 'comment.line.swift', regex: '$\\n?', next: 'pop' },
              { defaultToken: 'comment.line.swift' } ] },
         { token: 'string.quoted.double.swift',
           regex: '"',
           push:
            [ { token: 'keyword.operator.swift',
                regex: '\\\\\\(',
                push:
                 [ { token: 'keyword.operator.swift', regex: '\\+' },
                   { token: 'keyword.operator.swift', regex: '\\)', next: 'pop' },
                   { defaultToken: 'string-interpolation' } ] },
              { token: 'string.quoted.double.swift', regex: '"', next: 'pop' },
              { defaultToken: 'string.quoted.double.swift' } ] },
         { token: 'comment.punctuation.comma.swift', regex: ',' },
         { caseInsensitive: true,
           token: 'keyword.reserved.swift',
           regex: '\\b(class|deinit|enum|extension|func|import|init|let|protocol|static|struct|subscript|typealias|var|break|case|continue|default|do|else|fallthrough|if|in|for|return|switch|where|while|as|dynamicType|is|new|super|self|Self|Type|__COLUMN__|__FILE__|__FUNCTION__|__LINE__|associativity|didSet|get|infix|inout|left|mutating|none|nonmutating|operator|override|postfix|precedence|prefix|right|set|unowned|weak|willSet)\\b' },
         { token: 'string.boolean.swift', regex: '\\b(true|false)\\b' },
         { token: 'constant.numeric.swift',
           regex: '(-|\\.)?\\b[0-9]+(\\.[0-9]+)?\\b' },
         { token: 'keyword.operator.swift',
           regex: '\\+|-|\\*|/|%|=|!|\\^|~|\\||\\?|<|>|&' },
         { token: 'meta.tag.swift', regex: '\\w+(?=\\s*:)' },
         { token: 'support.function.swift', regex: '\\w+(?=\\s*\\()' } ] }

    this.normalizeRules();
};

oop.inherits(SwiftHighlightRules, TextHighlightRules);

exports.SwiftHighlightRules = SwiftHighlightRules;
});
