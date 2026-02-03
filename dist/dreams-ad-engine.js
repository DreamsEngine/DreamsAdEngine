/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, nt = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), ct = /* @__PURE__ */ new WeakMap();
let It = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (nt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (n) => new It(typeof n == "string" ? n : n + "", void 0, ot), qt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new It(e, n, ot);
}, Wt = (n, t) => {
  if (nt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = W.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, ht = nt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ut(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Gt, defineProperty: Jt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Xt, getPrototypeOf: Yt } = Object, b = globalThis, pt = b.trustedTypes, Qt = pt ? pt.emptyScript : "", Q = b.reactiveElementPolyfillSupport, I = (n, t) => n, G = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Qt : null;
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
} }, rt = (n, t) => !Gt(n, t), ut = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let T = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Jt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Yt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, i = [...Zt(e), ...Xt(e)];
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
      for (const s of i) e.unshift(ht(s));
    } else t !== void 0 && e.push(ht(t));
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
    return Wt(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : G).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : G;
      this._$Em = s;
      const c = a.fromAttribute(e, l.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? rt)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: l } = o, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[I("elementProperties")] = /* @__PURE__ */ new Map(), T[I("finalized")] = /* @__PURE__ */ new Map(), Q == null || Q({ ReactiveElement: T }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, gt = (n) => n, J = U.trustedTypes, ft = J ? J.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ot = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Dt = "?" + v, te = `<${Dt}>`, k = document, M = () => k.createComment(""), H = (n) => n === null || typeof n != "object" && typeof n != "function", at = Array.isArray, ee = (n) => at(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", tt = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, wt = />/g, $ = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, vt = /"/g, Nt = /^(?:script|style|textarea|title)$/i, ie = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), y = ie(1), C = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), bt = /* @__PURE__ */ new WeakMap(), A = k.createTreeWalker(k, 129);
