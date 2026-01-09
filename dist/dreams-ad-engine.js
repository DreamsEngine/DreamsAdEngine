/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Z = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ft = (n) => new zt(typeof n == "string" ? n : n + "", void 0, ut), Et = (n, t) => {
  if (Z) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = j.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, et = Z ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ft(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xt, defineProperty: It, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: Ct, getOwnPropertySymbols: Ut, getPrototypeOf: Tt } = Object, m = globalThis, it = m.trustedTypes, kt = it ? it.emptyScript : "", q = m.reactiveElementPolyfillSupport, U = (n, t) => n, B = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? kt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Y = (n, t) => !xt(n, t), st = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: Y };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && It(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = Pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, i = [...Ct(e), ...Ut(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(et(s));
    } else t !== void 0 && e.push(et(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Et(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : B;
      this._$Em = s;
      const h = d.fromAttribute(e, a.type);
      this[s] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Y)(o, e) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: a } = r, d = this[o];
        a !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, r, d);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[U("elementProperties")] = /* @__PURE__ */ new Map(), z[U("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: z }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, nt = (n) => n, F = T.trustedTypes, ot = F ? F.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, vt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + y, Lt = `<${$t}>`, S = document, O = () => S.createComment(""), M = (n) => n === null || typeof n != "object" && typeof n != "function", Q = Array.isArray, Ot = (n) => Q(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, at = />/g, _ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, lt = /"/g, yt = /^(?:script|style|textarea|title)$/i, Mt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), C = Mt(1), x = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), b = S.createTreeWalker(S, 129);
function mt(n, t) {
  if (!Q(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const Nt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = P;
  for (let a = 0; a < e; a++) {
    const d = n[a];
    let h, f, p = -1, v = 0;
    for (; v < d.length && (r.lastIndex = v, f = r.exec(d), f !== null); ) v = r.lastIndex, r === P ? f[1] === "!--" ? r = rt : f[1] !== void 0 ? r = at : f[2] !== void 0 ? (yt.test(f[2]) && (s = RegExp("</" + f[2], "g")), r = _) : f[3] !== void 0 && (r = _) : r === _ ? f[0] === ">" ? (r = s ?? P, p = -1) : f[1] === void 0 ? p = -2 : (p = r.lastIndex - f[2].length, h = f[1], r = f[3] === void 0 ? _ : f[3] === '"' ? lt : dt) : r === lt || r === dt ? r = _ : r === rt || r === at ? r = P : (r = _, s = void 0);
    const $ = r === _ && n[a + 1].startsWith("/>") ? " " : "";
    o += r === P ? d + Lt : p >= 0 ? (i.push(h), d.slice(0, p) + vt + d.slice(p) + y + $) : d + y + (p === -2 ? a : $);
  }
  return [mt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [h, f] = Nt(t, e);
    if (this.el = N.createElement(h, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = b.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(vt)) {
          const v = f[r++], $ = s.getAttribute(p).split(y), D = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: o, name: D[2], strings: $, ctor: D[1] === "." ? Dt : D[1] === "?" ? Rt : D[1] === "@" ? jt : W }), s.removeAttribute(p);
        } else p.startsWith(y) && (d.push({ type: 6, index: o }), s.removeAttribute(p));
        if (yt.test(s.tagName)) {
          const p = s.textContent.split(y), v = p.length - 1;
          if (v > 0) {
            s.textContent = F ? F.emptyScript : "";
            for (let $ = 0; $ < v; $++) s.append(p[$], O()), b.nextNode(), d.push({ type: 2, index: ++o });
            s.append(p[v], O());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $t) d.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(y, p + 1)) !== -1; ) d.push({ type: 7, index: o }), p += y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(n, t, e = n, i) {
  var r, a;
  if (t === x) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = I(n, s._$AS(n, t.values), s, i)), t;
}
class Ht {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    b.currentNode = s;
    let o = b.nextNode(), r = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let h;
        d.type === 2 ? h = new H(o, o.nextSibling, this, t) : d.type === 1 ? h = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (h = new Bt(o, this, t)), this._$AV.push(h), d = i[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = b.nextNode(), r++);
    }
    return b.currentNode = S, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = I(this, t, e), M(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(mt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const r = new Ht(s, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new H(this.O(O()), this.O(O()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = nt(t).nextSibling;
      nt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = I(this, t, e, 0), r = !M(t) || t !== this._$AH && t !== x, r && (this._$AH = t);
    else {
      const a = t;
      let d, h;
      for (t = o[0], d = 0; d < o.length - 1; d++) h = I(this, a[i + d], e, d), h === x && (h = this._$AH[d]), r || (r = !M(h) || h !== this._$AH[d]), h === u ? t = u : t !== u && (t += (h ?? "") + o[d + 1]), this._$AH[d] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Rt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class jt extends W {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? u) === x) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const J = T.litHtmlPolyfillSupport;
J == null || J(N, H), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.2");
const Ft = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new H(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class k extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ft(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return x;
  }
}
var gt;
k._$litElement$ = !0, k.finalized = !0, (gt = A.litElementHydrateSupport) == null || gt.call(A, { LitElement: k });
const K = A.litElementPolyfillSupport;
K == null || K({ LitElement: k });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: Y }, Vt = (n = qt, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const d = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, d, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const d = this[r];
      t.call(this, a), this.requestUpdate(r, d, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function g(n) {
  return (t, e) => typeof e == "object" ? Vt(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Jt(n) {
  return g({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function pt(n, t, e) {
  return n ? t(n) : e == null ? void 0 : e(n);
}
const Kt = `:host {
	display: var(--dae-display, block);
	contain: var(--dae-contain, content);
	min-height: var(--dae-min-heigh, 100px);
}
::slotted(*) {
	display: var(--dae-slotted-display, block);
	z-index: var(--dae-slotted-z-index, 9);
}

.ad-serving-rendered {
	position: var(--dae-ad-serving-rendered-position, sticky);
	z-index: var(--dae-ad-serving-rendered-z-index, 2);
	top: var(--dae-ad-serving-rendered-top, 1rem);
}

.ad-container {
	position: var(--dae-ad-container-position, relative);
}
.pinno-ad-container {
	position: var(--dae-pinno-ad-container-position, relative);
}
.ad-label {
	display: var(--dae-ad-label-display, block);
	font-size: var(--dae-ad-label-font-size, 9px);
	font-weight: var(--dae-ad-label-font-weight, 400);
	letter-spacing: var(--dae-ad-label-letter-spacing, 0.2em);
	margin-bottom: var(--dae-ad-label-margin-bottom, 4px);
	line-height: var(--dae-ad-label-line-height, 1);
	position: var(--dae-ad-label-position, relative);
	text-align: var(--dae-ad-label-text-align, center);
	text-transform: var(--dae-ad-label-text-transform, uppercase);
	color: var(--dae-ad-label-color, #999999);
}
.ad-label + .ad-loader {
	top: var(--dae-ad-loader-top, 13px);
	height: var(--dae-ad-loader-height, calc(100% - 13px));
}
.ad-loader {
	position: var(--dae-ad-loader-position, absolute);
	top: var(--dae-ad-loader-top, 0);
	left: var(--dae-ad-loader-left, 0);
	width: var(--dae-ad-loader-width, 100%);
	height: var(--dae-ad-loader-height, 100%);
	background-color: var(--dae-ad-loader-background-color, #eee);
	background-image: var(
		--dae-ad-loader-background-image,
		linear-gradient(
			90deg,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0)
		)
	);
	background-size: var(--dae-ad-loader-background-size, 40px 100%);
	background-repeat: var(--dae-ad-loader-background-repeat, no-repeat);
	background-position: var(
		--dae-ad-loader-background-position,
		left -40px top 0
	);
	animation: var(--dae-ad-loader-animation, ad-skeleton 2s ease infinite);
	z-index: var(--dae-ad-loader-z-index, 2);
}
.ad-serving {
	position: var(--dae-ad-serving-position, relative);
	display: var(--dae-ad-serving-display, flex);
	flex-wrap: var(--dae-ad-serving-flex-wrap, wrap);
	align-items: var(--dae-ad-serving-align-items, flex-start);
	justify-content: var(--dae-ad-serving-justify-content, center);
	padding-block: var(--dae-ad-serving-padding-block, 1rem);
	margin-block: var(--dae-ad-serving-margin-block, 1rem);
	min-height: var(--dae-ad-serving-min-height, 100px);
}
.ad-serving::before {
	content: var(--dae-ad-serving-before-content, "[AD]");
	position: var(--dae-ad-serving-before-position, absolute);
	top: var(--dae-ad-serving-before-top, 0);
	left: var(--dae-ad-serving-before-left, 0);
	width: var(--dae-ad-serving-before-width, 100%);
	height: var(--dae-ad-serving-before-height, 100%);
	display: var(--dae-ad-serving-before-display, flex);
	align-items: var(--dae-ad-serving-before-align-items, center);
	justify-content: var(--dae-ad-serving-before-justify-content, center);
	color: var(--dae-ad-serving-before-color, #ccc);
	z-index: var(--dae-ad-serving-before-z-index, 1);
}

@keyframes ad-skeleton {
	to {
		background-position: right -40px top 0;
	}
}
`, Gt = {
  "top-1": {
    mapping: [
      { viewport: [320, 0], sizing: [[320, 50], [320, 100]] },
      { viewport: [720, 0], sizing: [[728, 90]] },
      { viewport: [970, 0], sizing: [[920, 250], [970, 90], [728, 90]] },
      { viewport: [1280, 0], sizing: [[920, 250], [970, 250], [970, 90], [728, 90]] }
    ],
    sizing: [[320, 50], [320, 100], [728, 90], [970, 90], [920, 250], [970, 250]],
    position: "top"
  },
  "top-2": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250], [320, 50]] },
      { viewport: [760, 0], sizing: [[728, 90]] },
      { viewport: [970, 90], sizing: [[970, 90], [728, 90]] }
    ],
    sizing: [[300, 250], [320, 50], [728, 90], [970, 90]],
    position: "top"
  },
  "top-3": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250], [320, 50]] },
      { viewport: [760, 0], sizing: [[728, 90]] },
      { viewport: [970, 90], sizing: [[970, 90], [728, 90]] }
    ],
    sizing: [[300, 250], [320, 50], [728, 90], [970, 90]],
    position: "top"
  },
  "top-4": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250], [320, 50]] },
      { viewport: [760, 0], sizing: [[728, 90]] },
      { viewport: [970, 90], sizing: [[970, 90], [728, 90]] }
    ],
    sizing: [[300, 250], [320, 50], [728, 90], [970, 90]],
    position: "top"
  },
  "top-5": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250]] },
      { viewport: [760, 0], sizing: [[728, 90]] }
    ],
    sizing: [[300, 250], [320, 50], [728, 90]],
    position: "top"
  },
  "box-1": {
    mapping: [{ viewport: [320, 0], sizing: [[300, 250]] }],
    sizing: [[300, 250], [300, 600]],
    position: "box"
  },
  "box-2": {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1], [300, 250], [300, 600]] }],
    sizing: [[300, 250], [300, 600], [1, 1]],
    position: "box"
  },
  "box-3": {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1], [300, 250], [300, 600]] }],
    sizing: [[300, 250], [300, 600], [1, 1]],
    position: "box"
  },
  "box-4": {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1], [300, 250], [300, 600]] }],
    sizing: [[300, 250], [300, 600], [1, 1]],
    position: "box"
  },
  "box-5": {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1], [300, 250], [300, 600]] }],
    sizing: [[1, 1], [300, 250], [300, 600]],
    position: "box"
  },
  footer: {
    mapping: [{ viewport: [0, 0], sizing: [[320, 50], [320, 100]] }],
    sizing: [[320, 50], [320, 100]],
    position: "footer"
  },
  interstitial: {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1]] }],
    sizing: [[1, 1]],
    position: "interstitial"
  }
}, Zt = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, X = class X {
  static init(t) {
    this.instance = {
      networkId: t.networkId,
      sitePrefix: t.sitePrefix,
      pubId: t.pubId || "",
      bidTimeout: t.bidTimeout || 2e3,
      defaultLazyLoad: t.defaultLazyLoad || Zt,
      slots: {
        ...Gt,
        ...t.slots
      }
    };
  }
  static isInitialized() {
    return this.instance !== null;
  }
  static getNetworkId() {
    return this.assertInitialized(), this.instance.networkId;
  }
  static getSitePrefix() {
    return this.assertInitialized(), this.instance.sitePrefix;
  }
  static getPubId() {
    return this.assertInitialized(), this.instance.pubId || void 0;
  }
  static getBidTimeout() {
    return this.assertInitialized(), this.instance.bidTimeout;
  }
  static getDefaultLazyLoad() {
    return this.assertInitialized(), this.instance.defaultLazyLoad;
  }
  static getSlot(t) {
    return this.assertInitialized(), this.instance.slots[t];
  }
  static getSlotMapping(t) {
    const e = this.getSlot(t);
    if (!e)
      throw new Error(`Unknown ad slot: ${t}`);
    return e.mapping;
  }
  static getSlotSizing(t) {
    const e = this.getSlot(t);
    if (!e)
      throw new Error(`Unknown ad slot: ${t}`);
    return e.sizing;
  }
  static getSlotPosition(t) {
    const e = this.getSlot(t);
    return (e == null ? void 0 : e.position) || "top";
  }
  static buildAdUnit(t) {
    this.assertInitialized();
    const e = this.instance.sitePrefix, s = {
      "top-1": "is-t-01",
      "top-2": "is-t-02",
      "top-3": "is-t-03",
      "top-4": "is-t-04",
      "top-5": "is-t-05",
      "box-1": "is-b-01",
      "box-2": "is-b-02",
      "box-3": "is-b-03",
      "box-4": "is-b-04",
      "box-5": "is-b-05",
      footer: "is-f-01",
      interstitial: "is-i"
    }[t];
    return s ? `${e}-${s}` : `${e}-${t}`;
  }
  static registerSlot(t, e) {
    this.assertInitialized(), this.instance.slots[t] = e;
  }
  static reset() {
    this.instance = null;
  }
  static assertInitialized() {
    if (!this.instance)
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first."
      );
  }
};
X.instance = null;
let w = X;
const ct = {
  contextKey: "@context",
  maxRetries: 20,
  retryInterval: 100,
  includeUrl: !0,
  customSegmentFn: "_rl_gen_sg"
}, L = class L {
  static async getTargeting(t) {
    const e = { ...ct, ...t }, i = typeof window < "u" ? window.location.href : "";
    if (this.cache && this.cacheUrl === i)
      return { targeting: this.cache, source: "cache" };
    if (this.pendingPromise)
      return this.pendingPromise;
    this.pendingPromise = this.pollForContext(e, i);
    const s = await this.pendingPromise;
    return this.pendingPromise = null, s;
  }
  static pollForContext(t, e) {
    return new Promise((i) => {
      let s = 0;
      const o = () => {
        if (typeof window > "u") return !1;
        const a = window.dfp;
        if (!(a != null && a[t.contextKey])) return !1;
        const d = a[t.contextKey], h = this.buildFromContext(d, t);
        return this.cache = h, this.cacheUrl = e, i({ targeting: h, source: "context" }), !0;
      };
      if (o()) return;
      const r = setInterval(() => {
        if (s++, o()) {
          clearInterval(r);
          return;
        }
        s >= t.maxRetries && (clearInterval(r), i({ targeting: [], source: "timeout" }));
      }, t.retryInterval);
    });
  }
  static buildFromContext(t, e) {
    var o, r;
    const i = { ...ct, ...e }, s = [];
    if (i.includeUrl && typeof window < "u" && s.push({ key: "url", value: window.location.pathname }), (o = t.dataSection) != null && o.catName && s.push({ key: "catName", value: t.dataSection.catName }), t.postId && s.push({ key: "postId", value: t.postId }), t.catId && s.push({ key: "catId", value: t.catId }), t.tagId && s.push({ key: "tag", value: t.tagId }), t.typeId && s.push({ key: "type", value: t.typeId }), t.taxId && s.push({ key: "taxId", value: t.taxId }), (r = t.dataSection) != null && r.author && s.push({ key: "author", value: t.dataSection.author }), typeof window < "u" && i.customSegmentFn) {
      const a = window[i.customSegmentFn];
      if (typeof a == "function") {
        const d = a();
        d && s.push({ key: "_rl", value: d });
      }
    }
    return s;
  }
  static clearCache() {
    this.cache = null, this.cacheUrl = "", this.pendingPromise = null;
  }
  static getTargetingSync() {
    const t = typeof window < "u" ? window.location.href : "";
    return this.cache && this.cacheUrl === t ? this.cache : null;
  }
};
L.cache = null, L.cacheUrl = "", L.pendingPromise = null;
let G = L;
var Yt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, _t = (n) => {
  throw TypeError(n);
}, c = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Qt(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && Yt(t, e, s), s;
}, Xt = (n, t, e) => t.has(n) || _t("Cannot " + e), te = (n, t, e) => t.has(n) ? _t("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), R = (n, t, e) => (Xt(n, t, "access private method"), e), E, wt, bt, At, St;
let l = class extends k {
  constructor() {
    super(...arguments), te(this, E), this.networkId = "", this.adUnit = "", this.divId = "", this.slot = "", this.mapping = [], this.sizing = [], this.targeting = [], this.autoTargeting = !1, this.resolvedTargeting = [], this.setCentering = !1, this.enableLazyLoad = !1, this.configLazyLoad = {
      fetchMarginPercent: 500,
      renderMarginPercent: 200,
      mobileScaling: 2
    }, this.refresh = !1, this.enableTitle = !1, this.apstag = !1, this.pubId = "", this.bidTimeout = 2e3, this.title = "Publicidad", this.adLoaded = !1;
  }
  connectedCallback() {
    if (super.connectedCallback(), !l.initialized)
      R(this, E, wt).call(this), l.initialized = !0, l.old_url = location.href;
    else {
      const n = location.href;
      l.old_url !== n && (window.googletag.destroySlots(window.dreamsAllSlots), l.old_url = n, window.dreamsAllSlots = [], window.dreamsSlotsToUpdate = []);
    }
  }
  async firstUpdated() {
    await R(this, E, bt).call(this), await R(this, E, At).call(this), this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`, this.apstag && this.pubId && !l.initialized_aps && (window.apstag.init({
      pubID: this.pubId,
      adServer: "googletag",
      bidTimeout: this.bidTimeout
    }), l.initialized_aps = !0), R(this, E, St).call(this);
  }
  render() {
    return C`
			<div class="ad-container">
				${pt(
      this.enableTitle,
      () => C`<span class="ad-label">${this.title}</span>`,
      () => C``
    )}
				${pt(
      !this.adLoaded,
      () => C`<div
							class="ad-loader"
							data-ad-loader="${this.divId}"
						></div>`,
      () => C``
    )}
				<div
					class="ad-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
				>
					<slot name="ad-slot"></slot>
				</div>
			</div>
		`;
  }
};
E = /* @__PURE__ */ new WeakSet();
wt = function() {
  window.googletag = window.googletag || { cmd: [] }, window.googletag.cmd.push(() => {
    window.dreamsAllSlots = window.dreamsAllSlots || [], window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [], window.googletag.enableServices();
  });
};
bt = async function() {
  if (this.slot && w.isInitialized()) {
    const n = w.getSlot(this.slot);
    n && (this.networkId || (this.networkId = w.getNetworkId()), this.adUnit || (this.adUnit = w.buildAdUnit(this.slot)), (!this.mapping || this.mapping.length === 0) && (this.mapping = n.mapping), (!this.sizing || this.sizing.length === 0) && (this.sizing = n.sizing), this.pubId || (this.pubId = w.getPubId() || ""), this.pubId && (this.apstag = !0));
  }
  typeof this.mapping == "string" && (this.mapping = JSON.parse(this.mapping)), typeof this.sizing == "string" && (this.sizing = JSON.parse(this.sizing)), this.targeting && typeof this.targeting == "string" && (this.targeting = JSON.parse(this.targeting)), this.configLazyLoad && typeof this.configLazyLoad == "string" && (this.configLazyLoad = JSON.parse(this.configLazyLoad));
};
At = async function() {
  if (this.autoTargeting) {
    const n = await G.getTargeting();
    this.resolvedTargeting = n.targeting;
  } else this.targeting && this.targeting.length > 0 && (this.resolvedTargeting = this.targeting);
};
St = function() {
  const n = `/${this.networkId}/${this.adUnit}`, t = this.divId, e = document.createElement("div");
  e.id = t, e.setAttribute("data-ad", this.divId), e.setAttribute("slot", "ad-slot"), e.classList.add("ad-serving-rendered"), e.parentElement || this.appendChild(e), window.googletag.cmd.push(() => {
    window.googletag.pubads().setCentering(this.setCentering), this.enableLazyLoad && window.googletag.pubads().enableLazyLoad(this.configLazyLoad);
    const i = window.googletag.defineSlot(n, this.sizing, t).addService(window.googletag.pubads());
    this.resolvedTargeting.forEach((a) => {
      i.setTargeting(a.key, a.value);
    }), window.googletag.pubads().addEventListener("slotRenderEnded", (a) => {
      a.slot.getSlotElementId() === t && (this.adLoaded = !0);
    });
    const s = window.googletag.sizeMapping();
    this.mapping.forEach((a) => {
      s.addSize(a.viewport, a.sizing);
    });
    const o = s.build(), r = i.defineSizeMapping(o).addService(window.googletag.pubads());
    this.refresh && window.dreamsSlotsToUpdate.push(i), window.dreamsAllSlots.push(r), !this.apstag && !this.pubId && window.googletag.display(t), this.apstag && this.pubId && window.apstag.fetchBids({
      slots: [
        {
          slotID: t,
          slotName: n,
          sizes: this.sizing
        }
      ]
    }, () => {
      window.googletag.cmd.push(() => {
        window.apstag.setDisplayBids(), window.googletag.pubads().refresh([r]);
      });
    });
  });
};
l.styles = ft(Kt);
l.initialized = !1;
l.old_url = "";
l.initialized_aps = !1;
c([
  g({ type: String })
], l.prototype, "networkId", 2);
c([
  g({ type: String })
], l.prototype, "adUnit", 2);
c([
  g({ type: String })
], l.prototype, "divId", 2);
c([
  g({ type: String })
], l.prototype, "slot", 2);
c([
  g({ type: Array })
], l.prototype, "mapping", 2);
c([
  g({ type: Array })
], l.prototype, "sizing", 2);
c([
  g({ type: Array })
], l.prototype, "targeting", 2);
c([
  g({ type: Boolean, reflect: !0 })
], l.prototype, "autoTargeting", 2);
c([
  Jt()
], l.prototype, "resolvedTargeting", 2);
c([
  g({ type: Boolean, reflect: !0 })
], l.prototype, "setCentering", 2);
c([
  g({ type: Boolean, reflect: !0 })
], l.prototype, "enableLazyLoad", 2);
c([
  g({ type: Object })
], l.prototype, "configLazyLoad", 2);
c([
  g({ type: Boolean, reflect: !0 })
], l.prototype, "refresh", 2);
c([
  g({ type: Boolean, reflect: !0 })
], l.prototype, "enableTitle", 2);
c([
  g({ type: Boolean, reflect: !0 })
], l.prototype, "apstag", 2);
c([
  g({ type: String })
], l.prototype, "pubId", 2);
c([
  g({ type: Number })
], l.prototype, "bidTimeout", 2);
c([
  g({ type: String })
], l.prototype, "title", 2);
c([
  g({ type: Boolean })
], l.prototype, "adLoaded", 2);
l = c([
  Wt("dreams-ad-engine")
], l);
export {
  Gt as DEFAULT_SLOTS,
  l as DreamsAdComponent,
  w as DreamsAdConfig,
  G as DreamsTargetingService
};
