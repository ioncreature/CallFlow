
// minifier: path aliases

enyo.path.addPaths({g11n: "d://Repo/CallFlow/usingEnyo/enyo/../lib/g11n/", layout: "d://Repo/CallFlow/usingEnyo/enyo/../lib/layout/", onyx: "d://Repo/CallFlow/usingEnyo/enyo/../lib/onyx/", onyx: "d://Repo/CallFlow/usingEnyo/enyo/../lib/onyx/source/", core: "source/core/", data: "source/data/"});

// javascript/g11n.js

if (!this.enyo) {
this.enyo = {};
var empty = {};
enyo.mixin = function(e, t) {
e = e || {};
if (t) {
var n, r;
for (n in t) r = t[n], empty[n] !== r && (e[n] = r);
}
return e;
};
}

"trim" in String.prototype || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), enyo.g11n = function() {}, enyo.g11n._init = function() {
if (!enyo.g11n._initialized) {
typeof window != "undefined" ? (enyo.g11n._platform = "browser", enyo.g11n._enyoAvailable = !0) : (enyo.g11n._platform = "node", enyo.g11n._enyoAvailable = !1);
if (navigator) {
var t = (navigator.language || navigator.userLanguage).replace(/-/g, "_").toLowerCase();
enyo.g11n._locale = new enyo.g11n.Locale(t), enyo.g11n._formatLocale = enyo.g11n._locale, enyo.g11n._phoneLocale = enyo.g11n._locale;
}
enyo.g11n._locale === undefined && (enyo.warn("enyo.g11n._init: could not find current locale, so using default of en_us."), enyo.g11n._locale = new enyo.g11n.Locale("en_us")), enyo.g11n._formatLocale === undefined && (enyo.warn("enyo.g11n._init: could not find current formats locale, so using default of us."), enyo.g11n._formatLocale = new enyo.g11n.Locale("en_us")), enyo.g11n._phoneLocale === undefined && (enyo.warn("enyo.g11n._init: could not find current phone locale, so defaulting to the same thing as the formats locale."), enyo.g11n._phoneLocale = enyo.g11n._formatLocale), enyo.g11n._sourceLocale === undefined && (enyo.g11n._sourceLocale = new enyo.g11n.Locale("en_us")), enyo.g11n._initialized = !0;
}
}, enyo.g11n.getPlatform = function() {
return enyo.g11n._platform || enyo.g11n._init(), enyo.g11n._platform;
}, enyo.g11n.isEnyoAvailable = function() {
return enyo.g11n._enyoAvailable || enyo.g11n._init(), enyo.g11n._enyoAvailable;
}, enyo.g11n.currentLocale = function() {
return enyo.g11n._locale || enyo.g11n._init(), enyo.g11n._locale;
}, enyo.g11n.formatLocale = function() {
return enyo.g11n._formatLocale || enyo.g11n._init(), enyo.g11n._formatLocale;
}, enyo.g11n.phoneLocale = function() {
return enyo.g11n._phoneLocale || enyo.g11n._init(), enyo.g11n._phoneLocale;
}, enyo.g11n.sourceLocale = function() {
return enyo.g11n._sourceLocale || enyo.g11n._init(), enyo.g11n._sourceLocale;
}, enyo.g11n.setLocale = function(t) {
t && (enyo.g11n._init(), t.uiLocale && (enyo.g11n._locale = new enyo.g11n.Locale(t.uiLocale)), t.formatLocale && (enyo.g11n._formatLocale = new enyo.g11n.Locale(t.formatLocale)), t.phoneLocale && (enyo.g11n._phoneLocale = new enyo.g11n.Locale(t.phoneLocale)), t.sourceLocale && (enyo.g11n._sourceLocale = new enyo.g11n.Locale(t.sourceLocale)), enyo.g11n._enyoAvailable && enyo.reloadG11nResources());
};

// javascript/fmts.js

enyo.g11n.Fmts = function(t) {
var n;
typeof t == "undefined" || !t.locale ? this.locale = enyo.g11n.formatLocale() : typeof t.locale == "string" ? this.locale = new enyo.g11n.Locale(t.locale) : this.locale = t.locale, this.dateTimeFormatHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: this.locale,
type: "region"
}), this.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: this.locale
}), this.dateTimeHash || (this.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: enyo.g11n.currentLocale()
})), this.dateTimeHash || (this.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: new enyo.g11n.Locale("en_us")
}));
}, enyo.g11n.Fmts.prototype.isAmPm = function() {
return typeof this.twelveHourFormat == "undefined" && (this.twelveHourFormat = this.dateTimeFormatHash.is12HourDefault), this.twelveHourFormat;
}, enyo.g11n.Fmts.prototype.isAmPmDefault = function() {
return this.dateTimeFormatHash.is12HourDefault;
}, enyo.g11n.Fmts.prototype.getFirstDayOfWeek = function() {
return this.dateTimeFormatHash.firstDayOfWeek;
}, enyo.g11n.Fmts.prototype.getDateFieldOrder = function() {
return this.dateTimeFormatHash ? this.dateTimeFormatHash.dateFieldOrder : (enyo.warn("Failed to load date time format hash"), "mdy");
}, enyo.g11n.Fmts.prototype.getTimeFieldOrder = function() {
return this.dateTimeFormatHash ? this.dateTimeFormatHash.timeFieldOrder : (enyo.warn("Failed to load date time format hash"), "hma");
}, enyo.g11n.Fmts.prototype.getMonthFields = function() {
return this.dateTimeHash ? this.dateTimeHash.medium.month : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
}, enyo.g11n.Fmts.prototype.getAmCaption = function() {
return this.dateTimeHash ? this.dateTimeHash.am : (enyo.error("Failed to load dateTimeHash."), "AM");
}, enyo.g11n.Fmts.prototype.getPmCaption = function() {
return this.dateTimeHash ? this.dateTimeHash.pm : (enyo.error("Failed to load dateTimeHash."), "PM");
}, enyo.g11n.Fmts.prototype.getMeasurementSystem = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.measurementSystem || "metric";
}, enyo.g11n.Fmts.prototype.getDefaultPaperSize = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.defaultPaperSize || "A4";
}, enyo.g11n.Fmts.prototype.getDefaultPhotoSize = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.defaultPhotoSize || "10X15CM";
}, enyo.g11n.Fmts.prototype.getDefaultTimeZone = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.defaultTimeZone || "Europe/London";
}, enyo.g11n.Fmts.prototype.isAsianScript = function() {
return this.dateTimeFormatHash && typeof this.dateTimeFormatHash.asianScript != "undefined" ? this.dateTimeFormatHash.asianScript : !1;
}, enyo.g11n.Fmts.prototype.isHanTraditional = function() {
return this.dateTimeFormatHash && typeof this.dateTimeFormatHash.scriptStyle != "undefined" ? this.dateTimeFormatHash.scriptStyle === "traditional" : !1;
}, enyo.g11n.Fmts.prototype.textDirection = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.scriptDirection || "ltr";
};

// javascript/locale.js

enyo.g11n.Locale = function(t) {
var n = t ? t.split(/_/) : [];
return this.locale = t, this.language = n[0] || undefined, this.region = n[1] ? n[1].toLowerCase() : undefined, this.variant = n[2] ? n[2].toLowerCase() : undefined, this;
}, enyo.g11n.Locale.prototype.getLocale = function() {
return this.locale;
}, enyo.g11n.Locale.prototype.getLanguage = function() {
return this.language;
}, enyo.g11n.Locale.prototype.getRegion = function() {
return this.region;
}, enyo.g11n.Locale.prototype.getVariant = function() {
return this.variant;
}, enyo.g11n.Locale.prototype.toString = function() {
return this.locale || (this.locale = this.language + "_" + this.region, this.variant && (this.locale = this.locale + "_" + this.variant)), this.locale;
}, enyo.g11n.Locale.prototype.toISOString = function() {
var e = this.language || "";
return this.region && (e += "_" + this.region.toUpperCase()), this.variant && (e += "_" + this.variant.toUpperCase()), e;
}, enyo.g11n.Locale.prototype.isMatch = function(e) {
return e.language && e.region ? (!this.language || this.language === e.language) && (!this.region || this.region === e.region) : e.language ? !this.language || this.language === e.language : !this.region || this.region === e.region;
}, enyo.g11n.Locale.prototype.equals = function(e) {
return this.language === e.language && this.region === e.region && this.variant === e.variant;
}, enyo.g11n.Locale.prototype.useDefaultLang = function() {
var e, t, n;
this.language || (e = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats/defLangs.json"
}), t = e && e[this.region], t || (n = enyo.g11n.currentLocale(), t = n.language), this.language = t || "en", this.locale = this.language + "_" + this.region);
};

// javascript/loadfile.js

enyo.g11n.Utils = enyo.g11n.Utils || function() {}, enyo.g11n.Utils._fileCache = {}, enyo.g11n.Utils._getBaseURL = function(e) {
if ("baseURI" in e) return e.baseURI;
var t = e.getElementsByTagName("base");
return t.length > 0 ? t[0].href : window.location.href;
}, enyo.g11n.Utils._fetchAppRootPath = function() {
var e = window.document, t = enyo.g11n.Utils._getBaseURL(e).match(new RegExp(".*://[^#]*/"));
if (t) return t[0];
}, enyo.g11n.Utils._setRoot = function(t) {
var n = t;
return !t && enyo.g11n.isEnyoAvailable() ? n = enyo.g11n.Utils._fetchAppRootPath() + "assets" : n = ".", enyo.g11n.root = n;
}, enyo.g11n.Utils._getRoot = function() {
return enyo.g11n.root || enyo.g11n.Utils._setRoot();
}, enyo.g11n.Utils._getEnyoRoot = function(t) {
var n = "";
return !enyo.g11n.isEnyoAvailable() && t && (n = t), n + enyo.path.paths.enyo + "/../lib/g11n/source";
}, enyo.g11n.Utils._loadFile = function(t) {
var n, r, i = enyo.g11n.getPlatform();
if (i === "node") try {
this.fs || (this.fs = IMPORTS.require("fs")), r = this.fs.readFileSync(t, "utf8"), r && (n = JSON.parse(r));
} catch (s) {
n = undefined;
} else try {
n = JSON.parse(enyo.xhr.request({
url: t,
sync: !0
}).responseText);
} catch (o) {}
return n;
}, enyo.g11n.Utils.getNonLocaleFile = function(t) {
var n, r, i;
if (!t || !t.path) return undefined;
t.path.charAt(0) !== "/" ? (r = t.root || this._getRoot(), i = r + "/" + t.path) : i = t.path;
if (enyo.g11n.Utils._fileCache[i] !== undefined) n = enyo.g11n.Utils._fileCache[i].json; else {
n = enyo.g11n.Utils._loadFile(i);
if (t.cache === undefined || t.cache !== !1) enyo.g11n.Utils._fileCache[i] = {
path: i,
json: n,
locale: undefined,
timestamp: new Date
}, this.oldestStamp === undefined && (this.oldestStamp = enyo.g11n.Utils._fileCache[i].timestamp);
}
return n;
}, enyo.g11n.Utils.getJsonFile = function(t) {
var n, r, i, s, o, u, a, f, l;
if (!t || !t.path || !t.locale) return undefined;
i = t.path.charAt(0) !== "/" ? t.root || this._getRoot() : "", i.slice(-1) !== "/" && (i += "/"), t.path ? (s = t.path, s.slice(-1) !== "/" && (s += "/")) : s = "", s += t.prefix || "", i += s, l = i + t.locale.toString() + ".json";
if (enyo.g11n.Utils._fileCache[l] !== undefined) n = enyo.g11n.Utils._fileCache[l].json; else {
t.merge ? (t.locale.language && (r = i + t.locale.language + ".json", o = this._loadFile(r)), t.locale.region && (r = i + t.locale.language + "_" + t.locale.region + ".json", u = this._loadFile(r), t.locale.language !== t.locale.region && (r = i + t.locale.region + ".json", a = this._loadFile(r))), t.locale.variant && (r = i + t.locale.language + "_" + t.locale.region + "_" + t.locale.variant + ".json", f = this._loadFile(r)), n = this._merge([ o, a, u, f ])) : (r = i + t.locale.toString() + ".json", n = this._loadFile(r), !n && t.type !== "region" && t.locale.language && (r = i + t.locale.language + ".json", n = this._loadFile(r)), !n && t.type !== "language" && t.locale.region && (r = i + t.locale.region + ".json", n = this._loadFile(r)), !n && t.type !== "language" && t.locale.region && (r = i + "_" + t.locale.region + ".json", n = this._loadFile(r)));
if (t.cache === undefined || t.cache !== !1) enyo.g11n.Utils._fileCache[l] = {
path: l,
json: n,
locale: t.locale,
timestamp: new Date
}, this.oldestStamp === undefined && (this.oldestStamp = enyo.g11n.Utils._fileCache[l].timestamp);
}
return n;
}, enyo.g11n.Utils._merge = function(t) {
var n, r, i = {};
for (n = 0, r = t.length; n < r; n++) i = enyo.mixin(i, t[n]);
return i;
}, enyo.g11n.Utils.releaseAllJsonFiles = function(t, n) {
var r = new Date, i = [], s, o, u, a;
t = t || 6e4;
if (this.oldestStamp !== undefined && this.oldestStamp.getTime() + t < r.getTime()) {
s = r;
for (o in enyo.g11n.Utils._fileCache) o && enyo.g11n.Utils._fileCache[o] && (a = enyo.g11n.Utils._fileCache[o], !a.locale || n || !enyo.g11n.currentLocale().isMatch(a.locale) && !enyo.g11n.formatLocale().isMatch(a.locale) && !enyo.g11n.phoneLocale().isMatch(a.locale) ? a.timestamp.getTime() + t < r.getTime() ? i.push(a.path) : a.timestamp.getTime() < s.getTime() && (s = a.timestamp) : a.timestamp.getTime() < s.getTime() && (s = a.timestamp));
this.oldestStamp = s.getTime() < r.getTime() ? s : undefined;
for (u = 0; u < i.length; u++) enyo.g11n.Utils._fileCache[i[u]] = undefined;
}
return i.length;
}, enyo.g11n.Utils._cacheSize = function() {
var t = 0, n;
for (n in enyo.g11n.Utils._fileCache) enyo.g11n.Utils._fileCache[n] && t++;
return t;
};

// javascript/template.js

enyo.g11n.Template = function(e, t) {
this.template = e, this.pattern = t || /(.?)(#\{(.*?)\})/;
}, enyo.g11n.Template.prototype._evalHelper = function(e, t) {
function s(e) {
return e === undefined || e === null ? "" : e;
}
function o(e, n, r) {
var i = t, o, u;
e = s(e);
if (e === "\\") return n;
o = r.split("."), u = o.shift();
while (i && u) {
i = i[u], u = o.shift();
if (!u) return e + s(i) || e || "";
}
return e || "";
}
var n = [], r = this.pattern, i;
if (!t || !e) return "";
while (e.length) i = e.match(r), i ? (n.push(e.slice(0, i.index)), n.push(o(i[1], i[2], i[3])), e = e.slice(i.index + i[0].length)) : (n.push(e), e = "");
return n.join("");
}, enyo.g11n.Template.prototype.evaluate = function(e) {
return this._evalHelper(this.template, e);
}, enyo.g11n.Template.prototype.formatChoice = function(e, t) {
try {
var n = this.template ? this.template.split("|") : [], r = [], i = [], s = "", o;
t = t || {};
for (o = 0; o < n.length; o++) {
var u = enyo.indexOf("#", n[o]);
if (u !== -1) {
r[o] = n[o].substring(0, u), i[o] = n[o].substring(u + 1);
if (e == r[o]) return this._evalHelper(i[o], t);
r[o] === "" && (s = i[o]);
}
}
for (o = 0; o < r.length; o++) {
var a = r[o];
if (a) {
var f = a.charAt(a.length - 1), l = parseFloat(a);
if (f === "<" && e < l || f === ">" && e > l) return this._evalHelper(i[o], t);
}
}
return this._evalHelper(s, t);
} catch (c) {
return enyo.error("formatChoice error : ", c), "";
}
};

// javascript/resources.js

$L = function(e) {
return $L._resources || ($L._resources = new enyo.g11n.Resources), $L._resources.$L(e);
}, $L._resources = null, enyo.g11n.Resources = function(e) {
e && e.root && (this.root = typeof window != "undefined" ? enyo.path.rewrite(e.root) : e.root), this.root = this.root || enyo.g11n.Utils._getRoot(), this.resourcePath = this.root + "/resources/", e && e.locale ? this.locale = typeof e.locale == "string" ? new enyo.g11n.Locale(e.locale) : e.locale : this.locale = enyo.g11n.currentLocale(), this.$L = this.locale.toString() === "en_pl" ? this._pseudo : this._$L, this.localizedResourcePath = this.resourcePath + this.locale.locale + "/", this.languageResourcePath = this.resourcePath + (this.locale.language ? this.locale.language + "/" : ""), this.regionResourcePath = this.languageResourcePath + (this.locale.region ? this.locale.region + "/" : ""), this.carrierResourcePath = this.regionResourcePath + (this.locale.variant ? this.locale.variant + "/" : "");
}, enyo.g11n.Resources.prototype.getResource = function(e) {
var t;
if (this.carrierResourcePath) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.carrierResourcePath + e
});
} catch (n) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.regionResourcePath + e
});
} catch (r) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.languageResourcePath + e
});
} catch (i) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.resourcePath + "en/" + e
});
} catch (s) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.root + "/" + e
});
} catch (o) {
t = undefined;
}
return t;
}, enyo.g11n.Resources.prototype.$L = function(e) {}, enyo.g11n.Resources.prototype._$L = function(e) {
var t, n;
return e ? this.locale.equals(enyo.g11n.sourceLocale()) ? typeof e == "string" ? e : e.value : (this.strings || this._loadStrings(), typeof e == "string" ? (t = e, n = e) : (t = e.key, n = e.value), this.strings && typeof this.strings[t] != "undefined" ? this.strings[t] : n) : "";
}, enyo.g11n.Resources.prototype._pseudo = function(e) {
var t, n;
if (!e) return "";
n = "";
for (t = 0; t < e.length; t++) if (e.charAt(t) === "#" && t + 1 < e.length && e.charAt(t + 1) === "{") {
while (e.charAt(t) !== "}" && t < e.length) n += e.charAt(t++);
t < e.length && (n += e.charAt(t));
} else if (e.charAt(t) === "<") {
while (e.charAt(t) !== ">" && t < e.length) n += e.charAt(t++);
t < e.length && (n += e.charAt(t));
} else if (e.charAt(t) === "&" && t + 1 < e.length && !enyo.g11n.Char.isSpace(e.charAt(t + 1))) {
while (e.charAt(t) !== ";" && !enyo.g11n.Char.isSpace(e.charAt(t)) && t < e.length) n += e.charAt(t++);
t < e.length && (n += e.charAt(t));
} else n += enyo.g11n.Resources._pseudoMap[e.charAt(t)] || e.charAt(t);
return n;
}, enyo.g11n.Resources.prototype._loadStrings = function() {
this.strings = enyo.g11n.Utils.getJsonFile({
root: this.root,
path: "resources",
locale: this.locale,
merge: !0
}), enyo.g11n.Utils.releaseAllJsonFiles();
}, enyo.g11n.Resources._pseudoMap = {
a: "\u00e1",
e: "\u00e8",
i: "\u00ef",
o: "\u00f5",
u: "\u00fb",
c: "\u00e7",
A: "\u00c5",
E: "\u00cb",
I: "\u00ce",
O: "\u00d5",
U: "\u00db",
C: "\u00c7",
B: "\u00df",
y: "\u00ff",
Y: "\u00dd",
D: "\u010e",
d: "\u0111",
g: "\u011d",
G: "\u011c",
H: "\u0124",
h: "\u0125",
J: "\u0134",
j: "\u0135",
K: "\u0136",
k: "\u0137",
N: "\u00d1",
n: "\u00f1",
S: "\u015e",
s: "\u015f",
T: "\u0164",
t: "\u0165",
W: "\u0174",
w: "\u0175",
Z: "\u0179",
z: "\u017a"
};

// javascript/character.js

