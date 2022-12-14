/*!
 * shariff - v1.26.0 - Fri, 28 Jul 2017 11:36:42 GMT
 * https://github.com/heiseonline/shariff
 * Copyright (c) 2017 Ines Pauer, Philipp Busse, Sebastian Hilbig, Erich Kramer, Deniz Sesli
 * Licensed under the MIT license
 */
! function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var a = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports
    }
    var r = {};
    t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 33)
}([function(e, t, r) {
    "use strict";

    function n() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }

    function a(e, t, r) {
        if (e && h.isObject(e) && e instanceof n) return e;
        var a = new n;
        return a.parse(e, t, r), a
    }

    function o(e) {
        return h.isString(e) && (e = a(e)), e instanceof n ? e.format() : n.prototype.format.call(e)
    }

    function i(e, t) {
        return a(e, !1, !0).resolve(t)
    }

    function s(e, t) {
        return e ? a(e, !1, !0).resolveObject(t) : t
    }
    var l = r(7),
        h = r(9);
    t.parse = a, t.resolve = i, t.resolveObject = s, t.format = o, t.Url = n;
    var p = /^([a-z0-9.+-]+:)/i,
        u = /:[0-9]*$/,
        c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        d = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
        f = ["{", "}", "|", "\\", "^", "`"].concat(d),
        m = ["'"].concat(f),
        g = ["%", "/", "?", ";", "#"].concat(m),
        v = ["/", "?", "#"],
        b = /^[+a-z0-9A-Z_-]{0,63}$/,
        y = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        k = {
            javascript: !0,
            "javascript:": !0
        },
        j = {
            javascript: !0,
            "javascript:": !0
        },
        T = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        },
        w = r(10);
    n.prototype.parse = function(e, t, r) {
        if (!h.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var n = e.indexOf("?"),
            a = -1 !== n && n < e.indexOf("#") ? "?" : "#",
            o = e.split(a),
            i = /\\/g;
        o[0] = o[0].replace(i, "/"), e = o.join(a);
        var s = e;
        if (s = s.trim(), !r && 1 === e.split("#").length) {
            var u = c.exec(s);
            if (u) return this.path = s, this.href = s, this.pathname = u[1], u[2] ? (this.search = u[2], this.query = t ? w.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this
        }
        var d = p.exec(s);
        if (d) {
            d = d[0];
            var f = d.toLowerCase();
            this.protocol = f, s = s.substr(d.length)
        }
        if (r || d || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var x = "//" === s.substr(0, 2);
            !x || d && j[d] || (s = s.substr(2), this.slashes = !0)
        }
        if (!j[d] && (x || d && !T[d])) {
            for (var z = -1, U = 0; U < v.length; U++) {
                var C = s.indexOf(v[U]); - 1 !== C && (-1 === z || C < z) && (z = C)
            }
            var I, R;
            R = -1 === z ? s.lastIndexOf("@") : s.lastIndexOf("@", z), -1 !== R && (I = s.slice(0, R), s = s.slice(R + 1), this.auth = decodeURIComponent(I)), z = -1;
            for (var U = 0; U < g.length; U++) {
                var C = s.indexOf(g[U]); - 1 !== C && (-1 === z || C < z) && (z = C)
            } - 1 === z && (z = s.length), this.host = s.slice(0, z), s = s.slice(z), this.parseHost(), this.hostname = this.hostname || "";
            var O = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!O)
                for (var A = this.hostname.split(/\./), U = 0, L = A.length; U < L; U++) {
                    var P = A[U];
                    if (P && !P.match(b)) {
                        for (var S = "", D = 0, q = P.length; D < q; D++) P.charCodeAt(D) > 127 ? S += "x" : S += P[D];
                        if (!S.match(b)) {
                            var N = A.slice(0, U),
                                G = A.slice(U + 1),
                                F = P.match(y);
                            F && (N.push(F[1]), G.unshift(F[2])), G.length && (s = "/" + G.join(".") + s), this.hostname = N.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), O || (this.hostname = l.toASCII(this.hostname));
            var E = this.port ? ":" + this.port : "",
                M = this.hostname || "";
            this.host = M + E, this.href += this.host, O && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s[0] && (s = "/" + s))
        }
        if (!k[f])
            for (var U = 0, L = m.length; U < L; U++) {
                var W = m[U];
                if (-1 !== s.indexOf(W)) {
                    var B = encodeURIComponent(W);
                    B === W && (B = escape(W)), s = s.split(W).join(B)
                }
            }
        var J = s.indexOf("#"); - 1 !== J && (this.hash = s.substr(J), s = s.slice(0, J));
        var _ = s.indexOf("?");
        if (-1 !== _ ? (this.search = s.substr(_), this.query = s.substr(_ + 1), t && (this.query = w.parse(this.query)), s = s.slice(0, _)) : t && (this.search = "", this.query = {}), s && (this.pathname = s), T[f] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            var E = this.pathname || "",
                Z = this.search || "";
            this.path = E + Z
        }
        return this.href = this.format(), this
    }, n.prototype.format = function() {
        var e = this.auth || "";
        e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
        var t = this.protocol || "",
            r = this.pathname || "",
            n = this.hash || "",
            a = !1,
            o = "";
        this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && h.isObject(this.query) && Object.keys(this.query).length && (o = w.stringify(this.query));
        var i = this.search || o && "?" + o || "";
        return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || T[t]) && !1 !== a ? (a = "//" + (a || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : a || (a = ""), n && "#" !== n.charAt(0) && (n = "#" + n), i && "?" !== i.charAt(0) && (i = "?" + i), r = r.replace(/[?#]/g, function(e) {
            return encodeURIComponent(e)
        }), i = i.replace("#", "%23"), t + a + r + i + n
    }, n.prototype.resolve = function(e) {
        return this.resolveObject(a(e, !1, !0)).format()
    }, n.prototype.resolveObject = function(e) {
        if (h.isString(e)) {
            var t = new n;
            t.parse(e, !1, !0), e = t
        }
        for (var r = new n, a = Object.keys(this), o = 0; o < a.length; o++) {
            var i = a[o];
            r[i] = this[i]
        }
        if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;
        if (e.slashes && !e.protocol) {
            for (var s = Object.keys(e), l = 0; l < s.length; l++) {
                var p = s[l];
                "protocol" !== p && (r[p] = e[p])
            }
            return T[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r
        }
        if (e.protocol && e.protocol !== r.protocol) {
            if (!T[e.protocol]) {
                for (var u = Object.keys(e), c = 0; c < u.length; c++) {
                    var d = u[c];
                    r[d] = e[d]
                }
                return r.href = r.format(), r
            }
            if (r.protocol = e.protocol, e.host || j[e.protocol]) r.pathname = e.pathname;
            else {
                for (var f = (e.pathname || "").split("/"); f.length && !(e.host = f.shift()););
                e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== f[0] && f.unshift(""), f.length < 2 && f.unshift(""), r.pathname = f.join("/")
            }
            if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
                var m = r.pathname || "",
                    g = r.search || "";
                r.path = m + g
            }
            return r.slashes = r.slashes || e.slashes, r.href = r.format(), r
        }
        var v = r.pathname && "/" === r.pathname.charAt(0),
            b = e.host || e.pathname && "/" === e.pathname.charAt(0),
            y = b || v || r.host && e.pathname,
            k = y,
            w = r.pathname && r.pathname.split("/") || [],
            f = e.pathname && e.pathname.split("/") || [],
            x = r.protocol && !T[r.protocol];
        if (x && (r.hostname = "", r.port = null, r.host && ("" === w[0] ? w[0] = r.host : w.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === f[0] ? f[0] = e.host : f.unshift(e.host)), e.host = null), y = y && ("" === f[0] || "" === w[0])), b) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, w = f;
        else if (f.length) w || (w = []), w.pop(), w = w.concat(f), r.search = e.search, r.query = e.query;
        else if (!h.isNullOrUndefined(e.search)) {
            if (x) {
                r.hostname = r.host = w.shift();
                var z = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
                z && (r.auth = z.shift(), r.host = r.hostname = z.shift())
            }
            return r.search = e.search, r.query = e.query, h.isNull(r.pathname) && h.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
        }
        if (!w.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
        for (var U = w.slice(-1)[0], C = (r.host || e.host || w.length > 1) && ("." === U || ".." === U) || "" === U, I = 0, R = w.length; R >= 0; R--) U = w[R], "." === U ? w.splice(R, 1) : ".." === U ? (w.splice(R, 1), I++) : I && (w.splice(R, 1), I--);
        if (!y && !k)
            for (; I--; I) w.unshift("..");
        !y || "" === w[0] || w[0] && "/" === w[0].charAt(0) || w.unshift(""), C && "/" !== w.join("/").substr(-1) && w.push("");
        var O = "" === w[0] || w[0] && "/" === w[0].charAt(0);
        if (x) {
            r.hostname = r.host = O ? "" : w.length ? w.shift() : "";
            var z = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
            z && (r.auth = z.shift(), r.host = r.hostname = z.shift())
        }
        return y = y || r.host && w.length, y && !O && w.unshift(""), w.length ? r.pathname = w.join("/") : (r.pathname = null, r.path = null), h.isNull(r.pathname) && h.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r
    }, n.prototype.parseHost = function() {
        var e = this.host,
            t = u.exec(e);
        t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
    }
}, function(e, t) {
    var r;
    r = function() {
        return this
    }();
    try {
        r = r || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (r = window)
    }
    e.exports = r
}, function(e, t, r) {
    "use strict";
    (function(t) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = function() {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(),
            i = r(3),
            s = r(4),
            l = r(0),
            h = {
                theme: "color",
                backendUrl: null,
                infoUrl: "http://ct.de/-2467514",
                lang: "de",
                langFallback: "en",
                mailUrl: function() {
                    var e = l.parse(this.getURL(), !0);
                    return e.query.view = "mail", delete e.search, l.format(e)
                },
                mailBody: function() {
                    return this.getURL()
                },
                mediaUrl: null,
                orientation: "horizontal",
                referrerTrack: null,
                services: ["twitter", "facebook", "googleplus", "info"],
                title: function() {
                    return i("head title").text()
                },
                twitterVia: null,
                flattrUser: null,
                flattrCategory: null,
                url: function() {
                    var e = t.document.location.href,
                        r = i("link[rel=canonical]").attr("href") || this.getMeta("og:url") || "";
                    return r.length > 0 && (r.indexOf("http") < 0 && (r = t.document.location.protocol + "//" + t.document.location.host + r), e = r), e
                }
            },
            p = function() {
                function e(t, r) {
                    var a = this;
                    n(this, e), this.element = t, i(t).empty(), this.options = i.extend({}, h, r, i(t).data()), this.services = Object.keys(s).filter(function(e) {
                        return a.isEnabledService(e)
                    }).sort(function(e, t) {
                        var r = a.options.services;
                        return r.indexOf(e) - r.indexOf(t)
                    }).map(function(e) {
                        return s[e](a)
                    }), this._addButtonList(), null !== this.options.backendUrl && this.getShares(this._updateCounts.bind(this))
                }
                return o(e, [{
                    key: "isEnabledService",
                    value: function(e) {
                        return this.options.services.indexOf(e) > -1
                    }
                }, {
                    key: "$socialshareElement",
                    value: function() {
                        return i(this.element)
                    }
                }, {
                    key: "getLocalized",
                    value: function(e, t) {
                        return "object" === a(e[t]) ? void 0 === e[t][this.options.lang] ? e[t][this.options.langFallback] : e[t][this.options.lang] : "string" == typeof e[t] ? e[t] : void 0
                    }
                }, {
                    key: "getMeta",
                    value: function(e) {
                        return i('meta[name="' + e + '"],[property="' + e + '"]').attr("content") || ""
                    }
                }, {
                    key: "getInfoUrl",
                    value: function() {
                        return this.options.infoUrl
                    }
                }, {
                    key: "getURL",
                    value: function() {
                        return this.getOption("url")
                    }
                }, {
                    key: "getOption",
                    value: function(e) {
                        var t = this.options[e];
                        return "function" == typeof t ? t.call(this) : t
                    }
                }, {
                    key: "getTitle",
                    value: function() {
                        var e = this.getOption("title") || this.getMeta("DC.title"),
                            t = this.getMeta("DC.creator");
                        return e && t && (e = e + " - " + t), e
                    }
                }, {
                    key: "getReferrerTrack",
                    value: function() {
                        return this.options.referrerTrack || ""
                    }
                }, {
                    key: "getShares",
                    value: function(e) {
                        var t = l.parse(this.options.backendUrl, !0);
                        return t.query.url = this.getURL(), delete t.search, i.getJSON(l.format(t), e)
                    }
                }, {
                    key: "_updateCounts",
                    value: function(e, t, r) {
                        var n = this;
                        e && i.each(e, function(e, t) {
                            n.isEnabledService(e) && (t >= 1e3 && (t = Math.round(t / 1e3) + "k"), i(n.element).find("." + e + " a").append(i("<span/>").addClass("share_count").text(t)))
                        })
                    }
                }, {
                    key: "_addButtonList",
                    value: function() {
                        var e = this,
                            r = i("<ul/>").addClass(["theme-" + this.options.theme, "orientation-" + this.options.orientation, "col-" + this.options.services.length].join(" "));
                        this.services.forEach(function(t) {
                            var n = i("<li/>").addClass("shariff-button " + t.name),
                                a = i("<span/>").addClass("share_text").text(e.getLocalized(t, "shareText")),
                                o = i("<a/>").attr("href", t.shareUrl).append(a);
                            void 0 !== t.faName && o.prepend(i("<span/>").addClass("fa " + t.faName)), t.popup ? o.attr("data-rel", "popup") : t.blank && o.attr("target", "_blank"), o.attr("title", e.getLocalized(t, "title")), o.attr("role", "button"), o.attr("aria-label", e.getLocalized(t, "title")), n.append(o), r.append(n)
                        }), r.on("click", '[data-rel="popup"]', function(e) {
                            e.preventDefault();
                            var r = i(this).attr("href");
                            if (r.match(/twitter\.com\/intent\/(\w+)/)) {
                                var n = t.window;
                                if (n.__twttr && n.__twttr.widgets && n.__twttr.widgets.loaded) return
                            }
                            t.window.open(r, "_blank", "width=600,height=460")
                        }), this.$socialshareElement().append(r)
                    }
                }]), e
            }();
        e.exports = p, t.Shariff = p, i(function() {
            i(".shariff").each(function() {
                this.hasOwnProperty("shariff") || (this.shariff = new p(this))
            })
        })
    }).call(t, r(1))
}, function(e, t, r) {
    "use strict";

    function n(e) {
        if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r
        }
        return Array.from(e)
    }

    function a(e, t) {
        var r = [];
        return t = t || document, "function" == typeof e ? (t.attachEvent ? "complete" === t.readyState : "loading" !== t.readyState) ? e() : t.addEventListener("DOMContentLoaded", e) : r = e instanceof Element ? [e] : "string" == typeof e ? "<" === e[0] ? Array.prototype.slice.call(h(e)) : Array.prototype.slice.call(t.querySelectorAll(e)) : e, new o(r, t)
    }

    function o(e, t) {
        this.length = e.length, this.context = t;
        var r = this;
        l(e, function(e) {
            r[e] = this
        })
    }
    "function" != typeof Object.assign && (Object.assign = function(e, t) {
        if (null === e) throw new TypeError("Cannot convert undefined or null to object");
        for (var r = Object(e), n = 1; n < arguments.length; n++) {
            var a = arguments[n];
            if (null !== a)
                for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (r[o] = a[o])
        }
        return r
    }), o.prototype.each = function(e) {
        for (var t = this.length - 1; t >= 0; t--) e.call(this[t], t, this[t]);
        return this
    }, o.prototype.empty = function() {
        return this.each(i)
    }, o.prototype.text = function(e) {
        return void 0 === e ? this[0].textContent : this.each(function() {
            this.textContent = e
        })
    }, o.prototype.attr = function(e, t) {
        return this.length < 1 ? null : void 0 === t ? this[0].getAttribute(e) : this.each(function() {
            this.setAttribute(e, t)
        })
    }, o.prototype.data = function(e, t) {
        if (t) return this.attr("data-" + e, t);
        if (e) return this.attr("data-" + e);
        var r = Object.assign({}, this[0].dataset);
        return l(r, function(e, t) {
            r[e] = g(t)
        }), r
    }, o.prototype.find = function(e) {
        var t;
        return t = s(this, function(t) {
            return t.querySelectorAll(e)
        }), t = s(t, function(e) {
            return Array.prototype.slice.call(e)
        }), t = Array.prototype.concat.apply([], t), new o(t)
    }, o.prototype.append = function(e) {
        return "string" == typeof e && (e = h(e)), p(this[0], e), this
    }, o.prototype.prepend = function(e) {
        return "string" == typeof e && (e = h(e)), u(this[0], e), this
    }, o.prototype.addClass = function(e) {
        return this.each(function() {
            var t;
            (t = this.classList).add.apply(t, n(e.split(" ")))
        })
    }, o.prototype.removeClass = function(e) {
        return this.each(function() {
            this.classList.remove(e)
        })
    }, o.prototype.on = function(e, t, r) {
        return this.each(function() {
            d(t, e, r, this)
        })
    };
    var i = function() {
            for (; this.hasChildNodes();) this.removeChild(this.firstChild)
        },
        s = function(e, t) {
            return Array.prototype.map.call(e, t)
        },
        l = function(e, t) {
            if (e instanceof Array)
                for (var r = 0; r < e.length; r++) t.call(e[r], r, e[r]);
            else if (e instanceof Object)
                for (var n in e) t.call(e[n], n, e[n], e);
            return e
        },
        h = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.children
        },
        p = function(e, t) {
            for (var r = 0; r < t.length; r++) e.appendChild(t[r])
        },
        u = function(e, t) {
            for (var r = t.length - 1; r >= 0; r--) e.insertBefore(t[t.length - 1], e.firstChild)
        },
        c = function() {
            var e = HTMLElement.prototype,
                t = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector;
            return function e(r, n) {
                if (null !== r) return t.call(r, n) ? r : e(r.parentElement, n)
            }
        }(),
        d = function(e, t, r, n) {
            (n || document).addEventListener(t, function(t) {
                var n = c(t.target, e);
                n && r.call(n, t)
            })
        },
        f = function e(t) {
            var r = {},
                n = !1,
                a = 0,
                o = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (n = arguments[0], a++);
            for (; a < o; a++) {
                var i = arguments[a];
                ! function(t) {
                    for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (n && "[object Object]" === Object.prototype.toString.call(t[a]) ? r[a] = e(!0, r[a], t[a]) : r[a] = t[a])
                }(i)
            }
            return r
        },
        m = function(e, t) {
            var r = new XMLHttpRequest;
            r.open("GET", e, !0), r.setRequestHeader("Content-Type", "application/json"), r.setRequestHeader("Accept", "application/json"), r.onload = function() {
                if (r.status >= 200 && r.status < 400) {
                    var e = JSON.parse(r.responseText);
                    t(e, r.status, r)
                } else t(null, r.status, r)
            }, r.onerror = function(e) {
                t(new Error(e), null, r)
            }, r.send()
        },
        g = function(e) {
            if ("true" === e) return !0;
            if ("false" === e) return !1;
            if ("null" === e) return null;
            if (+e + "" === e) return +e;
            if (/^[[{]/.test(e)) try {
                return JSON.parse(e)
            } catch (t) {
                return e
            }
            return e
        };
    a.extend = f, a.map = s, a.each = l, a.getJSON = m, e.exports = a
}, function(e, t, r) {
    "use strict";
    e.exports = {
        addthis: r(5),
        diaspora: r(6),
        facebook: r(13),
        flattr: r(14),
        googleplus: r(15),
        info: r(16),
        linkedin: r(17),
        mail: r(18),
        pinterest: r(19),
        print: r(20),
        qzone: r(21),
        reddit: r(22),
        stumbleupon: r(23),
        tencent: r(24),
        threema: r(25),
        tumblr: r(26),
        twitter: r(27),
        weibo: r(28),
        whatsapp: r(29),
        xing: r(30)
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "addthis",
            faName: "fa-plus",
            title: {
                bg: "?????????????? ?? AddThis",
                da: "Del p?? AddThis",
                de: "Bei AddThis teilen",
                en: "Share on AddThis",
                es: "Compartir en AddThis",
                fi: "Jaa AddThisiss??",
                fr: "Partager sur AddThis",
                hr: "Podijelite na AddThis",
                hu: "Megoszt??s AddThisen",
                it: "Condividi su AddThis",
                ja: "AddThis????????????",
                ko: "AddThis?????? ????????????",
                nl: "Delen op AddThis",
                no: "Del p?? AddThis",
                pl: "Udost??pnij przez AddThis",
                pt: "Compartilhar no AddThis",
                ro: "Partajeaz?? pe AddThis",
                ru: "???????????????????? ???? AddThis",
                sk: "Zdie??a?? na AddThis",
                sl: "Deli na AddThis",
                sr: "Podeli na AddThis",
                sv: "Dela p?? AddThis",
                tr: "AddThis'ta payla??",
                zh: "???AddThis?????????"
            },
            shareUrl: "http://api.addthis.com/oexchange/0.8/offer?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function(e) {
        var t = n.parse("https://share.diasporafoundation.org/", !0);
        return t.query.url = e.getURL(), t.query.title = e.getTitle(), t.protocol = "https", delete t.search, {
            popup: !0,
            shareText: {
                de: "teilen",
                en: "share",
                zh: "??????"
            },
            name: "diaspora",
            faName: "fa-asterisk",
            title: {
                de: "Bei Diaspora teilen",
                en: "Share on Diaspora",
                zh: "?????????Diaspora"
            },
            shareUrl: n.format(t) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    (function(e, n) {
        var a;
        ! function(o) {
            function i(e) {
                throw new RangeError(L[e])
            }

            function s(e, t) {
                for (var r = e.length, n = []; r--;) n[r] = t(e[r]);
                return n
            }

            function l(e, t) {
                var r = e.split("@"),
                    n = "";
                return r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(A, "."), n + s(e.split("."), t).join(".")
            }

            function h(e) {
                for (var t, r, n = [], a = 0, o = e.length; a < o;) t = e.charCodeAt(a++), t >= 55296 && t <= 56319 && a < o ? (r = e.charCodeAt(a++), 56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), a--)) : n.push(t);
                return n
            }

            function p(e) {
                return s(e, function(e) {
                    var t = "";
                    return e > 65535 && (e -= 65536, t += D(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += D(e)
                }).join("")
            }

            function u(e) {
                return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : j
            }

            function c(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
            }

            function d(e, t, r) {
                var n = 0;
                for (e = r ? S(e / z) : e >> 1, e += S(e / t); e > P * w >> 1; n += j) e = S(e / P);
                return S(n + (P + 1) * e / (e + x))
            }

            function f(e) {
                var t, r, n, a, o, s, l, h, c, f, m = [],
                    g = e.length,
                    v = 0,
                    b = C,
                    y = U;
                for (r = e.lastIndexOf(I), r < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && i("not-basic"), m.push(e.charCodeAt(n));
                for (a = r > 0 ? r + 1 : 0; a < g;) {
                    for (o = v, s = 1, l = j; a >= g && i("invalid-input"), h = u(e.charCodeAt(a++)), (h >= j || h > S((k - v) / s)) && i("overflow"), v += h * s, c = l <= y ? T : l >= y + w ? w : l - y, !(h < c); l += j) f = j - c, s > S(k / f) && i("overflow"), s *= f;
                    t = m.length + 1, y = d(v - o, t, 0 == o), S(v / t) > k - b && i("overflow"), b += S(v / t), v %= t, m.splice(v++, 0, b)
                }
                return p(m)
            }

            function m(e) {
                var t, r, n, a, o, s, l, p, u, f, m, g, v, b, y, x = [];
                for (e = h(e), g = e.length, t = C, r = 0, o = U, s = 0; s < g; ++s)(m = e[s]) < 128 && x.push(D(m));
                for (n = a = x.length, a && x.push(I); n < g;) {
                    for (l = k, s = 0; s < g; ++s)(m = e[s]) >= t && m < l && (l = m);
                    for (v = n + 1, l - t > S((k - r) / v) && i("overflow"), r += (l - t) * v, t = l, s = 0; s < g; ++s)
                        if (m = e[s], m < t && ++r > k && i("overflow"), m == t) {
                            for (p = r, u = j; f = u <= o ? T : u >= o + w ? w : u - o, !(p < f); u += j) y = p - f, b = j - f, x.push(D(c(f + y % b, 0))), p = S(y / b);
                            x.push(D(c(p, 0))), o = d(r, v, n == a), r = 0, ++n
                        }++r, ++t
                }
                return x.join("")
            }

            function g(e) {
                return l(e, function(e) {
                    return R.test(e) ? f(e.slice(4).toLowerCase()) : e
                })
            }

            function v(e) {
                return l(e, function(e) {
                    return O.test(e) ? "xn--" + m(e) : e
                })
            }
            var b = ("object" == typeof t && t && t.nodeType, "object" == typeof e && e && e.nodeType, "object" == typeof n && n);
            var y, k = 2147483647,
                j = 36,
                T = 1,
                w = 26,
                x = 38,
                z = 700,
                U = 72,
                C = 128,
                I = "-",
                R = /^xn--/,
                O = /[^\x20-\x7E]/,
                A = /[\x2E\u3002\uFF0E\uFF61]/g,
                L = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                },
                P = j - T,
                S = Math.floor,
                D = String.fromCharCode;
            y = {
                version: "1.4.1",
                ucs2: {
                    decode: h,
                    encode: p
                },
                decode: f,
                encode: m,
                toASCII: v,
                toUnicode: g
            }, void 0 !== (a = function() {
                return y
            }.call(t, r, t, e)) && (e.exports = a)
        }()
    }).call(t, r(8)(e), r(1))
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }), e.webpackPolyfill = 1), e
    }
}, function(e, t, r) {
    "use strict";
    e.exports = {
        isString: function(e) {
            return "string" == typeof e
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e
        },
        isNull: function(e) {
            return null === e
        },
        isNullOrUndefined: function(e) {
            return null == e
        }
    }
}, function(e, t, r) {
    "use strict";
    t.decode = t.parse = r(11), t.encode = t.stringify = r(12)
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    e.exports = function(e, t, r, o) {
        t = t || "&", r = r || "=";
        var i = {};
        if ("string" != typeof e || 0 === e.length) return i;
        var s = /\+/g;
        e = e.split(t);
        var l = 1e3;
        o && "number" == typeof o.maxKeys && (l = o.maxKeys);
        var h = e.length;
        l > 0 && h > l && (h = l);
        for (var p = 0; p < h; ++p) {
            var u, c, d, f, m = e[p].replace(s, "%20"),
                g = m.indexOf(r);
            g >= 0 ? (u = m.substr(0, g), c = m.substr(g + 1)) : (u = m, c = ""), d = decodeURIComponent(u), f = decodeURIComponent(c), n(i, d) ? a(i[d]) ? i[d].push(f) : i[d] = [i[d], f] : i[d] = f
        }
        return i
    };
    var a = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (e.map) return e.map(t);
        for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
        return r
    }
    var a = function(e) {
        switch (typeof e) {
            case "string":
                return e;
            case "boolean":
                return e ? "true" : "false";
            case "number":
                return isFinite(e) ? e : "";
            default:
                return ""
        }
    };
    e.exports = function(e, t, r, s) {
        return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? n(i(e), function(i) {
            var s = encodeURIComponent(a(i)) + r;
            return o(e[i]) ? n(e[i], function(e) {
                return s + encodeURIComponent(a(e))
            }).join(t) : s + encodeURIComponent(a(e[i]))
        }).join(t) : s ? encodeURIComponent(a(s)) + r + encodeURIComponent(a(e)) : ""
    };
    var o = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        i = Object.keys || function(e) {
            var t = [];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
            return t
        }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "facebook",
            faName: "fa-facebook",
            title: {
                bg: "?????????????? ?????? Facebook",
                da: "Del p?? Facebook",
                de: "Bei Facebook teilen",
                en: "Share on Facebook",
                es: "Compartir en Facebook",
                fi: "Jaa Facebookissa",
                fr: "Partager sur Facebook",
                hr: "Podijelite na Facebooku",
                hu: "Megoszt??s Facebookon",
                it: "Condividi su Facebook",
                ja: "?????????????????????????????????",
                ko: "?????????????????? ????????????",
                nl: "Delen op Facebook",
                no: "Del p?? Facebook",
                pl: "Udost??pnij na Facebooku",
                pt: "Compartilhar no Facebook",
                ro: "Partajeaz?? pe Facebook",
                ru: "???????????????????? ???? Facebook",
                sk: "Zdie??a?? na Facebooku",
                sl: "Deli na Facebooku",
                sr: "Podeli na Facebook-u",
                sv: "Dela p?? Facebook",
                tr: "Facebook'ta payla??",
                zh: "???Facebook?????????"
            },
            shareUrl: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL()),
            r = e.getTitle(),
            n = e.getMeta("description");
        return {
            popup: !0,
            shareText: "Flattr",
            name: "flattr",
            faName: "fa-money",
            title: {
                de: "Artikel flattrn",
                en: "Flattr this"
            },
            shareUrl: "https://flattr.com/submit/auto?title=" + encodeURIComponent(r) + "&description=" + encodeURIComponent(n) + "&category=" + encodeURIComponent(e.options.flattrCategory || "text") + "&user_id=" + encodeURIComponent(e.options.flattrUser) + "&url=" + t + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "googleplus",
            faName: "fa-google-plus",
            title: {
                bg: "?????????????? ?? Google+",
                da: "Del p?? Google+",
                de: "Bei Google+ teilen",
                en: "Share on Google+",
                es: "Compartir en Google+",
                fi: "Jaa Google+:ssa",
                fr: "Partager sur Goolge+",
                hr: "Podijelite na Google+",
                hu: "Megoszt??s Google+on",
                it: "Condividi su Google+",
                ja: "Google+????????????",
                ko: "Google+?????? ????????????",
                nl: "Delen op Google+",
                no: "Del p?? Google+",
                pl: "Udost??pnij na Google+",
                pt: "Compartilhar no Google+",
                ro: "Partajeaz?? pe Google+",
                ru: "???????????????????? ???? Google+",
                sk: "Zdie??a?? na Google+",
                sl: "Deli na Google+",
                sr: "Podeli na Google+",
                sv: "Dela p?? Google+",
                tr: "Google+'da payla??",
                zh: "???Google+?????????"
            },
            shareUrl: "https://plus.google.com/share?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            blank: !0,
            popup: !1,
            shareText: "Info",
            name: "info",
            faName: "fa-info",
            title: {
                de: "weitere Informationen",
                en: "more information",
                es: "m??s informaciones",
                fr: "plus d'informations",
                it: "maggiori informazioni",
                da: "flere oplysninger",
                nl: "verdere informatie",
                zh: "????????????"
            },
            shareUrl: e.getInfoUrl()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL()),
            r = encodeURIComponent(e.getTitle());
        return {
            popup: !0,
            shareText: {
                de: "mitteilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "?????????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "distribui??i",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "linkedin",
            faName: "fa-linkedin",
            title: {
                bg: "?????????????? ?? LinkedIn",
                da: "Del p?? LinkedIn",
                de: "Bei LinkedIn teilen",
                en: "Share on LinkedIn",
                es: "Compartir en LinkedIn",
                fi: "Jaa LinkedIniss??",
                fr: "Partager sur LinkedIn",
                hr: "Podijelite na LinkedIn",
                hu: "Megoszt??s LinkedInen",
                it: "Condividi su LinkedIn",
                ja: "LinkedIn????????????",
                ko: "LinkedIn?????? ????????????",
                nl: "Delen op LinkedIn",
                no: "Del p?? LinkedIn",
                pl: "Udost??pnij przez LinkedIn",
                pt: "Compartilhar no LinkedIn",
                ro: "Partajeaz?? pe LinkedIn",
                ru: "???????????????????? ???? LinkedIn",
                sk: "Zdie??a?? na LinkedIn",
                sl: "Deli na LinkedIn",
                sr: "Podeli na LinkedIn-u",
                sv: "Dela p?? LinkedIn",
                tr: "LinkedIn'ta payla??",
                zh: "???LinkedIn?????????"
            },
            shareUrl: "https://www.linkedin.com/shareArticle?mini=true&summary=" + encodeURIComponent(e.getMeta("description")) + "&title=" + r + "&url=" + t
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = e.getOption("mailUrl");
        return 0 === t.indexOf("mailto:") && (t += "?subject=" + encodeURIComponent(e.getTitle()), t += "&body=" + encodeURIComponent(e.getOption("mailBody").replace(/\{url\}/i, e.getURL()))), {
            blank: 0 === t.indexOf("http"),
            popup: !1,
            shareText: {
                en: "mail",
                zh: "??????"
            },
            name: "mail",
            faName: "fa-envelope",
            title: {
                bg: "?????????????? ???? ??????????",
                da: "Sende via e-mail",
                de: "Per E-Mail versenden",
                en: "Send by email",
                es: "Enviar por email",
                fi: "L??het?? s??hk??postitse",
                fr: "Envoyer par courriel",
                hr: "Po??aljite emailom",
                hu: "Elk??ld??s e-mailben",
                it: "Inviare via email",
                ja: "????????????????????????",
                ko: "???????????? ?????????",
                nl: "Sturen via e-mail",
                no: "Send via epost",
                pl: "Wy??lij e-mailem",
                pt: "Enviar por e-mail",
                ro: "Trimite prin e-mail",
                ru: "?????????????????? ???? ????. ??????????",
                sk: "Posla?? e-mailom",
                sl: "Po??lji po elektronski po??ti",
                sr: "Po??alji putem email-a",
                sv: "Skicka via e-post",
                tr: "E-posta ile g??nder",
                zh: "????????????????????????"
            },
            shareUrl: t
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function(e) {
        var t = e.getTitle(),
            r = e.getMeta("DC.creator");
        r.length > 0 && (t += " - " + r);
        var a = e.getOption("mediaUrl");
        (!a || a.length <= 0) && (a = e.getMeta("og:image"));
        var o = n.parse("https://www.pinterest.com/pin/create/link/", !0);
        return o.query.url = e.getURL(), o.query.media = a, o.query.description = t, delete o.search, {
            popup: !0,
            shareText: "pin it",
            name: "pinterest",
            faName: "fa-pinterest-p",
            title: {
                de: "Bei Pinterest pinnen",
                en: "Pin it on Pinterest",
                es: "Compartir en Pinterest",
                fr: "Partager sur Pinterest",
                it: "Condividi su Pinterest",
                da: "Del p?? Pinterest",
                nl: "Delen op Pinterest",
                zh: "?????????Pinterest"
            },
            shareUrl: n.format(o) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            name: "print",
            faName: "fa-print",
            popup: !1,
            shareText: {
                bg: "",
                da: "",
                de: "drucken",
                en: "print",
                es: "",
                fi: "",
                fr: "",
                hr: "",
                hu: "",
                it: "",
                ja: "",
                ko: "",
                nl: "",
                no: "",
                pl: "",
                pt: "",
                ro: "",
                ru: "",
                sk: "",
                sl: "",
                sr: "",
                sv: "",
                tr: "",
                zh: ""
            },
            title: {
                bg: "",
                da: "",
                de: "drucken",
                en: "print",
                es: "",
                fi: "",
                fr: "",
                hr: "",
                hu: "",
                it: "",
                ja: "",
                ko: "",
                nl: "",
                no: "",
                pl: "",
                pt: "",
                ro: "",
                ru: "",
                sk: "",
                sl: "",
                sr: "",
                sv: "",
                tr: "",
                zh: ""
            },
            shareUrl: "javascript:window.print();"
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "qzone",
            faName: "fa-qq",
            title: {
                de: "Bei Qzone teilen",
                en: "Share on Qzone",
                zh: "?????????QQ??????"
            },
            shareUrl: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(e.getURL()) + "&title=" + e.getTitle() + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL()),
            r = encodeURIComponent(e.getTitle());
        return "" !== r && (r = "&title=" + r), {
            popup: !0,
            shareText: {
                de: "teilen",
                en: "share",
                zh: "??????"
            },
            name: "reddit",
            faName: "fa-reddit",
            title: {
                de: "Bei Reddit teilen",
                en: "Share on Reddit",
                zh: "?????????Reddit"
            },
            shareUrl: "https://reddit.com/submit?url=" + t + r + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL()),
            r = encodeURIComponent(e.getTitle());
        return "" !== r && (r = "&title=" + r), {
            popup: !0,
            shareText: {
                de: "teilen",
                en: "share",
                zh: "??????"
            },
            name: "stumbleupon",
            faName: "fa-stumbleupon",
            title: {
                de: "Bei Stumbleupon teilen",
                en: "Share on Stumbleupon",
                zh: "?????????Stumbleupon"
            },
            shareUrl: "https://www.stumbleupon.com/submit?url=" + t + r + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "tencent-weibo",
            faName: "fa-tencent-weibo",
            title: {
                de: "Bei tencent weibo teilen",
                en: "Share on tencent weibo",
                zh: "?????????????????????"
            },
            shareUrl: "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(e.getURL()) + "&title=" + e.getTitle() + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL()),
            r = e.getTitle();
        return {
            popup: !1,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "threema",
            faName: "fa-lock",
            title: {
                bg: "?????????????? ?? Threema",
                da: "Del p?? Threema",
                de: "Bei Threema teilen",
                en: "Share on Threema",
                es: "Compartir en Threema",
                fi: "Jaa Threemaiss??",
                fr: "Partager sur Threema",
                hr: "Podijelite na Threema",
                hu: "Megoszt??s Threemaen",
                it: "Condividi su Threema",
                ja: "Threema????????????",
                ko: "Threema?????? ????????????",
                nl: "Delen op Threema",
                no: "Del p?? Threema",
                pl: "Udost??pnij przez Threema",
                pt: "Compartilhar no Threema",
                ro: "Partajeaz?? pe Threema",
                ru: "???????????????????? ???? Threema",
                sk: "Zdie??a?? na Threema",
                sl: "Deli na Threema",
                sr: "Podeli na Threema-u",
                sv: "Dela p?? Threema",
                tr: "Threema'ta payla??",
                zh: "???Threema?????????"
            },
            shareUrl: "threema://compose?text=" + encodeURIComponent(r) + "%20" + t + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "tumblr",
            faName: "fa-tumblr",
            title: {
                bg: "?????????????? ?? tumblr",
                da: "Del p?? tumblr",
                de: "Bei tumblr teilen",
                en: "Share on tumblr",
                es: "Compartir en tumblr",
                fi: "Jaa tumblriss??",
                fr: "Partager sur tumblr",
                hr: "Podijelite na tumblr",
                hu: "Megoszt??s tumblren",
                it: "Condividi su tumblr",
                ja: "tumblr????????????",
                ko: "tumblr?????? ????????????",
                nl: "Delen op tumblr",
                no: "Del p?? tumblr",
                pl: "Udost??pnij przez tumblr",
                pt: "Compartilhar no tumblr",
                ro: "Partajeaz?? pe tumblr",
                ru: "???????????????????? ???? tumblr",
                sk: "Zdie??a?? na tumblr",
                sl: "Deli na tumblr",
                sr: "Podeli na tumblr-u",
                sv: "Dela p?? tumblr",
                tr: "tumblr'ta payla??",
                zh: "???tumblr?????????"
            },
            shareUrl: "http://tumblr.com/widgets/share/tool?canonicalUrl=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(0),
        a = function(e, t) {
            var r = document.createElement("div");
            r.innerHTML = e;
            var n = r.textContent;
            if (n.length <= t) return e;
            var a = n.substring(0, t - 1).lastIndexOf(" ");
            return n = n.substring(0, a) + "???"
        };
    e.exports = function(e) {
        var t = n.parse("https://twitter.com/intent/tweet", !0),
            r = e.getTitle();
        return t.query.text = a(r, 120), t.query.url = e.getURL(), null !== e.options.twitterVia && (t.query.via = e.options.twitterVia), delete t.search, {
            popup: !0,
            shareText: {
                en: "tweet",
                zh: "??????"
            },
            name: "twitter",
            faName: "fa-twitter",
            title: {
                bg: "?????????????? ?? Twitter",
                da: "Del p?? Twitter",
                de: "Bei Twitter teilen",
                en: "Share on Twitter",
                es: "Compartir en Twitter",
                fi: "Jaa Twitteriss??",
                fr: "Partager sur Twitter",
                hr: "Podijelite na Twitteru",
                hu: "Megoszt??s Twitteren",
                it: "Condividi su Twitter",
                ja: "???????????????????????????",
                ko: "??????????????? ????????????",
                nl: "Delen op Twitter",
                no: "Del p?? Twitter",
                pl: "Udost??pnij na Twitterze",
                pt: "Compartilhar no Twitter",
                ro: "Partajeaz?? pe Twitter",
                ru: "???????????????????? ???? Twitter",
                sk: "Zdie??a?? na Twitteri",
                sl: "Deli na Twitterju",
                sr: "Podeli na Twitter-u",
                sv: "Dela p?? Twitter",
                tr: "Twitter'da payla??",
                zh: "???Twitter?????????"
            },
            shareUrl: n.format(t) + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "weibo",
            faName: "fa-weibo",
            title: {
                de: "Bei weibo teilen",
                en: "Share on weibo",
                zh: "?????????????????????"
            },
            shareUrl: "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(e.getURL()) + "&title=" + e.getTitle() + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL()),
            r = e.getTitle();
        return {
            popup: !1,
            shareText: {
                bg: "c????????????????",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megoszt??s",
                it: "condividi",
                ja: "??????",
                ko: "????????????",
                nl: "delen",
                no: "del",
                pl: "udost??pnij",
                pt: "compartilhar",
                ro: "partajeaz??",
                ru: "????????????????????",
                sk: "zdie??a??",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "payla??",
                zh: "??????"
            },
            name: "whatsapp",
            faName: "fa-whatsapp",
            title: {
                bg: "?????????????? ?? Whatsapp",
                da: "Del p?? Whatsapp",
                de: "Bei Whatsapp teilen",
                en: "Share on Whatsapp",
                es: "Compartir en Whatsapp",
                fi: "Jaa WhatsAppiss??",
                fr: "Partager sur Whatsapp",
                hr: "Podijelite na Whatsapp",
                hu: "Megoszt??s WhatsAppen",
                it: "Condividi su Whatsapp",
                ja: "Whatsapp????????????",
                ko: "Whatsapp?????? ????????????",
                nl: "Delen op Whatsapp",
                no: "Del p?? Whatsapp",
                pl: "Udost??pnij przez WhatsApp",
                pt: "Compartilhar no Whatsapp",
                ro: "Partajeaz?? pe Whatsapp",
                ru: "???????????????????? ???? Whatsapp",
                sk: "Zdie??a?? na Whatsapp",
                sl: "Deli na Whatsapp",
                sr: "Podeli na WhatsApp-u",
                sv: "Dela p?? Whatsapp",
                tr: "Whatsapp'ta payla??",
                zh: "???Whatsapp?????????"
            },
            shareUrl: "whatsapp://send?text=" + encodeURIComponent(r) + "%20" + t + e.getReferrerTrack()
        }
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                de: "teilen",
                en: "share",
                es: "compartir",
                fr: "partager",
                it: "condividi",
                da: "del",
                nl: "delen",
                zh: "??????"
            },
            name: "xing",
            faName: "fa-xing",
            title: {
                de: "Bei XING teilen",
                en: "Share on XING",
                es: "Compartir en XING",
                fr: "Partager sur XING",
                it: "Condividi su XING",
                da: "Del p?? XING",
                nl: "Delen op XING",
                zh: "?????????XING"
            },
            shareUrl: "https://www.xing.com/social_plugins/share?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}, , , function(e, t, r) {
    "use strict";
    r(34), e.exports = r(2)
}, function(e, t) {}]);