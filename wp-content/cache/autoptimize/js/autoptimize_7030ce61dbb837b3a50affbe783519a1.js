!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
/*!
* dependencyLibs/inputmask.dependencyLib.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-65
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "../global/window", "../global/document" ], factory) : "object" == typeof exports ? module.exports = factory(require("../global/window"), require("../global/document")) : window.dependencyLib = factory(window, document);
}(function(window, document) {
    function indexOf(list, elem) {
        for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
        return -1;
    }
    function type(obj) {
        return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[class2type.toString.call(obj)] || "object" : typeof obj;
    }
    function isWindow(obj) {
        return null != obj && obj === obj.window;
    }
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, ltype = type(obj);
        return "function" !== ltype && !isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === ltype || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj));
    }
    function isValidElement(elem) {
        return elem instanceof Element;
    }
    function DependencyLib(elem) {
        return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void (void 0 !== elem && null !== elem && elem !== window && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector(elem), 
        void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem);
    }
    for (var class2type = {}, classTypes = "Boolean Number String Function Array Date RegExp Object Error".split(" "), nameNdx = 0; nameNdx < classTypes.length; nameNdx++) class2type["[object " + classTypes[nameNdx] + "]"] = classTypes[nameNdx].toLowerCase();
    return DependencyLib.prototype = {
        on: function(events, handler) {
            if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
                var nsEvent = _events[endx].split(".");
                !function(ev, namespace) {
                    elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler), 
                    eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], 
                    eventRegistry[ev][namespace].push(handler);
                }(nsEvent[0], nsEvent[1] || "global");
            }
            return this;
        },
        off: function(events, handler) {
            if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = function(ev, namespace) {
                var hndx, hndL, evts = [];
                if (ev.length > 0) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
                    ev: ev,
                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                    handler: eventRegistry[ev][namespace][hndx]
                }); else evts.push({
                    ev: ev,
                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                    handler: handler
                }); else if (namespace.length > 0) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0, 
                hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: eventRegistry[evNdx][nmsp][hndx]
                }); else evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: handler
                });
                return evts;
            }(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) !function(ev, namespace, handler) {
                if (ev in eventRegistry == 1) if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler), 
                "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
            }(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
            return this;
        },
        trigger: function(events) {
            if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [ events.type ], endx = 0; endx < _events.length; endx++) {
                var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                if (void 0 !== document && "global" === namespace) {
                    var evnt, i, params = {
                        bubbles: !0,
                        cancelable: !0,
                        detail: Array.prototype.slice.call(arguments, 1)
                    };
                    if (document.createEvent) {
                        try {
                            evnt = new CustomEvent(ev, params);
                        } catch (e) {
                            (evnt = document.createEvent("CustomEvent")).initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                        }
                        events.type && DependencyLib.extend(evnt, events), elem.dispatchEvent(evnt);
                    } else (evnt = document.createEventObject()).eventType = ev, events.type && DependencyLib.extend(evnt, events), 
                    elem.fireEvent("on" + evnt.eventType, evnt);
                } else if (void 0 !== eventRegistry[ev]) if (arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]), 
                "global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
            }
            return this;
        }
    }, DependencyLib.isFunction = function(obj) {
        return "function" === type(obj);
    }, DependencyLib.noop = function() {}, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function(elem, arr, i) {
        return null == arr ? -1 : indexOf(arr, elem);
    }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function(obj) {
        return "object" === type(obj) && !obj.nodeType && !isWindow(obj) && !(obj.constructor && !class2type.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"));
    }, DependencyLib.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || DependencyLib.isFunction(target) || (target = {}), 
        i === length && (target = this, i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        target !== (copy = options[name]) && (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && DependencyLib.isArray(src) ? src : []) : clone = src && DependencyLib.isPlainObject(src) ? src : {}, 
        target[name] = DependencyLib.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, DependencyLib.each = function(obj, callback) {
        var i = 0;
        if (isArraylike(obj)) for (var length = obj.length; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++) ; else for (i in obj) if (!1 === callback.call(obj[i], i, obj[i])) break;
        return obj;
    }, DependencyLib.map = function(elems, callback) {
        var value, i = 0, length = elems.length, ret = [];
        if (isArraylike(elems)) for (;i < length; i++) null != (value = callback(elems[i], i)) && ret.push(value); else for (i in elems) null != (value = callback(elems[i], i)) && ret.push(value);
        return [].concat(ret);
    }, DependencyLib.data = function(owner, key, value) {
        if (void 0 === value) return owner.__data ? owner.__data[key] : null;
        owner.__data = owner.__data || {}, owner.__data[key] = value;
    }, "function" == typeof window.CustomEvent ? DependencyLib.Event = window.CustomEvent : (DependencyLib.Event = function(event, params) {
        params = params || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var evt = document.createEvent("CustomEvent");
        return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), 
        evt;
    }, DependencyLib.Event.prototype = window.Event.prototype), DependencyLib;
});
/*!
* inputmask.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-65
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "./dependencyLibs/inputmask.dependencyLib", "./global/window", "./global/document" ], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./global/window"), require("./global/document")) : window.Inputmask = factory(window.dependencyLib || jQuery, window, document);
}(function($, window, document, undefined) {
    function Inputmask(alias, options, internal) {
        if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
        this.el = undefined, this.events = {}, this.maskset = undefined, this.refreshValue = !1, 
        !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}).alias = alias, 
        this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && options.definitions !== undefined, 
        this.userOptions = options || {}, this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, options, this.opts));
    }
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, undefined, opts), 
        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
        !1);
    }
    function generateMaskSet(opts, nocache) {
        function generateMask(mask, metadata, opts) {
            var regexMask = !1;
            if (null !== mask && "" !== mask || ((regexMask = null !== opts.regex) ? mask = (mask = opts.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (regexMask = !0, 
            mask = ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 
            opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }
            var masksetDefinition, maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
            return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? (masksetDefinition = {
                mask: mask,
                maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                validPositions: {},
                _buffer: undefined,
                buffer: undefined,
                tests: {},
                metadata: metadata,
                maskLength: undefined
            }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
            masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), 
            masksetDefinition;
        }
        if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                opts.keepStatic = null === opts.keepStatic || opts.keepStatic;
                var altMask = opts.groupmarker.start;
                return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                    altMask.length > 1 && (altMask += opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start), 
                    msk.mask === undefined || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask;
                }), altMask += opts.groupmarker.end, generateMask(altMask, opts.mask, opts);
            }
            opts.mask = opts.mask.pop();
        }
        return opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts);
    }
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
        el = null, isSupported;
    }
    function maskScope(actionObj, maskset, opts) {
        function getMaskTemplate(baseOnInput, minimalPos, includeMode) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
            do {
                !0 === baseOnInput && getMaskSet().validPositions[pos] ? (test = (testPos = getMaskSet().validPositions[pos]).match, 
                ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))) : (test = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).match, 
                ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))), 
                pos++;
            } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || minimalPos > pos);
            return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), getMaskSet().maskLength = pos + 1, 
            maskTemplate;
        }
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = undefined, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
        }
        function getLastValidPosition(closestTo, strict, validPositions) {
            var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
            closestTo === undefined && (closestTo = -1);
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), 
                psNdx >= closestTo && (after = psNdx));
            }
            return -1 !== before && closestTo - before > 1 || after < closestTo ? before : after;
        }
        function stripValidPositions(start, end, nocheck, strict) {
            var i, startPos = start, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), needsValidation = !1;
            for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) getMaskSet().validPositions[i] !== undefined && (!0 !== nocheck && (!getMaskSet().validPositions[i].match.optionality && function(pos) {
                var posMatch = getMaskSet().validPositions[pos];
                if (posMatch !== undefined && null === posMatch.match.fn) {
                    var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
                    return prevMatch !== undefined && nextMatch !== undefined;
                }
                return !1;
            }(i) || !1 === opts.canClearPosition(getMaskSet(), i, getLastValidPosition(undefined, !0), strict, opts)) || delete getMaskSet().validPositions[i]);
            for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
                for (;getMaskSet().validPositions[startPos] !== undefined; ) startPos++;
                if (i < startPos && (i = startPos + 1), getMaskSet().validPositions[i] === undefined && isMask(i)) i++; else {
                    var t = getTestTemplate(i);
                    !1 === needsValidation && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]), 
                    getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], 
                    i++) : positionCanMatchDefinition(startPos, t.match.def) ? !1 !== isValid(startPos, t.input || getPlaceholder(i), !0) && (delete getMaskSet().validPositions[i], 
                    i++, needsValidation = !0) : isMask(i) || (i++, startPos--), startPos++;
                }
            }
            resetMaskSet(!0);
        }
        function determineTestTemplate(pos, tests, guessNextBest) {
            for (var testPos, altTest = getTest(pos = pos > 0 ? pos - 1 : 0), altArr = altTest.alternation !== undefined ? altTest.locator[altTest.alternation].toString().split(",") : [], ndx = 0; ndx < tests.length && (!((testPos = tests[ndx]).match && (opts.greedy && !0 !== testPos.match.optionalQuantifier || (!1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker) && !0 !== testPos.match.optionalQuantifier) && (altTest.alternation === undefined || altTest.alternation !== testPos.alternation || testPos.locator[altTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[altTest.alternation].toString().split(","), altArr))) || !0 === guessNextBest && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++) ;
            return testPos;
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            return getMaskSet().validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
        }
        function getTest(pos) {
            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests(pos)[0];
        }
        function positionCanMatchDefinition(pos, def) {
            for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                valid = !0;
                break;
            }
            return valid;
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                        return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
                            if (!0 === match.isQuantifier && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]))) return !1;
                        }), firstMatch;
                    }
                    function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                        var bestMatch, indexPos;
                        if (getMaskSet().validPositions[pos - 1] && targetAlternation && getMaskSet().tests[pos]) for (var vpAlternation = getMaskSet().validPositions[pos - 1].locator, tpAlternation = getMaskSet().tests[pos][0].locator, i = 0; i < targetAlternation; i++) if (vpAlternation[i] !== tpAlternation[i]) return vpAlternation.slice(targetAlternation + 1);
                        return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
                            var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation, ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                            (indexPos === undefined || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                            indexPos = ndxPos);
                        }), bestMatch ? bestMatch.locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1) : targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                    }
                    if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                    if (testPos === pos && match.matches === undefined) return matches.push({
                        match: match,
                        locator: loopNdx.reverse(),
                        cd: cacheDependency
                    }), !0;
                    if (match.matches !== undefined) {
                        if (match.isGroup && quantifierRecurse !== match) {
                            if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (-1 === altIndex || "string" == typeof altIndex) {
                                var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
                                for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                    amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), 
                                    !0 !== (match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match) && match !== undefined && (altIndexArr[altIndexArr.length - 1], 
                                    alternateToken.matches.length), maltMatches = matches.slice(), testPos = currentPos, 
                                    matches = [];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1], dropMatch = !1;
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                if (function(source, target) {
                                                    return source.match.nativeDef === target.match.nativeDef || source.match.def === target.match.nativeDef || source.match.nativeDef === target.match.def;
                                                }(altMatch, altMatch2)) {
                                                    dropMatch = !0, altMatch.alternation === altMatch2.alternation && -1 === altMatch2.locator[altMatch2.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) && (altMatch2.locator[altMatch2.alternation] = altMatch2.locator[altMatch2.alternation] + "," + altMatch.locator[altMatch.alternation], 
                                                    altMatch2.alternation = altMatch.alternation), altMatch.match.nativeDef === altMatch2.match.def && (altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation], 
                                                    malternateMatches.splice(malternateMatches.indexOf(altMatch2), 1, altMatch));
                                                    break;
                                                }
                                                if (altMatch.match.def === altMatch2.match.def) {
                                                    dropMatch = !1;
                                                    break;
                                                }
                                                if (function(source, target) {
                                                    return null === source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def, getMaskSet(), pos, !1, opts, !1);
                                                }(altMatch, altMatch2) || function(source, target) {
                                                    return null !== source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def.replace(/[\[\]]/g, ""), getMaskSet(), pos, !1, opts, !1);
                                                }(altMatch, altMatch2)) {
                                                    altMatch.alternation === altMatch2.alternation && -1 === altMatch.locator[altMatch.alternation].toString().indexOf(altMatch2.locator[altMatch2.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na || altMatch.locator[altMatch.alternation].toString(), 
                                                    -1 === altMatch.na.indexOf(altMatch.locator[altMatch.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na + "," + altMatch.locator[altMatch2.alternation].toString().split("")[0]), 
                                                    dropMatch = !0, altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation].toString().split("")[0] + "," + altMatch.locator[altMatch.alternation], 
                                                    malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                    break;
                                                }
                                            }
                                        }
                                        dropMatch || malternateMatches.push(altMatch);
                                    }
                                }
                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                    if (isFinite(ndx)) {
                                        var alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
                                        lmnt.locator[alternation] = undefined, lmnt.alternation = undefined;
                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) -1 !== $.inArray(altLocArr[alndx], altIndexArr) && (lmnt.locator[alternation] !== undefined ? (lmnt.locator[alternation] += ",", 
                                        lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
                                        lmnt.alternation = alternation);
                                        if (lmnt.locator[alternation] !== undefined) return lmnt;
                                    }
                                })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0, 
                                match = malternateMatches.length > 0, ndxInitializer = ndxInitializerClone.slice();
                            } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                            var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                            if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
                                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                isFirstMatch(latestMatch, tokenGroup)) {
                                    if (qndx > qt.quantifier.min - 1) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    return !0;
                                }
                                return !0;
                            }
                        } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                    } else testPos++;
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos === pos) return match;
                    if (testPos > pos) break;
                }
            }
            function filterTests(tests) {
                if (opts.keepStatic && pos > 0 && tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0) && !0 !== tests[0].match.optionality && !0 !== tests[0].match.optionalQuantifier && null === tests[0].match.fn && !/[0-9a-bA-Z]/.test(tests[0].match.def)) {
                    if (getMaskSet().validPositions[pos - 1] === undefined) return [ determineTestTemplate(pos, tests) ];
                    if (getMaskSet().validPositions[pos - 1].alternation === tests[0].alternation) return [ determineTestTemplate(pos, tests) ];
                    if (getMaskSet().validPositions[pos - 1]) return [ determineTestTemplate(pos, tests) ];
                }
                return tests;
            }
            var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
            if (pos > -1) {
                if (ndxIntlzr === undefined) {
                    for (var test, previousPos = pos - 1; (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1; ) previousPos--;
                    test !== undefined && previousPos > -1 && (ndxInitializer = function(pos, tests) {
                        var locator = [];
                        return $.isArray(tests) || (tests = [ tests ]), tests.length > 0 && (tests[0].alternation === undefined ? 0 === (locator = determineTestTemplate(pos, tests.slice()).locator.slice()).length && (locator = tests[0].locator.slice()) : $.each(tests, function(ndx, tst) {
                            if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                        })), locator;
                    }(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
                }
                if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return filterTests(getMaskSet().tests[pos]);
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length && !(resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]) && testPos === pos || testPos > pos); mtndx++) ;
            }
            return (0 === matches.length || insertStop) && matches.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: "",
                    placeholder: ""
                },
                locator: [],
                cd: cacheDependency
            }), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? filterTests($.extend(!0, [], matches)) : (getMaskSet().tests[pos] = $.extend(!0, [], matches), 
            filterTests(getMaskSet().tests[pos]));
        }
        function getBufferTemplate() {
            return getMaskSet()._buffer === undefined && (getMaskSet()._buffer = getMaskTemplate(!1, 1), 
            getMaskSet().buffer === undefined && (getMaskSet().buffer = getMaskSet()._buffer.slice())), 
            getMaskSet()._buffer;
        }
        function getBuffer(noCache) {
            return getMaskSet().buffer !== undefined && !0 !== noCache || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), 
            getMaskSet().buffer;
        }
        function refreshFromBuffer(start, end, buffer) {
            var i, p;
            if (!0 === start) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
            for (p = start, i = start; i < end; i++) if (resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter) {
                var valResult = isValid(p, buffer[i], !0, !0);
                !1 !== valResult && (resetMaskSet(!0), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1);
            }
        }
        function casing(elem, test, pos) {
            switch (opts.casing || test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;
              case "lower":
                elem = elem.toLowerCase();
                break;
              case "title":
                var posBefore = getMaskSet().validPositions[pos - 1];
                elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                break;
              default:
                if ($.isFunction(opts.casing)) {
                    var args = Array.prototype.slice.call(arguments);
                    args.push(getMaskSet().validPositions), elem = opts.casing.apply(this, args);
                }
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2, na) {
            for (var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = na !== undefined ? na.split(",") : [], i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
            for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                isMatch = !0;
                break;
            }
            return isMatch;
        }
        function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
            function isSelection(posObj) {
                var selection = isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end == 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin == 1;
                return selection && 0 === posObj.begin && posObj.end === getMaskSet().maskLength ? "full" : selection;
            }
            function _isValid(position, c, strict) {
                var rslt = !1;
                return $.each(getTests(position), function(ndx, tst) {
                    for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                    if (c && (chrs += c), getBuffer(!0), !1 !== (rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                        c: getPlaceholder(position, test, !0) || test.def,
                        pos: position
                    })) {
                        var elem = rslt.c !== undefined ? rslt.c : c;
                        elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder(position, test, !0) || test.def : elem;
                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
                        if (rslt.remove !== undefined && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                        $.each(rslt.remove.sort(function(a, b) {
                            return b - a;
                        }), function(ndx, lmnt) {
                            stripValidPositions(lmnt, lmnt + 1, !0);
                        })), rslt.insert !== undefined && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                        $.each(rslt.insert.sort(function(a, b) {
                            return a - b;
                        }), function(ndx, lmnt) {
                            isValid(lmnt.pos, lmnt.c, !0, fromSetValid);
                        })), rslt.refreshFromBuffer) {
                            var refresh = rslt.refreshFromBuffer;
                            if (refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
                            rslt.pos === undefined && rslt.c === undefined) return rslt.pos = getLastValidPosition(), 
                            !1;
                            if ((validatedPos = rslt.pos !== undefined ? rslt.pos : position) !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), 
                            !1;
                        } else if (!0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && (validatedPos = rslt.pos, 
                        refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                        !1;
                        return (!0 === rslt || rslt.pos !== undefined || rslt.c !== undefined) && (ndx > 0 && resetMaskSet(!0), 
                        setValidPosition(validatedPos, $.extend({}, tst, {
                            input: casing(elem, test, validatedPos)
                        }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
                    }
                }), rslt;
            }
            function setValidPosition(pos, validTest, fromSetValid, isSelection) {
                if (isSelection || opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined) {
                    var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition(undefined, !0);
                    for (i = pos; i <= lvp; i++) delete getMaskSet().validPositions[i];
                    getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
                    var j, valid = !0, vps = getMaskSet().validPositions, needsValidation = !1, initialLength = getMaskSet().maskLength;
                    for (i = j = pos; i <= lvp; i++) {
                        var t = positionsClone[i];
                        if (t !== undefined) for (var posMatch = j; posMatch < getMaskSet().maskLength && (null === t.match.fn && vps[i] && (!0 === vps[i].match.optionalQuantifier || !0 === vps[i].match.optionality) || null != t.match.fn); ) {
                            if (posMatch++, !1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), 
                            getMaskSet().validPositions[posMatch].input = t.input, fillMissingNonMask(posMatch), 
                            j = posMatch, valid = !0; else if (positionCanMatchDefinition(posMatch, t.match.def)) {
                                var result = isValid(posMatch, t.input, !0, !0);
                                valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch, 
                                needsValidation = !0;
                            } else if (!(valid = !0 === t.generatedInput) && posMatch >= getMaskSet().maskLength - 1) break;
                            if (getMaskSet().maskLength < initialLength && (getMaskSet().maskLength = initialLength), 
                            valid) break;
                        }
                        if (!valid) break;
                    }
                    if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                    resetMaskSet(!0), !1;
                } else getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
                return resetMaskSet(!0), !0;
            }
            function fillMissingNonMask(maskPos) {
                for (var pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
                var testTemplate, testsFromPos;
                for (pndx++; pndx < maskPos; pndx++) getMaskSet().validPositions[pndx] === undefined && (!1 === opts.jitMasking || opts.jitMasking > pndx) && ("" === (testsFromPos = getTests(pndx, getTestTemplate(pndx - 1).locator, pndx - 1).slice())[testsFromPos.length - 1].match.def && testsFromPos.pop(), 
                (testTemplate = determineTestTemplate(pndx, testsFromPos)) && (testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && !1 !== (result = _isValid(pndx, getPlaceholder(pndx, testTemplate.match, !0) || (null == testTemplate.match.fn ? testTemplate.match.def : "" !== getPlaceholder(pndx) ? getPlaceholder(pndx) : getBuffer()[pndx]), !0)) && (getMaskSet().validPositions[result.pos || pndx].generatedInput = !0));
            }
            strict = !0 === strict;
            var maskPos = pos;
            pos.begin !== undefined && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
            var result = !0, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
            if ($.isFunction(opts.preValidation) && !strict && !0 !== fromSetValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts)), 
            !0 === result) {
                if (fillMissingNonMask(maskPos), isSelection(pos) && (handleRemove(undefined, Inputmask.keyCode.DELETE, pos, !0, !0), 
                maskPos = getMaskSet().p), maskPos < getMaskSet().maskLength && (maxLength === undefined || maskPos < maxLength) && (result = _isValid(maskPos, c, strict), 
                (!strict || !0 === fromSetValid) && !1 === result && !0 !== validateOnly)) {
                    var currentPosValid = getMaskSet().validPositions[maskPos];
                    if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                        if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (!1 !== (result = _isValid(nPos, c, strict))) {
                            !function(originalPos, newPos) {
                                var vp = getMaskSet().validPositions[newPos];
                                if (vp) for (var targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; ps < newPos; ps++) if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, !0)) {
                                    var tests = getTests(ps).slice(), bestMatch = determineTestTemplate(ps, tests, !0), equality = -1;
                                    "" === tests[tests.length - 1].match.def && tests.pop(), $.each(tests, function(ndx, tst) {
                                        for (var i = 0; i < tll; i++) {
                                            if (tst.locator[i] === undefined || !checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","), tst.na)) {
                                                var targetAI = targetLocator[i], bestMatchAI = bestMatch.locator[i], tstAI = tst.locator[i];
                                                targetAI - bestMatchAI > Math.abs(targetAI - tstAI) && (bestMatch = tst);
                                                break;
                                            }
                                            equality < i && (equality = i, bestMatch = tst);
                                        }
                                    }), (bestMatch = $.extend({}, bestMatch, {
                                        input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                                    })).generatedInput = !0, setValidPosition(ps, bestMatch, !0), getMaskSet().validPositions[newPos] = undefined, 
                                    _isValid(newPos, vp.input, !0);
                                }
                            }(maskPos, result.pos !== undefined ? result.pos : nPos), maskPos = nPos;
                            break;
                        }
                    } else result = {
                        caret: seekNext(maskPos)
                    };
                }
                !1 === result && opts.keepStatic && !strict && !0 !== fromAlternate && (result = function(pos, c, strict) {
                    var lastAlt, alternation, altPos, prevAltPos, i, validPos, altNdxs, decisionPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), isValidRslt = !1, lAltPos = getLastValidPosition();
                    for (prevAltPos = getMaskSet().validPositions[lAltPos]; lAltPos >= 0; lAltPos--) if ((altPos = getMaskSet().validPositions[lAltPos]) && altPos.alternation !== undefined) {
                        if (lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                        prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                        prevAltPos = altPos;
                    }
                    if (alternation !== undefined) {
                        decisionPos = parseInt(lastAlt);
                        var decisionTaker = prevAltPos.locator[prevAltPos.alternation || alternation] !== undefined ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0];
                        decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                        var possibilityPos = getMaskSet().validPositions[decisionPos], prevPos = getMaskSet().validPositions[decisionPos - 1];
                        $.each(getTests(decisionPos, prevPos ? prevPos.locator : undefined, decisionPos - 1), function(ndx, test) {
                            altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split(",") : [];
                            for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                                var validInputs = [], staticInputsBeforePos = 0, staticInputsBeforePosAlternate = 0, verifyValidInput = !1;
                                if (decisionTaker < altNdxs[mndx] && (test.na === undefined || -1 === $.inArray(altNdxs[mndx], test.na.split(",")) || -1 === $.inArray(decisionTaker.toString(), altNdxs))) {
                                    getMaskSet().validPositions[decisionPos] = $.extend(!0, {}, test);
                                    var possibilities = getMaskSet().validPositions[decisionPos].locator;
                                    for (getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt(altNdxs[mndx]), 
                                    null == test.match.fn ? (possibilityPos.input !== test.match.def && (verifyValidInput = !0, 
                                    !0 !== possibilityPos.generatedInput && validInputs.push(possibilityPos.input)), 
                                    staticInputsBeforePosAlternate++, getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test(test.match.def), 
                                    getMaskSet().validPositions[decisionPos].input = test.match.def) : getMaskSet().validPositions[decisionPos].input = possibilityPos.input, 
                                    i = decisionPos + 1; i < getLastValidPosition(undefined, !0) + 1; i++) (validPos = getMaskSet().validPositions[i]) && !0 !== validPos.generatedInput && /[0-9a-bA-Z]/.test(validPos.input) ? validInputs.push(validPos.input) : i < pos && staticInputsBeforePos++, 
                                    delete getMaskSet().validPositions[i];
                                    for (verifyValidInput && validInputs[0] === test.match.def && validInputs.shift(), 
                                    resetMaskSet(!0), isValidRslt = !0; validInputs.length > 0; ) {
                                        var input = validInputs.shift();
                                        if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(undefined, !0) + 1, input, !1, fromSetValid, !0))) break;
                                    }
                                    if (isValidRslt) {
                                        getMaskSet().validPositions[decisionPos].locator = possibilities;
                                        var targetLvp = getLastValidPosition(pos) + 1;
                                        for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) ((validPos = getMaskSet().validPositions[i]) === undefined || null == validPos.match.fn) && i < pos + (staticInputsBeforePosAlternate - staticInputsBeforePos) && staticInputsBeforePosAlternate++;
                                        isValidRslt = isValid((pos += staticInputsBeforePosAlternate - staticInputsBeforePos) > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0);
                                    }
                                    if (isValidRslt) return !1;
                                    resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
                                }
                            }
                        });
                    }
                    return isValidRslt;
                }(maskPos, c, strict)), !0 === result && (result = {
                    pos: maskPos
                });
            }
            if ($.isFunction(opts.postValidation) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly) {
                var postResult = opts.postValidation(getBuffer(!0), result, opts);
                if (postResult !== undefined) {
                    if (postResult.refreshFromBuffer && postResult.buffer) {
                        var refresh = postResult.refreshFromBuffer;
                        refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer);
                    }
                    result = !0 === postResult ? result : postResult;
                }
            }
            return result && result.pos === undefined && (result.pos = maskPos), !1 !== result && !0 !== validateOnly || (resetMaskSet(!0), 
            getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
        }
        function isMask(pos, strict) {
            var test = getTestTemplate(pos).match;
            if ("" === test.def && (test = getTest(pos).match), null != test.fn) return test.fn;
            if (!0 !== strict && pos > -1) {
                var tests = getTests(pos);
                return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
            }
            return !1;
        }
        function seekNext(pos, newBlock) {
            var maskL = getMaskSet().maskLength;
            if (pos >= maskL) return maskL;
            var position = pos;
            for (getTests(maskL + 1).length > 1 && (getMaskTemplate(!0, maskL + 1, !0), maskL = getMaskSet().maskLength); ++position < maskL && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position)) || !0 !== newBlock && !isMask(position)); ) ;
            return position;
        }
        function seekPrevious(pos, newBlock) {
            var tests, position = pos;
            if (position <= 0) return 0;
            for (;--position > 0 && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position) && ((tests = getTests(position)).length < 2 || 2 === tests.length && "" === tests[1].match.def)); ) ;
            return position;
        }
        function getBufferElement(position) {
            return getMaskSet().validPositions[position] === undefined ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                        buffer = getBuffer(!0);
                    }
                    caretPos !== undefined && (caretPos = result.caret !== undefined ? result.caret : caretPos);
                }
            }
            input !== undefined && (input.inputmask._valueSet(buffer.join("")), caretPos === undefined || event !== undefined && "blur" === event.type ? renderColorMask(input, caretPos, 0 === buffer.length) : caret(input, caretPos), 
            !0 === triggerInputEvent && (skipInputEvent = !0, $(input).trigger("input")));
        }
        function getPlaceholder(pos, test, returnPL) {
            if ((test = test || getTest(pos).match).placeholder !== undefined || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
            if (null === test.fn) {
                if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
                    var prevTest, tests = getTests(pos), staticAlternations = [];
                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts)) && (staticAlternations.push(tests[i]), 
                    null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
            function isTemplateMatch(ndx, charCodes) {
                return -1 !== getBufferTemplate().slice(ndx, seekNext(ndx)).join("").indexOf(charCodes) && !isMask(ndx) && getTest(ndx).match.nativeDef === charCodes.charAt(charCodes.length - 1);
            }
            var inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = undefined;
            if (resetMaskSet(), strict || !0 === opts.autoUnmask) initialNdx = seekNext(initialNdx); else {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                initialNdx = seekNext(initialNdx));
            }
            if (-1 === initialNdx ? (getMaskSet().p = seekNext(initialNdx), initialNdx = 0) : getMaskSet().p = initialNdx, 
            $.each(inputValue, function(ndx, charCode) {
                if (charCode !== undefined) if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, undefined, undefined, !0)) getMaskSet().p++; else {
                    var keypress = new $.Event("_checkval");
                    keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                    var lvp = getLastValidPosition(undefined, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
                    if (!isTemplateMatch(initialNdx, charCodes) || strict || opts.autoUnmask) {
                        var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                        result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, pos), 
                        initialNdx = pos + 1, charCodes = "";
                    } else result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                    if (!1 !== result && !strict && $.isFunction(opts.onBeforeWrite)) {
                        var origResult = result;
                        if (result = opts.onBeforeWrite.call(inputmask, keypress, getBuffer(), result.forwardPosition, opts), 
                        (result = $.extend(origResult, result)) && result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer), 
                            resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret, result.forwardPosition = result.caret);
                        }
                    }
                }
            }), writeOut) {
                var caretPos = undefined;
                document.activeElement === input && result && (caretPos = opts.numericInput ? seekPrevious(result.forwardPosition) : result.forwardPosition), 
                writeBuffer(input, getBuffer(), caretPos, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type);
            }
        }
        function unmaskedvalue(input) {
            if (input) {
                if (input.inputmask === undefined) return input.value;
                input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call(input);
            }
            var umValue = [], vps = getMaskSet().validPositions;
            for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
            var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
            if ($.isFunction(opts.onUnMask)) {
                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
            }
            return unmaskedValue;
        }
        function caret(input, begin, end, notranslate) {
            function translatePosition(pos) {
                return !0 === notranslate || !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || (pos = input.inputmask.__valueGet.call(input).length - pos), 
                pos;
            }
            var range;
            if (begin === undefined) return input.setSelectionRange ? (begin = input.selectionStart, 
            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
            end = range.endOffset) : document.selection && document.selection.createRange && (end = (begin = 0 - (range = document.selection.createRange()).duplicate().moveStart("character", -input.inputmask._valueGet().length)) + range.text.length), 
            {
                begin: translatePosition(begin),
                end: translatePosition(end)
            };
            if (begin.begin !== undefined && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), 
            "number" == typeof begin) {
                begin = translatePosition(begin), end = "number" == typeof (end = translatePosition(end)) ? end : begin;
                var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, !1 === opts.insertMode && begin === end && end++, 
                input.inputmask.caretPos = {
                    begin: begin,
                    end: end
                }, input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                    if (range = document.createRange(), input.firstChild === undefined || null === input.firstChild) {
                        var textNode = document.createTextNode("");
                        input.appendChild(textNode);
                    }
                    range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                    range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                    range.collapse(!0);
                    var sel = window.getSelection();
                    sel.removeAllRanges(), sel.addRange(range);
                } else input.createTextRange && ((range = input.createTextRange()).collapse(!0), 
                range.moveEnd("character", end), range.moveStart("character", begin), range.select());
                renderColorMask(input, {
                    begin: begin,
                    end: end
                });
            }
        }
        function determineLastRequiredPosition(returnDefinition) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
            for (pos = lvp + 1; pos < buffer.length; pos++) ndxIntlzr = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).locator.slice(), 
            positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
            for (pos = bl - 1; pos > lvp && (((testPos = positions[pos]).match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : undefined
            } : bl;
        }
        function clearOptionalTail(buffer) {
            for (var validPos, rl = determineLastRequiredPosition(), bl = buffer.length, lv = getMaskSet().validPositions[getLastValidPosition()]; rl < bl && !isMask(rl, !0) && (validPos = lv !== undefined ? getTestTemplate(rl, lv.locator.slice(""), lv) : getTest(rl)) && !0 !== validPos.match.optionality && (!0 !== validPos.match.optionalQuantifier && !0 !== validPos.match.newBlockMarker || rl + 1 === bl && "" === (lv !== undefined ? getTestTemplate(rl + 1, lv.locator.slice(""), lv) : getTest(rl + 1)).match.def); ) rl++;
            for (;(validPos = getMaskSet().validPositions[rl - 1]) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter; ) rl--;
            return buffer.splice(rl), buffer;
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
            if ("*" === opts.repeat) return undefined;
            var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
            if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = !0;
                for (var i = 0; i <= aml; i++) {
                    var test = getTestTemplate(i).match;
                    if (null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                        complete = !1;
                        break;
                    }
                }
            }
            return complete;
        }
        function handleRemove(input, k, pos, strict, fromIsValid) {
            if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
            isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || !1 === opts.insertMode) ? (pos.begin = seekPrevious(pos.begin), 
            getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1, 
            getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++), 
            stripValidPositions(pos.begin, pos.end, !1, strict), !0 !== strict && function() {
                if (opts.keepStatic) {
                    for (var validInputs = [], lastAlt = getLastValidPosition(-1, !0), positionsClone = $.extend(!0, {}, getMaskSet().validPositions), prevAltPos = getMaskSet().validPositions[lastAlt]; lastAlt >= 0; lastAlt--) {
                        var altPos = getMaskSet().validPositions[lastAlt];
                        if (altPos) {
                            if (!0 !== altPos.generatedInput && /[0-9a-bA-Z]/.test(altPos.input) && validInputs.push(altPos.input), 
                            delete getMaskSet().validPositions[lastAlt], altPos.alternation !== undefined && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation]) break;
                            prevAltPos = altPos;
                        }
                    }
                    if (lastAlt > -1) for (getMaskSet().p = seekNext(getLastValidPosition(-1, !0)); validInputs.length > 0; ) {
                        var keypress = new $.Event("keypress");
                        keypress.which = validInputs.pop().charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                    } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                }
            }();
            var lvp = getLastValidPosition(pos.begin, !0);
            if (lvp < pos.begin) getMaskSet().p = seekNext(lvp); else if (!0 !== strict && (getMaskSet().p = pos.begin, 
            !0 !== fromIsValid)) for (;getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined; ) getMaskSet().p++;
        }
        function initializeColorMask(input) {
            function findCaretPos(clientx) {
                var caretPos, e = document.createElement("span");
                for (var style in computedStyle) isNaN(style) && -1 !== style.indexOf("font") && (e.style[style] = computedStyle[style]);
                e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, 
                e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto", 
                e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
                var itl, inputText = input.inputmask._valueGet(), previousWidth = 0;
                for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
                    if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
                        var offset1 = clientx - previousWidth, offset2 = e.offsetWidth - clientx;
                        e.innerHTML = inputText.charAt(caretPos), caretPos = (offset1 -= e.offsetWidth / 3) < offset2 ? caretPos - 1 : caretPos;
                        break;
                    }
                    previousWidth = e.offsetWidth;
                }
                return document.body.removeChild(e), caretPos;
            }
            var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null), template = document.createElement("div");
            template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign, 
            colorMask = document.createElement("div"), input.inputmask.colorMask = colorMask, 
            colorMask.className = "im-colormask", input.parentNode.insertBefore(colorMask, input), 
            input.parentNode.removeChild(input), colorMask.appendChild(template), colorMask.appendChild(input), 
            input.style.left = template.offsetLeft + "px", $(input).on("click", function(e) {
                return caret(input, findCaretPos(e.clientX)), EventHandlers.clickEvent.call(input, [ e ]);
            }), $(input).on("keydown", function(e) {
                e.shiftKey || !1 === opts.insertMode || setTimeout(function() {
                    renderColorMask(input);
                }, 0);
            });
        }
        function renderColorMask(input, caretPos, clear) {
            function handleStatic() {
                isStatic || null !== test.fn && testPos.input !== undefined ? isStatic && (null !== test.fn && testPos.input !== undefined || "" === test.def) && (isStatic = !1, 
                maskTemplate += "</span>") : (isStatic = !0, maskTemplate += "<span class='im-static'>");
            }
            function handleCaret(force) {
                !0 !== force && pos !== caretPos.begin || document.activeElement !== input || (maskTemplate += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>");
            }
            var test, testPos, ndxIntlzr, maskTemplate = "", isStatic = !1, pos = 0;
            if (colorMask !== undefined) {
                var buffer = getBuffer();
                if (caretPos === undefined ? caretPos = caret(input) : caretPos.begin === undefined && (caretPos = {
                    begin: caretPos,
                    end: caretPos
                }), !0 !== clear) {
                    var lvp = getLastValidPosition();
                    do {
                        handleCaret(), getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], 
                        test = testPos.match, ndxIntlzr = testPos.locator.slice(), handleStatic(), maskTemplate += buffer[pos]) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
                        test = testPos.match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && (handleStatic(), 
                        maskTemplate += getPlaceholder(pos, test))), pos++;
                    } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || lvp > pos || isStatic);
                    -1 === maskTemplate.indexOf("im-caret") && handleCaret(!0), isStatic && handleStatic();
                }
                var template = colorMask.getElementsByTagName("div")[0];
                template.innerHTML = maskTemplate, input.inputmask.positionColorMask(input, template);
            }
        }
        maskset = maskset || this.maskset, opts = opts || this.opts;
        var undoValue, $el, maxLength, colorMask, inputmask = this, el = this.el, isRTL = this.isRTL, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !1, trackCaret = !1, EventRuler = {
            on: function(input, eventName, eventHandler) {
                var ev = function(e) {
                    var that = this;
                    if (that.inputmask === undefined && "FORM" !== this.nodeName) {
                        var imOpts = $.data(that, "_inputmask_opts");
                        imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that);
                    } else {
                        if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                            switch (e.type) {
                              case "input":
                                if (!0 === skipInputEvent) return skipInputEvent = !1, e.preventDefault();
                                mobile && (trackCaret = !0);
                                break;
                              case "keydown":
                                skipKeyPressEvent = !1, skipInputEvent = !1;
                                break;
                              case "keypress":
                                if (!0 === skipKeyPressEvent) return e.preventDefault();
                                skipKeyPressEvent = !0;
                                break;
                              case "click":
                                if (iemobile || iphone) {
                                    var args = arguments;
                                    return setTimeout(function() {
                                        eventHandler.apply(that, args);
                                    }, 0), !1;
                                }
                            }
                            var returnVal = eventHandler.apply(that, arguments);
                            return trackCaret && (trackCaret = !1, setTimeout(function() {
                                caret(that, that.inputmask.caretPos);
                            })), !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                        }
                        e.preventDefault();
                    }
                };
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
                -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
            },
            off: function(input, event) {
                if (input.inputmask && input.inputmask.events) {
                    var events;
                    event ? (events = [])[event] = input.inputmask.events[event] : events = input.inputmask.events, 
                    $.each(events, function(eventName, evArr) {
                        for (;evArr.length > 0; ) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    });
                }
            }
        }, EventHandlers = {
            keydownEvent: function(e) {
                var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
                if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
                handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")), 
                input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(getBuffer()) && $input.trigger("complete"); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                    e.preventDefault();
                    var caretPos = seekNext(getLastValidPosition());
                    opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, 
                    caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
                caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), 
                $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)), 
                pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
                pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--), 
                pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
                    var caretPos = caret(input);
                    caret(input, caretPos.begin);
                }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
                    var caretPos = caret(input);
                    caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
                opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
            },
            keypressEvent: function(e, checkval, writeOut, strict, ndx) {
                var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), 
                setTimeout(function() {
                    $input.trigger("change");
                }, 0)), !0;
                if (k) {
                    46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                    var forwardPosition, pos = checkval ? {
                        begin: ndx,
                        end: ndx
                    } : caret(input), c = String.fromCharCode(k);
                    getMaskSet().writeOutBuffer = !0;
                    var valResult = isValid(pos, c, strict);
                    if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = valResult.caret !== undefined ? valResult.caret : checkval ? valResult.pos + 1 : seekNext(valResult.pos), 
                    getMaskSet().p = forwardPosition), !1 !== writeOut && (setTimeout(function() {
                        opts.onKeyValidation.call(input, k, valResult, opts);
                    }, 0), getMaskSet().writeOutBuffer && !1 !== valResult)) {
                        var buffer = getBuffer();
                        writeBuffer(input, buffer, opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition, e, !0 !== checkval), 
                        !0 !== checkval && setTimeout(function() {
                            !0 === isComplete(buffer) && $input.trigger("complete");
                        }, 0);
                    }
                    if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), 
                    valResult;
                }
            },
            pasteEvent: function(e) {
                var tempValue, input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
                isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
                valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
                isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), 
                window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                    if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
                    inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
                }
                var pasteValue = inputValue;
                if ($.isFunction(opts.onBeforePaste)) {
                    if (!1 === (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts))) return e.preventDefault();
                    pasteValue || (pasteValue = inputValue);
                }
                return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
                writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), 
                !0 === isComplete(getBuffer()) && $input.trigger("complete"), e.preventDefault();
            },
            inputFallBackEvent: function(e) {
                var input = this, inputValue = input.inputmask._valueGet();
                if (getBuffer().join("") !== inputValue) {
                    var caretPos = caret(input);
                    if (inputValue = function(input, inputValue, caretPos) {
                        return "." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && ((inputValue = inputValue.split(""))[caretPos.begin - 1] = opts.radixPoint.charAt(0), 
                        inputValue = inputValue.join("")), inputValue;
                    }(0, inputValue, caretPos), inputValue = function(input, inputValue, caretPos) {
                        if (iemobile) {
                            var inputChar = inputValue.replace(getBuffer().join(""), "");
                            if (1 === inputChar.length) {
                                var iv = inputValue.split("");
                                iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
                            }
                        }
                        return inputValue;
                    }(0, inputValue, caretPos), getBuffer().join("") !== inputValue) {
                        var buffer = getBuffer().join(""), offset = inputValue.length > buffer.length ? -1 : 0, frontPart = inputValue.substr(0, caretPos.begin), backPart = inputValue.substr(caretPos.begin), frontBufferPart = buffer.substr(0, caretPos.begin + offset), backBufferPart = buffer.substr(caretPos.begin + offset), selection = caretPos, entries = "", isEntry = !1;
                        if (frontPart !== frontBufferPart) {
                            for (var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) ;
                            isEntry && (0 === offset && (selection.begin = i), entries += frontPart.slice(i, selection.end));
                        }
                        if (backPart !== backBufferPart && (backPart.length > backBufferPart.length ? entries += backPart.slice(0, 1) : backPart.length < backBufferPart.length && (selection.end += backBufferPart.length - backPart.length, 
                        isEntry || "" === opts.radixPoint || "" !== backPart || frontPart.charAt(selection.begin + offset - 1) !== opts.radixPoint || (selection.begin--, 
                        entries = opts.radixPoint))), writeBuffer(input, getBuffer(), {
                            begin: selection.begin + offset,
                            end: selection.end + offset
                        }), entries.length > 0) $.each(entries.split(""), function(ndx, entry) {
                            var keypress = new $.Event("keypress");
                            keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                        }); else {
                            selection.begin === selection.end - 1 && (selection.begin = seekPrevious(selection.begin + 1), 
                            selection.begin === selection.end - 1 ? caret(input, selection.begin) : caret(input, selection.begin, selection.end));
                            var keydown = new $.Event("keydown");
                            keydown.keyCode = Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, keydown), 
                            !1 === opts.insertMode && caret(input, caret(input).begin - 1);
                        }
                        e.preventDefault();
                    }
                }
            },
            setValueEvent: function(e) {
                this.inputmask.refreshValue = !1;
                var input = this, value = input.inputmask._valueGet(!0);
                $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), 
                value = value.split(""), checkVal(input, !0, !1, isRTL ? value.reverse() : value), 
                undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
            },
            focusEvent: function(e) {
                var input = this, nptValue = input.inputmask._valueGet();
                opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (input.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : !1 === mouseEnter && caret(input, seekNext(getLastValidPosition()))), 
                !0 === opts.positionCaretOnTab && !1 === mouseEnter && "" !== nptValue && (writeBuffer(input, getBuffer(), caret(input)), 
                EventHandlers.clickEvent.apply(input, [ e, !0 ])), undoValue = getBuffer().join("");
            },
            mouseleaveEvent: function(e) {
                var input = this;
                if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
                    var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
                    nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                    writeBuffer(input, buffer));
                }
            },
            clickEvent: function(e, tabbed) {
                function doRadixFocus(clickPos) {
                    if ("" !== opts.radixPoint) {
                        var vps = getMaskSet().validPositions;
                        if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return !0;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (-1 !== radixPos) {
                                for (var vp in vps) if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                return !0;
                            }
                        }
                    }
                    return !1;
                }
                var input = this;
                setTimeout(function() {
                    if (document.activeElement === input) {
                        var selectedCaret = caret(input);
                        if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), 
                        selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                          case "none":
                            break;
                          case "radixFocus":
                            if (doRadixFocus(selectedCaret.begin)) {
                                var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                                break;
                            }
                          default:
                            var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
                            if (clickPosition < lastPosition) caret(input, isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition)); else {
                                var lvp = getMaskSet().validPositions[lvclickPosition], tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp), placeholder = getPlaceholder(lastPosition, tt.match);
                                if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, !0) && tt.match.def === placeholder) {
                                    var newPos = seekNext(lastPosition);
                                    (clickPosition >= newPos || clickPosition === lastPosition) && (lastPosition = newPos);
                                }
                                caret(input, lastPosition);
                            }
                        }
                    }
                }, 0);
            },
            dblclickEvent: function(e) {
                var input = this;
                setTimeout(function() {
                    caret(input, 0, seekNext(getLastValidPosition()));
                }, 0);
            },
            cutEvent: function(e) {
                var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), 
                document.execCommand && document.execCommand("copy"), handleRemove(input, Inputmask.keyCode.DELETE, pos), 
                writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
                input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared");
            },
            blurEvent: function(e) {
                var $input = $(this), input = this;
                if (input.inputmask) {
                    var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                    "" === nptValue && colorMask === undefined || (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                    !1 === isComplete(buffer) && (setTimeout(function() {
                        $input.trigger("incomplete");
                    }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                    writeBuffer(input, buffer, undefined, e)), undoValue !== getBuffer().join("") && (undoValue = buffer.join(""), 
                    $input.trigger("change"));
                }
            },
            mouseenterEvent: function(e) {
                var input = this;
                mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
            },
            submitEvent: function(e) {
                undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
                opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
                setTimeout(function() {
                    writeBuffer(el, getBuffer());
                }, 0));
            },
            resetEvent: function(e) {
                el.inputmask.refreshValue = !0, setTimeout(function() {
                    $el.trigger("setvalue");
                }, 0);
            }
        };
        Inputmask.prototype.positionColorMask = function(input, template) {
            input.style.left = template.offsetLeft + "px";
        };
        var valueBuffer;
        if (actionObj !== undefined) switch (actionObj.action) {
          case "isComplete":
            return el = actionObj.el, isComplete(getBuffer());
          case "unmaskedvalue":
            return el !== undefined && actionObj.value === undefined || (valueBuffer = actionObj.value, 
            valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split(""), 
            checkVal(undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts)), 
            unmaskedvalue(el);
          case "mask":
            !function(elem) {
                EventRuler.off(elem);
                var isSupported = function(input, opts) {
                    var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
                    if (!isSupported) if ("INPUT" === input.tagName) {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                    } else isSupported = "partial";
                    return !1 !== isSupported ? function(npt) {
                        function getter() {
                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                        }
                        function setter(value) {
                            valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
                        }
                        var valueGet, valueSet;
                        if (!npt.inputmask.__valueGet) {
                            if (!0 !== opts.noValuePatching) {
                                if (Object.getOwnPropertyDescriptor) {
                                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function(object) {
                                        return object.__proto__;
                                    } : function(object) {
                                        return object.constructor.prototype;
                                    });
                                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                                    valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    })) : "INPUT" !== npt.tagName && (valueGet = function() {
                                        return this.textContent;
                                    }, valueSet = function(value) {
                                        this.textContent = value;
                                    }, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    }));
                                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                                valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                                npt.__defineSetter__("value", setter));
                                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                            }
                            npt.inputmask._valueGet = function(overruleRTL) {
                                return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                            }, npt.inputmask._valueSet = function(value, overruleRTL) {
                                valueSet.call(this.el, null === value || value === undefined ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value);
                            }, valueGet === undefined && (valueGet = function() {
                                return this.value;
                            }, valueSet = function(value) {
                                this.value = value;
                            }, function(type) {
                                if ($.valHooks && ($.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch)) {
                                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                                        return elem.value;
                                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                                        return elem.value = value, elem;
                                    };
                                    $.valHooks[type] = {
                                        get: function(elem) {
                                            if (elem.inputmask) {
                                                if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                                var result = valhookGet(elem);
                                                return -1 !== getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                            }
                                            return valhookGet(elem);
                                        },
                                        set: function(elem, value) {
                                            var result, $elem = $(elem);
                                            return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), 
                                            result;
                                        },
                                        inputmaskpatch: !0
                                    };
                                }
                            }(npt.type), function(npt) {
                                EventRuler.on(npt, "mouseenter", function(event) {
                                    var $input = $(this);
                                    this.inputmask._valueGet() !== getBuffer().join("") && $input.trigger("setvalue");
                                });
                            }(npt));
                        }
                    }(input) : input.inputmask = undefined, isSupported;
                }(elem, opts);
                if (!1 !== isSupported && (el = elem, $el = $(el), -1 === (maxLength = el !== undefined ? el.maxLength : undefined) && (maxLength = undefined), 
                !0 === opts.colorMask && initializeColorMask(el), mobile && ("inputmode" in el && (el.inputmode = opts.inputmode, 
                el.setAttribute("inputmode", opts.inputmode)), !0 === opts.disablePredictiveText && ("autocorrect" in el ? el.autocorrect = !1 : (!0 !== opts.colorMask && initializeColorMask(el), 
                el.type = "password"))), !0 === isSupported && (EventRuler.on(el, "submit", EventHandlers.submitEvent), 
                EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), 
                EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), 
                EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), !0 !== opts.colorMask && EventRuler.on(el, "click", EventHandlers.clickEvent), 
                EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), 
                EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent), EventRuler.on(el, "drop", EventHandlers.pasteEvent), 
                EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), 
                EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), 
                mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), 
                EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "compositionstart", $.noop), 
                EventRuler.on(el, "compositionupdate", $.noop), EventRuler.on(el, "compositionend", $.noop), 
                EventRuler.on(el, "keyup", $.noop), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), 
                EventRuler.on(el, "beforeinput", $.noop)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), 
                undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                    var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(!0), opts) || el.inputmask._valueGet(!0) : el.inputmask._valueGet(!0);
                    "" !== initialValue && checkVal(el, !0, !1, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
                    var buffer = getBuffer().slice();
                    undoValue = buffer.join(""), !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), 
                    opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), 
                    writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
                }
            }(el);
            break;
          case "format":
            return valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split(""), 
            checkVal(undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer), actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: maskScope.call(this, {
                    action: "getmetadata"
                }, maskset, opts)
            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
          case "isValid":
            actionObj.value ? (valueBuffer = actionObj.value.split(""), checkVal(undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");
          case "getemptymask":
            return getBufferTemplate().join("");
          case "remove":
            if (el && el.inputmask) {
                $el = $(el), el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(!0)), 
                EventRuler.off(el), el.inputmask.colorMask && ((colorMask = el.inputmask.colorMask).removeChild(el), 
                colorMask.parentNode.insertBefore(el, colorMask), colorMask.parentNode.removeChild(colorMask));
                Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value") && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                    get: el.inputmask.__valueGet,
                    set: el.inputmask.__valueSet,
                    configurable: !0
                }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
                el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = undefined;
            }
            return el;
          case "getmetadata":
            if ($.isArray(maskset.metadata)) {
                var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                return $.each(maskset.metadata, function(ndx, mtdt) {
                    if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1;
                }), maskTarget;
            }
            return maskset.metadata;
        }
    }
    var ua = navigator.userAgent, mobile = isInputEventSupported("touchstart"), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
    return Inputmask.prototype = {
        dataAttribute: "data-inputmask",
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            quantifiermarker: {
                start: "{",
                end: "}"
            },
            groupmarker: {
                start: "(",
                end: ")"
            },
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            regex: null,
            oncomplete: $.noop,
            onincomplete: $.noop,
            oncleared: $.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: null,
            onBeforePaste: function(pastedValue, opts) {
                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: " ",
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            radixPointDefinitionSymbol: undefined,
            groupSeparator: "",
            keepStatic: null,
            positionCaretOnTab: !0,
            tabThrough: !1,
            supportsInputType: [ "text", "tel", "password", "search" ],
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
            isComplete: null,
            canClearPosition: $.noop,
            preValidation: null,
            postValidation: null,
            staticDefinitionSymbol: undefined,
            jitMasking: !1,
            nullable: !0,
            inputEventOnly: !1,
            noValuePatching: !1,
            positionCaretOnClick: "lvp",
            casing: null,
            inputmode: "verbatim",
            colorMask: !1,
            disablePredictiveText: !1,
            importDataAttributes: !0
        },
        definitions: {
            "9": {
                validator: "[0-9１-９]",
                cardinality: 1,
                definitionSymbol: "*"
            },
            a: {
                validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                cardinality: 1,
                definitionSymbol: "*"
            },
            "*": {
                validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ]",
                cardinality: 1
            }
        },
        aliases: {},
        masksCache: {},
        mask: function(elems) {
            function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
                function importOption(option, optionData) {
                    null !== (optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option)) && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
                    userOptions[option] = optionData);
                }
                if (!0 === opts.importDataAttributes) {
                    var option, dataoptions, optionData, p, attrOptions = npt.getAttribute(dataAttribute);
                    if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), 
                    dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
                        optionData = undefined;
                        for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                            optionData = dataoptions[p];
                            break;
                        }
                    }
                    importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
                    for (option in opts) {
                        if (dataoptions) {
                            optionData = undefined;
                            for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                                optionData = dataoptions[p];
                                break;
                            }
                        }
                        importOption(option, optionData);
                    }
                }
                return $.extend(!0, opts, userOptions), ("rtl" === npt.dir || opts.rightAlign) && (npt.style.textAlign = "right"), 
                ("rtl" === npt.dir || opts.numericInput) && (npt.dir = "ltr", npt.removeAttribute("dir"), 
                opts.isRTL = !0), opts;
            }
            var that = this;
            return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                var scopedOpts = $.extend(!0, {}, that.opts);
                importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute);
                var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                maskset !== undefined && (el.inputmask !== undefined && (el.inputmask.opts.autoUnmask = !0, 
                el.inputmask.remove()), el.inputmask = new Inputmask(undefined, undefined, !0), 
                el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), 
                el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, 
                el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
                    action: "mask"
                }));
            }), elems && elems[0] ? elems[0].inputmask || this : this;
        },
        option: function(options, noremask) {
            return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.userOptions, options), 
            this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
        },
        unmaskedvalue: function(value) {
            return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
            maskScope.call(this, {
                action: "unmaskedvalue",
                value: value
            });
        },
        remove: function() {
            return maskScope.call(this, {
                action: "remove"
            });
        },
        getemptymask: function() {
            return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
            maskScope.call(this, {
                action: "getemptymask"
            });
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
            maskScope.call(this, {
                action: "isComplete"
            });
        },
        getmetadata: function() {
            return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
            maskScope.call(this, {
                action: "getmetadata"
            });
        },
        isValid: function(value) {
            return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
            maskScope.call(this, {
                action: "isValid",
                value: value
            });
        },
        format: function(value, metadata) {
            return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
            maskScope.call(this, {
                action: "format",
                value: value,
                metadata: metadata
            });
        },
        analyseMask: function(mask, regexMask, opts) {
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
                this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                position = position !== undefined ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, opts.casing ? "i" : ""),
                    cardinality: 1,
                    optionality: mtoken.isOptional,
                    newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: undefined,
                    nativeDef: element
                }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function(ndx, lmnt) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: mtoken.isOptional,
                        newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                        nativeDef: lmnt
                    });
                })), escaped = !1; else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
                    if (maskdef && !escaped) {
                        for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                            var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                            mtoken.matches.splice(position++, 0, {
                                fn: validator ? "string" == typeof validator ? new RegExp(validator, opts.casing ? "i" : "") : new function() {
                                    this.test = validator;
                                }() : new RegExp("."),
                                cardinality: cardinality || 1,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                                casing: maskdef.casing,
                                def: maskdef.definitionSymbol || element,
                                placeholder: maskdef.placeholder,
                                nativeDef: element
                            }), prevMatch = mtoken.matches[position - 1];
                        }
                        mtoken.matches.splice(position++, 0, {
                            fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                                this.test = maskdef.validator;
                            }() : new RegExp("."),
                            cardinality: maskdef.cardinality,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            nativeDef: element
                        });
                    } else mtoken.matches.splice(position++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: mtoken.isOptional,
                        newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                        nativeDef: element
                    }), escaped = !1;
                }
            }
            function verifyGroupMarker(maskToken) {
                maskToken && maskToken.matches && $.each(maskToken.matches, function(ndx, token) {
                    var nextToken = maskToken.matches[ndx + 1];
                    (nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, 
                    regexMask || (insertTestDefinition(token, opts.groupmarker.start, 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker.end))), 
                    verifyGroupMarker(token);
                });
            }
            function defaultCase() {
                if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                    }
                } else insertTestDefinition(currentToken, m);
            }
            function reverseTokens(maskToken) {
                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) if (maskToken.matches.hasOwnProperty(match)) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                    }
                    maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = function(st) {
                        return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), 
                        st;
                    }(maskToken.matches[match]);
                }
                return maskToken;
            }
            var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = [];
            for (regexMask && (opts.optionalmarker.start = undefined, opts.optionalmarker.end = undefined); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask); ) {
                if (m = match[0], regexMask) switch (m.charAt(0)) {
                  case "?":
                    m = "{0,1}";
                    break;
                  case "+":
                  case "*":
                    m = "{" + m + "}";
                }
                if (escaped) defaultCase(); else switch (m.charAt(0)) {
                  case opts.escapeChar:
                    escaped = !0, regexMask && defaultCase();
                    break;
                  case opts.optionalmarker.end:
                  case opts.groupmarker.end:
                    if (openingToken = openenings.pop(), openingToken.openGroup = !1, openingToken !== undefined) if (openenings.length > 0) {
                        if ((currentOpeningToken = openenings[openenings.length - 1]).matches.push(openingToken), 
                        currentOpeningToken.isAlternator) {
                            alternator = openenings.pop();
                            for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, 
                            alternator.matches[mndx].alternatorGroup = !1;
                            openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                        }
                    } else currentToken.matches.push(openingToken); else defaultCase();
                    break;
                  case opts.optionalmarker.start:
                    openenings.push(new MaskToken(!1, !0));
                    break;
                  case opts.groupmarker.start:
                    openenings.push(new MaskToken(!0));
                    break;
                  case opts.quantifiermarker.start:
                    var quantifier = new MaskToken(!1, !1, !0), mq = (m = m.replace(/[{}]/g, "")).split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                    if ("*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                        min: mq0,
                        max: mq1
                    }, openenings.length > 0) {
                        var matches = openenings[openenings.length - 1].matches;
                        (match = matches.pop()).isGroup || ((groupToken = new MaskToken(!0)).matches.push(match), 
                        match = groupToken), matches.push(match), matches.push(quantifier);
                    } else (match = currentToken.matches.pop()).isGroup || (regexMask && null === match.fn && "." === match.def && (match.fn = new RegExp(match.def, opts.casing ? "i" : "")), 
                    (groupToken = new MaskToken(!0)).matches.push(match), match = groupToken), currentToken.matches.push(match), 
                    currentToken.matches.push(quantifier);
                    break;
                  case opts.alternatormarker:
                    if (openenings.length > 0) {
                        var subToken = (currentOpeningToken = openenings[openenings.length - 1]).matches[currentOpeningToken.matches.length - 1];
                        lastMatch = currentOpeningToken.openGroup && (subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : currentOpeningToken.matches.pop();
                    } else lastMatch = currentToken.matches.pop();
                    if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), 
                    lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), 
                    openenings.push(alternator), lastMatch.openGroup) {
                        lastMatch.openGroup = !1;
                        var alternatorGroup = new MaskToken(!0);
                        alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                    }
                    break;
                  default:
                    defaultCase();
                }
            }
            for (;openenings.length > 0; ) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
            return currentToken.matches.length > 0 && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), 
            (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
        }
    }, Inputmask.extendDefaults = function(options) {
        $.extend(!0, Inputmask.prototype.defaults, options);
    }, Inputmask.extendDefinitions = function(definition) {
        $.extend(!0, Inputmask.prototype.definitions, definition);
    }, Inputmask.extendAliases = function(alias) {
        $.extend(!0, Inputmask.prototype.aliases, alias);
    }, Inputmask.format = function(value, options, metadata) {
        return Inputmask(options).format(value, metadata);
    }, Inputmask.unmask = function(value, options) {
        return Inputmask(options).unmaskedvalue(value);
    }, Inputmask.isValid = function(value, options) {
        return Inputmask(options).isValid(value);
    }, Inputmask.remove = function(elems) {
        $.each(elems, function(ndx, el) {
            el.inputmask && el.inputmask.remove();
        });
    }, Inputmask.escapeRegex = function(str) {
        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    }, Inputmask.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91,
        X: 88
    }, Inputmask;
});
/*! validate v1.1.0 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/validate */
!(function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.validate=t(e)})("undefined"!=typeof global?global:this.window||this.global,(function(e){"use strict";var t,r={},a="querySelector"in document&&"addEventListener"in e,o={selector:"[data-validate]",fieldClass:"error",errorClass:"error-message",messageValueMissing:"Please fill out this field.",messageValueMissingSelect:"Please select a value.",messageValueMissingSelectMulti:"Please select at least one value.",messageTypeMismatchEmail:"Please enter an email address.",messageTypeMismatchURL:"Please enter a URL.",messageTooShort:"Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.",messageTooLong:"Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.",messagePatternMismatch:"Please match the requested format.",messageBadInput:"Please enter a number.",messageStepMismatch:"Please select a valid value.",messageRangeOverflow:"Please select a value that is no more than {max}.",messageRangeUnderflow:"Please select a value that is no less than {min}.",messageGeneric:"The value you entered for this field is invalid.",disableSubmit:!1,onSubmit:function(){},beforeShowError:function(){},afterShowError:function(){},beforeRemoveError:function(){},afterRemoveError:function(){}};Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),r=t.length;--r>=0&&t.item(r)!==this;);return r>-1});var s=function(){var e={},t=!1,r=0,a=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],r++);for(;r<a;r++){var o=arguments[r];!(function(r){for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t&&"[object Object]"===Object.prototype.toString.call(r[a])?e[a]=s(!0,e[a],r[a]):e[a]=r[a])})(o)}return e},n=function(e,t){for(;e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null};r.hasError=function(e,r){var a=s(t||o,r||{});if(!e.disabled&&"file"!==e.type&&"reset"!==e.type&&"submit"!==e.type&&"button"!==e.type){var n=e.validity;if(!n.valid){if(n.valueMissing)return"select-multiple"===e.type?a.messageValueMissingSelectMulti:"select-one"===e.type?a.messageValueMissingSelect:a.messageValueMissing;if(n.typeMismatch){if("email"===e.type)return a.messageTypeMismatchEmail;if("url"===e.type)return a.messageTypeMismatchURL}return n.tooShort?a.messageTooShort.replace("{minLength}",e.getAttribute("minLength")).replace("{length}",e.value.length):n.tooLong?a.messageTooLong.replace("{minLength}",e.getAttribute("maxLength")).replace("{length}",e.value.length):n.badInput?a.messageBadInput:n.stepMismatch?a.messageStepMismatch:n.rangeOverflow?a.messageRangeOverflow.replace("{max}",e.getAttribute("max")):n.rangeUnderflow?a.messageRangeUnderflow.replace("{min}",e.getAttribute("min")):n.patternMismatch?e.hasAttribute("title")?e.getAttribute("title"):a.messagePatternMismatch:a.messageGeneric}}},r.showError=function(e,r,a){var i=s(t||o,a||{});if(i.beforeShowError(e,r),e.classList.add(i.fieldClass),"radio"===e.type&&e.name){var l=document.getElementsByName(e.name);if(l.length>0){for(var m=0;m<l.length;m++)l[m].form===e.form&&l[m].classList.add(i.fieldClass);e=l[l.length-1]}}var c=e.id||e.name;if(c){var u=e.form.querySelector("."+i.errorClass+"#error-for-"+c);if(!u){u=document.createElement("div"),u.className=i.errorClass,u.id="error-for-"+c;var f;"radio"!==e.type&&"checkbox"!==e.type||(f=e.form.querySelector('label[for="'+c+'"]')||n(e,"label"))&&f.parentNode.insertBefore(u,f.nextSibling),f||e.parentNode.insertBefore(u,e.nextSibling)}e.setAttribute("aria-describedby","error-for-"+c),u.innerHTML=r,u.style.display="",u.style.visibility="",i.afterShowError(e,r)}},r.removeError=function(e,r){var a=s(t||o,r||{});if(a.beforeRemoveError(e),e.removeAttribute("aria-describedby"),e.classList.remove(a.fieldClass),"radio"===e.type&&e.name){var n=document.getElementsByName(e.name);if(n.length>0){for(var i=0;i<n.length;i++)n[i].form===e.form&&n[i].classList.remove(a.fieldClass);e=n[n.length-1]}}var l=e.id||e.name;if(l){var m=e.form.querySelector("."+a.errorClass+"#error-for-"+l);m&&(m.innerHTML="",m.style.display="none",m.style.visibility="hidden",a.afterRemoveError(e))}};var i=function(e){for(var r=document.querySelectorAll(t.selector),a=0;a<r.length;a++)e?r[a].removeAttribute("novalidate"):r[a].setAttribute("novalidate",!0)},l=function(e){if(e.target.form&&e.target.form.matches(t.selector)){var a=r.hasError(e.target);if(a)return void r.showError(e.target,a);r.removeError(e.target)}},m=function(e){if(e.target.form&&e.target.form.matches(t.selector)){var a=e.target.getAttribute("type");if("checkbox"===a||"radio"===a){var o=r.hasError(e.target);if(o)return void r.showError(e.target,o);r.removeError(e.target)}}},c=function(e){if(e.target.matches(t.selector)){for(var a,o=e.target.elements,s=0;s<o.length;s++){var n=r.hasError(o[s]);n&&(r.showError(o[s],n),a||(a=o[s]))}if((a||t.disableSubmit)&&e.preventDefault(),a)return void a.focus();t.onSubmit(e.target,o)}};return r.destroy=function(){if(t){document.removeEventListener("blur",l,!1),document.removeEventListener("click",m,!0),document.removeEventListener("submit",c,!1);for(var e=document.querySelectorAll(t.errorClass),a=0;a<e.length;a++)r.removeError(e[a]);i(!0),t=null}},r.init=function(e){a&&(r.destroy(),t=s(o,e||{}),i(),document.addEventListener("blur",l,!0),document.addEventListener("click",m,!0),document.addEventListener("submit",c,!1))},r}));
/**
 * form-serialize v0.2.1
 *
 * Copyright 2017, Dimitar Ivanov (https://zinoui.com/)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 function serialize(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":case"color":case"date":case"datetime-local":case"email":case"month":case"number":case"range":case"search":case"tel":case"time":case"url":case"week":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};
var tns=function(){function e(){for(var e,t,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(e=arguments[a]))for(t in e)n=e[t],i!==n&&void 0!==n&&(i[t]=n);return i}function t(e){return["true","false"].indexOf(e)>=0?JSON.parse(e):e}function n(e,t,n){return n&&localStorage.setItem(e,t),t}function i(){var e=window.tnsId;return window.tnsId=e?e+1:1,"tns"+window.tnsId}function a(){var e=document,t=e.body;return t||(t=e.createElement("body"),t.fake=!0),t}function r(e){var t="";return e.fake&&(t=k.style.overflow,e.style.background="",e.style.overflow=k.style.overflow="hidden",k.appendChild(e)),t}function o(e,t){e.fake&&(e.remove(),k.style.overflow=t,k.offsetHeight)}function s(e){var t=document.createElement("style");return e&&t.setAttribute("media",e),document.querySelector("head").appendChild(t),t.sheet?t.sheet:t.styleSheet}function l(e,t,n,i){"insertRule"in e?e.insertRule(t+"{"+n+"}",i):e.addRule(t,n,i)}function c(e){return("insertRule"in e?e.cssRules:e.rules).length}function u(e,t){return Math.atan2(e,t)*(180/Math.PI)}function d(e,t){var n=!1,i=Math.abs(90-Math.abs(e));return i>=90-t?n="horizontal":i<=t&&(n="vertical"),n}function f(e,t){return e.className.indexOf(t)>=0}function v(e,t){f(e,t)||(e.className+=" "+t)}function h(e,t){f(e,t)&&(e.className=e.className.replace(t,""))}function p(e,t){return e.hasAttribute(t)}function m(e,t){return e.getAttribute(t)}function y(e){return void 0!==e.item}function g(e,t){if(e=y(e)||e instanceof Array?e:[e],"[object Object]"===Object.prototype.toString.call(t))for(var n=e.length;n--;)for(var i in t)e[n].setAttribute(i,t[i])}function b(e,t){e=y(e)||e instanceof Array?e:[e],t=t instanceof Array?t:[t];for(var n=t.length,i=e.length;i--;)for(var a=n;a--;)e[i].removeAttribute(t[a])}function x(e){p(e,"hidden")||g(e,{hidden:""})}function T(e){p(e,"hidden")&&b(e,"hidden")}function E(e){return"boolean"==typeof e.complete?e.complete:"number"==typeof e.naturalWidth?0!==e.naturalWidth:void 0}function C(e){for(var t=document.createElement("fakeelement"),n=(e.length,0);n<e.length;n++){var i=e[n];if(void 0!==t.style[i])return i}return!1}function w(e,t){var n=!1;return/^Webkit/.test(e)?n="webkit"+t+"End":/^O/.test(e)?n="o"+t+"End":e&&(n=t.toLowerCase()+"end"),n}function D(e,t){for(var n in t){var i=("touchstart"===n||"touchmove"===n)&&W;e.addEventListener(n,t[n],i)}}function N(e,t){for(var n in t){var i=["touchstart","touchmove"].indexOf(n)>=0&&W;e.removeEventListener(n,t[n],i)}}function O(){return{topics:{},on:function(e,t){this.topics[e]=this.topics[e]||[],this.topics[e].push(t)},off:function(e,t){if(this.topics[e])for(var n=0;n<this.topics[e].length;n++)if(this.topics[e][n]===t){this.topics[e].splice(n,1);break}},emit:function(e,t){this.topics[e]&&this.topics[e].forEach(function(e){e(t)})}}}function A(e,t,n,i,a,r,o){function s(){r-=l,u+=d,e.style[t]=n+u+c+i,r>0?setTimeout(s,l):o()}var l=Math.min(r,10),c=a.indexOf("%")>=0?"%":"px",a=a.replace(c,""),u=Number(e.style[t].replace(n,"").replace(i,"").replace(c,"")),d=(a-u)/r*l;setTimeout(s,l)}Object.keys||(Object.keys=function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}),function(){"use strict";"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})}();var k=document.documentElement,P=!1;try{var M=Object.defineProperty({},"passive",{get:function(){P=!0}});window.addEventListener("test",null,M)}catch(e){}var W=!!P&&{passive:!0},I=navigator.userAgent,S=!0,L=localStorage;try{L.tnsApp?L.tnsApp!==I&&(L.tnsApp=I,["tC","tSP","tMQ","tTf","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(e){L.removeItem(e)})):L.tnsApp=I}catch(e){S=!1}var H=document,z=window,B={ENTER:13,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40},R=t(L.tC)||n("tC",function(){var e=document,t=a(),n=r(t),i=e.createElement("div"),s=!1;t.appendChild(i);try{for(var l,c=["calc(10px)","-moz-calc(10px)","-webkit-calc(10px)"],u=0;u<3;u++)if(l=c[u],i.style.width=l,10===i.offsetWidth){s=l.replace("(10px)","");break}}catch(e){}return t.fake?o(t,n):i.remove(),s}(),S),j=t(L.tSP)||n("tSP",function(){var e,t,n=document,i=a(),s=r(i),l=n.createElement("div"),c=n.createElement("div");return l.style.cssText="width: 10px",c.style.cssText="float: left; width: 5.5px; height: 10px;",e=c.cloneNode(!0),l.appendChild(c),l.appendChild(e),i.appendChild(l),t=c.offsetTop!==e.offsetTop,i.fake?o(i,s):l.remove(),t}(),S),q=t(L.tMQ)||n("tMQ",function(){var e,t=document,n=a(),i=r(n),s=t.createElement("div"),l=t.createElement("style"),c="@media all and (min-width:1px){.tns-mq-test{position:absolute}}";return l.type="text/css",s.className="tns-mq-test",n.appendChild(l),n.appendChild(s),l.styleSheet?l.styleSheet.cssText=c:l.appendChild(t.createTextNode(c)),e=window.getComputedStyle?window.getComputedStyle(s).position:s.currentStyle.position,n.fake?o(n,i):s.remove(),"absolute"===e}(),S��Y    ��Y                    `GO             X<    H�Y             �Y     @       �Y            t(L.tTDu)||n("tTDu",C(["transitionDuration","WebkitTransitionDuration","MozTransitionDuration","OTransitionDuration"]),S),U=t(L.tTDe)||n("tTDe",C(["transitionDelay","WebkitTransitionDelay","MozTransitionDelay","OTransitionDelay"]),S),X=t(L.tADu)||n("tADu",C(["animationDuration","WebkitAnimationDuration","MozAnimationDuration","OAnimationDuration"]),S),V=t(L.tADe)||n("tADe",C(["animationDelay","WebkitAnimationDelay","MozAnimationDelay","OAnimationDelay"]),S),Y=t(L.tTE)||n("tTE",w(F,"Transition"),S),K=t(L.tAE)||n("tAE",w(X,"Animation"),S);return q||(j=!1),function(t){function n(){return z.innerWidth||H.documentElement.clientWidth||H.body.clientWidth}function a(e){var n=t[e];return!n&&lt&&st.indexOf(e)>=0&&lt.forEach(function(t){ot[t][e]&&(n=!0)}),n}function r(e,n){n=n?n:ut;var i,a={slideBy:"page",edgePadding:!1,autoHeight:!0};if(!Ve&&e in a)i=a[e];else if("items"===e&&r("fixedWidth"))i=Math.floor(rt/(r("fixedWidth")+r("gutter")));else if("autoHeight"===e&&"outer"===yt)i=!0;else if(i=t[e],lt&&st.indexOf(e)>=0)for(var o=0,s=lt.length;o<s;o++){var l=lt[o];if(!(n>=l))break;e in ot[l]&&(i=ot[l][e])}return"slideBy"===e&&"page"===i&&(i=r("items")),i}function o(e){return R?R+"("+100*e+"% / "+Pt+")":100*e/Pt+"%"}function y(e,t,n){var i="";if(e){var a=e;t&&(a+=t),i=n?"margin: 0px "+(rt%(n+t)+t)/2+"px":$e?"margin: 0 "+e+"px 0 "+a+"px;":"padding: "+a+"px 0 "+e+"px 0;"}else if(t&&!n){var r="-"+t+"px",o=$e?r+" 0 0":"0 "+r+" 0";i="margin: 0 "+o+";"}return i}function C(e,t,n){return e?(e+t)*Pt+"px":R?R+"("+100*Pt+"% / "+n+")":100*Pt/n+"%"}function w(e,t,n){var i="";if($e){if(i="width:",e)i+=e+t+"px";else{var a=Ve?Pt:n;i+=R?R+"(100% / "+a+")":100/a+"%"}i+=Jt+";"}return i}function k(e){var t="";if(e!==!1){t=($e?"padding-":"margin-")+($e?"right":"bottom")+": "+e+"px;"}return t}function P(e){e=e||z.event,clearTimeout(vt),vt=setTimeout(function(){var t=n();ut!==t&&(ut=t,M(),"outer"===yt&&Ft.emit("outerResized",qe(e)))},100)}function M(){var e=ct,t=Ht,n=pt,i=Qt;if(rt=_e.clientWidth,Ze=et.clientWidth,lt&&W(),e!==ct||xt){var a=Tt,o=Dt,s=xt,u=bt,d=gt,f=Yt;if(pt=r("items"),mt=r("slideBy"),Yt=r("disable"),Qt=!!Yt||!!Kt&&at<=pt,pt!==n&&(jt=Pt-pt-Bt,Kn()),Yt!==f&&S(Yt),Qt!==i&&(Qt&&(Ht=Ve?kt:0),I()),e!==ct&&(Et=r("speed"),bt=r("edgePadding"),gt=r("gutter"),xt=r("fixedWidth"),Yt||xt===s||de(),(Dt=r("autoHeight"))!==o&&(Dt||(et.style.height=""))),Tt=!Qt&&r("arrowKeys"),Tt!==a&&(Tt?D(H,tn):N(H,tn)),rn){var v=pn,h=mn;pn=!Qt&&r("controls"),mn=r("controlsText"),pn!==v&&(pn?T(yn):x(yn)),mn!==h&&(dn.innerHTML=mn[0],fn.innerHTML=mn[1])}if(on){var p=bn;bn=!Qt&&r("nav"),bn!==p&&(bn?(T(xn),je()):x(xn))}if(ln){var m=Gn;Gn=!Qt&&r("touch"),Gn!==m&&Ve&&(Gn?D(tt,nn):N(tt,nn))}if(cn){var g=Vn;Vn=!Qt&&r("mouseDrag"),Vn!==g&&Ve&&(Vn?D(tt,an):N(tt,an))}if(sn){var b=An,E=Wn,O=zn,A=Mn;if(Qt?An=Wn=zn=!1:(An=r("autoplay"),An?(Wn=r("autoplayHoverPause"),zn=r("autoplayResetOnVisibility")):Wn=zn=!1),Mn=r("autoplayText"),kn=r("autoplayTimeout"),An!==b&&(An?(In&&T(In),Sn||Te()):(In&&x(In),Sn&&Ee())),Wn!==E&&(Wn?D(tt,_t):N(tt,_t)),zn!==O&&(zn?D(H,en):N(H,en)),In&&Mn!==A){var P=An?1:0,M=In.innerHTML,L=M.length-A[P].length;M.substring(L)===A[P]&&(In.innerHTML=M.substring(0,L)+Mn[P])}}if(!q){if(Qt||bt===u&&gt===d||(et.style.cssText=y(bt,gt,xt)),Ve&&$e&&(xt!==s||gt!==d||pt!==n)&&(tt.style.width=C(xt,gt,pt)),$e&&(pt!==n||gt!==d)){var z=w(xt,gt,pt)+k(gt);Nt.removeRule(c(Nt)-1),l(Nt,"#"+Vt+" > .tns-item",z,c(Nt))}xt||Ht!==t||ve(0)}Ht!==t&&(Ft.emit("indexChanged",qe()),ve(0),zt=Ht),pt!==n&&(_(),Z(),navigator.msMaxTouchPoints&&ne())}$e||Yt||(te(),Be(),de()),xt&&bt&&(Qt||rt<=xt+gt?"0px"!==et.style.margin&&(et.style.margin="0px"):et.style.cssText=y(bt,gt,xt)),Z()}function W(){ct=0,lt.forEach(function(e,t){ut>=e&&(ct=t+1)})}function I(){if(kt){var e="tns-transparent";if(Qt){if(!f(it[0],e)){bt&&(et.style.margin="0px");for(var t=kt;t--;)v(it[t],e),v(it[Pt-t-1],e)}}else if(bt&&!xt&&q&&et.style.margin&&(et.style.margin=""),f(it[0],e))for(var t=kt;t--;)h(it[t],e),h(it[Pt-t-1],e)}}function S(e){var t=it.length;if(e){if(Nt.disabled=!0,tt.className=tt.className.replace(Xt.substring(1),""),tt.style="",wt)for(var n=kt;n--;)Ve&&x(it[n]),x(it[t-n-1]);if($e&&Ve||(et.style=""),!Ve)for(var i=Ht;i<Ht+at;i++){var a=it[i];a.style="",h(a,Ye),h(a,Je)}}else{if(Nt.disabled=!1,tt.className+=Xt,$e||te(),de(),wt)for(var n=kt;n--;)Ve&&T(it[n]),T(it[t-n-1]);if(!Ve)for(var i=Ht;i<Ht+at;i++){var a=it[i],r=i<Ht+pt?Ye:Je;a.style.left=100*(i-Ht)/pt+"%",v(a,r)}}}function L(){Sn&&(Ee(),Ln=!0)}function Q(){!Sn&&Ln&&(Te(),Ln=!1)}function J(){if(Ot&&!Yt){var e=Ht,t=Ht+pt;for(bt&&(e-=1,t+=1);e<t;e++)[].forEach.call(it[e].querySelectorAll(".tns-lazy-img"),function(e){var t={};t[Y]=function(e){e.stopPropagation()},D(e,t),f(e,"loaded")||(e.src=m(e,"data-src"),v(e,"loaded"))})}}function Z(){if(Dt&&!Yt){for(var e=[],t=Ht;t<Ht+pt;t++)[].forEach.call(it[t].querySelectorAll("img"),function(t){e.push(t)});0===e.length?ee():$(e)}}function $(e){e.forEach(function(t,n){E(t)&&e.splice(n,1)}),0===e.length?ee():setTimeout(function(){$(e)},16)}function _(){J(),ie(),le(),je(),ae()}function ee(){for(var e,t=[],n=Ht;n<Ht+pt;n++)t.push(it[n].offsetHeight);e=Math.max.apply(null,t),et.style.height!==e&&(F&&ce(Et),et.style.height=e+"px")}function te(){ft=[0];for(var e,t=it[0].getBoundingClientRect().top,n=1;n<Pt;n++)e=it[n].getBoundingClientRect().top,ft.push(e-t)}function ne(){_e.style.msScrollSnapPointsX="snapInterval(0%, "+100/pt+"%)"}function ie(){for(var e=Pt;e--;){var t=it[e];e>=Ht&&e<Ht+pt?p(t,"tabindex")&&(g(t,{"aria-hidden":"false"}),b(t,["tabindex"]),v(t,un)):(p(t,"tabindex")||g(t,{"aria-hidden":"true",tabindex:"-1"}),f(t,un)&&h(t,un))}}function ae(){if(bn&&(wn=Cn!==-1?Cn:(Ht-Bt)%at,Cn=-1,wn!==Dn)){var e=gn[Dn],t=gn[wn];g(e,{tabindex:"-1","aria-selected":"false"}),g(t,{tabindex:"0","aria-selected":"true"}),h(e,Nn),v(t,Nn)}}function re(e){return"button"===e.nodeName.toLowerCase()}function oe(e){return"true"===e.getAttribute("aria-disabled")}function se(e,t,n){e?t.disabled=n:t.setAttribute("aria-disabled",n.toString())}function le(){if(pn&&!wt){var e=vn?dn.disabled:oe(dn),t=hn?fn.disabled:oe(fn),n=Ht===Rt,i=!Ct&&Ht===jt;n&&!e&&se(vn,dn,!0),!n&&e&&se(vn,dn,!1),i&&!t&&se(hn,fn,!0),!i&&t&&se(hn,fn,!1)}}function ce(e,t){e=e?e/1e3+"s":"",t=t||tt,t.style[F]=e,Ve||(t.style[X]=e),$e||(et.style[F]=e)}function ue(){var e;if($e)if(xt)e=-(xt+gt)*Ht+"px";else{var t=G?Pt:pt;e=100*-Ht/t+"%"}else e=-ft[Ht]+"px";return e}function de(e){e||(e=ue()),tt.style[It]=St+e+Lt}function fe(e,t,n,i){for(var a=e,r=e+pt;a<r;a++){var o=it[a];i||(o.style.left=100*(a-Ht)/pt+"%"),F&&ce(Et,o),Qe&&U&&(o.style[U]=o.style[V]=Qe*(a-e)/1e3+"s"),h(o,t),v(o,n),i&&At.push(o)}}function ve(e,t){void 0===e&&(e=Et),F&&ce(e),Qn(e,t)}function he(e){Wt&&Kn(),(Ht!==zt||e)&&(Ft.emit("indexChanged",qe()),Ft.emit("transitionStart",qe()),qt=!0,ve())}function pe(e){return e.toLowerCase().replace(/-/g,"")}function me(e){if(Ve||qt){if(Ft.emit("transitionEnd",qe(e)),!Ve&&At.length>0)for(var t=0;t<pt;t++){var n=At[t];n.style.left="",F&&ce(0,n),Qe&&U&&(n.style[U]=n.style[V]=""),h(n,Ke),v(n,Je)}if(!e||!Ve&&e.target.parentNode===tt||e.target===tt&&pe(e.propertyName)===pe(It)){if(!Wt){var i=Ht;Kn(),Ht!==i&&(Ft.emit("indexChanged",qe()),F&&ce(0),de())}Z(),"inner"===yt&&Ft.emit("innerLoaded",qe()),qt=!1,Dn=wn,zt=Ht}}}function ye(e){if(!Qt)if("prev"===e)ge(null,-1);else if("next"===e)ge(null,1);else if(!qt){var t=Ht%at,n=0;if(!wt&&a("edgePadding")&&t--,t<0&&(t+=at),"first"===e)n=-t;else if("last"===e)n=at-pt-t;else if("number"!=typeof e&&(e=parseInt(e)),!isNaN(e)){var i=e%at;i<0&&(i+=at),!wt&&bt&&(i+=1),n=i-t}Ht+=n,Ht%at!=zt%at&&he()}}function ge(e,t){if(!qt){if(!t){e=e||z.event;for(var n=e.target||e.srcElement;n!==yn&&[dn,fn].indexOf(n)<0;)n=n.parentNode;n===dn?t=-1:n===fn&&(t=1)}t===-1?Ht-=mt:1===t&&(Ct&&Ht===jt?ye(0):Ht+=mt),he()}}function be(e){if(!qt){e=e||z.event;for(var t,n=e.target||e.srcElement;n!==xn&&!p(n,"data-nav");)n=n.parentNode;p(n,"data-nav")&&(t=Cn=[].indexOf.call(gn,n),ye(t))}}function xe(e,t){g(In,{"data-action":e}),In.innerHTML=Hn[0]+e+Hn[1]+t}function Te(){we(),In&&xe("stop",Mn[1]),Sn=!0}function Ee(){Ce(),In&&xe("start",Mn[0]),Sn=!1}function Ce(){Sn="paused",clearInterval(On)}function we(){Sn!==!0&&(clearInterval(On),On=setInterval(function(){ge(null,Pn)},kn))}function De(){Sn?Ee():Te()}function Ne(){Bn!=H.hidden&&Sn!==!1&&(H.hidden?Ce():we()),Bn=H.hidden}function Oe(e){switch(e=e||z.event,e.keyCode){case B.LEFT:ge(null,-1);break;case B.RIGHT:ge(null,1)}}function Ae(e){switch(e=e||z.event,e.keyCode){case B.LEFT:case B.UP:case B.PAGEUP:dn.disabled||ge(null,-1);break;case B.RIGHT:case B.DOWN:case B.PAGEDOWN:fn.disabled||ge(null,1);break;case B.HOME:ye(0);break;case B.END:ye(at-1)}}function ke(e){e.focus()}function Pe(e){function n(e){return t.navContainer?e:Tn[e]}var i=H.activeElement;if(p(i,"data-nav")){e=e||z.event;var a=e.keyCode,r=[].indexOf.call(gn,i),o=Tn.length,s=Tn.indexOf(r);switch(t.navContainer&&(o=at,s=r),a){case B.LEFT:case B.PAGEUP:s>0&&ke(gn[n(s-1)]);break;case B.UP:case B.HOME:s>0&&ke(gn[n(0)]);break;case B.RIGHT:case B.PAGEDOWN:s<o-1&&ke(gn[n(s+1)]);break;case B.DOWN:case B.END:s<o-1&&ke(gn[n(o-1)]);break;case B.ENTER:case B.SPACE:Cn=r,ye(r)}}}function Me(){ve(0,tt.scrollLeft()),zt=Ht}function We(e){return e.target||e.srcElement}function Ie(e){return e.type.indexOf("touch")>=0}function Se(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function Le(e){if(Xn=0,ht=!1,Fn=Un=null,!qt){e=e||z.event;var t;Ie(e)?(t=e.changedTouches[0],Ft.emit("touchStart",qe(e))):(t=e,Se(e),Ft.emit("dragStart",qe(e))),Fn=parseInt(t.clientX),Un=parseInt(t.clientY),Rn=parseFloat(tt.style[It].replace(St,"").replace(Lt,""))}}function He(e){if(!qt&&null!==Fn){e=e||z.event;var n;if(Ie(e)?n=e.changedTouches[0]:(n=e,Se(e)),jn=parseInt(n.clientX)-Fn,qn=parseInt(n.clientY)-Un,0===Xn&&(Xn=d(u(qn,jn),15)===t.axis),Xn){Ie(e)?Ft.emit("touchMove",qe(e)):(Yn||(Yn=!0),Ft.emit("dragMove",qe(e))),ht||(ht=!0);var i=Rn;if($e)if(xt)i+=jn,i+="px";else{var a=G?jn*pt*100/(Ze*Pt):100*jn/Ze;i+=a,i+="%"}else i+=qn,i+="px";G&&ce(0),tt.style[It]=St+i+Lt}}}function ze(e){if(!qt&&ht){e=e||z.event;var t;Ie(e)?(t=e.changedTouches[0],Ft.emit("touchEnd",qe(e))):(t=e,Ft.emit("dragEnd",qe(e))),jn=parseInt(t.clientX)-Fn,qn=parseInt(t.clientY)-Un;var n=Boolean($e?jn:qn);if(Xn=0,ht=!1,Fn=Un=null,$e){var i=-jn*pt/Ze;i=jn>0?Math.floor(i):Math.ceil(i),Ht+=i}else{var a=-(Rn+qn);if(a<=0)Ht=Rt;else if(a>=ft[ft.length-1])Ht=jt;else{var r=0;do{r++,Ht=qn<0?r+1:r}while(r<Pt&&a>=ft[r+1])}}if(he(n),Yn){Yn=!1;var o=We(e);D(o,{click:function e(t){Se(t),N(o,{click:e})}})}}}function Be(){et.style.height=ft[Ht+pt]-ft[Ht]+"px"}function Re(){Tn=[];for(var e=!wt&&bt?Ht-1:Ht,t=e%at%pt;t<at;)!wt&&t+pt>at&&(t=at-pt),Tn.push(t),t+=pt;(wt&&Tn.length*pt<at||!wt&&Tn[0]>0)&&Tn.unshift(0)}function je(){bn&&!t.navContainer&&Tn.indexOf(Ht%at)<0&&(Re(),Tn!==En&&(En.length>0&&En.forEach(function(e){x(gn[e])}),Tn.length>0&&Tn.forEach(function(e){T(gn[e])}),En=Tn))}function qe(e){return{container:tt,slideItems:it,navContainer:xn,navItems:gn,controlsContainer:yn,hasControls:rn,prevButton:dn,nextButton:fn,items:pt,slideBy:mt,cloneCount:kt,slideCount:at,slideCountNew:Pt,index:Ht,indexCached:zt,navCurrentIndex:wn,navCurrentIndexCached:Dn,visibleNavIndexes:Tn,visibleNavIndexesCached:En,event:e||{}}}if(t=e({container:H.querySelector(".slider"),mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,slideBy:1,controls:!0,controlsText:["prev","next"],controlsContainer:!1,nav:!0,navContainer:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,touch:!0,mouseDrag:!1,nested:!1,freezable:!0,onInit:!1},t||{}),["container","controlsContainer","navContainer","autoplayButton"].forEach(function(e){"string"==typeof t[e]&&(t[e]=H.querySelector(t[e]))}),t.container&&t.container.nodeName&&!(t.container.children.length<2)){if(t.responsive){var Ge={},Fe=t.responsive;for(var Ue in Fe){var Xe=Fe[Ue];Ge[Ue]="number"==typeof Xe?{items:Xe}:Xe}t.responsive=Ge,Ge=null,0 in t.responsive&&(t=e(t,t.responsive[0]),delete t.responsive[0])}var Ve="carousel"===t.mode;if(!Ve){t.axis="horizontal",t.rewind=!1,t.loop=!0,t.edgePadding=!1;var Ye="tns-fadeIn",Ke="tns-fadeOut",Qe=!1,Je=t.animateNormal||"tns-normal";Y&&K&&(Ye=t.animateIn||Ye,Ke=t.animateOut||Ke,Qe=t.animateDelay||Qe)}var Ze,$e="horizontal"===t.axis,_e=H.createElement("div"),et=H.createElement("div"),tt=t.container,nt=tt.parentNode,it=tt.children,at=it.length,rt=nt.clientWidth,ot=t.responsive,st=[],lt=!1,ct=0,ut=n();if(ot){lt=Object.keys(ot).map(function(e){return parseInt(e)}).sort(function(e,t){return e-t}),lt.forEach(function(e){st=st.concat(Object.keys(ot[e]))});var dt=[];st.forEach(function(e){dt.indexOf(e)<0&&dt.push(e)}),st=dt,W()}var ft,vt,ht,pt=r("items"),mt="page"===r("slideBy")?pt:r("slideBy"),yt=t.nested,gt=r("gutter"),bt=r("edgePadding"),xt=r("fixedWidth"),Tt=r("arrowKeys"),Et=r("speed"),Ct=t.rewind,wt=!Ct&&t.loop,Dt=r("autoHeight"),Nt=s(),Ot=t.lazyload,At=[],kt=wt?2*at:a("edgePadding")?1:0,Pt=Ve?at+2*kt:at+kt,Mt=!(!xt||wt||bt),Wt=!Ve||!wt,It=$e?"left":"top",St="",Lt="",Ht=Ve?kt:0,zt=Ht,Bt=!wt&&a("edgePadding")?1:0,Rt=Bt,jt=Pt-pt-Bt,qt=!1,Gt=t.onInit,Ft=new O,Ut=tt.id,Xt=" tns-slider tns-"+t.mode,Vt=tt.id||i(),Yt=r("disable"),Kt=t.freezable,Qt=!!Yt||!!Kt&&at<=pt,Jt="inner"===yt?" !important":"",Zt={click:ge,keydown:Ae},$t={click:be,keydown:Pe},_t={mouseover:L,mouseout:Q},en={visibilitychange:Ne},tn={keydown:Oe},nn={touchstart:Le,touchmove:He,touchend:ze,touchcancel:ze},an={mousedown:Le,mousemove:He,mouseup:ze,mouseleave:ze},rn=a("controls"),on=a("nav"),sn=a("autoplay"),ln=a("touch"),cn=a("mouseDrag"),un="tns-slide-active";if(rn)var dn,fn,vn,hn,pn=r("controls"),mn=r("controlsText"),yn=t.controlsContainer;if(on)var gn,bn=r("nav"),xn=t.navContainer,Tn=[],En=Tn,Cn=-1,wn=0,Dn=0,Nn="tns-nav-active";if(sn)var On,An=r("autoplay"),kn=r("autoplayTimeout"),Pn="forward"===t.autoplayDirection?1:-1,Mn=r("autoplayText"),Wn=r("autoplayHoverPause"),In=t.autoplayButton,Sn=!1,Ln=!1,Hn=["<span class='tns-visually-hidden'>"," animation</span>"],zn=r("autoplayResetOnVisibility"),Bn=!1;if(ln)var Rn,jn,qn,Gn=r("touch"),Fn=null,Un=null,Xn=0;if(cn)var Vn=r("mouseDrag"),Yn=!1;Qt&&(pn=bn=Gn=Vn=Tt=An=Wn=zn=!1),G&&(It=G,St="translate",St+=$e?"X(":"Y(",Lt=")"),function(){_e.appendChild(et),nt.insertBefore(_e,tt),et.appendChild(tt),Ze=et.clientWidth;var e="tns-outer",n="tns-inner";if(Ve?$e&&(a("edgePadding")||a("gutter")&&!t.fixedWidth)?e+=" tns-ovh":n+=" tns-ovh":a("gutter")&&(e+=" tns-ovh"),_e.className=e,et.className=n,et.id=Vt+"-iw",Dt&&(et.className+=" tns-ah",et.style[F]=Et/1e3+"s"),""===tt.id&&(tt.id=Vt),Xt+=j?" tns-subpixel":" tns-no-subpixel",Xt+=R?" tns-calc":" tns-no-calc",Ve&&(Xt+=" tns-"+t.axis),tt.className+=Xt,Ve&&Y){var i={};i[Y]=me,D(tt,i)}e=n=null;for(var s=0;s<at;s++){var u=it[s];u.id||(u.id=Vt+"-item"+s),v(u,"tns-item"),!Ve&&Je&&v(u,Je),g(u,{"aria-hidden":"true",tabindex:"-1"})}if(wt||bt){for(var d=H.createDocumentFragment(),f=H.createDocumentFragment(),p=kt;p--;){var m=p%at,T=it[m].cloneNode(!0);if(b(T,"id"),f.insertBefore(T,f.firstChild),Ve){var E=it[at-1-m].cloneNode(!0);b(E,"id"),d.appendChild(E)}}tt.insertBefore(d,tt.firstChild),tt.appendChild(f),it=tt.children}for(var N=Ht;N<Ht+Math.min(at,pt);N++){var u=it[N];g(u,{"aria-hidden":"false"}),b(u,["tabindex"]),v(u,un),Ve||(u.style.left=100*(N-Ht)/pt+"%",v(u,Ye),h(u,Je))}if(Ve&&$e)if(j){var O=z.getComputedStyle(it[0]).fontSize;O.indexOf("em")>0&&(O=16*parseFloat(O)+"px"),l(Nt,"#"+Vt,"font-size:0;",c(Nt)),l(Nt,"#"+Vt+" > .tns-item","font-size:"+O+";",c(Nt))}else[].forEach.call(it,function(e,t){e.style.marginLeft=o(t)});if(q){var A=y(t.edgePadding,t.gutter,t.fixedWidth);l(Nt,"#"+Vt+"-iw",A,c(Nt)),Ve&&$e&&(A="width:"+C(t.fixedWidth,t.gutter,t.items),l(Nt,"#"+Vt,A,c(Nt))),($e||t.gutter)&&(A=w(t.fixedWidth,t.gutter,t.items)+k(t.gutter),l(Nt,"#"+Vt+" > .tns-item",A,c(Nt)))}else if(et.style.cssText=y(bt,gt,xt),Ve&&$e&&(tt.style.width=C(xt,gt,pt)),$e||gt){var A=w(xt,gt,pt)+k(gt);l(Nt,"#"+Vt+" > .tns-item",A,c(Nt))}if($e||Yt||(te(),Be()),ot&&q&&lt.forEach(function(e){var t=ot[e],n="",i="",o="",s="",l=r("items",e),c=r("fixedWidth",e),u=r("edgePadding",e),d=r("gutter",e);("edgePadding"in t||"gutter"in t)&&(i="#"+Vt+"-iw{"+y(u,d,c)+"}"),Ve&&$e&&("fixedWidth"in t||"gutter"in t||"items"in t)&&(o="#"+Vt+"{width:"+C(c,d,l)+"}"),("fixedWidth"in t||a("fixedWidth")&&"gutter"in t||!Ve&&"items"in t)&&(s+=w(c,d,l)),"gutter"in t&&(s+=k(d)),s.length>0&&(s="#"+Vt+" > .tns-item{"+s+"}"),n=i+o+s,n.length>0&&Nt.insertRule("@media (min-width: "+e/16+"em) {"+n+"}",Nt.cssRules.length)}),Ve&&!Yt&&de(),navigator.msMaxTouchPoints&&(v(_e,"ms-touch"),D(_e,{scroll:Me}),ne()),on){var W=Ve?kt:0;if(xn)g(xn,{"aria-label":"Carousel Pagination"}),gn=xn.children,[].forEach.call(gn,function(e,t){g(e,{"data-nav":t,tabindex:"-1","aria-selected":"false","aria-controls":it[W+t].id})});else{for(var L="",N=0;N<at;N++)L+='<button data-nav="'+N+'" tabindex="-1" aria-selected="false" aria-controls="'+it[W+N].id+'" hidden type="button"></button>';L='<div class="tns-nav" aria-label="Carousel Pagination">'+L+"</div>",_e.insertAdjacentHTML("afterbegin",L),xn=_e.querySelector(".tns-nav"),gn=xn.children,je()}if(F){var B=F.substring(0,F.length-18).toLowerCase(),A="transition: all "+Et/1e3+"s";B&&(A="-"+B+"-"+A),l(Nt,"[aria-controls^="+Vt+"-item]",A,c(Nt))}g(gn[0],{tabindex:"0","aria-selected":"true"}),v(gn[0],Nn),D(xn,$t),bn||x(xn)}if(sn){var G=An?"stop":"start";In?g(In,{"data-action":G}):t.autoplayButtonOutput&&(et.insertAdjacentHTML("beforebegin",'<button data-action="'+G+'" type="button">'+Hn[0]+G+Hn[1]+Mn[0]+"</button>"),In=_e.querySelector("[data-action]")),In&&D(In,{click:De}),An?(Te(),Wn&&D(tt,_t),zn&&D(tt,en)):In&&x(In)}rn&&(yn?(dn=yn.children[0],fn=yn.children[1],g(yn,{"aria-label":"Carousel Navigation",tabindex:"0"}),g(dn,{"data-controls":"prev"}),g(fn,{"data-controls":"next"}),g(yn.children,{"aria-controls":Vt,tabindex:"-1"})):(_e.insertAdjacentHTML("afterbegin",'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="'+Vt+'" type="button">'+mn[0]+'</button><button data-controls="next" tabindex="-1" aria-controls="'+Vt+'" type="button">'+mn[1]+"</button></div>"),yn=_e.querySelector(".tns-controls"),dn=yn.children[0],fn=yn.children[1]),vn=re(dn),hn=re(fn),wt||se(vn,dn,!0),D(yn,Zt),pn||x(yn)),Gn&&D(tt,nn),Vn&&D(tt,an),Tt&&D(H,tn),"inner"===yt?Ft.on("outerResized",function(){M(),Ft.emit("innerLoaded",qe())}):(D(z,{resize:P}),"outer"===yt&&Ft.on("innerLoaded",Z)),J(),Z(),I(),Ft.on("indexChanged",_),"function"==typeof Gt&&Gt(qe()),"inner"===yt&&Ft.emit("innerLoaded",qe()),Yt&&S(!0)}();var Kn=function(){return wt?function(){var e=Rt+mt,t=jt-mt;if(bt)e+=1,t-=1;else if(xt){var n=gt?gt:0;rt%(xt+n)>n&&(t-=1)}if(Ht>t)for(;Ht>=e+at;)Ht-=at;else if(Ht<e)for(;Ht<=t-at;)Ht+=at}:function(){Ht=Math.max(Rt,Math.min(jt,Ht))}}(),Qn=function(){return Ve?function(e,t){t||(t=ue()),Mt&&Ht===jt&&(t=-((xt+gt)*Pt-Ze)+"px"),F||!e?(de(t),0===Et&&me()):A(tt,It,St,Lt,t,Et,me),$e||Be()}:function(){At=[];var e={};e[Y]=e[K]=me,N(it[zt],e),D(it[Ht],e),fe(zt,Ye,Ke,!0),fe(Ht,Je,Ye),Y&&K&&0!==Et||setTimeout(me,0)}}();return{getInfo:qe,events:Ft,goTo:ye,destroy:function(){if(Nt.disabled=!0,wt)for(var e=kt;e--;)it[0].remove(),it[it.length-1].remove();for(var n=at;n--;){var i=it[n];i.id.indexOf(Vt+"-item")>=0&&(i.id=""),i.classList.remove("tns-item")}if(b(it,["style","aria-hidden","tabindex"]),it=Vt=at=Pt=kt=null,pn&&(N(yn,Zt),t.controlsContainer&&(b(yn,["aria-label","tabindex"]),b(yn.children,["aria-controls","aria-disabled","tabindex"])),yn=dn=fn=null),bn&&(N(xn,$t),t.navContainer&&(b(xn,["aria-label"]),b(gn,["aria-selected","aria-controls","tabindex"])),xn=gn=null),An&&(clearInterval(On),In&&N(In,{click:De}),N(tt,_t),N(tt,en),t.autoplayButton&&b(In,["data-action"])),tt.id=Ut||"",tt.className=tt.className.replace(Xt,""),tt.style="",Ve&&Y){var a={};a[Y]=me,N(tt,a)}N(tt,nn),N(tt,an),nt.insertBefore(tt,_e),_e.remove(),_e=et=tt=null,N(H,tn),N(z,{resize:P})}}}}}();
!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():function n(){document&&document.body?t.zenscroll=e():setTimeout(n,9)}()}(this,function(){"use strict";var t=function(t){return"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},u=function(){clearTimeout(i),r(0)},c=function(t){return Math.max(0,e.getTopOf(t)-o)},f=function(o,i,c){if(u(),0===i||i&&i<0||t(e.body))e.toY(o),c&&c();else{var f=e.getY(),a=Math.max(0,o)-f,l=(new Date).getTime();i=i||Math.min(Math.abs(a),n),function t(){r(setTimeout(function(){var n=Math.min(1,((new Date).getTime()-l)/i),o=Math.max(0,Math.floor(f+a*(n<.5?2*n*n:n*(4-2*n)-1)));e.toY(o),n<1&&e.getHeight()+o<e.body.scrollHeight?t():(setTimeout(u,99),c&&c())},9))}()}},a=function(t,e,n){f(c(t),e,n)},l=function(t,n,i){var r=t.getBoundingClientRect().height,u=e.getTopOf(t)+r,l=e.getHeight(),s=e.getY(),d=s+l;c(t)<s||r+o>l?a(t,n,i):u+o>d?f(u-l+o,n,i):i&&i()},s=function(t,n,o,i){f(Math.max(0,e.getTopOf(t)-e.getHeight()/2+(o||t.getBoundingClientRect().height/2)),n,i)};return{setup:function(t,e){return(0===t||t)&&(n=t),(0===e||e)&&(o=e),{defaultDuration:n,edgeOffset:o}},to:a,toY:f,intoView:l,center:s,stop:u,moving:function(){return!!i},getY:e.getY,getTopOf:e.getTopOf}},n=document.documentElement,o=function(){return window.scrollY||n.scrollTop},i=e({body:document.scrollingElement||document.body,toY:function(t){window.scrollTo(0,t)},getY:o,getHeight:function(){return window.innerHeight||n.clientHeight},getTopOf:function(t){return t.getBoundingClientRect().top+o()-n.offsetTop}});if(i.createScroller=function(t,o,i){return e({body:t,toY:function(e){t.scrollTop=e},getY:function(){return t.scrollTop},getHeight:function(){return Math.min(t.clientHeight,window.innerHeight||n.clientHeight)},getTopOf:function(t){return t.offsetTop}},o,i)},"addEventListener"in window&&!window.noZensmooth&&!t(document.body)){var r="scrollRestoration"in history;r&&(history.scrollRestoration="auto"),window.addEventListener("load",function(){r&&(setTimeout(function(){history.scrollRestoration="manual"},9),window.addEventListener("popstate",function(t){t.state&&"zenscrollY"in t.state&&i.toY(t.state.zenscrollY)},!1)),window.location.hash&&setTimeout(function(){var t=i.setup().edgeOffset;if(t){var e=document.getElementById(window.location.href.split("#")[1]);if(e){var n=Math.max(0,i.getTopOf(e)-t),o=i.getY()-n;0<=o&&o<9&&window.scrollTo(0,n)}}},9)},!1);var u=new RegExp("(^|\\s)noZensmooth(\\s|$)");window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){if(r)try{history.replaceState({zenscrollY:i.getY()},"")}catch(t){}var n=e.getAttribute("href")||"";if(0===n.indexOf("#")&&!u.test(e.className)){var o=0,c=document.getElementById(n.substring(1));if("#"!==n){if(!c)return;o=i.getTopOf(c)}t.preventDefault();var f=function(){window.location=n},a=i.setup().edgeOffset;a&&(o=Math.max(0,o-a),f=function(){history.pushState(null,"",n)}),i.toY(o,null,f)}}},!1)}return i});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.VanillaModal = mod.exports;
  }
})(this, function (exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var defaults = {
    modal: '.modal',
    modalInner: '.modal-inner',
    modalContent: '.modal-content',
    open: '[data-modal-open]',
    close: '[data-modal-close]',
    page: 'body',
    class: 'modal-visible',
    loadClass: 'vanilla-modal',
    clickOutside: true,
    closeKeys: [27],
    transitions: true,
    transitionEnd: null,
    onBeforeOpen: null,
    onBeforeClose: null,
    onOpen: null,
    onClose: null
  };
  function throwError(message) {
    console.error('VanillaModal: ' + message);
  }
  function find(arr, callback) {
    return function (key) {
      var filteredArray = arr.filter(callback);
      return filteredArray[0] ? filteredArray[0][key] : undefined;
    };
  }
  function transitionEndVendorSniff() {
    var el = document.createElement('div');
    var transitions = [{ key: 'transition', value: 'transitionend' }, { key: 'OTransition', value: 'otransitionend' }, { key: 'MozTransition', value: 'transitionend' }, { key: 'WebkitTransition', value: 'webkitTransitionEnd' }];
    return find(transitions, function (_ref) {
      var key = _ref.key;
      return typeof el.style[key] !== 'undefined';
    })('value');
  }
  function isPopulatedArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]' && arr.length;
  }
  function getNode(selector, parent) {
    var targetNode = parent || document;
    var node = targetNode.querySelector(selector);
    if (!node) {
      throwError(selector + ' not found in document.');
    }
    return node;
  }
  function addClass(el, className) {
    if (!(el instanceof HTMLElement)) {
      throwError('Not a valid HTML element.');
    }
    el.setAttribute('class', el.className.split(' ').filter(function (cn) {
      return cn !== className;
    }).concat(className).join(' '));
  }
  function removeClass(el, className) {
    if (!(el instanceof HTMLElement)) {
      throwError('Not a valid HTML element.');
    }
    el.setAttribute('class', el.className.split(' ').filter(function (cn) {
      return cn !== className;
    }).join(' '));
  }
  function getElementContext(e) {
    if (e && typeof e.hash === 'string') {
      return document.querySelector(e.hash);
    } else if (typeof e === 'string') {
      return document.querySelector(e);
    }
    throwError('No selector supplied to open()');
    return null;
  }
  function applyUserSettings(settings) {
    return _extends({}, defaults, settings, {
      transitionEnd: transitionEndVendorSniff()
    });
  }
  function matches(e, selector) {
    var allMatches = (e.target.document || e.target.ownerDocument).querySelectorAll(selector);
    for (var i = 0; i < allMatches.length; i += 1) {
      var node = e.target;
      while (node && node !== document.body) {
        if (node === allMatches[i]) {
          return node;
        }
        node = node.parentNode;
      }
    }
    return null;
  }
  var VanillaModal = function () {
    function VanillaModal(settings) {
      _classCallCheck(this, VanillaModal);
      this.isOpen = false;
      this.current = null;
      this.isListening = false;
      this.settings = applyUserSettings(settings);
      this.dom = this.getDomNodes();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.closeKeyHandler = this.closeKeyHandler.bind(this);
      this.outsideClickHandler = this.outsideClickHandler.bind(this);
      this.delegateOpen = this.delegateOpen.bind(this);
      this.delegateClose = this.delegateClose.bind(this);
      this.listen = this.listen.bind(this);
      this.destroy = this.destroy.bind(this);
      this.addLoadedCssClass();
      this.listen();
    }
    _createClass(VanillaModal, [{
      key: 'getDomNodes',
      value: function getDomNodes() {
        var _settings = this.settings,
            modal = _settings.modal,
            page = _settings.page,
            modalInner = _settings.modalInner,
            modalContent = _settings.modalContent;
        return {
          modal: getNode(modal),
          page: getNode(page),
          modalInner: getNode(modalInner, getNode(modal)),
          modalContent: getNode(modalContent, getNode(modal))
        };
      }
    }, {
      key: 'addLoadedCssClass',
      value: function addLoadedCssClass() {
        addClass(this.dom.page, this.settings.loadClass);
      }
    }, {
      key: 'setOpenId',
      value: function setOpenId(id) {
        var page = this.dom.page;
        page.setAttribute('data-current-modal', id || 'anonymous');
      }
    }, {
      key: 'removeOpenId',
      value: function removeOpenId() {
        var page = this.dom.page;
        page.removeAttribute('data-current-modal');
      }
    }, {
      key: 'open',
      value: function open(allMatches, e) {
        var page = this.dom.page;
        var _settings2 = this.settings,
            onBeforeOpen = _settings2.onBeforeOpen,
            onOpen = _settings2.onOpen;
        this.releaseNode(this.current);
        this.current = getElementContext(allMatches);
        if (this.current instanceof HTMLElement === false) {
          throwError('VanillaModal target must exist on page.');
          return;
        }
        if (typeof onBeforeOpen === 'function') {
          onBeforeOpen.call(this, e);
        }
        this.captureNode(this.current);
        addClass(page, this.settings.class);
        this.setOpenId(this.current.id);
        this.isOpen = true;
        if (typeof onOpen === 'function') {
          onOpen.call(this, e);
        }
      }
    }, {
      key: 'detectTransition',
      value: function detectTransition() {
        var modal = this.dom.modal;
        var css = window.getComputedStyle(modal, null);
        return Boolean(['transitionDuration', 'oTransitionDuration', 'MozTransitionDuration', 'webkitTransitionDuration'].filter(function (i) {
          return typeof css[i] === 'string' && parseFloat(css[i]) > 0;
        }).length);
      }
    }, {
      key: 'close',
      value: function close(e) {
        var _settings3 = this.settings,
            transitions = _settings3.transitions,
            transitionEnd = _settings3.transitionEnd,
            onBeforeClose = _settings3.onBeforeClose;
        var hasTransition = this.detectTransition();
        if (this.isOpen) {
          this.isOpen = false;
          if (typeof onBeforeClose === 'function') {
            onBeforeClose.call(this, e);
          }
          removeClass(this.dom.page, this.settings.class);
          if (transitions && transitionEnd && hasTransition) {
            this.closeModalWithTransition(e);
          } else {
            this.closeModal(e);
          }
        }
      }
    }, {
      key: 'closeModal',
      value: function closeModal(e) {
        var onClose = this.settings.onClose;
        this.removeOpenId(this.dom.page);
        this.releaseNode(this.current);
        this.isOpen = false;
        this.current = null;
        if (typeof onClose === 'function') {
          onClose.call(this, e);
        }
      }
    }, {
      key: 'closeModalWithTransition',
      value: function closeModalWithTransition(e) {
        var _this = this;
        var modal = this.dom.modal;
        var transitionEnd = this.settings.transitionEnd;
        var closeTransitionHandler = function closeTransitionHandler() {
          modal.removeEventListener(transitionEnd, closeTransitionHandler);
          _this.closeModal(e);
        };
        modal.addEventListener(transitionEnd, closeTransitionHandler);
      }
    }, {
      key: 'captureNode',
      value: function captureNode(node) {
        var modalContent = this.dom.modalContent;
        while (node.childNodes.length) {
          modalContent.appendChild(node.childNodes[0]);
        }
      }
    }, {
      key: 'releaseNode',
      value: function releaseNode(node) {
        var modalContent = this.dom.modalContent;
        while (modalContent.childNodes.length) {
          node.appendChild(modalContent.childNodes[0]);
        }
      }
    }, {
      key: 'closeKeyHandler',
      value: function closeKeyHandler(e) {
        var closeKeys = this.settings.closeKeys;
        if (isPopulatedArray(closeKeys) && closeKeys.indexOf(e.which) > -1 && this.isOpen === true) {
          e.preventDefault();
          this.close(e);
        }
      }
    }, {
      key: 'outsideClickHandler',
      value: function outsideClickHandler(e) {
        var clickOutside = this.settings.clickOutside;
        var modalInner = this.dom.modalInner;
        if (clickOutside) {
          var node = e.target;
          while (node && node !== document.body) {
            if (node === modalInner) {
              return;
            }
            node = node.parentNode;
          }
          this.close(e);
        }
      }
    }, {
      key: 'delegateOpen',
      value: function delegateOpen(e) {
        var open = this.settings.open;
        var matchedNode = matches(e, open);
        if (matchedNode) {
          e.preventDefault();
          this.open(matchedNode, e);
        }
      }
    }, {
      key: 'delegateClose',
      value: function delegateClose(e) {
        var close = this.settings.close;
        if (matches(e, close)) {
          e.preventDefault();
          this.close(e);
        }
      }
    }, {
      key: 'listen',
      value: function listen() {
        var modal = this.dom.modal;
        if (!this.isListening) {
          modal.addEventListener('click', this.outsideClickHandler, false);
          document.addEventListener('keydown', this.closeKeyHandler, false);
          document.addEventListener('click', this.delegateOpen, false);
          document.addEventListener('click', this.delegateClose, false);
          this.isListening = true;
        } else {
          throwError('Event listeners already applied.');
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var modal = this.dom.modal;
        if (this.isListening) {
          this.close();
          modal.removeEventListener('click', this.outsideClickHandler);
          document.removeEventListener('keydown', this.closeKeyHandler);
          document.removeEventListener('click', this.delegateOpen);
          document.removeEventListener('click', this.delegateClose);
          this.isListening = false;
        } else {
          throwError('Event listeners already removed.');
        }
      }
    }]);
    return VanillaModal;
  }();
  exports.default = VanillaModal;
});
/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Headroom=b()}(this,function(){"use strict";function a(a){this.callback=a,this.ticking=!1}function b(a){return a&&"undefined"!=typeof window&&(a===window||a.nodeType)}function c(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var d,e,f=a||{};for(e=1;e<arguments.length;e++){var g=arguments[e]||{};for(d in g)"object"!=typeof f[d]||b(f[d])?f[d]=f[d]||g[d]:f[d]=c(f[d],g[d])}return f}function d(a){return a===Object(a)?a:{down:a,up:a}}function e(a,b){b=c(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.tolerance=d(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop,this.onBottom=b.onBottom,this.onNotBottom=b.onNotBottom}var f={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a.prototype={constructor:a,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){if(e.cutsTheMustard)return this.debouncer=new a(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this},destroy:function(){var a=this.classes;this.initialised=!1;for(var b in a)a.hasOwnProperty(b)&&this.elem.classList.remove(a[b]);this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;!a.contains(b.pinned)&&a.contains(b.unpinned)||(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.bottom)||(a.add(b.bottom),a.remove(b.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notBottom)||(a.add(b.notBottom),a.remove(b.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(a){return Math.max(a.offsetHeight,a.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=a<0,c=a+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),a+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,e});
"use strict";var app=(function(){var init=function(){_listeners();};var _onLoad=function(){var winHeight=document.documentElement.clientHeight;var winWidth=document.documentElement.clientWidth;var vanillaModal=new VanillaModal.default();if(document.getElementById('headroom')){if(winWidth>992){var headroom=new Headroom(document.getElementById('headroom'));headroom.init();}}
document.getElementById('menu-toggle').addEventListener('click',function(e){_menuToggle(this);});var menuItems=document.querySelectorAll('.scroll-anchor a');[].forEach.call(menuItems,function(item){item.addEventListener('click',function(e){var target=this.getAttribute('href');zenscroll.to(document.querySelector(target));});});if(winWidth<992){_subMenu(document.getElementById('menu'));}
if(document.querySelector('input[type="tel"]')){[].forEach.call(document.querySelectorAll('input[type="tel"]'),function(input){Inputmask({"mask":"+7(999) 999-99-99"}).mask(input);});}
if(document.querySelector('table')){var body=document.querySelector('body');[].forEach.call(document.querySelectorAll('table'),function(elem){var tableCnt=elem.innerHTML;var tableTagName=elem.tagName;});}
if(document.getElementById('table-filter')){document.getElementById('table-filter').onkeyup=function(e){e.preventDefault();_filterList(this);};}
validate.init({messageValueMissing:'Это обязательное поле',messageTooShort:'Не менее {minLength} символов',disableSubmit:true,onSubmit:function(form,fields){_sendForm(form,vanillaModal);}});if(document.querySelector('.testimonials-slider')){var testimonialsSlider=tns({container:'.testimonials-slider__body',items:1,controls:false,loop:false});}
if(document.querySelector('.calc-slider')){[].forEach.call(document.querySelectorAll('.calc-slider'),function(slider){var calcSlider=tns({container:slider.querySelector('.calc-slider__body'),items:2,controls:true,nav:false,loop:true,slideBy:2,controlsText:['',''],responsive:{0:{items:1,slideBy:1},544:{items:2,slideBy:2},768:{items:3,slideBy:3}},onInit:function(slider){var sliderID=slider.container.getAttribute('id'),firstSlide=slider.slideItems.namedItem(sliderID+'-item0');firstSlide.querySelector('input').setAttribute('checked','checked');}});});}
if(document.querySelector('#calc-tabs')){_tabs(document.querySelector('#calc-tabs'));}
if(document.querySelector('#car-tabs')){_tabs(document.querySelector('#car-tabs'));}
if(document.getElementById('calc-moscow')){_calc(document.getElementById('calc-moscow'),vanillaModal);}
if(document.getElementById('calc-obl')){_calc(document.getElementById('calc-obl'),vanillaModal);}
if(document.getElementById('calc-russia')){_calc(document.getElementById('calc-russia'),vanillaModal);}
if(document.querySelector('.js-car-order')){[].forEach.call(document.querySelectorAll('.js-car-order'),function(button){button.addEventListener('click',function(e){var car=button.getAttribute('data-car');document.getElementById('callback').querySelector('input[name="car"]').value=car;vanillaModal.open('#callback');});});}
if(document.querySelector('#b-map')){_createMap(document.querySelector('#b-map'));}};var _menuToggle=function(elem){elem.classList.toggle('active');document.getElementById('menu').classList.toggle('active');};var _subMenu=function(elem){var subLiElems=elem.querySelectorAll('.menu-item-has-children > a');[].forEach.call(subLiElems,function(subLiElem){subLiElem.addEventListener('click',function(e){e.preventDefault();this.parentElement.classList.toggle('active');});});};var _createMap=function(elem){var mapCenter=elem.getAttribute('data-center');var mapMark=elem.getAttribute('data-mark');var mapAddress=elem.getAttribute('data-address');var mapCenterCoords=mapCenter.split(',');var mapMarkCoords=mapMark.split(',');ymaps.ready(init);var myMap,myPlacemark;function init(){myMap=new ymaps.Map("b-map",{center:mapCenterCoords,zoom:16,controls:['geolocationControl','routeButtonControl','typeSelector','fullscreenControl','zoomControl']});myMap.behaviors.disable('scrollZoom');myPlacemark=new ymaps.Placemark(mapMarkCoords,{hintContent:mapAddress});myMap.geoObjects.add(myPlacemark);}};var _tabs=function(container){var tabContainer=container;var tabControls=container.querySelectorAll('[data-tab-control]');var tabs=container.querySelectorAll('[data-tab]');var activeTab=tabContainer.querySelector('[data-tab-control].active').getAttribute('data-tab-control');tabContainer.querySelector('[data-tab="'+activeTab+'"]').classList.add('active');if(container.querySelector('[data-filter]')){var filter=container.querySelector('[data-filter]').getAttribute('data-filter');_filter(tabs,filter);}
[].forEach.call(tabControls,function(tabControl){tabControl.addEventListener('click',function(){var tabName=this.getAttribute('data-tab-control');var tabFilter=this.getAttribute('data-filter');container.querySelector('[data-tab-control].active').classList.remove('active');this.classList.add('active');if(tabName!=''){[].forEach.call(tabs,function(tab){tab.classList.remove('active');});container.querySelector('[data-tab='+tabName+']').classList.add('active');}
if(tabFilter!==null){_filter(tabs,tabFilter);}});});};var _filter=function(tabs,tabFilter){[].forEach.call(tabs,function(tab){tab.classList.remove('active');if(tab.classList.contains(tabFilter)){tab.classList.add('active');}});};var _filterList=function(input){var filterValue=input.value.toUpperCase(),list=document.getElementById(input.getAttribute('data-src')),item=list.querySelectorAll('.filter');for(var i=0;i<item.length;i++){var label=item[i].querySelector('.filter-label');if(label.innerHTML.toUpperCase().indexOf(filterValue)>-1){item[i].style.display='';}else{item[i].style.display='none';}}};var _sendForm=function(form,modal){var fd=new FormData(form);var url=myajax.url,nonce=myajax.nonce;fd.append('action','mail_handler');fd.append('nonce_code',nonce);var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var res=JSON.parse(xhttp.responseText);if(res.success){form.reset();form.classList.add('success');setTimeout(function(){form.classList.remove('success');modal.close('#callback');},3000);}}};xhttp.open("POST",url,true);xhttp.send(fd);};var _calc=function(container,modal){var calcTotal={};var calcTotalElem=container.querySelector('.calc-total'),calcControlElem=container.querySelector('.calc-control'),checkElems=container.querySelectorAll('input[type="radio"], input[type="checkbox"]'),inputElems=container.querySelectorAll('input[type="hidden"]'),inputTextElems=container.querySelectorAll('input[type="text"]'),selectElems=container.querySelectorAll('select'),buttonElem=container.querySelector('.calc-button');if(container.querySelector('.calc-destination')){var searchRegion=container.getAttribute('data-calc');ymaps.ready(function(){selectCity(searchRegion);});}
calcTotalArr();function checkedLoop(inputs){[].forEach.call(inputs,function(input){if(input.checked){var inputName=input.getAttribute('name');var inputData=input.getAttribute('data-calc');calcTotal[inputName]=inputData;}});};function selectLoop(selects){[].forEach.call(selects,function(select){[].forEach.call(select,function(option){if(option.selected){var selectName=select.getAttribute('name');var optionData=option.getAttribute('data-calc');var optionValue=option.getAttribute('value');calcTotal[selectName]={'count':optionValue,'price':optionData};}});});};function inputLoop(inputs){[].forEach.call(inputs,function(input){var inputName=input.getAttribute('name');var inputData=input.value;calcTotal[inputName]=inputData;});};function validateForm(){if(container.querySelector('input[name="destination"]')){var destinationElem=container.querySelector('input[name="destination"]');var destinationValue=destinationElem.value;if(destinationValue==''){destinationElem.parentElement.querySelector('.error').innerHTML='Укажите город';destinationElem.parentElement.classList.add('error');return false;}else{return true;}}else{return true;}};function calcTotalArr(){var total=0;calcTotal={};checkedLoop(checkElems);selectLoop(selectElems);inputLoop(inputElems);if(calcTotal['person']!=0){container.querySelector('.calc-person').classList.remove('hide');if(calcTotal['time']){calcTotal['person']=(parseInt(calcTotal['person-items'].price))*parseInt(calcTotal['time'].count);}else{calcTotal['person']=parseInt(calcTotal['person-items'].price);calcTotal['time']=0;}}else{container.querySelector('.calc-person').classList.add('hide');calcTotal['person']=0;}
calcTotal['type']=parseInt(calcTotal['type']);if(calcTotal['length-price']&&calcTotal['km']){var lengthPrice=parseInt(calcTotal['length-price']);calcTotal['length-price']=lengthPrice*parseInt(calcTotal['km']);calcTotal['km']=0;}else{calcTotal['price']=0;}
calcTotal['person-items']=0;calcTotal['destination']=0;calcTotal['tab']=0;calcTotal['price']=0;if(calcTotal['time']){var hoursPrice=parseInt(calcTotal['time'].price);calcTotal['time']=hoursPrice;}
console.log(calcTotal);for(var key in calcTotal){total+=parseInt(calcTotal[key]);}
calcControlElem.setAttribute('data-calc-total',total);};calcControlElem.addEventListener('click',function(e){if(validateForm()){var summ=this.getAttribute('data-calc-total');calcTotalElem.innerHTML=summ;}});[].forEach.call(checkElems,function(input){input.addEventListener('change',function(e){calcTotalArr();});});[].forEach.call(selectElems,function(select){select.addEventListener('change',function(e){calcTotalArr();});});[].forEach.call(inputElems,function(input){input.addEventListener('change',function(e){calcTotalArr();});});[].forEach.call(inputTextElems,function(input){input.addEventListener('focus',function(e){if(e.target.value.length>4){e.target.parentElement.classList.add('clear');}else{e.target.parentElement.classList.remove('clear');}});input.addEventListener('keyup',function(e){if(e.target.value.length>4){e.target.parentElement.classList.add('clear');}else{e.target.parentElement.classList.remove('clear');}});});function selectCity(searchRegion){var targetObj={'departure':'','destination':''};var inputSelect=container.querySelector('.calc-destination');if(container.querySelector('.calc-departure')){var inputDeparture=container.querySelector('.calc-departure');var departureDrop=new ymaps.SuggestView(inputDeparture,{width:300,results:3});departureDrop.events.add('select',function(e){changeSelectDrop(e);});}
var selectDrop=new ymaps.SuggestView(inputSelect,{width:300,results:3});function errorCity(elem){if(elem.classList.contains('calc-departure')){targetObj.departure='';}
if(elem.classList.contains('calc-destination')){targetObj.destination='';}
container.querySelector('.calc-lenght').innerHTML=0;container.querySelector('input[name="km"]').value=0;};function successCity(elem){elem.setAttribute('disabled','disabled');elem.parentElement.classList.remove('error');elem.parentElement.classList.add('loading');};function readyResult(elem,kmValue){elem.parentElement.classList.remove('loading');elem.removeAttribute('disabled');container.querySelector('.calc-lenght').innerHTML=kmValue;container.querySelector('input[name="km"]').value=kmValue;};selectDrop.events.add('select',function(e){changeSelectDrop(e);});function changeSelectDrop(e){var elem=e.originalEvent.target._panel._anchor;var destination=e.get('item').value;elem.parentElement.classList.remove('error');if(elem.classList.contains('calc-departure')){targetObj.departure=destination;}
if(elem.classList.contains('calc-destination')){targetObj.destination=destination;}
var targetPoint=ymaps.geocode(destination,{json:true,results:1});targetPoint.then(function(res){var region=res.GeoObjectCollection.featureMember["0"].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;if(searchRegion!=''){if(region!=searchRegion&&region!='Москва'){elem.parentElement.classList.add('error');elem.nextElementSibling.innerHTML='Только '+searchRegion;errorCity(elem);calcTotalArr();}else{if(targetObj.destination!=''){successCity(elem);getDestinationLenght(elem,destination);}}}else{var regionExist=regions.indexOf(region);if(regionExist<0){elem.parentElement.classList.add('error');elem.nextElementSibling.innerHTML='Регион не входит в зону обслуживания';errorCity(elem);calcTotalArr();console.log(targetObj);}else{if(targetObj.destination!=''&&targetObj.departure!=''){successCity(elem);getDestinationLenght(elem,destination);}}}});};function getDestinationLenght(elem,target){var myMap=new ymaps.Map("map",{center:[55.73,37.75],zoom:9},{searchControlProvider:'yandex#search'});var moscowPolygon=new ymaps.Polygon(mkadCoords.coordinates);moscowPolygon.options.set('visible',false);myMap.geoObjects.add(moscowPolygon);ymaps.route([targetObj.departure,targetObj.destination]).then(function(res){var pathsObjects=ymaps.geoQuery(res.getPaths()),edges=[];pathsObjects.each(function(path){var coordinates=path.geometry.getCoordinates();for(var i=1,l=coordinates.length;i<l;i++){edges.push({type:'LineString',coordinates:[coordinates[i],coordinates[i-1]]});}});var routeObjects=ymaps.geoQuery(edges).add(res.getWayPoints()).add(res.getViaPoints()).addToMap(myMap),objectsInMoscow=routeObjects.searchInside(moscowPolygon),boundaryObjects=routeObjects.searchIntersect(moscowPolygon);var outer=routeObjects.remove(objectsInMoscow).remove(boundaryObjects);var outerStart=outer._objects["0"].geometry._bounds["0"];var behindMkadLength=ymaps.route([outerStart,targetObj.destination]).then(function(route){var kmLength=Math.round(route.getLength()/1000);readyResult(elem,kmLength);calcTotalArr();});});};};if(container.querySelector('.clear-input')){[].forEach.call(container.querySelectorAll('.clear-input'),function(elem){elem.addEventListener('click',function(e){clearInput(e.target);});});}
function clearInput(elem){elem.parentElement.querySelector('input').value='';elem.parentElement.classList.remove('error');container.querySelector('.calc-lenght').innerHTML=0;container.querySelector('input[name="km"]').value=0;calcTotalArr();};buttonElem.addEventListener('click',function(e){e.preventDefault();var fd=serialize(container),modalElem=document.querySelector('#request');modalElem.querySelector('input[name="calc"]').value=fd;modal.open('#request');});};var _listeners=function(){svg4everybody();document.addEventListener('DOMContentLoaded',_onLoad);};return{init:init};})();app.init();var regions=['Москва','Московская область','Архангельская область','Астраханская область','Белгородская область','Брянская область','Владимирская область','Волгоградская область','Вологодская область','Воронежская область','Ивановская область','Калужская область','Кировская область','Костромская область','Краснодарский край','Курганская область','Курская область','Ленинградская область','Липецкая область','Мурманская область','Нижегородская область','Новгородская область','Оренбургская область','Орловская область','Пензенская область','Пермский край','Псковская область','Республика Адыгея','Республика Башкортостан','Республика Калмыкия','Республика Карелия','Республика Коми','Республика Крым','Республика Марий Эл','Республика Мордовия','Республика Татарстан','Ростовская область','Рязанская область','Самарская область','Саратовская область','Свердловская область','Смоленская область','Ставропольский край','Тамбовская область','Тверская область','Тульская область','Тюменская область','Удмуртская Республика','Ульяновская область','Челябинская область','Чувашская Республика','Ярославская область'];var mkadCoords={"type":"Polygon","coordinates":[[[55.78000432402266,37.84172564285271],[55.775874525970494,37.8381207618713],[55.775626746008065,37.83979446823122],[55.77446586811748,37.84243326983639],[55.771974101091104,37.84262672750849],[55.77114545193181,37.84153238623039],[55.76722010265554,37.841124690460184],[55.76654891107098,37.84239076983644],[55.76258709833121,37.842283558197025],[55.758073999993734,37.8421759312134],[55.75381499999371,37.84198330422974],[55.749277102484484,37.8416827275085],[55.74794544108413,37.84157576190186],[55.74525257875241,37.83897929098507],[55.74404373042019,37.83739676451868],[55.74298009816793,37.838732481460525],[55.743060321833575,37.841183997352545],[55.73938799999373,37.84097476190185],[55.73570799999372,37.84048155819702],[55.73228210777237,37.840095812164286],[55.73080491981639,37.83983814285274],[55.729799917464675,37.83846476321406],[55.72919751082619,37.83835745269769],[55.72859509486539,37.838636380279524],[55.727705075632784,37.8395161005249],[55.722727886185154,37.83897964285276],[55.72034817326636,37.83862557539366],[55.71944437307499,37.83559735744853],[55.71831419154461,37.835370708803126],[55.71765218986692,37.83738169402022],[55.71691750159089,37.83823396494291],[55.71547311301385,37.838056931213345],[55.71221445615604,37.836812846557606],[55.709331054395555,37.83522525396725],[55.70953687463627,37.83269301586908],[55.70903403789297,37.829667367706236],[55.70552351822608,37.83311126588435],[55.70041317726053,37.83058993121339],[55.69883771404813,37.82983872750851],[55.69718947487017,37.82934501586913],[55.69504441658371,37.828926414016685],[55.69287499999378,37.82876530422971],[55.690759754047335,37.82894754100031],[55.68951421135665,37.827697554878185],[55.68965045405069,37.82447346292115],[55.68322046195302,37.83136543914793],[55.67814012759211,37.833554015869154],[55.67295011628339,37.83544184655761],[55.6672498719639,37.837480388885474],[55.66316274139358,37.838960677246064],[55.66046999999383,37.83926093121332],[55.65869897264431,37.839025050262435],[55.65794084879904,37.83670784390257],[55.65694309303843,37.835656529083245],[55.65689306460552,37.83704060449217],[55.65550363526252,37.83696819873806],[55.65487847246661,37.83760389616388],[55.65356745541324,37.83687972750851],[55.65155951234079,37.83515216004943],[55.64979413590619,37.83312418518067],[55.64640836412121,37.82801726983639],[55.64164525405531,37.820614174591],[55.6421883258084,37.818908190475426],[55.64112490388471,37.81717543386075],[55.63916106913107,37.81690987037274],[55.637925371757085,37.815099354492155],[55.633798276884455,37.808769150787356],[55.62873670012244,37.80100123544311],[55.62554336109055,37.79598013491824],[55.62033499605651,37.78634567724606],[55.618768681480326,37.78334147619623],[55.619855533402706,37.77746201055901],[55.61909966711279,37.77527329626457],[55.618770300976294,37.77801986242668],[55.617257701952106,37.778212973541216],[55.61574504433011,37.77784818518065],[55.61148576294007,37.77016867724609],[55.60599579539028,37.760191219573976],[55.60227892751446,37.75338926983641],[55.59920577639331,37.746329965606634],[55.59631430313617,37.73939925396728],[55.5935318803559,37.73273665739439],[55.59350760316188,37.7299954450912],[55.59469840523759,37.7268679946899],[55.59229549697373,37.72626726983634],[55.59081598950582,37.7262673598022],[55.5877595845419,37.71897193121335],[55.58393177431724,37.70871550793456],[55.580917323756644,37.700497489410374],[55.57778089778455,37.69204305026244],[55.57815154690915,37.68544477378839],[55.57472945079756,37.68391050793454],[55.57328235936491,37.678803592590306],[55.57255251445782,37.6743402539673],[55.57216388774464,37.66813862698363],[55.57505691895805,37.617927457672096],[55.5757737568051,37.60443099999999],[55.57749105910326,37.599683515869145],[55.57796291823627,37.59754177842709],[55.57906686095235,37.59625834786988],[55.57746616444403,37.59501783265684],[55.57671634534502,37.593090671936025],[55.577944600233785,37.587018007904],[55.57982895000019,37.578692203704804],[55.58116294118248,37.57327546607398],[55.581550362779,37.57385012109279],[55.5820107079112,37.57399562266922],[55.58226289171689,37.5735356072979],[55.582393529795155,37.57290393054962],[55.581919415056234,37.57037722355653],[55.584471614867844,37.5592298306885],[55.58867650795186,37.54189249206543],[55.59158133551745,37.5297256269836],[55.59443656218868,37.517837865081766],[55.59635625174229,37.51200186508174],[55.59907823904434,37.506808949737554],[55.6062944994944,37.49820432275389],[55.60967103463367,37.494406071441674],[55.61066689753365,37.494760001358024],[55.61220931698269,37.49397137107085],[55.613417718449064,37.49016528606031],[55.61530616333343,37.48773249206542],[55.622640129112334,37.47921386508177],[55.62993723476164,37.470652153442394],[55.6368075123157,37.46273446298218],[55.64068225239439,37.46350692265317],[55.640794546982576,37.46050283203121],[55.64118904154646,37.457627470916734],[55.64690488145138,37.450718034393326],[55.65397824729769,37.44239252645875],[55.66053543155961,37.434587576721185],[55.661693766520735,37.43582144975277],[55.662755031737014,37.43576786245721],[55.664610641628116,37.430982915344174],[55.66778515273695,37.428547447097685],[55.668633314343566,37.42945134592044],[55.66948145750025,37.42859571562949],[55.670813882451405,37.4262836402282],[55.6811141674414,37.418709037048295],[55.68235377885389,37.41922139651101],[55.68359335082235,37.419218771842885],[55.684375235224735,37.417196501327446],[55.68540557585352,37.41607020370478],[55.68686637150793,37.415640857147146],[55.68903015131686,37.414632153442334],[55.690896881757396,37.413344899475064],[55.69264232162232,37.41171432275391],[55.69455101638112,37.40948282275393],[55.69638690385348,37.40703674603271],[55.70451821283731,37.39607169577025],[55.70942491932811,37.38952706878662],[55.71149057784176,37.387778313491815],[55.71419814298992,37.39049275399779],[55.7155489617061,37.385557272491454],[55.71849856042102,37.38388335714726],[55.7292763261685,37.378368238098155],[55.730845879211614,37.37763597123337],[55.73167906388319,37.37890062088197],[55.734703664681774,37.37750451918789],[55.734851959522246,37.375610832015965],[55.74105626086403,37.3723813571472],[55.746115620904355,37.37014935714723],[55.750883999993725,37.36944173016362],[55.76335905525834,37.36975304365541],[55.76432079697595,37.37244070571134],[55.76636979670426,37.3724259757175],[55.76735417953104,37.369922155757884],[55.76823419316575,37.369892695770275],[55.782312184391266,37.370214730163575],[55.78436801120489,37.370493611114505],[55.78596427165359,37.37120164550783],[55.7874378183096,37.37284851456452],[55.7886695054807,37.37608325135799],[55.78947647305964,37.3764587460632],[55.79146512926804,37.37530000265506],[55.79899647809345,37.38235915344241],[55.80113596939471,37.384344043655396],[55.80322699999366,37.38594269577028],[55.804919036911976,37.38711208598329],[55.806610999993666,37.3880239841309],[55.81001864976979,37.38928977249147],[55.81348641242801,37.39038389947512],[55.81983538336746,37.39235781481933],[55.82417822811877,37.393709457672124],[55.82792275755836,37.394685720901464],[55.830447148154136,37.39557615344238],[55.83167107969975,37.39844478226658],[55.83151823557964,37.40019761214057],[55.83264967594742,37.400398790382326],[55.83322180909622,37.39659544313046],[55.83402792148566,37.39667059524539],[55.83638877400216,37.39682089947515],[55.83861656112751,37.39643489154053],[55.84072348043264,37.3955338994751],[55.84502158126453,37.392680272491454],[55.84659117913199,37.39241188227847],[55.84816071336481,37.392529730163616],[55.85288092980303,37.39486835714723],[55.859893456073635,37.39873052645878],[55.86441833633205,37.40272161111449],[55.867579567544375,37.40697072750854],[55.868369880337,37.410007082016016],[55.86920843741314,37.4120992989502],[55.87055369615854,37.412668021163924],[55.87170587948249,37.41482461111453],[55.873183961039565,37.41862266137694],[55.874879126654704,37.42413732540892],[55.875614937236705,37.4312182698669],[55.8762723478417,37.43111093783558],[55.87706546369396,37.43332105622856],[55.87790681284802,37.43385747619623],[55.88027084462084,37.441303050262405],[55.87942070143253,37.44747234260555],[55.88072960917233,37.44716141796871],[55.88121221323979,37.44769797085568],[55.882080694420715,37.45204320500181],[55.882346110794586,37.45673176190186],[55.88252729504517,37.463383999999984],[55.88294937719063,37.46682797486874],[55.88361266759345,37.470014457672086],[55.88546991372396,37.47751410450743],[55.88534929207307,37.47860317658232],[55.882563306475106,37.48165826025772],[55.8815803226785,37.48316434442331],[55.882427612793315,37.483831555817645],[55.88372791409729,37.483182967125686],[55.88495581062434,37.483092277908824],[55.8875561994203,37.4855716508179],[55.887827444039566,37.486440636245746],[55.88897899871799,37.49014203439328],[55.890208937135604,37.493210285705544],[55.891342397444696,37.497512451065035],[55.89174030252967,37.49780744510645],[55.89239745507079,37.49940333499519],[55.89339220941865,37.50018383334346],[55.903869074155224,37.52421672750851],[55.90564076517974,37.52977457672118],[55.90661661218259,37.53503220370484],[55.90714113744566,37.54042858064267],[55.905645048442985,37.54320461007303],[55.906608607018505,37.545686966066306],[55.90788552162358,37.54743976120755],[55.90901557907218,37.55796999999999],[55.91059395704873,37.572711542327866],[55.91073854155573,37.57942799999998],[55.91009969268444,37.58502865872187],[55.90794809960554,37.58739968913264],[55.908713267595054,37.59131567193598],[55.902866854295375,37.612687423278814],[55.90041967242986,37.62348079629517],[55.898141151686396,37.635797880950896],[55.89639275532968,37.649487626983664],[55.89572360207488,37.65619302513125],[55.895295577183965,37.66294133862307],[55.89505457604897,37.66874564418033],[55.89254677027454,37.67375601586915],[55.8947775867987,37.67744661901856],[55.89450045676125,37.688347],[55.89422926332761,37.69480554232789],[55.89322256101114,37.70107096560668],[55.891763491662616,37.705962965606716],[55.889110234998974,37.711885134918205],[55.886577568759876,37.71682005026245],[55.88458159806678,37.7199315476074],[55.882281005794134,37.72234560316464],[55.8809452036196,37.72364385977171],[55.8809722706006,37.725371142837474],[55.88037213862385,37.727870902099546],[55.877941504088696,37.73394330422971],[55.87208120378722,37.745339592590376],[55.86703807949492,37.75525267724611],[55.859821640197474,37.76919976190188],[55.82962968399116,37.827835219574],[55.82575289922351,37.83341438888553],[55.82188784027888,37.83652584655761],[55.81612575504693,37.83809213491821],[55.81460347077685,37.83605359521481],[55.81276696067908,37.83632178569025],[55.811486181656385,37.838623105812026],[55.807329380532785,37.83912198147584],[55.80510270463816,37.839079078033414],[55.79940712529036,37.83965844708251],[55.79131399999368,37.840581150787344],[55.78000432402266,37.84172564285271]]]};
!function(a,b){"use strict";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf("MSIE 10"),h=!!navigator.userAgent.match(/Trident.*rv:11\./),i=b.querySelectorAll("iframe.wp-embedded-content");for(c=0;c<i.length;c++){if(d=i[c],!d.getAttribute("data-secret"))f=Math.random().toString(36).substr(2,10),d.src+="#?secret="+f,d.setAttribute("data-secret",f);if(g||h)a=d.cloneNode(!0),a.removeAttribute("security"),d.parentNode.replaceChild(a,d)}}}var d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret="'+d.secret+'"]'),k=b.querySelectorAll('blockquote[data-secret="'+d.secret+'"]');for(e=0;e<k.length;e++)k[e].style.display="none";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute("style"),"height"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else if(~~g<200)g=200;f.height=g}if("link"===d.message)if(h=b.createElement("a"),i=b.createElement("a"),h.href=f.getAttribute("src"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener("message",a.wp.receiveEmbedMessage,!1),b.addEventListener("DOMContentLoaded",c,!1),a.addEventListener("load",c,!1)}(window,document);