enyo.g11n.Char = enyo.g11n.Char || {}, enyo.g11n.Char._strTrans = function(t, n) {
var r = "", i, s;
for (s = 0; s < t.length; s++) i = n[t.charAt(s)], r += i || t.charAt(s);
return r;
}, enyo.g11n.Char._objectIsEmpty = function(e) {
var t;
for (t in e) return !1;
return !0;
}, enyo.g11n.Char._isIdeoLetter = function(e) {
return e >= 19968 && e <= 40907 || e >= 63744 && e <= 64217 || e >= 13312 && e <= 19893 || e >= 12353 && e <= 12447 || e >= 12449 && e <= 12543 || e >= 65382 && e <= 65437 || e >= 12784 && e <= 12799 || e >= 12549 && e <= 12589 || e >= 12704 && e <= 12727 || e >= 12593 && e <= 12686 || e >= 65440 && e <= 65500 || e >= 44032 && e <= 55203 || e >= 40960 && e <= 42124 || e >= 4352 && e <= 4607 || e >= 43360 && e <= 43388 || e >= 55216 && e <= 55291 ? !0 : !1;
}, enyo.g11n.Char._isIdeoOther = function(e) {
return e >= 42125 && e <= 42191 || e >= 12544 && e <= 12548 || e >= 12590 && e <= 12591 || e >= 64218 && e <= 64255 || e >= 55292 && e <= 55295 || e >= 40908 && e <= 40959 || e >= 43389 && e <= 43391 || e >= 12800 && e <= 13055 || e >= 13056 && e <= 13183 || e >= 13184 && e <= 13311 || e === 12592 || e === 12687 || e === 12448 || e === 12352 || e === 12294 || e === 12348 ? !0 : !1;
}, enyo.g11n.Char.isIdeo = function(t) {
var n;
return !t || t.length < 1 ? !1 : (n = t.charCodeAt(0), enyo.g11n.Char._isIdeoLetter(n) || enyo.g11n.Char._isIdeoOther(n));
}, enyo.g11n.Char.isPunct = function(t) {
var n, r;
return !t || t.length < 1 ? !1 : (n = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data/chartype.punct.json"
}), r = n && t.charAt(0) in n, enyo.g11n.Utils.releaseAllJsonFiles(), r);
}, enyo.g11n.Char._space = {
9: 1,
10: 1,
11: 1,
12: 1,
13: 1,
32: 1,
133: 1,
160: 1,
5760: 1,
6158: 1,
8192: 1,
8193: 1,
8194: 1,
8195: 1,
8196: 1,
8197: 1,
8198: 1,
8199: 1,
8200: 1,
8201: 1,
8202: 1,
8232: 1,
8233: 1,
8239: 1,
8287: 1,
12288: 1
}, enyo.g11n.Char.isSpace = function(t) {
var n;
return !t || t.length < 1 ? !1 : (n = t.charCodeAt(0), n in enyo.g11n.Char._space);
}, enyo.g11n.Char.toUpper = function(t, n) {
var r;
if (!t) return undefined;
n || (n = enyo.g11n.currentLocale()), r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: n
});
if (!r || !r.upperMap) r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: new enyo.g11n.Locale("en")
});
return r && r.upperMap !== undefined ? enyo.g11n.Char._strTrans(t, r.upperMap) : (enyo.g11n.Utils.releaseAllJsonFiles(), t);
}, enyo.g11n.Char.isLetter = function(t) {
var n, r, i, s;
return !t || t.length < 1 ? !1 : (n = t.charAt(0), r = t.charCodeAt(0), i = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data/chartype.letter.json"
}), s = i && n in i || enyo.g11n.Char._isIdeoLetter(r), enyo.g11n.Utils.releaseAllJsonFiles(), s);
}, enyo.g11n.Char.getIndexChars = function(t) {
var n, r, i, s, o = [];
t ? typeof t == "string" ? r = new enyo.g11n.Locale(t) : r = t : r = enyo.g11n.currentLocale(), enyo.g11n.Char._resources || (enyo.g11n.Char._resources = {}), enyo.g11n.Char._resources[r.locale] || (enyo.g11n.Char._resources[r.locale] = new enyo.g11n.Resources({
root: enyo.g11n.Utils._getEnyoRoot() + "/base",
locale: r
})), i = enyo.g11n.Char._resources[r.locale], n = enyo.g11n.Char._resources[r.locale].$L({
key: "indexChars",
value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ#"
});
for (s = 0; s < n.length; s++) o.push(n[s]);
return o;
}, enyo.g11n.Char.getBaseString = function(t, n) {
var r, i;
if (!t) return undefined;
n ? typeof n == "string" ? i = new enyo.g11n.Locale(n) : i = n : i = enyo.g11n.currentLocale(), r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: i
});
if (!r || enyo.g11n.Char._objectIsEmpty(r)) r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: new enyo.g11n.Locale("en")
});
return r && r.baseChars !== undefined && (t = enyo.g11n.Char._strTrans(t, r.baseChars)), enyo.g11n.Utils.releaseAllJsonFiles(), t;
};

// javascript/timezone.js

enyo.g11n._TZ = enyo.g11n._TZ || {}, enyo.g11n.TzFmt = function(e) {
return this.setTZ(), e !== undefined && e.TZ !== undefined && this.setCurrentTimeZone(e.TZ), enyo.g11n.Utils.releaseAllJsonFiles(), this;
}, enyo.g11n.TzFmt.prototype = {
toString: function() {
return this.TZ !== undefined ? this.TZ : this._TZ;
},
setTZ: function() {
var e = (new Date).toString(), t = enyo.indexOf("(", e), n = enyo.indexOf(")", e), r = e.slice(t + 1, n);
r !== undefined ? this.setCurrentTimeZone(r) : this.setDefaultTimeZone();
},
getCurrentTimeZone: function() {
return this.TZ !== undefined ? this.TZ : this._TZ !== undefined ? this._TZ : "unknown";
},
setCurrentTimeZone: function(e) {
this._TZ = e, this.TZ = e;
},
setDefaultTimeZone: function() {
var e = (new Date).toString().match(/\(([A-Z]+)\)/);
this._TZ = e && e[1] || "PST";
}
};

// javascript/datetime.js

enyo.g11n.DateFmt = function(e) {
var t, n, r, i, s;
s = this, s._normalizedComponents = {
date: {
dm: "DM",
md: "DM",
my: "MY",
ym: "MY",
d: "D",
dmy: "",
dym: "",
mdy: "",
myd: "",
ydm: "",
ymd: ""
},
time: {
az: "AZ",
za: "AZ",
a: "A",
z: "Z",
"": ""
},
timeLength: {
"short": "small",
medium: "small",
"long": "big",
full: "big"
}
}, s._normalizeDateTimeFormatComponents = function(e) {
var t = e.dateComponents, n = e.timeComponents, r, i, o, u = e.time;
return e.date && t && (r = s._normalizedComponents.date[t], r === undefined && (enyo.log("date component error: '" + t + "'"), r = "")), u && n !== undefined && (o = s._normalizedComponents.timeLength[u], o === undefined && (enyo.log("time format error: " + u), o = "small"), i = s._normalizedComponents.time[n], i === undefined && enyo.log("time component error: '" + n + "'")), e.dateComponents = r, e.timeComponents = i, e;
}, s._finalDateTimeFormat = function(e, t, n) {
var r = s.dateTimeFormatHash.dateTimeFormat || s.defaultFormats.dateTimeFormat;
return e && t ? s._buildDateTimeFormat(r, "dateTime", {
TIME: t,
DATE: e
}) : t || e || "M/d/yy h:mm a";
}, s._buildDateTimeFormat = function(e, t, n) {
var r, i, o = [], u = s._getTokenizedFormat(e, t), a;
for (r = 0, i = u.length; r < i && u[r] !== undefined; ++r) a = n[u[r]], a ? o.push(a) : o.push(u[r]);
return o.join("");
}, s._getDateFormat = function(e, t) {
var n = s._formatFetch(e, t.dateComponents, "Date");
if (e !== "full" && t.weekday) {
var r = s._formatFetch(t.weekday === !0 ? e : t.weekday, "", "Weekday");
n = s._buildDateTimeFormat(s.dateTimeFormatHash.weekDateFormat || s.defaultFormats.weekDateFormat, "weekDate", {
WEEK: r,
DATE: n
});
}
return n;
}, s._getTimeFormat = function(e, t) {
var n = s._formatFetch(e, "", s.twelveHourFormat ? "Time12" : "Time24");
if (t.timeComponents) {
var r = "time" + t.timeComponents, i = r + "Format";
return s._buildDateTimeFormat(s.dateTimeFormatHash[i] || s.defaultFormats[i], r, {
TIME: n,
AM: "a",
ZONE: "zzz"
});
}
return n;
}, s.ParserChunks = {
full: "('[^']+'|y{2,4}|M{1,4}|d{1,2}|z{1,3}|a|h{1,2}|H{1,2}|k{1,2}|K{1,2}|E{1,4}|m{1,2}|s{1,2}|[^A-Za-z']+)?",
dateTime: "(DATE|TIME|[^A-Za-z]+|'[^']+')?",
weekDate: "(DATE|WEEK|[^A-Za-z]+|'[^']+')?",
timeA: "(TIME|AM|[^A-Za-z]+|'[^']+')?",
timeZ: "(TIME|ZONE|[^A-Za-z]+|'[^']+')?",
timeAZ: "(TIME|AM|ZONE|[^A-Za-z]+|'[^']+')?"
}, s._getTokenizedFormat = function(e, t) {
var n = t && s.ParserChunks[t] || s.ParserChunks.full, r = e.length, i = [], o, u, a = new RegExp(n, "g");
while (r > 0) {
o = a.exec(e)[0], u = o.length;
if (u === 0) return [];
i.push(o), r -= u;
}
return i;
}, s._formatFetch = function(e, t, n, r) {
switch (e) {
case "short":
case "medium":
case "long":
case "full":
case "small":
case "big":
case "default":
return s.dateTimeFormatHash[e + (t || "") + n];
default:
return e;
}
}, s._dayOffset = function(e, t) {
var n;
return t = s._roundToMidnight(t), e = s._roundToMidnight(e), n = (e.getTime() - t.getTime()) / 864e5, n;
}, s._roundToMidnight = function(e) {
var t = e.getTime(), n = new Date;
return n.setTime(t), n.setHours(0), n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0), n;
}, s.inputParams = e, typeof e == "undefined" || !e.locale ? t = enyo.g11n.formatLocale() : typeof e.locale == "string" ? t = new enyo.g11n.Locale(e.locale) : t = e.locale, t.language || t.useDefaultLang(), this.locale = t, typeof e == "string" ? s.formatType = e : typeof e == "undefined" ? (e = {
format: "short"
}, s.formatType = e.format) : s.formatType = e.format, !s.formatType && !e.time && !e.date && (e ? e.format = "short" : e = {
format: "short"
}, s.formatType = "short"), s.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: t,
type: "language"
}), s.dateTimeHash || (s.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: new enyo.g11n.Locale("en_us")
})), s.dateTimeFormatHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: t,
type: "region"
}), s.dateTimeFormatHash || (s.dateTimeFormatHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: new enyo.g11n.Locale("en_us"),
type: "region"
})), s.rb = new enyo.g11n.Resources({
root: enyo.g11n.Utils._getEnyoRoot() + "/base",
locale: t
}), typeof e == "undefined" || typeof e.twelveHourFormat == "undefined" ? s.twelveHourFormat = s.dateTimeFormatHash.is12HourDefault : s.twelveHourFormat = e.twelveHourFormat;
if (s.formatType) switch (s.formatType) {
case "short":
case "medium":
case "long":
case "full":
case "default":
s.partsLength = s.formatType, i = s._finalDateTimeFormat(s._getDateFormat(s.formatType, e), s._getTimeFormat(s.formatType, e), e);
break;
default:
i = s.formatType;
} else e = s._normalizeDateTimeFormatComponents(e), e.time && (r = s._getTimeFormat(e.time, e), s.partsLength = e.time), e.date && (n = s._getDateFormat(e.date, e), s.partsLength = e.date), i = s._finalDateTimeFormat(n, r, e);
s.tokenized = s._getTokenizedFormat(i), s.partsLength || (s.partsLength = "full");
}, enyo.g11n.DateFmt.prototype.toString = function() {
return this.tokenized.join("");
}, enyo.g11n.DateFmt.prototype.isAmPm = function() {
return this.twelveHourFormat;
}, enyo.g11n.DateFmt.prototype.isAmPmDefault = function() {
return this.dateTimeFormatHash.is12HourDefault;
}, enyo.g11n.DateFmt.prototype.getFirstDayOfWeek = function() {
return this.dateTimeFormatHash.firstDayOfWeek;
}, enyo.g11n.DateFmt.prototype._format = function(e, t) {
var n = this, r, i = [], s, o, u, a, f, l, c, h;
c = n.dateTimeHash;
for (f = 0, l = t.length; f < l && t[f] !== undefined; f++) {
switch (t[f]) {
case "yy":
s = "", i.push((e.getFullYear() + "").substring(2));
break;
case "yyyy":
s = "", i.push(e.getFullYear());
break;
case "MMMM":
s = "long", o = "month", u = e.getMonth();
break;
case "MMM":
s = "medium", o = "month", u = e.getMonth();
break;
case "MM":
s = "short", o = "month", u = e.getMonth();
break;
case "M":
s = "single", o = "month", u = e.getMonth();
break;
case "dd":
s = "short", o = "date", u = e.getDate() - 1;
break;
case "d":
s = "single", o = "date", u = e.getDate() - 1;
break;
case "zzz":
s = "", typeof n.timezoneFmt == "undefined" && (typeof n.inputParams == "undefined" || typeof n.inputParams.TZ == "undefined" ? n.timezoneFmt = new enyo.g11n.TzFmt : n.timezoneFmt = new enyo.g11n.TzFmt(n.inputParams)), a = n.timezoneFmt.getCurrentTimeZone(), i.push(a);
break;
case "a":
s = "", e.getHours() > 11 ? i.push(c.pm) : i.push(c.am);
break;
case "K":
s = "", i.push(e.getHours() % 12);
break;
case "KK":
s = "", r = e.getHours() % 12, i.push(r < 10 ? "0" + ("" + r) : r);
break;
case "h":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r);
break;
case "hh":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r < 10 ? "0" + ("" + r) : r);
break;
case "H":
s = "", i.push(e.getHours());
break;
case "HH":
s = "", r = e.getHours(), i.push(r < 10 ? "0" + ("" + r) : r);
break;
case "k":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r);
break;
case "kk":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r < 10 ? "0" + ("" + r) : r);
break;
case "EEEE":
s = "long", o = "day", u = e.getDay();
break;
case "EEE":
s = "medium", o = "day", u = e.getDay();
break;
case "EE":
s = "short", o = "day", u = e.getDay();
break;
case "E":
s = "single", o = "day", u = e.getDay();
break;
case "mm":
case "m":
s = "";
var p = e.getMinutes();
i.push(p < 10 ? "0" + ("" + p) : p);
break;
case "ss":
case "s":
s = "";
var d = e.getSeconds();
i.push(d < 10 ? "0" + ("" + d) : d);
break;
default:
h = /'([A-Za-z]+)'/.exec(t[f]), s = "", h ? i.push(h[1]) : i.push(t[f]);
}
s && i.push(c[s][o][u]);
}
return i.join("");
}, enyo.g11n.DateFmt.prototype.format = function(e) {
var t = this;
return typeof e != "object" || t.tokenized === null ? (enyo.warn("DateFmt.format: no date to format or no format loaded"), undefined) : this._format(e, t.tokenized);
}, enyo.g11n.DateFmt.prototype.formatRelativeDate = function(e, t) {
var n, r, i, s, o = this;
if (typeof e != "object") return undefined;
typeof t == "undefined" ? (r = !1, n = new Date) : (typeof t.referenceDate != "undefined" ? n = t.referenceDate : n = new Date, typeof t.verbosity != "undefined" ? r = t.verbosity : r = !1), s = o._dayOffset(n, e);
switch (s) {
case 0:
return o.dateTimeHash.relative.today;
case 1:
return o.dateTimeHash.relative.yesterday;
case -1:
return o.dateTimeHash.relative.tomorrow;
default:
if (s < 7) return o.dateTimeHash.long.day[e.getDay()];
if (s < 30) {
if (r) {
i = new enyo.g11n.Template(o.dateTimeHash.relative.thisMonth);
var u = Math.floor(s / 7);
return i.formatChoice(u, {
num: u
});
}
return o.format(e);
}
if (s < 365) {
if (r) {
i = new enyo.g11n.Template(o.dateTimeHash.relative.thisYear);
var a = Math.floor(s / 30);
return i.formatChoice(a, {
num: a
});
}
return o.format(e);
}
return o.format(e);
}
}, enyo.g11n.DateFmt.prototype.formatRange = function(e, t) {
var n, r, i, s, o, u, a, f, l = this.partsLength || "medium", c = this.dateTimeHash, h = this.dateTimeFormatHash;
return !e && !t ? "" : !e || !t ? this.format(e || t) : (t.getTime() < e.getTime() && (n = t, t = e, e = n), a = new Date(e.getTime()), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0), f = new Date(t.getTime()), f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0), f.getTime() - a.getTime() === 864e5 ? (s = "shortTime" + (this.twelveHourFormat ? "12" : "24"), r = this._getTokenizedFormat(h[s]), s = l + "Date", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeConsecutiveDays",
value: "#{startDate} #{startTime} - #{endDate} #{endTime}"
})), u.evaluate({
startTime: this._format(e, r),
endTime: this._format(t, r),
startDate: this._format(e, i),
endDate: this._format(t, i)
})) : e.getYear() === t.getYear() ? (o = l === "short" || l === "single" ? (e.getFullYear() + "").substring(2) : e.getFullYear(), e.getMonth() === t.getMonth() ? e.getDate() === t.getDate() ? (s = "shortTime" + (this.twelveHourFormat ? "12" : "24"), r = this._getTokenizedFormat(h[s]), s = l + "Date", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinDay",
value: "#{startTime}-#{endTime}, #{date}"
})), u.evaluate({
startTime: this._format(e, r),
endTime: this._format(t, r),
date: this._format(e, i)
})) : (s = l + "DDate", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinMonth",
value: "#{month} #{startDate}-#{endDate}, #{year}"
})), u.evaluate({
month: c[l].month[e.getMonth()],
startDate: this._format(e, i),
endDate: this._format(t, i),
year: o
})) : (l === "full" ? l = "long" : l === "single" && (l = "short"), s = l + "DMDate", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinYear",
value: "#{start} - #{end}, #{year}"
})), u.evaluate({
start: this._format(e, i),
end: this._format(t, i),
year: o
}))) : t.getYear() - e.getYear() < 2 ? (s = l + "Date", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinConsecutiveYears",
value: "#{start} - #{end}"
})), u.evaluate({
start: this._format(e, i),
end: this._format(t, i)
})) : (l === "full" ? l = "long" : l === "single" && (l = "short"), s = l + "MYDate", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeMultipleYears",
value: "#{startMonthYear} - #{endMonthYear}"
})), u.evaluate({
startMonthYear: this._format(e, i),
endMonthYear: this._format(t, i)
})));
};

// javascript/numberfmt.js

enyo.g11n.NumberFmt = function(e) {
var t, n, r, i, s, o, u;
typeof e == "number" ? this.fractionDigits = e : e && typeof e.fractionDigits == "number" && (this.fractionDigits = e.fractionDigits), !e || !e.locale ? this.locale = enyo.g11n.formatLocale() : typeof e.locale == "string" ? this.locale = new enyo.g11n.Locale(e.locale) : this.locale = e.locale, this.style = e && e.style || "number", t = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: this.locale,
type: "region"
}), this.style === "currency" && (r = e && e.currency || t && t.currency && t.currency.name, r ? (r = r.toUpperCase(), this.currencyStyle = e && e.currencyStyle === "iso" ? "iso" : "common", n = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/number_data/iso4217.json"
}), n ? (i = n[r], i || (s = new enyo.g11n.Locale(r), u = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: s,
type: "region"
}), u && (r = u.currency && u.currency.name, i = n[r])), i || (r = t && t.currency && t.currency.name, i = n[r]), i ? (this.sign = this.currencyStyle !== "iso" ? i.sign : r, this.fractionDigits = e && typeof e.fractionDigits == "number" ? e.fractionDigits : i.digits) : this.style = "number") : (r = t && t.currency && t.currency.name, this.sign = r)) : (r = t && t.currency && t.currency.name, this.sign = r), r ? (o = t && t.currency && t.currency[this.currencyStyle] || "#{sign} #{amt}", this.currencyTemplate = new enyo.g11n.Template(o)) : this.style = "number"), t ? (this.decimal = t.numberDecimal || ".", this.divider = t.numberDivider || ",", t.dividerIndex ? t.dividerIndex === 4 ? this.numberGroupRegex = /(\d+)(\d{4})/ : this.numberGroupRegex = /(\d+)(\d{3})/ : this.numberGroupRegex = /(\d+)(\d{3})/, this.percentageSpace = t.percentageSpace) : (this.decimal = ".", this.divider = ",", this.numberGroupRegex = /(\d+)(\d{3})/, this.percentageSpace = !1), this.numberGroupRegex.compile(this.numberGroupRegex), enyo.g11n.Utils.releaseAllJsonFiles();
}, enyo.g11n.NumberFmt.prototype.format = function(e) {
try {
var t, n, r, i;
typeof e == "string" && (e = parseFloat(e));
if (isNaN(e)) return undefined;
typeof this.fractionDigits != "undefined" ? t = e.toFixed(this.fractionDigits) : t = e.toString(), n = t.split("."), r = n[0];
while (this.divider && this.numberGroupRegex.test(r)) r = r.replace(this.numberGroupRegex, "$1" + this.divider + "$2");
return n[0] = r, i = n.join(this.decimal), this.style === "currency" && this.currencyTemplate ? i = this.currencyTemplate.evaluate({
amt: i,
sign: this.sign
}) : this.style === "percent" && (i += this.percentageSpace ? " %" : "%"), i;
} catch (s) {
return enyo.log("formatNumber error : " + s), (e || "0") + "." + (this.fractionDigits || "");
}
};

// javascript/duration.js

