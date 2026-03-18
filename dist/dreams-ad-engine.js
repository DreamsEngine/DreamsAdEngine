const j = globalThis, et = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, It = /* @__PURE__ */ Symbol(), lt = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== It) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (n) => new Gt(typeof n == "string" ? n : n + "", void 0, It), Yt = (n, t) => {
  if (et) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = j.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, dt = et ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Wt(e);
})(n) : n;
const { is: Jt, defineProperty: Kt, getOwnPropertyDescriptor: Xt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Qt, getPrototypeOf: te } = Object, K = globalThis, ct = K.trustedTypes, ee = ct ? ct.emptyScript : "", ie = K.reactiveElementPolyfillSupport, R = (n, t) => n, q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ee : null;
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
} }, it = (n, t) => !Jt(n, t), ht = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), K.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Kt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = Xt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const l = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = te(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, i = [...Zt(e), ...Qt(e)];
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
      for (const s of i) e.unshift(dt(s));
    } else t !== void 0 && e.push(dt(t));
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
    return Yt(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : q).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : q;
      this._$Em = s;
      const l = r.fromAttribute(e, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? it)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, l = this[s];
        r !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[R("elementProperties")] = /* @__PURE__ */ new Map(), x[R("finalized")] = /* @__PURE__ */ new Map(), ie?.({ ReactiveElement: x }), (K.reactiveElementVersions ??= []).push("2.1.2");
