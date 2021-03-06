! function(a) {
    var b = {
        keyboardShortcuts: {
            enabled: !0,
            distance: 50
        },
        scrollWheel: {
            enabled: !0,
            factor: 1
        },
        scrollZones: {
            enabled: !0,
            speed: 15
        },
        dragging: {
            enabled: !0,
            momentum: .875,
            threshold: 10
        },
        excludeSelector: "input:focus, select:focus, textarea:focus, audio, video, iframe",
        linkScrollSpeed: 1e3
    };
    skel.breakpoints({
        xlarge: "(max-width: 1680px)",
        large: "(max-width: 1280px)",
        medium: "(max-width: 980px)",
        small: "(max-width: 736px)",
        xsmall: "(max-width: 480px)",
        xxsmall: "(max-width: 360px)",
        short: "(min-aspect-ratio: 16/7)",
        xshort: "(min-aspect-ratio: 16/6)"
    }), a(function() {
        var c = a(window),
            d = a(document),
            e = a("body"),
            f = a("html"),
            g = a("body,html"),
            h = a("#wrapper");
        e.addClass("is-loading"), c.on("load", function() {
            window.setTimeout(function() {
                e.removeClass("is-loading")
            }, 100)
        }), skel.vars.mobile && (b.keyboardShortcuts.enabled = !1, b.scrollWheel.enabled = !1, b.scrollZones.enabled = !1, b.dragging.enabled = !1, e.css("overflow-x", "auto")), "ie" == skel.vars.browser && (e.addClass("is-ie"), c.on("load resize", function() {
            var b = 0;
            h.children().each(function() {
                b += a(this).width()
            }), f.css("width", b + "px")
        })), skel.canUse("object-fit") || a(".image[data-position]").each(function() {
            var b = a(this),
                c = b.children("img");
            b.css("background-image", 'url("' + c.attr("src") + '")').css("background-position", b.data("position")).css("background-size", "cover").css("background-repeat", "no-repeat"), c.css("opacity", "0")
        }), b.keyboardShortcuts.enabled && function() {
            h.on("keypress keyup keydown", b.excludeSelector, function(a) {
                a.stopPropagation()
            }), c.on("keydown", function(a) {
                var e = !1;
                switch (a.keyCode) {
                    case 37:
                        d.scrollLeft(d.scrollLeft() - b.keyboardShortcuts.distance), e = !0;
                        break;
                    case 39:
                        d.scrollLeft(d.scrollLeft() + b.keyboardShortcuts.distance), e = !0;
                        break;
                    case 33:
                        d.scrollLeft(d.scrollLeft() - c.width() + 100), e = !0;
                        break;
                    case 34:
                    case 32:
                        d.scrollLeft(d.scrollLeft() + c.width() - 100), e = !0;
                        break;
                    case 36:
                        d.scrollLeft(0), e = !0;
                        break;
                    case 35:
                        d.scrollLeft(d.width()), e = !0
                }
                e && (a.preventDefault(), a.stopPropagation(), g.stop())
            })
        }(), b.scrollWheel.enabled && function() {
            var a = function(a) {
                var b = 10,
                    c = 40,
                    d = 800,
                    e = 0,
                    f = 0,
                    g = 0,
                    h = 0;
                return "detail" in a ? f = a.detail : "wheelDelta" in a ? f = a.wheelDelta / -120 : "wheelDeltaY" in a && (f = a.wheelDeltaY / -120), "wheelDeltaX" in a && (e = a.wheelDeltaX / -120), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (e = f, f = 0), g = e * b, h = f * b, "deltaY" in a && (h = a.deltaY), "deltaX" in a && (g = a.deltaX), (g || h) && a.deltaMode && (1 == a.deltaMode ? (g *= c, h *= c) : (g *= d, h *= d)), g && !e && (e = g < 1 ? -1 : 1), h && !f && (f = h < 1 ? -1 : 1), {
                    spinX: e,
                    spinY: f,
                    pixelX: g,
                    pixelY: h
                }
            };
            e.on("wheel", function(c) {
                if (!skel.breakpoint("small").active) {
                    c.preventDefault(), c.stopPropagation(), g.stop();
                    var e = a(c.originalEvent),
                        f = 0 != e.pixelX ? e.pixelX : e.pixelY,
                        h = Math.min(Math.abs(f), 150) * b.scrollWheel.factor,
                        i = f > 0 ? 1 : -1;
                    d.scrollLeft(d.scrollLeft() + h * i)
                }
            })
        }(), b.scrollZones.enabled && function() {
            var k, c = a('<div class="scrollZone left"></div>'),
                e = a('<div class="scrollZone right"></div>'),
                f = c.add(e),
                i = !1,
                j = null,
                l = function(a) {
                    skel.breakpoint("small").active || i || (g.stop(), k = a, clearInterval(j), j = setInterval(function() {
                        d.scrollLeft(d.scrollLeft() + b.scrollZones.speed * k)
                    }, 25))
                },
                m = function() {
                    i = !1, clearInterval(j)
                };
            f.appendTo(h).on("mouseleave mousedown", function(a) {
                m()
            }), c.css("left", "0").on("mouseenter", function(a) {
                l(-1)
            }), e.css("right", "0").on("mouseenter", function(a) {
                l(1)
            }), h.on("---pauseScrollZone", function(a) {
                i = !0, setTimeout(function() {
                    i = !1
                }, 500)
            })
        }(), b.dragging.enabled && function() {
            var f, i, j, k, l, m, n, o, a = !1,
                c = !1,
                e = 0;
            h.on("mouseup mousemove mousedown", ".image, img", function(a) {
                a.preventDefault()
            }).on("mouseup mousemove mousedown", b.excludeSelector, function(b) {
                b.stopPropagation(), a = !1, h.removeClass("is-dragging"), clearInterval(j), clearInterval(i), h.triggerHandler("---pauseScrollZone")
            }).on("mousedown", function(b) {
                skel.breakpoint("small").active || (clearInterval(i), g.stop(), a = !0, h.addClass("is-dragging"), f = d.scrollLeft(), k = b.clientX, m = k, l = k, e = 0, o = 0, clearInterval(j), j = setInterval(function() {
                    n = Math.abs(l - m), o = l > m ? -1 : 1, m = l
                }, 50))
            }).on("mousemove", function(g) {
                a && (l = g.clientX, d.scrollLeft(f + (k - l)), e = Math.abs(f - d.scrollLeft()), !c && e > b.dragging.threshold && (h.addClass("is-dragged"), c = !0))
            }).on("mouseup mouseleave", function(f) {
                var g;
                a && (c && (setTimeout(function() {
                    h.removeClass("is-dragged")
                }, 100), c = !1), e > b.dragging.threshold && f.preventDefault(), a = !1, h.removeClass("is-dragging"), clearInterval(j), clearInterval(i), h.triggerHandler("---pauseScrollZone"), b.dragging.momentum > 0 && (g = n, i = setInterval(function() {
                    d.scrollLeft(d.scrollLeft() + g * o), g *= b.dragging.momentum, Math.abs(g) < 1 && clearInterval(i)
                }, 15)))
            })
        }(), h.on("mousedown mouseup", 'a[href^="#"]', function(a) {
            a.stopPropagation()
        }).on("click", 'a[href^="#"]', function(d) {
            var h, i, j, e = a(this),
                f = e.attr("href");
            "#" != f && 0 != (h = a(f)).length && (d.preventDefault(), d.stopPropagation(), skel.breakpoint("small").active ? (i = h.offset().top - Math.max(0, c.height() - h.outerHeight()) / 2, j = {
                scrollTop: i
            }) : (i = h.offset().left - Math.max(0, c.width() - h.outerWidth()) / 2, j = {
                scrollLeft: i
            }), g.stop().animate(j, b.linkScrollSpeed, "swing"))
        }), a(".gallery").on("click", "a", function(b) {
            var c = a(this),
                d = c.parents(".gallery"),
                e = d.children(".modal"),
                f = e.find("img"),
                g = c.attr("href");
            g.match(/\.(jpg|gif|png|mp4)$/) && (b.preventDefault(), b.stopPropagation(), e[0]._locked || (e[0]._locked = !0, f.attr("src", g), e.addClass("visible"), e.focus(), setTimeout(function() {
                e[0]._locked = !1
            }, 600)))
        }).on("click", ".modal", function(b) {
            var c = a(this),
                d = c.find("img");
            c[0]._locked || c.hasClass("visible") && (b.stopPropagation(), c[0]._locked = !0, c.removeClass("loaded"), setTimeout(function() {
                c.removeClass("visible"), h.triggerHandler("---pauseScrollZone"), setTimeout(function() {
                    d.attr("src", ""), c[0]._locked = !1, e.focus()
                }, 475)
            }, 125))
        }).on("keypress", ".modal", function(b) {
            var c = a(this);
            27 == b.keyCode && c.trigger("click")
        }).on("mouseup mousedown mousemove", ".modal", function(a) {
            a.stopPropagation()
        }).prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>').find("img").on("load", function(b) {
            var c = a(this),
                d = c.parents(".modal");
            setTimeout(function() {
                d.hasClass("visible") && d.addClass("loaded")
            }, 275)
        })
    })
}(jQuery);