enyo.g11n.DurationFmt = function(e) {
typeof e == "undefined" ? (this.locale = enyo.g11n.formatLocale(), this.style = "short") : (e.locale ? typeof e.locale == "string" ? this.locale = new enyo.g11n.Locale(e.locale) : this.locale = e.locale : this.locale = enyo.g11n.formatLocale(), e.style ? (this.style = e.style, this.style !== "short" && this.style !== "medium" && this.style !== "long" && this.style !== "full" && (this.style = "short")) : this.style = "short"), this.rb = new enyo.g11n.Resources({
root: enyo.g11n.Utils._getEnyoRoot() + "/base",
locale: this.locale
}), this.style === "short" ? this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatShort",
value: "##{num}y"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatShort",
value: "##{num}m"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatShort",
value: "##{num}w"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatShort",
value: "##{num}d"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatShort",
value: "##{num}"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatShort",
value: "##{num}"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatShort",
value: "##{num}"
})),
separator: this.rb.$L({
key: "separatorShort",
value: " "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorShort",
value: " "
}),
longTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "longTimeFormatShort",
value: "#{hours}:#{minutes}:#{seconds}"
})),
shortTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "shortTimeFormatShort",
value: "#{minutes}:#{seconds}"
})),
finalSeparator: ""
} : this.style === "medium" ? this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatMedium",
value: "##{num} yr"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatMedium",
value: "##{num} mo"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatMedium",
value: "##{num} wk"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatMedium",
value: "##{num} dy"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatMedium",
value: "##{num}"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatMedium",
value: "##{num}"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatMedium",
value: "##{num}"
})),
separator: this.rb.$L({
key: "separatorMedium",
value: " "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorMedium",
value: " "
}),
longTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "longTimeFormatMedium",
value: "#{hours}:#{minutes}:#{seconds}"
})),
shortTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "shortTimeFormatMedium",
value: "#{minutes}:#{seconds}"
})),
finalSeparator: ""
} : this.style === "long" ? this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatLong",
value: "1#1 yr|1>##{num} yrs"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatLong",
value: "1#1 mon|1>##{num} mos"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatLong",
value: "1#1 wk|1>##{num} wks"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatLong",
value: "1#1 day|1>##{num} dys"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatLong",
value: "0#|1#1 hr|1>##{num} hrs"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatLong",
value: "0#|1#1 min|1>##{num} min"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatLong",
value: "0#|1#1 sec|1>##{num} sec"
})),
separator: this.rb.$L({
key: "separatorLong",
value: " "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorLong",
value: " "
}),
longTimeFormat: "",
shortTimeFormat: "",
finalSeparator: ""
} : this.style === "full" && (this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatFull",
value: "1#1 year|1>##{num} years"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatFull",
value: "1#1 month|1>##{num} months"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatFull",
value: "1#1 week|1>##{num} weeks"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatFull",
value: "1#1 day|1>##{num} days"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatFull",
value: "0#|1#1 hour|1>##{num} hours"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatFull",
value: "0#|1#1 minute|1>##{num} minutes"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatFull",
value: "0#|1#1 second|1>##{num} seconds"
})),
separator: this.rb.$L({
key: "separatorFull",
value: ", "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorFull",
value: ", "
}),
longTimeFormat: "",
shortTimeFormat: "",
finalSeparator: this.rb.$L({
key: "finalSeparatorFull",
value: " and "
})
}), this.dateParts = [ "years", "months", "weeks", "days" ], this.timeParts = [ "hours", "minutes", "seconds" ];
}, enyo.g11n.DurationFmt.prototype.format = function(e) {
var t = [], n = [], r, i, s, o;
if (!e || enyo.g11n.Char._objectIsEmpty(e)) return "";
for (i = 0; i < this.dateParts.length; i++) s = e[this.dateParts[i]] || 0, s > 0 && (o = this.parts[this.dateParts[i]].formatChoice(s, {
num: s
}), o && o.length > 0 && (t.length > 0 && t.push(this.parts.separator), t.push(o)));
if (this.style === "long" || this.style === "full") for (i = 0; i < this.timeParts.length; i++) s = e[this.timeParts[i]] || 0, s > 0 && (o = this.parts[this.timeParts[i]].formatChoice(s, {
num: s
}), o && o.length > 0 && (n.length > 0 && n.push(this.parts.separator), n.push(o))); else {
var u = {}, a = e.hours ? this.parts.longTimeFormat : this.parts.shortTimeFormat;
for (i = 0; i < this.timeParts.length; i++) {
s = e[this.timeParts[i]] || 0;
if (s < 10) switch (this.timeParts[i]) {
case "minutes":
e.hours && (s = "0" + s);
break;
case "seconds":
s = "0" + s;
break;
case "hours":
}
o = this.parts[this.timeParts[i]].formatChoice(s, {
num: s
}), o && o.length > 0 && (u[this.timeParts[i]] = o);
}
n.push(a.evaluate(u));
}
r = t, r.length > 0 && n.length > 0 && r.push(this.parts.dateTimeSeparator);
for (i = 0; i < n.length; i++) r.push(n[i]);
return r.length > 2 && this.style === "full" && (r[r.length - 2] = this.parts.finalSeparator), r.join("") || "";
};

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: "",
rowOffset: 0
},
events: {
onSetupItem: "",
onRenderRow: ""
},
bottomUp: !1,
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
create: function() {
this.inherited(arguments), this.noSelectChanged(), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
noSelectChanged: function() {
this.noSelect && this.$.selection.clear();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("data-enyo-index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
if (this.noSelect || t.index === -1) return;
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
if (e < this.rowOffset || e >= this.count + this.rowOffset) return;
this.setupItem(e);
var t = this.fetchRowNode(e);
t && (enyo.dom.setInnerHtml(t, this.$.client.generateChildHtml()), this.$.client.teardownChildren(), this.doRenderRow({
rowIndex: e
}));
},
fetchRowNode: function(e) {
if (this.hasNode()) return this.node.querySelector('[data-enyo-index="' + e + '"]');
},
rowForEvent: function(e) {
if (!this.hasNode()) return -1;
var t = e.target;
while (t && t !== this.node) {
var n = t.getAttribute && t.getAttribute("data-enyo-index");
if (n !== null) return Number(n);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
if (e < 0 || e >= this.count) return;
this.setupItem(e);
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
if (e < 0 || e >= this.count) return;
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n;
t && (t.id !== e.id ? n = t.querySelector("#" + e.id) : n = t), e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1,
reorderable: !1,
centerReorderContainer: !0,
reorderComponents: [],
pinnedReorderComponents: [],
swipeableComponents: [],
enableSwipe: !1,
persistSwipeableItem: !1
},
events: {
onSetupItem: "",
onSetupReorderComponents: "",
onSetupPinnedReorderComponents: "",
onReorder: "",
onSetupSwipeItem: "",
onSwipeDrag: "",
onSwipe: "",
onSwipeComplete: ""
},
handlers: {
onAnimateFinish: "animateFinish",
onRenderRow: "rowRendered",
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
onup: "up",
onholdpulse: "holdpulse"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "holdingarea",
allowHtml: !0,
classes: "enyo-list-holdingarea"
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "placeholder"
}, {
name: "swipeableComponents",
style: "position:absolute; display:block; top:-1000px; left:0;"
} ]
} ],
reorderHoldTimeMS: 600,
draggingRowIndex: -1,
draggingRowNode: null,
placeholderRowIndex: -1,
dragToScrollThreshold: .1,
prevScrollTop: 0,
autoScrollTimeoutMS: 20,
autoScrollTimeout: null,
autoscrollPageY: 0,
pinnedReorderMode: !1,
initialPinPosition: -1,
itemMoved: !1,
currentPageNumber: -1,
completeReorderTimeout: null,
swipeIndex: null,
swipeDirection: null,
persistentItemVisible: !1,
persistentItemOrigin: null,
swipeComplete: !1,
completeSwipeTimeout: null,
completeSwipeDelayMS: 500,
normalSwipeSpeedMS: 200,
fastSwipeSpeedMS: 100,
percentageDraggedThreshold: .2,
importProps: function(e) {
e && e.reorderable && (this.touch = !0), this.inherited(arguments);
},
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.noSelectChanged(), this.multiSelectChanged(), this.toggleSelectedChanged(), this.$.generator.setRowOffset(0), this.$.generator.setCount(this.count);
},
initComponents: function() {
this.createReorderTools(), this.inherited(arguments), this.createSwipeableComponents();
},
createReorderTools: function() {
this.createComponent({
name: "reorderContainer",
classes: "enyo-list-reorder-container",
ondown: "sendToStrategy",
ondrag: "sendToStrategy",
ondragstart: "sendToStrategy",
ondragfinish: "sendToStrategy",
onflick: "sendToStrategy"
});
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
createSwipeableComponents: function() {
for (var e = 0; e < this.swipeableComponents.length; e++) this.$.swipeableComponents.createComponent(this.swipeableComponents[e], {
owner: this.owner
});
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
noSelectChanged: function() {
this.$.generator.setNoSelect(this.noSelect);
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
sendToStrategy: function(e, t) {
this.$.strategy.dispatchEvent("on" + t.type, t, e);
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
holdpulse: function(e, t) {
if (!this.getReorderable() || this.isReordering()) return;
if (t.holdTime >= this.reorderHoldTimeMS && this.shouldStartReordering(e, t)) return t.preventDefault(), this.startReordering(t), !1;
},
dragstart: function(e, t) {
if (this.isReordering()) return !0;
if (this.isSwipeable()) return this.swipeDragStart(e, t);
},
drag: function(e, t) {
if (this.shouldDoReorderDrag(t)) return t.preventDefault(), this.reorderDrag(t), !0;
if (this.isSwipeable()) return t.preventDefault(), this.swipeDrag(e, t), !0;
},
dragfinish: function(e, t) {
this.isReordering() ? this.finishReordering(e, t) : this.isSwipeable() && this.swipeDragFinish(e, t);
},
up: function(e, t) {
this.isReordering() && this.finishReordering(e, t);
},
generatePage: function(e, t) {
this.page = e;
var n = this.rowsPerPage * this.page;
this.$.generator.setRowOffset(n);
var r = Math.min(this.count - n, this.rowsPerPage);
this.$.generator.setCount(r);
var i = this.$.generator.generateChildHtml();
t.setContent(i), this.getReorderable() && this.draggingRowIndex > -1 && this.hideReorderingRow();
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
this.pageHeights[e] = s, this.portSize += s - o;
}
},
pageForRow: function(e) {
return Math.floor(e / this.rowsPerPage);
},
preserveDraggingRowNode: function(e) {
this.draggingRowNode && this.pageForRow(this.draggingRowIndex) === e && (this.$.holdingarea.hasNode().appendChild(this.draggingRowNode), this.draggingRowNode = null, this.removedInitialPage = !0);
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 === 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.preserveDraggingRowNode(this.p0), this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0, this.p0RowBounds = this.getPageRowHeights(this.$.page0)), s = i % 2 === 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.preserveDraggingRowNode(this.p1), this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0, this.p1RowBounds = this.getPageRowHeights(this.$.page1)), t && (this.$.generator.setRowOffset(0), this.$.generator.setCount(this.count), this.fixedHeight || (this.adjustBottomPage(), this.adjustPortSize()));
},
getPageRowHeights: function(e) {
var t = {}, n = e.hasNode().querySelectorAll("div[data-enyo-index]");
for (var r = 0, i, s; r < n.length; r++) i = n[r].getAttribute("data-enyo-index"), i !== null && (s = enyo.dom.getBounds(n[r]), t[parseInt(i, 10)] = {
height: s.height,
width: s.width
});
return t;
},
updateRowBounds: function(e) {
this.p0RowBounds[e] ? this.updateRowBoundsAtIndex(e, this.p0RowBounds, this.$.page0) : this.p1RowBounds[e] && this.updateRowBoundsAtIndex(e, this.p1RowBounds, this.$.page1);
},
updateRowBoundsAtIndex: function(e, t, n) {
var r = n.hasNode().querySelector('div[data-enyo-index="' + e + '"]'), i = enyo.dom.getBounds(r);
t[e].height = i.height, t[e].width = i.width;
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return t = Math.max(t, 0), {
no: t,
height: r,
pos: n + r,
startRow: t * this.rowsPerPage,
endRow: Math.min((t + 1) * this.rowsPerPage - 1, this.count - 1)
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
var t = this.pageHeights[e];
if (!t) {
var n = this.rowsPerPage * e, r = Math.min(this.count - n, this.rowsPerPage);
t = this.defaultPageHeight * (r / this.rowsPerPage);
}
return Math.max(1, t);
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.p0RowBounds = {}, this.p1RowBounds = {}, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments), r = this.getScrollTop();
return this.lastPos === r ? n : (this.lastPos = r, this.update(r), this.pinnedReorderMode && this.reorderScroll(e, t), n);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
scrollToRow: function(e) {
var t = this.pageForRow(e), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
deselect: function(e) {
return this.getSelection().deselect(e);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
rowRendered: function(e, t) {
this.updateRowBounds(t.rowIndex);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
},
pageForPageNumber: function(e, t) {
return e % 2 === 0 ? !t || e === this.p0 ? this.$.page0 : null : !t || e === this.p1 ? this.$.page1 : null;
},
shouldStartReordering: function(e, t) {
return !!this.getReorderable() && t.rowIndex >= 0 && !this.pinnedReorderMode && e === this.$.strategy && t.index >= 0 ? !0 : !1;
},
startReordering: function(e) {
this.$.strategy.listReordering = !0, this.buildReorderContainer(), this.doSetupReorderComponents(e), this.styleReorderContainer(e), this.draggingRowIndex = this.placeholderRowIndex = e.rowIndex, this.draggingRowNode = e.target, this.removedInitialPage = !1, this.itemMoved = !1, this.initialPageNumber = this.currentPageNumber = this.pageForRow(e.rowIndex), this.prevScrollTop = this.getScrollTop(), this.replaceNodeWithPlaceholder(e.rowIndex);
},
buildReorderContainer: function() {
this.$.reorderContainer.destroyClientControls();
for (var e = 0; e < this.reorderComponents.length; e++) this.$.reorderContainer.createComponent(this.reorderComponents[e], {
owner: this.owner
});
this.$.reorderContainer.render();
},
styleReorderContainer: function(e) {
this.setItemPosition(this.$.reorderContainer, e.rowIndex), this.setItemBounds(this.$.reorderContainer, e.rowIndex), this.$.reorderContainer.setShowing(!0), this.centerReorderContainer && this.centerReorderContainerOnPointer(e);
},
appendNodeToReorderContainer: function(e) {
this.$.reorderContainer.createComponent({
allowHtml: !0,
content: e.innerHTML
}).render();
},
centerReorderContainerOnPointer: function(e) {
var t = enyo.dom.calcNodePosition(this.hasNode()), n = e.pageX - t.left - parseInt(this.$.reorderContainer.domStyles.width, 10) / 2, r = e.pageY - t.top + this.getScrollTop() - parseInt(this.$.reorderContainer.domStyles.height, 10) / 2;
this.getStrategyKind() != "ScrollStrategy" && (n -= this.getScrollLeft(), r -= this.getScrollTop()), this.positionReorderContainer(n, r);
},
positionReorderContainer: function(e, t) {
this.$.reorderContainer.addClass("enyo-animatedTopAndLeft"), this.$.reorderContainer.addStyles("left:" + e + "px;top:" + t + "px;"), this.setPositionReorderContainerTimeout();
},
setPositionReorderContainerTimeout: function() {
this.clearPositionReorderContainerTimeout(), this.positionReorderContainerTimeout = setTimeout(enyo.bind(this, function() {
this.$.reorderContainer.removeClass("enyo-animatedTopAndLeft"), this.clearPositionReorderContainerTimeout();
}), 100);
},
clearPositionReorderContainerTimeout: function() {
this.positionReorderContainerTimeout && (clearTimeout(this.positionReorderContainerTimeout), this.positionReorderContainerTimeout = null);
},
shouldDoReorderDrag: function() {
return !this.getReorderable() || this.draggingRowIndex < 0 || this.pinnedReorderMode ? !1 : !0;
},
reorderDrag: function(e) {
this.positionReorderNode(e), this.checkForAutoScroll(e), this.updatePlaceholderPosition(e.pageY);
},
updatePlaceholderPosition: function(e) {
var t = this.getRowIndexFromCoordinate(e);
t !== -1 && (t >= this.placeholderRowIndex ? this.movePlaceholderToIndex(Math.min(this.count, t + 1)) : this.movePlaceholderToIndex(t));
},
positionReorderNode: function(e) {
var t = this.$.reorderContainer.getBounds(), n = t.left + e.ddx, r = t.top + e.ddy;
r = this.getStrategyKind() == "ScrollStrategy" ? r + (this.getScrollTop() - this.prevScrollTop) : r, this.$.reorderContainer.addStyles("top: " + r + "px ; left: " + n + "px"), this.prevScrollTop = this.getScrollTop();
},
checkForAutoScroll: function(e) {
var t = enyo.dom.calcNodePosition(this.hasNode()), n = this.getBounds(), r;
this.autoscrollPageY = e.pageY, e.pageY - t.top < n.height * this.dragToScrollThreshold ? (r = 100 * (1 - (e.pageY - t.top) / (n.height * this.dragToScrollThreshold)), this.scrollDistance = -1 * r) : e.pageY - t.top > n.height * (1 - this.dragToScrollThreshold) ? (r = 100 * ((e.pageY - t.top - n.height * (1 - this.dragToScrollThreshold)) / (n.height - n.height * (1 - this.dragToScrollThreshold))), this.scrollDistance = 1 * r) : this.scrollDistance = 0, this.scrollDistance === 0 ? this.stopAutoScrolling() : this.autoScrollTimeout || this.startAutoScrolling();
},
stopAutoScrolling: function() {
this.autoScrollTimeout && (clearTimeout(this.autoScrollTimeout), this.autoScrollTimeout = null);
},
startAutoScrolling: function() {
this.autoScrollTimeout = setInterval(enyo.bind(this, this.autoScroll), this.autoScrollTimeoutMS);
},
autoScroll: function() {
this.scrollDistance === 0 ? this.stopAutoScrolling() : this.autoScrollTimeout || this.startAutoScrolling(), this.setScrollPosition(this.getScrollPosition() + this.scrollDistance), this.positionReorderNode({
ddx: 0,
ddy: 0
}), this.updatePlaceholderPosition(this.autoscrollPageY);
},
movePlaceholderToIndex: function(e) {
var t, n;
if (e < 0) return;
e >= this.count ? (t = null, n = this.pageForPageNumber(this.pageForRow(this.count - 1)).hasNode()) : (t = this.$.generator.fetchRowNode(e), n = t.parentNode);
var r = this.pageForRow(e);
r >= this.pageCount && (r = this.currentPageNumber), n.insertBefore(this.placeholderNode, t), this.currentPageNumber !== r && (this.updatePageHeight(this.currentPageNumber), this.updatePageHeight(r), this.updatePagePositions(r)), this.placeholderRowIndex = e, this.currentPageNumber = r, this.itemMoved = !0;
},
finishReordering: function(e, t) {
if (!this.isReordering() || this.pinnedReorderMode || this.completeReorderTimeout) return;
return this.stopAutoScrolling(), this.$.strategy.listReordering = !1, this.moveReorderedContainerToDroppedPosition(t), this.completeReorderTimeout = setTimeout(enyo.bind(this, this.completeFinishReordering, t), 100), t.preventDefault(), !0;
},
moveReorderedContainerToDroppedPosition: function() {
var e = this.getRelativeOffset(this.placeholderNode, this.hasNode()), t = this.getStrategyKind() == "ScrollStrategy" ? e.top : e.top - this.getScrollTop(), n = e.left - this.getScrollLeft();
this.positionReorderContainer(n, t);
},
completeFinishReordering: function(e) {
this.completeReorderTimeout = null, this.placeholderRowIndex > this.draggingRowIndex && (this.placeholderRowIndex = Math.max(0, this.placeholderRowIndex - 1));
if (this.draggingRowIndex == this.placeholderRowIndex && this.pinnedReorderComponents.length && !this.pinnedReorderMode && !this.itemMoved) {
this.beginPinnedReorder(e);
return;
}
this.removeDraggingRowNode(), this.removePlaceholderNode(), this.emptyAndHideReorderContainer(), this.pinnedReorderMode = !1, this.reorderRows(e), this.draggingRowIndex = this.placeholderRowIndex = -1, this.refresh();
},
beginPinnedReorder: function(e) {
this.buildPinnedReorderContainer(), this.doSetupPinnedReorderComponents(enyo.mixin(e, {
index: this.draggingRowIndex
})), this.pinnedReorderMode = !0, this.initialPinPosition = e.pageY;
},
emptyAndHideReorderContainer: function() {
this.$.reorderContainer.destroyComponents(), this.$.reorderContainer.setShowing(!1);
},
buildPinnedReorderContainer: function() {
this.$.reorderContainer.destroyClientControls();
for (var e = 0; e < this.pinnedReorderComponents.length; e++) this.$.reorderContainer.createComponent(this.pinnedReorderComponents[e], {
owner: this.owner
});
this.$.reorderContainer.render();
},
reorderRows: function(e) {
this.doReorder(this.makeReorderEvent(e)), this.positionReorderedNode(), this.updateListIndices();
},
makeReorderEvent: function(e) {
return e.reorderFrom = this.draggingRowIndex, e.reorderTo = this.placeholderRowIndex, e;
},
positionReorderedNode: function() {
if (!this.removedInitialPage) {
var e = this.$.generator.fetchRowNode(this.placeholderRowIndex);
e && (e.parentNode.insertBefore(this.hiddenNode, e), this.showNode(this.hiddenNode)), this.hiddenNode = null;
if (this.currentPageNumber != this.initialPageNumber) {
var t, n, r = this.pageForPageNumber(this.currentPageNumber), i = this.pageForPageNumber(this.currentPageNumber + 1);
this.initialPageNumber < this.currentPageNumber ? (t = r.hasNode().firstChild, i.hasNode().appendChild(t)) : (t = r.hasNode().lastChild, n = i.hasNode().firstChild, i.hasNode().insertBefore(t, n)), this.correctPageHeights(), this.updatePagePositions(this.initialPageNumber);
}
}
},
updateListIndices: function() {
if (this.shouldDoRefresh()) {
this.refresh(), this.correctPageHeights();
return;
}
var e = Math.min(this.draggingRowIndex, this.placeholderRowIndex), t = Math.max(this.draggingRowIndex, this.placeholderRowIndex), n = this.draggingRowIndex - this.placeholderRowIndex > 0 ? 1 : -1, r, i, s, o;
if (n === 1) {
r = this.$.generator.fetchRowNode(this.draggingRowIndex), r && r.setAttribute("data-enyo-index", "reordered");
for (i = t - 1, s = t; i >= e; i--) {
r = this.$.generator.fetchRowNode(i);
if (!r) continue;
o = parseInt(r.getAttribute("data-enyo-index"), 10), s = o + 1, r.setAttribute("data-enyo-index", s);
}
r = this.hasNode().querySelector('[data-enyo-index="reordered"]'), r.setAttribute("data-enyo-index", this.placeholderRowIndex);
} else {
r = this.$.generator.fetchRowNode(this.draggingRowIndex), r && r.setAttribute("data-enyo-index", this.placeholderRowIndex);
for (i = e + 1, s = e; i <= t; i++) {
r = this.$.generator.fetchRowNode(i);
if (!r) continue;
o = parseInt(r.getAttribute("data-enyo-index"), 10), s = o - 1, r.setAttribute("data-enyo-index", s);
}
}
},
shouldDoRefresh: function() {
return Math.abs(this.initialPageNumber - this.currentPageNumber) > 1;
},
getNodeStyle: function(e) {
var t = this.$.generator.fetchRowNode(e);
if (!t) return;
var n = this.getRelativeOffset(t, this.hasNode()), r = enyo.dom.getBounds(t);
return {
h: r.height,
w: r.width,
left: n.left,
top: n.top
};
},
getRelativeOffset: function(e, t) {
var n = {
top: 0,
left: 0
};
if (e !== t && e.parentNode) do n.top += e.offsetTop || 0, n.left += e.offsetLeft || 0, e = e.offsetParent; while (e && e !== t);
return n;
},
replaceNodeWithPlaceholder: function(e) {
var t = this.$.generator.fetchRowNode(e);
if (!t) {
enyo.log("No node - " + e);
return;
}
this.placeholderNode = this.createPlaceholderNode(t), this.hiddenNode = this.hideNode(t);
var n = this.pageForPageNumber(this.currentPageNumber);
n.hasNode().insertBefore(this.placeholderNode, this.hiddenNode);
},
createPlaceholderNode: function(e) {
var t = this.$.placeholder.hasNode().cloneNode(!0), n = enyo.dom.getBounds(e);
return t.style.height = n.height + "px", t.style.width = n.width + "px", t;
},
removePlaceholderNode: function() {
this.removeNode(this.placeholderNode), this.placeholderNode = null;
},
removeDraggingRowNode: function() {
this.draggingRowNode = null;
var e = this.$.holdingarea.hasNode();
e.innerHTML = "";
},
removeNode: function(e) {
if (!e || !e.parentNode) return;
e.parentNode.removeChild(e);
},
updatePageHeight: function(e) {
if (e < 0) return;
var t = this.pageForPageNumber(e, !0);
if (t) {
var n = this.pageHeights[e], r = Math.max(1, t.getBounds().height);
this.pageHeights[e] = r, this.portSize += r - n;
}
},
updatePagePositions: function(e) {
this.positionPage(this.currentPageNumber, this.pageForPageNumber(this.currentPageNumber)), this.positionPage(e, this.pageForPageNumber(e));
},
correctPageHeights: function() {
this.updatePageHeight(this.currentPageNumber), this.initialPageNumber != this.currentPageNumber && this.updatePageHeight(this.initialPageNumber);
},
hideNode: function(e) {
return e.style.display = "none", e;
},
showNode: function(e) {
return e.style.display = "block", e;
},
dropPinnedRow: function(e) {
this.moveReorderedContainerToDroppedPosition(e), this.completeReorderTimeout = setTimeout(enyo.bind(this, this.completeFinishReordering, e), 100);
return;
},
cancelPinnedMode: function(e) {
this.placeholderRowIndex = this.draggingRowIndex, this.dropPinnedRow(e);
},
getRowIndexFromCoordinate: function(e) {
var t = this.getScrollTop() + e - enyo.dom.calcNodePosition(this.hasNode()).top;
if (t < 0) return -1;
var n = this.positionToPageInfo(t), r = n.no == this.p0 ? this.p0RowBounds : this.p1RowBounds;
if (!r) return this.count;
var i = n.pos, s = this.placeholderNode ? enyo.dom.getBounds(this.placeholderNode).height : 0, o = 0;
for (var u = n.startRow; u <= n.endRow; ++u) {
if (u === this.placeholderRowIndex) {
o += s;
if (o >= i) return -1;
}
if (u !== this.draggingRowIndex) {
o += r[u].height;
if (o >= i) return u;
}
}
return u;
},
getIndexPosition: function(e) {
return enyo.dom.calcNodePosition(this.$.generator.fetchRowNode(e));
},
setItemPosition: function(e, t) {
var n = this.getNodeStyle(t), r = this.getStrategyKind() == "ScrollStrategy" ? n.top : n.top - this.getScrollTop(), i = "top:" + r + "px; left:" + n.left + "px;";
e.addStyles(i);
},
setItemBounds: function(e, t) {
var n = this.getNodeStyle(t), r = "width:" + n.w + "px; height:" + n.h + "px;";
e.addStyles(r);
},
reorderScroll: function(e, t) {
this.getStrategyKind() == "ScrollStrategy" && this.$.reorderContainer.addStyles("top:" + (this.initialPinPosition + this.getScrollTop() - this.rowHeight) + "px;"), this.updatePlaceholderPosition(this.initialPinPosition);
},
hideReorderingRow: function() {
var e = this.hasNode().querySelector('[data-enyo-index="' + this.draggingRowIndex + '"]');
e && (this.hiddenNode = this.hideNode(e));
},
isReordering: function() {
return this.draggingRowIndex > -1;
},
isSwiping: function() {
return this.swipeIndex != null && !this.swipeComplete && this.swipeDirection != null;
},
swipeDragStart: function(e, t) {
return t.index == null || t.vertical ? !0 : (this.completeSwipeTimeout && this.completeSwipe(t), this.swipeComplete = !1, this.swipeIndex != t.index && (this.clearSwipeables(), this.swipeIndex = t.index), this.swipeDirection = t.xDirection, this.persistentItemVisible || this.startSwipe(t), this.draggedXDistance = 0, this.draggedYDistance = 0, !0);
},
swipeDrag: function(e, t) {
return this.persistentItemVisible ? (this.dragPersistentItem(t), this.preventDragPropagation) : this.isSwiping() ? (this.dragSwipeableComponents(this.calcNewDragPosition(t.ddx)), this.draggedXDistance = t.dx, this.draggedYDistance = t.dy, !0) : !1;
},
swipeDragFinish: function(e, t) {
if (this.persistentItemVisible) this.dragFinishPersistentItem(t); else {
if (!this.isSwiping()) return !1;
var n = this.calcPercentageDragged(this.draggedXDistance);
n > this.percentageDraggedThreshold && t.xDirection === this.swipeDirection ? this.swipe(this.fastSwipeSpeedMS) : this.backOutSwipe(t);
}
return this.preventDragPropagation;
},
isSwipeable: function() {
return this.enableSwipe && this.$.swipeableComponents.controls.length !== 0 && !this.isReordering() && !this.pinnedReorderMode;
},
positionSwipeableContainer: function(e, t) {
var n = this.$.generator.fetchRowNode(e);
if (!n) return;
var r = this.getRelativeOffset(n, this.hasNode()), i = enyo.dom.getBounds(n), s = t == 1 ? -1 * i.width : i.width;
this.$.swipeableComponents.addStyles("top: " + r.top + "px; left: " + s + "px; height: " + i.height + "px; width: " + i.width + "px;");
},
calcNewDragPosition: function(e) {
var t = this.$.swipeableComponents.getBounds(), n = t.left, r = this.$.swipeableComponents.getBounds(), i = this.swipeDirection == 1 ? 0 : -1 * r.width, s = this.swipeDirection == 1 ? n + e > i ? i : n + e : n + e < i ? i : n + e;
return s;
},
dragSwipeableComponents: function(e) {
this.$.swipeableComponents.applyStyle("left", e + "px");
},
startSwipe: function(e) {
e.index = this.swipeIndex, this.positionSwipeableContainer(this.swipeIndex, e.xDirection), this.$.swipeableComponents.setShowing(!0), this.setPersistentItemOrigin(e.xDirection), this.doSetupSwipeItem(e);
},
dragPersistentItem: function(e) {
var t = 0, n = this.persistentItemOrigin == "right" ? Math.max(t, t + e.dx) : Math.min(t, t + e.dx);
this.$.swipeableComponents.applyStyle("left", n + "px");
},
dragFinishPersistentItem: function(e) {
var t = this.calcPercentageDragged(e.dx) > .2, n = e.dx > 0 ? "right" : e.dx < 0 ? "left" : null;
this.persistentItemOrigin == n ? t ? this.slideAwayItem() : this.bounceItem(e) : this.bounceItem(e);
},
setPersistentItemOrigin: function(e) {
this.persistentItemOrigin = e == 1 ? "left" : "right";
},
calcPercentageDragged: function(e) {
return Math.abs(e / this.$.swipeableComponents.getBounds().width);
},
swipe: function(e) {
this.swipeComplete = !0, this.animateSwipe(0, e);
},
backOutSwipe: function(e) {
var t = this.$.swipeableComponents.getBounds(), n = this.swipeDirection == 1 ? -1 * t.width : t.width;
this.animateSwipe(n, this.fastSwipeSpeedMS), this.swipeDirection = null;
},
bounceItem: function(e) {
var t = this.$.swipeableComponents.getBounds();
t.left != t.width && this.animateSwipe(0, this.normalSwipeSpeedMS);
},
slideAwayItem: function() {
var e = this.$.swipeableComponents, t = e.getBounds().width, n = this.persistentItemOrigin == "left" ? -1 * t : t;
this.animateSwipe(n, this.normalSwipeSpeedMS), this.persistentItemVisible = !1, this.setPersistSwipeableItem(!1);
},
clearSwipeables: function() {
this.$.swipeableComponents.setShowing(!1), this.persistentItemVisible = !1, this.setPersistSwipeableItem(!1);
},
completeSwipe: function(e) {
this.completeSwipeTimeout && (clearTimeout(this.completeSwipeTimeout), this.completeSwipeTimeout = null), this.getPersistSwipeableItem() ? this.persistentItemVisible = !0 : (this.$.swipeableComponents.setShowing(!1), this.swipeComplete && this.doSwipeComplete({
index: this.swipeIndex,
xDirection: this.swipeDirection
})), this.swipeIndex = null, this.swipeDirection = null;
},
animateSwipe: function(e, t) {
var n = enyo.now(), r = 0, i = this.$.swipeableComponents, s = parseInt(i.domStyles.left, 10), o = e - s;
this.stopAnimateSwipe();
var u = enyo.bind(this, function() {
var e = enyo.now() - n, r = e / t, a = s + o * Math.min(r, 1);
i.applyStyle("left", a + "px"), this.job = enyo.requestAnimationFrame(u), e / t >= 1 && (this.stopAnimateSwipe(), this.completeSwipeTimeout = setTimeout(enyo.bind(this, function() {
this.completeSwipe();
}), this.completeSwipeDelayMS));
});
this.job = enyo.requestAnimationFrame(u);
},
stopAnimateSwipe: function() {
this.job && (this.job = enyo.cancelRequestAnimationFrame(this.job));
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.strategyKind = this.resetStrategyKind(), this.inherited(arguments);
},
resetStrategyKind: function() {
return enyo.platform.android >= 3 ? "TranslateScrollStrategy" : "TouchScrollStrategy";
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath || this.getStrategy(), i = -1 * this.getScrollTop();
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath || this.getStrategy();
e.setScrollY(-1 * this.getScrollTop() - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0;
var e = this.getStrategy().$.scrollMath || this.getStrategy();
e.setScrollY(this.pullHeight), e.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// AroundList.js

enyo.kind({
name: "enyo.AroundList",
kind: "enyo.List",
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "aboveClient"
}, {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "holdingarea",
allowHtml: !0,
classes: "enyo-list-holdingarea"
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "belowClient"
}, {
name: "placeholder"
}, {
name: "swipeableComponents",
style: "position:absolute; display:block; top:-1000px; left:0px;"
} ]
} ],
aboveComponents: null,
initComponents: function() {
this.inherited(arguments), this.aboveComponents && this.$.aboveClient.createComponents(this.aboveComponents, {
owner: this.owner
}), this.belowComponents && this.$.belowClient.createComponents(this.belowComponents, {
owner: this.owner
});
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.aboveHeight = this.$.aboveClient.getBounds().height, this.belowHeight = this.$.belowClient.getBounds().height, this.portSize = this.aboveHeight + this.belowHeight;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e), r = this.bottomUp ? this.belowHeight : this.aboveHeight;
n += r, t.applyStyle(this.pageBound, n + "px");
},
scrollToContentStart: function() {
var e = this.bottomUp ? this.belowHeight : this.aboveHeight;
this.setScrollPosition(e);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
calcArrangementDifference: function(e, t, n, r) {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android && enyo.platform.ie !== 10) {
var i = t.left, s = t.top;
i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r, enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n === 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex;
t = this.container.toIndex, this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds, r, i, s, o, u;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var a;
for (r = 0, s = 0; u = e[r]; r++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (a = u);
if (a) {
var f = n.width - s;
a.width = f >= 0 ? f : a.width;
}
for (r = 0, i = t.left; u = e[r]; r++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n, r, i, s, o = this.container.getPanels(), u = this.container.clamp(t), a = this.containerBounds.width;
for (n = u, i = 0; s = o[n]; n++) {
i += s.width + s.marginWidth;
if (i > a) break;
}
var f = a - i, l = 0;
if (f > 0) {
var c = u;
for (n = u - 1, r = 0; s = o[n]; n--) {
r += s.width + s.marginWidth;
if (f - r <= 0) {
l = f - r, u = n;
break;
}
}
}
var h, p;
for (n = 0, p = this.containerPadding.left + l; s = o[n]; n++) h = s.width + s.marginWidth, n < u ? this.arrangeControl(s, {
left: -h
}) : (this.arrangeControl(s, {
left: Math.floor(p)
}), p += h);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
peekWidth: 0,
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
constructor: function() {
this.inherited(arguments), this.peekWidth = this.container.peekWidth != null ? this.container.peekWidth : this.peekWidth;
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o, u = 0; o = n[r]; r++) o.getShowing() ? (this.arrangeControl(o, {
left: i + u * this.peekWidth
}), r >= t && (i += o.width + o.marginWidth - this.peekWidth), u++) : (this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth)), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// DockRightArranger.js

enyo.kind({
name: "enyo.DockRightArranger",
kind: "Arranger",
basePanel: !1,
overlap: 0,
layoutWidth: 0,
constructor: function() {
this.inherited(arguments), this.overlap = this.container.overlap != null ? this.container.overlap : this.overlap, this.layoutWidth = this.container.layoutWidth != null ? this.container.layoutWidth : this.layoutWidth;
},
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds, r, i, s;
n.width -= t.left + t.right;
var o = n.width, u = e.length;
this.container.transitionPositions = {};
for (r = 0; s = e[r]; r++) s.width = r === 0 && this.container.basePanel ? o : s.getBounds().width;
for (r = 0; s = e[r]; r++) {
r === 0 && this.container.basePanel && s.setBounds({
width: o
}), s.setBounds({
top: t.top,
bottom: t.bottom
});
for (j = 0; s = e[j]; j++) {
var a;
if (r === 0 && this.container.basePanel) a = 0; else if (j < r) a = o; else {
if (r !== j) break;
var f = o > this.layoutWidth ? this.overlap : 0;
a = o - e[r].width + f;
}
this.container.transitionPositions[r + "." + j] = a;
}
if (j < u) {
var l = !1;
for (k = r + 1; k < u; k++) {
var f = 0;
if (l) f = 0; else if (e[r].width + e[k].width - this.overlap > o) f = 0, l = !0; else {
f = e[r].width - this.overlap;
for (i = r; i < k; i++) {
var c = f + e[i + 1].width - this.overlap;
if (!(c < o)) {
f = o;
break;
}
f = c;
}
f = o - f;
}
this.container.transitionPositions[r + "." + k] = f;
}
}
}
},
arrange: function(e, t) {
var n, r, i = this.container.getPanels(), s = this.container.clamp(t);
for (n = 0; r = i[n]; n++) {
var o = this.container.transitionPositions[n + "." + s];
this.arrangeControl(r, {
left: o
});
}
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels(), s = e < n ? i[n].width : i[e].width;
return s;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
var n, r, i, s;
if (this.container.getPanels().length == 1) {
s = {}, s[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], s);
return;
}
var o = Math.floor(this.container.getPanels().length / 2), u = this.getOrderedControls(Math.floor(t) - o), a = this.containerBounds[this.axisSize] - this.margin - this.margin, f = this.margin - a * o;
for (n = 0; r = u[n]; n++) s = {}, s[this.axisPosition] = f, this.arrangeControl(r, s), f += a;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
onscroll: "domScroll"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged();
},
rendered: function() {
this.inherited(arguments), enyo.makeBubble(this, "scroll");
},
domScroll: function(e, t) {
this.hasNode() && this.node.scrollLeft > 0 && (this.node.scrollLeft = 0);
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
destroy: function() {
this.destroying = !0, this.inherited(arguments);
},
removeControl: function(e) {
this.inherited(arguments), this.destroying && this.controls.length > 0 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels(), t = this.index % e.length;
return t < 0 && (t += e.length), e[t];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), !this.dragging && this.$.animator && (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator && this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// ImageViewPin.js

enyo.kind({
name: "enyo.ImageViewPin",
kind: "enyo.Control",
published: {
highlightAnchorPoint: !1,
anchor: {
top: 0,
left: 0
},
position: {
top: 0,
left: 0
}
},
style: "position:absolute;z-index:1000;width:0px;height:0px;",
handlers: {
onPositionPin: "reAnchor"
},
create: function() {
this.inherited(arguments), this.styleClientControls(), this.positionClientControls(), this.highlightAnchorPointChanged(), this.anchorChanged();
},
styleClientControls: function() {
var e = this.getClientControls();
for (var t = 0; t < e.length; t++) e[t].applyStyle("position", "absolute");
},
positionClientControls: function() {
var e = this.getClientControls();
for (var t = 0; t < e.length; t++) for (var n in this.position) e[t].applyStyle(n, this.position[n] + "px");
},
highlightAnchorPointChanged: function() {
this.addRemoveClass("pinDebug", this.highlightAnchorPoint);
},
anchorChanged: function() {
var e = null, t = null;
for (t in this.anchor) {
e = this.anchor[t].toString().match(/^(\d+(?:\.\d+)?)(.*)$/);
if (!e) continue;
this.anchor[t + "Coords"] = {
value: e[1],
units: e[2] || "px"
};
}
},
reAnchor: function(e, t) {
var n = t.scale, r = t.bounds, i = this.anchor.right ? this.anchor.rightCoords.units == "px" ? r.width + r.x - this.anchor.rightCoords.value * n : r.width * (100 - this.anchor.rightCoords.value) / 100 + r.x : this.anchor.leftCoords.units == "px" ? this.anchor.leftCoords.value * n + r.x : r.width * this.anchor.leftCoords.value / 100 + r.x, s = this.anchor.bottom ? this.anchor.bottomCoords.units == "px" ? r.height + r.y - this.anchor.bottomCoords.value * n : r.height * (100 - this.anchor.bottomCoords.value) / 100 + r.y : this.anchor.topCoords.units == "px" ? this.anchor.topCoords.value * n + r.y : r.height * this.anchor.topCoords.value / 100 + r.y;
this.applyStyle("left", i + "px"), this.applyStyle("top", s + "px");
}
});

// ImageView.js

enyo.kind({
name: "enyo.ImageView",
kind: enyo.Scroller,
touchOverscroll: !1,
thumb: !1,
animate: !0,
verticalDragPropagation: !0,
horizontalDragPropagation: !0,
published: {
scale: "auto",
disableZoom: !1,
src: undefined
},
events: {
onZoom: ""
},
touch: !0,
preventDragPropagation: !1,
handlers: {
ondragstart: "dragPropagation"
},
components: [ {
name: "animator",
kind: "Animator",
onStep: "zoomAnimationStep",
onEnd: "zoomAnimationEnd"
}, {
name: "viewport",
style: "overflow:hidden;min-height:100%;min-width:100%;",
classes: "enyo-fit",
ongesturechange: "gestureTransform",
ongestureend: "saveState",
ontap: "singleTap",
ondblclick: "doubleClick",
onmousewheel: "mousewheel",
components: [ {
kind: "Image",
ondown: "down"
} ]
} ],
create: function() {
this.inherited(arguments), this.canTransform = enyo.dom.canTransform(), this.canTransform || this.$.image.applyStyle("position", "relative"), this.canAccelerate = enyo.dom.canAccelerate(), this.bufferImage = new Image, this.bufferImage.onload = enyo.bind(this, "imageLoaded"), this.bufferImage.onerror = enyo.bind(this, "imageError"), this.srcChanged(), this.getStrategy().setDragDuringGesture(!1), this.getStrategy().$.scrollMath && this.getStrategy().$.scrollMath.start();
},
down: function(e, t) {
t.preventDefault();
},
dragPropagation: function(e, t) {
var n = this.getStrategy().getScrollBounds(), r = n.top === 0 && t.dy > 0 || n.top >= n.maxTop - 2 && t.dy < 0, i = n.left === 0 && t.dx > 0 || n.left >= n.maxLeft - 2 && t.dx < 0;
return !(r && this.verticalDragPropagation || i && this.horizontalDragPropagation);
},
mousewheel: function(e, t) {
t.pageX |= t.clientX + t.target.scrollLeft, t.pageY |= t.clientY + t.target.scrollTop;
var n = (this.maxScale - this.minScale) / 10, r = this.scale;
if (t.wheelDelta > 0 || t.detail < 0) this.scale = this.limitScale(this.scale + n); else if (t.wheelDelta < 0 || t.detail > 0) this.scale = this.limitScale(this.scale - n);
return this.eventPt = this.calcEventLocation(t), this.transformImage(this.scale), r != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null, t.preventDefault(), !0;
},
srcChanged: function() {
this.src && this.src.length > 0 && this.bufferImage && this.src != this.bufferImage.src && (this.bufferImage.src = this.src);
},
imageLoaded: function(e) {
this.originalWidth = this.bufferImage.width, this.originalHeight = this.bufferImage.height, this.scaleChanged(), this.$.image.setSrc(this.bufferImage.src), enyo.dom.transformValue(this.getStrategy().$.client, "translate3d", "0px, 0px, 0"), this.positionClientControls(this.scale), this.alignImage();
},
resizeHandler: function() {
this.inherited(arguments), this.$.image.src && this.scaleChanged();
},
scaleChanged: function() {
var e = this.hasNode();
if (e) {
this.containerWidth = e.clientWidth, this.containerHeight = e.clientHeight;
var t = this.containerWidth / this.originalWidth, n = this.containerHeight / this.originalHeight;
this.minScale = Math.min(t, n), this.maxScale = this.minScale * 3 < 1 ? 1 : this.minScale * 3, this.scale == "auto" ? this.scale = this.minScale : this.scale == "width" ? this.scale = t : this.scale == "height" ? this.scale = n : this.scale == "fit" ? (this.fitAlignment = "center", this.scale = Math.max(t, n)) : (this.maxScale = Math.max(this.maxScale, this.scale), this.scale = this.limitScale(this.scale));
}
this.eventPt = this.calcEventLocation(), this.transformImage(this.scale);
},
imageError: function(e) {
enyo.error("Error loading image: " + this.src), this.bubble("onerror", e);
},
alignImage: function() {
if (this.fitAlignment && this.fitAlignment === "center") {
var e = this.getScrollBounds();
this.setScrollLeft(e.maxLeft / 2), this.setScrollTop(e.maxTop / 2);
}
},
gestureTransform: function(e, t) {
this.eventPt = this.calcEventLocation(t), this.transformImage(this.limitScale(this.scale * t.scale));
},
calcEventLocation: function(e) {
var t = {
x: 0,
y: 0
};
if (e && this.hasNode()) {
var n = this.node.getBoundingClientRect();
t.x = Math.round(e.pageX - n.left - this.imageBounds.x), t.x = Math.max(0, Math.min(this.imageBounds.width, t.x)), t.y = Math.round(e.pageY - n.top - this.imageBounds.y), t.y = Math.max(0, Math.min(this.imageBounds.height, t.y));
}
return t;
},
transformImage: function(e) {
this.tapped = !1;
var t = this.imageBounds || this.innerImageBounds(e);
this.imageBounds = this.innerImageBounds(e), this.scale > this.minScale ? this.$.viewport.applyStyle("cursor", "move") : this.$.viewport.applyStyle("cursor", null), this.$.viewport.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px"
}), this.ratioX = this.ratioX || (this.eventPt.x + this.getScrollLeft()) / t.width, this.ratioY = this.ratioY || (this.eventPt.y + this.getScrollTop()) / t.height;
var n, r;
this.$.animator.ratioLock ? (n = this.$.animator.ratioLock.x * this.imageBounds.width - this.containerWidth / 2, r = this.$.animator.ratioLock.y * this.imageBounds.height - this.containerHeight / 2) : (n = this.ratioX * this.imageBounds.width - this.eventPt.x, r = this.ratioY * this.imageBounds.height - this.eventPt.y), n = Math.max(0, Math.min(this.imageBounds.width - this.containerWidth, n)), r = Math.max(0, Math.min(this.imageBounds.height - this.containerHeight, r));
if (this.canTransform) {
var i = {
scale: e
};
this.canAccelerate ? i = enyo.mixin({
translate3d: Math.round(this.imageBounds.left) + "px, " + Math.round(this.imageBounds.top) + "px, 0px"
}, i) : i = enyo.mixin({
translate: this.imageBounds.left + "px, " + this.imageBounds.top + "px"
}, i), enyo.dom.transform(this.$.image, i);
} else this.$.image.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px",
left: this.imageBounds.left + "px",
top: this.imageBounds.top + "px"
});
this.setScrollLeft(n), this.setScrollTop(r), this.positionClientControls(e);
},
limitScale: function(e) {
return this.disableZoom ? e = this.scale : e > this.maxScale ? e = this.maxScale : e < this.minScale && (e = this.minScale), e;
},
innerImageBounds: function(e) {
var t = this.originalWidth * e, n = this.originalHeight * e, r = {
x: 0,
y: 0,
transX: 0,
transY: 0
};
return t < this.containerWidth && (r.x += (this.containerWidth - t) / 2), n < this.containerHeight && (r.y += (this.containerHeight - n) / 2), this.canTransform && (r.transX -= (this.originalWidth - t) / 2, r.transY -= (this.originalHeight - n) / 2), {
left: r.x + r.transX,
top: r.y + r.transY,
width: t,
height: n,
x: r.x,
y: r.y
};
},
saveState: function(e, t) {
var n = this.scale;
this.scale *= t.scale, this.scale = this.limitScale(this.scale), n != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null;
},
doubleClick: function(e, t) {
enyo.platform.ie == 8 && (this.tapped = !0, t.pageX = t.clientX + t.target.scrollLeft, t.pageY = t.clientY + t.target.scrollTop, this.singleTap(e, t), t.preventDefault());
},
singleTap: function(e, t) {
setTimeout(enyo.bind(this, function() {
this.tapped = !1;
}), 300), this.tapped ? (this.tapped = !1, this.smartZoom(e, t)) : this.tapped = !0;
},
smartZoom: function(e, t) {
var n = this.hasNode(), r = this.$.image.hasNode();
if (n && r && this.hasNode() && !this.disableZoom) {
var i = this.scale;
this.scale != this.minScale ? this.scale = this.minScale : this.scale = this.maxScale, this.eventPt = this.calcEventLocation(t);
if (this.animate) {
var s = {
x: (this.eventPt.x + this.getScrollLeft()) / this.imageBounds.width,
y: (this.eventPt.y + this.getScrollTop()) / this.imageBounds.height
};
this.$.animator.play({
duration: 350,
ratioLock: s,
baseScale: i,
deltaScale: this.scale - i
});
} else this.transformImage(this.scale), this.doZoom({
scale: this.scale
});
}
},
zoomAnimationStep: function(e, t) {
var n = this.$.animator.baseScale + this.$.animator.deltaScale * this.$.animator.value;
this.transformImage(n);
},
zoomAnimationEnd: function(e, t) {
this.doZoom({
scale: this.scale
}), this.$.animator.ratioLock = undefined;
},
positionClientControls: function(e) {
this.waterfallDown("onPositionPin", {
scale: e,
bounds: this.imageBounds
});
}
});

// ImageCarousel.js

enyo.kind({
name: "enyo.ImageCarousel",
kind: enyo.Panels,
arrangerKind: "enyo.CarouselArranger",
defaultScale: "auto",
disableZoom: !1,
lowMemory: !1,
published: {
images: []
},
handlers: {
onTransitionStart: "transitionStart",
onTransitionFinish: "transitionFinish"
},
create: function() {
this.inherited(arguments), this.imageCount = this.images.length, this.images.length > 0 && (this.initContainers(), this.loadNearby());
},
initContainers: function() {
for (var e = 0; e < this.images.length; e++) this.$["container" + e] || (this.createComponent({
name: "container" + e,
style: "height:100%; width:100%;"
}), this.$["container" + e].render());
for (e = this.images.length; e < this.imageCount; e++) this.$["image" + e] && this.$["image" + e].destroy(), this.$["container" + e].destroy();
this.imageCount = this.images.length;
},
loadNearby: function() {
var e = this.getBufferRange();
for (var t in e) this.loadImageView(e[t]);
},
getBufferRange: function() {
var e = [];
if (this.layout.containerBounds) {
var t = 1, n = this.layout.containerBounds, r, i, s, o, u, a;
o = this.index - 1, u = 0, a = n.width * t;
while (o >= 0 && u <= a) s = this.$["container" + o], u += s.width + s.marginWidth, e.unshift(o), o--;
o = this.index, u = 0, a = n.width * (t + 1);
while (o < this.images.length && u <= a) s = this.$["container" + o], u += s.width + s.marginWidth, e.push(o), o++;
}
return e;
},
reflow: function() {
this.inherited(arguments), this.loadNearby();
},
loadImageView: function(e) {
return this.wrap && (e = (e % this.images.length + this.images.length) % this.images.length), e >= 0 && e <= this.images.length - 1 && (this.$["image" + e] ? this.$["image" + e].src != this.images[e] && (this.$["image" + e].setSrc(this.images[e]), this.$["image" + e].setScale(this.defaultScale), this.$["image" + e].setDisableZoom(this.disableZoom)) : (this.$["container" + e].createComponent({
name: "image" + e,
kind: "ImageView",
scale: this.defaultScale,
disableZoom: this.disableZoom,
src: this.images[e],
verticalDragPropagation: !1,
style: "height:100%; width:100%;"
}, {
owner: this
}), this.$["image" + e].render())), this.$["image" + e];
},
setImages: function(e) {
this.setPropertyValue("images", e, "imagesChanged");
},
imagesChanged: function() {
this.initContainers(), this.loadNearby();
},
indexChanged: function() {
this.loadNearby(), this.lowMemory && this.cleanupMemory(), this.inherited(arguments);
},
transitionStart: function(e, t) {
if (t.fromIndex == t.toIndex) return !0;
},
transitionFinish: function(e, t) {
this.loadNearby(), this.lowMemory && this.cleanupMemory();
},
getActiveImage: function() {
return this.getImageByIndex(this.index);
},
getImageByIndex: function(e) {
return this.$["image" + e] || this.loadImageView(e);
},
cleanupMemory: function() {
var e = getBufferRange();
for (var t = 0; t < this.images.length; t++) enyo.indexOf(t, e) === -1 && this.$["image" + t] && this.$["image" + t].destroy();
}
});

// $lib/onyx/source/TabPanels.js

enyo.kind({
name: "enyo.TabPanels",
kind: "Panels",
draggable: !1,
tabTools: [ {
name: "scroller",
kind: "Scroller",
maxHeight: "100px",
strategyKind: "TranslateScrollStrategy",
thumb: !1,
vertical: "hidden",
horizontal: "auto",
components: [ {
name: "tabs",
kind: "onyx.RadioGroup",
style: "text-align: left; white-space: nowrap",
controlClasses: "onyx-tabbutton",
onActivate: "tabActivate"
} ]
}, {
name: "client",
fit: !0,
kind: "Panels",
classes: "enyo-tab-panels",
onTransitionStart: "clientTransitionStart"
} ],
create: function() {
this.inherited(arguments), this.$.client.getPanels = enyo.bind(this, "getClientPanels"), this.draggableChanged(), this.animateChanged(), this.wrapChanged();
},
initComponents: function() {
this.createChrome(this.tabTools), this.inherited(arguments);
},
getClientPanels: function() {
return this.getPanels();
},
flow: function() {
this.inherited(arguments), this.$.client.flow();
},
reflow: function() {
this.inherited(arguments), this.$.client.reflow();
},
draggableChanged: function() {
this.$.client.setDraggable(this.draggable), this.draggable = !1;
},
animateChanged: function() {
this.$.client.setAnimate(this.animate), this.animate = !1;
},
wrapChanged: function() {
this.$.client.setWrap(this.wrap), this.wrap = !1;
},
isPanel: function(e) {
var t = e.name;
return t != "tabs" && t != "client" && t != "scroller";
},
addControl: function(e) {
this.inherited(arguments);
if (this.isPanel(e)) {
var t = e.caption || "Tab " + this.$.tabs.controls.length, n = e._tab = this.$.tabs.createComponent({
content: t
});
this.hasNode() && n.render();
}
},
removeControl: function(e) {
this.isPanel(e) && e._tab && e._tab.destroy(), this.inherited(arguments);
},
layoutKindChanged: function() {
this.layout || (this.layout = enyo.createFromKind("FittableRowsLayout", this)), this.$.client.setLayoutKind(this.layoutKind);
},
indexChanged: function() {
this.$.client.layout && this.$.client.setIndex(this.index), this.index = this.$.client.getIndex();
},
tabActivate: function(e, t) {
if (this.hasNode() && t.originator.active) {
var n = t.originator.indexInContainer();
this.getIndex() != n && this.setIndex(n);
}
},
clientTransitionStart: function(e, t) {
var n = t.toIndex, r = this.$.tabs.getClientControls()[n];
if (r && r.hasNode()) {
this.$.tabs.setActive(r);
var i = r.node, s = i.offsetLeft, o = s + i.offsetWidth, u = this.$.scroller.getScrollBounds();
(o < u.left || o > u.left + u.clientWidth) && this.$.scroller.scrollToControl(r);
}
return !0;
},
startTransition: enyo.nop,
finishTransition: enyo.nop,
stepTransition: enyo.nop,
refresh: enyo.nop
});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable",
create: function() {
enyo.platform.firefoxOS && (this.handlers.ondown = "down", this.handlers.onleave = "leave"), this.inherited(arguments);
},
down: function(e, t) {
this.addClass("pressed");
},
leave: function(e, t) {
this.removeClass("pressed");
}
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
create: function() {
enyo.platform.firefoxOS && (this.handlers.ondown = "down", this.handlers.onleave = "leave"), this.inherited(arguments);
},
down: function(e, t) {
this.addClass("pressed");
},
leave: function(e, t) {
this.removeClass("pressed");
},
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
onclick: ""
},
tap: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !this.disabled;
},
dragstart: function() {}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v",
animated: !0
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.animatedChanged(), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
animatedChanged: function() {
!this.animated && this.hasNode() && this.$.animator.isAnimating() && (this.$.animator.stop(), this.animatorEnd());
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.animated ? this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
}) : this.animatorEnd();
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
this.$.client.domCssText = enyo.Control.domStylesToCssText(this.$.client.domStyles);
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left", r = this.$.client.hasNode();
r && (r.style[n] = this.$.client.domStyles[n] = null), this.node && (this.node.style[t] = this.domStyles[t] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling && this.createComponents(this.childComponents, {
isChrome: !0
}), this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling && this.getScroller().setMaxHeight(this.maxHeight + "px");
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling && this.getScroller().setShowing(this.showing), this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop && this.getScroller().setMaxHeight(this.maxHeight + "px"), this.removeClass("onyx-menu-up"), this.floating || this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: r - e.width
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
events: {
onSelect: "",
onItemContentChange: ""
},
classes: "onyx-menu-item",
tag: "div",
create: function() {
this.inherited(arguments), this.active && this.bubble("onActivate");
},
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
},
contentChanged: function(e) {
this.inherited(arguments), this.doItemContentChange({
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
t.content !== undefined && this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
handlers: {
onItemContentChange: "itemContentChange"
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
itemContentChange: function(e, t) {
t.originator == this.selected && this.doChange({
selected: this.selected,
content: this.selected.content
});
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
noSelect: !0,
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments), this.$.flyweight.$.client.children[0].setActive(!0);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e != null && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e));
var t;
this.selected != null && (this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected"), t = this.$.flyweight.fetchRowNode(this.selected)), this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// DatePicker.js

enyo.kind({
name: "onyx.DatePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: "en_us",
dayHidden: !1,
monthHidden: !1,
yearHidden: !1,
minYear: 1900,
maxYear: 2099,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments), enyo.g11n && (this.locale = enyo.g11n.currentLocale().getLocale()), this.initDefaults();
},
initDefaults: function() {
var e = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
enyo.g11n && (this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getMonthFields()), this.setupPickers(this._tf ? this._tf.getDateFieldOrder() : "mdy"), this.dayHiddenChanged(), this.monthHiddenChanged(), this.yearHiddenChanged();
var t = this.value = this.value || new Date;
for (var n = 0, r; r = e[n]; n++) this.$.monthPicker.createComponent({
content: r,
value: n,
active: n == t.getMonth()
});
var i = t.getFullYear();
this.$.yearPicker.setSelected(i - this.minYear);
for (n = 1; n <= this.monthLength(t.getYear(), t.getMonth()); n++) this.$.dayPicker.createComponent({
content: n,
value: n,
active: n == t.getDate()
});
},
monthLength: function(e, t) {
return 32 - (new Date(e, t, 32)).getDate();
},
setupYear: function(e, t) {
this.$.year.setContent(this.minYear + t.index);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "d":
this.createDay();
break;
case "m":
this.createMonth();
break;
case "y":
this.createYear();
break;
default:
}
}
},
createYear: function() {
var e = this.maxYear - this.minYear;
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateYear",
components: [ {
classes: "onyx-datepicker-year",
name: "yearPickerButton",
disabled: this.disabled
}, {
name: "yearPicker",
kind: "onyx.FlyweightPicker",
count: ++e,
onSetupItem: "setupYear",
components: [ {
name: "year"
} ]
} ]
});
},
createMonth: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMonth",
components: [ {
classes: "onyx-datepicker-month",
name: "monthPickerButton",
disabled: this.disabled
}, {
name: "monthPicker",
kind: "onyx.Picker"
} ]
});
},
createDay: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateDay",
components: [ {
classes: "onyx-datepicker-day",
name: "dayPickerButton",
disabled: this.disabled
}, {
name: "dayPicker",
kind: "onyx.Picker"
} ]
});
},
localeChanged: function() {
this.refresh();
},
dayHiddenChanged: function() {
this.$.dayPicker.getParent().setShowing(this.dayHidden ? !1 : !0);
},
monthHiddenChanged: function() {
this.$.monthPicker.getParent().setShowing(this.monthHidden ? !1 : !0);
},
yearHiddenChanged: function() {
this.$.yearPicker.getParent().setShowing(this.yearHidden ? !1 : !0);
},
minYearChanged: function() {
this.refresh();
},
maxYearChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
disabledChanged: function() {
this.$.yearPickerButton.setDisabled(this.disabled), this.$.monthPickerButton.setDisabled(this.disabled), this.$.dayPickerButton.setDisabled(this.disabled);
},
updateDay: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), this.value.getMonth(), t.selected.value);
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateMonth: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), t.selected.value, this.value.getDate());
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateYear: function(e, t) {
if (t.originator.selected != -1) {
var n = this.calcDate(this.minYear + t.originator.selected, this.value.getMonth(), this.value.getDate());
this.doSelect({
name: this.name,
value: n
}), this.setValue(n);
}
return !0;
},
calcDate: function(e, t, n) {
return new Date(e, t, n, this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// TimePicker.js

enyo.kind({
name: "onyx.TimePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: "en_us",
is24HrMode: null,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments), enyo.g11n && (this.locale = enyo.g11n.currentLocale().getLocale()), this.initDefaults();
},
initDefaults: function() {
var e = "AM", t = "PM";
this.is24HrMode == null && (this.is24HrMode = !1), enyo.g11n && (this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getAmCaption(), t = this._tf.getPmCaption(), this.is24HrMode == null && (this.is24HrMode = !this._tf.isAmPm())), this.setupPickers(this._tf ? this._tf.getTimeFieldOrder() : "hma");
var n = this.value = this.value || new Date, r;
if (!this.is24HrMode) {
var i = n.getHours();
i = i === 0 ? 12 : i;
for (r = 1; r <= 12; r++) this.$.hourPicker.createComponent({
content: r,
value: r,
active: r == (i > 12 ? i % 12 : i)
});
} else for (r = 0; r < 24; r++) this.$.hourPicker.createComponent({
content: r,
value: r,
active: r == n.getHours()
});
for (r = 0; r <= 59; r++) this.$.minutePicker.createComponent({
content: r < 10 ? "0" + r : r,
value: r,
active: r == n.getMinutes()
});
n.getHours() >= 12 ? this.$.ampmPicker.createComponents([ {
content: e
}, {
content: t,
active: !0
} ]) : this.$.ampmPicker.createComponents([ {
content: e,
active: !0
}, {
content: t
} ]), this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "h":
this.createHour();
break;
case "m":
this.createMinute();
break;
case "a":
this.createAmPm();
break;
default:
}
}
},
createHour: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateHour",
components: [ {
classes: "onyx-timepicker-hour",
name: "hourPickerButton",
disabled: this.disabled
}, {
name: "hourPicker",
kind: "onyx.Picker"
} ]
});
},
createMinute: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMinute",
components: [ {
classes: "onyx-timepicker-minute",
name: "minutePickerButton",
disabled: this.disabled
}, {
name: "minutePicker",
kind: "onyx.Picker"
} ]
});
},
createAmPm: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateAmPm",
components: [ {
classes: "onyx-timepicker-ampm",
name: "ampmPickerButton",
disabled: this.disabled
}, {
name: "ampmPicker",
kind: "onyx.Picker"
} ]
});
},
disabledChanged: function() {
this.$.hourPickerButton.setDisabled(this.disabled), this.$.minutePickerButton.setDisabled(this.disabled), this.$.ampmPickerButton.setDisabled(this.disabled);
},
localeChanged: function() {
this.is24HrMode = null, this.refresh();
},
is24HrModeChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
updateHour: function(e, t) {
var n = t.selected.value;
if (!this.is24HrMode) {
var r = this.$.ampmPicker.getParent().controlAtIndex(0).content;
n = n + (n == 12 ? -12 : 0) + (this.isAm(r) ? 0 : 12);
}
return this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateMinute: function(e, t) {
return this.value = this.calcTime(this.value.getHours(), t.selected.value), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateAmPm: function(e, t) {
var n = this.value.getHours();
return this.is24HrMode || (n += n > 11 ? this.isAm(t.content) ? -12 : 0 : this.isAm(t.content) ? 0 : 12), this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
calcTime: function(e, t) {
return new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), e, t, this.value.getSeconds(), this.value.getMilliseconds());
},
isAm: function(e) {
var t, n, r;
try {
t = this._tf.getAmCaption(), n = this._tf.getPmCaption();
} catch (i) {
t = "AM", n = "PM";
}
return e == t ? !0 : !1;
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
defaultKind: "onyx.RadioButton",
highlander: !0
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.updateVisualState();
},
updateVisualState: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value);
},
valueChanged: function() {
this.updateVisualState(), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// ToggleIconButton.js

enyo.kind({
name: "onyx.ToggleIconButton",
kind: "onyx.Icon",
published: {
active: !1,
value: !1
},
events: {
onChange: ""
},
classes: "onyx-icon-button onyx-icon-toggle",
activeChanged: function() {
this.addRemoveClass("active", this.value), this.bubble("onActivate");
},
updateValue: function(e) {
this.disabled || (this.setValue(e), this.doChange({
value: this.value
}));
},
tap: function() {
this.updateValue(!this.value);
},
valueChanged: function() {
this.setActive(this.value);
},
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active);
},
rendered: function() {
this.inherited(arguments), this.valueChanged(), this.removeClass("onyx-icon");
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0,
increment: 0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
calcIncrement: function(e) {
return Math.round(e / this.increment) * this.increment;
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), enyo.platform.firefoxOS && (this.moreComponents[2].ondown = "down", this.moreComponents[2].onleave = "leave"), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return n = this.increment ? this.calcIncrement(n) : n, this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return n = this.increment ? this.calcIncrement(n) : n, this.tapped = !0, this.animateTo(n), !0;
}
},
down: function(e, t) {
this.addClass("pressed");
},
leave: function(e, t) {
this.removeClass("pressed");
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// RangeSlider.js

enyo.kind({
name: "onyx.RangeSlider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
rangeMin: 0,
rangeMax: 100,
rangeStart: 0,
rangeEnd: 100,
beginValue: 0,
endValue: 0
},
events: {
onChange: "",
onChanging: ""
},
showStripes: !1,
showLabels: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
ondown: "down"
},
moreComponents: [ {
name: "startKnob",
classes: "onyx-slider-knob"
}, {
name: "endKnob",
classes: "onyx-slider-knob onyx-range-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.initControls();
},
rendered: function() {
this.inherited(arguments);
var e = this.calcPercent(this.beginValue);
this.updateBarPosition(e);
},
initControls: function() {
this.$.bar.applyStyle("position", "relative"), this.refreshRangeSlider(), this.showLabels && (this.$.startKnob.createComponent({
name: "startLabel",
kind: "onyx.RangeSliderKnobLabel"
}), this.$.endKnob.createComponent({
name: "endLabel",
kind: "onyx.RangeSliderKnobLabel"
}));
},
refreshRangeSlider: function() {
this.beginValue = this.calcKnobPercent(this.rangeStart), this.endValue = this.calcKnobPercent(this.rangeEnd), this.beginValueChanged(), this.endValueChanged();
},
calcKnobRatio: function(e) {
return (e - this.rangeMin) / (this.rangeMax - this.rangeMin);
},
calcKnobPercent: function(e) {
return this.calcKnobRatio(e) * 100;
},
beginValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.beginValue);
this.updateKnobPosition(t, this.$.startKnob);
}
},
endValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.endValue);
this.updateKnobPosition(t, this.$.endKnob);
}
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
updateKnobPosition: function(e, t) {
t.applyStyle("left", e + "%"), this.updateBarPosition();
},
updateBarPosition: function() {
if (this.$.startKnob !== undefined && this.$.endKnob !== undefined) {
var e = this.calcKnobPercent(this.rangeStart), t = this.calcKnobPercent(this.rangeEnd) - e;
this.$.bar.applyStyle("left", e + "%"), this.$.bar.applyStyle("width", t + "%");
}
},
calcRangeRatio: function(e) {
return e / 100 * (this.rangeMax - this.rangeMin) + this.rangeMin - this.increment / 2;
},
swapZIndex: function(e) {
e === "startKnob" ? (this.$.startKnob.applyStyle("z-index", 1), this.$.endKnob.applyStyle("z-index", 0)) : e === "endKnob" && (this.$.startKnob.applyStyle("z-index", 0), this.$.endKnob.applyStyle("z-index", 1));
},
down: function(e, t) {
this.swapZIndex(e.name);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t), r, i, s;
if (e.name === "startKnob" && n >= 0) {
if (!(n <= this.endValue && t.xDirection === -1 || n <= this.endValue)) return this.drag(this.$.endKnob, t);
this.setBeginValue(n), r = this.calcRangeRatio(this.beginValue), i = this.increment ? this.calcIncrement(r + .5 * this.increment) : r, s = this.calcKnobPercent(i), this.updateKnobPosition(s, this.$.startKnob), this.setRangeStart(i), this.doChanging({
value: i
});
} else if (e.name === "endKnob" && n <= 100) {
if (!(n >= this.beginValue && t.xDirection === 1 || n >= this.beginValue)) return this.drag(this.$.startKnob, t);
this.setEndValue(n), r = this.calcRangeRatio(this.endValue), i = this.increment ? this.calcIncrement(r + .5 * this.increment) : r, s = this.calcKnobPercent(i), this.updateKnobPosition(s, this.$.endKnob), this.setRangeEnd(i), this.doChanging({
value: i
});
}
return !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, t.preventTap();
var n;
return e.name === "startKnob" ? (n = this.calcRangeRatio(this.beginValue), this.doChange({
value: n,
startChanged: !0
})) : e.name === "endKnob" && (n = this.calcRangeRatio(this.endValue), this.doChange({
value: n,
startChanged: !1
})), !0;
},
rangeMinChanged: function() {
this.refreshRangeSlider();
},
rangeMaxChanged: function() {
this.refreshRangeSlider();
},
rangeStartChanged: function() {
this.refreshRangeSlider();
},
rangeEndChanged: function() {
this.refreshRangeSlider();
},
setStartLabel: function(e) {
this.$.startKnob.waterfallDown("onSetLabel", e);
},
setEndLabel: function(e) {
this.$.endKnob.waterfallDown("onSetLabel", e);
}
}), enyo.kind({
name: "onyx.RangeSliderKnobLabel",
classes: "onyx-range-slider-label",
handlers: {
onSetLabel: "setLabel"
},
setLabel: function(e, t) {
this.setContent(t);
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", !0, t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", !1, t);
},
statics: {
addRemoveFlyweightClass: function(e, t, n, r, i) {
var s = r.flyweight;
if (s) {
var o = i !== undefined ? i : r.index;
s.performOnRow(o, function() {
e.addRemoveClass(t, n);
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
noStretch: !0,
fit: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu"
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e, null);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex !== undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex === undefined && (c.toolbarIndex = t);
}
}
});

// IntegerPicker.js

enyo.kind({
name: "onyx.IntegerPicker",
kind: "onyx.Picker",
published: {
value: 0,
min: 0,
max: 9
},
create: function() {
this.inherited(arguments), this.rangeChanged();
},
minChanged: function() {
this.destroyClientControls(), this.rangeChanged(), this.render();
},
maxChanged: function() {
this.destroyClientControls(), this.rangeChanged(), this.render();
},
rangeChanged: function() {
for (var e = this.min; e <= this.max; e++) this.createComponent({
content: e,
active: e === this.value ? !0 : !1
});
},
valueChanged: function(e) {
var t = this.getClientControls(), n = t.length;
this.value = this.value >= this.min && this.value <= this.max ? this.value : this.min;
for (var r = 0; r < n; r++) if (this.value === parseInt(t[r].content)) {
this.setSelected(t[r]);
break;
}
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
})), this.value = parseInt(this.selected.content);
}
});

