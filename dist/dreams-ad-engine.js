var ht = (s) => {
  throw TypeError(s);
};
var Qt = (s, t, e) => t.has(s) || ht("Cannot " + e);
var pt = (s, t, e) => t.has(s) ? ht("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e);
var ut = (s, t, e) => (Qt(s, t, "access private method"), e);
const q = globalThis, nt = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Rt = /* @__PURE__ */ Symbol(), gt = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (nt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ee = (s) => new te(typeof s == "string" ? s : s + "", void 0, Rt), ie = (s, t) => {
  if (nt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = q.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, ft = nt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ee(e);
})(s) : s;
const { is: se, defineProperty: ne, getOwnPropertyDescriptor: re, getOwnPropertyNames: oe, getOwnPropertySymbols: ae, getPrototypeOf: le } = Object, Q = globalThis, mt = Q.trustedTypes, de = mt ? mt.emptyScript : "", ce = Q.reactiveElementPolyfillSupport, O = (s, t) => s, G = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? de : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, rt = (s, t) => !se(s, t), wt = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = wt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && ne(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = re(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: n, set(a) {
      const o = n?.call(this);
      r?.call(this, a), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = le(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...oe(e), ...ae(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(ft(n));
    } else t !== void 0 && e.push(ft(t));
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
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ie(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : G).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : G;
      this._$Em = n;
      const o = a.fromAttribute(e, r.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? rt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: a } = r, o = this[n];
        a !== !0 || this._$AL.has(n) || o === void 0 || this.C(n, void 0, r, o);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[O("elementProperties")] = /* @__PURE__ */ new Map(), x[O("finalized")] = /* @__PURE__ */ new Map(), ce?.({ ReactiveElement: x }), (Q.reactiveElementVersions ??= []).push("2.1.2");
const ot = globalThis, yt = (s) => s, W = ot.trustedTypes, bt = W ? W.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ot = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Ht = "?" + E, he = `<${Ht}>`, C = document, V = () => C.createComment(""), M = (s) => s === null || typeof s != "object" && typeof s != "function", at = Array.isArray, pe = (s) => at(s) || typeof s?.[Symbol.iterator] == "function", et = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, $t = />/g, _ = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), St = /'/g, At = /"/g, Dt = /^(?:script|style|textarea|title)$/i, ue = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), k = ue(1), P = /* @__PURE__ */ Symbol.for("lit-noChange"), b = /* @__PURE__ */ Symbol.for("lit-nothing"), Et = /* @__PURE__ */ new WeakMap(), I = C.createTreeWalker(C, 129);
function Nt(s, t) {
  if (!at(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const ge = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = R;
  for (let o = 0; o < e; o++) {
    const l = s[o];
    let c, h, u = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, h = a.exec(l), h !== null); ) f = a.lastIndex, a === R ? h[1] === "!--" ? a = vt : h[1] !== void 0 ? a = $t : h[2] !== void 0 ? (Dt.test(h[2]) && (n = RegExp("</" + h[2], "g")), a = _) : h[3] !== void 0 && (a = _) : a === _ ? h[0] === ">" ? (a = n ?? R, u = -1) : h[1] === void 0 ? u = -2 : (u = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? _ : h[3] === '"' ? At : St) : a === At || a === St ? a = _ : a === vt || a === $t ? a = R : (a = _, n = void 0);
    const p = a === _ && s[o + 1].startsWith("/>") ? " " : "";
    r += a === R ? l + he : u >= 0 ? (i.push(c), l.slice(0, u) + Ot + l.slice(u) + E + p) : l + E + (u === -2 ? o : p);
  }
  return [Nt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [c, h] = ge(t, e);
    if (this.el = B.createElement(c, i), I.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = I.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(Ot)) {
          const f = h[a++], p = n.getAttribute(u).split(E), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: r, name: v[2], strings: p, ctor: v[1] === "." ? me : v[1] === "?" ? we : v[1] === "@" ? ye : tt }), n.removeAttribute(u);
        } else u.startsWith(E) && (l.push({ type: 6, index: r }), n.removeAttribute(u));
        if (Dt.test(n.tagName)) {
          const u = n.textContent.split(E), f = u.length - 1;
          if (f > 0) {
            n.textContent = W ? W.emptyScript : "";
            for (let p = 0; p < f; p++) n.append(u[p], V()), I.nextNode(), l.push({ type: 2, index: ++r });
            n.append(u[f], V());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ht) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(E, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += E.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function U(s, t, e = s, i) {
  if (t === P) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = M(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = U(s, n._$AS(s, t.values), n, i)), t;
}
class fe {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? C).importNode(e, !0);
    I.currentNode = n;
    let r = I.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new j(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new be(r, this, t)), this._$AV.push(c), l = i[++o];
      }
      a !== l?.index && (r = I.nextNode(), a++);
    }
    return I.currentNode = C, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = U(this, t, e), M(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== b && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Nt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const r = new fe(n, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Et.get(t.strings);
    return e === void 0 && Et.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new j(this.O(V()), this.O(V()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = yt(t).nextSibling;
      yt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = U(this, t, e, 0), a = !M(t) || t !== this._$AH && t !== P, a && (this._$AH = t);
    else {
      const o = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = U(this, o[i + l], e, l), c === P && (c = this._$AH[l]), a ||= !M(c) || c !== this._$AH[l], c === b ? t = b : t !== b && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
class we extends tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== b);
  }
}
class ye extends tt {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = U(this, t, e, 0) ?? b) === P) return;
    const i = this._$AH, n = t === b && i !== b || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== b && (i === b || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class be {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const ve = ot.litHtmlPolyfillSupport;
ve?.(B, j), (ot.litHtmlVersions ??= []).push("3.3.2");
const $e = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new j(t.insertBefore(V(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const lt = globalThis;
class z extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $e(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
z._$litElement$ = !0, z.finalized = !0, lt.litElementHydrateSupport?.({ LitElement: z });
const Se = lt.litElementPolyfillSupport;
Se?.({ LitElement: z });
(lt.litElementVersions ??= []).push("4.2.2");
const Vt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
const Ae = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: rt }, Ee = (s = Ae, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, s, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, s, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, s, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(s) {
  return (t, e) => typeof e == "object" ? Ee(s, t, e) : ((i, n, r) => {
    const a = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), a ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
function Mt(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
const _e = `dreams-ad-engine {
  display: var(--dae-display, block);
  contain: var(--dae-contain, layout style);
  min-height: var(--dae-min-height, 100px);
}
dreams-ad-engine > .dae-slot {
  display: var(--dae-slotted-display, block);
  z-index: var(--dae-slotted-z-index, 9);
}

.dae-slot {
  position: var(--dae-ad-serving-rendered-position, sticky);
  z-index: var(--dae-ad-serving-rendered-z-index, 2);
  top: var(--dae-ad-serving-rendered-top, 1rem);
}

.dae-container {
  position: var(--dae-ad-container-position, relative);
}
.dae-label {
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
.dae-label + .dae-loader {
  top: var(--dae-ad-loader-top, 13px);
  height: var(--dae-ad-loader-height, calc(100% - 13px));
}
.dae-loader {
  position: var(--dae-ad-loader-position, absolute);
  top: var(--dae-ad-loader-top, 0);
  left: var(--dae-ad-loader-left, 0);
  width: var(--dae-ad-loader-width, 100%);
  height: var(--dae-ad-loader-height, 100%);
  background-color: var(--dae-ad-loader-background-color, #eee);
  overflow: hidden;
  z-index: var(--dae-ad-loader-z-index, 2);
}
.dae-loader::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(
    --dae-ad-loader-background-image,
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    )
  );
  animation: var(
    --dae-ad-loader-animation,
    dae-loader-shimmer 2s ease infinite
  );
}
.dae-serving {
  position: var(--dae-ad-serving-position, relative);
  display: var(--dae-ad-serving-display, flex);
  flex-wrap: var(--dae-ad-serving-flex-wrap, wrap);
  align-items: var(--dae-ad-serving-align-items, flex-start);
  justify-content: var(--dae-ad-serving-justify-content, center);
  padding-block: var(--dae-ad-serving-padding-block, 1rem);
  margin-block: var(--dae-ad-serving-margin-block, 1rem);
  min-height: var(--dae-ad-serving-min-height, 100px);
}
.dae-serving::before {
  content: var(--dae-ad-serving-before-content, "");
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

@keyframes dae-loader-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dae-loader::after {
    animation: none;
  }
}
`, _t = {
  enabled: "auto",
  prefix: "[DreamsAdEngine]",
  verbose: !1
}, K = class K {
  /**
   * Configure the logger
   */
  static configure(t) {
    this.config = { ..._t, ...t };
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
   * Log verbose/debug message (only when verbose is enabled or runtime forced)
   */
  static debug(t, ...e) {
    this.shouldLog() && (!this.config.verbose && !this.isRuntimeForced() || console.debug(`${this.config.prefix} ${t}`, ...e));
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
  /**
   * Dispatch a structured `ad:error` CustomEvent on the host element and
   * mirror it to `window.dataLayer` for GTM consumers. Also logs the error
   * via Logger.error so it surfaces in console regardless of debug mode.
   *
   * Consumers wire vendor-specific tracking (Sentry, Datadog, etc.) by
   * listening for `ad:error` — the library stays vendor-agnostic.
   */
  static dispatchAdError(t, e) {
    t.dispatchEvent(
      new CustomEvent("ad:error", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    ), typeof window < "u" && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
      event: "dreams_ad_error",
      phase: e.phase,
      slotId: e.slotId,
      adUnit: e.adUnit,
      error_message: e.error instanceof Error ? e.error.message : String(e.error)
    })), K.error(
      `[${e.phase}] ${e.slotId || e.adUnit}: ${e.error instanceof Error ? e.error.message : String(e.error)}`
    );
  }
  static shouldLog() {
    return this.config.enabled === !0 ? !0 : this.config.enabled === !1 ? !1 : this.isRuntimeForced() ? !0 : !this.isProduction();
  }
  static isRuntimeForced() {
    return typeof window < "u" && window.__dreamsDebug === !0;
  }
  static isProduction() {
    if (typeof window > "u") return !0;
    const t = window.location.hostname;
    return t !== "localhost" && !t.includes(".local") && !t.includes("127.0.0.1") && !t.includes("192.168.") && !t.includes("0.0.0.0");
  }
};
K.config = _t;
let g = K;
const ke = {
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
        viewport: [970, 0],
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
        viewport: [970, 0],
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
        viewport: [970, 0],
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
  }
}, Te = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, Ie = (() => {
  if (typeof window > "u") return !1;
  try {
    return new URLSearchParams(window.location.search).get("dae-debug") === "1";
  } catch {
    return !1;
  }
})();
var X, Bt;
const $ = class $ {
  static createReadyPromise() {
    return new Promise((t) => {
      $.readyResolve = t;
    });
  }
  static init(t) {
    var i;
    if (ut(i = $, X, Bt).call(i, t.debug), this.instance && !t.force) {
      g.warn(
        "Already initialized. Use { force: true } to override."
      );
      return;
    }
    let e = !1;
    t.lazyLoad !== void 0 ? e = t.lazyLoad : t.defaultLazyLoad && (e = t.defaultLazyLoad), this.instance = {
      networkId: t.networkId,
      sitePrefix: t.sitePrefix,
      pubId: t.pubId || "",
      bidTimeout: t.bidTimeout || 2e3,
      lazyLoad: e,
      centering: t.centering ?? !1,
      slots: {
        ...ke,
        ...t.slots
      },
      privacy: t.privacy || null,
      interstitial: t.interstitial || null,
      anchor: t.anchor || null,
      threadYield: t.threadYield ?? !1,
      collapseEmptyDivs: t.collapseEmptyDivs ?? "DISABLED"
    }, this.readyResolve && (this.readyResolve(), this.readyResolve = null);
  }
  /**
   * Open the GPT Console overlay for ad debugging. Safe to call even
   * when GPT hasn't fully booted — queued onto `googletag.cmd`.
   *
   * https://developers.google.com/publisher-tag/reference#googletag.openConsole
   */
  static openConsole(t) {
    if (typeof window > "u" || !window.googletag) {
      g.warn("openConsole called but googletag is not available");
      return;
    }
    const e = window.googletag;
    window.googletag.cmd.push(() => {
      try {
        typeof e.openConsole == "function" ? e.openConsole(t) : g.warn("googletag.openConsole is not available in this build");
      } catch (i) {
        g.error("openConsole failed", i);
      }
    });
  }
  /** Resolves when init() has been called. Immediate if already initialized. */
  static whenReady(t = 5e3) {
    if (this.instance) return Promise.resolve();
    if (this.pendingReady) return this.pendingReady;
    let e;
    return this.pendingReady = Promise.race([
      this.readyPromise,
      new Promise((i, n) => {
        e = setTimeout(
          () => n(
            new Error(
              "[DreamsAdConfig] init() not called within timeout. Ensure DreamsAdConfig.init() runs before <dreams-ad-engine> elements mount."
            )
          ),
          t
        );
      })
    ]).finally(() => {
      clearTimeout(e), this.pendingReady = null;
    }), this.pendingReady;
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
  /** @deprecated Use `getLazyLoad()` instead */
  static getDefaultLazyLoad() {
    return this.assertInitialized(), this.instance.lazyLoad || Te;
  }
  static getLazyLoad() {
    return this.assertInitialized(), this.instance.lazyLoad;
  }
  static getCentering() {
    return this.assertInitialized(), this.instance.centering;
  }
  static getPrivacy() {
    return this.assertInitialized(), this.instance.privacy;
  }
  static getInterstitial() {
    return this.assertInitialized(), this.instance.interstitial;
  }
  static getAnchor() {
    return this.assertInitialized(), this.instance.anchor;
  }
  static getThreadYield() {
    return this.assertInitialized(), this.instance.threadYield;
  }
  static getCollapseEmptyDivs() {
    return this.assertInitialized(), this.instance.collapseEmptyDivs;
  }
  static setPrivacy(t) {
    this.assertInitialized(), this.instance.privacy = t, typeof window < "u" && window.googletag && window.googletag.cmd.push(() => {
      window.googletag.pubads().setPrivacySettings(t);
    });
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
    return this.getSlot(t)?.position || "top";
  }
  static buildAdUnit(t) {
    this.assertInitialized();
    const e = this.instance.sitePrefix, n = {
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
    return n ? `${e}-${n}` : `${e}-${t}`;
  }
  static registerSlot(t, e) {
    this.assertInitialized(), this.instance.slots[t] = e;
  }
  static reset() {
    this.instance = null, this.pendingReady = null, this.readyPromise = $.createReadyPromise();
  }
  static assertInitialized() {
    if (!this.instance)
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first."
      );
  }
};
X = new WeakSet(), Bt = function(t) {
  if (t === !0 || t === !1) {
    g.configure({
      enabled: t,
      verbose: t
    });
    return;
  }
  if (Ie) {
    g.configure({ enabled: !0, verbose: !0 });
    return;
  }
}, pt($, X), $.instance = null, $.readyResolve = null, $.readyPromise = $.createReadyPromise(), $.pendingReady = null;
let w = $;
const kt = {
  contextKey: "@context",
  maxRetries: 20,
  retryInterval: 100,
  includeUrl: !0,
  customSegmentFn: "_rl_gen_sg"
}, H = class H {
  static async getTargeting(t) {
    const e = { ...kt, ...t }, i = typeof window < "u" ? window.location.href : "";
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
    return new Promise((i, n) => {
      let r = 0, a = null;
      const o = () => {
        if (typeof window > "u") return null;
        const c = window.dfp;
        if (!c?.[t.contextKey]) return null;
        try {
          const h = c[t.contextKey], u = this.buildFromContext(h, t);
          return this.cache = u, this.cacheUrl = e, { targeting: u, source: "context" };
        } catch (h) {
          return n(h), null;
        }
      }, l = o();
      if (l) {
        i(l);
        return;
      }
      a = setInterval(() => {
        r++;
        const c = o();
        if (c) {
          a && clearInterval(a), i(c);
          return;
        }
        r >= t.maxRetries && (a && clearInterval(a), i({ targeting: [], source: "timeout" }));
      }, t.retryInterval);
    });
  }
  static buildFromContext(t, e) {
    const i = { ...kt, ...e }, n = [];
    if (i.includeUrl && typeof window < "u" && n.push({ key: "url", value: window.location.pathname }), t.dataSection?.catName && n.push({ key: "catName", value: t.dataSection.catName }), t.postId && n.push({ key: "postId", value: t.postId }), t.catId && n.push({ key: "catId", value: t.catId }), t.tagId && n.push({ key: "tag", value: t.tagId }), t.typeId && n.push({ key: "type", value: t.typeId }), t.taxId && n.push({ key: "taxId", value: t.taxId }), t.dataSection?.author && n.push({ key: "author", value: t.dataSection.author }), typeof window < "u" && i.customSegmentFn) {
      const r = window[i.customSegmentFn];
      if (typeof r == "function") {
        const a = r();
        a && n.push({ key: "_rl", value: a });
      }
    }
    return n;
  }
  static clearCache() {
    this.cache = null, this.cacheUrl = "", this.pendingPromise = null;
  }
  static getTargetingSync() {
    const t = typeof window < "u" ? window.location.href : "";
    return this.cache && this.cacheUrl === t ? this.cache : null;
  }
};
H.cache = null, H.cacheUrl = "", H.pendingPromise = null;
let J = H;
const Tt = {
  threshold: 0.5,
  // IAB: 50% visible
  duration: 2e3,
  // IAB: 2 seconds
  debug: !1
}, Z = class Z {
  /**
   * Configure the viewability service
   */
  static configure(t) {
    this.config = { ...Tt, ...t };
  }
  /**
   * Start tracking an ad element for viewability
   * @deprecated Use GPT native `impressionViewable` event via `ad:viewable` CustomEvent. Will be removed in v1.0.
   */
  static track(t, e, i) {
    if (this.trackedAds.has(e))
      return;
    const n = {
      adId: e,
      position: i,
      isViewable: !1,
      viewableTime: 0,
      totalTime: 0,
      viewabilityRate: 0
    }, r = new IntersectionObserver(
      (o) => this.handleIntersection(o, e),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px"
      }
    ), a = {
      element: t,
      metrics: n,
      observer: r,
      viewabilityTimer: null,
      trackingInterval: null,
      startTime: Date.now(),
      isCurrentlyVisible: !1
    };
    this.trackedAds.set(e, a), r.observe(t), this.dispatchEvent("impression", e, n), this.config.debug && console.log(`[Viewability] Tracking started: ${e}`);
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
      for (const n of t) {
        const r = n.intersectionRatio >= this.config.threshold;
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
    const n = new CustomEvent("ad:viewability", {
      detail: {
        type: t,
        adId: e,
        metrics: { ...i },
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(n);
  }
};
Z.config = Tt, Z.trackedAds = /* @__PURE__ */ new Map();
let Y = Z;
const it = 3e4, It = {
  enabled: !1,
  interval: 6e4,
  checkVisibility: !0,
  disableOnSinglePost: !0,
  singlePostSelector: "body.single",
  viewabilityGated: !0
}, T = class T {
  /**
   * Configure the refresh manager
   */
  static configure(t) {
    this.config = { ...It, ...t }, this.config.interval < it && (this.config.interval = it);
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
   * Mark a slot as viewable (called from GPT impressionViewable handler)
   */
  static markViewable(t) {
    this.viewableSlots.add(t);
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
    if (!window.googletag?.pubads)
      return !1;
    const e = Date.now(), i = window.lastAdRefresh || 0;
    if (e - i < it)
      return !1;
    window.lastAdRefresh = e;
    let r = t || window.dreamsSlotsToUpdate || [];
    this.config.viewabilityGated && !t && (r = r.filter((o) => {
      try {
        return this.viewableSlots.has(o.getSlotElementId());
      } catch {
        return !1;
      }
    }));
    const a = r.length;
    if (a === 0)
      return !1;
    for (const o of r)
      try {
        const l = o.getSlotElementId(), c = (this.refreshCounts.get(l) || 0) + 1;
        this.refreshCounts.set(l, c), o.setConfig({ targeting: { refresh_count: String(c) } });
      } catch {
      }
    try {
      return window.googletag.pubads().refresh(r, {
        changeCorrelator: !1
      }), this.dispatchEvent("refresh", void 0, a), !0;
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
T.config = It, T.refreshTimer = null, T.running = !1, T.viewableSlots = /* @__PURE__ */ new Set(), T.refreshCounts = /* @__PURE__ */ new Map();
let st = T;
var Ce = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, F = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? xe(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Ce(t, e, n), n;
};
const ze = `
dreams-ad-skeleton { display: block; }
.dae-skeleton { position: relative; overflow: hidden; background: var(--dreams-skeleton-bg, #f0f0f0); border-radius: var(--dreams-skeleton-radius, 4px); max-width: 100%; }
.dae-skeleton::after { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent 0%, var(--dreams-skeleton-shine, rgba(255,255,255,0.6)) 50%, transparent 100%); animation: dae-shimmer 1.5s infinite; }
@keyframes dae-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.dae-skeleton-label { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-size: 10px; color: var(--dreams-skeleton-label-color, #999); font-family: system-ui, -apple-system, sans-serif; }
`;
let Ct = !1;
function Pe() {
  if (Ct || typeof document > "u") return;
  const s = document.createElement("style");
  s.textContent = ze, document.head.appendChild(s), Ct = !0;
}
let L = class extends z {
  constructor() {
    super(...arguments), this.width = 300, this.height = 250, this.showLabel = !1, this.label = "Ad";
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe();
  }
  render() {
    return k`
      <div
        class="dae-skeleton"
        style="width: ${this.width}px; height: ${this.height}px;"
      >
        ${this.showLabel ? k`<span class="dae-skeleton-label">${this.label}</span>` : ""}
      </div>
    `;
  }
};
F([
  m({ type: Number })
], L.prototype, "width", 2);
F([
  m({ type: Number })
], L.prototype, "height", 2);
F([
  m({ type: Boolean })
], L.prototype, "showLabel", 2);
F([
  m({ type: String })
], L.prototype, "label", 2);
L = F([
  Vt("dreams-ad-skeleton")
], L);
function Me(s, t) {
  const e = t >= 1280, i = t >= 728;
  switch (s) {
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
    default:
      return { width: 300, height: 250 };
  }
}
var Ue = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, jt = (s) => {
  throw TypeError(s);
}, y = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Le(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Ue(t, e, n), n;
}, Re = (s, t, e) => t.has(s) || jt("Cannot " + e), Oe = (s, t, e) => t.has(s) ? jt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), A = (s, t, e) => (Re(s, t, "access private method"), e), S, Ft, qt, Gt, Wt, dt, Jt, Yt, Kt;
let xt = !1;
function He() {
  if (xt || typeof document > "u") return;
  const s = document.createElement("style");
  s.textContent = _e, document.head.appendChild(s), xt = !0;
}
let d = class extends z {
  constructor() {
    super(...arguments), Oe(this, S), this.gptSlot = null, this.slotRenderHandler = null, this.impressionViewableHandler = null, this.slotVisibilityHandler = null, this.slotRequestedHandler = null, this.slotResponseHandler = null, this.slotOnloadHandler = null, this.pendingBidsTimeout = null, this.lastVisibilityPct = -1, this.networkId = "", this.adUnit = "", this.divId = "", this.adSlot = "", this.mapping = [], this.sizing = [], this.targeting = [], this.autoTargeting = !1, this.resolvedTargeting = [], this.refresh = !1, this.enableTitle = !1, this.apstag = !1, this.pubId = "", this.bidTimeout = 2e3, this.prebid = !1, this.prebidConfig = "", this.bidders = [], this.title = "Publicidad", this.trackViewability = !1, this.showSkeleton = !1, this.ready = !1;
  }
  createRenderRoot() {
    return this;
  }
  /**
   * Set up global navigation listeners for SPA support
   */
  static _setupNavigationListeners() {
    if (d.navigationListenersAttached || typeof window > "u") return;
    window.addEventListener("popstate", d._handleNavigation), window.addEventListener("hashchange", d._handleNavigation);
    const s = history.pushState.bind(history), t = history.replaceState.bind(history);
    history.pushState = (...e) => {
      s(...e), d._handleNavigation();
    }, history.replaceState = (...e) => {
      t(...e), d._handleNavigation();
    }, d.navigationListenersAttached = !0;
  }
  connectedCallback() {
    super.connectedCallback(), He(), d.initialized ? d._handleNavigation() : (A(this, S, Ft).call(this), d.initialized = !0, d.old_url = location.href);
  }
  disconnectedCallback() {
    if (super.disconnectedCallback(), this.trackViewability && this.divId && Y.untrack(this.divId), this.pendingBidsTimeout && (clearTimeout(this.pendingBidsTimeout), this.pendingBidsTimeout = null), window.googletag?.pubads) {
      const s = window.googletag.pubads();
      this.slotRenderHandler && (s.removeEventListener("slotRenderEnded", this.slotRenderHandler), this.slotRenderHandler = null), this.impressionViewableHandler && (s.removeEventListener(
        "impressionViewable",
        this.impressionViewableHandler
      ), this.impressionViewableHandler = null), this.slotVisibilityHandler && (s.removeEventListener(
        "slotVisibilityChanged",
        this.slotVisibilityHandler
      ), this.slotVisibilityHandler = null), this.slotRequestedHandler && (s.removeEventListener(
        "slotRequested",
        this.slotRequestedHandler
      ), this.slotRequestedHandler = null), this.slotResponseHandler && (s.removeEventListener(
        "slotResponseReceived",
        this.slotResponseHandler
      ), this.slotResponseHandler = null), this.slotOnloadHandler && (s.removeEventListener("slotOnload", this.slotOnloadHandler), this.slotOnloadHandler = null);
    }
    if (this.gptSlot) {
      if (window.dreamsAllSlots) {
        const s = window.dreamsAllSlots.indexOf(this.gptSlot);
        s > -1 && window.dreamsAllSlots.splice(s, 1);
      }
      if (window.dreamsSlotsToUpdate) {
        const s = window.dreamsSlotsToUpdate.indexOf(this.gptSlot);
        s > -1 && window.dreamsSlotsToUpdate.splice(s, 1);
      }
      window.googletag?.destroySlots && window.googletag.destroySlots([this.gptSlot]), this.gptSlot = null;
    }
  }
  async firstUpdated() {
    await A(this, S, qt).call(this);
    const s = typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
    if (this.divId = `div-gpt-ad-${this.adUnit}-${s}`, await A(this, S, Gt).call(this), this.apstag && this.pubId && !d.initialized_aps)
      if (typeof window.apstag?.init == "function")
        try {
          window.apstag.init({
            pubID: this.pubId,
            adServer: "googletag",
            bidTimeout: this.bidTimeout
          }), d.initialized_aps = !0;
        } catch (t) {
          this.apstag = !1, g.dispatchAdError(this, {
            slotId: this.divId,
            adUnit: this.adUnit,
            phase: "apstag-init",
            error: t instanceof Error ? t : String(t),
            recoverable: !0
          });
        }
      else
        this.apstag = !1;
    if (this.prebid && !d.initialized_prebid)
      if (typeof window.pbjs?.que?.push == "function")
        try {
          window.pbjs.que.push(() => {
            try {
              if (this.prebidConfig) {
                const t = typeof this.prebidConfig == "string" ? JSON.parse(this.prebidConfig) : this.prebidConfig;
                window.pbjs.setConfig(t);
              }
              window.pbjs.onEvent("bidWon", (t) => {
                (window.dataLayer = window.dataLayer || []).push({
                  event: "prebid_bid_won",
                  bidder: t.bidderCode,
                  cpm: t.cpm,
                  currency: t.currency,
                  ad_unit: t.adUnitCode,
                  size: t.size
                });
              });
            } catch (t) {
              g.dispatchAdError(this, {
                slotId: this.divId,
                adUnit: this.adUnit,
                phase: "prebid-init",
                error: t instanceof Error ? t : String(t),
                recoverable: !0
              });
            }
          }), d.initialized_prebid = !0;
        } catch (t) {
          this.prebid = !1, g.dispatchAdError(this, {
            slotId: this.divId,
            adUnit: this.adUnit,
            phase: "prebid-init",
            error: t instanceof Error ? t : String(t),
            recoverable: !0
          });
        }
      else
        this.prebid = !1;
    this.ready = !0, await this.updateComplete, A(this, S, Jt).call(this);
  }
  render() {
    return this.ready ? k`
			<div class="dae-container">
				${this.enableTitle ? k`<span class="dae-label">${this.title}</span>` : ""}
				${this.showSkeleton ? k`<dreams-ad-skeleton
              width="${A(this, S, Yt).call(this)}"
              height="${A(this, S, Kt).call(this)}"
            ></dreams-ad-skeleton>` : k`<div class="dae-loader" data-ad-loader="${this.divId}"></div>`}
				<div
					class="dae-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
				>
				</div>
			</div>
		` : k``;
  }
};
S = /* @__PURE__ */ new WeakSet();
Ft = function() {
  window.googletag = window.googletag || { cmd: [] };
  const s = () => {
    window.googletag.cmd.push(() => {
      if (window.dreamsAllSlots = window.dreamsAllSlots || [], window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [], window.googletag.pubadsReady === !0) return;
      w.isInitialized() && w.getLazyLoad() || window.googletag.pubads().disableInitialLoad(), window.googletag.pubads().enableSingleRequest(), window.googletag.enableServices();
    });
  }, t = () => {
    w.isInitialized() && (d.configApplied || (d.configApplied = !0, window.googletag.cmd.push(() => {
      const e = {}, i = w.getLazyLoad();
      i && (e.lazyLoad = i), w.getThreadYield() && (e.threadYield = "ENABLED_ALL_SLOTS");
      const n = w.getCollapseEmptyDivs();
      n !== "DISABLED" && (e.collapseDiv = n), Object.keys(e).length > 0 && (typeof window.googletag.setConfig == "function" ? window.googletag.setConfig(e) : i && window.googletag.pubads().enableLazyLoad(i)), w.getCentering() && window.googletag.pubads().setCentering(!0);
      const r = w.getPrivacy();
      r && window.googletag.pubads().setPrivacySettings(r), A(this, S, Wt).call(this);
    })));
  };
  s(), w.isInitialized() ? t() : w.whenReady().then(t).catch(() => {
  }), d._setupNavigationListeners();
};
qt = async function() {
  if (this.adSlot === "interstitial") {
    g.warn(
      '<dreams-ad-engine ad-slot="interstitial"> is deprecated. Configure interstitials via DreamsAdConfig.init({ interstitial: { enabled: true } }).'
    );
    return;
  }
  if (this.adSlot) {
    await w.whenReady();
    const s = w.getSlot(this.adSlot);
    s && (this.networkId || (this.networkId = w.getNetworkId()), this.adUnit || (this.adUnit = w.buildAdUnit(this.adSlot)), (!this.mapping || this.mapping.length === 0) && (this.mapping = s.mapping), (!this.sizing || this.sizing.length === 0) && (this.sizing = s.sizing), this.pubId || (this.pubId = w.getPubId() || ""), this.pubId && (this.apstag = !0));
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
  if (this.bidders && typeof this.bidders == "string")
    try {
      this.bidders = JSON.parse(this.bidders);
    } catch {
      this.bidders = [];
    }
};
Gt = async function() {
  if (this.autoTargeting)
    try {
      const s = await J.getTargeting();
      this.resolvedTargeting = s.targeting, s.source === "timeout" && g.dispatchAdError(this, {
        slotId: this.divId,
        adUnit: this.adUnit,
        phase: "targeting-resolution",
        error: "window.dfp[@context] not present after retry budget",
        recoverable: !0
      });
    } catch (s) {
      this.resolvedTargeting = [], g.dispatchAdError(this, {
        slotId: this.divId,
        adUnit: this.adUnit,
        phase: "targeting-resolution",
        error: s instanceof Error ? s : String(s),
        recoverable: !0
      });
    }
  else this.targeting && this.targeting.length > 0 && (this.resolvedTargeting = this.targeting);
};
Wt = function() {
  if (d.outOfPageRegistered) return;
  d.outOfPageRegistered = !0;
  const s = w.getNetworkId(), t = w.getSitePrefix(), e = `/${s}/${t}-is-i`, i = (a, o) => {
    try {
      const l = window.googletag.defineOutOfPageSlot(a, o);
      l && (l.addService(window.googletag.pubads()), window.dreamsAllSlots.push(l));
    } catch (l) {
      g.dispatchAdError(this, {
        slotId: "",
        adUnit: a,
        phase: "out-of-page-define",
        error: l instanceof Error ? l : String(l),
        recoverable: !1
      });
    }
  };
  w.getInterstitial()?.enabled && i(
    e,
    window.googletag.enums.OutOfPageFormat.INTERSTITIAL
  );
  const r = w.getAnchor();
  if (r?.enabled) {
    const a = `/${s}/${t}-is-a`;
    (r.position === "top" || r.position === "both") && i(a, window.googletag.enums.OutOfPageFormat.TOP_ANCHOR), (r.position === "bottom" || r.position === "both") && i(
      a,
      window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
    );
  }
};
dt = function() {
  const s = (t) => {
    let e = 0;
    for (const i of t) {
      const n = i[1];
      typeof n == "number" && n > 1 && (e = Math.max(e, n));
    }
    return e;
  };
  if (this.mapping && this.mapping.length > 0) {
    const t = typeof window < "u" ? window.innerWidth : 0;
    let e = null;
    for (const i of this.mapping)
      i.viewport[0] <= t && (!e || i.viewport[0] > e.viewport[0]) && (e = i);
    if (e) {
      const i = s(e.sizing);
      if (i > 0) return i;
    }
  }
  if (this.sizing && this.sizing.length > 0) {
    const t = s(this.sizing);
    if (t > 0) return t;
  }
  return 2;
};
Jt = function() {
  const s = `/${this.networkId}/${this.adUnit}`, t = this.divId, e = document.createElement("div");
  e.id = t, e.setAttribute("data-ad", this.divId), e.setAttribute("role", "complementary"), e.setAttribute("aria-label", "Advertisement"), e.classList.add("dae-slot"), e.style.cssText = "width:100%";
  const i = A(this, S, dt).call(this), n = this.querySelector(".dae-serving");
  n instanceof HTMLElement ? (n.style.minHeight = `${i}px`, n.appendChild(e)) : this.appendChild(e), setTimeout(() => {
    try {
      if (!window.googletag?.cmd?.push) {
        g.dispatchAdError(this, {
          slotId: t,
          adUnit: s,
          phase: "slot-define",
          error: "googletag.cmd not available",
          recoverable: !1
        });
        return;
      }
      window.googletag.cmd.push(() => {
        if (!document.getElementById(t)) {
          g.dispatchAdError(this, {
            slotId: t,
            adUnit: s,
            phase: "slot-display",
            error: `Slot div ${t} not in DOM, aborting`,
            recoverable: !1
          });
          return;
        }
        let r;
        try {
          r = window.googletag.defineSlot(s, this.sizing, t).addService(window.googletag.pubads());
        } catch (o) {
          g.dispatchAdError(this, {
            slotId: t,
            adUnit: s,
            phase: "slot-define",
            error: o instanceof Error ? o : String(o),
            recoverable: !1
          });
          return;
        }
        if (this.resolvedTargeting.length > 0) {
          const o = {};
          for (const l of this.resolvedTargeting)
            o[l.key] = l.value;
          try {
            r.setConfig({ targeting: o });
          } catch (l) {
            g.dispatchAdError(this, {
              slotId: t,
              adUnit: s,
              phase: "targeting-resolution",
              error: l instanceof Error ? l : String(l),
              recoverable: !0
            });
          }
        }
        this.slotRenderHandler = (o) => {
          if (o.slot.getSlotElementId() !== t) return;
          const l = this.querySelector(".dae-loader");
          l instanceof HTMLElement && (l.style.display = "none");
          const c = this.querySelector("dreams-ad-skeleton");
          c instanceof HTMLElement && (c.style.display = "none");
          const h = document.getElementById(t), u = o.size?.length === 2 && o.size[0] <= 1 && o.size[1] <= 1;
          if (o.isEmpty || u) {
            h instanceof HTMLElement && (h.style.minHeight = "0");
            const f = this.querySelector(".dae-serving");
            f instanceof HTMLElement && (f.style.minHeight = "0");
          } else if (h instanceof HTMLElement) {
            if (o.size?.length === 2) {
              const [f, p] = o.size;
              if (f > 1 && p > 1) {
                h.style.minHeight = `${p}px`;
                const v = h.querySelector("iframe");
                v && (v.style.width = `${f}px`, v.style.height = `${p}px`);
              }
            }
            typeof ResizeObserver < "u" && requestAnimationFrame(() => {
              const f = h.querySelector("iframe");
              if (f) {
                const p = new ResizeObserver((v) => {
                  for (const Xt of v) {
                    const { width: Zt, height: ct } = Xt.contentRect;
                    Zt > 1 && ct > 1 && (h.style.minHeight = `${ct}px`, p.disconnect());
                  }
                });
                p.observe(f), setTimeout(() => p.disconnect(), 1e4);
              }
            });
          }
          if (this.dispatchEvent(
            new CustomEvent("ad:rendered", {
              bubbles: !0,
              detail: {
                isEmpty: o.isEmpty,
                size: o.size ?? null,
                advertiserId: o.advertiserId ?? null,
                creativeId: o.creativeId ?? null,
                lineItemId: o.lineItemId ?? null,
                isBackfill: o.isBackfill ?? !1,
                slotId: t,
                adUnit: s
              }
            })
          ), this.trackViewability && !o.isEmpty) {
            const f = document.getElementById(t);
            f instanceof HTMLElement && Y.track(
              f,
              t,
              this.adSlot || this.adUnit
            );
          }
        }, window.googletag.pubads().addEventListener("slotRenderEnded", this.slotRenderHandler), this.impressionViewableHandler = (o) => {
          o.slot.getSlotElementId() === t && (st.markViewable(t), this.dispatchEvent(
            new CustomEvent("ad:viewable", {
              bubbles: !0,
              detail: { slotId: t, adUnit: s }
            })
          ));
        }, window.googletag.pubads().addEventListener(
          "impressionViewable",
          this.impressionViewableHandler
        ), this.slotVisibilityHandler = (o) => {
          if (o.slot.getSlotElementId() !== t) return;
          const l = o.inViewPercentage, c = Math.floor(l / 25) * 25, h = Math.floor(this.lastVisibilityPct / 25) * 25;
          c === h && this.lastVisibilityPct >= 0 || (this.lastVisibilityPct = l, this.dispatchEvent(
            new CustomEvent("ad:visibility", {
              bubbles: !0,
              detail: {
                slotId: t,
                adUnit: s,
                inViewPercentage: l
              }
            })
          ));
        }, window.googletag.pubads().addEventListener(
          "slotVisibilityChanged",
          this.slotVisibilityHandler
        ), this.slotRequestedHandler = (o) => {
          o.slot.getSlotElementId() === t && this.dispatchEvent(
            new CustomEvent("ad:requested", {
              bubbles: !0,
              detail: { slotId: t, adUnit: s }
            })
          );
        }, window.googletag.pubads().addEventListener("slotRequested", this.slotRequestedHandler), this.slotResponseHandler = (o) => {
          o.slot.getSlotElementId() === t && this.dispatchEvent(
            new CustomEvent("ad:response", {
              bubbles: !0,
              detail: { slotId: t, adUnit: s }
            })
          );
        }, window.googletag.pubads().addEventListener(
          "slotResponseReceived",
          this.slotResponseHandler
        ), this.slotOnloadHandler = (o) => {
          o.slot.getSlotElementId() === t && this.dispatchEvent(
            new CustomEvent("ad:loaded", {
              bubbles: !0,
              detail: { slotId: t, adUnit: s }
            })
          );
        }, window.googletag.pubads().addEventListener("slotOnload", this.slotOnloadHandler);
        try {
          const o = window.googletag.sizeMapping();
          this.mapping.forEach((l) => {
            o.addSize(l.viewport, l.sizing);
          }), r.defineSizeMapping(o.build());
        } catch (o) {
          g.dispatchAdError(this, {
            slotId: t,
            adUnit: s,
            phase: "size-mapping",
            error: o instanceof Error ? o : String(o),
            recoverable: !0
          });
        }
        this.gptSlot = r, this.refresh && window.dreamsSlotsToUpdate.push(r), window.dreamsAllSlots.push(r);
        try {
          window.googletag.display(t);
        } catch (o) {
          g.dispatchAdError(this, {
            slotId: t,
            adUnit: s,
            phase: "slot-display",
            error: o instanceof Error ? o : String(o),
            recoverable: !1
          });
          return;
        }
        if (!(w.isInitialized() && !!w.getLazyLoad())) {
          const o = this.apstag && this.pubId && typeof window.apstag?.fetchBids == "function", l = this.prebid && Array.isArray(this.bidders) && this.bidders.length > 0 && typeof window.pbjs?.requestBids == "function";
          if (!o && !l)
            try {
              window.googletag.pubads().refresh([r]);
            } catch (c) {
              g.dispatchAdError(this, {
                slotId: t,
                adUnit: s,
                phase: "slot-refresh",
                error: c instanceof Error ? c : String(c),
                recoverable: !1
              });
            }
          else {
            const c = this.bidTimeout || 2e3;
            let h = !1;
            const u = () => {
              h || (h = !0, this.pendingBidsTimeout && (clearTimeout(this.pendingBidsTimeout), this.pendingBidsTimeout = null), window.googletag.cmd.push(() => {
                if (l)
                  try {
                    window.pbjs.setTargetingForGPTAsync([t]);
                  } catch (p) {
                    g.dispatchAdError(this, {
                      slotId: t,
                      adUnit: s,
                      phase: "prebid-init",
                      error: p instanceof Error ? p : String(p),
                      recoverable: !0
                    });
                  }
                if (o)
                  try {
                    window.apstag.setDisplayBids();
                  } catch (p) {
                    g.dispatchAdError(this, {
                      slotId: t,
                      adUnit: s,
                      phase: "apstag-init",
                      error: p instanceof Error ? p : String(p),
                      recoverable: !0
                    });
                  }
                try {
                  window.googletag.pubads().refresh([r]);
                } catch (p) {
                  g.dispatchAdError(this, {
                    slotId: t,
                    adUnit: s,
                    phase: "slot-refresh",
                    error: p instanceof Error ? p : String(p),
                    recoverable: !1
                  });
                }
              }));
            };
            this.pendingBidsTimeout = setTimeout(
              u,
              c + 500
            );
            const f = [];
            o && f.push(
              new Promise((p) => {
                window.apstag.fetchBids(
                  {
                    slots: [
                      {
                        slotID: t,
                        slotName: s,
                        sizes: this.sizing
                      }
                    ]
                  },
                  () => p()
                );
              })
            ), l && f.push(
              new Promise((p) => {
                window.pbjs.que.push(() => {
                  try {
                    window.pbjs.addAdUnits([
                      {
                        code: t,
                        mediaTypes: { banner: { sizes: this.sizing } },
                        bids: this.bidders
                      }
                    ]), window.pbjs.requestBids({
                      adUnitCodes: [t],
                      bidsBackHandler: () => p()
                    });
                  } catch (v) {
                    g.dispatchAdError(this, {
                      slotId: t,
                      adUnit: s,
                      phase: "prebid-init",
                      error: v instanceof Error ? v : String(v),
                      recoverable: !0
                    }), p();
                  }
                });
              })
            ), Promise.all(f).then(u);
          }
        }
      });
    } catch (r) {
      g.dispatchAdError(this, {
        slotId: t,
        adUnit: s,
        phase: "slot-define",
        error: r instanceof Error ? r : String(r),
        recoverable: !1
      });
    }
  }, 0);
};
Yt = function() {
  const s = typeof window < "u" ? window.innerWidth : 320;
  return s >= 1280 ? 970 : s >= 728 ? 728 : 320;
};
Kt = function() {
  return A(this, S, dt).call(this);
};
d.initialized = !1;
d.old_url = "";
d.initialized_aps = !1;
d.initialized_prebid = !1;
d.configApplied = !1;
d.navigationListenersAttached = !1;
d.outOfPageRegistered = !1;
d._handleNavigation = () => {
  const s = location.href;
  d.old_url !== s && (window.googletag?.destroySlots && window.dreamsAllSlots?.length > 0 && (window.googletag.destroySlots(window.dreamsAllSlots), window.googletag.pubads().updateCorrelator()), d.old_url = s, window.dreamsAllSlots = [], window.dreamsSlotsToUpdate = [], J.clearCache());
};
y([
  m({ type: String })
], d.prototype, "networkId", 2);
y([
  m({ type: String })
], d.prototype, "adUnit", 2);
y([
  m({ type: String })
], d.prototype, "divId", 2);
y([
  m({ type: String, attribute: "ad-slot" })
], d.prototype, "adSlot", 2);
y([
  m({ type: Array })
], d.prototype, "mapping", 2);
y([
  m({ type: Array })
], d.prototype, "sizing", 2);
y([
  m({ type: Array })
], d.prototype, "targeting", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "autoTargeting", 2);
y([
  Mt()
], d.prototype, "resolvedTargeting", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "refresh", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "enableTitle", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "apstag", 2);
y([
  m({ type: String })
], d.prototype, "pubId", 2);
y([
  m({ type: Number })
], d.prototype, "bidTimeout", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "prebid", 2);
y([
  m({ type: String })
], d.prototype, "prebidConfig", 2);
y([
  m({ type: Array })
], d.prototype, "bidders", 2);
y([
  m({ type: String })
], d.prototype, "title", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "trackViewability", 2);
y([
  m({ type: Boolean, reflect: !0 })
], d.prototype, "showSkeleton", 2);
y([
  Mt()
], d.prototype, "ready", 2);
d = y([
  Vt("dreams-ad-engine")
], d);
const zt = {
  enabled: !0,
  addBodyClass: !0,
  bodyClass: "ad-blocker-detected",
  timeout: 1e3
}, D = class D {
  /**
   * Configure the ad block detector
   */
  static configure(t) {
    this.config = { ...zt, ...t };
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
        if (i?.blocked)
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
D.config = zt, D.detected = null, D.detecting = null;
let Pt = D;
const Ut = {
  enabled: !1,
  positions: [],
  minViewportHeight: 768,
  topOffset: 80,
  headerSelector: null,
  smoothTransition: !0,
  transitionDuration: 150
}, N = class N {
  /**
   * Configure the sticky manager
   */
  static configure(t) {
    this.config = { ...Ut, ...t };
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
    const n = t.querySelector(
      '[class*="ad-serving"]'
    );
    if (!n) return !1;
    const r = this.getTopOffset();
    this.config.smoothTransition && (n.style.transition = `top ${this.config.transitionDuration}ms ease-out`), n.style.position = "sticky", n.style.top = `${r}px`, n.style.alignSelf = "flex-start", n.style.zIndex = "10";
    const a = {
      adId: e,
      position: i,
      stickyTime: 0,
      totalTime: 0,
      isCurrentlySticky: !1
    }, o = () => this.handleScroll(e, r), l = {
      element: n,
      container: t,
      metrics: a,
      startTime: Date.now(),
      stickyStartTime: null,
      scrollHandler: o
    };
    return this.stickyAds.set(e, l), window.addEventListener("scroll", o, { passive: !0 }), !0;
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
N.config = Ut, N.stickyAds = /* @__PURE__ */ new Map(), N.lastScrollTime = 0;
let Lt = N;
export {
  Pt as AdBlockDetector,
  ke as DEFAULT_SLOTS,
  d as DreamsAdComponent,
  w as DreamsAdConfig,
  L as DreamsAdSkeleton,
  J as DreamsTargetingService,
  g as Logger,
  st as RefreshManager,
  Lt as StickyManager,
  Y as ViewabilityService,
  Me as getSkeletonDimensions
};
