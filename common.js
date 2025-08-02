import*as t from "../root/root.js";
import*as e from "../platform/platform.js";
export {UIString} from "../platform/platform.js";
import*as r from "../i18n/i18n.js";
import*as s from "./edge_forward/edge_forward.js";
var n = Object.freeze({
    __proto__: null
});
const i = [];
var a = Object.freeze({
    __proto__: null,
    getRegisteredAppProviders: function() {
        return i.filter((e => t.Runtime.Runtime.isDescriptorEnabled({
            experiment: void 0,
            condition: e.condition
        }))).sort(( (t, e) => (t.order || 0) - (e.order || 0)))
    },
    registerAppProvider: function(t) {
        i.push(t)
    }
});
const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , l = new Uint8Array(123);
for (let t = 0; t < 64; ++t)
    l[o.charCodeAt(t)] = t;
var h = Object.freeze({
    __proto__: null,
    BASE64_CHARS: o,
    BASE64_CODES: l,
    decode: function(t) {
        let e = 3 * t.length / 4 >>> 0;
        61 === t.charCodeAt(t.length - 2) ? e -= 2 : 61 === t.charCodeAt(t.length - 1) && (e -= 1);
        const r = new Uint8Array(e);
        for (let e = 0, s = 0; e < t.length; e += 4) {
            const n = l[t.charCodeAt(e + 0)]
              , i = l[t.charCodeAt(e + 1)]
              , a = l[t.charCodeAt(e + 2)]
              , o = l[t.charCodeAt(e + 3)];
            r[s++] = n << 2 | i >> 4,
            r[s++] = (15 & i) << 4 | a >> 2,
            r[s++] = (3 & a) << 6 | 63 & o
        }
        return r.buffer
    },
    encode: function(t) {
        return new Promise(( (e, r) => {
            const s = new FileReader;
            s.onerror = () => r(new Error("failed to convert to base64")),
            s.onload = () => {
                const t = s.result
                  , [,r] = t.split(",", 2);
                e(r)
            }
            ,
            s.readAsDataURL(new Blob([t]))
        }
        ))
    }
});
var c = Object.freeze({
    __proto__: null,
    CharacterIdMap: class {
        #t = new Map;
        #e = new Map;
        #r = 33;
        toChar(t) {
            let e = this.#t.get(t);
            if (!e) {
                if (this.#r >= 65535)
                    throw new Error("CharacterIdMap ran out of capacity!");
                e = String.fromCharCode(this.#r++),
                this.#t.set(t, e),
                this.#e.set(e, t)
            }
            return e
        }
        fromChar(t) {
            const e = this.#e.get(t);
            return void 0 === e ? null : e
        }
    }
});
const u = .9642
  , g = .8251;
class d {
    values = [0, 0, 0];
    constructor(t) {
        t && (this.values = t)
    }
}
class p {
    values = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    constructor(t) {
        t && (this.values = t)
    }
    multiply(t) {
        const e = new d;
        for (let r = 0; r < 3; ++r)
            e.values[r] = this.values[r][0] * t.values[0] + this.values[r][1] * t.values[1] + this.values[r][2] * t.values[2];
        return e
    }
}
class m {
    g;
    a;
    b;
    c;
    d;
    e;
    f;
    constructor(t, e, r=0, s=0, n=0, i=0, a=0) {
        this.g = t,
        this.a = e,
        this.b = r,
        this.c = s,
        this.d = n,
        this.e = i,
        this.f = a
    }
    eval(t) {
        const e = t < 0 ? -1 : 1
          , r = t * e;
        return r < this.d ? e * (this.c * r + this.f) : e * (Math.pow(this.a * r + this.b, this.g) + this.e)
    }
}
const y = {
    sRGB: new m(2.4,1 / 1.055,.055 / 1.055,1 / 12.92,.04045,0,0),
    sRGB_INVERSE: new m(.416667,1.13728,-0,12.92,.0031308,-.0549698,-0),
    proPhotoRGB: new m(1.8,1),
    proPhotoRGB_INVERSE: new m(.555556,1,-0,0,0,0,0),
    k2Dot2: new m(2.2,1),
    k2Dot2_INVERSE: new m(.454545,1),
    rec2020: new m(2.22222,.909672,.0903276,.222222,.0812429,0,0),
    rec2020_INVERSE: new m(.45,1.23439,-0,4.5,.018054,-.0993195,-0)
}
  , f = {
    sRGB: new p([[.436065674, .385147095, .143066406], [.222488403, .716873169, .06060791], [.013916016, .097076416, .714096069]]),
    sRGB_INVERSE: new p([[3.134112151374599, -1.6173924597114966, -.4906334036481285], [-.9787872938826594, 1.9162795854799963, .0334547139520088], [.07198304248352326, -.2289858493321844, 1.4053851325241447]]),
    displayP3: new p([[.515102, .291965, .157153], [.241182, .692236, .0665819], [-.00104941, .0418818, .784378]]),
    displayP3_INVERSE: new p([[2.404045155982687, -.9898986932663839, -.3976317191366333], [-.8422283799266768, 1.7988505115115485, .016048170293157416], [.04818705979712955, -.09737385156228891, 1.2735066448052303]]),
    adobeRGB: new p([[.60974, .20528, .14919], [.31111, .62567, .06322], [.01947, .06087, .74457]]),
    adobeRGB_INVERSE: new p([[1.9625385510109137, -.6106892546501431, -.3413827467482388], [-.9787580455521, 1.9161624707082339, .03341676594241408], [.028696263137883395, -.1406807819331586, 1.349252109991369]]),
    rec2020: new p([[.673459, .165661, .1251], [.279033, .675338, .0456288], [-.00193139, .0299794, .797162]]),
    rec2020_INVERSE: new p([[1.647275201661012, -.3936024771460771, -.23598028884792507], [-.6826176165196962, 1.647617775014935, .01281626807852422], [.029662725298529837, -.06291668721366285, 1.2533964313435522]]),
    xyz: new p([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
};
function b(t) {
    return t * (Math.PI / 180)
}
function w(t, e, r, s) {
    return [t.eval(e), t.eval(r), t.eval(s)]
}
const S = new p([[.9999999984505198, .39633779217376786, .2158037580607588], [1.0000000088817609, -.10556134232365635, -.06385417477170591], [1.0000000546724108, -.08948418209496575, -1.2914855378640917]])
  , x = new p([[.2104542553, .7936177849999999, -.0040720468], [1.9779984951000003, -2.4285922049999997, .4505937099000001], [.025904037099999982, .7827717662, -.8086757660000001]])
  , v = new p([[.8190224432164319, .3619062562801221, -.12887378261216414], [.0329836671980271, .9292868468965546, .03614466816999844], [.048177199566046255, .26423952494422764, .6335478258136937]])
  , z = new p([[1.226879873374156, -.5578149965554814, .2813910501772159], [-.040575762624313734, 1.1122868293970596, -.07171106666151703], [-.07637294974672144, -.4214933239627915, 1.586924024427242]])
  , T = new p([[.7976700747153241, .13519395152800417, .03135596341127167], [.28803902352472205, .7118744007923554, 8661179538844252e-20], [2.739876695467402e-7, -14405226518969991e-22, .825211112593861]])
  , R = new p([[1.3459533710138858, -.25561367037652133, -.051116041522131374], [-.544600415668951, 1.5081687311475767, .020535163968720935], [-13975622054109725e-22, 2717590904589903e-21, 1.2118111696814942]])
  , I = new p([[1.0478573189120088, .022907374491829943, -.050162247377152525], [.029570500050499514, .9904755577034089, -.017061518194840468], [-.00924047197558879, .015052921526981566, .7519708530777581]])
  , A = new p([[.9555366447632887, -.02306009252137888, .06321844147263304], [-.028315378228764922, 1.009951351591575, .021026001591792402], [.012308773293784308, -.02050053471777469, 1.3301947294775631]]);
class P {
    static labToXyzd50(t, e, r) {
        let s = (t + 16) / 116
          , n = s + e / 500
          , i = s - r / 200;
        function a(t) {
            return t <= 24 / 116 ? 108 / 841 * (t - 16 / 116) : t * t * t
        }
        return n = a(n) * u,
        s = 1 * a(s),
        i = a(i) * g,
        [n, s, i]
    }
    static xyzd50ToLab(t, e, r) {
        function s(t) {
            return t <= .008856451679035631 ? 841 / 108 * t + 16 / 116 : Math.pow(t, 1 / 3)
        }
        t = s(t / u);
        return [116 * (e = s(e / 1)) - 16, 500 * (t - e), 200 * (e - (r = s(r / g)))]
    }
    static oklabToXyzd65(t, e, r) {
        const s = new d([t, e, r])
          , n = S.multiply(s);
        n.values[0] = n.values[0] * n.values[0] * n.values[0],
        n.values[1] = n.values[1] * n.values[1] * n.values[1],
        n.values[2] = n.values[2] * n.values[2] * n.values[2];
        return z.multiply(n).values
    }
    static xyzd65ToOklab(t, e, r) {
        const s = new d([t, e, r])
          , n = v.multiply(s);
        n.values[0] = Math.pow(n.values[0], 1 / 3),
        n.values[1] = Math.pow(n.values[1], 1 / 3),
        n.values[2] = Math.pow(n.values[2], 1 / 3);
        const i = x.multiply(n);
        return [i.values[0], i.values[1], i.values[2]]
    }
    static lchToLab(t, e, r) {
        return void 0 === r ? [t, 0, 0] : [t, e * Math.cos(b(r)), e * Math.sin(b(r))]
    }
    static labToLch(t, e, r) {
        return [t, Math.sqrt(e * e + r * r), (s = Math.atan2(r, e),
        s * (180 / Math.PI))];
        var s
    }
    static displayP3ToXyzd50(t, e, r) {
        const [s,n,i] = w(y.sRGB, t, e, r)
          , a = new d([s, n, i]);
        return f.displayP3.multiply(a).values
    }
    static xyzd50ToDisplayP3(t, e, r) {
        const s = new d([t, e, r])
          , n = f.displayP3_INVERSE.multiply(s);
        return w(y.sRGB_INVERSE, n.values[0], n.values[1], n.values[2])
    }
    static proPhotoToXyzd50(t, e, r) {
        const [s,n,i] = w(y.proPhotoRGB, t, e, r)
          , a = new d([s, n, i]);
        return T.multiply(a).values
    }
    static xyzd50ToProPhoto(t, e, r) {
        const s = new d([t, e, r])
          , n = R.multiply(s);
        return w(y.proPhotoRGB_INVERSE, n.values[0], n.values[1], n.values[2])
    }
    static adobeRGBToXyzd50(t, e, r) {
        const [s,n,i] = w(y.k2Dot2, t, e, r)
          , a = new d([s, n, i]);
        return f.adobeRGB.multiply(a).values
    }
    static xyzd50ToAdobeRGB(t, e, r) {
        const s = new d([t, e, r])
          , n = f.adobeRGB_INVERSE.multiply(s);
        return w(y.k2Dot2_INVERSE, n.values[0], n.values[1], n.values[2])
    }
    static rec2020ToXyzd50(t, e, r) {
        const [s,n,i] = w(y.rec2020, t, e, r)
          , a = new d([s, n, i]);
        return f.rec2020.multiply(a).values
    }
    static xyzd50ToRec2020(t, e, r) {
        const s = new d([t, e, r])
          , n = f.rec2020_INVERSE.multiply(s);
        return w(y.rec2020_INVERSE, n.values[0], n.values[1], n.values[2])
    }
    static xyzd50ToD65(t, e, r) {
        const s = new d([t, e, r]);
        return A.multiply(s).values
    }
    static xyzd65ToD50(t, e, r) {
        const s = new d([t, e, r]);
        return I.multiply(s).values
    }
    static xyzd50TosRGBLinear(t, e, r) {
        const s = new d([t, e, r]);
        return f.sRGB_INVERSE.multiply(s).values
    }
    static srgbLinearToXyzd50(t, e, r) {
        const s = new d([t, e, r]);
        return f.sRGB.multiply(s).values
    }
    static srgbToXyzd50(t, e, r) {
        const [s,n,i] = w(y.sRGB, t, e, r)
          , a = new d([s, n, i]);
        return f.sRGB.multiply(a).values
    }
    static xyzd50ToSrgb(t, e, r) {
        const s = new d([t, e, r])
          , n = f.sRGB_INVERSE.multiply(s);
        return w(y.sRGB_INVERSE, n.values[0], n.values[1], n.values[2])
    }
    static oklchToXyzd50(t, e, r) {
        const [s,n,i] = P.lchToLab(t, e, r)
          , [a,o,l] = P.oklabToXyzd65(s, n, i);
        return P.xyzd65ToD50(a, o, l)
    }
    static xyzd50ToOklch(t, e, r) {
        const [s,n,i] = P.xyzd50ToD65(t, e, r)
          , [a,o,l] = P.xyzd65ToOklab(s, n, i);
        return P.labToLch(a, o, l)
    }
}
var E = Object.freeze({
    __proto__: null,
    ColorConverter: P
});
function k(t, e) {
    const r = t[3];
    return [(1 - r) * e[0] + r * t[0], (1 - r) * e[1] + r * t[1], (1 - r) * e[2] + r * t[2], r + e[3] * (1 - r)]
}
function C([t,e,r]) {
    const s = Math.max(t, e, r)
      , n = Math.min(t, e, r)
      , i = s - n;
    let a;
    return a = n === s ? 0 : t === s ? (1 / 6 * (e - r) / i + 1) % 1 : e === s ? 1 / 6 * (r - t) / i + 1 / 3 : 1 / 6 * (t - e) / i + 2 / 3,
    a
}
function L(t) {
    const [e,r,s] = _([...t, void 0]);
    return [e, r, s]
}
function _([t,e,r,s]) {
    const n = Math.max(t, e, r)
      , i = Math.min(t, e, r)
      , a = n - i
      , o = n + i
      , l = .5 * o;
    let h;
    return h = 0 === l || 1 === l ? 0 : l <= .5 ? a / o : a / (2 - o),
    [C([t, e, r]), h, l, s]
}
function N(t) {
    const [e,r,s] = V([...t, void 0]);
    return [e, r, s]
}
function V([t,e,r,s]) {
    const n = C([t, e, r])
      , i = Math.max(t, e, r);
    return [n, Math.min(t, e, r), 1 - i, s]
}
function O([t,e,r]) {
    return .2126 * (t <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)) + .7152 * (e <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)) + .0722 * (r <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4))
}
const B = .027;
function G([t,e,r]) {
    return .2126729 * Math.pow(t, 2.4) + .7151522 * Math.pow(e, 2.4) + .072175 * Math.pow(r, 2.4)
}
function M(t, e) {
    return X(G(k(t, e)), G(e))
}
function W(t) {
    return t > .022 ? t : t + Math.pow(.022 - t, 1.414)
}
function X(t, e) {
    if (t = W(t),
    e = W(e),
    Math.abs(t - e) < 5e-4)
        return 0;
    let r = 0;
    return e > t ? (r = 1.14 * (Math.pow(e, .56) - Math.pow(t, .57)),
    r = r < .1 ? 0 : r - B) : (r = 1.14 * (Math.pow(e, .65) - Math.pow(t, .62)),
    r = r > -.1 ? 0 : r + B),
    100 * r
}
function D(t, e, r) {
    function s() {
        return r ? Math.pow(Math.abs(Math.pow(t, .65) - (-e - B) / 1.14), 1 / .62) : Math.pow(Math.abs(Math.pow(t, .56) - (e + B) / 1.14), 1 / .57)
    }
    t = W(t),
    e /= 100;
    let n = s();
    return (n < 0 || n > 1) && (r = !r,
    n = s()),
    n
}
const F = [[12, -1, -1, -1, -1, 100, 90, 80, -1, -1], [14, -1, -1, -1, 100, 90, 80, 60, 60, -1], [16, -1, -1, 100, 90, 80, 60, 55, 50, 50], [18, -1, -1, 90, 80, 60, 55, 50, 40, 40], [24, -1, 100, 80, 60, 55, 50, 40, 38, 35], [30, -1, 90, 70, 55, 50, 40, 38, 35, 40], [36, -1, 80, 60, 50, 40, 38, 35, 30, 25], [48, 100, 70, 55, 40, 38, 35, 30, 25, 20], [60, 90, 60, 50, 38, 35, 30, 25, 20, 20], [72, 80, 55, 40, 35, 30, 25, 20, 20, 20], [96, 70, 50, 35, 30, 25, 20, 20, 20, 20], [120, 60, 40, 30, 25, 20, 20, 20, 20, 20]];
function j(t, e) {
    const r = 72 * parseFloat(t.replace("px", "")) / 96;
    return (isNaN(Number(e)) ? ["bold", "bolder"].includes(e) : Number(e) >= 600) ? r >= 14 : r >= 18
}
F.reverse();
const U = {
    aa: 3,
    aaa: 4.5
}
  , $ = {
    aa: 4.5,
    aaa: 7
};
var H = Object.freeze({
    __proto__: null,
    blendColors: k,
    contrastRatio: function(t, e) {
        const r = O(k(t, e))
          , s = O(e);
        return (Math.max(r, s) + .05) / (Math.min(r, s) + .05)
    },
    contrastRatioAPCA: M,
    contrastRatioByLuminanceAPCA: X,
    desiredLuminanceAPCA: D,
    getAPCAThreshold: function(t, e) {
        const r = parseFloat(t.replace("px", ""))
          , s = parseFloat(e);
        for (const [t,...e] of F)
            if (r >= t)
                for (const [t,r] of [900, 800, 700, 600, 500, 400, 300, 200, 100].entries())
                    if (s >= r) {
                        const r = e[e.length - 1 - t];
                        return -1 === r ? null : r
                    }
        return null
    },
    getContrastThreshold: function(t, e) {
        return j(t, e) ? U : $
    },
    isLargeFont: j,
    luminance: O,
    luminanceAPCA: G,
    rgbToHsl: L,
    rgbToHwb: N,
    rgbaToHsla: _,
    rgbaToHwba: V
});
function q(t) {
    return (t % 360 + 360) % 360
}
function Y(t) {
    const e = t.replace(/(deg|g?rad|turn)$/, "");
    if (isNaN(e) || t.match(/\s+(deg|g?rad|turn)/))
        return null;
    const r = parseFloat(e);
    return t.includes("turn") ? 360 * r : t.includes("grad") ? 9 * r / 10 : t.includes("rad") ? 180 * r / Math.PI : r
}
function Z(t) {
    switch (t) {
    case "srgb":
        return "srgb";
    case "srgb-linear":
        return "srgb-linear";
    case "display-p3":
        return "display-p3";
    case "a98-rgb":
        return "a98-rgb";
    case "prophoto-rgb":
        return "prophoto-rgb";
    case "rec2020":
        return "rec2020";
    case "xyz":
        return "xyz";
    case "xyz-d50":
        return "xyz-d50";
    case "xyz-d65":
        return "xyz-d65"
    }
    return null
}
function K(t, e) {
    const r = Math.sign(t)
      , s = Math.abs(t)
      , [n,i] = e;
    return r * (s * (i - n) / 100 + n)
}
function J(t, {min: e, max: r}) {
    return null === t || (void 0 !== e && (t = Math.max(t, e)),
    void 0 !== r && (t = Math.min(t, r))),
    t
}
function Q(t, e) {
    if (!t.endsWith("%"))
        return null;
    const r = parseFloat(t.substr(0, t.length - 1));
    return isNaN(r) ? null : K(r, e)
}
function tt(t) {
    const e = parseFloat(t);
    return isNaN(e) ? null : e
}
function et(t) {
    return void 0 === t ? null : J(Q(t, [0, 1]) ?? tt(t), {
        min: 0,
        max: 1
    })
}
function rt(t, e=[0, 1]) {
    if (isNaN(t.replace("%", "")))
        return null;
    const r = parseFloat(t);
    return -1 !== t.indexOf("%") ? t.indexOf("%") !== t.length - 1 ? null : K(r, e) : r
}
function st(t) {
    const e = rt(t);
    return null === e ? null : -1 !== t.indexOf("%") ? e : e / 255
}
function nt(t) {
    const e = t.replace(/(deg|g?rad|turn)$/, "");
    if (isNaN(e) || t.match(/\s+(deg|g?rad|turn)/))
        return null;
    const r = parseFloat(e);
    return -1 !== t.indexOf("turn") ? r % 1 : -1 !== t.indexOf("grad") ? r / 400 % 1 : -1 !== t.indexOf("rad") ? r / (2 * Math.PI) % 1 : r / 360 % 1
}
function it(t) {
    if (t.indexOf("%") !== t.length - 1 || isNaN(t.replace("%", "")))
        return null;
    return parseFloat(t) / 100
}
function at(t) {
    const e = t[0];
    let r = t[1];
    const s = t[2];
    function n(t, e, r) {
        return r < 0 ? r += 1 : r > 1 && (r -= 1),
        6 * r < 1 ? t + (e - t) * r * 6 : 2 * r < 1 ? e : 3 * r < 2 ? t + (e - t) * (2 / 3 - r) * 6 : t
    }
    let i;
    r < 0 && (r = 0),
    i = s <= .5 ? s * (1 + r) : s + r - s * r;
    const a = 2 * s - i
      , o = e
      , l = e - 1 / 3;
    return [n(a, i, e + 1 / 3), n(a, i, o), n(a, i, l), t[3]]
}
function ot(t) {
    return at(function(t) {
        const e = t[0];
        let r = t[1];
        const s = t[2]
          , n = (2 - r) * s;
        return 0 === s || 0 === r ? r = 0 : r *= s / (n < 1 ? n : 2 - n),
        [e, r, n / 2, t[3]]
    }(t))
}
function lt(t, e, r) {
    function s() {
        return r ? (t + .05) * e - .05 : (t + .05) / e - .05
    }
    let n = s();
    return (n < 0 || n > 1) && (r = !r,
    n = s()),
    n
}
function ht(t, e, r, s) {
    let n = t[e]
      , i = 1
      , a = s(t) - r
      , o = Math.sign(a);
    for (let l = 100; l; l--) {
        if (Math.abs(a) < 2e-4)
            return t[e] = n,
            n;
        const l = Math.sign(a);
        if (l !== o)
            i /= 2,
            o = l;
        else if (n < 0 || n > 1)
            return null;
        n += i * (2 === e ? -a : a),
        t[e] = n,
        a = s(t) - r
    }
    return null
}
function ct(t, e, r=.01) {
    if (Array.isArray(t) && Array.isArray(e)) {
        if (t.length !== e.length)
            return !1;
        for (const r in t)
            if (!ct(t[r], e[r]))
                return !1;
        return !0
    }
    return !Array.isArray(t) && !Array.isArray(e) && (null === t || null === e ? t === e : Math.abs(t - e) < r)
}
function ut(t, e, r=.01) {
    return t - e <= r
}
class gt {
    l;
    a;
    b;
    alpha;
    #s;
    #n;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => new ft(...L(t.#a(!1)),t.alpha),
        hsla: t => new ft(...L(t.#a(!1)),t.alpha),
        hwb: t => new bt(...N(t.#a(!1)),t.alpha),
        hwba: t => new bt(...N(t.#a(!1)),t.alpha),
        lch: t => new dt(...P.labToLch(t.l, t.a, t.b),t.alpha),
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => t,
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.labToXyzd50(this.l, this.a, this.b)
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, r, s, n) {
        this.#n = [t, e, r],
        this.l = J(t, {
            min: 0,
            max: 100
        }),
        (ct(this.l, 0, 1) || ct(this.l, 100, 1)) && (e = r = 0),
        this.a = e,
        this.b = r,
        this.alpha = J(s, {
            min: 0,
            max: 1
        }),
        this.#s = n
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return gt.#i[t](this)
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    equal(t) {
        const e = t.as("lab");
        return ct(e.l, this.l, 1) && ct(e.a, this.a) && ct(e.b, this.b) && ct(e.alpha, this.alpha)
    }
    format() {
        return "lab"
    }
    setAlpha(t) {
        return new gt(this.l,this.a,this.b,t,void 0)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.a, this.b)
    }
    #l(t, r, s) {
        const n = null === this.alpha || ct(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `lab(${e.StringUtilities.stringifyWithPrecision(t, 0)} ${e.StringUtilities.stringifyWithPrecision(r)} ${e.StringUtilities.stringifyWithPrecision(s)}${n})`
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return !1
    }
    static fromSpec(t, e) {
        const r = Q(t[0], [0, 100]) ?? tt(t[0]);
        if (null === r)
            return null;
        const s = Q(t[1], [0, 125]) ?? tt(t[1]);
        if (null === s)
            return null;
        const n = Q(t[2], [0, 125]) ?? tt(t[2]);
        if (null === n)
            return null;
        const i = et(t[3]);
        return new gt(r,s,n,i,e)
    }
}
class dt {
    #n;
    l;
    c;
    h;
    alpha;
    #s;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => new ft(...L(t.#a(!1)),t.alpha),
        hsla: t => new ft(...L(t.#a(!1)),t.alpha),
        hwb: t => new bt(...N(t.#a(!1)),t.alpha),
        hwba: t => new bt(...N(t.#a(!1)),t.alpha),
        lch: t => t,
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.lchToLab(t.l, t.c, t.h),t.alpha),
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.labToXyzd50(...P.lchToLab(this.l, this.c, this.h))
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, r, s, n) {
        this.#n = [t, e, r],
        this.l = J(t, {
            min: 0,
            max: 100
        }),
        e = ct(this.l, 0, 1) || ct(this.l, 100, 1) ? 0 : e,
        this.c = J(e, {
            min: 0
        }),
        r = ct(e, 0) ? 0 : r,
        this.h = q(r),
        this.alpha = J(s, {
            min: 0,
            max: 1
        }),
        this.#s = n
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return dt.#i[t](this)
    }
    equal(t) {
        const e = t.as("lch");
        return ct(e.l, this.l, 1) && ct(e.c, this.c) && ct(e.h, this.h) && ct(e.alpha, this.alpha)
    }
    format() {
        return "lch"
    }
    setAlpha(t) {
        return new dt(this.l,this.c,this.h,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.c, this.h)
    }
    #l(t, r, s) {
        const n = null === this.alpha || ct(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `lch(${e.StringUtilities.stringifyWithPrecision(t, 0)} ${e.StringUtilities.stringifyWithPrecision(r)} ${e.StringUtilities.stringifyWithPrecision(s)}${n})`
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return !1
    }
    isHuePowerless() {
        return ct(this.c, 0)
    }
    static fromSpec(t, e) {
        const r = Q(t[0], [0, 100]) ?? tt(t[0]);
        if (null === r)
            return null;
        const s = Q(t[1], [0, 150]) ?? tt(t[1]);
        if (null === s)
            return null;
        const n = Y(t[2]);
        if (null === n)
            return null;
        const i = et(t[3]);
        return new dt(r,s,n,i,e)
    }
}
class pt {
    #n;
    l;
    a;
    b;
    alpha;
    #s;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => new ft(...L(t.#a(!1)),t.alpha),
        hsla: t => new ft(...L(t.#a(!1)),t.alpha),
        hwb: t => new bt(...N(t.#a(!1)),t.alpha),
        hwba: t => new bt(...N(t.#a(!1)),t.alpha),
        lch: t => new dt(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => t,
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.xyzd65ToD50(...P.oklabToXyzd65(this.l, this.a, this.b))
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, r, s, n) {
        this.#n = [t, e, r],
        this.l = J(t, {
            min: 0,
            max: 1
        }),
        (ct(this.l, 0) || ct(this.l, 1)) && (e = r = 0),
        this.a = e,
        this.b = r,
        this.alpha = J(s, {
            min: 0,
            max: 1
        }),
        this.#s = n
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return pt.#i[t](this)
    }
    equal(t) {
        const e = t.as("oklab");
        return ct(e.l, this.l) && ct(e.a, this.a) && ct(e.b, this.b) && ct(e.alpha, this.alpha)
    }
    format() {
        return "oklab"
    }
    setAlpha(t) {
        return new pt(this.l,this.a,this.b,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.a, this.b)
    }
    #l(t, r, s) {
        const n = null === this.alpha || ct(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `oklab(${e.StringUtilities.stringifyWithPrecision(t)} ${e.StringUtilities.stringifyWithPrecision(r)} ${e.StringUtilities.stringifyWithPrecision(s)}${n})`
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return !1
    }
    static fromSpec(t, e) {
        const r = Q(t[0], [0, 1]) ?? tt(t[0]);
        if (null === r)
            return null;
        const s = Q(t[1], [0, .4]) ?? tt(t[1]);
        if (null === s)
            return null;
        const n = Q(t[2], [0, .4]) ?? tt(t[2]);
        if (null === n)
            return null;
        const i = et(t[3]);
        return new pt(r,s,n,i,e)
    }
}
class mt {
    #n;
    l;
    c;
    h;
    alpha;
    #s;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => new ft(...L(t.#a(!1)),t.alpha),
        hsla: t => new ft(...L(t.#a(!1)),t.alpha),
        hwb: t => new bt(...N(t.#a(!1)),t.alpha),
        hwba: t => new bt(...N(t.#a(!1)),t.alpha),
        lch: t => new dt(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => t,
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.oklchToXyzd50(this.l, this.c, this.h)
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, r, s, n) {
        this.#n = [t, e, r],
        this.l = J(t, {
            min: 0,
            max: 1
        }),
        e = ct(this.l, 0) || ct(this.l, 1) ? 0 : e,
        this.c = J(e, {
            min: 0
        }),
        r = ct(e, 0) ? 0 : r,
        this.h = q(r),
        this.alpha = J(s, {
            min: 0,
            max: 1
        }),
        this.#s = n
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return mt.#i[t](this)
    }
    equal(t) {
        const e = t.as("oklch");
        return ct(e.l, this.l) && ct(e.c, this.c) && ct(e.h, this.h) && ct(e.alpha, this.alpha)
    }
    format() {
        return "oklch"
    }
    setAlpha(t) {
        return new mt(this.l,this.c,this.h,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.c, this.h)
    }
    #l(t, r, s) {
        const n = null === this.alpha || ct(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `oklch(${e.StringUtilities.stringifyWithPrecision(t)} ${e.StringUtilities.stringifyWithPrecision(r)} ${e.StringUtilities.stringifyWithPrecision(s)}${n})`
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return !1
    }
    static fromSpec(t, e) {
        const r = Q(t[0], [0, 1]) ?? tt(t[0]);
        if (null === r)
            return null;
        const s = Q(t[1], [0, .4]) ?? tt(t[1]);
        if (null === s)
            return null;
        const n = Y(t[2]);
        if (null === n)
            return null;
        const i = et(t[3]);
        return new mt(r,s,n,i,e)
    }
}
class yt {
    #n;
    p0;
    p1;
    p2;
    alpha;
    colorSpace;
    #s;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => new ft(...L(t.#a(!1)),t.alpha),
        hsla: t => new ft(...L(t.#a(!1)),t.alpha),
        hwb: t => new bt(...N(t.#a(!1)),t.alpha),
        hwba: t => new bt(...N(t.#a(!1)),t.alpha),
        lch: t => new dt(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        const [t,e,r] = this.#n;
        switch (this.colorSpace) {
        case "srgb":
            return P.srgbToXyzd50(t, e, r);
        case "srgb-linear":
            return P.srgbLinearToXyzd50(t, e, r);
        case "display-p3":
            return P.displayP3ToXyzd50(t, e, r);
        case "a98-rgb":
            return P.adobeRGBToXyzd50(t, e, r);
        case "prophoto-rgb":
            return P.proPhotoToXyzd50(t, e, r);
        case "rec2020":
            return P.rec2020ToXyzd50(t, e, r);
        case "xyz-d50":
            return [t, e, r];
        case "xyz":
        case "xyz-d65":
            return P.xyzd65ToD50(t, e, r)
        }
        throw new Error("Invalid color space")
    }
    #a(t=!0) {
        const [e,r,s] = this.#n
          , n = "srgb" === this.colorSpace ? [e, r, s] : [...P.xyzd50ToSrgb(...this.#o())];
        return t ? [...n, this.alpha ?? void 0] : n
    }
    constructor(t, e, r, s, n, i) {
        this.#n = [e, r, s],
        this.colorSpace = t,
        this.#s = i,
        "xyz-d50" !== this.colorSpace && "xyz-d65" !== this.colorSpace && "xyz" !== this.colorSpace && (e = J(e, {
            min: 0,
            max: 1
        }),
        r = J(r, {
            min: 0,
            max: 1
        }),
        s = J(s, {
            min: 0,
            max: 1
        })),
        this.p0 = e,
        this.p1 = r,
        this.p2 = s,
        this.alpha = J(n, {
            min: 0,
            max: 1
        })
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return this.colorSpace === t ? this : yt.#i[t](this)
    }
    equal(t) {
        const e = t.as(this.colorSpace);
        return ct(this.p0, e.p0) && ct(this.p1, e.p1) && ct(this.p2, e.p2) && ct(this.alpha, e.alpha)
    }
    format() {
        return this.colorSpace
    }
    setAlpha(t) {
        return new yt(this.colorSpace,this.p0,this.p1,this.p2,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.p0, this.p1, this.p2)
    }
    #l(t, r, s) {
        const n = null === this.alpha || ct(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `color(${this.colorSpace} ${e.StringUtilities.stringifyWithPrecision(t)} ${e.StringUtilities.stringifyWithPrecision(r)} ${e.StringUtilities.stringifyWithPrecision(s)}${n})`
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return "xyz-d50" !== this.colorSpace && "xyz-d65" !== this.colorSpace && "xyz" !== this.colorSpace && !ct(this.#n, [this.p0, this.p1, this.p2])
    }
    static fromSpec(t, e) {
        const [r,s] = e.split("/", 2)
          , n = r.trim().split(/\s+/)
          , [i,...a] = n
          , o = Z(i);
        if (!o)
            return null;
        if (0 === a.length && void 0 === s)
            return new yt(o,0,0,0,null,t);
        if (0 === a.length && void 0 !== s && s.trim().split(/\s+/).length > 1)
            return null;
        if (a.length > 3)
            return null;
        const l = a.map((t => "none" === t ? "0" : t)).map((t => rt(t, [0, 1])));
        if (l.includes(null))
            return null;
        const h = s ? rt(s, [0, 1]) ?? 1 : 1
          , c = [l[0] ?? 0, l[1] ?? 0, l[2] ?? 0, h];
        return new yt(o,...c,t)
    }
}
class ft {
    h;
    s;
    l;
    alpha;
    #n;
    #s;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => t,
        hsla: t => t,
        hwb: t => new bt(...N(t.#a(!1)),t.alpha),
        hwba: t => new bt(...N(t.#a(!1)),t.alpha),
        lch: t => new dt(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #a(t=!0) {
        const e = at([this.h, this.s, this.l, 0]);
        return t ? [e[0], e[1], e[2], this.alpha ?? void 0] : [e[0], e[1], e[2]]
    }
    #o() {
        const t = this.#a(!1);
        return P.srgbToXyzd50(t[0], t[1], t[2])
    }
    constructor(t, e, r, s, n) {
        this.#n = [t, e, r],
        this.l = J(r, {
            min: 0,
            max: 1
        }),
        e = ct(this.l, 0) || ct(this.l, 1) ? 0 : e,
        this.s = J(e, {
            min: 0,
            max: 1
        }),
        t = ct(this.s, 0) ? 0 : t,
        this.h = q(360 * t) / 360,
        this.alpha = J(s ?? null, {
            min: 0,
            max: 1
        }),
        this.#s = n
    }
    equal(t) {
        const e = t.as("hsl");
        return ct(this.h, e.h) && ct(this.s, e.s) && ct(this.l, e.l) && ct(this.alpha, e.alpha)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.h, this.s, this.l)
    }
    #l(t, r, s) {
        const n = e.StringUtilities.sprintf("hsl(%sdeg %s% %s%", e.StringUtilities.stringifyWithPrecision(360 * t), e.StringUtilities.stringifyWithPrecision(100 * r), e.StringUtilities.stringifyWithPrecision(100 * s));
        return null !== this.alpha && 1 !== this.alpha ? n + e.StringUtilities.sprintf(" / %s%)", e.StringUtilities.stringifyWithPrecision(100 * this.alpha)) : n + ")"
    }
    setAlpha(t) {
        return new ft(this.h,this.s,this.l,t)
    }
    format() {
        return null === this.alpha || 1 === this.alpha ? "hsl" : "hsla"
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return t === this.format() ? this : ft.#i[t](this)
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return !ut(this.#n[1], 1) || !ut(0, this.#n[1])
    }
    static fromSpec(t, e) {
        const r = nt(t[0]);
        if (null === r)
            return null;
        const s = it(t[1]);
        if (null === s)
            return null;
        const n = it(t[2]);
        if (null === n)
            return null;
        const i = et(t[3]);
        return new ft(r,s,n,i,e)
    }
    hsva() {
        const t = this.s * (this.l < .5 ? this.l : 1 - this.l);
        return [this.h, 0 !== t ? 2 * t / (this.l + t) : 0, this.l + t, this.alpha ?? 1]
    }
    canonicalHSLA() {
        return [Math.round(360 * this.h), Math.round(100 * this.s), Math.round(100 * this.l), this.alpha ?? 1]
    }
}
class bt {
    h;
    w;
    b;
    alpha;
    #n;
    #s;
    static #i = {
        hex: t => new zt(t.#a(!1),"hex"),
        hexa: t => new zt(t.#a(!0),"hexa"),
        rgb: t => new zt(t.#a(!1),"rgb"),
        rgba: t => new zt(t.#a(!0),"rgba"),
        hsl: t => new ft(...L(t.#a(!1)),t.alpha),
        hsla: t => new ft(...L(t.#a(!1)),t.alpha),
        hwb: t => t,
        hwba: t => t,
        lch: t => new dt(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #a(t=!0) {
        const e = function(t) {
            const e = t[0]
              , r = t[1]
              , s = t[2]
              , n = r / (r + s);
            let i = [n, n, n, t[3]];
            if (r + s < 1) {
                i = at([e, 1, .5, t[3]]);
                for (let t = 0; t < 3; ++t)
                    i[t] += r - (r + s) * i[t]
            }
            return i
        }([this.h, this.w, this.b, 0]);
        return t ? [e[0], e[1], e[2], this.alpha ?? void 0] : [e[0], e[1], e[2]]
    }
    #o() {
        const t = this.#a(!1);
        return P.srgbToXyzd50(t[0], t[1], t[2])
    }
    constructor(t, e, r, s, n) {
        if (this.#n = [t, e, r],
        this.w = J(e, {
            min: 0,
            max: 1
        }),
        this.b = J(r, {
            min: 0,
            max: 1
        }),
        t = ut(1, this.w + this.b) ? 0 : t,
        this.h = q(360 * t) / 360,
        this.alpha = J(s, {
            min: 0,
            max: 1
        }),
        ut(1, this.w + this.b)) {
            const t = this.w / this.b;
            this.b = 1 / (1 + t),
            this.w = 1 - this.b
        }
        this.#s = n
    }
    equal(t) {
        const e = t.as("hwb");
        return ct(this.h, e.h) && ct(this.w, e.w) && ct(this.b, e.b) && ct(this.alpha, e.alpha)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.h, this.w, this.b)
    }
    #l(t, r, s) {
        const n = e.StringUtilities.sprintf("hwb(%sdeg %s% %s%", e.StringUtilities.stringifyWithPrecision(360 * t), e.StringUtilities.stringifyWithPrecision(100 * r), e.StringUtilities.stringifyWithPrecision(100 * s));
        return null !== this.alpha && 1 !== this.alpha ? n + e.StringUtilities.sprintf(" / %s%)", e.StringUtilities.stringifyWithPrecision(100 * this.alpha)) : n + ")"
    }
    setAlpha(t) {
        return new bt(this.h,this.w,this.b,t,this.#s)
    }
    format() {
        return null === this.alpha || ct(this.alpha, 1) ? "hwb" : "hwba"
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return t === this.format() ? this : bt.#i[t](this)
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    canonicalHWBA() {
        return [Math.round(360 * this.h), Math.round(100 * this.w), Math.round(100 * this.b), this.alpha ?? 1]
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#n)
    }
    isGamutClipped() {
        return !(ut(this.#n[1], 1) && ut(0, this.#n[1]) && ut(this.#n[2], 1) && ut(0, this.#n[2]))
    }
    static fromSpec(t, e) {
        const r = nt(t[0]);
        if (null === r)
            return null;
        const s = it(t[1]);
        if (null === s)
            return null;
        const n = it(t[2]);
        if (null === n)
            return null;
        const i = et(t[3]);
        return new bt(r,s,n,i,e)
    }
}
function wt(t) {
    return Math.round(255 * t)
}
class St {
    color;
    constructor(t) {
        this.color = t
    }
    get alpha() {
        return this.color.alpha
    }
    rgba() {
        return this.color.rgba()
    }
    equal(t) {
        return this.color.equal(t)
    }
    setAlpha(t) {
        return this.color.setAlpha(t)
    }
    format() {
        return 1 !== (this.alpha ?? 1) ? "hexa" : "hex"
    }
    as(t) {
        return this.color.as(t)
    }
    is(t) {
        return this.color.is(t)
    }
    asLegacyColor() {
        return this.color.asLegacyColor()
    }
    getAuthoredText() {
        return this.color.getAuthoredText()
    }
    getRawParameters() {
        return this.color.getRawParameters()
    }
    isGamutClipped() {
        return this.color.isGamutClipped()
    }
    asString(t) {
        if (t)
            return this.as(t).asString();
        const [e,r,s] = this.color.rgba();
        return this.stringify(e, r, s)
    }
    getAsRawString(t) {
        if (t)
            return this.as(t).getAsRawString();
        const [e,r,s] = this.getRawParameters();
        return this.stringify(e, r, s)
    }
}
class xt extends St {
    setAlpha(t) {
        return new xt(this.color.setAlpha(t))
    }
    asString(t) {
        return t && t !== this.format() ? super.as(t).asString() : super.asString()
    }
    stringify(t, r, s) {
        function n(t) {
            return (Math.round(255 * t) / 17).toString(16)
        }
        return this.color.hasAlpha() ? e.StringUtilities.sprintf("#%s%s%s%s", n(t), n(r), n(s), n(this.alpha ?? 1)).toLowerCase() : e.StringUtilities.sprintf("#%s%s%s", n(t), n(r), n(s)).toLowerCase()
    }
}
class vt extends St {
    nickname;
    constructor(t, e) {
        super(e),
        this.nickname = t
    }
    static fromName(t, e) {
        const r = t.toLowerCase()
          , s = Rt.get(r);
        return void 0 !== s ? new vt(r,zt.fromRGBA(s, e)) : null
    }
    stringify() {
        return this.nickname
    }
    getAsRawString(t) {
        return this.color.getAsRawString(t)
    }
}
class zt {
    #n;
    #h;
    #s;
    #c;
    static #i = {
        hex: t => new zt(t.#h,"hex"),
        hexa: t => new zt(t.#h,"hexa"),
        rgb: t => new zt(t.#h,"rgb"),
        rgba: t => new zt(t.#h,"rgba"),
        hsl: t => new ft(...L([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        hsla: t => new ft(...L([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        hwb: t => new bt(...N([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        hwba: t => new bt(...N([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        lch: t => new dt(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new mt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new pt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new yt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new yt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new yt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new yt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new yt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new yt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new yt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new yt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new yt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        const [t,e,r] = this.#h;
        return P.srgbToXyzd50(t, e, r)
    }
    get alpha() {
        switch (this.format()) {
        case "hexa":
        case "rgba":
            return this.#h[3];
        default:
            return null
        }
    }
    asLegacyColor() {
        return this
    }
    nickname() {
        const t = It.get(String(this.canonicalRGBA()));
        return t ? new vt(t,this) : null
    }
    shortHex() {
        for (let t = 0; t < 4; ++t) {
            if (Math.round(255 * this.#h[t]) % 17)
                return null
        }
        return new xt(this)
    }
    constructor(t, e, r) {
        this.#s = r || null,
        this.#c = e,
        this.#n = [t[0], t[1], t[2]],
        this.#h = [J(t[0], {
            min: 0,
            max: 1
        }), J(t[1], {
            min: 0,
            max: 1
        }), J(t[2], {
            min: 0,
            max: 1
        }), J(t[3] ?? 1, {
            min: 0,
            max: 1
        })]
    }
    static fromHex(t, e) {
        const r = 4 === (t = t.toLowerCase()).length || 8 === t.length ? "hexa" : "hex"
          , s = t.length <= 4;
        s && (t = t.charAt(0) + t.charAt(0) + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3));
        const n = parseInt(t.substring(0, 2), 16)
          , i = parseInt(t.substring(2, 4), 16)
          , a = parseInt(t.substring(4, 6), 16);
        let o = 1;
        8 === t.length && (o = parseInt(t.substring(6, 8), 16) / 255);
        const l = new zt([n / 255, i / 255, a / 255, o],r,e);
        return s ? new xt(l) : l
    }
    static fromRGBAFunction(t, r, s, n, i) {
        const a = [st(t), st(r), st(s), n ? (o = n,
        rt(o)) : 1];
        var o;
        return e.ArrayUtilities.arrayDoesNotContainNullOrUndefined(a) ? new zt(a,n ? "rgba" : "rgb",i) : null
    }
    static fromRGBA(t, e) {
        return new zt([t[0] / 255, t[1] / 255, t[2] / 255, t[3]],"rgba",e)
    }
    static fromHSVA(t) {
        const e = ot(t);
        return new zt(e,"rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return t === this.format() ? this : zt.#i[t](this)
    }
    format() {
        return this.#c
    }
    hasAlpha() {
        return 1 !== this.#h[3]
    }
    detectHEXFormat() {
        return this.hasAlpha() ? "hexa" : "hex"
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(t, this.#h[0], this.#h[1], this.#h[2])
    }
    #l(t, r, s, n) {
        function i(t) {
            const e = Math.round(255 * t).toString(16);
            return 1 === e.length ? "0" + e : e
        }
        switch (t || (t = this.#c),
        t) {
        case "rgb":
        case "rgba":
            {
                const t = e.StringUtilities.sprintf("rgb(%d %d %d", wt(r), wt(s), wt(n));
                return this.hasAlpha() ? t + e.StringUtilities.sprintf(" / %d%)", Math.round(100 * this.#h[3])) : t + ")"
            }
        case "hex":
        case "hexa":
            return this.hasAlpha() ? e.StringUtilities.sprintf("#%s%s%s%s", i(r), i(s), i(n), i(this.#h[3])).toLowerCase() : e.StringUtilities.sprintf("#%s%s%s", i(r), i(s), i(n)).toLowerCase()
        }
    }
    getAuthoredText() {
        return this.#s ?? null
    }
    getRawParameters() {
        return [...this.#n]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(t, ...this.#n)
    }
    isGamutClipped() {
        return !ct(this.#n.map(wt), [this.#h[0], this.#h[1], this.#h[2]].map(wt), 1)
    }
    rgba() {
        return [...this.#h]
    }
    canonicalRGBA() {
        const t = new Array(4);
        for (let e = 0; e < 3; ++e)
            t[e] = Math.round(255 * this.#h[e]);
        return t[3] = this.#h[3],
        t
    }
    toProtocolRGBA() {
        const t = this.canonicalRGBA()
          , e = {
            r: t[0],
            g: t[1],
            b: t[2],
            a: void 0
        };
        return 1 !== t[3] && (e.a = t[3]),
        e
    }
    invert() {
        const t = [0, 0, 0, 0];
        return t[0] = 1 - this.#h[0],
        t[1] = 1 - this.#h[1],
        t[2] = 1 - this.#h[2],
        t[3] = this.#h[3],
        new zt(t,"rgba")
    }
    grayscale() {
        const [t,e,r] = this.#h
          , s = .299 * t + .587 * e + .114 * r;
        return new zt([s, s, s, .5],"rgba")
    }
    setAlpha(t) {
        const e = [...this.#h];
        return e[3] = t,
        new zt(e,"rgba")
    }
    blendWith(t) {
        const e = k(t.#h, this.#h);
        return new zt(e,"rgba")
    }
    blendWithAlpha(t) {
        const e = [...this.#h];
        return e[3] *= t,
        new zt(e,"rgba")
    }
    setFormat(t) {
        this.#c = t
    }
    equal(t) {
        const e = t.as(this.#c);
        return ct(wt(this.#h[0]), wt(e.#h[0]), 1) && ct(wt(this.#h[1]), wt(e.#h[1]), 1) && ct(wt(this.#h[2]), wt(e.#h[2]), 1) && ct(this.#h[3], e.#h[3])
    }
}
const Tt = [["aliceblue", [240, 248, 255]], ["antiquewhite", [250, 235, 215]], ["aqua", [0, 255, 255]], ["aquamarine", [127, 255, 212]], ["azure", [240, 255, 255]], ["beige", [245, 245, 220]], ["bisque", [255, 228, 196]], ["black", [0, 0, 0]], ["blanchedalmond", [255, 235, 205]], ["blue", [0, 0, 255]], ["blueviolet", [138, 43, 226]], ["brown", [165, 42, 42]], ["burlywood", [222, 184, 135]], ["cadetblue", [95, 158, 160]], ["chartreuse", [127, 255, 0]], ["chocolate", [210, 105, 30]], ["coral", [255, 127, 80]], ["cornflowerblue", [100, 149, 237]], ["cornsilk", [255, 248, 220]], ["crimson", [237, 20, 61]], ["cyan", [0, 255, 255]], ["darkblue", [0, 0, 139]], ["darkcyan", [0, 139, 139]], ["darkgoldenrod", [184, 134, 11]], ["darkgray", [169, 169, 169]], ["darkgrey", [169, 169, 169]], ["darkgreen", [0, 100, 0]], ["darkkhaki", [189, 183, 107]], ["darkmagenta", [139, 0, 139]], ["darkolivegreen", [85, 107, 47]], ["darkorange", [255, 140, 0]], ["darkorchid", [153, 50, 204]], ["darkred", [139, 0, 0]], ["darksalmon", [233, 150, 122]], ["darkseagreen", [143, 188, 143]], ["darkslateblue", [72, 61, 139]], ["darkslategray", [47, 79, 79]], ["darkslategrey", [47, 79, 79]], ["darkturquoise", [0, 206, 209]], ["darkviolet", [148, 0, 211]], ["deeppink", [255, 20, 147]], ["deepskyblue", [0, 191, 255]], ["dimgray", [105, 105, 105]], ["dimgrey", [105, 105, 105]], ["dodgerblue", [30, 144, 255]], ["firebrick", [178, 34, 34]], ["floralwhite", [255, 250, 240]], ["forestgreen", [34, 139, 34]], ["fuchsia", [255, 0, 255]], ["gainsboro", [220, 220, 220]], ["ghostwhite", [248, 248, 255]], ["gold", [255, 215, 0]], ["goldenrod", [218, 165, 32]], ["gray", [128, 128, 128]], ["grey", [128, 128, 128]], ["green", [0, 128, 0]], ["greenyellow", [173, 255, 47]], ["honeydew", [240, 255, 240]], ["hotpink", [255, 105, 180]], ["indianred", [205, 92, 92]], ["indigo", [75, 0, 130]], ["ivory", [255, 255, 240]], ["khaki", [240, 230, 140]], ["lavender", [230, 230, 250]], ["lavenderblush", [255, 240, 245]], ["lawngreen", [124, 252, 0]], ["lemonchiffon", [255, 250, 205]], ["lightblue", [173, 216, 230]], ["lightcoral", [240, 128, 128]], ["lightcyan", [224, 255, 255]], ["lightgoldenrodyellow", [250, 250, 210]], ["lightgreen", [144, 238, 144]], ["lightgray", [211, 211, 211]], ["lightgrey", [211, 211, 211]], ["lightpink", [255, 182, 193]], ["lightsalmon", [255, 160, 122]], ["lightseagreen", [32, 178, 170]], ["lightskyblue", [135, 206, 250]], ["lightslategray", [119, 136, 153]], ["lightslategrey", [119, 136, 153]], ["lightsteelblue", [176, 196, 222]], ["lightyellow", [255, 255, 224]], ["lime", [0, 255, 0]], ["limegreen", [50, 205, 50]], ["linen", [250, 240, 230]], ["magenta", [255, 0, 255]], ["maroon", [128, 0, 0]], ["mediumaquamarine", [102, 205, 170]], ["mediumblue", [0, 0, 205]], ["mediumorchid", [186, 85, 211]], ["mediumpurple", [147, 112, 219]], ["mediumseagreen", [60, 179, 113]], ["mediumslateblue", [123, 104, 238]], ["mediumspringgreen", [0, 250, 154]], ["mediumturquoise", [72, 209, 204]], ["mediumvioletred", [199, 21, 133]], ["midnightblue", [25, 25, 112]], ["mintcream", [245, 255, 250]], ["mistyrose", [255, 228, 225]], ["moccasin", [255, 228, 181]], ["navajowhite", [255, 222, 173]], ["navy", [0, 0, 128]], ["oldlace", [253, 245, 230]], ["olive", [128, 128, 0]], ["olivedrab", [107, 142, 35]], ["orange", [255, 165, 0]], ["orangered", [255, 69, 0]], ["orchid", [218, 112, 214]], ["palegoldenrod", [238, 232, 170]], ["palegreen", [152, 251, 152]], ["paleturquoise", [175, 238, 238]], ["palevioletred", [219, 112, 147]], ["papayawhip", [255, 239, 213]], ["peachpuff", [255, 218, 185]], ["peru", [205, 133, 63]], ["pink", [255, 192, 203]], ["plum", [221, 160, 221]], ["powderblue", [176, 224, 230]], ["purple", [128, 0, 128]], ["rebeccapurple", [102, 51, 153]], ["red", [255, 0, 0]], ["rosybrown", [188, 143, 143]], ["royalblue", [65, 105, 225]], ["saddlebrown", [139, 69, 19]], ["salmon", [250, 128, 114]], ["sandybrown", [244, 164, 96]], ["seagreen", [46, 139, 87]], ["seashell", [255, 245, 238]], ["sienna", [160, 82, 45]], ["silver", [192, 192, 192]], ["skyblue", [135, 206, 235]], ["slateblue", [106, 90, 205]], ["slategray", [112, 128, 144]], ["slategrey", [112, 128, 144]], ["snow", [255, 250, 250]], ["springgreen", [0, 255, 127]], ["steelblue", [70, 130, 180]], ["tan", [210, 180, 140]], ["teal", [0, 128, 128]], ["thistle", [216, 191, 216]], ["tomato", [255, 99, 71]], ["turquoise", [64, 224, 208]], ["violet", [238, 130, 238]], ["wheat", [245, 222, 179]], ["white", [255, 255, 255]], ["whitesmoke", [245, 245, 245]], ["yellow", [255, 255, 0]], ["yellowgreen", [154, 205, 50]], ["transparent", [0, 0, 0, 0]]]
  , Rt = new Map(Tt)
  , It = new Map(Tt.map(( ([t,[e,r,s,n=1]]) => [String([e, r, s, n]), t])))
  , At = [127, 32, 210]
  , Pt = {
    Content: zt.fromRGBA([111, 168, 220, .66]),
    ContentLight: zt.fromRGBA([111, 168, 220, .5]),
    ContentOutline: zt.fromRGBA([9, 83, 148]),
    Padding: zt.fromRGBA([147, 196, 125, .55]),
    PaddingLight: zt.fromRGBA([147, 196, 125, .4]),
    Border: zt.fromRGBA([255, 229, 153, .66]),
    BorderLight: zt.fromRGBA([255, 229, 153, .5]),
    Margin: zt.fromRGBA([246, 178, 107, .66]),
    MarginLight: zt.fromRGBA([246, 178, 107, .5]),
    EventTarget: zt.fromRGBA([255, 196, 196, .66]),
    Shape: zt.fromRGBA([96, 82, 177, .8]),
    ShapeMargin: zt.fromRGBA([96, 82, 127, .6]),
    CssGrid: zt.fromRGBA([75, 0, 130, 1]),
    LayoutLine: zt.fromRGBA([...At, 1]),
    GridBorder: zt.fromRGBA([...At, 1]),
    GapBackground: zt.fromRGBA([...At, .3]),
    GapHatch: zt.fromRGBA([...At, .8]),
    GridAreaBorder: zt.fromRGBA([26, 115, 232, 1])
}
  , Et = {
    ParentOutline: zt.fromRGBA([224, 90, 183, 1]),
    ChildOutline: zt.fromRGBA([0, 120, 212, 1])
}
  , kt = {
    Resizer: zt.fromRGBA([222, 225, 230, 1]),
    ResizerHandle: zt.fromRGBA([166, 166, 166, 1]),
    Mask: zt.fromRGBA([248, 249, 249, 1])
};
var Ct = Object.freeze({
    __proto__: null,
    ColorFunction: yt,
    ColorMixRegex: /color-mix\(.*,\s*(?<firstColor>.+)\s*,\s*(?<secondColor>.+)\s*\)/g,
    Generator: class {
        #u;
        #g;
        #d;
        #p;
        #m = new Map;
        constructor(t, e, r, s) {
            this.#u = t || {
                min: 0,
                max: 360,
                count: void 0
            },
            this.#g = e || 67,
            this.#d = r || 80,
            this.#p = s || 1
        }
        setColorForID(t, e) {
            this.#m.set(t, e)
        }
        colorForID(t) {
            let e = this.#m.get(t);
            return e || (e = this.generateColorForID(t),
            this.#m.set(t, e)),
            e
        }
        generateColorForID(t) {
            const r = e.StringUtilities.hashCode(t)
              , s = this.indexToValueInSpace(r, this.#u)
              , n = this.indexToValueInSpace(r >> 8, this.#g)
              , i = this.indexToValueInSpace(r >> 16, this.#d)
              , a = this.indexToValueInSpace(r >> 24, this.#p)
              , o = `hsl(${s}deg ${n}% ${i}%`;
            return 1 !== a ? `${o} / ${Math.floor(100 * a)}%)` : `${o})`
        }
        indexToValueInSpace(t, e) {
            if ("number" == typeof e)
                return e;
            const r = e.count || e.max - e.min;
            return t %= r,
            e.min + Math.floor(t / (r - 1) * (e.max - e.min))
        }
    }
    ,
    HSL: ft,
    HWB: bt,
    IsolationModeHighlight: kt,
    LCH: dt,
    Lab: gt,
    Legacy: zt,
    Nickname: vt,
    Nicknames: Rt,
    Oklab: pt,
    Oklch: mt,
    PageHighlight: Pt,
    Regex: /((?:rgba?|hsla?|hwba?|lab|lch|oklab|oklch|color)\([^)]+\)|#[0-9a-fA-F]{8}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3,4}|\b[a-zA-Z]+\b(?!-))/g,
    ShortHex: xt,
    SourceOrderHighlight: Et,
    approachColorValue: ht,
    desiredLuminance: lt,
    findFgColorForContrast: function(t, e, r) {
        const s = t.as("hsl").hsva()
          , n = e.rgba()
          , i = t => O(k(zt.fromHSVA(t).rgba(), n))
          , a = O(e.rgba())
          , o = lt(a, r, i(s) > a);
        return ht(s, 2, o, i) ? zt.fromHSVA(s) : (s[2] = 1,
        ht(s, 1, o, i) ? zt.fromHSVA(s) : null)
    },
    findFgColorForContrastAPCA: function(t, e, r) {
        const s = t.as("hsl").hsva()
          , n = t => G(zt.fromHSVA(t).rgba())
          , i = G(e.rgba())
          , a = D(i, r, n(s) >= i);
        if (ht(s, 2, a, n)) {
            const t = zt.fromHSVA(s);
            if (Math.abs(M(e.rgba(), t.rgba())) >= r)
                return t
        }
        if (s[2] = 1,
        ht(s, 1, a, n)) {
            const t = zt.fromHSVA(s);
            if (Math.abs(M(e.rgba(), t.rgba())) >= r)
                return t
        }
        return null
    },
    getFormat: function(t) {
        switch (t) {
        case "hex":
            return "hex";
        case "hexa":
            return "hexa";
        case "rgb":
            return "rgb";
        case "rgba":
            return "rgba";
        case "hsl":
            return "hsl";
        case "hsla":
            return "hsla";
        case "hwb":
            return "hwb";
        case "hwba":
            return "hwba";
        case "lch":
            return "lch";
        case "oklch":
            return "oklch";
        case "lab":
            return "lab";
        case "oklab":
            return "oklab"
        }
        return Z(t)
    },
    hsl2rgb: at,
    hsva2rgba: ot,
    parse: function(t) {
        if (!t.match(/\s/)) {
            const e = t.toLowerCase().match(/^(?:#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(\w+))$/i);
            if (e)
                return e[1] ? zt.fromHex(e[1], t) : e[2] ? vt.fromName(e[2], t) : null
        }
        const e = t.toLowerCase().match(/^\s*(?:(rgba?)|(hsla?)|(hwba?)|(lch)|(oklch)|(lab)|(oklab)|(color))\((.*)\)\s*$/);
        if (e) {
            const r = Boolean(e[1])
              , s = Boolean(e[2])
              , n = Boolean(e[3])
              , i = Boolean(e[4])
              , a = Boolean(e[5])
              , o = Boolean(e[6])
              , l = Boolean(e[7])
              , h = Boolean(e[8])
              , c = e[9];
            if (h)
                return yt.fromSpec(t, c);
            const u = function(t, {allowCommas: e, convertNoneToZero: r}) {
                const s = t.trim();
                let n = [];
                e && (n = s.split(/\s*,\s*/));
                if (!e || 1 === n.length)
                    if (n = s.split(/\s+/),
                    "/" === n[3]) {
                        if (n.splice(3, 1),
                        4 !== n.length)
                            return null
                    } else if (n.length > 2 && -1 !== n[2].indexOf("/") || n.length > 3 && -1 !== n[3].indexOf("/")) {
                        const t = n.slice(2, 4).join("");
                        n = n.slice(0, 2).concat(t.split(/\//)).concat(n.slice(4))
                    } else if (n.length >= 4)
                        return null;
                if (3 !== n.length && 4 !== n.length || n.indexOf("") > -1)
                    return null;
                if (r)
                    return n.map((t => "none" === t ? "0" : t));
                return n
            }(c, {
                allowCommas: r || s,
                convertNoneToZero: !(r || s || n)
            });
            if (!u)
                return null;
            const g = [u[0], u[1], u[2], u[3]];
            if (r)
                return zt.fromRGBAFunction(u[0], u[1], u[2], u[3], t);
            if (s)
                return ft.fromSpec(g, t);
            if (n)
                return bt.fromSpec(g, t);
            if (i)
                return dt.fromSpec(g, t);
            if (a)
                return mt.fromSpec(g, t);
            if (o)
                return gt.fromSpec(g, t);
            if (l)
                return pt.fromSpec(g, t)
        }
        return null
    },
    parseHueNumeric: nt,
    rgb2hsv: function(t) {
        const e = L(t)
          , r = e[0];
        let s = e[1];
        const n = e[2];
        return s *= n < .5 ? n : 1 - n,
        [r, 0 !== s ? 2 * s / (n + s) : 0, n + s]
    }
});
class Lt {
    listeners;
    addEventListener(t, e, r) {
        this.listeners || (this.listeners = new Map);
        let s = this.listeners.get(t);
        return s || (s = new Set,
        this.listeners.set(t, s)),
        s.add({
            thisObject: r,
            listener: e
        }),
        {
            eventTarget: this,
            eventType: t,
            thisObject: r,
            listener: e
        }
    }
    once(t) {
        return new Promise((e => {
            const r = this.addEventListener(t, (s => {
                this.removeEventListener(t, r.listener),
                e(s.data)
            }
            ))
        }
        ))
    }
    removeEventListener(t, e, r) {
        const s = this.listeners?.get(t);
        if (s) {
            for (const t of s)
                t.listener === e && t.thisObject === r && (t.disposed = !0,
                s.delete(t));
            s.size || this.listeners?.delete(t)
        }
    }
    hasEventListeners(t) {
        return Boolean(this.listeners?.has(t))
    }
    dispatchEventToListeners(t, ...[e]) {
        const r = this.listeners?.get(t);
        if (!r)
            return;
        const s = {
            data: e,
            source: this
        };
        for (const t of [...r])
            t.disposed || t.listener.call(t.thisObject, s)
    }
}
var _t = Object.freeze({
    __proto__: null,
    ObjectWrapper: Lt,
    eventMixin: function(t) {
        return console.assert(t !== HTMLElement),
        class extends t {
            #y = new Lt;
            addEventListener(t, e, r) {
                return this.#y.addEventListener(t, e, r)
            }
            once(t) {
                return this.#y.once(t)
            }
            removeEventListener(t, e, r) {
                this.#y.removeEventListener(t, e, r)
            }
            hasEventListeners(t) {
                return this.#y.hasEventListeners(t)
            }
            dispatchEventToListeners(t, ...e) {
                this.#y.dispatchEventToListeners(t, ...e)
            }
        }
    }
});
const Nt = {
    elementsPanel: "Elements panel",
    stylesSidebar: "styles sidebar",
    changesDrawer: "Changes drawer",
    issuesView: "Issues view",
    networkPanel: "Network panel",
    applicationPanel: "Application panel",
    securityPanel: "Security panel",
    sourcesPanel: "Sources panel",
    timelinePanel: "Performance panel",
    memoryInspectorPanel: "Memory inspector panel",
    developerResourcesPanel: "Developer Resources panel",
    animationsPanel: "Animations panel"
}
  , Vt = r.i18n.registerUIStrings("core/common/Revealer.ts", Nt)
  , Ot = r.i18n.getLazilyComputedLocalizedString.bind(void 0, Vt);
let Bt;
class Gt {
    registeredRevealers = [];
    static instance() {
        return void 0 === Bt && (Bt = new Gt),
        Bt
    }
    static removeInstance() {
        Bt = void 0
    }
    register(t) {
        this.registeredRevealers.push(t)
    }
    async reveal(t, e) {
        const r = await Promise.all(this.getApplicableRegisteredRevealers(t).map((t => t.loadRevealer())));
        if (r.length < 1)
            throw new Error(`No revealers found for ${t}`);
        if (r.length > 1)
            throw new Error(`Conflicting reveals found for ${t}`);
        return await r[0].reveal(t, e)
    }
    getApplicableRegisteredRevealers(t) {
        return this.registeredRevealers.filter((e => {
            for (const r of e.contextTypes())
                if (t instanceof r)
                    return !0;
            return !1
        }
        ))
    }
}
async function Mt(t, e=!1) {
    await Gt.instance().reveal(t, e)
}
const Wt = {
    DEVELOPER_RESOURCES_PANEL: Ot(Nt.developerResourcesPanel),
    ELEMENTS_PANEL: Ot(Nt.elementsPanel),
    STYLES_SIDEBAR: Ot(Nt.stylesSidebar),
    CHANGES_DRAWER: Ot(Nt.changesDrawer),
    ISSUES_VIEW: Ot(Nt.issuesView),
    NETWORK_PANEL: Ot(Nt.networkPanel),
    TIMELINE_PANEL: Ot(Nt.timelinePanel),
    APPLICATION_PANEL: Ot(Nt.applicationPanel),
    SOURCES_PANEL: Ot(Nt.sourcesPanel),
    SECURITY_PANEL: Ot(Nt.securityPanel),
    MEMORY_INSPECTOR_PANEL: Ot(Nt.memoryInspectorPanel),
    ANIMATIONS_PANEL: Ot(Nt.animationsPanel)
};
var Xt = Object.freeze({
    __proto__: null,
    RevealerDestination: Wt,
    RevealerRegistry: Gt,
    registerRevealer: function(t) {
        Gt.instance().register(t)
    },
    reveal: Mt,
    revealDestination: function(t) {
        const e = Gt.instance().getApplicableRegisteredRevealers(t);
        for (const {destination: t} of e)
            if (t)
                return t();
        return null
    }
});
let Dt;
class Ft extends Lt {
    #f;
    constructor() {
        super(),
        this.#f = []
    }
    static instance(t) {
        return Dt && !t?.forceNew || (Dt = new Ft),
        Dt
    }
    static removeInstance() {
        Dt = void 0
    }
    addMessage(t, e="info", r=!1, s) {
        const n = new Ut(t,e,Date.now(),r,s);
        this.#f.push(n),
        this.dispatchEventToListeners("messageAdded", n)
    }
    log(t) {
        this.addMessage(t, "info")
    }
    warn(t, e) {
        this.addMessage(t, "warning", void 0, e)
    }
    error(t, e=!0) {
        this.addMessage(t, "error", e)
    }
    messages() {
        return this.#f
    }
    show() {
        this.showPromise()
    }
    showPromise() {
        return Mt(this)
    }
}
var jt;
!function(t) {
    t.CSS = "css",
    t.ConsoleAPI = "console-api",
    t.ISSUE_PANEL = "issue-panel",
    t.SELF_XSS = "self-xss"
}(jt || (jt = {}));
class Ut {
    text;
    level;
    timestamp;
    show;
    source;
    constructor(t, e, r, s, n) {
        this.text = t,
        this.level = e,
        this.timestamp = "number" == typeof r ? r : Date.now(),
        this.show = s,
        n && (this.source = n)
    }
}
var $t = Object.freeze({
    __proto__: null,
    Console: Ft,
    get FrontendMessageSource() {
        return jt
    },
    Message: Ut
});
var Ht = Object.freeze({
    __proto__: null,
    debounce: function(t, e) {
        let r = 0;
        return () => {
            clearTimeout(r),
            r = window.setTimeout(( () => t()), e)
        }
    }
});
var qt = Object.freeze({
    __proto__: null,
    fireEvent: function(t, e={}, r=window) {
        const s = new CustomEvent(t,{
            bubbles: !0,
            cancelable: !0,
            detail: e
        });
        r.dispatchEvent(s)
    },
    removeEventListeners: function(t) {
        for (const e of t)
            e.eventTarget.removeEventListener(e.eventType, e.listener, e.thisObject);
        t.splice(0)
    }
})
  , Yt = Object.freeze({
    __proto__: null
});
const Zt = Symbol("uninitialized")
  , Kt = Symbol("error");
var Jt = Object.freeze({
    __proto__: null,
    lazy: function(t) {
        let e = Zt
          , r = new Error("Initial");
        return () => {
            if (e === Kt)
                throw r;
            if (e !== Zt)
                return e;
            try {
                return e = t(),
                e
            } catch (t) {
                throw r = t instanceof Error ? t : new Error(t),
                e = Kt,
                r
            }
        }
    }
});
const Qt = [];
function te(t) {
    return Qt.filter((function(e) {
        if (!e.contextTypes)
            return !0;
        for (const r of e.contextTypes())
            if (t instanceof r)
                return !0;
        return !1
    }
    ))
}
var ee = Object.freeze({
    __proto__: null,
    Linkifier: class {
        static async linkify(t, e) {
            if (!t)
                throw new Error("Can't linkify " + t);
            const r = te(t)[0];
            if (!r)
                throw new Error("No linkifiers registered for object " + t);
            return (await r.loadLinkifier()).linkify(t, e)
        }
    }
    ,
    getApplicableRegisteredlinkifiers: te,
    registerLinkifier: function(t) {
        Qt.push(t)
    }
});
class re extends Map {
    getOrInsert(t, e) {
        return this.has(t) || this.set(t, e),
        this.get(t)
    }
    getOrInsertComputed(t, e) {
        return this.has(t) || this.set(t, e(t)),
        this.get(t)
    }
}
var se = Object.freeze({
    __proto__: null,
    MapWithDefault: re
});
var ne = Object.freeze({
    __proto__: null,
    Mutex: class {
        #b = !1;
        #w = [];
        acquire() {
            const t = {
                resolved: !1
            };
            return this.#b ? new Promise((e => {
                this.#w.push(( () => e(this.#S.bind(this, t))))
            }
            )) : (this.#b = !0,
            Promise.resolve(this.#S.bind(this, t)))
        }
        #S(t) {
            if (t.resolved)
                throw new Error("Cannot release more than once.");
            t.resolved = !0;
            const e = this.#w.shift();
            e ? e() : this.#b = !1
        }
        async run(t) {
            const e = await this.acquire();
            try {
                return await t()
            } finally {
                e()
            }
        }
    }
});
function ie(t) {
    if (-1 === t.indexOf("..") && -1 === t.indexOf("."))
        return t;
    const e = ("/" === t[0] ? t.substring(1) : t).split("/")
      , r = [];
    for (const t of e)
        "." !== t && (".." === t ? r.pop() : r.push(t));
    let s = r.join("/");
    return "/" === t[0] && s && (s = "/" + s),
    "/" === s[s.length - 1] || "/" !== t[t.length - 1] && "." !== e[e.length - 1] && ".." !== e[e.length - 1] || (s += "/"),
    s
}
class ae {
    isValid;
    url;
    scheme;
    user;
    host;
    port;
    path;
    queryParams;
    fragment;
    folderPathComponents;
    lastPathComponent;
    blobInnerScheme;
    #x;
    #v;
    constructor(t) {
        this.isValid = !1,
        this.url = t,
        this.scheme = "",
        this.user = "",
        this.host = "",
        this.port = "",
        this.path = "",
        this.queryParams = "",
        this.fragment = "",
        this.folderPathComponents = "",
        this.lastPathComponent = "";
        const e = this.url.startsWith("blob:")
          , r = (e ? t.substring(5) : t).match(ae.urlRegex());
        if (r)
            this.isValid = !0,
            e ? (this.blobInnerScheme = r[2].toLowerCase(),
            this.scheme = "blob") : this.scheme = r[2].toLowerCase(),
            this.user = r[3] ?? "",
            this.host = r[4] ?? "",
            this.port = r[5] ?? "",
            this.path = r[6] ?? "/",
            this.queryParams = r[7] ?? "",
            this.fragment = r[8] ?? "";
        else {
            if (this.url.startsWith("data:"))
                return void (this.scheme = "data");
            if (this.url.startsWith("blob:"))
                return void (this.scheme = "blob");
            if ("about:blank" === this.url)
                return void (this.scheme = "about");
            this.path = this.url
        }
        const s = this.path.lastIndexOf("/", this.path.length - 2);
        this.lastPathComponent = -1 !== s ? this.path.substring(s + 1) : this.path;
        const n = this.path.lastIndexOf("/");
        -1 !== n && (this.folderPathComponents = this.path.substring(0, n))
    }
    static fromString(t) {
        const e = new ae(t.toString());
        return e.isValid ? e : null
    }
    static preEncodeSpecialCharactersInPath(t) {
        for (const e of ["%", ";", "#", "?", " "])
            t = t.replaceAll(e, encodeURIComponent(e));
        return t
    }
    static rawPathToEncodedPathString(t) {
        const e = ae.preEncodeSpecialCharactersInPath(t);
        return t.startsWith("/") ? new URL(e,"file:///").pathname : new URL("/" + e,"file:///").pathname.substr(1)
    }
    static encodedFromParentPathAndName(t, e) {
        return ae.concatenate(t, "/", ae.preEncodeSpecialCharactersInPath(e))
    }
    static urlFromParentUrlAndName(t, e) {
        return ae.concatenate(t, "/", ae.preEncodeSpecialCharactersInPath(e))
    }
    static encodedPathToRawPathString(t) {
        return decodeURIComponent(t)
    }
    static rawPathToUrlString(t) {
        let e = ae.preEncodeSpecialCharactersInPath(t.replace(/\\/g, "/"));
        return e = e.replace(/\\/g, "/"),
        e.startsWith("file://") || (e = e.startsWith("/") ? "file://" + e : "file:///" + e),
        new URL(e).toString()
    }
    static relativePathToUrlString(t, e) {
        const r = ae.preEncodeSpecialCharactersInPath(t.replace(/\\/g, "/"));
        return new URL(r,e).toString()
    }
    static urlToRawPathString(t, e) {
        console.assert(t.startsWith("file://"), "This must be a file URL.");
        const r = decodeURIComponent(t);
        return e ? r.substr(8).replace(/\//g, "\\") : r.substr(7)
    }
    static sliceUrlToEncodedPathString(t, e) {
        return t.substring(e)
    }
    static substr(t, e, r) {
        return t.substr(e, r)
    }
    static substring(t, e, r) {
        return t.substring(e, r)
    }
    static prepend(t, e) {
        return t + e
    }
    static concatenate(t, ...e) {
        return t.concat(...e)
    }
    static trim(t) {
        return t.trim()
    }
    static slice(t, e, r) {
        return t.slice(e, r)
    }
    static join(t, e) {
        return t.join(e)
    }
    static split(t, e, r) {
        return t.split(e, r)
    }
    static toLowerCase(t) {
        return t.toLowerCase()
    }
    static isValidUrlString(t) {
        return new ae(t).isValid
    }
    static urlWithoutHash(t) {
        const e = t.indexOf("#");
        return -1 !== e ? t.substr(0, e) : t
    }
    static urlRegex() {
        if (ae.urlRegexInstance)
            return ae.urlRegexInstance;
        return ae.urlRegexInstance = new RegExp("^(" + /([A-Za-z][A-Za-z0-9+.-]*):\/\//.source + /(?:([A-Za-z0-9\-._~%!$&'()*+,;=:]*)@)?/.source + /((?:\[::\d?\])|(?:[^\s\/:]*))/.source + /(?::([\d]+))?/.source + ")" + /(\/[^#?]*)?/.source + /(?:\?([^#]*))?/.source + /(?:#(.*))?/.source + "$"),
        ae.urlRegexInstance
    }
    static extractPath(t) {
        const e = this.fromString(t);
        return e ? e.path : ""
    }
    static extractOrigin(t) {
        const r = this.fromString(t);
        return r ? r.securityOrigin() : e.DevToolsPath.EmptyUrlString
    }
    static extractExtension(t) {
        const e = (t = ae.urlWithoutHash(t)).indexOf("?");
        -1 !== e && (t = t.substr(0, e));
        const r = t.lastIndexOf("/");
        -1 !== r && (t = t.substr(r + 1));
        const s = t.lastIndexOf(".");
        if (-1 !== s) {
            const e = (t = t.substr(s + 1)).indexOf("%");
            return -1 !== e ? t.substr(0, e) : t
        }
        return ""
    }
    static extractName(t) {
        let e = t.lastIndexOf("/");
        const r = -1 !== e ? t.substr(e + 1) : t;
        return e = r.indexOf("?"),
        e < 0 ? r : r.substr(0, e)
    }
    static completeURL(t, e) {
        if (e.startsWith("data:") || e.startsWith("blob:") || e.startsWith("javascript:") || e.startsWith("mailto:"))
            return e;
        const r = e.trim()
          , s = this.fromString(r);
        if (s?.scheme) {
            return s.securityOrigin() + ie(s.path) + (s.queryParams && `?${s.queryParams}`) + (s.fragment && `#${s.fragment}`)
        }
        const n = this.fromString(t);
        if (!n)
            return null;
        if (n.isDataURL())
            return e;
        if (e.length > 1 && "/" === e.charAt(0) && "/" === e.charAt(1))
            return n.scheme + ":" + e;
        const i = n.securityOrigin()
          , a = n.path
          , o = n.queryParams ? "?" + n.queryParams : "";
        if (!e.length)
            return i + a + o;
        if ("#" === e.charAt(0))
            return i + a + o + e;
        if ("?" === e.charAt(0))
            return i + a + e;
        const l = e.match(/^[^#?]*/);
        if (!l || !e.length)
            throw new Error("Invalid href");
        let h = l[0];
        const c = e.substring(h.length);
        return "/" !== h.charAt(0) && (h = n.folderPathComponents + "/" + h),
        i + ie(h) + c
    }
    static splitLineAndColumn(t) {
        const e = t.match(ae.urlRegex());
        let r = ""
          , s = t;
        e && (r = e[1],
        s = t.substring(e[1].length));
        const n = /(?::(\d+))?(?::(\d+))?$/.exec(s);
        let i, a;
        if (console.assert(Boolean(n)),
        !n)
            return {
                url: t,
                lineNumber: 0,
                columnNumber: 0
            };
        "string" == typeof n[1] && (i = parseInt(n[1], 10),
        i = isNaN(i) ? void 0 : i - 1),
        "string" == typeof n[2] && (a = parseInt(n[2], 10),
        a = isNaN(a) ? void 0 : a - 1);
        let o = r + s.substring(0, s.length - n[0].length);
        if (void 0 === n[1] && void 0 === n[2]) {
            const t = /wasm-function\[\d+\]:0x([a-z0-9]+)$/g.exec(s);
            t && "string" == typeof t[1] && (o = ae.removeWasmFunctionInfoFromURL(o),
            a = parseInt(t[1], 16),
            a = isNaN(a) ? void 0 : a)
        }
        return {
            url: o,
            lineNumber: i,
            columnNumber: a
        }
    }
    static removeWasmFunctionInfoFromURL(t) {
        const e = t.search(/:wasm-function\[\d+\]/);
        return -1 === e ? t : ae.substring(t, 0, e)
    }
    static beginsWithWindowsDriveLetter(t) {
        return /^[A-Za-z]:/.test(t)
    }
    static beginsWithScheme(t) {
        return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(t)
    }
    static isRelativeURL(t) {
        return !this.beginsWithScheme(t) || this.beginsWithWindowsDriveLetter(t)
    }
    get displayName() {
        return this.#x ? this.#x : this.isDataURL() ? this.dataURLDisplayName() : this.isBlobURL() || this.isAboutBlank() ? this.url : (this.#x = this.lastPathComponent,
        this.#x || (this.#x = (this.host || "") + "/"),
        "/" === this.#x && (this.#x = this.url),
        this.#x)
    }
    dataURLDisplayName() {
        return this.#v ? this.#v : this.isDataURL() ? (this.#v = e.StringUtilities.trimEndWithMaxLength(this.url, 20),
        this.#v) : ""
    }
    isAboutBlank() {
        return "about:blank" === this.url
    }
    isDataURL() {
        return "data" === this.scheme
    }
    extractDataUrlMimeType() {
        const t = this.url.match(/^data:((?<type>\w+)\/(?<subtype>\w+))?(;base64)?,/);
        return {
            type: t?.groups?.type,
            subtype: t?.groups?.subtype
        }
    }
    isBlobURL() {
        return this.url.startsWith("blob:")
    }
    lastPathComponentWithFragment() {
        return this.lastPathComponent + (this.fragment ? "#" + this.fragment : "")
    }
    domain() {
        return this.isDataURL() ? "data:" : this.host + (this.port ? ":" + this.port : "")
    }
    securityOrigin() {
        if (this.isDataURL())
            return "data:";
        return (this.isBlobURL() ? this.blobInnerScheme : this.scheme) + "://" + this.domain()
    }
    urlWithoutScheme() {
        return this.scheme && this.url.startsWith(this.scheme + "://") ? this.url.substring(this.scheme.length + 3) : this.url
    }
    static urlRegexInstance = null
}
var oe = Object.freeze({
    __proto__: null,
    ParsedURL: ae,
    normalizePath: ie,
    schemeIs: function(t, e) {
        try {
            return new URL(t).protocol === e
        } catch {
            return !1
        }
    }
});
class le {
    #z;
    #T;
    #R;
    #I;
    constructor(t, e) {
        this.#z = t,
        this.#T = e || 1,
        this.#R = 0,
        this.#I = 0
    }
    isCanceled() {
        return this.#z.parent.isCanceled()
    }
    setTitle(t) {
        this.#z.parent.setTitle(t)
    }
    done() {
        this.setWorked(this.#I),
        this.#z.childDone()
    }
    setTotalWork(t) {
        this.#I = t,
        this.#z.update()
    }
    setWorked(t, e) {
        this.#R = t,
        void 0 !== e && this.setTitle(e),
        this.#z.update()
    }
    incrementWorked(t) {
        this.setWorked(this.#R + (t || 1))
    }
    getWeight() {
        return this.#T
    }
    getWorked() {
        return this.#R
    }
    getTotalWork() {
        return this.#I
    }
}
var he = Object.freeze({
    __proto__: null,
    CompositeProgress: class {
        parent;
        #A;
        #P;
        constructor(t) {
            this.parent = t,
            this.#A = [],
            this.#P = 0,
            this.parent.setTotalWork(1),
            this.parent.setWorked(0)
        }
        childDone() {
            ++this.#P === this.#A.length && this.parent.done()
        }
        createSubProgress(t) {
            const e = new le(this,t);
            return this.#A.push(e),
            e
        }
        update() {
            let t = 0
              , e = 0;
            for (let r = 0; r < this.#A.length; ++r) {
                const s = this.#A[r];
                s.getTotalWork() && (e += s.getWeight() * s.getWorked() / s.getTotalWork()),
                t += s.getWeight()
            }
            this.parent.setWorked(e / t)
        }
    }
    ,
    Progress: class {
        setTotalWork(t) {}
        setTitle(t) {}
        setWorked(t, e) {}
        incrementWorked(t) {}
        done() {}
        isCanceled() {
            return !1
        }
    }
    ,
    ProgressProxy: class {
        #E;
        #k;
        constructor(t, e) {
            this.#E = t,
            this.#k = e
        }
        isCanceled() {
            return !!this.#E && this.#E.isCanceled()
        }
        setTitle(t) {
            this.#E && this.#E.setTitle(t)
        }
        done() {
            this.#E && this.#E.done(),
            this.#k && this.#k()
        }
        setTotalWork(t) {
            this.#E && this.#E.setTotalWork(t)
        }
        setWorked(t, e) {
            this.#E && this.#E.setWorked(t, e)
        }
        incrementWorked(t) {
            this.#E && this.#E.incrementWorked(t)
        }
    }
    ,
    SubProgress: le
})
  , ce = Object.freeze({
    __proto__: null
});
var ue = Object.freeze({
    __proto__: null,
    ResolverBase: class {
        #C = new Map;
        async waitFor(t) {
            const e = this.getForId(t);
            return e || await this.getOrCreatePromise(t)
        }
        tryGet(t, e) {
            const r = this.getForId(t);
            if (!r) {
                const r = () => {}
                ;
                return this.getOrCreatePromise(t).catch(r).then((t => {
                    t && e(t)
                }
                )),
                null
            }
            return r
        }
        clear() {
            this.stopListening();
            for (const [t,{reject: e}] of this.#C.entries())
                e(new Error(`Object with ${t} never resolved.`));
            this.#C.clear()
        }
        getOrCreatePromise(t) {
            const e = this.#C.get(t);
            if (e)
                return e.promise;
            const {resolve: r, reject: s, promise: n} = Promise.withResolvers();
            return this.#C.set(t, {
                promise: n,
                resolve: r,
                reject: s
            }),
            this.startListening(),
            n
        }
        onResolve(t, e) {
            const r = this.#C.get(t);
            this.#C.delete(t),
            0 === this.#C.size && this.stopListening(),
            r?.resolve(e)
        }
    }
});
const ge = {
    fetchAndXHR: "`Fetch` and `XHR`",
    javascript: "JavaScript",
    js: "JS",
    css: "CSS",
    img: "Img",
    media: "Media",
    font: "Font",
    doc: "Doc",
    socketShort: "Socket",
    webassembly: "WebAssembly",
    wasm: "Wasm",
    manifest: "Manifest",
    other: "Other",
    document: "Document",
    stylesheet: "Stylesheet",
    image: "Image",
    script: "Script",
    texttrack: "TextTrack",
    fetch: "Fetch",
    eventsource: "EventSource",
    websocket: "WebSocket",
    webtransport: "WebTransport",
    directsocket: "DirectSocket",
    signedexchange: "SignedExchange",
    ping: "Ping",
    cspviolationreport: "CSPViolationReport",
    preflight: "Preflight",
    webbundle: "WebBundle"
}
  , de = r.i18n.registerUIStrings("core/common/ResourceType.ts", ge)
  , pe = r.i18n.getLazilyComputedLocalizedString.bind(void 0, de);
class me {
    #L;
    #_;
    #N;
    #V;
    constructor(t, e, r, s) {
        this.#L = t,
        this.#_ = e,
        this.#N = r,
        this.#V = s
    }
    static fromMimeType(t) {
        return t ? t.startsWith("text/html") ? be.Document : t.startsWith("text/css") ? be.Stylesheet : t.startsWith("image/") ? be.Image : t.startsWith("text/") ? be.Script : t.includes("font") ? be.Font : t.includes("script") ? be.Script : t.includes("octet") ? be.Other : t.includes("application") ? be.Script : be.Other : be.Other
    }
    static fromMimeTypeOverride(t) {
        return "application/manifest+json" === t ? be.Manifest : "application/wasm" === t ? be.Wasm : "application/webbundle" === t ? be.WebBundle : null
    }
    static fromURL(t) {
        return Se.get(ae.extractExtension(t)) || null
    }
    static fromName(t) {
        for (const e of Object.values(be))
            if (e.name() === t)
                return e;
        return null
    }
    static mimeFromURL(t) {
        if (t.startsWith("snippet://") || t.startsWith("debugger://"))
            return "text/javascript";
        const e = ae.extractName(t);
        if (we.has(e))
            return we.get(e);
        let r = ae.extractExtension(t).toLowerCase();
        return "html" === r && e.endsWith(".component.html") && (r = "component.html"),
        xe.get(r)
    }
    static mimeFromExtension(t) {
        return xe.get(t)
    }
    static simplifyContentType(t) {
        return new RegExp("^application(.*json$|/json+.*)").test(t) ? "application/json" : t
    }
    static mediaTypeForMetrics(t, e, r, s, n) {
        return "text/javascript" !== t ? t : e ? "text/javascript+sourcemapped" : r ? "text/javascript+minified" : s ? "text/javascript+snippet" : n ? "text/javascript+eval" : "text/javascript+plain"
    }
    name() {
        return this.#L
    }
    title() {
        return this.#_()
    }
    category() {
        return this.#N
    }
    isTextType() {
        return this.#V
    }
    isScript() {
        return "script" === this.#L || "sm-script" === this.#L
    }
    hasScripts() {
        return this.isScript() || this.isDocument()
    }
    isStyleSheet() {
        return "stylesheet" === this.#L || "sm-stylesheet" === this.#L
    }
    hasStyleSheets() {
        return this.isStyleSheet() || this.isDocument()
    }
    isDocument() {
        return "document" === this.#L
    }
    isDocumentOrScriptOrStyleSheet() {
        return this.isDocument() || this.isScript() || this.isStyleSheet()
    }
    isFont() {
        return "font" === this.#L
    }
    isImage() {
        return "image" === this.#L
    }
    isFromSourceMap() {
        return this.#L.startsWith("sm-")
    }
    isWebbundle() {
        return "webbundle" === this.#L
    }
    toString() {
        return this.#L
    }
    canonicalMimeType() {
        return this.isDocument() ? "text/html" : this.isScript() ? "text/javascript" : this.isStyleSheet() ? "text/css" : ""
    }
}
class ye {
    name;
    title;
    shortTitle;
    constructor(t, e, r) {
        this.name = t,
        this.title = e,
        this.shortTitle = r
    }
}
const fe = {
    XHR: new ye("Fetch and XHR",pe(ge.fetchAndXHR),r.i18n.lockedLazyString("Fetch/XHR")),
    Document: new ye(ge.document,pe(ge.document),pe(ge.doc)),
    Stylesheet: new ye(ge.css,pe(ge.css),pe(ge.css)),
    Script: new ye(ge.javascript,pe(ge.javascript),pe(ge.js)),
    Font: new ye(ge.font,pe(ge.font),pe(ge.font)),
    Image: new ye(ge.image,pe(ge.image),pe(ge.img)),
    Media: new ye(ge.media,pe(ge.media),pe(ge.media)),
    Manifest: new ye(ge.manifest,pe(ge.manifest),pe(ge.manifest)),
    Socket: new ye("Socket",r.i18n.lockedLazyString("WebSocket | WebTransport | DirectSocket"),pe(ge.socketShort)),
    Wasm: new ye(ge.webassembly,pe(ge.webassembly),pe(ge.wasm)),
    Other: new ye(ge.other,pe(ge.other),pe(ge.other))
}
  , be = {
    Document: new me("document",pe(ge.document),fe.Document,!0),
    Stylesheet: new me("stylesheet",pe(ge.stylesheet),fe.Stylesheet,!0),
    Image: new me("image",pe(ge.image),fe.Image,!1),
    Media: new me("media",pe(ge.media),fe.Media,!1),
    Font: new me("font",pe(ge.font),fe.Font,!1),
    Script: new me("script",pe(ge.script),fe.Script,!0),
    TextTrack: new me("texttrack",pe(ge.texttrack),fe.Other,!0),
    XHR: new me("xhr",r.i18n.lockedLazyString("XHR"),fe.XHR,!0),
    Fetch: new me("fetch",pe(ge.fetch),fe.XHR,!0),
    Prefetch: new me("prefetch",r.i18n.lockedLazyString("Prefetch"),fe.Document,!0),
    EventSource: new me("eventsource",pe(ge.eventsource),fe.XHR,!0),
    WebSocket: new me("websocket",pe(ge.websocket),fe.Socket,!1),
    WebTransport: new me("webtransport",pe(ge.webtransport),fe.Socket,!1),
    DirectSocket: new me("directsocket",pe(ge.directsocket),fe.Socket,!1),
    Wasm: new me("wasm",pe(ge.wasm),fe.Wasm,!1),
    Manifest: new me("manifest",pe(ge.manifest),fe.Manifest,!0),
    SignedExchange: new me("signed-exchange",pe(ge.signedexchange),fe.Other,!1),
    Ping: new me("ping",pe(ge.ping),fe.Other,!1),
    CSPViolationReport: new me("csp-violation-report",pe(ge.cspviolationreport),fe.Other,!1),
    Other: new me("other",pe(ge.other),fe.Other,!1),
    Preflight: new me("preflight",pe(ge.preflight),fe.Other,!0),
    SourceMapScript: new me("sm-script",pe(ge.script),fe.Script,!0),
    SourceMapStyleSheet: new me("sm-stylesheet",pe(ge.stylesheet),fe.Stylesheet,!0),
    WebBundle: new me("webbundle",pe(ge.webbundle),fe.Other,!1)
}
  , we = new Map([["Cakefile", "text/x-coffeescript"]])
  , Se = new Map([["js", be.Script], ["mjs", be.Script], ["css", be.Stylesheet], ["xsl", be.Stylesheet], ["avif", be.Image], ["bmp", be.Image], ["gif", be.Image], ["ico", be.Image], ["jpeg", be.Image], ["jpg", be.Image], ["jxl", be.Image], ["png", be.Image], ["svg", be.Image], ["tif", be.Image], ["tiff", be.Image], ["vue", be.Document], ["webmanifest", be.Manifest], ["webp", be.Media], ["otf", be.Font], ["ttc", be.Font], ["ttf", be.Font], ["woff", be.Font], ["woff2", be.Font], ["wasm", be.Wasm]])
  , xe = new Map([["js", "text/javascript"], ["mjs", "text/javascript"], ["css", "text/css"], ["html", "text/html"], ["htm", "text/html"], ["xml", "application/xml"], ["xsl", "application/xml"], ["wasm", "application/wasm"], ["webmanifest", "application/manifest+json"], ["asp", "application/x-aspx"], ["aspx", "application/x-aspx"], ["jsp", "application/x-jsp"], ["c", "text/x-c++src"], ["cc", "text/x-c++src"], ["cpp", "text/x-c++src"], ["h", "text/x-c++src"], ["m", "text/x-c++src"], ["mm", "text/x-c++src"], ["coffee", "text/x-coffeescript"], ["dart", "application/vnd.dart"], ["ts", "text/typescript"], ["tsx", "text/typescript-jsx"], ["json", "application/json"], ["gyp", "application/json"], ["gypi", "application/json"], ["map", "application/json"], ["cs", "text/x-csharp"], ["go", "text/x-go"], ["java", "text/x-java"], ["kt", "text/x-kotlin"], ["scala", "text/x-scala"], ["less", "text/x-less"], ["php", "application/x-httpd-php"], ["phtml", "application/x-httpd-php"], ["py", "text/x-python"], ["sh", "text/x-sh"], ["gss", "text/x-gss"], ["sass", "text/x-sass"], ["scss", "text/x-scss"], ["vtt", "text/vtt"], ["ls", "text/x-livescript"], ["md", "text/markdown"], ["cljs", "text/x-clojure"], ["cljc", "text/x-clojure"], ["cljx", "text/x-clojure"], ["styl", "text/x-styl"], ["jsx", "text/jsx"], ["avif", "image/avif"], ["bmp", "image/bmp"], ["gif", "image/gif"], ["ico", "image/ico"], ["jpeg", "image/jpeg"], ["jpg", "image/jpeg"], ["jxl", "image/jxl"], ["png", "image/png"], ["svg", "image/svg+xml"], ["tif", "image/tif"], ["tiff", "image/tiff"], ["webp", "image/webp"], ["otf", "font/otf"], ["ttc", "font/collection"], ["ttf", "font/ttf"], ["woff", "font/woff"], ["woff2", "font/woff2"], ["component.html", "text/x.angular"], ["svelte", "text/x.svelte"], ["vue", "text/x.vue"]]);
var ve = Object.freeze({
    __proto__: null,
    ResourceCategory: ye,
    ResourceType: me,
    mimeTypeByExtension: xe,
    resourceCategories: fe,
    resourceTypeByExtension: Se,
    resourceTypes: be
});
const ze = new Map;
const Te = [];
const Re = ["whats-new"];
var Ie = Object.freeze({
    __proto__: null,
    earlyInitializationRunnables: function() {
        return Te
    },
    lateInitializationRunnables: function() {
        return [...ze.values()]
    },
    maybeRemoveLateInitializationRunnable: function(t) {
        return ze.delete(t)
    },
    registerEarlyInitializationRunnable: function(t) {
        Te.push(t)
    },
    registerLateInitializationRunnable: function(t) {
        Re.includes(t.id) || function(t) {
            const {id: e, loadRunnable: r} = t;
            if (ze.has(e))
                throw new Error(`Duplicate late Initializable runnable id '${e}'`);
            ze.set(e, r)
        }(t)
    }
});
class Ae {
    begin;
    end;
    data;
    constructor(t, e, r) {
        if (t > e)
            throw new Error("Invalid segment");
        this.begin = t,
        this.end = e,
        this.data = r
    }
    intersects(t) {
        return this.begin < t.end && t.begin < this.end
    }
}
var Pe = Object.freeze({
    __proto__: null,
    Segment: Ae,
    SegmentedRange: class {
        #O;
        #B;
        constructor(t) {
            this.#O = [],
            this.#B = t
        }
        append(t) {
            let r = e.ArrayUtilities.lowerBound(this.#O, t, ( (t, e) => t.begin - e.begin))
              , s = r
              , n = null;
            if (r > 0) {
                const e = this.#O[r - 1];
                n = this.tryMerge(e, t),
                n ? (--r,
                t = n) : this.#O[r - 1].end >= t.begin && (t.end < e.end && this.#O.splice(r, 0, new Ae(t.end,e.end,e.data)),
                e.end = t.begin)
            }
            for (; s < this.#O.length && this.#O[s].end <= t.end; )
                ++s;
            s < this.#O.length && (n = this.tryMerge(t, this.#O[s]),
            n ? (s++,
            t = n) : t.intersects(this.#O[s]) && (this.#O[s].begin = t.end)),
            this.#O.splice(r, s - r, t)
        }
        segments() {
            return this.#O
        }
        tryMerge(t, e) {
            const r = this.#B && this.#B(t, e);
            return r ? (r.begin = t.begin,
            r.end = Math.max(t.end, e.end),
            r) : null
        }
    }
});
const Ee = {
    elements: "Elements",
    ai: "AI",
    appearance: "Appearance",
    sources: "Sources",
    network: "Network",
    performance: "Performance",
    console: "Console",
    persistence: "Persistence",
    debugger: "Debugger",
    global: "Global",
    rendering: "Rendering",
    grid: "Grid",
    mobile: "Mobile",
    memory: "Memory",
    extension: "Extension",
    adorner: "Adorner",
    sync: "Sync",
    privacy: "Privacy"
}
  , ke = r.i18n.registerUIStrings("core/common/SettingRegistration.ts", Ee)
  , Ce = r.i18n.getLocalizedString.bind(void 0, ke);
let Le = [];
const _e = new Set;
function Ne() {
    return Le.filter((e => t.Runtime.Runtime.isDescriptorEnabled(e)))
}
function Ve(t, e=!1) {
    if (0 === Le.length || e) {
        Le = t,
        _e.clear();
        for (const e of t) {
            const t = e.settingName;
            if (_e.has(t))
                throw new Error(`Duplicate setting name '${t}'`);
            _e.add(t)
        }
    }
}
function Oe() {
    Le = [],
    _e.clear()
}
function Be(t) {
    const e = Le.findIndex((e => e.settingName === t));
    return !(e < 0 || !_e.delete(t)) && (Le.splice(e, 1),
    !0)
}
function Ge(t) {
    switch (t) {
    case "ELEMENTS":
        return Ce(Ee.elements);
    case "AI":
        return Ce(Ee.ai);
    case "APPEARANCE":
        return Ce(Ee.appearance);
    case "SOURCES":
        return Ce(Ee.sources);
    case "NETWORK":
        return Ce(Ee.network);
    case "PERFORMANCE":
        return Ce(Ee.performance);
    case "CONSOLE":
    case "EMULATION":
        return Ce(Ee.console);
    case "PERSISTENCE":
        return Ce(Ee.persistence);
    case "DEBUGGER":
        return Ce(Ee.debugger);
    case "GLOBAL":
        return Ce(Ee.global);
    case "RENDERING":
        return Ce(Ee.rendering);
    case "GRID":
        return Ce(Ee.grid);
    case "MOBILE":
        return Ce(Ee.mobile);
    case "MEMORY":
        return Ce(Ee.memory);
    case "EXTENSIONS":
        return Ce(Ee.extension);
    case "ADORNER":
        return Ce(Ee.adorner);
    case "":
        return r.i18n.lockedString("");
    case "SYNC":
        return Ce(Ee.sync);
    case "PRIVACY":
        return Ce(Ee.privacy)
    }
}
const Me = ["help.show-release-note", "language", "chrome-theme-colors"];
function We(t) {
    Me.includes(t.settingName) || function(t) {
        const e = t.settingName;
        if (_e.has(e))
            throw new Error(`Duplicate setting name '${e}'`);
        _e.add(e),
        Le.push(t)
    }(t)
}
var Xe = Object.freeze({
    __proto__: null,
    getLocalizedSettingsCategory: Ge,
    getRegisteredSettings: Ne,
    maybeRemoveSettingExtension: Be,
    registerSettingExtension: We,
    registerSettingsForTest: Ve,
    resetSettings: Oe
});
const De = {};
let Fe, je = class r {
    syncedStorage;
    globalStorage;
    localStorage;
    #G = new $e({});
    settingNameSet = new Set;
    orderValuesBySettingCategory = new Map;
    #M = new Lt;
    #W = new Map;
    moduleSettings = new Map;
    #X;
    constructor(e, r, s, n) {
        this.syncedStorage = e,
        this.globalStorage = r,
        this.localStorage = s,
        this.#X = n;
        for (const e of this.getRegisteredSettings()) {
            const {settingName: r, defaultValue: s, storageType: n} = e
              , i = "regex" === e.settingType
              , a = "function" == typeof s ? s(t.Runtime.hostConfig) : s
              , o = i && "string" == typeof a ? this.createRegExpSetting(r, a, void 0, n) : this.createSetting(r, a, n);
            o.setTitleFunction(e.title),
            e.userActionCondition && o.setRequiresUserAction(Boolean(t.Runtime.Runtime.queryParam(e.userActionCondition))),
            o.setRegistration(e),
            this.registerModuleSetting(o)
        }
    }
    getRegisteredSettings() {
        return Ne()
    }
    static hasInstance() {
        return void 0 !== Fe
    }
    static instance(t={
        forceNew: null,
        syncedStorage: null,
        globalStorage: null,
        localStorage: null
    }) {
        const {forceNew: e, syncedStorage: s, globalStorage: n, localStorage: i, logSettingAccess: a} = t;
        if (!Fe || e) {
            if (!s || !n || !i)
                throw new Error(`Unable to create settings: global and local storage must be provided: ${(new Error).stack}`);
            Fe = new r(s,n,i,a)
        }
        return Fe
    }
    static removeInstance() {
        Fe = void 0
    }
    registerModuleSetting(t) {
        const e = t.name
          , r = t.category()
          , s = t.order();
        if (this.settingNameSet.has(e))
            throw new Error(`Duplicate Setting name '${e}'`);
        if (r && s) {
            const t = this.orderValuesBySettingCategory.get(r) || new Set;
            if (t.has(s))
                throw new Error(`Duplicate order value '${s}' for settings category '${r}'`);
            t.add(s),
            this.orderValuesBySettingCategory.set(r, t)
        }
        this.settingNameSet.add(e),
        this.moduleSettings.set(t.name, t)
    }
    static normalizeSettingName(t) {
        return [De.VersionController.GLOBAL_VERSION_SETTING_NAME, De.VersionController.SYNCED_VERSION_SETTING_NAME, De.VersionController.LOCAL_VERSION_SETTING_NAME, "currentDockState", "isUnderTest"].includes(t) ? t : e.StringUtilities.toKebabCase(t)
    }
    moduleSetting(t) {
        t = r.normalizeSettingName(t);
        const e = this.moduleSettings.get(t);
        if (!e)
            throw new Error("No setting registered: " + t);
        return e
    }
    settingForTest(t) {
        t = r.normalizeSettingName(t);
        const e = this.#W.get(t);
        if (!e)
            throw new Error("No setting registered: " + t);
        return e
    }
    createSetting(t, e, s) {
        t = r.normalizeSettingName(t);
        const n = this.storageFromType(s);
        let i = this.#W.get(t);
        return i || (i = new De.Setting(t,e,this.#M,n,this.#X),
        this.#W.set(t, i)),
        i
    }
    createLocalSetting(t, e) {
        return t = r.normalizeSettingName(t),
        this.createSetting(t, e, "Local")
    }
    createRegExpSetting(t, e, s, n) {
        return t = r.normalizeSettingName(t),
        this.#W.get(t) || this.#W.set(t, new Ze(t,e,this.#M,this.storageFromType(n),s,this.#X)),
        this.#W.get(t)
    }
    clearAll() {
        this.globalStorage.removeAll(),
        this.syncedStorage.removeAll(),
        this.localStorage.removeAll(),
        (new De.VersionController).resetToCurrent()
    }
    storageFromType(t) {
        switch (t) {
        case "Local":
            return this.localStorage;
        case "Session":
            return this.#G;
        case "Global":
            return this.globalStorage;
        case "Synced":
            return this.syncedStorage
        }
        return this.globalStorage
    }
    getRegistry() {
        return this.#W
    }
}
;
const Ue = {
    register: () => {}
    ,
    set: () => {}
    ,
    get: () => Promise.resolve(""),
    remove: () => {}
    ,
    clear: () => {}
};
class $e {
    object;
    backingStore;
    storagePrefix;
    constructor(t, e=Ue, r="") {
        this.object = t,
        this.backingStore = e,
        this.storagePrefix = r
    }
    register(t) {
        t = this.storagePrefix + t,
        this.backingStore.register(t)
    }
    set(t, e) {
        t = this.storagePrefix + t,
        this.object[t] = e,
        this.backingStore.set(t, e)
    }
    has(t) {
        return (t = this.storagePrefix + t)in this.object
    }
    get(t) {
        return t = this.storagePrefix + t,
        this.object[t]
    }
    async forceGet(t) {
        const e = this.storagePrefix + t
          , r = await this.backingStore.get(e);
        return r && r !== this.object[e] ? this.set(t, r) : r || this.remove(t),
        r
    }
    remove(t) {
        t = this.storagePrefix + t,
        delete this.object[t],
        this.backingStore.remove(t)
    }
    removeAll() {
        this.object = {},
        this.backingStore.clear()
    }
    keys() {
        return Object.keys(this.object)
    }
    dumpSizes() {
        Ft.instance().log("Ten largest settings: ");
        const t = {
            __proto__: null
        };
        for (const e in this.object)
            t[e] = this.object[e].length;
        const e = Object.keys(t);
        e.sort((function(e, r) {
            return t[r] - t[e]
        }
        ));
        for (let r = 0; r < 10 && r < e.length; ++r)
            Ft.instance().log("Setting: '" + e[r] + "', size: " + t[e[r]])
    }
}
function He(t) {
    const e = t.name
      , r = je.instance();
    r.getRegistry().delete(e),
    r.moduleSettings.delete(e),
    t.storage.remove(e)
}
class qe {
    disabled;
    warning;
    experiment;
    constructor({deprecationNotice: e}) {
        if (!e)
            throw new Error("Cannot create deprecation info for a non-deprecated setting");
        this.disabled = e.disabled,
        this.warning = e.warning(),
        this.experiment = e.experiment ? t.Runtime.experiments.allConfigurableExperiments().find((t => t.name === e.experiment)) : void 0
    }
}
let Ye = class {
    defaultValue;
    eventSupport;
    storage;
    #D;
    #_;
    #F = null;
    get registration() {
        return this.#F
    }
    set registration(t) {
        this.#F = t
    }
    #j;
    #U;
    #$ = JSON;
    #H;
    #q;
    #Y = null;
    name;
    #Z = !1;
    #X;
    constructor(t, e, r, s, n) {
        this.defaultValue = e,
        this.eventSupport = r,
        this.storage = s,
        this.name = je.normalizeSettingName(t),
        s.register(this.name),
        this.#X = n
    }
    setSerializer(t) {
        this.#$ = t
    }
    addChangeListener(t, e) {
        return this.eventSupport.addEventListener(this.name, t, e)
    }
    removeChangeListener(t, e) {
        this.eventSupport.removeEventListener(this.name, t, e)
    }
    title() {
        return this.#_ ? this.#_ : this.#D ? this.#D() : ""
    }
    setTitleFunction(t) {
        t && (this.#D = t)
    }
    setTitle(t) {
        this.#_ = t
    }
    setRequiresUserAction(t) {
        this.#j = t
    }
    disabled() {
        if (this.#F?.disabledCondition) {
            const {disabled: e} = this.#F.disabledCondition(t.Runtime.hostConfig);
            if (e)
                return !0
        }
        return this.#q || !1
    }
    disabledReasons() {
        if (this.#F?.disabledCondition) {
            const e = this.#F.disabledCondition(t.Runtime.hostConfig);
            if (e.disabled)
                return e.reasons
        }
        return []
    }
    setDisabled(t) {
        this.#q = t,
        this.eventSupport.dispatchEventToListeners(this.name)
    }
    #K(t) {
        const e = "string" == typeof t || "number" == typeof t || "boolean" == typeof t ? t : this.#$?.stringify(t);
        void 0 !== e && this.#X && this.#X(this.name, e)
    }
    #J(t) {
        this.#Z || (this.#K(t),
        this.#Z = !0)
    }
    get() {
        if (this.#j && !this.#H)
            return this.#J(this.defaultValue),
            this.defaultValue;
        if (void 0 !== this.#U)
            return this.#J(this.#U),
            this.#U;
        if (this.#U = this.defaultValue,
        this.storage.has(this.name))
            try {
                this.#U = this.#$.parse(this.storage.get(this.name))
            } catch {
                this.storage.remove(this.name)
            }
        return this.#J(this.#U),
        this.#U
    }
    getIfNotDisabled() {
        if (!this.disabled())
            return this.get()
    }
    async forceGet() {
        const t = this.name
          , e = this.storage.get(t)
          , r = await this.storage.forceGet(t);
        if (this.#U = this.defaultValue,
        r)
            try {
                this.#U = this.#$.parse(r)
            } catch {
                this.storage.remove(this.name)
            }
        return e !== r && this.eventSupport.dispatchEventToListeners(this.name, this.#U),
        this.#J(this.#U),
        this.#U
    }
    set(t) {
        this.#K(t),
        this.#H = !0,
        this.#U = t;
        try {
            const e = this.#$.stringify(t);
            try {
                this.storage.set(this.name, e)
            } catch (t) {
                this.printSettingsSavingError(t.message, e)
            }
        } catch (t) {
            Ft.instance().error("Cannot stringify setting with name: " + this.name + ", error: " + t.message)
        }
        this.eventSupport.dispatchEventToListeners(this.name, t)
    }
    setRegistration(e) {
        this.#F = e;
        const {deprecationNotice: r} = e;
        if (r?.disabled) {
            const e = r.experiment ? t.Runtime.experiments.allConfigurableExperiments().find((t => t.name === r.experiment)) : void 0;
            e && !e.isEnabled() || (this.set(this.defaultValue),
            this.setDisabled(!0))
        }
    }
    type() {
        return this.#F ? this.#F.settingType : null
    }
    options() {
        return this.#F && this.#F.options ? this.#F.options.map((t => {
            const {value: e, title: r, text: s, raw: n} = t;
            return {
                value: e,
                title: "function" == typeof r ? r() : r,
                text: "function" == typeof s ? s() : s,
                raw: n
            }
        }
        )) : []
    }
    reloadRequired() {
        return this.#F && this.#F.reloadRequired || null
    }
    category() {
        return this.#F && this.#F.category || null
    }
    tags() {
        return this.#F && this.#F.tags ? this.#F.tags.map((t => t())).join("\0") : null
    }
    order() {
        return this.#F && this.#F.order || null
    }
    learnMore() {
        return this.#F?.learnMore ?? null
    }
    get deprecation() {
        return this.#F && this.#F.deprecationNotice ? (this.#Y || (this.#Y = new qe(this.#F)),
        this.#Y) : null
    }
    printSettingsSavingError(t, e) {
        const r = "Error saving setting with name: " + this.name + ", value length: " + e.length + ". Error: " + t;
        console.error(r),
        Ft.instance().error(r),
        this.storage.dumpSizes()
    }
}
;
De.Setting = Ye;
class Ze extends De.Setting {
    #Q;
    #tt;
    constructor(t, e, r, s, n, i) {
        super(t, e ? [{
            pattern: e
        }] : [], r, s, i),
        this.#Q = n
    }
    get() {
        const t = []
          , e = this.getAsArray();
        for (let r = 0; r < e.length; ++r) {
            const s = e[r];
            s.pattern && !s.disabled && t.push(s.pattern)
        }
        return t.join("|")
    }
    getAsArray() {
        return super.get()
    }
    set(t) {
        this.setAsArray([{
            pattern: t,
            disabled: !1
        }])
    }
    setAsArray(t) {
        this.#tt = void 0,
        super.set(t)
    }
    asRegExp() {
        if (void 0 !== this.#tt)
            return this.#tt;
        this.#tt = null;
        try {
            const t = this.get();
            t && (this.#tt = new RegExp(t,this.#Q || ""))
        } catch {}
        return this.#tt
    }
}
let Ke = class {
    static GLOBAL_VERSION_SETTING_NAME = "inspectorVersion";
    static SYNCED_VERSION_SETTING_NAME = "syncedInspectorVersion";
    static LOCAL_VERSION_SETTING_NAME = "localInspectorVersion";
    static CURRENT_VERSION = 38;
    #et;
    #rt;
    #st;
    constructor() {
        this.#et = je.instance().createSetting(De.VersionController.GLOBAL_VERSION_SETTING_NAME, De.VersionController.CURRENT_VERSION, "Global"),
        this.#rt = je.instance().createSetting(De.VersionController.SYNCED_VERSION_SETTING_NAME, De.VersionController.CURRENT_VERSION, "Synced"),
        this.#st = je.instance().createSetting(De.VersionController.LOCAL_VERSION_SETTING_NAME, De.VersionController.CURRENT_VERSION, "Local")
    }
    resetToCurrent() {
        this.#et.set(De.VersionController.CURRENT_VERSION),
        this.#rt.set(De.VersionController.CURRENT_VERSION),
        this.#st.set(De.VersionController.CURRENT_VERSION)
    }
    updateVersion() {
        const t = De.VersionController.CURRENT_VERSION
          , e = Math.min(this.#et.get(), this.#rt.get(), this.#st.get())
          , r = this.methodsToRunToUpdateVersion(e, t);
        console.assert(void 0 === this[`updateVersionFrom${t}To${t + 1}`], "Unexpected migration method found. Increment CURRENT_VERSION or remove the method.");
        for (const t of r)
            this[t].call(this);
        this.resetToCurrent()
    }
    methodsToRunToUpdateVersion(t, e) {
        const r = [];
        for (let s = t; s < e; ++s)
            r.push("updateVersionFrom" + s + "To" + (s + 1));
        return r
    }
    updateVersionFrom0To1() {
        this.clearBreakpointsWhenTooMany(je.instance().createLocalSetting("breakpoints", []), 5e5)
    }
    updateVersionFrom1To2() {
        je.instance().createSetting("previouslyViewedFiles", []).set([])
    }
    updateVersionFrom2To3() {
        je.instance().createSetting("fileSystemMapping", {}).set({}),
        He(je.instance().createSetting("fileMappingEntries", []))
    }
    updateVersionFrom3To4() {
        const t = je.instance().createSetting("showHeaSnapshotObjectsHiddenProperties", !1);
        Je("showAdvancedHeapSnapshotProperties").set(t.get()),
        He(t)
    }
    updateVersionFrom4To5() {
        const t = {
            FileSystemViewSidebarWidth: "fileSystemViewSplitViewState",
            elementsSidebarWidth: "elementsPanelSplitViewState",
            StylesPaneSplitRatio: "stylesPaneSplitViewState",
            heapSnapshotRetainersViewSize: "heapSnapshotSplitViewState",
            "InspectorView.splitView": "InspectorView.splitViewState",
            "InspectorView.screencastSplitView": "InspectorView.screencastSplitViewState",
            "Inspector.drawerSplitView": "Inspector.drawerSplitViewState",
            layerDetailsSplitView: "layerDetailsSplitViewState",
            networkSidebarWidth: "networkPanelSplitViewState",
            sourcesSidebarWidth: "sourcesPanelSplitViewState",
            scriptsPanelNavigatorSidebarWidth: "sourcesPanelNavigatorSplitViewState",
            sourcesPanelSplitSidebarRatio: "sourcesPanelDebuggerSidebarSplitViewState",
            "timeline-details": "timelinePanelDetailsSplitViewState",
            "timeline-split": "timelinePanelRecorsSplitViewState",
            "timeline-view": "timelinePanelTimelineStackSplitViewState",
            auditsSidebarWidth: "auditsPanelSplitViewState",
            layersSidebarWidth: "layersPanelSplitViewState",
            profilesSidebarWidth: "profilesPanelSplitViewState",
            resourcesSidebarWidth: "resourcesPanelSplitViewState"
        }
          , e = {};
        for (const r in t) {
            const s = t[r]
              , n = r + "H";
            let i = null;
            const a = je.instance().createSetting(r, e);
            a.get() !== e && (i = i || {},
            i.vertical = {},
            i.vertical.size = a.get(),
            He(a));
            const o = je.instance().createSetting(n, e);
            o.get() !== e && (i = i || {},
            i.horizontal = {},
            i.horizontal.size = o.get(),
            He(o)),
            i && je.instance().createSetting(s, {}).set(i)
        }
    }
    updateVersionFrom5To6() {
        const t = {
            debuggerSidebarHidden: "sourcesPanelSplitViewState",
            navigatorHidden: "sourcesPanelNavigatorSplitViewState",
            "WebInspector.Drawer.showOnLoad": "Inspector.drawerSplitViewState"
        };
        for (const e in t) {
            const r = je.instance().createSetting(e, null);
            if (null === r.get()) {
                He(r);
                continue
            }
            const s = t[e]
              , n = "WebInspector.Drawer.showOnLoad" === e
              , i = r.get() !== n;
            He(r);
            const a = i ? "OnlyMain" : "Both"
              , o = je.instance().createSetting(s, {})
              , l = o.get() || {};
            l.vertical = l.vertical || {},
            l.vertical.showMode = a,
            l.horizontal = l.horizontal || {},
            l.horizontal.showMode = a,
            o.set(l)
        }
    }
    updateVersionFrom6To7() {
        const t = {
            sourcesPanelNavigatorSplitViewState: "sourcesPanelNavigatorSplitViewState",
            elementsPanelSplitViewState: "elementsPanelSplitViewState",
            stylesPaneSplitViewState: "stylesPaneSplitViewState",
            sourcesPanelDebuggerSidebarSplitViewState: "sourcesPanelDebuggerSidebarSplitViewState"
        }
          , e = {};
        for (const r in t) {
            const t = je.instance().createSetting(r, e)
              , s = t.get();
            s !== e && (s.vertical?.size && s.vertical.size < 1 && (s.vertical.size = 0),
            s.horizontal?.size && s.horizontal.size < 1 && (s.horizontal.size = 0),
            t.set(s))
        }
    }
    updateVersionFrom7To8() {}
    updateVersionFrom8To9() {
        const t = ["skipStackFramesPattern", "workspaceFolderExcludePattern"];
        for (let e = 0; e < t.length; ++e) {
            const r = je.instance().createSetting(t[e], "");
            let s = r.get();
            if (!s)
                return;
            "string" == typeof s && (s = [s]);
            for (let t = 0; t < s.length; ++t)
                "string" == typeof s[t] && (s[t] = {
                    pattern: s[t]
                });
            r.set(s)
        }
    }
    updateVersionFrom9To10() {
        if (window.localStorage)
            for (const t in window.localStorage)
                t.startsWith("revision-history") && window.localStorage.removeItem(t)
    }
    updateVersionFrom10To11() {
        const t = je.instance().createSetting("customDevicePresets", void 0)
          , e = t.get();
        if (!Array.isArray(e))
            return;
        const r = [];
        for (let t = 0; t < e.length; ++t) {
            const s = e[t]
              , n = {};
            n.title = s.title,
            n.type = "unknown",
            n["user-agent"] = s.userAgent,
            n.capabilities = [],
            s.touch && n.capabilities.push("touch"),
            s.mobile && n.capabilities.push("mobile"),
            n.screen = {},
            n.screen.vertical = {
                width: s.width,
                height: s.height
            },
            n.screen.horizontal = {
                width: s.height,
                height: s.width
            },
            n.screen["device-pixel-ratio"] = s.deviceScaleFactor,
            n.modes = [],
            n["show-by-default"] = !0,
            n.show = "Default",
            r.push(n)
        }
        r.length && je.instance().createSetting("customEmulatedDeviceList", []).set(r),
        He(t)
    }
    updateVersionFrom11To12() {
        this.migrateSettingsFromLocalStorage()
    }
    updateVersionFrom12To13() {
        this.migrateSettingsFromLocalStorage(),
        He(je.instance().createSetting("timelineOverviewMode", ""))
    }
    updateVersionFrom13To14() {
        const t = {
            throughput: -1,
            latency: 0
        };
        je.instance().createSetting("networkConditions", t).set(t)
    }
    updateVersionFrom14To15() {
        const t = je.instance().createLocalSetting("workspaceExcludedFolders", {})
          , e = t.get()
          , r = {};
        for (const t in e) {
            r[t] = [];
            for (const s of e[t])
                r[t].push(s.path)
        }
        t.set(r)
    }
    updateVersionFrom15To16() {
        const t = je.instance().createSetting("InspectorView.panelOrder", {})
          , e = t.get();
        for (const t of Object.keys(e))
            e[t] = 10 * (e[t] + 1);
        t.set(e)
    }
    updateVersionFrom16To17() {
        const t = je.instance().createSetting("networkConditionsCustomProfiles", [])
          , e = t.get()
          , r = [];
        if (Array.isArray(e))
            for (const t of e)
                "string" == typeof t.title && "object" == typeof t.value && "number" == typeof t.value.throughput && "number" == typeof t.value.latency && r.push({
                    title: t.title,
                    value: {
                        download: t.value.throughput,
                        upload: t.value.throughput,
                        latency: t.value.latency
                    }
                });
        t.set(r)
    }
    updateVersionFrom17To18() {
        const t = je.instance().createLocalSetting("workspaceExcludedFolders", {})
          , e = t.get()
          , r = {};
        for (const t in e) {
            let s = t.replace(/\\/g, "/");
            s.startsWith("file://") || (s = s.startsWith("/") ? "file://" + s : "file:///" + s),
            r[s] = e[t]
        }
        t.set(r)
    }
    updateVersionFrom18To19() {
        const t = je.instance().createSetting("networkLogColumnsVisibility", {
            status: !0,
            type: !0,
            initiator: !0,
            size: !0,
            time: !0
        })
          , e = t.get();
        e.name = !0,
        e.timeline = !0;
        const r = {};
        for (const t in e)
            e.hasOwnProperty(t) && (r[t.toLowerCase()] = {
                visible: e[t]
            });
        je.instance().createSetting("networkLogColumns", {}).set(r),
        He(t)
    }
    updateVersionFrom19To20() {
        const t = je.instance().createSetting("InspectorView.panelOrder", {});
        je.instance().createSetting("panel-tabOrder", {}).set(t.get()),
        He(t)
    }
    updateVersionFrom20To21() {
        const t = je.instance().createSetting("networkLogColumns", {})
          , e = t.get();
        delete e.timeline,
        delete e.waterfall,
        t.set(e)
    }
    updateVersionFrom21To22() {
        const t = je.instance().createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e)
            t.url = t.sourceFileId,
            delete t.sourceFileId;
        t.set(e)
    }
    updateVersionFrom22To23() {}
    updateVersionFrom23To24() {
        const t = je.instance().createSetting("searchInContentScripts", !1);
        je.instance().createSetting("searchInAnonymousAndContentScripts", !1).set(t.get()),
        He(t)
    }
    updateVersionFrom24To25() {
        const t = je.instance().createSetting("networkLogColumns", {
            status: !0,
            type: !0,
            initiator: !0,
            size: !0,
            time: !0
        })
          , e = t.get();
        delete e.product,
        t.set(e)
    }
    updateVersionFrom25To26() {
        const t = je.instance().createSetting("messageURLFilters", {})
          , e = Object.keys(t.get()).map((t => `-url:${t}`)).join(" ");
        if (e) {
            const t = je.instance().createSetting("console.textFilter", "")
              , r = t.get() ? ` ${t.get()}` : "";
            t.set(`${e}${r}`)
        }
        He(t)
    }
    updateVersionFrom26To27() {
        function t(t, e, r) {
            const s = je.instance().createSetting(t, {})
              , n = s.get();
            e in n && (n[r] = n[e],
            delete n[e],
            s.set(n))
        }
        t("panel-tabOrder", "audits2", "audits"),
        t("panel-closeableTabs", "audits2", "audits"),
        function(t, e, r) {
            const s = je.instance().createSetting(t, "");
            s.get() === e && s.set(r)
        }("panel-selectedTab", "audits2", "audits")
    }
    updateVersionFrom27To28() {
        He(je.instance().createSetting("msDefaultThemeAlert", !1));
        const t = je.instance().createSetting("ui-theme", "systemPreferred");
        "default" === t.get() && t.set("systemPreferred")
    }
    updateVersionFrom28To29() {
        function t(t, e, r) {
            const s = je.instance().createSetting(t, {})
              , n = s.get();
            e in n && (n[r] = n[e],
            delete n[e],
            s.set(n))
        }
        t("panel-tabOrder", "audits", "lighthouse"),
        t("panel-closeableTabs", "audits", "lighthouse"),
        function(t, e, r) {
            const s = je.instance().createSetting(t, "");
            s.get() === e && s.set(r)
        }("panel-selectedTab", "audits", "lighthouse")
    }
    updateVersionFrom29To30() {
        const t = je.instance().createSetting("closeableTabs", {})
          , e = je.instance().createSetting("panel-closeableTabs", {})
          , r = je.instance().createSetting("drawer-view-closeableTabs", {})
          , s = e.get()
          , n = e.get()
          , i = Object.assign(n, s);
        t.set(i),
        He(e),
        He(r)
    }
    updateVersionFrom30To31() {
        He(je.instance().createSetting("recorder_recordings", []))
    }
    updateVersionFrom31To32() {
        const t = je.instance().createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e)
            t.resourceTypeName = "script";
        t.set(e)
    }
    updateVersionFrom32To33() {
        const t = je.instance().createLocalSetting("previouslyViewedFiles", []);
        let e = t.get();
        e = e.filter((t => "url"in t));
        for (const t of e)
            t.resourceTypeName = "script";
        t.set(e)
    }
    updateVersionFrom33To34() {
        const t = je.instance().createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e) {
            const e = t.condition.startsWith("/** DEVTOOLS_LOGPOINT */ console.log(") && t.condition.endsWith(")");
            t.isLogpoint = e
        }
        t.set(e)
    }
    updateVersionFrom34To35() {
        const t = je.instance().createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e) {
            const {condition: e, isLogpoint: r} = t;
            r && (t.condition = e.slice(37, e.length - 1))
        }
        t.set(e)
    }
    updateVersionFrom35To36() {
        je.instance().createSetting("showThirdPartyIssues", !0).set(!0)
    }
    updateVersionFrom36To37() {
        const t = t => {
            for (const e of t.keys()) {
                const r = je.normalizeSettingName(e);
                if (r !== e) {
                    const s = t.get(e);
                    He({
                        name: e,
                        storage: t
                    }),
                    t.set(r, s)
                }
            }
        }
        ;
        t(je.instance().globalStorage),
        t(je.instance().syncedStorage),
        t(je.instance().localStorage);
        for (const t of je.instance().globalStorage.keys()) {
            if (t.startsWith("data-grid-") && t.endsWith("-column-weights") || t.endsWith("-tab-order") || "views-location-override" === t || "closeable-tabs" === t) {
                const r = je.instance().createSetting(t, {});
                r.set(e.StringUtilities.toKebabCaseKeys(r.get()))
            }
            if (t.endsWith("-selected-tab")) {
                const r = je.instance().createSetting(t, "");
                r.set(e.StringUtilities.toKebabCase(r.get()))
            }
        }
        if (!je.instance().moduleSettings.has("language_edge"))
            return;
        const r = je.instance().moduleSetting("language_edge")
          , s = r?.get();
        if (!s)
            return;
        const n = [...s.matchAll(/([a-z]+)\-([a-z]+)/gi)];
        if (n && n.length > 0) {
            if ("en-us" === s.toLowerCase() || "en-xl" === s.toLowerCase() || "zh-hans" === s.toLowerCase() || "zh-hant" === s.toLowerCase())
                return;
            const t = n[0][1];
            r.set(t)
        }
    }
    updateVersionFrom37To38() {
        const t = ( () => {
            try {
                return Je("console-insights-enabled")
            } catch {
                return
            }
        }
        )()
          , e = je.instance().createLocalSetting("console-insights-onboarding-finished", !1);
        t && !0 === t.get() && !1 === e.get() && t.set(!1),
        t && !1 === t.get() && e.set(!1)
    }
    migrateSettingsFromLocalStorage() {
        const t = new Set(["advancedSearchConfig", "breakpoints", "consoleHistory", "domBreakpoints", "eventListenerBreakpoints", "fileSystemMapping", "lastSelectedSourcesSidebarPaneTab", "previouslyViewedFiles", "savedURLs", "watchExpressions", "workspaceExcludedFolders", "xhrBreakpoints"]);
        if (window.localStorage)
            for (const e in window.localStorage) {
                if (t.has(e))
                    continue;
                const r = window.localStorage[e];
                window.localStorage.removeItem(e),
                je.instance().globalStorage.set(e, r)
            }
    }
    clearBreakpointsWhenTooMany(t, e) {
        t.get().length > e && t.set([])
    }
}
;
function Je(t) {
    return je.instance().moduleSetting(t)
}
var Qe;
De.VersionController = Ke,
function(t) {
    t.FOCUSMODE = "FocusMode",
    t.LEGACYMODE = "LegacyMode"
}(Qe || (Qe = {}));
const tr = function(t) {
    return ("function" == typeof t ? t() : t) ?? ""
}
  , er = function(t) {
    const {value: e, title: r, text: s, raw: n} = t;
    return {
        value: e,
        title: tr(r),
        text: tr(s),
        raw: n
    }
}
  , rr = function(t, e) {
    return t.text && e.text ? t.text.includes("(Default)") || e.text.includes("(Default)") ? 1 : t.text.localeCompare(e.text) : 0
};
class sr extends Ye {
    constructor(t, e, r, s) {
        super(t, e, r, s)
    }
    optionsWithChildren() {
        return this.registration?.options ? this.registration.options.map((t => {
            const {children: e} = t;
            return {
                ...er(t),
                children: e ? e.map(er).sort(rr) : void 0
            }
        }
        )) : []
    }
}
class nr extends Ke {
    updateVersion() {
        super.updateVersion(),
        this.disableChromeThemeColors()
    }
    disableChromeThemeColors() {
        if (!je.instance().moduleSettings.has("chrome-theme-colors"))
            return;
        const t = je.instance().moduleSetting("chrome-theme-colors")
          , e = t?.get();
        e && t.set(!1)
    }
}
De.Setting = sr,
De.VersionController = nr;
const ir = sr
  , ar = nr;
var or = Object.freeze({
    __proto__: null,
    Deprecation: qe,
    EdgeSetting: sr,
    EdgeVersionController: nr,
    NOOP_STORAGE: Ue,
    RegExpSetting: Ze,
    Setting: ir,
    get SettingMode() {
        return Qe
    },
    Settings: je,
    SettingsStorage: $e,
    VersionController: ar,
    __scope: De,
    getLocalizedSettingsCategory: Ge,
    maybeRemoveSettingExtension: Be,
    moduleSetting: Je,
    registerSettingExtension: We,
    registerSettingsForTest: Ve,
    resetSettings: Oe,
    settingForTest: function(t) {
        return je.instance().settingForTest(t)
    }
});
var lr = Object.freeze({
    __proto__: null,
    SimpleHistoryManager: class {
        #nt;
        #it;
        #at;
        #ot;
        constructor(t) {
            this.#nt = [],
            this.#it = -1,
            this.#at = 0,
            this.#ot = t
        }
        readOnlyLock() {
            ++this.#at
        }
        releaseReadOnlyLock() {
            --this.#at
        }
        getPreviousValidIndex() {
            if (this.empty())
                return -1;
            let t = this.#it - 1;
            for (; t >= 0 && !this.#nt[t].valid(); )
                --t;
            return t < 0 ? -1 : t
        }
        getNextValidIndex() {
            let t = this.#it + 1;
            for (; t < this.#nt.length && !this.#nt[t].valid(); )
                ++t;
            return t >= this.#nt.length ? -1 : t
        }
        readOnly() {
            return Boolean(this.#at)
        }
        filterOut(t) {
            if (this.readOnly())
                return;
            const e = [];
            let r = 0;
            for (let s = 0; s < this.#nt.length; ++s)
                t(this.#nt[s]) ? s <= this.#it && ++r : e.push(this.#nt[s]);
            this.#nt = e,
            this.#it = Math.max(0, this.#it - r)
        }
        empty() {
            return !this.#nt.length
        }
        active() {
            return this.empty() ? null : this.#nt[this.#it]
        }
        push(t) {
            this.readOnly() || (this.empty() || this.#nt.splice(this.#it + 1),
            this.#nt.push(t),
            this.#nt.length > this.#ot && this.#nt.shift(),
            this.#it = this.#nt.length - 1)
        }
        canRollback() {
            return this.getPreviousValidIndex() >= 0
        }
        canRollover() {
            return this.getNextValidIndex() >= 0
        }
        rollback() {
            const t = this.getPreviousValidIndex();
            return -1 !== t && (this.readOnlyLock(),
            this.#it = t,
            this.#nt[t].reveal(),
            this.releaseReadOnlyLock(),
            !0)
        }
        rollover() {
            const t = this.getNextValidIndex();
            return -1 !== t && (this.readOnlyLock(),
            this.#it = t,
            this.#nt[t].reveal(),
            this.releaseReadOnlyLock(),
            !0)
        }
    }
});
var hr = Object.freeze({
    __proto__: null,
    StringOutputStream: class {
        #lt;
        constructor() {
            this.#lt = ""
        }
        async write(t) {
            this.#lt += t
        }
        async close() {}
        data() {
            return this.#lt
        }
    }
});
class cr {
    #ht;
    #ct;
    #ut;
    #gt;
    #dt;
    #pt;
    #mt;
    constructor(t) {
        this.#ct = 0,
        this.#mt = t,
        this.clear()
    }
    static newStringTrie() {
        return new cr({
            empty: () => "",
            append: (t, e) => t + e,
            slice: (t, e, r) => t.slice(e, r)
        })
    }
    static newArrayTrie() {
        return new cr({
            empty: () => [],
            append: (t, e) => t.concat([e]),
            slice: (t, e, r) => t.slice(e, r)
        })
    }
    add(t) {
        let e = this.#ct;
        ++this.#dt[this.#ct];
        for (let r = 0; r < t.length; ++r) {
            const s = t[r];
            let n = this.#ut[e].get(s);
            n || (this.#pt.length ? n = this.#pt.pop() : (n = this.#ht++,
            this.#gt.push(!1),
            this.#dt.push(0),
            this.#ut.push(new Map)),
            this.#ut[e].set(s, n)),
            ++this.#dt[n],
            e = n
        }
        this.#gt[e] = !0
    }
    remove(t) {
        if (!this.has(t))
            return !1;
        let e = this.#ct;
        --this.#dt[this.#ct];
        for (let r = 0; r < t.length; ++r) {
            const s = t[r]
              , n = this.#ut[e].get(s);
            --this.#dt[n] || (this.#ut[e].delete(s),
            this.#pt.push(n)),
            e = n
        }
        return this.#gt[e] = !1,
        !0
    }
    has(t) {
        let e = this.#ct;
        for (let r = 0; r < t.length; ++r)
            if (e = this.#ut[e].get(t[r]),
            !e)
                return !1;
        return this.#gt[e]
    }
    words(t) {
        t = t ?? this.#mt.empty();
        let e = this.#ct;
        for (let r = 0; r < t.length; ++r)
            if (e = this.#ut[e].get(t[r]),
            !e)
                return [];
        const r = [];
        return this.dfs(e, t, r),
        r
    }
    dfs(t, e, r) {
        this.#gt[t] && r.push(e);
        const s = this.#ut[t];
        for (const [t,n] of s) {
            const s = this.#mt.append(e, t);
            this.dfs(n, s, r)
        }
    }
    longestPrefix(t, e) {
        let r = this.#ct
          , s = 0;
        for (let n = 0; n < t.length && (r = this.#ut[r].get(t[n]),
        r); ++n)
            e && !this.#gt[r] || (s = n + 1);
        return this.#mt.slice(t, 0, s)
    }
    clear() {
        this.#ht = 1,
        this.#ct = 0,
        this.#ut = [new Map],
        this.#gt = [!1],
        this.#dt = [0],
        this.#pt = []
    }
}
var ur = Object.freeze({
    __proto__: null,
    Trie: cr
});
var gr = Object.freeze({
    __proto__: null,
    TextDictionary: class {
        words = new Map;
        index = cr.newStringTrie();
        addWord(t) {
            let e = this.words.get(t) || 0;
            ++e,
            this.words.set(t, e),
            this.index.add(t)
        }
        removeWord(t) {
            let e = this.words.get(t) || 0;
            if (e) {
                if (1 === e)
                    return this.words.delete(t),
                    void this.index.remove(t);
                --e,
                this.words.set(t, e)
            }
        }
        wordsWithPrefix(t) {
            return this.index.words(t)
        }
        hasWord(t) {
            return this.words.has(t)
        }
        wordCount(t) {
            return this.words.get(t) || 0
        }
        reset() {
            this.words.clear(),
            this.index.clear()
        }
    }
});
var dr = Object.freeze({
    __proto__: null,
    Throttler: class {
        #yt;
        #ft;
        #bt;
        #wt;
        #St;
        #xt = Promise.withResolvers();
        #vt;
        constructor(t) {
            this.#yt = t,
            this.#ft = !1,
            this.#bt = !1,
            this.#wt = null,
            this.#St = 0
        }
        #zt() {
            this.#St = this.#Tt(),
            this.#ft = !1,
            this.#wt && this.#Rt(!1)
        }
        get process() {
            return this.#wt
        }
        get processCompleted() {
            return this.#wt ? this.#xt.promise : null
        }
        #It() {
            this.#vt = void 0,
            this.#bt = !1,
            this.#ft = !0,
            Promise.resolve().then(this.#wt).catch(console.error.bind(console)).then(this.#zt.bind(this)).then(this.#xt.resolve),
            this.#xt = Promise.withResolvers(),
            this.#wt = null
        }
        async schedule(t, e="Default") {
            this.#wt = t;
            const r = Boolean(this.#vt) || this.#ft
              , s = this.#Tt() - this.#St > this.#yt
              , n = "AsSoonAsPossible" === e || "Default" === e && !r && s
              , i = n && !this.#bt;
            this.#bt = this.#bt || n,
            this.#Rt(i),
            await this.#xt.promise
        }
        #Rt(t) {
            if (this.#ft)
                return;
            if (this.#vt && !t)
                return;
            clearTimeout(this.#vt);
            const e = this.#bt ? 0 : this.#yt;
            this.#vt = window.setTimeout(this.#It.bind(this), e)
        }
        #Tt() {
            return window.performance.now()
        }
    }
});
class pr {
    #At;
    #Pt;
    constructor(t) {
        this.#At = new Promise((e => {
            const r = new Worker(t,{
                type: "module"
            });
            r.onmessage = t => {
                console.assert("workerReady" === t.data),
                r.onmessage = null,
                e(r)
            }
        }
        ))
    }
    static fromURL(t) {
        return new pr(t)
    }
    postMessage(t, e) {
        this.#At.then((r => {
            this.#Pt || r.postMessage(t, e ?? [])
        }
        ))
    }
    dispose() {
        this.#Pt = !0,
        this.#At.then((t => t.terminate()))
    }
    terminate() {
        this.dispose()
    }
    set onmessage(t) {
        this.#At.then((e => {
            e.onmessage = t
        }
        ))
    }
    set onerror(t) {
        this.#At.then((e => {
            e.onerror = t
        }
        ))
    }
}
var mr = Object.freeze({
    __proto__: null,
    WorkerWrapper: pr
});
var yr = Object.freeze({
    __proto__: null,
    CONTEXT_LENGTH_LIMIT: 5e3,
    SOURCE_CODE_EXTENDED_LENGTH: 200,
    isAIExplainConsoleErrorEnabled: function() {
        return !(!t.Runtime.experiments.isEnabled("ms-edge-ai-explain-console-error") || "true" !== t.Runtime.Runtime.queryParam("isChatEnabled"))
    }
});
class fr {
    maxSafeSize;
    map;
    next;
    constructor(t=16777215) {
        this.maxSafeSize = t,
        this.map = new Map,
        this.next = null
    }
    set(t, e) {
        return this.map.has(t) || this.map.size < this.maxSafeSize ? (this.map.set(t, e),
        this) : (this.next || (this.next = new fr(this.maxSafeSize)),
        this.next.set(t, e),
        this)
    }
    get(t) {
        return this.map.has(t) ? this.map.get(t) : this.next ? this.next.get(t) : void 0
    }
    get size() {
        return this.map.size + (this.next ? this.next.size : 0)
    }
    has(t) {
        return !(!this.map.has(t) && !this.next?.has(t))
    }
    *entries() {
        yield*this.map.entries(),
        this.next && (yield*this.next.entries())
    }
    *keys() {
        yield*this.map.keys(),
        this.next && (yield*this.next.keys())
    }
    *values() {
        yield*this.map.values(),
        this.next && (yield*this.next.values())
    }
    clear() {
        this.next && (this.next.clear(),
        this.next = null),
        this.map.clear()
    }
    delete(t) {
        return !!this.map.delete(t) || !!this.next && this.next.delete(t)
    }
    forEach(t) {
        this.map.forEach(t),
        this.next && this.next.map.forEach(t)
    }
    [Symbol.iterator]() {
        return this.entries()
    }
    get[Symbol.toStringTag]() {
        return "LinkedMap"
    }
}
var br = Object.freeze({
    __proto__: null,
    LinkedMap: fr
});
s.RuntimeSupport.setDisplayConsoleErrorCallback((t => {
    Ft.instance().error(t)
}
)),
s.RuntimeSupport.setSettingsChecker(( (t, e) => je.instance().createSetting(t, e).get()));
export {n as App, a as AppProvider, h as Base64, c as CharacterIdMap, Ct as Color, E as ColorConverter, H as ColorUtils, $t as Console, Ht as Debouncer, qt as EventTarget, Yt as JavaScriptMetaData, Jt as Lazy, ee as Linkifier, se as MapWithDefault, ne as Mutex, _t as ObjectWrapper, oe as ParsedURL, he as Progress, ce as QueryParamHandler, ue as ResolverBase, ve as ResourceType, Xt as Revealer, Ie as Runnable, Pe as SegmentedRange, Xe as SettingRegistration, or as Settings, lr as SimpleHistoryManager, hr as StringOutputStream, gr as TextDictionary, dr as Throttler, ur as Trie, mr as Worker, yr as edge_Copilot, br as edge_LinkedMap};
//# sourceMappingURL=common.js.map