// ContextualPopup.js

enyo.kind({
name: "onyx.ContextualPopup",
kind: "enyo.Popup",
modal: !0,
autoDismiss: !0,
floating: !1,
classes: "onyx-contextual-popup enyo-unselectable",
published: {
maxHeight: 100,
scrolling: !0,
title: undefined,
actionButtons: []
},
vertFlushMargin: 60,
horizFlushMargin: 50,
widePopup: 200,
longPopup: 200,
horizBuffer: 16,
events: {
onTap: ""
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestShow",
onRequestHideMenu: "requestHide"
},
components: [ {
name: "title",
classes: "onyx-contextual-popup-title"
}, {
classes: "onyx-contextual-popup-scroller",
components: [ {
name: "client",
kind: "enyo.Scroller",
vertical: "auto",
classes: "enyo-unselectable",
thumb: !1,
strategyKind: "TouchScrollStrategy"
} ]
}, {
name: "actionButtons",
classes: "onyx-contextual-popup-action-buttons"
} ],
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged(), this.titleChanged(), this.actionButtonsChanged();
},
getScroller: function() {
return this.$[this.scrollerName];
},
titleChanged: function() {
this.$.title.setContent(this.title);
},
actionButtonsChanged: function() {
for (var e = 0; e < this.actionButtons.length; e++) this.$.actionButtons.createComponent({
kind: "onyx.Button",
content: this.actionButtons[e].content,
classes: this.actionButtons[e].classes + " onyx-contextual-popup-action-button",
name: this.actionButtons[e].name ? this.actionButtons[e].name : "ActionButton" + e,
index: e,
tap: enyo.bind(this, this.tapHandler)
});
},
tapHandler: function(e, t) {
return t.actionButton = !0, t.popup = this, this.bubble("ontap", t), !0;
},
maxHeightChanged: function() {
this.scrolling && this.getScroller().setMaxHeight(this.maxHeight + "px");
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling && this.getScroller().setShowing(this.showing), this.adjustPosition();
},
requestShow: function(e, t) {
var n = t.activator.hasNode();
return n && (this.activatorOffset = this.getPageOffset(n)), this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = this.getBoundingRect(e), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.resetPositioning();
var e = this.getViewWidth(), t = this.getViewHeight(), n = this.vertFlushMargin, r = t - this.vertFlushMargin, i = this.horizFlushMargin, s = e - this.horizFlushMargin;
if (this.activatorOffset.top + this.activatorOffset.height < n || this.activatorOffset.top > r) {
if (this.applyVerticalFlushPositioning(i, s)) return;
if (this.applyHorizontalFlushPositioning(i, s)) return;
if (this.applyVerticalPositioning()) return;
} else if (this.activatorOffset.left + this.activatorOffset.width < i || this.activatorOffset.left > s) if (this.applyHorizontalPositioning()) return;
var o = this.getBoundingRect(this.node);
if (o.width > this.widePopup) {
if (this.applyVerticalPositioning()) return;
} else if (o.height > this.longPopup && this.applyHorizontalPositioning()) return;
if (this.applyVerticalPositioning()) return;
if (this.applyHorizontalPositioning()) return;
}
},
initVerticalPositioning: function() {
this.resetPositioning(), this.addClass("vertical");
var e = this.getBoundingRect(this.node), t = this.getViewHeight();
return this.floating ? this.activatorOffset.top < t / 2 ? (this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height,
bottom: "auto"
}), this.addClass("below")) : (this.applyPosition({
top: this.activatorOffset.top - e.height,
bottom: "auto"
}), this.addClass("above")) : e.top + e.height > t && t - e.bottom < e.top - e.height ? this.addClass("above") : this.addClass("below"), e = this.getBoundingRect(this.node), e.top + e.height > t || e.top < 0 ? !1 : !0;
},
applyVerticalPositioning: function() {
if (!this.initVerticalPositioning()) return !1;
var e = this.getBoundingRect(this.node), t = this.getViewWidth();
if (this.floating) {
var n = this.activatorOffset.left + this.activatorOffset.width / 2 - e.width / 2;
n + e.width > t ? (this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width - e.width
}), this.addClass("left")) : n < 0 ? (this.applyPosition({
left: this.activatorOffset.left
}), this.addClass("right")) : this.applyPosition({
left: n
});
} else {
var r = this.activatorOffset.left + this.activatorOffset.width / 2 - e.left - e.width / 2;
e.right + r > t ? (this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width - e.right
}), this.addRemoveClass("left", !0)) : e.left + r < 0 ? this.addRemoveClass("right", !0) : this.applyPosition({
left: r
});
}
return !0;
},
applyVerticalFlushPositioning: function(e, t) {
if (!this.initVerticalPositioning()) return !1;
var n = this.getBoundingRect(this.node), r = this.getViewWidth();
return this.activatorOffset.left + this.activatorOffset.width / 2 < e ? (this.activatorOffset.left + this.activatorOffset.width / 2 < this.horizBuffer ? this.applyPosition({
left: this.horizBuffer + (this.floating ? 0 : -n.left)
}) : this.applyPosition({
left: this.activatorOffset.width / 2 + (this.floating ? this.activatorOffset.left : 0)
}), this.addClass("right"), this.addClass("corner"), !0) : this.activatorOffset.left + this.activatorOffset.width / 2 > t ? (this.activatorOffset.left + this.activatorOffset.width / 2 > r - this.horizBuffer ? this.applyPosition({
left: r - this.horizBuffer - n.right
}) : this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width / 2 - n.right
}), this.addClass("left"), this.addClass("corner"), !0) : !1;
},
initHorizontalPositioning: function() {
this.resetPositioning();
var e = this.getBoundingRect(this.node), t = this.getViewWidth();
return this.floating ? this.activatorOffset.left + this.activatorOffset.width < t / 2 ? (this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width
}), this.addRemoveClass("left", !0)) : (this.applyPosition({
left: this.activatorOffset.left - e.width
}), this.addRemoveClass("right", !0)) : this.activatorOffset.left - e.width > 0 ? (this.applyPosition({
left: this.activatorOffset.left - e.left - e.width
}), this.addRemoveClass("right", !0)) : (this.applyPosition({
left: this.activatorOffset.width
}), this.addRemoveClass("left", !0)), this.addRemoveClass("horizontal", !0), e = this.getBoundingRect(this.node), e.left < 0 || e.left + e.width > t ? !1 : !0;
},
applyHorizontalPositioning: function() {
if (!this.initHorizontalPositioning()) return !1;
var e = this.getBoundingRect(this.node), t = this.getViewHeight(), n = this.activatorOffset.top + this.activatorOffset.height / 2;
return this.floating ? n >= t / 2 - .05 * t && n <= t / 2 + .05 * t ? this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height / 2 - e.height / 2,
bottom: "auto"
}) : this.activatorOffset.top + this.activatorOffset.height < t / 2 ? (this.applyPosition({
top: this.activatorOffset.top - this.activatorOffset.height,
bottom: "auto"
}), this.addRemoveClass("high", !0)) : (this.applyPosition({
top: this.activatorOffset.top - e.height + this.activatorOffset.height * 2,
bottom: "auto"
}), this.addRemoveClass("low", !0)) : n >= t / 2 - .05 * t && n <= t / 2 + .05 * t ? this.applyPosition({
top: (this.activatorOffset.height - e.height) / 2
}) : this.activatorOffset.top + this.activatorOffset.height < t / 2 ? (this.applyPosition({
top: -this.activatorOffset.height
}), this.addRemoveClass("high", !0)) : (this.applyPosition({
top: e.top - e.height - this.activatorOffset.top + this.activatorOffset.height
}), this.addRemoveClass("low", !0)), !0;
},
applyHorizontalFlushPositioning: function(e, t) {
if (!this.initHorizontalPositioning()) return !1;
var n = this.getBoundingRect(this.node), r = this.getViewWidth();
return this.floating ? this.activatorOffset.top < innerHeight / 2 ? (this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height / 2
}), this.addRemoveClass("high", !0)) : (this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height / 2 - n.height
}), this.addRemoveClass("low", !0)) : n.top + n.height > innerHeight && innerHeight - n.bottom < n.top - n.height ? (this.applyPosition({
top: n.top - n.height - this.activatorOffset.top - this.activatorOffset.height / 2
}), this.addRemoveClass("low", !0)) : (this.applyPosition({
top: this.activatorOffset.height / 2
}), this.addRemoveClass("high", !0)), this.activatorOffset.left + this.activatorOffset.width < e ? (this.addClass("left"), this.addClass("corner"), !0) : this.activatorOffset.left > t ? (this.addClass("right"), this.addClass("corner"), !0) : !1;
},
getBoundingRect: function(e) {
var t = e.getBoundingClientRect();
return !t.width || !t.height ? {
left: t.left,
right: t.right,
top: t.top,
bottom: t.bottom,
width: t.right - t.left,
height: t.bottom - t.top
} : t;
},
getViewHeight: function() {
return window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight;
},
getViewWidth: function() {
return window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
},
resetPositioning: function() {
this.removeClass("right"), this.removeClass("left"), this.removeClass("high"), this.removeClass("low"), this.removeClass("corner"), this.removeClass("below"), this.removeClass("above"), this.removeClass("vertical"), this.removeClass("horizontal"), this.applyPosition({
left: "auto"
}), this.applyPosition({
top: "auto"
});
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// loc/en_US.js

var loc = {
img: {
avatar: "assets/images/avatar.jpg"
},
next: "Next",
save: "Save",
edit: "Edit",
done: "Done",
test: "Test",
CallFlow: {
blockCallers: "Block Callers",
answeringRules: "Answering Rules",
answeringRulesDesc: "System behavior based on time of the day and day of the week.",
greetTheCaller: "Greet the Caller",
greetTheCallerDesc: "First thing that callers will hear after system picks up incoming call.",
greetTheCallerHint: "Thank you for calling Vlad Vendrow",
screenTheCaller: "Screen the Caller",
screenTheCallerDesc: "Ask callers to say their name before connecting.",
screenTheCallerHint: "Please say who is calling",
connecting: "Connecting",
connectingDesc: "Callers will hear a message that they are being connected to your extension.",
connectingHint: "Please hold while I try to connect you",
playing: "Playing",
playingDesc: "What users will hear while call comes through.",
playingHint: "Easy listening",
ringSoftphones: "Ring My Softphones:",
ringSoftphonesDesc: "As call comes through you will receive real time notification on your desktop client and mobile device.",
delay: "Delay:",
delayDesc: "Phone system will wait 5 rings before continue routing incoming call.",
ringMyPhones: "Ring My Phones",
ringMyPhonesDesc: "Define in what order and which of your phones will ring when call comes in.",
voicemail: "Voicemail",
voicemailDesc: "You can listen to your voicemail on service site or your mobile device at any time.",
voicemailHint: "Your call has been forwarded to the voicemail for Vlad Vendrow",
notifications: "Notifications",
notificationsDesc: "You will be notified about new events by selected method.",
sendViaEmail: "Send via email:",
sendViaText: "Send via Text:",
addAfterHours: "Add After Hours",
addCustomRule: "Add Custom Rule",
showActive: "Show",
showAll: "Edit"
},
UserInfoPanel: {
numbers: "Numbers",
phonesAndPresence: "Phones & Presence",
callerId: "Caller ID",
musicOnHold: "Music On Hold"
},
CallerId: {
caption: "Caller ID"
},
GreetCaller: {
caption: "Greet the Caller",
description: "First thing that callers will hear after system picks up incoming call.",
custom: "Custom",
off: "Off",
"default": "Default",
setDefault: "Set Default",
setCustom: "Set Custom",
listenGreeting: "Listen Greeting",
defaultHint: "Thank you for calling Vlad Vendrow",
overPhone: "Record Over the Phone",
overPhoneDescription: "RingCentral will call you to record your custom greeting over the phone.",
overMicrophone: "Record Using Device Microphone",
"import": "Import",
callMe: "Call me",
inputPlaceholder: "Enter a new number",
callMeNow: "Call Me Now"
},
UnderConstruction: {
caption: "Under Construction",
placeholder: "This page is under construction"
},
UserSettings: {
caption: "User Settings"
},
AddRule: {
caption: "Add Custom Rule",
placeholder: "This page is a placeholder for add custom rule wizard.",
hint: "To finish the wizard \u2014 tap \u201cSave\u201d at the top."
},
RingPhones: {
caption: "Ring My Phones"
}
};

// Observable.js

enyo.kind({
name: "rc.Observable",
kind: enyo.Object,
handlers: null,
constructor: function() {
this.reset();
},
on: function(e, t, n) {
var r = this.handlers, i = t.bind(n || null);
return r[e] ? r[e].push(i) : r[e] = [ i ], {
remove: function() {
var t = r[e].indexOf(i);
delete r[e][t];
}
};
},
trigger: function(e) {
var t = this.handlers[e], n = Array.prototype.slice.call(arguments, 1);
t && t.forEach(function(e) {
e.apply(this, n);
}, this);
},
reset: function() {
this.handlers = {};
}
});

// Model.js

enyo.kind({
name: "rc.Model",
kind: "rc.Observable",
attr: null,
changed: null,
defaults: null,
initAttrs: null,
handlers: null,
constructor: function(e, t) {
this.changed = {}, this.handlers = {}, this.defaults = enyo.mixin(t && t.defaults || {}, this.defaults), this.attr = enyo.mixin(enyo.mixin({}, this.defaults), e || {}), this.initAttrs = enyo.mixin({}, this.attr), this.inherited(arguments);
},
set: function(e, t, n) {
if (arguments.length == 1 && arguments[0] instanceof Object) {
var r = arguments[0];
Object.keys(r).forEach(function(e) {
this.setValue(e, r[e], n);
}, this);
} else {
if (arguments.length != 2) throw new TypeError("Arguments does not match function signature");
this.setValue.apply(this, arguments);
}
},
setValue: function(e, t, n) {
this.attr[e] !== t && (this.changed[e] = !0, this.attr[e] = t, (!n || !n.silent) && this.trigger(e, t));
},
get: function(e) {
if (typeof e == "string") return this.attr[e];
var t, n = {};
for (t in e) e.hasOwnProperty(t) && (n[t] = this.attr[t]);
return n;
},
reset: function(e) {
this.attr = enyo.mixin(this.initAttrs), this.changed = {}, (!e || e.silent !== !0) && this.trigger("reset", this);
},
isChanged: function(e) {
return e ? this.changed[e] === !0 : Object.keys(this.changed).some(this.isChanged, this);
}
});

// Collection.js

enyo.kind({
name: "rc.Collection",
kind: "rc.Observable",
models: null,
model: null,
idField: null,
constructor: function(e) {
this.models = [], this.model = this.model || e.model || rc.Model, this.idField = e.idField, this.inherited(arguments), this.add(e.models || [], {
silent: !0
});
},
add: function(e, t) {
e instanceof Array ? e.forEach(function(e) {
this.addModel(e, t);
}, this) : this.addModel(e, t);
},
addModel: function(e, t) {
var n = e instanceof this.model ? e : new this.model(e);
this.models.push(n), (!t || t.silent !== !0) && this.trigger("add", n);
},
remove: function(e, t) {
e instanceof Array ? e.forEach(function(e) {
this.removeModel(e, t);
}, this) : this.removeModel();
},
removeModel: function(e, t) {
this.models.some(function(n, r) {
if (e === n) return this.removeByIndex(r, t), !0;
}, this);
},
removeById: function(e, t) {
var n = this.id;
this.models.some(function(r, i) {
if (r.get(n) === e) return this.removeByIndex(i, t), !0;
}, this);
},
removeByIndex: function(e, t) {
delete this.models[e], (!t || t.silent !== !0) && this.trigger("remove", this);
},
getItems: function() {
return this.models;
},
forEach: function() {
return this.models.forEach.apply(this.models, arguments);
},
every: function() {
return this.models.every.apply(this.models, arguments);
},
some: function() {
return this.models.some.apply(this.models, arguments);
},
filter: function() {
return this.models.every.apply(this.models, arguments);
},
map: function() {
return this.models.map.apply(this.models, arguments);
}
});

// RuleModel.js

enyo.kind({
name: "rc.data.RuleModel",
kind: "rc.Model",
defaults: {
greetCaller: !0,
greetCallerActive: !0,
greetCallerType: "default",
screenCaller: !0,
screenCallerActive: !0,
connecting: !0,
connectingActive: !0,
playing: !0,
playingActive: !0,
ringSoftphones: !0,
ringSoftphonesActive: !0,
delay: !0,
delayActive: !0,
ringPhones: !0,
ringPhonesActive: !0,
voicemail: !0,
voicemailActive: !0,
description: "",
name: ""
},
statics: {
GREET_CALLER_TYPE_DEFAULT: "default",
GREET_CALLER_TYPE_CUSTOM: "custom"
}
});

// RuleCollection.js

enyo.kind({
kind: "rc.Collection",
name: "rc.data.RuleCollection",
model: rc.data.RuleModel,
idField: "id"
});

// ui/NavToolbar.js

enyo.kind({
name: "rc.NavToolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline ui-nav-toolbar",
kind: "FittableColumns",
published: {
showBack: !0,
showNext: !1,
caption: "This Is Caption",
nextButtonCaption: loc.next
},
events: {
onBack: "",
onNext: ""
},
components: [ {
name: "back",
kind: onyx.Button,
content: "Back",
ontap: "backTapped",
classes: "ui-nav-toolbar-button"
}, {
name: "caption",
fit: !0,
classes: "ui-nav-toolbar-caption"
}, {
name: "next",
kind: onyx.Button,
content: "Next",
ontap: "nextTapped",
classes: "ui-nav-toolbar-button"
} ],
backTapped: function() {
this.doBack();
},
nextTapped: function() {
this.doNext();
},
create: function() {
this.inherited(arguments), this.showBackChanged(), this.showNextChanged(), this.captionChanged(), this.nextButtonCaptionChanged();
},
showBackChanged: function() {
this.$.back.setShowing(this.getShowBack());
},
showNextChanged: function() {
this.$.next.setShowing(this.getShowNext());
},
captionChanged: function() {
this.$.caption.setContent(this.getCaption());
},
nextButtonCaptionChanged: function() {
this.$.next.setContent(this.getNextButtonCaption());
}
});

// ui/ColumnsLayout.js

enyo.kind({
name: "rc.ColumnsLayout",
kind: "Layout",
reflow: function() {
var e = this.container.getBounds().width, t = e, n = this.container.children, r = n.length, i = Math.round(e / r);
n.forEach(function(e, n) {
var s = n + 1 == r ? t : i;
t -= s, e.applyStyle("width", s + "px");
});
}
});

// ui/VerticalGroup.js

enyo.kind({
kind: enyo.Control,
name: "rc.VerticalGroup",
classes: "ui-vertical-group",
firstClass: "ui-group-first-child",
middleClass: "ui-group-middle-child",
lastClass: "ui-group-last-child",
create: function() {
this.inherited(arguments), this.render();
},
render: function() {
this.inherited(arguments);
var e = this.children, t = e.length, n = e[t - 1];
if (t === 0) return;
if (t === 1) this.clearClasses(e[0]); else {
this.setComponentClass(e[0], this.firstClass), this.setComponentClass(n, this.lastClass);
for (var r = 1; r < t - 1; r++) this.setComponentClass(e[r], this.middleClass);
}
},
clearClasses: function(e) {
e.removeClass(this.firstClass), e.removeClass(this.middleClass), e.removeClass(this.lastClass);
},
setComponentClass: function(e, t) {
this.clearClasses(e), e.addClass(t);
}
});

// ui/RadioListItem.js

enyo.kind({
kind: "Control",
name: "rc.RadioListItem",
classes: "ui-radio-list-item",
activeClass: "active",
published: {
active: !1,
caption: "",
description: ""
},
components: [ {
name: "caption"
}, {
name: "ruler",
classes: "ui-radio-list-item-ruler"
}, {
name: "description"
} ],
create: function() {
this.inherited(arguments), this.captionChanged(), this.descriptionChanged(), this.activeChanged();
},
captionChanged: function() {
this.$.caption.setContent(this.getCaption());
},
descriptionChanged: function() {
this.$.description.setContent(this.getDescription());
},
activeChanged: function() {
this.getActive() ? this.addClass(this.activeClass) : this.removeClass(this.activeClass);
}
});

// ui/RadioList.js

enyo.kind({
kind: "rc.VerticalGroup",
name: "rc.RadioList",
classes: "ui-radio-list",
published: {
collection: null,
adapter: null,
watchedNames: {
caption: "caption",
description: "description"
}
},
events: {
onActivate: ""
},
handlers: {
ontap: "onItemTap"
},
itemKind: "rc.RadioListItem",
defaultKind: "rc.RadioListItem",
activeChild: null,
create: function() {
this.bindings = [], this.inherited(arguments), this.checkActiveItems();
},
defaultAdapter: function(e) {
return {
caption: e.get("name"),
description: e.get("description")
};
},
collectionChanged: function() {
this.removeBindings(), this.destroyComponents(), this.collection.forEach(this.createComponentByModel, this), this.bindings.push(this.collection.on("add", this.createComponentByModel, this)), this.children.length && this.onItemTap(this.children[0]);
},
createComponentByModel: function(e) {
var t = this.getAdapter() || this.defaultAdapter, n = {
kind: this.itemKind,
ontap: "onItemTap"
}, r = this.getWatchedNames(), i = this.createComponent(n, t.call(this, e));
i.model = e, this.bindings.push(e.on(r.caption, i.setCaption, i)), this.bindings.push(e.on(r.description, i.setDescription, i)), this.render();
},
removeBindings: function() {
while (this.bindings.length) this.bindings.pop().remove();
},
getActiveItem: function() {
return this.activeChild;
},
setActiveItem: function(e) {
this.activeChild && this.activeChild.setActive(!1), e.setActive(!0), this.activeChild = e, this.doActivate(e);
},
onItemTap: function(e) {
e.getActive() || this.setActiveItem(e);
},
checkActiveItems: function() {
this.children.forEach(function(e) {
e.getActive() && this.setActiveItem(e);
}, this);
}
});

// ui/NavButton.js

enyo.kind({
kind: enyo.Control,
name: "rc.NavButton",
classes: "ui-nav-button",
published: {
caption: "",
description: "",
data: ""
},
components: [ {
name: "caption",
classes: "ui-nav-button-caption"
}, {
name: "description",
classes: "ui-nav-button-value",
allowHtml: !0
}, {
classes: "ui-icon-next"
} ],
create: function() {
this.inherited(arguments), this.captionChanged(), this.descriptionChanged();
},
descriptionChanged: function() {
var e = this.getDescription(), t;
e instanceof Array ? t = e.join("<br />") : t = "" + e, this.$.description.setContent(t);
},
captionChanged: function() {
this.$.caption.setContent(this.getCaption());
}
});

// ui/Panels.js

enyo.kind({
name: "rc.Panels",
kind: "Control",
classes: "ui-panels",
published: {
index: 0
},
create: function() {
this.inherited(arguments), this.indexChanged();
},
indexChanged: function() {
var e = this.getIndex();
this.children.forEach(function(t, n) {
t.setShowing(n === e), t.waterfallDown("onresize");
}, this);
},
getActive: function() {
return this.children[this.getIndex()];
}
});

// ui/EditableList.js

enyo.kind({
kind: enyo.Control,
name: "rc.EditableList",
classes: "ui-editable-list",
events: {
onSelect: "",
onAdd: "onAdd",
onInputChange: ""
},
published: {
placeholder: "",
data: [],
itemAdapter: null
},
defaultListItemKind: "rc.NavButton",
components: [ {
kind: "FittableColumns",
components: [ {
kind: "onyx.InputDecorator",
classes: "ui-text-input",
fit: !0,
components: [ {
kind: "onyx.Input",
name: "input",
onchange: "doInputChange"
} ]
}, {
kind: "onyx.Button",
name: "addButton",
classes: "ui-button",
content: "Add",
ontap: "doAdd"
} ]
}, {
kind: "rc.VerticalGroup",
name: "list"
} ],
create: function() {
this.inherited(arguments), this.$.input.setPlaceholder(this.getPlaceholder()), this.dataChanged(this.getData());
},
defaultAdapter: function(e) {
return e;
},
dataChanged: function(e) {
var t = this.$.list, n = this.getItemAdapter() || this.defaultAdapter, r = this;
t.destroyComponents(), e.forEach(function(e) {
var i = n.call(r, e);
t.createComponent({
kind: r.defaultListItemKind,
data: e,
caption: i.caption,
description: i.description
});
}), t.render();
},
doAdd: function() {
this.inherited(arguments);
var e = this.getData();
e.push({
caption: this.$.input.getValue(),
description: ""
}), this.setData(e), this.dataChanged(e), this.$.input.setValue("");
}
});

// ui/ToggleButton.js

enyo.kind({
kind: "FittableColumns",
name: "rc.ToggleButton",
classes: "ui-toggle-button",
published: {
caption: "",
value: !1
},
components: [ {
name: "caption",
fit: !0
}, {
kind: "onyx.ToggleButton",
name: "toggle",
onChange: "toggleChanged",
classes: "ui-toggle-button-value"
} ],
create: function() {
this.inherited(arguments), this.valueChanged(), this.captionChanged();
},
captionChanged: function() {
this.$.caption.setContent(this.getCaption());
},
valueChanged: function() {
this.$.toggle.setValue(this.getValue());
}
});

// ui/Notifications.js

enyo.kind({
kind: "enyo.Control",
name: "rc.Notifications",
classes: "ui-notifications",
published: {
email: "",
phone: ""
},
components: [ {
classes: "ui-notification-header",
components: [ {
classes: "ui-notification-header-left",
components: [ {
classes: "ui-notification-caption",
content: loc.CallFlow.notifications
}, {
classes: "ui-notification-description",
content: loc.CallFlow.notificationsDesc
} ]
}, {
classes: "ui-notification-header-right"
} ]
}, {
name: "emailContainer",
classes: "ui-notification-send-via",
components: [ {
content: loc.CallFlow.sendViaEmail
}, {
name: "email"
} ]
}, {
name: "phoneContainer",
classes: "ui-notification-send-via",
components: [ {
content: loc.CallFlow.sendViaText
}, {
name: "phone"
} ]
}, {
classes: "ui-notifications-arrow",
content: ">"
} ],
create: function() {
this.inherited(arguments), this.emailChanged(), this.phoneChanged();
},
emailChanged: function() {
this.$.email.setContent(this.getEmail());
},
phoneChanged: function() {
this.$.phone.setContent(this.getPhone());
}
});

// ui/PhonesContainer.js

enyo.kind({
name: "rc.PhonesContainer",
kind: "Control",
classes: "ui-phone-container",
components: [ {
classes: "ui-phone-container-block",
components: [ {
classes: "ui-phone-container-block-left",
components: [ {
classes: "ui-phone-container-block-left-item",
components: [ {
classes: "ui-phone-container-block-left-item-img mobile"
}, {
classes: "ui-phone-container-block-left-item-caption",
content: "Office phone (Ext. 101)"
}, {
classes: "ui-phone-container-block-left-item-number",
content: "(452) 345-6345"
} ]
} ]
}, {
classes: "ui-phone-container-block-right",
components: [ {
content: "4"
}, {
content: "rings"
} ]
} ]
}, {
classes: "ui-phone-container-block",
components: [ {
classes: "ui-phone-container-block-left",
components: [ {
classes: "ui-phone-container-block-left-item",
components: [ {
classes: "ui-phone-container-block-left-item-img mobile"
}, {
classes: "ui-phone-container-block-left-item-caption",
content: "Mobile"
}, {
classes: "ui-phone-container-block-left-item-number",
content: "(674) 345-4572"
} ]
}, {
classes: "ui-phone-container-block-left-item inactive",
components: [ {
classes: "ui-phone-container-block-left-item-img home"
}, {
classes: "ui-phone-container-block-left-item-caption",
content: "Home"
}, {
classes: "ui-phone-container-block-left-item-number",
content: "(345) 433-3435"
} ]
} ]
}, {
classes: "ui-phone-container-block-right",
components: [ {
content: "5"
}, {
content: "rings"
} ]
} ]
}, {
classes: "ui-phone-container-block",
components: [ {
classes: "ui-phone-container-block-left",
components: [ {
classes: "ui-phone-container-block-left-item inactive",
components: [ {
classes: "ui-phone-container-block-left-item-img mobile"
}, {
classes: "ui-phone-container-block-left-item-caption",
content: "Cisco SPA-5"
}, {
classes: "ui-phone-container-block-left-item-number",
content: "(674) 345-4572"
} ]
} ]
}, {
classes: "ui-phone-container-block-right",
components: [ {
content: "4"
}, {
content: "rings"
} ]
} ]
} ]
});

// ui/UserInfo.js

enyo.kind({
kind: "Control",
name: "rc.UserInfo",
classes: "ui-user-info",
published: {
avatarUrl: "",
data: null
},
components: [ {
classes: "ui-user-info-left",
components: [ {
name: "avatar",
tag: "img",
content: ""
} ]
}, {
classes: "ui-user-info-right",
components: [ {
name: "name",
classes: "ui-user-info-name"
}, {
name: "extension",
classes: "ui-user-info-extension"
}, {
name: "company",
classes: "ui-user-info-company"
}, {
name: "post",
classes: "ui-user-info-post"
}, {
name: "email",
classes: "ui-user-info-email"
} ]
}, {
classes: "ui-icon-next"
} ],
create: function() {
this.inherited(arguments), this.avatarUrlChanged(), this.dataChanged();
},
avatarUrlChanged: function() {
var e = this.getAvatarUrl();
e ? this.$.avatar.setAttribute("src", e) : this.$.avatar.hide();
},
dataChanged: function() {
var e = this.getData(), t;
e ? t = e : t = {
name: "ololo",
extension: "ololo",
company: "ololo",
post: "ololo",
email: "ololo"
}, this.$.name.setContent(t.name), this.$.extension.setContent(t.extension), this.$.company.setContent(t.company), this.$.post.setContent(t.post), this.$.email.setContent(t.email);
}
});

// ui/UserInfoPanel.js

enyo.kind({
kind: enyo.FittableRows,
name: "rc.UserInfoPanel",
classes: "ui-user-info-panel",
components: [ {
kind: "rc.UserInfo",
ontap: "goToNowhere",
avatarUrl: loc.img.avatar,
data: {
name: "Vlad Vendrow",
extension: "ext. 101",
company: "RingCentral, Inc.",
post: "CTO",
email: "vladv@ringcentral.com"
}
}, {
kind: "rc.NavButton",
ontap: "goToNowhere",
caption: loc.UserInfoPanel.numbers,
description: [ "(650) 472-4080", "(800) 513-1320" ]
}, {
kind: "rc.NavButton",
ontap: "goToNowhere",
caption: loc.UserInfoPanel.phonesAndPresence
}, {
kind: "rc.NavButton",
ontap: "goToCallerId",
caption: loc.UserInfoPanel.callerId,
description: "Vlad Vendrow"
}, {
kind: "rc.NavButton",
ontap: "goToNowhere",
caption: loc.UserInfoPanel.musicOnHold
} ],
goToNowhere: function() {
App.goToNowhere();
},
goToCallerId: function() {
App.goTo("CallerId");
}
});

// ui/CallFlowItem.js

enyo.kind({
kind: "Control",
name: "rc.CallFlowItem",
classes: "ui-call-flow-item",
events: {
onButtonTap: ""
},
published: {
caption: "",
description: "",
value: "",
valueClasses: "",
active: !0,
isFull: !0
},
itemTools: [ {
name: "editButton",
classes: "ui-call-flow-item-edit-button",
ontap: "doButtonTap"
}, {
classes: "ui-call-flow-item-header",
ontap: "headerTap",
components: [ {
classes: "ui-call-flow-item-caption",
components: [ {
name: "caption"
}, {
name: "value"
} ]
}, {
name: "description",
classes: "ui-call-flow-item-description",
allowHtml: !0
} ]
}, {
name: "client"
} ],
create: function() {
this.inherited(arguments), this.captionChanged(), this.descriptionChanged(), this.isFullChanged(), this.activeChanged(), this.valueChanged(), this.valueClassesChanged();
},
activeChanged: function() {
this.getActive() ? (this.removeClass("inactive"), this.$.client.show(), this.$.description.show(), this.$.value.show(), this.$.editButton.show()) : (this.addClass("inactive"), this.$.client.hide(), this.$.description.hide(), this.$.value.hide(), this.$.editButton.hide());
},
initComponents: function() {
this.createChrome(this.itemTools), this.inherited(arguments);
},
captionChanged: function() {
this.$.caption.setContent(this.getCaption());
},
descriptionChanged: function() {
this.$.description.setContent(this.getDescription());
},
isFullChanged: function() {
var e = this.getIsFull();
e ? this.$.description.show() : this.$.description.hide();
},
valueChanged: function() {
this.$.value.setContent(this.getValue());
},
valueClassesChanged: function() {
this.$.value.setClasses(this.getValueClasses());
},
headerTap: function() {
this.getActive() || this.doButtonTap.apply(this, arguments);
}
});

// ui/CallFlow.js

enyo.kind({
name: "rc.CallFlow",
kind: enyo.Control,
classes: "ui-call-flow",
events: {
onBelowTop: "",
onTop: ""
},
handlers: {
onScrollStart: "scrollStart",
onScrollStop: "checkScroll"
},
components: [ {
classes: "ui-call-flow-decorator",
components: [ {
content: "Caller",
classes: "ui-call-flow-header",
components: [ {
classes: "ui-call-flow-header-decorator"
} ]
}, {
name: "items",
classes: "ui-call-flow-items",
components: [ {
name: "blockCallers",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.blockCallers,
valueClasses: "ui-call-flow-block-callers",
onButtonTap: "goToNowhere"
}, {
kind: "rc.CallFlowItem",
name: "answeringRules",
classes: "ui-call-flow-answering-rules",
caption: loc.CallFlow.answeringRules,
description: loc.CallFlow.answeringRulesDesc,
onActivate: "redrawItems",
onButtonTap: "goToNowhere",
components: [ {
name: "rules",
kind: "rc.RadioList",
classes: "compact show-ruler"
}, {
classes: "ui-call-flow-rule-buttons",
controlClasses: "ui-button",
components: [ {
name: "addCustomRule",
kind: "onyx.Button",
ontap: "addCustomRule",
content: loc.CallFlow.addCustomRule
}, {
name: "addAfterHours",
kind: "onyx.Button",
ontap: "addAfterHours",
content: loc.CallFlow.addAfterHours
} ]
} ]
}, {
name: "greetCaller",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.greetTheCaller,
description: loc.CallFlow.greetTheCallerDesc,
onButtonTap: "goToGreetCaller",
components: [ {
classes: "ui-call-flow-greet-the-caller"
} ]
}, {
name: "screenCaller",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.screenTheCaller,
description: loc.CallFlow.screenTheCallerDesc,
onButtonTap: "goToNowhere",
components: [ {
classes: "ui-call-flow-screen-the-caller"
} ]
}, {
name: "connecting",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.connecting,
description: loc.CallFlow.connectingDesc,
onButtonTap: "goToNowhere",
components: [ {
classes: "ui-call-flow-connecting"
} ]
}, {
name: "playing",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.playing,
description: loc.CallFlow.playingDesc,
onButtonTap: "goToNowhere",
components: [ {
classes: "ui-call-flow-playing"
} ]
}, {
name: "ringSoftphones",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.ringSoftphones,
description: loc.CallFlow.ringSoftphonesDesc,
value: "Off",
onButtonTap: "goToNowhere"
}, {
name: "delay",
kind: "rc.CallFlowItem",
onButtonTap: "goToNowhere",
caption: loc.CallFlow.delay,
description: loc.CallFlow.delayDesc,
value: "5 rings"
}, {
name: "ringPhones",
kind: "rc.CallFlowItem",
onButtonTap: "goToRingPhones",
caption: loc.CallFlow.ringMyPhones,
description: loc.CallFlow.ringMyPhonesDesc,
components: [ {
kind: "rc.PhonesContainer"
} ]
}, {
name: "voicemail",
kind: "rc.CallFlowItem",
caption: loc.CallFlow.voicemail,
description: loc.CallFlow.voicemailDesc,
onButtonTap: "goToNowhere",
components: [ {
classes: "ui-call-flow-voicemail"
} ]
} ]
} ]
}, {
kind: "rc.Notifications",
name: "notifications",
email: "vladv@ringcentral.com",
phone: "+1 (345) 545-3567",
ontap: "goToNowhere"
} ],
create: function() {
this.inherited(arguments), this.loadRules(this.renderRules);
},
loadRules: function(e) {
this.rules = new rc.data.RuleCollection({
models: this._createRuleModels()
}), e.call(this, this.rules);
},
_createRuleModels: function() {
return [ {
name: "Work Hours:",
description: "8am - 6pm",
screenCallerActive: !1
} ];
},
renderRules: function(e) {
var t = this.$.rules;
t.setWatchedNames({
caption: "name",
description: "description"
}), t.setAdapter(function(e) {
return {
caption: e.get("name"),
description: e.get("description")
};
}), t.setCollection(e);
},
redrawItems: function() {
this._redrawItems();
},
_redrawItems: function() {
var e = this.$.rules.getActiveItem().model, t = this.$.items.children;
this.lastVisible && this.lastVisible.removeClass("last"), t.forEach(function(t) {
t.setActive(e.get(t.name + "Active") !== !1), t.getShowing() && (this.lastVisible = t);
}, this), this.lastVisible && this.lastVisible.addClass("last");
},
addCustomRule: function() {
App.goTo("AddRule", {
collection: this.rules
});
},
addAfterHours: function(e, t) {
this.rules.add({
name: "After Hours",
description: "6pm - 8am",
greetCaller: !0,
greetCallerActive: !1,
screenCaller: !0,
screenCallerActive: !1,
connecting: !0,
playing: !1,
ringSoftphones: !1,
delay: !1,
ringPhones: !1,
voicemail: !0
}), t.originator.hide(), this.selectLastRule();
},
selectLastRule: function() {
var e = this.$.rules, t = e.children[e.children.length - 1];
this.$.rules.onItemTap(t);
},
goToNowhere: function() {
App.goToNowhere();
},
goToGreetCaller: function() {
App.goTo("GreetCaller", {
model: this.$.rules.getActiveItem().model
});
},
goToRingPhones: function() {
App.goTo("RingPhones", {
model: this.$.rules.getActiveItem().model
});
},
scrollStart: function() {
this.doBelowTop();
},
scrollStop: function() {
this.doTop();
},
pageOpen: function() {
this.selectLastRule();
},
checkScroll: function() {
this.getScrollTop() == 0 && this.doTop();
}
});

// ui/Fax.js

enyo.kind({
name: "rc.Fax",
kind: "FittableRows",
style: "margin-bottom: 20px;",
components: [ {
classes: "ui-header-big",
content: "Cover Page Info",
style: "margin-top: 20px;"
}, {
classes: "ui-message",
content: "This information will be printed on your fax cover page"
}, {
classes: "ui-label",
content: "Company"
}, {
kind: "onyx.InputDecorator",
classes: "ui-text-input ui-block",
components: [ {
kind: "onyx.Input",
value: "RingCentral, Inc.",
onchange: "inputChange"
} ]
}, {
classes: "ui-label",
content: "Phone"
}, {
kind: "onyx.InputDecorator",
classes: "ui-text-input ui-block",
components: [ {
kind: "onyx.Input",
value: "(650) 472-4080",
onchange: "inputChange"
} ]
}, {
classes: "ui-label",
content: "Adress"
}, {
kind: "onyx.InputDecorator",
classes: "ui-text-input ui-block",
components: [ {
kind: "onyx.TextArea",
value: "144 Fashion Island Blvd,\n7th Floor",
onchange: "inputChange"
} ]
}, {
classes: "ui-label",
content: "City"
}, {
kind: "onyx.InputDecorator",
classes: "ui-text-input ui-block",
components: [ {
kind: "onyx.Input",
value: "San Mateo",
onchange: "inputChange"
} ]
}, {
classes: "ui-label",
content: "State/Province"
}, {
kind: "rc.NavButton",
caption: "California",
ontap: "goToNowhere"
}, {
classes: "ui-label",
content: "Zip/Postal Code"
}, {
kind: "onyx.InputDecorator",
classes: "ui-text-input ui-block",
components: [ {
kind: "onyx.Input",
value: "94404",
onchange: "inputChange"
} ]
}, {
classes: "ui-label",
content: "Country"
}, {
kind: "rc.NavButton",
caption: "USA",
ontap: "goToNowhere"
}, {
classes: "ui-header-big",
content: "Faxes Sent via Email",
style: "margin-top: 20px;"
}, {
classes: "ui-message",
content: "To enable sending faxes via email from additional email addresses, enter them here. To send a fax via email, send the fax via faxnumber@rcfax.com."
}, {
kind: "rc.VerticalGroup",
name: "internalCalls",
components: [ {
kind: "rc.ToggleButton",
name: "internalCallsToggle",
caption: "Omit cover page when email subject is blank"
}, {
classes: "ui-message",
content: "If this option is selected, when you send a fax via email with a subject line the cover page will be used. If you send it without a subject line a cover page will not be used."
} ]
}, {
classes: "ui-label",
content: "Email addresses permitted to send faxes"
}, {
kind: "rc.EditableList",
onAdd: "inputChange",
onSelect: "inputChange",
placeholder: "user@email.com",
data: [ {
caption: "alaxeyp@ringcentral.com"
}, {
caption: "vic@ringcentral.com"
}, {
caption: "john.smith@ringcentral.com"
} ]
} ],
goToNowhere: function() {
App.goToNowhere();
},
inputChange: function(e, t) {
this.log(t.originator.name);
}
});

// ui/Page.js

enyo.kind({
name: "rc.Page",
kind: "FittableRows",
classes: "ui-page",
published: {
showBack: !0,
showNext: !1,
caption: "",
nextButtonCaption: loc.next,
pageData: null,
preview: !1,
previewRatio: .21,
hidePreviewDelay: 300
},
events: {
onOpen: ""
},
handlers: {
onBack: "",
onNext: ""
},
pageTools: [ {
name: "nav",
kind: "rc.NavToolbar",
onBack: "doBack",
onNext: "doNext"
}, {
name: "preview",
classes: "ui-page-preview",
showing: !1,
components: [ {
name: "previewContent",
classes: "ui-page-preview-content"
}, {
name: "previewViewport",
classes: "ui-page-preview-viewport"
} ]
}, {
name: "client",
kind: "Scroller",
fit: !0,
touch: !0,
horizontal: "hidden",
onScrollStart: "showPreview",
onScrollStop: "delayedHidePreview",
onScroll: "scrollPreview"
} ],
doBack: function() {
App.back();
},
create: function() {
this.inherited(arguments), this.showBackChanged(), this.showNextChanged(), this.captionChanged(), this.nextButtonCaptionChanged(), this.previewChanged();
},
initComponents: function() {
this.createChrome(this.pageTools), this.inherited(arguments);
},
flow: function() {
this.inherited(arguments), this.$.client.flow();
},
reflow: function() {
this.inherited(arguments), this.$.client.reflow();
},
showBackChanged: function() {
this.$.nav.setShowBack(this.getShowBack()), this.$.nav.reflow();
},
showNextChanged: function() {
this.$.nav.setShowNext(this.getShowNext()), this.$.nav.reflow();
},
captionChanged: function() {
this.$.nav.setCaption(this.getCaption());
},
nextButtonCaptionChanged: function() {
this.$.nav.setNextButtonCaption(this.getNextButtonCaption());
},
previewChanged: function() {
this.getPreview() ? this.enablePreview() : this.disablePreview();
},
enablePreview: function() {
var e = this;
setTimeout(function() {
e.clientBounds = e.$.client.getScrollBounds();
}, 100);
},
disablePreview: function() {
this.$.preview.hide();
},
showPreview: function() {
if (!this.getPreview()) return;
this.cancelHide(), this.makePreviewContent(), this.$.preview.setBounds({
width: this.clientBounds.width * this.previewRatio,
height: this.clientBounds.height * this.previewRatio
}), this.$.previewViewport.setBounds({
top: this.$.client.getScrollTop() * this.previewRatio,
height: this.clientBounds.clientHeight * this.previewRatio
}), this.$.preview.show();
},
makePreviewContent: function() {
this.$.previewContent.setContent(" "), this.$.previewContent.setBounds({
width: this.clientBounds.width
});
var e = this.$.client.node.innerHTML, t = "scale(" + this.previewRatio + ")", n = this.$.previewContent.node.style;
n.OTransform = t, n.WebkitTransform = t, n.transform = t, this.$.previewContent.node.innerHTML = e.replace(/id="[\w_-]+"/g, "");
},
delayedHidePreview: function() {
var e = this;
e.cancelHide(), e.clientBounds = e.$.client.getScrollBounds(), e.hidePreviewTimer = setTimeout(function() {
e.hidePreview();
}, e.getHidePreviewDelay());
},
hidePreview: function() {
this.$.preview.hide(), this.clientBounds = this.$.client.getScrollBounds();
},
scrollPreview: function() {
if (!this.getPreview()) return;
this.$.previewViewport.setBounds({
top: this.$.client.getScrollTop() * this.previewRatio
});
},
cancelHide: function() {
this.hidePreviewTimer && clearTimeout(this.hidePreviewTimer);
}
});

// ui/AudioPlayer.js

enyo.kind({
name: "rc.AudioPlayer",
kind: "FittableColumns",
classes: "ui-audio-player",
events: {
onPlay: "",
onPause: ""
},
components: [ {
name: "button",
classes: "ui-audio-player-button",
ontap: "tapButton"
}, {
classes: "ui-audio-player-slider",
fit: !0,
components: [ {
name: "slider",
kind: "onyx.Slider",
min: 0,
max: 100,
value: 0
} ]
} ],
create: function() {
this.inherited(arguments), this.playing = !1;
},
isPlaying: function() {
return this.playing;
},
pause: function() {
this.isPlaying() && (this.playing = !1, this.$.button.removeClass("pause"), this.doPause());
},
play: function() {
this.isPlaying() || (this.playing = !0, this.$.button.addClass("pause"), this.doPlay());
},
tapButton: function() {
this.isPlaying() ? this.pause() : this.play();
}
});

// ui/Tabs.js

enyo.kind({
name: "rc.Tabs",
kind: "onyx.RadioGroup",
layoutKind: "rc.ColumnsLayout",
classes: "ui-tabs-switcher",
controlClasses: "ui-tabs-button ui-greet-caller-tabs"
});

// page/UnderConstruction.js

enyo.kind({
name: "rc.page.UnderConstruction",
kind: "rc.Page",
caption: loc.UnderConstruction.caption,
showBack: !0,
classes: "ui-under-construction",
handlers: {
onBack: "onBack"
},
onBack: function() {
this.log("Please leave this area");
},
components: [ {
classes: "ui-under-construction-top"
}, {
classes: "ui-under-construction-img"
}, {
classes: "ui-under-construction-placeholder",
content: loc.UnderConstruction.placeholder
} ]
});

// page/GreetCaller.js

enyo.kind({
name: "rc.page.GreetCaller",
kind: "rc.Page",
caption: loc.GreetCaller.caption,
nextButtonCaption: loc.save,
showNext: !0,
handlers: {
onBack: "",
onNext: "save",
onOpen: "pageOpen"
},
pageOpen: function() {
var e = this.getPageData().model, t = e.get("greetCallerType"), n = this.$.radio;
e.get("greetCallerActive") ? t === rc.data.RuleModel.GREET_CALLER_TYPE_DEFAULT ? n.setActiveItem(this.$.default) : t === rc.data.RuleModel.GREET_CALLER_TYPE_CUSTOM && n.setActiveItem(this.$.custom) : n.setActiveItem(this.$.off);
},
components: [ {
classes: "ui-greet-caller-top",
components: [ {
classes: "ui-greet-caller-header",
content: loc.GreetCaller.caption
}, {
classes: "ui-description",
content: loc.GreetCaller.description
} ]
}, {
name: "radio",
kind: "rc.RadioList",
onActivate: "switchActivate",
components: [ {
caption: "Off",
name: "off"
}, {
caption: "Default",
name: "default"
}, {
caption: "Custom",
name: "custom"
} ]
}, {
name: "defaultControls",
classes: "ui-audio-player-default",
components: [ {
name: "player",
kind: "rc.AudioPlayer",
onPlay: "playGreeting"
}, {
classes: "ui-hint-arrow-top",
content: loc.GreetCaller.defaultHint
} ]
}, {
name: "customControls",
classes: "ui-audio-player-custom",
components: [ {
kind: "rc.Tabs",
name: "customTabs",
onActivate: "customTabActivate",
components: [ {
name: "overPhone",
content: loc.GreetCaller.overPhone,
active: !0
}, {
name: "overMicrophone",
content: loc.GreetCaller.overMicrophone
}, {
name: "import",
content: loc.GreetCaller.import
} ]
}, {
name: "overPhoneContainer",
components: [ {
classes: "ui-message",
content: loc.GreetCaller.overPhoneDescription
}, {
classes: "ui-label",
content: loc.GreetCaller.callMe
}, {
kind: "rc.RadioList",
components: [ {
caption: "Work",
description: "+1 (650) 654-9984",
active: !0
}, {
caption: "Mobile",
description: "+1 (985) 654-6574"
} ]
}, {
kind: "onyx.InputDecorator",
classes: "ui-text-input ui-block",
components: [ {
kind: "onyx.Input",
placeholder: loc.GreetCaller.inputPlaceholder
} ]
}, {
classes: "ui-center",
components: [ {
kind: "onyx.Button",
classes: "ui-button",
content: loc.GreetCaller.callMeNow
} ]
} ]
}, {
name: "overMicrophoneContainer",
components: [ {
classes: "ui-greet-caller-under-construction"
} ]
} ]
} ],
playGreeting: function() {
alert("la-la-la-la-la");
},
goToNowhere: function() {
App.goToNowhere();
},
save: function() {
var e = this.getPageData().model, t = !this.$.off.getActive();
e.set("greetCallerActive", t), t && e.set("greetCallerType", this.$.custom.getActive() ? rc.data.RuleModel.GREET_CALLER_TYPE_CUSTOM : rc.data.RuleModel.GREET_CALLER_TYPE_DEFAULT), App.back();
},
switchActivate: function() {
this.setActiveItem(this.$.radio.getActiveItem());
},
setActiveItem: function(e) {
e === this.$.off ? (this.$.defaultControls.hide(), this.$.customControls.hide()) : e === this.$.default ? (this.$.defaultControls.show(), this.$.customControls.hide()) : e === this.$.custom && (this.$.defaultControls.hide(), this.$.customControls.show());
},
customTabActivate: function() {
var e = this.$.customTabs.getActive();
this.$.overPhoneContainer.setShowing(e.name === "overPhone"), this.$.overMicrophoneContainer.setShowing(e.name !== "overPhone");
}
});

// page/CallerId.js

enyo.kind({
name: "rc.page.CallerId",
kind: "rc.Page",
caption: loc.CallerId.caption,
components: [ {
classes: "ui-message",
style: "margin-top: 20px;",
content: "Please select caller ID that will be used when calls are made from the following devices or features"
}, {
classes: "ui-header-big",
content: "By Phone"
}, {
classes: "ui-label",
content: "Polycom IP 335 HD IP phone"
}, {
kind: "rc.NavButton",
caption: "Main Number",
description: "(650) 472-4080",
ontap: "goToNowhere"
}, {
classes: "ui-label",
content: "RingMe (Outgoing to Caller)"
}, {
kind: "rc.NavButton",
caption: "Main Number",
description: "(650) 472-4080",
ontap: "goToNowhere"
}, {
classes: "ui-header-big",
content: "By Feature"
}, {
classes: "ui-label",
content: "RingOut from Web"
}, {
kind: "rc.NavButton",
caption: "Main Number",
description: "(650) 472-4080",
ontap: "goToNowhere"
}, {
classes: "ui-label",
content: "RingMe (Outgoing to Caller)"
}, {
kind: "rc.NavButton",
caption: "Main Number",
description: "(650) 472-4080",
ontap: "goToNowhere"
}, {
classes: "ui-label",
content: "Call Flip"
}, {
kind: "rc.NavButton",
caption: "Fax Number",
description: "(650) 472-4080",
ontap: "goToNowhere"
}, {
classes: "ui-label",
content: "Call Flip"
}, {
kind: "rc.NavButton",
caption: "Main Number",
description: "(650) 472-4080",
ontap: "goToNowhere"
}, {
classes: "ui-header-big",
content: "Internal Calls"
}, {
kind: "rc.VerticalGroup",
name: "internalCalls",
components: [ {
kind: "rc.ToggleButton",
name: "internalCallsToggle",
caption: "Use extension number for internal calls when possible"
}, {
classes: "ui-message",
content: "If selected, when dialing an internal extension (rather than an external phone number) the extension number will be used as the callerid instead of the phone number. This will only apply to calls received on RingCentral phones and other IP devices. Calls forwarded to external numbers such as a mobile phone will still show the full phone number."
} ]
} ],
goToNowhere: function() {
App.goToNowhere();
}
});

// page/UserSettings.js

enyo.kind({
name: "rc.page.UserSettings",
kind: "rc.Page",
caption: loc.UserSettings.caption,
scrollable: !1,
nextButtonCaption: loc.test,
showNext: !0,
preview: !0,
handlers: {
onBack: "goBack",
onNext: "switchTestMode",
onOpen: "pageOpen"
},
components: [ {
name: "tabs",
kind: "onyx.RadioGroup",
layoutKind: "rc.ColumnsLayout",
onActivate: "onTabActivate",
classes: "ui-tabs",
controlClasses: "onyx-tabbutton ui-tabs-button",
components: [ {
name: "userInfoButton",
content: "User Info",
bindTo: "userInfoPanel"
}, {
name: "callFlowButton",
content: "Call Flow",
active: !0,
bindTo: "callFlowPanel"
}, {
name: "faxButton",
content: "Fax",
bindTo: "faxPanel"
} ]
}, {
name: "panels",
kind: "rc.Panels",
fit: !0,
components: [ {
kind: "rc.UserInfoPanel",
name: "userInfoPanel",
bindTo: "userInfoButton"
}, {
kind: "rc.CallFlow",
name: "callFlowPanel",
bindTo: "callFlowButton"
}, {
kind: "rc.Fax",
name: "faxPanel",
bindTo: "faxButton"
} ]
} ],
goBack: function() {
window.history.back();
},
onTabActivate: function(e, t) {
if (t.originator.getActive()) {
var n = t.originator.bindTo, r = this.$[n], i = r.parent, s = r.parent.getActive() === r;
s || i.setIndex(i.children.indexOf(r));
}
},
onPanelActivate: function() {
var e = this.$.panels.getActive().bindTo, t = this.$[e];
t.getActive() || t.setActive(!0), this.activateCallFLowButton(e);
},
pageOpen: function() {
this.$.callFlowPanel.redrawItems(), this.$.callFlowPanel.selectLastRule();
},
switchTestMode: function() {}
});

// page/AddRule.js

enyo.kind({
name: "rc.page.AddRule",
kind: "rc.Page",
classes: "ui-add-rule",
nextButtonCaption: loc.save,
showNext: !0,
caption: loc.AddRule.caption,
handlers: {
onNext: "addRule"
},
components: [ {
classes: "ui-add-rule-top"
}, {
classes: "ui-add-rule-img"
}, {
classes: "ui-add-rule-placeholder",
content: loc.AddRule.placeholder
}, {
classes: "ui-message",
content: loc.AddRule.hint
} ],
addRule: function() {
var e = this.getPageData().collection;
this.customRules = this.customRules ? this.customRules + 1 : 1, e.add({
name: "My Rule " + this.customRules,
description: "",
greetCallerActive: !1,
screenCallerActive: !1,
connectingActive: !1,
playingActive: !1,
ringSoftphonesActive: !1,
delayActive: !1,
ringPhonesActive: !1,
voicemailActive: !0
}), App.back();
}
});

// page/RingPhones.js

enyo.kind({
name: "rc.page.RingPhones",
kind: "rc.Page",
classes: "ui-ring-phones",
caption: loc.RingPhones.caption
});

// App.js

enyo.kind({
name: "App",
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
name: "panels",
kind: "Panels",
fit: !0,
draggable: !1,
components: [ {
kind: "rc.page.UserSettings",
name: "UserSettings"
}, {
kind: "rc.page.CallerId",
name: "CallerId"
}, {
kind: "rc.page.GreetCaller",
name: "GreetCaller"
}, {
kind: "rc.page.UnderConstruction",
name: "UnderConstruction"
}, {
kind: "rc.page.AddRule",
name: "AddRule"
}, {
kind: "rc.page.RingPhones",
name: "RingPhones"
} ]
} ],
create: function() {
this.inherited(arguments), App.on("goBack", this.goBack, this), App.on("goToNowhere", this.goToNowhere, this), App.on("goTo", this.goTo, this);
var e = 0;
this.pageStack = [ e ], this.$.panels.children[e].doOpen();
},
goBack: function() {
var e = this.$.panels, t;
this.pageStack.length > 1 && (this.pageStack.pop(), t = this.pageStack[this.pageStack.length - 1], e.setIndex(t), e.children[t].doOpen());
},
goToNowhere: function() {
this.goTo({
pageName: "UnderConstruction"
});
},
goTo: function(e) {
var t = this.$.panels, n = e.pageName, r = e.data;
t.children.some(function(e, i) {
if (e.name === n) return t.setIndex(i), e.setPageData && e.setPageData(r), t.children[i].doOpen(), this.pageStack.push(i), !0;
}, this);
},
statics: {
listeners: {},
on: function(e, t, n) {
var r = this.listeners;
this.listeners[e] ? this.listeners[e].push(t.bind(n)) : this.listeners[e] = [ t.bind(n) ];
var i = r[e].length - 1;
return {
remove: function() {
delete r[e][i];
}
};
},
trigger: function(e, t) {
this.listeners[e] && this.listeners[e].forEach(function(e) {
e(t);
});
},
back: function() {
this.trigger("goBack");
},
goToNowhere: function() {
this.trigger("goToNowhere");
},
goTo: function(e, t) {
this.trigger("goTo", {
pageName: e,
data: t
});
}
}
});