function Rt(n, t) {
  if (!at(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(t) : t;
}
const se = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = L;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, p, h = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, p = o.exec(a), p !== null); ) m = o.lastIndex, o === L ? p[1] === "!--" ? o = mt : p[1] !== void 0 ? o = wt : p[2] !== void 0 ? (Nt.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = $) : p[3] !== void 0 && (o = $) : o === $ ? p[0] === ">" ? (o = s ?? L, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? $ : p[3] === '"' ? vt : yt) : o === vt || o === yt ? o = $ : o === mt || o === wt ? o = L : (o = $, s = void 0);
    const w = o === $ && n[l + 1].startsWith("/>") ? " " : "";
    r += o === L ? a + te : h >= 0 ? (i.push(c), a.slice(0, h) + Ot + a.slice(h) + v + w) : a + v + (h === -2 ? l : w);
  }
  return [Rt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, p] = se(t, e);
    if (this.el = V.createElement(c, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = A.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ot)) {
          const m = p[o++], w = s.getAttribute(h).split(v), j = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: j[2], strings: w, ctor: j[1] === "." ? oe : j[1] === "?" ? re : j[1] === "@" ? ae : Y }), s.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Nt.test(s.tagName)) {
          const h = s.textContent.split(v), m = h.length - 1;
          if (m > 0) {
            s.textContent = J ? J.emptyScript : "";
            for (let w = 0; w < m; w++) s.append(h[w], M()), A.nextNode(), a.push({ type: 2, index: ++r });
            s.append(h[m], M());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Dt) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += v.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(n, t, e = n, i) {
  var o, l;
  if (t === C) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = H(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = P(n, s._$AS(n, t.values), s, i)), t;
}
class ne {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    A.currentNode = s;
    let r = A.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new B(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new le(r, this, t)), this._$AV.push(c), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = A.nextNode(), o++);
    }
    return A.currentNode = k, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class B {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = P(this, t, e), H(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = V.createElement(Rt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new ne(s, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = bt.get(t.strings);
    return e === void 0 && bt.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new B(this.O(M()), this.O(M()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = gt(t).nextSibling;
      gt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = P(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = P(this, l[i + a], e, a), c === C && (c = this._$AH[a]), o || (o = !H(c) || c !== this._$AH[a]), c === f ? t = f : t !== f && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class oe extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class re extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ae extends Y {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? f) === C) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class le {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const et = U.litHtmlPolyfillSupport;
et == null || et(V, B), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.2");
const de = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new B(t.insertBefore(M(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
class z extends T {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = de(e, this.renderRoot, this.renderOptions);
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
    return C;
  }
}
var Lt;
z._$litElement$ = !0, z.finalized = !0, (Lt = S.litElementHydrateSupport) == null || Lt.call(S, { LitElement: z });
const it = S.litElementPolyfillSupport;
it == null || it({ LitElement: z });
(S.litElementVersions ?? (S.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: rt }, he = (n = ce, t, e) => {
  const { kind: i, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function u(n) {
  return (t, e) => typeof e == "object" ? he(n, t, e) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function pe(n) {
  return u({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $t(n, t, e) {
  return n ? t(n) : e == null ? void 0 : e(n);
}
const ue = `:host {
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
`, ge = {
  "top-1": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [320, 50],
          [320, 100]
        ]
      },
      { viewport: [720, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 0],
        sizing: [
          [920, 250],
          [970, 90],
          [728, 90]
        ]
      },
      {
        viewport: [1280, 0],
        sizing: [
          [920, 250],
          [970, 250],
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [320, 50],
      [320, 100],
      [728, 90],
      [970, 90],
      [920, 250],
      [970, 250]
    ],
    position: "top"
  },
  "top-2": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50]
        ]
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 90],
        sizing: [
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90]
    ],
    position: "top"
  },
  "top-3": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50]
        ]
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 90],
        sizing: [
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90]
    ],
    position: "top"
  },
  "top-4": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50]
        ]
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 90],
        sizing: [
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90]
    ],
    position: "top"
  },
  "top-5": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250]] },
      { viewport: [760, 0], sizing: [[728, 90]] }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90]
    ],
    position: "top"
  },
  "box-1": {
    mapping: [{ viewport: [320, 0], sizing: [[300, 250]] }],
    sizing: [
      [300, 250],
      [300, 600]
    ],
    position: "box"
  },
  "box-2": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1]
    ],
    position: "box"
  },
  "box-3": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1]
    ],
    position: "box"
  },
  "box-4": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1]
    ],
    position: "box"
  },
  "box-5": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [1, 1],
      [300, 250],
      [300, 600]
    ],
    position: "box"
  },
  footer: {
    mapping: [
      {
        viewport: [0, 0],
        sizing: [
          [320, 50],
          [320, 100]
        ]
      }
    ],
    sizing: [
      [320, 50],
      [320, 100]
    ],
    position: "footer"
  },
  interstitial: {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1]] }],
    sizing: [[1, 1]],
    position: "interstitial"
  }
}, fe = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, lt = class lt {
  static init(t) {
    if (this.instance && !t.force) {
      console.warn(
        "[DreamsAdConfig] Already initialized. Use { force: true } to override."
      );
      return;
    }
    this.instance = {
      networkId: t.networkId,
      sitePrefix: t.sitePrefix,
      pubId: t.pubId || "",
      bidTimeout: t.bidTimeout || 2e3,
      defaultLazyLoad: t.defaultLazyLoad || fe,
      slots: {
        ...ge,
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
lt.instance = null;
let _ = lt;
const _t = {
  contextKey: "@context",
  maxRetries: 20,
  retryInterval: 100,
  includeUrl: !0,
  customSegmentFn: "_rl_gen_sg"
}, O = class O {
  static async getTargeting(t) {
    const e = { ..._t, ...t }, i = typeof window < "u" ? window.location.href : "";
    if (this.cache && this.cacheUrl === i)
      return { targeting: this.cache, source: "cache" };
    if (this.pendingPromise)
      return this.pendingPromise;
    try {
      return this.pendingPromise = this.pollForContext(e, i), await this.pendingPromise;
    } finally {
      this.pendingPromise = null;
    }
  }
  static pollForContext(t, e) {
    return new Promise((i, s) => {
      let r = 0, o = null;
      const l = () => {
        if (typeof window > "u") return null;
        const c = window.dfp;
        if (!(c != null && c[t.contextKey])) return null;
        try {
          const p = c[t.contextKey], h = this.buildFromContext(p, t);
          return this.cache = h, this.cacheUrl = e, { targeting: h, source: "context" };
        } catch (p) {
          return s(p), null;
        }
      }, a = l();
      if (a) {
        i(a);
        return;
      }
      o = setInterval(() => {
        r++;
        const c = l();
        if (c) {
          o && clearInterval(o), i(c);
          return;
        }
        r >= t.maxRetries && (o && clearInterval(o), i({ targeting: [], source: "timeout" }));
      }, t.retryInterval);
    });
  }
  static buildFromContext(t, e) {
    var r, o;
    const i = { ..._t, ...e }, s = [];
    if (i.includeUrl && typeof window < "u" && s.push({ key: "url", value: window.location.pathname }), (r = t.dataSection) != null && r.catName && s.push({ key: "catName", value: t.dataSection.catName }), t.postId && s.push({ key: "postId", value: t.postId }), t.catId && s.push({ key: "catId", value: t.catId }), t.tagId && s.push({ key: "tag", value: t.tagId }), t.typeId && s.push({ key: "type", value: t.typeId }), t.taxId && s.push({ key: "taxId", value: t.taxId }), (o = t.dataSection) != null && o.author && s.push({ key: "author", value: t.dataSection.author }), typeof window < "u" && i.customSegmentFn) {
      const l = window[i.customSegmentFn];
      if (typeof l == "function") {
        const a = l();
        a && s.push({ key: "_rl", value: a });
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
O.cache = null, O.cacheUrl = "", O.pendingPromise = null;
let K = O;
const At = {
  threshold: 0.5,
  // IAB: 50% visible
  duration: 2e3,
  // IAB: 2 seconds
  debug: !1
}, X = class X {
  /**
   * Configure the viewability service
   */
  static configure(t) {
    this.config = { ...At, ...t };
  }
  /**
   * Start tracking an ad element for viewability
   */
  static track(t, e, i) {
    if (this.trackedAds.has(e))
      return;
    const s = {
      adId: e,
      position: i,
      isViewable: !1,
      viewableTime: 0,
      totalTime: 0,
      viewabilityRate: 0
    }, r = new IntersectionObserver(
      (l) => this.handleIntersection(l, e),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px"
      }
    ), o = {
      element: t,
      metrics: s,
      observer: r,
      viewabilityTimer: null,
      trackingInterval: null,
      startTime: Date.now(),
      isCurrentlyVisible: !1
    };
    this.trackedAds.set(e, o), r.observe(t), this.dispatchEvent("impression", e, s), this.config.debug && console.log(`[Viewability] Tracking started: ${e}`);
  }
  /**
   * Stop tracking an ad element
   */
  static untrack(t) {
    const e = this.trackedAds.get(t);
    e && (e.observer.disconnect(), e.viewabilityTimer && clearTimeout(e.viewabilityTimer), e.trackingInterval && clearInterval(e.trackingInterval), this.trackedAds.delete(t), this.config.debug && console.log(`[Viewability] Tracking stopped: ${t}`));
  }
  /**
   * Get metrics for a specific ad
   */
  static getMetrics(t) {
    const e = this.trackedAds.get(t);
    return e ? { ...e.metrics } : null;
  }
  /**
   * Get all tracked metrics
   */
  static getAllMetrics() {
    return Array.from(this.trackedAds.values()).map((t) => ({ ...t.metrics }));
  }
  /**
   * Show metrics summary in console
   */
  static showMetrics() {
    const t = this.getAllMetrics();
    if (t.length === 0) {
      console.log("[Viewability] No ads being tracked");
      return;
    }
    console.table(
      t.map((e) => ({
        "Ad ID": e.adId,
        Position: e.position,
        Viewable: e.isViewable ? "✓" : "✗",
        "Viewable Time": `${(e.viewableTime / 1e3).toFixed(1)}s`,
        "Total Time": `${(e.totalTime / 1e3).toFixed(1)}s`,
        "Viewability %": `${e.viewabilityRate.toFixed(1)}%`
      }))
    );
  }
  /**
   * Clear all tracking
   */
  static reset() {
    for (const t of this.trackedAds.keys())
      this.untrack(t);
  }
  static handleIntersection(t, e) {
    const i = this.trackedAds.get(e);
    if (i)
      for (const s of t) {
        const r = s.intersectionRatio >= this.config.threshold;
        r && !i.isCurrentlyVisible ? (i.isCurrentlyVisible = !0, this.startViewabilityTimer(e)) : !r && i.isCurrentlyVisible && (i.isCurrentlyVisible = !1, this.stopViewabilityTimer(e), this.dispatchEvent("hidden", e, i.metrics));
      }
  }
  static startViewabilityTimer(t) {
    const e = this.trackedAds.get(t);
    e && (e.viewabilityTimer = setTimeout(() => {
      e.metrics.isViewable || (e.metrics.isViewable = !0, this.dispatchEvent("viewable", t, e.metrics), this.config.debug && console.log(`[Viewability] Ad viewable: ${t}`));
    }, this.config.duration), e.trackingInterval = setInterval(() => {
      this.updateMetrics(t);
    }, 500));
  }
  static stopViewabilityTimer(t) {
    const e = this.trackedAds.get(t);
    e && (e.viewabilityTimer && (clearTimeout(e.viewabilityTimer), e.viewabilityTimer = null), e.trackingInterval && (clearInterval(e.trackingInterval), e.trackingInterval = null));
  }
  static updateMetrics(t) {
    const e = this.trackedAds.get(t);
    if (!e) return;
    const i = Date.now();
    e.metrics.totalTime = i - e.startTime, e.isCurrentlyVisible && (e.metrics.viewableTime += 500), e.metrics.totalTime > 0 && (e.metrics.viewabilityRate = e.metrics.viewableTime / e.metrics.totalTime * 100);
  }
  static dispatchEvent(t, e, i) {
    const s = new CustomEvent("ad:viewability", {
      detail: {
        type: t,
        adId: e,
        metrics: { ...i },
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(s);
  }
};
X.config = At, X.trackedAds = /* @__PURE__ */ new Map();
let Z = X;
var me = Object.defineProperty, we = Object.getOwnPropertyDescriptor, F = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? we(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && me(t, e, s), s;
};
let E = class extends z {
  constructor() {
    super(...arguments), this.width = 300, this.height = 250, this.showLabel = !1, this.label = "Ad";
  }
  render() {
    return y`
      <div
        class="skeleton"
        style="width: ${this.width}px; height: ${this.height}px;"
      >
        ${this.showLabel ? y`<span class="skeleton-label">${this.label}</span>` : ""}
      </div>
    `;
  }
};
E.styles = qt`
    :host {
      display: block;
    }

    .skeleton {
      position: relative;
      overflow: hidden;
      background: var(--dreams-skeleton-bg, #f0f0f0);
      border-radius: var(--dreams-skeleton-radius, 4px);
    }

    .skeleton::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--dreams-skeleton-shine, rgba(255, 255, 255, 0.6)) 50%,
        transparent 100%
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .skeleton-label {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: var(--dreams-skeleton-label-color, #999);
      font-family: system-ui, -apple-system, sans-serif;
    }
  `;
F([
  u({ type: Number })
], E.prototype, "width", 2);
F([
  u({ type: Number })
], E.prototype, "height", 2);
F([
  u({ type: Boolean })
], E.prototype, "showLabel", 2);
F([
  u({ type: String })
], E.prototype, "label", 2);
E = F([
  Mt("dreams-ad-skeleton")
], E);
function ye(n, t) {
  const e = t >= 1280, i = t >= 728;
  switch (n) {
    case "top-1":
      return e ? { width: 970, height: 250 } : i ? { width: 728, height: 90 } : { width: 320, height: 100 };
    case "top-2":
    case "top-3":
    case "top-4":
    case "top-5":
      return e ? { width: 970, height: 90 } : i ? { width: 728, height: 90 } : { width: 320, height: 50 };
    case "box-1":
    case "box-2":
    case "box-3":
    case "box-4":
    case "box-5":
      return { width: 300, height: 250 };
    case "footer":
      return { width: 320, height: 50 };
    case "interstitial":
      return { width: 1, height: 1 };
    default:
      return { width: 300, height: 250 };
  }
}
var ve = Object.defineProperty, be = Object.getOwnPropertyDescriptor, Ht = (n) => {
  throw TypeError(n);
}, g = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? be(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && ve(t, e, s), s;
}, $e = (n, t, e) => t.has(n) || Ht("Cannot " + e), _e = (n, t, e) => t.has(n) ? Ht("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), q = (n, t, e) => ($e(n, t, "access private method"), e), x, Vt, Bt, Ft, jt;
let d = class extends z {
  constructor() {
    super(...arguments), _e(this, x), this.adSlot = null, this.slotRenderHandler = null, this.networkId = "", this.adUnit = "", this.divId = "", this.slot = "", this.mapping = [], this.sizing = [], this.targeting = [], this.autoTargeting = !1, this.resolvedTargeting = [], this.setCentering = !1, this.enableLazyLoad = !1, this.configLazyLoad = {
      fetchMarginPercent: 500,
      renderMarginPercent: 200,
      mobileScaling: 2
    }, this.refresh = !1, this.enableTitle = !1, this.apstag = !1, this.pubId = "", this.bidTimeout = 2e3, this.title = "Publicidad", this.adLoaded = !1, this.trackViewability = !1, this.showSkeleton = !1;
  }
  /**
   * Set up global navigation listeners for SPA support
   */
  static _setupNavigationListeners() {
    if (d.navigationListenersAttached || typeof window > "u") return;
    window.addEventListener("popstate", d._handleNavigation), window.addEventListener("hashchange", d._handleNavigation);
    const n = history.pushState.bind(history), t = history.replaceState.bind(history);
    history.pushState = (...e) => {
      n(...e), d._handleNavigation();
    }, history.replaceState = (...e) => {
      t(...e), d._handleNavigation();
    }, d.navigationListenersAttached = !0;
  }
  connectedCallback() {
    super.connectedCallback(), d.initialized ? d._handleNavigation() : (q(this, x, Vt).call(this), d.initialized = !0, d.old_url = location.href);
  }
  disconnectedCallback() {
    var n, t;
    if (super.disconnectedCallback(), this.trackViewability && this.divId && Z.untrack(this.divId), this.slotRenderHandler && ((n = window.googletag) != null && n.pubads) && (window.googletag.pubads().removeEventListener("slotRenderEnded", this.slotRenderHandler), this.slotRenderHandler = null), this.adSlot) {
      if (window.dreamsAllSlots) {
        const e = window.dreamsAllSlots.indexOf(this.adSlot);
        e > -1 && window.dreamsAllSlots.splice(e, 1);
      }
      if (window.dreamsSlotsToUpdate) {
        const e = window.dreamsSlotsToUpdate.indexOf(this.adSlot);
        e > -1 && window.dreamsSlotsToUpdate.splice(e, 1);
      }
      (t = window.googletag) != null && t.destroySlots && window.googletag.destroySlots([this.adSlot]), this.adSlot = null;
    }
  }
  async firstUpdated() {
    var n;
    if (await q(this, x, Bt).call(this), await q(this, x, Ft).call(this), this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`, this.apstag && this.pubId && !d.initialized_aps)
      if (typeof ((n = window.apstag) == null ? void 0 : n.init) == "function")
        try {
          window.apstag.init({
            pubID: this.pubId,
            adServer: "googletag",
            bidTimeout: this.bidTimeout
          }), d.initialized_aps = !0;
        } catch {
          this.apstag = !1;
        }
      else
        this.apstag = !1;
    q(this, x, jt).call(this);
  }
  render() {
    const n = this.showSkeleton ? ye(this.slot || "box-1", window.innerWidth) : { width: 0, height: 0 };
    return y`
			<div class="ad-container">
				${$t(
      this.enableTitle,
      () => y`<span class="ad-label">${this.title}</span>`,
      () => y``
    )}
				${$t(
      !this.adLoaded,
      () => this.showSkeleton ? y`<dreams-ad-skeleton
                  width="${n.width}"
                  height="${n.height}"
                ></dreams-ad-skeleton>` : y`<div
                  class="ad-loader"
                  data-ad-loader="${this.divId}"
                ></div>`,
      () => y``
    )}
				<div
					class="ad-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
					style="${!this.adLoaded && this.showSkeleton ? "opacity: 0;" : ""}"
				>
					<slot name="ad-slot"></slot>
				</div>
			</div>
		`;
  }
};
x = /* @__PURE__ */ new WeakSet();
Vt = function() {
  window.googletag = window.googletag || { cmd: [] }, window.googletag.cmd.push(() => {
    window.dreamsAllSlots = window.dreamsAllSlots || [], window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [];
    const n = window.googletag.pubadsReady === !0;
    d.servicesWereAlreadyEnabled = n, n || window.googletag.enableServices();
  }), d._setupNavigationListeners();
};
Bt = async function() {
  if (this.slot && _.isInitialized()) {
    const n = _.getSlot(this.slot);
    n && (this.networkId || (this.networkId = _.getNetworkId()), this.adUnit || (this.adUnit = _.buildAdUnit(this.slot)), (!this.mapping || this.mapping.length === 0) && (this.mapping = n.mapping), (!this.sizing || this.sizing.length === 0) && (this.sizing = n.sizing), this.pubId || (this.pubId = _.getPubId() || ""), this.pubId && (this.apstag = !0));
  }
  if (typeof this.mapping == "string")
    try {
      this.mapping = JSON.parse(this.mapping);
    } catch {
      this.mapping = [];
    }
  if (typeof this.sizing == "string")
    try {
      this.sizing = JSON.parse(this.sizing);
    } catch {
      this.sizing = [];
    }
  if (this.targeting && typeof this.targeting == "string")
    try {
      this.targeting = JSON.parse(this.targeting);
    } catch {
      this.targeting = [];
    }
  if (this.configLazyLoad && typeof this.configLazyLoad == "string")
    try {
      this.configLazyLoad = JSON.parse(this.configLazyLoad);
    } catch {
      this.configLazyLoad = {
        fetchMarginPercent: 500,
        renderMarginPercent: 200,
        mobileScaling: 2
      };
    }
};
Ft = async function() {
  if (this.autoTargeting) {
    const n = await K.getTargeting();
    this.resolvedTargeting = n.targeting;
  } else this.targeting && this.targeting.length > 0 && (this.resolvedTargeting = this.targeting);
};
jt = function() {
  const n = `/${this.networkId}/${this.adUnit}`, t = this.divId, e = document.createElement("div");
  e.id = t, e.setAttribute("data-ad", this.divId), e.setAttribute("slot", "ad-slot"), e.classList.add("ad-serving-rendered"), e.parentElement || this.appendChild(e), window.googletag.cmd.push(() => {
    var a;
    window.googletag.pubads().setCentering(this.setCentering), this.enableLazyLoad && !d.lazyLoadConfigured && (window.googletag.pubads().enableLazyLoad(this.configLazyLoad), d.lazyLoadConfigured = !0);
    const i = window.googletag.defineSlot(n, this.sizing, t).addService(window.googletag.pubads());
    this.resolvedTargeting.forEach((c) => {
      i.setTargeting(c.key, c.value);
    }), this.slotRenderHandler = (c) => {
      if (c.slot.getSlotElementId() === t && (this.adLoaded = !0, this.trackViewability)) {
        const p = this.querySelector(`#${t}`);
        p instanceof HTMLElement && Z.track(
          p,
          t,
          this.slot || this.adUnit
        );
      }
    }, window.googletag.pubads().addEventListener("slotRenderEnded", this.slotRenderHandler);
    const s = window.googletag.sizeMapping();
    this.mapping.forEach((c) => {
      s.addSize(c.viewport, c.sizing);
    });
    const r = s.build(), o = i.defineSizeMapping(r).addService(window.googletag.pubads());
    if (this.adSlot = o, this.refresh && window.dreamsSlotsToUpdate.push(o), window.dreamsAllSlots.push(o), !(this.apstag && this.pubId))
      window.googletag.display(t), d.servicesWereAlreadyEnabled && window.googletag.pubads().refresh([o]);
    else {
      if (typeof ((a = window.apstag) == null ? void 0 : a.fetchBids) != "function") {
        window.googletag.display(t), d.servicesWereAlreadyEnabled && window.googletag.pubads().refresh([o]);
        return;
      }
      let c = !1;
      const p = this.bidTimeout || 2e3, h = setTimeout(() => {
        c || (c = !0, window.googletag.cmd.push(() => {
          window.googletag.pubads().refresh([o]);
        }));
      }, p + 500);
      window.apstag.fetchBids(
        {
          slots: [
            {
              slotID: t,
              slotName: n,
              sizes: this.sizing
            }
          ]
        },
        () => {
          c || (c = !0, clearTimeout(h), window.googletag.cmd.push(() => {
            window.apstag.setDisplayBids(), window.googletag.pubads().refresh([o]);
          }));
        }
      );
    }
  });
};
d.styles = Ut(ue);
d.initialized = !1;
d.old_url = "";
d.initialized_aps = !1;
d.navigationListenersAttached = !1;
d.servicesWereAlreadyEnabled = !1;
d.lazyLoadConfigured = !1;
d._handleNavigation = () => {
  var t, e;
  const n = location.href;
  d.old_url !== n && ((t = window.googletag) != null && t.destroySlots && ((e = window.dreamsAllSlots) == null ? void 0 : e.length) > 0 && window.googletag.destroySlots(window.dreamsAllSlots), d.old_url = n, window.dreamsAllSlots = [], window.dreamsSlotsToUpdate = [], K.clearCache());
};
g([
  u({ type: String })
], d.prototype, "networkId", 2);
g([
  u({ type: String })
], d.prototype, "adUnit", 2);
g([
  u({ type: String })
], d.prototype, "divId", 2);
g([
  u({ type: String })
], d.prototype, "slot", 2);
g([
  u({ type: Array })
], d.prototype, "mapping", 2);
g([
  u({ type: Array })
], d.prototype, "sizing", 2);
g([
  u({ type: Array })
], d.prototype, "targeting", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "autoTargeting", 2);
g([
  pe()
], d.prototype, "resolvedTargeting", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "setCentering", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "enableLazyLoad", 2);
g([
  u({ type: Object })
], d.prototype, "configLazyLoad", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "refresh", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "enableTitle", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "apstag", 2);
g([
  u({ type: String })
], d.prototype, "pubId", 2);
g([
  u({ type: Number })
], d.prototype, "bidTimeout", 2);
g([
  u({ type: String })
], d.prototype, "title", 2);
g([
  u({ type: Boolean })
], d.prototype, "adLoaded", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "trackViewability", 2);
g([
  u({ type: Boolean, reflect: !0 })
], d.prototype, "showSkeleton", 2);
d = g([
  Mt("dreams-ad-engine")
], d);
const St = {
  enabled: !0,
  addBodyClass: !0,
  bodyClass: "ad-blocker-detected",
  timeout: 1e3
}, D = class D {
  /**
   * Configure the ad block detector
   */
  static configure(t) {
    this.config = { ...St, ...t };
  }
  /**
   * Check if ad blocker is detected (cached result)
   */
  static isBlocked() {
    return this.detected === !0;
  }
  /**
   * Run ad blocker detection
   */
  static async detect() {
    if (this.detected !== null)
      return {
        blocked: this.detected,
        method: this.detected ? "googletag" : "none"
      };
    if (this.detecting)
      return this.detecting;
    this.detecting = this.runDetection();
    const t = await this.detecting;
    return this.detecting = null, t;
  }
  /**
   * Initialize detection and apply body class if blocked
   */
  static async init() {
    if (!this.config.enabled)
      return !1;
    const t = await this.detect();
    return t.blocked && this.config.addBodyClass && document.body.classList.add(this.config.bodyClass), window.dispatchEvent(
      new CustomEvent("adblock:detected", {
        detail: t
      })
    ), t.blocked;
  }
  /**
   * Reset detection state
   */
  static reset() {
    this.detected = null, this.detecting = null, window.adBlockDetected = void 0, this.config.addBodyClass && document.body.classList.remove(this.config.bodyClass);
  }
  static async runDetection() {
    const t = [
      () => this.testGoogleTag(),
      () => this.testBaitElement(),
      () => this.testFetch()
    ];
    for (const e of t)
      try {
        const i = await e();
        if (i != null && i.blocked)
          return this.detected = !0, window.adBlockDetected = !0, i;
      } catch {
      }
    return this.detected = !1, window.adBlockDetected = !1, { blocked: !1, method: "none" };
  }
  /**
   * Method 1: Check if googletag loaded properly
   */
  static testGoogleTag() {
    return new Promise((t) => {
      setTimeout(() => {
        const e = typeof window.googletag > "u" || typeof window.googletag.pubads != "function";
        t(e ? { blocked: !0, method: "googletag" } : null);
      }, 100);
    });
  }
  /**
   * Method 2: Bait element detection
   * Ad blockers often hide elements with common ad class names
   */
  static testBaitElement() {
    return new Promise((t) => {
      const e = document.createElement("div");
      e.className = "adsbox ad-placement pub_300x250 pub_728x90 text-ad textAd text_ad", e.style.cssText = "position: absolute; top: -10px; left: -10px; width: 1px; height: 1px;", e.innerHTML = "&nbsp;", document.body.appendChild(e), requestAnimationFrame(() => {
        const i = e.offsetHeight === 0 || e.offsetParent === null || window.getComputedStyle(e).display === "none" || window.getComputedStyle(e).visibility === "hidden";
        e.remove(), t(i ? { blocked: !0, method: "bait" } : null);
      });
    });
  }
  /**
   * Method 3: Fetch a known ad resource
   */
  static testFetch() {
    return new Promise((t) => {
      const e = new AbortController(), i = setTimeout(
        () => e.abort(),
        this.config.timeout
      );
      fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
        signal: e.signal
      }).then(() => {
        clearTimeout(i), t(null);
      }).catch(() => {
        clearTimeout(i), t({ blocked: !0, method: "fetch" });
      });
    });
  }
};
D.config = St, D.detected = null, D.detecting = null;
let kt = D;
const st = 3e4, Et = {
  enabled: !1,
  interval: 6e4,
  checkVisibility: !0,
  disableOnSinglePost: !0,
  singlePostSelector: "body.single"
}, N = class N {
  /**
   * Configure the refresh manager
   */
  static configure(t) {
    this.config = { ...Et, ...t }, this.config.interval < st && (this.config.interval = st);
  }
  /**
   * Start auto-refresh loop
   */
  static start() {
    !this.config.enabled || this.running || this.config.disableOnSinglePost && document.querySelector(this.config.singlePostSelector) || (this.running = !0, this.setupVisibilityTracking(), this.scheduleRefresh());
  }
  /**
   * Stop auto-refresh loop
   */
  static stop() {
    this.running = !1, this.refreshTimer && (clearTimeout(this.refreshTimer), this.refreshTimer = null);
  }
  /**
   * Manually trigger a refresh (respects safeguards)
   */
  static refresh(t) {
    return this.safeRefresh(t);
  }
  /**
   * Block refresh (e.g., during user interaction)
   */
  static block() {
    window.DreamsBlockedRefresh = !0;
  }
  /**
   * Unblock refresh
   */
  static unblock() {
    window.DreamsBlockedRefresh = !1;
  }
  /**
   * Check if refresh is currently blocked
   */
  static isBlocked() {
    return window.DreamsBlockedRefresh === !0;
  }
  static setupVisibilityTracking() {
    typeof window > "u" || (window.isTabVisible = !document.hidden, document.addEventListener("visibilitychange", () => {
      window.isTabVisible = !document.hidden;
    }));
  }
  static scheduleRefresh() {
    this.running && (this.refreshTimer = setTimeout(() => {
      this.executeRefresh(), this.scheduleRefresh();
    }, this.config.interval));
  }
  static executeRefresh() {
    if (this.config.checkVisibility && !window.isTabVisible) {
      this.dispatchEvent("skipped", "hidden");
      return;
    }
    if (window.DreamsBlockedRefresh) {
      this.dispatchEvent("skipped", "blocked");
      return;
    }
    this.safeRefresh() || this.dispatchEvent("skipped", "throttled");
  }
  static safeRefresh(t) {
    var l;
    if (!((l = window.googletag) != null && l.pubads))
      return !1;
    const e = Date.now(), i = window.lastAdRefresh || 0;
    if (e - i < st)
      return !1;
    window.lastAdRefresh = e;
    const r = t || window.dreamsSlotsToUpdate || [], o = r.length;
    if (o === 0)
      return !1;
    try {
      return window.googletag.pubads().refresh(r, {
        changeCorrelator: !1
      }), this.dispatchEvent("refresh", void 0, o), !0;
    } catch {
      return !1;
    }
  }
  static dispatchEvent(t, e, i = 0) {
    window.dispatchEvent(
      new CustomEvent("ad:refresh", {
        detail: {
          type: t,
          reason: e,
          slots: i,
          timestamp: Date.now()
        }
      })
    );
  }
};
N.config = Et, N.refreshTimer = null, N.running = !1;
let Tt = N;
const xt = {
  enabled: "auto",
  prefix: "[DreamsAdEngine]",
  verbose: !1
}, dt = class dt {
  /**
   * Configure the logger
   */
  static configure(t) {
    this.config = { ...xt, ...t };
  }
  /**
   * Log info message
   */
  static log(t, ...e) {
    this.shouldLog() && console.log(`${this.config.prefix} ${t}`, ...e);
  }
  /**
   * Log warning message
   */
  static warn(t, ...e) {
    this.shouldLog() && console.warn(`${this.config.prefix} ${t}`, ...e);
  }
  /**
   * Log error message (always logs in production, but less verbose)
   */
  static error(t, ...e) {
    this.isProduction() ? console.error(`${this.config.prefix} Error: ${t}`) : console.error(`${this.config.prefix} ${t}`, ...e);
  }
  /**
   * Log verbose/debug message (only when verbose is enabled)
   */
  static debug(t, ...e) {
    !this.shouldLog() || !this.config.verbose || console.debug(`${this.config.prefix} ${t}`, ...e);
  }
  /**
   * Log a table (useful for metrics)
   */
  static table(t) {
    this.shouldLog() && console.table(t);
  }
  /**
   * Group logs together
   */
  static group(t) {
    this.shouldLog() && console.group(`${this.config.prefix} ${t}`);
  }
  /**
   * End log group
   */
  static groupEnd() {
    this.shouldLog() && console.groupEnd();
  }
  /**
   * Time a operation
   */
  static time(t) {
    this.shouldLog() && console.time(`${this.config.prefix} ${t}`);
  }
  /**
   * End timing
   */
  static timeEnd(t) {
    this.shouldLog() && console.timeEnd(`${this.config.prefix} ${t}`);
  }
  static shouldLog() {
    return this.config.enabled === !0 ? !0 : this.config.enabled === !1 ? !1 : !this.isProduction();
  }
  static isProduction() {
    if (typeof window > "u") return !0;
    const t = window.location.hostname;
    return t !== "localhost" && !t.includes(".local") && !t.includes("127.0.0.1") && !t.includes("192.168.") && !t.includes("0.0.0.0");
  }
};
dt.config = xt;
let zt = dt;
const Ct = {
  enabled: !1,
  positions: [],
  minViewportHeight: 768,
  topOffset: 80,
  headerSelector: null,
  smoothTransition: !0,
  transitionDuration: 150
}, R = class R {
  /**
   * Configure the sticky manager
   */
  static configure(t) {
    this.config = { ...Ct, ...t };
  }
  /**
   * Check if a position supports sticky
   */
  static isStickyPosition(t) {
    return this.config.positions.includes(t);
  }
  /**
   * Enable sticky behavior for an ad element
   */
  static enable(t, e, i) {
    if (!this.config.enabled || !this.isStickyPosition(i) || this.stickyAds.has(e) || window.innerHeight < this.config.minViewportHeight)
      return !1;
    const s = t.querySelector(
      '[class*="ad-serving"]'
    );
    if (!s) return !1;
    const r = this.getTopOffset();
    this.config.smoothTransition && (s.style.transition = `top ${this.config.transitionDuration}ms ease-out`), s.style.position = "sticky", s.style.top = `${r}px`, s.style.alignSelf = "flex-start", s.style.zIndex = "10";
    const o = {
      adId: e,
      position: i,
      stickyTime: 0,
      totalTime: 0,
      isCurrentlySticky: !1
    }, l = () => this.handleScroll(e, r), a = {
      element: s,
      container: t,
      metrics: o,
      startTime: Date.now(),
      stickyStartTime: null,
      scrollHandler: l
    };
    return this.stickyAds.set(e, a), window.addEventListener("scroll", l, { passive: !0 }), !0;
  }
  /**
   * Disable sticky behavior for an ad
   */
  static disable(t) {
    const e = this.stickyAds.get(t);
    e && (e.element.style.position = "", e.element.style.top = "", e.element.style.alignSelf = "", e.element.style.zIndex = "", e.element.style.transition = "", window.removeEventListener("scroll", e.scrollHandler), this.stickyAds.delete(t));
  }
  /**
   * Get metrics for a sticky ad
   */
  static getMetrics(t) {
    const e = this.stickyAds.get(t);
    return e ? (e.metrics.totalTime = Date.now() - e.startTime, { ...e.metrics }) : null;
  }
  /**
   * Get all sticky metrics
   */
  static getAllMetrics() {
    return Array.from(this.stickyAds.values()).map((t) => (t.metrics.totalTime = Date.now() - t.startTime, { ...t.metrics }));
  }
  /**
   * Reset all sticky ads
   */
  static reset() {
    for (const t of this.stickyAds.keys())
      this.disable(t);
  }
  static getTopOffset() {
    if (this.config.headerSelector) {
      const t = document.querySelector(
        this.config.headerSelector
      );
      if (t)
        return t.offsetHeight + 10;
    }
    return this.config.topOffset;
  }
  static handleScroll(t, e) {
    const i = Date.now();
    i - this.lastScrollTime < 100 || (this.lastScrollTime = i, requestAnimationFrame(() => this.checkSticky(t, e)));
  }
  static checkSticky(t, e) {
    const i = this.stickyAds.get(t);
    if (!i) return;
    const r = i.element.getBoundingClientRect().top <= e + 5;
    r && !i.stickyStartTime ? (i.stickyStartTime = Date.now(), i.metrics.isCurrentlySticky = !0, this.dispatchEvent("sticky:start", t, i.metrics)) : !r && i.stickyStartTime && (i.metrics.stickyTime += Date.now() - i.stickyStartTime, i.stickyStartTime = null, i.metrics.isCurrentlySticky = !1, this.dispatchEvent("sticky:end", t, i.metrics));
  }
  static dispatchEvent(t, e, i) {
    window.dispatchEvent(
      new CustomEvent(t, {
        detail: {
          adId: e,
          metrics: { ...i },
          timestamp: Date.now()
        }
      })
    );
  }
};
R.config = Ct, R.stickyAds = /* @__PURE__ */ new Map(), R.lastScrollTime = 0;
let Pt = R;
export {
  kt as AdBlockDetector,
  ge as DEFAULT_SLOTS,
  d as DreamsAdComponent,
  _ as DreamsAdConfig,
  E as DreamsAdSkeleton,
  K as DreamsTargetingService,
  zt as Logger,
  Tt as RefreshManager,
  Pt as StickyManager,
  Z as ViewabilityService,
  ye as getSkeletonDimensions
};