const st = globalThis, ut = (n) => n, G = st.trustedTypes, pt = G ? G.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, zt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + A, se = `<${Ot}>`, T = document, N = () => T.createComment(""), V = (n) => n === null || typeof n != "object" && typeof n != "function", nt = Array.isArray, ne = (n) => nt(n) || typeof n?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, ft = />/g, _ = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mt = /'/g, wt = /"/g, Lt = /^(?:script|style|textarea|title)$/i, oe = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), $ = oe(1), I = /* @__PURE__ */ Symbol.for("lit-noChange"), w = /* @__PURE__ */ Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), E = T.createTreeWalker(T, 129);
function Rt(n, t) {
  if (!nt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(t) : t;
}
const re = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = L;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, h, u = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, h = r.exec(a), h !== null); ) g = r.lastIndex, r === L ? h[1] === "!--" ? r = gt : h[1] !== void 0 ? r = ft : h[2] !== void 0 ? (Lt.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = _) : h[3] !== void 0 && (r = _) : r === _ ? h[0] === ">" ? (r = s ?? L, u = -1) : h[1] === void 0 ? u = -2 : (u = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? _ : h[3] === '"' ? wt : mt) : r === wt || r === mt ? r = _ : r === gt || r === ft ? r = L : (r = _, s = void 0);
    const y = r === _ && n[l + 1].startsWith("/>") ? " " : "";
    o += r === L ? a + se : u >= 0 ? (i.push(c), a.slice(0, u) + zt + a.slice(u) + A + y) : a + A + (u === -2 ? l : y);
  }
  return [Rt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, h] = re(t, e);
    if (this.el = M.createElement(c, i), E.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = E.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(zt)) {
          const g = h[r++], y = s.getAttribute(u).split(A), b = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: b[2], strings: y, ctor: b[1] === "." ? le : b[1] === "?" ? de : b[1] === "@" ? ce : X }), s.removeAttribute(u);
        } else u.startsWith(A) && (a.push({ type: 6, index: o }), s.removeAttribute(u));
        if (Lt.test(s.tagName)) {
          const u = s.textContent.split(A), g = u.length - 1;
          if (g > 0) {
            s.textContent = G ? G.emptyScript : "";
            for (let y = 0; y < g; y++) s.append(u[y], N()), E.nextNode(), a.push({ type: 2, index: ++o });
            s.append(u[g], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ot) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(A, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += A.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = T.createElement("template");
    return i.innerHTML = t, i;
  }
}
function z(n, t, e = n, i) {
  if (t === I) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = V(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = z(n, s._$AS(n, t.values), s, i)), t;
}
class ae {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? T).importNode(e, !0);
    E.currentNode = s;
    let o = E.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new B(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new he(o, this, t)), this._$AV.push(c), a = i[++l];
      }
      r !== a?.index && (o = E.nextNode(), r++);
    }
    return E.currentNode = T, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class B {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = z(this, t, e), V(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ne(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(Rt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new ae(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new B(this.O(N()), this.O(N()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ut(t).nextSibling;
      ut(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = w;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = z(this, t, e, 0), r = !V(t) || t !== this._$AH && t !== I, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = z(this, l[i + a], e, a), c === I && (c = this._$AH[a]), r ||= !V(c) || c !== this._$AH[a], c === w ? t = w : t !== w && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class le extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class de extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class ce extends X {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = z(this, t, e, 0) ?? w) === I) return;
    const i = this._$AH, s = t === w && i !== w || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== w && (i === w || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class he {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const ue = st.litHtmlPolyfillSupport;
ue?.(M, B), (st.litHtmlVersions ??= []).push("3.3.2");
const pe = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new B(t.insertBefore(N(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const ot = globalThis;
class P extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = pe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return I;
  }
}
P._$litElement$ = !0, P.finalized = !0, ot.litElementHydrateSupport?.({ LitElement: P });
const ge = ot.litElementPolyfillSupport;
ge?.({ LitElement: P });
(ot.litElementVersions ??= []).push("4.2.2");
const Ut = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
const fe = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: it }, me = (n = fe, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function p(n) {
  return (t, e) => typeof e == "object" ? me(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function we(n) {
  return p({ ...n, state: !0, attribute: !1 });
}
function bt(n, t, e) {
  return n ? t(n) : e?.(n);
}
const ye = `dreams-ad-engine {
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
  animation: var(--dae-ad-loader-animation, dae-loader-shimmer 2s ease infinite);
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

@keyframes dae-loader-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .dae-loader::after { animation: none; }
}
`, be = {
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
  }
}, ve = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, v = class v {
  static createReadyPromise() {
    return new Promise((t) => {
      v.readyResolve = t;
    });
  }
  static init(t) {
    if (this.instance && !t.force) {
      console.warn(
        "[DreamsAdConfig] Already initialized. Use { force: true } to override."
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
        ...be,
        ...t.slots
      },
      privacy: t.privacy || null,
      interstitial: t.interstitial || null,
      anchor: t.anchor || null,
      threadYield: t.threadYield ?? !1
    }, this.readyResolve && (this.readyResolve(), this.readyResolve = null);
  }
  /** Resolves when init() has been called. Immediate if already initialized. */
  static whenReady(t = 5e3) {
    if (this.instance) return Promise.resolve();
    if (this.pendingReady) return this.pendingReady;
    let e;
    return this.pendingReady = Promise.race([
      this.readyPromise,
      new Promise((i, s) => {
        e = setTimeout(
          () => s(
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
    return this.assertInitialized(), this.instance.lazyLoad || ve;
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
    this.instance = null, this.pendingReady = null, this.readyPromise = v.createReadyPromise();
  }
  static assertInitialized() {
    if (!this.instance)
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first."
      );
  }
};
v.instance = null, v.readyResolve = null, v.readyPromise = v.createReadyPromise(), v.pendingReady = null;
let f = v;
const vt = {
  contextKey: "@context",
  maxRetries: 20,
  retryInterval: 100,
  includeUrl: !0,
  customSegmentFn: "_rl_gen_sg"
}, U = class U {
  static async getTargeting(t) {
    const e = { ...vt, ...t }, i = typeof window < "u" ? window.location.href : "";
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
      let o = 0, r = null;
      const l = () => {
        if (typeof window > "u") return null;
        const c = window.dfp;
        if (!c?.[t.contextKey]) return null;
        try {
          const h = c[t.contextKey], u = this.buildFromContext(h, t);
          return this.cache = u, this.cacheUrl = e, { targeting: u, source: "context" };
        } catch (h) {
          return s(h), null;
        }
      }, a = l();
      if (a) {
        i(a);
        return;
      }
      r = setInterval(() => {
        o++;
        const c = l();
        if (c) {
          r && clearInterval(r), i(c);
          return;
        }
        o >= t.maxRetries && (r && clearInterval(r), i({ targeting: [], source: "timeout" }));
      }, t.retryInterval);
    });
  }
  static buildFromContext(t, e) {
    const i = { ...vt, ...e }, s = [];
    if (i.includeUrl && typeof window < "u" && s.push({ key: "url", value: window.location.pathname }), t.dataSection?.catName && s.push({ key: "catName", value: t.dataSection.catName }), t.postId && s.push({ key: "postId", value: t.postId }), t.catId && s.push({ key: "catId", value: t.catId }), t.tagId && s.push({ key: "tag", value: t.tagId }), t.typeId && s.push({ key: "type", value: t.typeId }), t.taxId && s.push({ key: "taxId", value: t.taxId }), t.dataSection?.author && s.push({ key: "author", value: t.dataSection.author }), typeof window < "u" && i.customSegmentFn) {
      const o = window[i.customSegmentFn];
      if (typeof o == "function") {
        const r = o();
        r && s.push({ key: "_rl", value: r });
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
U.cache = null, U.cacheUrl = "", U.pendingPromise = null;
let W = U;
const $t = {
  threshold: 0.5,
  // IAB: 50% visible
  duration: 2e3,
  // IAB: 2 seconds
  debug: !1
}, J = class J {
  /**
   * Configure the viewability service
   */
  static configure(t) {
    this.config = { ...$t, ...t };
  }
  /**
   * Start tracking an ad element for viewability
   * @deprecated Use GPT native `impressionViewable` event via `ad:viewable` CustomEvent. Will be removed in v1.0.
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
    }, o = new IntersectionObserver(
      (l) => this.handleIntersection(l, e),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px"
      }
    ), r = {
      element: t,
      metrics: s,
      observer: o,
      viewabilityTimer: null,
      trackingInterval: null,
      startTime: Date.now(),
      isCurrentlyVisible: !1
    };
    this.trackedAds.set(e, r), o.observe(t), this.dispatchEvent("impression", e, s), this.config.debug && console.log(`[Viewability] Tracking started: ${e}`);
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
        const o = s.intersectionRatio >= this.config.threshold;
        o && !i.isCurrentlyVisible ? (i.isCurrentlyVisible = !0, this.startViewabilityTimer(e)) : !o && i.isCurrentlyVisible && (i.isCurrentlyVisible = !1, this.stopViewabilityTimer(e), this.dispatchEvent("hidden", e, i.metrics));
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
J.config = $t, J.trackedAds = /* @__PURE__ */ new Map();
let Y = J;
const Q = 3e4, At = {
  enabled: !1,
  interval: 6e4,
  checkVisibility: !0,
  disableOnSinglePost: !0,
  singlePostSelector: "body.single",
  viewabilityGated: !0
}, k = class k {
  /**
   * Configure the refresh manager
   */
  static configure(t) {
    this.config = { ...At, ...t }, this.config.interval < Q && (this.config.interval = Q);
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
    if (e - i < Q)
      return !1;
    window.lastAdRefresh = e;
    let o = t || window.dreamsSlotsToUpdate || [];
    this.config.viewabilityGated && !t && (o = o.filter((l) => {
      try {
        return this.viewableSlots.has(l.getSlotElementId());
      } catch {
        return !1;
      }
    }));
    const r = o.length;
    if (r === 0)
      return !1;
    for (const l of o)
      try {
        const a = l.getSlotElementId(), c = (this.refreshCounts.get(a) || 0) + 1;
        this.refreshCounts.set(a, c), l.setTargeting("refresh_count", String(c));
      } catch {
      }
    try {
      return window.googletag.pubads().refresh(o, {
        changeCorrelator: !1
      }), this.dispatchEvent("refresh", void 0, r), !0;
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
k.config = At, k.refreshTimer = null, k.running = !1, k.viewableSlots = /* @__PURE__ */ new Set(), k.refreshCounts = /* @__PURE__ */ new Map();
let tt = k;
var $e = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, F = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Ae(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && $e(t, e, s), s;
};
const Se = `
dreams-ad-skeleton { display: block; }
.dae-skeleton { position: relative; overflow: hidden; background: var(--dreams-skeleton-bg, #f0f0f0); border-radius: var(--dreams-skeleton-radius, 4px); max-width: 100%; }
.dae-skeleton::after { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent 0%, var(--dreams-skeleton-shine, rgba(255,255,255,0.6)) 50%, transparent 100%); animation: dae-shimmer 1.5s infinite; }
@keyframes dae-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.dae-skeleton-label { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-size: 10px; color: var(--dreams-skeleton-label-color, #999); font-family: system-ui, -apple-system, sans-serif; }
`;
let St = !1;
function _e() {
  if (St || typeof document > "u") return;
  const n = document.createElement("style");
  n.textContent = Se, document.head.appendChild(n), St = !0;
}
let O = class extends P {
  constructor() {
    super(...arguments), this.width = 300, this.height = 250, this.showLabel = !1, this.label = "Ad";
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), _e();
  }
  render() {
    return $`
      <div
        class="dae-skeleton"
        style="width: ${this.width}px; height: ${this.height}px;"
      >
        ${this.showLabel ? $`<span class="dae-skeleton-label">${this.label}</span>` : ""}
      </div>
    `;
  }
};
F([
  p({ type: Number })
], O.prototype, "width", 2);
F([
  p({ type: Number })
], O.prototype, "height", 2);
F([
  p({ type: Boolean })
], O.prototype, "showLabel", 2);
F([
  p({ type: String })
], O.prototype, "label", 2);
O = F([
  Ut("dreams-ad-skeleton")
], O);
function ke(n, t) {
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
    default:
      return { width: 300, height: 250 };
  }
}
var Ee = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, Ht = (n) => {
  throw TypeError(n);
}, m = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Te(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && Ee(t, e, s), s;
}, xe = (n, t, e) => t.has(n) || Ht("Cannot " + e), Ce = (n, t, e) => t.has(n) ? Ht("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), C = (n, t, e) => (xe(n, t, "access private method"), e), S, Dt, Nt, Vt, Mt, Bt, Ft;
let _t = !1;
function Pe() {
  if (_t || typeof document > "u") return;
  const n = document.createElement("style");
  n.textContent = ye, document.head.appendChild(n), _t = !0;
}
let d = class extends P {
  constructor() {
    super(...arguments), Ce(this, S), this.adSlot = null, this.slotRenderHandler = null, this.impressionViewableHandler = null, this.slotVisibilityHandler = null, this.pendingBidsTimeout = null, this.lastVisibilityPct = -1, this.networkId = "", this.adUnit = "", this.divId = "", this.slot = "", this.mapping = [], this.sizing = [], this.targeting = [], this.autoTargeting = !1, this.resolvedTargeting = [], this.refresh = !1, this.enableTitle = !1, this.apstag = !1, this.pubId = "", this.bidTimeout = 2e3, this.title = "Publicidad", this.adLoaded = !1, this.trackViewability = !1, this.showSkeleton = !1;
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
    const n = history.pushState.bind(history), t = history.replaceState.bind(history);
    history.pushState = (...e) => {
      n(...e), d._handleNavigation();
    }, history.replaceState = (...e) => {
      t(...e), d._handleNavigation();
    }, d.navigationListenersAttached = !0;
  }
  connectedCallback() {
    super.connectedCallback(), Pe(), d.initialized ? d._handleNavigation() : (C(this, S, Dt).call(this), d.initialized = !0, d.old_url = location.href);
  }
  disconnectedCallback() {
    if (super.disconnectedCallback(), this.trackViewability && this.divId && Y.untrack(this.divId), this.pendingBidsTimeout && (clearTimeout(this.pendingBidsTimeout), this.pendingBidsTimeout = null), window.googletag?.pubads) {
      const n = window.googletag.pubads();
      this.slotRenderHandler && (n.removeEventListener("slotRenderEnded", this.slotRenderHandler), this.slotRenderHandler = null), this.impressionViewableHandler && (n.removeEventListener("impressionViewable", this.impressionViewableHandler), this.impressionViewableHandler = null), this.slotVisibilityHandler && (n.removeEventListener("slotVisibilityChanged", this.slotVisibilityHandler), this.slotVisibilityHandler = null);
    }
    if (this.adSlot) {
      if (window.dreamsAllSlots) {
        const n = window.dreamsAllSlots.indexOf(this.adSlot);
        n > -1 && window.dreamsAllSlots.splice(n, 1);
      }
      if (window.dreamsSlotsToUpdate) {
        const n = window.dreamsSlotsToUpdate.indexOf(this.adSlot);
        n > -1 && window.dreamsSlotsToUpdate.splice(n, 1);
      }
      window.googletag?.destroySlots && window.googletag.destroySlots([this.adSlot]), this.adSlot = null;
    }
  }
  async firstUpdated() {
    if (await C(this, S, Nt).call(this), await C(this, S, Vt).call(this), this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`, this.apstag && this.pubId && !d.initialized_aps)
      if (typeof window.apstag?.init == "function")
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
    await this.updateComplete, C(this, S, Ft).call(this);
  }
  render() {
    const n = this.showSkeleton ? ke(this.slot || "box-1", window.innerWidth) : { width: 0, height: 0 };
    return $`
			<div class="dae-container">
				${bt(
      this.enableTitle,
      () => $`<span class="dae-label">${this.title}</span>`,
      () => $``
    )}
				${bt(
      !this.adLoaded,
      () => this.showSkeleton ? $`<dreams-ad-skeleton
                  width="${n.width}"
                  height="${n.height}"
                ></dreams-ad-skeleton>` : $`<div
                  class="dae-loader"
                  data-ad-loader="${this.divId}"
                ></div>`,
      () => $``
    )}
				<div
					class="dae-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
					style="${!this.adLoaded && this.showSkeleton ? "opacity: 0;" : ""}"
				>
				</div>
			</div>
		`;
  }
};
S = /* @__PURE__ */ new WeakSet();
Dt = function() {
  window.googletag = window.googletag || { cmd: [] };
  const n = () => {
    window.googletag.cmd.push(() => {
      if (window.dreamsAllSlots = window.dreamsAllSlots || [], window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [], !(window.googletag.pubadsReady === !0)) {
        if (window.googletag.pubads().disableInitialLoad(), f.isInitialized()) {
          const e = {}, i = f.getLazyLoad();
          i && (e.lazyLoad = i), f.getThreadYield() && (e.threadYield = "ENABLED_ALL_SLOTS"), Object.keys(e).length > 0 && (typeof window.googletag.setConfig == "function" ? window.googletag.setConfig(e) : i && window.googletag.pubads().enableLazyLoad(i)), f.getCentering() && window.googletag.pubads().setCentering(!0);
          const s = f.getPrivacy();
          s && window.googletag.pubads().setPrivacySettings(s);
        }
        window.googletag.enableServices();
      }
      f.isInitialized() && C(this, S, Mt).call(this);
    });
  };
  f.isInitialized() ? n() : f.whenReady().then(n).catch(() => n()), d._setupNavigationListeners();
};
Nt = async function() {
  if (this.slot === "interstitial") {
    console.warn(
      '[DreamsAdEngine] <dreams-ad-engine slot="interstitial"> is deprecated. Configure interstitials via DreamsAdConfig.init({ interstitial: { enabled: true } }).'
    );
    return;
  }
  if (this.slot) {
    await f.whenReady();
    const n = f.getSlot(this.slot);
    n && (this.networkId || (this.networkId = f.getNetworkId()), this.adUnit || (this.adUnit = f.buildAdUnit(this.slot)), (!this.mapping || this.mapping.length === 0) && (this.mapping = n.mapping), (!this.sizing || this.sizing.length === 0) && (this.sizing = n.sizing), this.pubId || (this.pubId = f.getPubId() || ""), this.pubId && (this.apstag = !0));
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
};
Vt = async function() {
  if (this.autoTargeting) {
    const n = await W.getTargeting();
    this.resolvedTargeting = n.targeting;
  } else this.targeting && this.targeting.length > 0 && (this.resolvedTargeting = this.targeting);
};
Mt = function() {
  if (d.outOfPageRegistered) return;
  d.outOfPageRegistered = !0;
  const n = f.getNetworkId(), t = f.getSitePrefix(), e = `/${n}/${t}-is-i`;
  if (f.getInterstitial()?.enabled) {
    const o = window.googletag.defineOutOfPageSlot(
      e,
      window.googletag.enums.OutOfPageFormat.INTERSTITIAL
    );
    o && (o.addService(window.googletag.pubads()), window.dreamsAllSlots.push(o));
  }
  const s = f.getAnchor();
  if (s?.enabled) {
    const o = `/${n}/${t}-is-a`;
    if (s.position === "top" || s.position === "both") {
      const r = window.googletag.defineOutOfPageSlot(
        o,
        window.googletag.enums.OutOfPageFormat.TOP_ANCHOR
      );
      r && (r.addService(window.googletag.pubads()), window.dreamsAllSlots.push(r));
    }
    if (s.position === "bottom" || s.position === "both") {
      const r = window.googletag.defineOutOfPageSlot(
        o,
        window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
      );
      r && (r.addService(window.googletag.pubads()), window.dreamsAllSlots.push(r));
    }
  }
};
Bt = function() {
  if (!this.mapping || this.mapping.length === 0) return 2;
  const n = typeof window < "u" ? window.innerWidth : 0;
  let t = null;
  for (const i of this.mapping)
    i.viewport[0] <= n && (!t || i.viewport[0] > t.viewport[0]) && (t = i);
  if (!t) return 2;
  let e = 0;
  for (const [, i] of t.sizing)
    i > 1 && (e = Math.max(e, i));
  return e || 2;
};
Ft = function() {
  const n = `/${this.networkId}/${this.adUnit}`, t = this.divId, e = document.createElement("div");
  e.id = t, e.setAttribute("data-ad", this.divId), e.setAttribute("role", "complementary"), e.setAttribute("aria-label", "Advertisement"), e.classList.add("dae-slot"), e.style.cssText = "width:100%";
  const i = C(this, S, Bt).call(this), s = this.querySelector(".dae-serving");
  s instanceof HTMLElement && (s.style.minHeight = `${i}px`), e.parentElement || (s ? s.appendChild(e) : this.appendChild(e)), requestAnimationFrame(() => {
    window.googletag.cmd.push(() => {
      if (!document.getElementById(t)) {
        console.warn(`[DreamsAdEngine] Slot div ${t} not in DOM, aborting`);
        return;
      }
      const o = window.googletag.defineSlot(n, this.sizing, t).addService(window.googletag.pubads());
      this.resolvedTargeting.forEach((a) => {
        o.setTargeting(a.key, a.value);
      }), this.slotRenderHandler = (a) => {
        if (a.slot.getSlotElementId() !== t) return;
        this.adLoaded = !0;
        const c = this.querySelector(`#${t}`);
        if (c instanceof HTMLElement)
          if (a.isEmpty) {
            c.style.minHeight = "0";
            const h = this.querySelector(".dae-serving");
            h instanceof HTMLElement && (h.style.minHeight = "0");
          } else {
            let h = !1;
            const u = () => {
              const g = c.querySelector("iframe");
              if (!g) return !1;
              const y = g.offsetWidth || parseInt(g.style.width) || parseInt(g.width), b = g.offsetHeight || parseInt(g.style.height) || parseInt(g.height);
              return y > 1 && b > 1 ? (c.style.minHeight = `${b}px`, !0) : !1;
            };
            h = u(), h || requestAnimationFrame(() => {
              if (h = u(), !h && typeof ResizeObserver < "u") {
                const g = c.querySelector("iframe");
                if (g) {
                  const y = new ResizeObserver((b) => {
                    for (const jt of b) {
                      const { width: qt, height: at } = jt.contentRect;
                      qt > 1 && at > 1 && (c.style.minHeight = `${at}px`, y.disconnect());
                    }
                  });
                  y.observe(g), setTimeout(() => y.disconnect(), 1e4);
                }
              }
            });
          }
        if (this.dispatchEvent(new CustomEvent("ad:rendered", {
          bubbles: !0,
          detail: {
            isEmpty: a.isEmpty,
            size: a.size ?? null,
            advertiserId: a.advertiserId ?? null,
            creativeId: a.creativeId ?? null,
            lineItemId: a.lineItemId ?? null,
            isBackfill: a.isBackfill ?? !1,
            slotId: t,
            adUnit: n
          }
        })), this.trackViewability && !a.isEmpty) {
          const h = this.querySelector(`#${t}`);
          h instanceof HTMLElement && Y.track(
            h,
            t,
            this.slot || this.adUnit
          );
        }
      }, window.googletag.pubads().addEventListener("slotRenderEnded", this.slotRenderHandler), this.impressionViewableHandler = (a) => {
        a.slot.getSlotElementId() === t && (tt.markViewable(t), this.dispatchEvent(new CustomEvent("ad:viewable", {
          bubbles: !0,
          detail: { slotId: t, adUnit: n }
        })));
      }, window.googletag.pubads().addEventListener("impressionViewable", this.impressionViewableHandler), this.slotVisibilityHandler = (a) => {
        if (a.slot.getSlotElementId() !== t) return;
        const c = a.inViewPercentage, h = Math.floor(c / 25) * 25, u = Math.floor(this.lastVisibilityPct / 25) * 25;
        h === u && this.lastVisibilityPct >= 0 || (this.lastVisibilityPct = c, this.dispatchEvent(new CustomEvent("ad:visibility", {
          bubbles: !0,
          detail: {
            slotId: t,
            adUnit: n,
            inViewPercentage: c
          }
        })));
      }, window.googletag.pubads().addEventListener("slotVisibilityChanged", this.slotVisibilityHandler);
      const r = window.googletag.sizeMapping();
      if (this.mapping.forEach((a) => {
        r.addSize(a.viewport, a.sizing);
      }), o.defineSizeMapping(r.build()), this.adSlot = o, this.refresh && window.dreamsSlotsToUpdate.push(o), window.dreamsAllSlots.push(o), window.googletag.display(t), !(this.apstag && this.pubId))
        window.googletag.pubads().refresh([o]);
      else {
        if (typeof window.apstag?.fetchBids != "function") {
          window.googletag.pubads().refresh([o]);
          return;
        }
        let a = !1;
        const c = this.bidTimeout || 2e3;
        this.pendingBidsTimeout = setTimeout(() => {
          a || (a = !0, window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh([o]);
          }));
        }, c + 500), window.apstag.fetchBids(
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
            a || (a = !0, clearTimeout(this.pendingBidsTimeout), window.googletag.cmd.push(() => {
              window.apstag.setDisplayBids(), window.googletag.pubads().refresh([o]);
            }));
          }
        );
      }
    });
  });
};
d.initialized = !1;
d.old_url = "";
d.initialized_aps = !1;
d.navigationListenersAttached = !1;
d.outOfPageRegistered = !1;
d._handleNavigation = () => {
  const n = location.href;
  d.old_url !== n && (window.googletag?.destroySlots && window.dreamsAllSlots?.length > 0 && (window.googletag.destroySlots(window.dreamsAllSlots), window.googletag.pubads().updateCorrelator()), d.old_url = n, window.dreamsAllSlots = [], window.dreamsSlotsToUpdate = [], W.clearCache());
};
m([
  p({ type: String })
], d.prototype, "networkId", 2);
m([
  p({ type: String })
], d.prototype, "adUnit", 2);
m([
  p({ type: String })
], d.prototype, "divId", 2);
m([
  p({ type: String })
], d.prototype, "slot", 2);
m([
  p({ type: Array })
], d.prototype, "mapping", 2);
m([
  p({ type: Array })
], d.prototype, "sizing", 2);
m([
  p({ type: Array })
], d.prototype, "targeting", 2);
m([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "autoTargeting", 2);
m([
  we()
], d.prototype, "resolvedTargeting", 2);
m([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "refresh", 2);
m([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "enableTitle", 2);
m([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "apstag", 2);
m([
  p({ type: String })
], d.prototype, "pubId", 2);
m([
  p({ type: Number })
], d.prototype, "bidTimeout", 2);
m([
  p({ type: String })
], d.prototype, "title", 2);
m([
  p({ type: Boolean })
], d.prototype, "adLoaded", 2);
m([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "trackViewability", 2);
m([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "showSkeleton", 2);
d = m([
  Ut("dreams-ad-engine")
], d);
const kt = {
  enabled: !0,
  addBodyClass: !0,
  bodyClass: "ad-blocker-detected",
  timeout: 1e3
}, H = class H {
  /**
   * Configure the ad block detector
   */
  static configure(t) {
    this.config = { ...kt, ...t };
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
H.config = kt, H.detected = null, H.detecting = null;
let Et = H;
const Tt = {
  enabled: "auto",
  prefix: "[DreamsAdEngine]",
  verbose: !1
}, rt = class rt {
  /**
   * Configure the logger
   */
  static configure(t) {
    this.config = { ...Tt, ...t };
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
rt.config = Tt;
let xt = rt;
const Ct = {
  enabled: !1,
  positions: [],
  minViewportHeight: 768,
  topOffset: 80,
  headerSelector: null,
  smoothTransition: !0,
  transitionDuration: 150
}, D = class D {
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
    const o = this.getTopOffset();
    this.config.smoothTransition && (s.style.transition = `top ${this.config.transitionDuration}ms ease-out`), s.style.position = "sticky", s.style.top = `${o}px`, s.style.alignSelf = "flex-start", s.style.zIndex = "10";
    const r = {
      adId: e,
      position: i,
      stickyTime: 0,
      totalTime: 0,
      isCurrentlySticky: !1
    }, l = () => this.handleScroll(e, o), a = {
      element: s,
      container: t,
      metrics: r,
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
    const o = i.element.getBoundingClientRect().top <= e + 5;
    o && !i.stickyStartTime ? (i.stickyStartTime = Date.now(), i.metrics.isCurrentlySticky = !0, this.dispatchEvent("sticky:start", t, i.metrics)) : !o && i.stickyStartTime && (i.metrics.stickyTime += Date.now() - i.stickyStartTime, i.stickyStartTime = null, i.metrics.isCurrentlySticky = !1, this.dispatchEvent("sticky:end", t, i.metrics));
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
D.config = Ct, D.stickyAds = /* @__PURE__ */ new Map(), D.lastScrollTime = 0;
let Pt = D;
export {
  Et as AdBlockDetector,
  be as DEFAULT_SLOTS,
  d as DreamsAdComponent,
  f as DreamsAdConfig,
  O as DreamsAdSkeleton,
  W as DreamsTargetingService,
  xt as Logger,
  tt as RefreshManager,
  Pt as StickyManager,
  Y as ViewabilityService,
  ke as getSkeletonDimensions
};
