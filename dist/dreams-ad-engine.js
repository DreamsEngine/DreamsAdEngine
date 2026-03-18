const F = globalThis, Q = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = /* @__PURE__ */ Symbol(), at = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = at.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ct = (n) => new zt(typeof n == "string" ? n : n + "", void 0, tt), Bt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new zt(e, n, tt);
}, Vt = (n, t) => {
  if (Q) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = F.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, lt = Q ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ct(e);
})(n) : n;
const { is: Ft, defineProperty: jt, getOwnPropertyDescriptor: qt, getOwnPropertyNames: Wt, getOwnPropertySymbols: Gt, getPrototypeOf: Jt } = Object, K = globalThis, dt = K.trustedTypes, Kt = dt ? dt.emptyScript : "", Zt = K.reactiveElementPolyfillSupport, P = (n, t) => n, j = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Kt : null;
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
} }, et = (n, t) => !Ft(n, t), ct = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), K.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && jt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = qt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = Jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Wt(e), ...Gt(e)];
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
      for (const s of i) e.unshift(lt(s));
    } else t !== void 0 && e.push(lt(t));
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
    return Vt(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : j;
      this._$Em = s;
      const l = r.fromAttribute(e, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? et)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[P("elementProperties")] = /* @__PURE__ */ new Map(), k[P("finalized")] = /* @__PURE__ */ new Map(), Zt?.({ ReactiveElement: k }), (K.reactiveElementVersions ??= []).push("2.1.2");
const it = globalThis, ht = (n) => n, q = it.trustedTypes, pt = q ? q.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Pt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, It = "?" + b, Xt = `<${It}>`, A = document, D = () => A.createComment(""), R = (n) => n === null || typeof n != "object" && typeof n != "function", st = Array.isArray, Yt = (n) => st(n) || typeof n?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, gt = />/g, $ = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, mt = /"/g, Ut = /^(?:script|style|textarea|title)$/i, Qt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), v = Qt(1), x = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), _ = A.createTreeWalker(A, 129);
function Lt(n, t) {
  if (!st(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(t) : t;
}
const te = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = C;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let h, u, c = -1, w = 0;
    for (; w < a.length && (r.lastIndex = w, u = r.exec(a), u !== null); ) w = r.lastIndex, r === C ? u[1] === "!--" ? r = ut : u[1] !== void 0 ? r = gt : u[2] !== void 0 ? (Ut.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = $) : u[3] !== void 0 && (r = $) : r === $ ? u[0] === ">" ? (r = s ?? C, c = -1) : u[1] === void 0 ? c = -2 : (c = r.lastIndex - u[2].length, h = u[1], r = u[3] === void 0 ? $ : u[3] === '"' ? mt : ft) : r === mt || r === ft ? r = $ : r === ut || r === gt ? r = C : (r = $, s = void 0);
    const y = r === $ && n[l + 1].startsWith("/>") ? " " : "";
    o += r === C ? a + Xt : c >= 0 ? (i.push(h), a.slice(0, c) + Pt + a.slice(c) + b + y) : a + b + (c === -2 ? l : y);
  }
  return [Lt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, u] = te(t, e);
    if (this.el = N.createElement(h, i), _.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = _.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Pt)) {
          const w = u[r++], y = s.getAttribute(c).split(b), B = /([.?@])?(.*)/.exec(w);
          a.push({ type: 1, index: o, name: B[2], strings: y, ctor: B[1] === "." ? ie : B[1] === "?" ? se : B[1] === "@" ? ne : Z }), s.removeAttribute(c);
        } else c.startsWith(b) && (a.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Ut.test(s.tagName)) {
          const c = s.textContent.split(b), w = c.length - 1;
          if (w > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let y = 0; y < w; y++) s.append(c[y], D()), _.nextNode(), a.push({ type: 2, index: ++o });
            s.append(c[w], D());
          }
        }
      } else if (s.nodeType === 8) if (s.data === It) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(b, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += b.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function z(n, t, e = n, i) {
  if (t === x) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = R(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = z(n, s._$AS(n, t.values), s, i)), t;
}
class ee {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? A).importNode(e, !0);
    _.currentNode = s;
    let o = _.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new H(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new oe(o, this, t)), this._$AV.push(h), a = i[++l];
      }
      r !== a?.index && (o = _.nextNode(), r++);
    }
    return _.currentNode = A, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = z(this, t, e), R(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Yt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(Lt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new ee(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = wt.get(t.strings);
    return e === void 0 && wt.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new H(this.O(D()), this.O(D()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ht(t).nextSibling;
      ht(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = z(this, t, e, 0), r = !R(t) || t !== this._$AH && t !== x, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = z(this, l[i + a], e, a), h === x && (h = this._$AH[a]), r ||= !R(h) || h !== this._$AH[a], h === f ? t = f : t !== f && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ie extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class se extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ne extends Z {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = z(this, t, e, 0) ?? f) === x) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oe {
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
const re = it.litHtmlPolyfillSupport;
re?.(N, H), (it.litHtmlVersions ??= []).push("3.3.2");
const ae = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new H(t.insertBefore(D(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const nt = globalThis;
class E extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ae(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
}
E._$litElement$ = !0, E.finalized = !0, nt.litElementHydrateSupport?.({ LitElement: E });
const le = nt.litElementPolyfillSupport;
le?.({ LitElement: E });
(nt.litElementVersions ??= []).push("4.2.2");
const Ot = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
const de = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: et }, ce = (n = de, t, e) => {
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
  return (t, e) => typeof e == "object" ? ce(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function he(n) {
  return p({ ...n, state: !0, attribute: !1 });
}
function yt(n, t, e) {
  return n ? t(n) : e?.(n);
}
const pe = `:host {
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
`, ue = {
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
}, ge = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, ot = class ot {
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
        ...ue,
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
  /** @deprecated Use `getLazyLoad()` instead */
  static getDefaultLazyLoad() {
    return this.assertInitialized(), this.instance.lazyLoad || ge;
  }
  static getLazyLoad() {
    return this.assertInitialized(), this.instance.lazyLoad;
  }
  static getCentering() {
    return this.assertInitialized(), this.instance.centering;
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
    this.instance = null;
  }
  static assertInitialized() {
    if (!this.instance)
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first."
      );
  }
};
ot.instance = null;
let m = ot;
const vt = {
  contextKey: "@context",
  maxRetries: 20,
  retryInterval: 100,
  includeUrl: !0,
  customSegmentFn: "_rl_gen_sg"
}, I = class I {
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
        const h = window.dfp;
        if (!h?.[t.contextKey]) return null;
        try {
          const u = h[t.contextKey], c = this.buildFromContext(u, t);
          return this.cache = c, this.cacheUrl = e, { targeting: c, source: "context" };
        } catch (u) {
          return s(u), null;
        }
      }, a = l();
      if (a) {
        i(a);
        return;
      }
      r = setInterval(() => {
        o++;
        const h = l();
        if (h) {
          r && clearInterval(r), i(h);
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
I.cache = null, I.cacheUrl = "", I.pendingPromise = null;
let W = I;
const bt = {
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
    this.config = { ...bt, ...t };
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
J.config = bt, J.trackedAds = /* @__PURE__ */ new Map();
let G = J;
var fe = Object.defineProperty, me = Object.getOwnPropertyDescriptor, M = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? me(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && fe(t, e, s), s;
};
let S = class extends E {
  constructor() {
    super(...arguments), this.width = 300, this.height = 250, this.showLabel = !1, this.label = "Ad";
  }
  render() {
    return v`
      <div
        class="skeleton"
        style="width: ${this.width}px; height: ${this.height}px;"
      >
        ${this.showLabel ? v`<span class="skeleton-label">${this.label}</span>` : ""}
      </div>
    `;
  }
};
S.styles = Bt`
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
M([
  p({ type: Number })
], S.prototype, "width", 2);
M([
  p({ type: Number })
], S.prototype, "height", 2);
M([
  p({ type: Boolean })
], S.prototype, "showLabel", 2);
M([
  p({ type: String })
], S.prototype, "label", 2);
S = M([
  Ot("dreams-ad-skeleton")
], S);
function we(n, t) {
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
var ye = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, Dt = (n) => {
  throw TypeError(n);
}, g = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ve(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ye(t, e, s), s;
}, be = (n, t, e) => t.has(n) || Dt("Cannot " + e), $e = (n, t, e) => t.has(n) ? Dt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), V = (n, t, e) => (be(n, t, "access private method"), e), T, Rt, Nt, Ht, Mt;
let d = class extends E {
  constructor() {
    super(...arguments), $e(this, T), this.adSlot = null, this.slotRenderHandler = null, this.pendingBidsTimeout = null, this.networkId = "", this.adUnit = "", this.divId = "", this.slot = "", this.mapping = [], this.sizing = [], this.targeting = [], this.autoTargeting = !1, this.resolvedTargeting = [], this.refresh = !1, this.enableTitle = !1, this.apstag = !1, this.pubId = "", this.bidTimeout = 2e3, this.title = "Publicidad", this.adLoaded = !1, this.trackViewability = !1, this.showSkeleton = !1;
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
    super.connectedCallback(), d.initialized ? d._handleNavigation() : (V(this, T, Rt).call(this), d.initialized = !0, d.old_url = location.href);
  }
  disconnectedCallback() {
    if (super.disconnectedCallback(), this.trackViewability && this.divId && G.untrack(this.divId), this.pendingBidsTimeout && (clearTimeout(this.pendingBidsTimeout), this.pendingBidsTimeout = null), this.slotRenderHandler && window.googletag?.pubads && (window.googletag.pubads().removeEventListener("slotRenderEnded", this.slotRenderHandler), this.slotRenderHandler = null), this.adSlot) {
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
    if (await V(this, T, Nt).call(this), await V(this, T, Ht).call(this), this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`, this.apstag && this.pubId && !d.initialized_aps)
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
    V(this, T, Mt).call(this);
  }
  render() {
    const n = this.showSkeleton ? we(this.slot || "box-1", window.innerWidth) : { width: 0, height: 0 };
    return v`
			<div class="ad-container">
				${yt(
      this.enableTitle,
      () => v`<span class="ad-label">${this.title}</span>`,
      () => v``
    )}
				${yt(
      !this.adLoaded,
      () => this.showSkeleton ? v`<dreams-ad-skeleton
                  width="${n.width}"
                  height="${n.height}"
                ></dreams-ad-skeleton>` : v`<div
                  class="ad-loader"
                  data-ad-loader="${this.divId}"
                ></div>`,
      () => v``
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
T = /* @__PURE__ */ new WeakSet();
Rt = function() {
  window.googletag = window.googletag || { cmd: [] }, window.googletag.cmd.push(() => {
    if (window.dreamsAllSlots = window.dreamsAllSlots || [], window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [], !(window.googletag.pubadsReady === !0)) {
      if (window.googletag.pubads().disableInitialLoad(), m.isInitialized()) {
        const t = m.getLazyLoad();
        t && window.googletag.pubads().enableLazyLoad(t), m.getCentering() && window.googletag.pubads().setCentering(!0);
      }
      window.googletag.enableServices();
    }
  }), d._setupNavigationListeners();
};
Nt = async function() {
  if (this.slot && m.isInitialized()) {
    const n = m.getSlot(this.slot);
    n && (this.networkId || (this.networkId = m.getNetworkId()), this.adUnit || (this.adUnit = m.buildAdUnit(this.slot)), (!this.mapping || this.mapping.length === 0) && (this.mapping = n.mapping), (!this.sizing || this.sizing.length === 0) && (this.sizing = n.sizing), this.pubId || (this.pubId = m.getPubId() || ""), this.pubId && (this.apstag = !0));
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
Ht = async function() {
  if (this.autoTargeting) {
    const n = await W.getTargeting();
    this.resolvedTargeting = n.targeting;
  } else this.targeting && this.targeting.length > 0 && (this.resolvedTargeting = this.targeting);
};
Mt = function() {
  const n = `/${this.networkId}/${this.adUnit}`, t = this.divId, e = document.createElement("div");
  e.id = t, e.setAttribute("data-ad", this.divId), e.setAttribute("slot", "ad-slot"), e.classList.add("ad-serving-rendered"), e.style.cssText = "width:100%;min-height:2px", e.parentElement || this.appendChild(e), window.googletag.cmd.push(() => {
    const i = window.googletag.defineSlot(n, this.sizing, t).addService(window.googletag.pubads());
    this.resolvedTargeting.forEach((r) => {
      i.setTargeting(r.key, r.value);
    }), this.slotRenderHandler = (r) => {
      if (r.slot.getSlotElementId() === t && (this.adLoaded = !0, this.trackViewability)) {
        const l = this.querySelector(`#${t}`);
        l instanceof HTMLElement && G.track(
          l,
          t,
          this.slot || this.adUnit
        );
      }
    }, window.googletag.pubads().addEventListener("slotRenderEnded", this.slotRenderHandler);
    const s = window.googletag.sizeMapping();
    if (this.mapping.forEach((r) => {
      s.addSize(r.viewport, r.sizing);
    }), i.defineSizeMapping(s.build()), this.adSlot = i, this.refresh && window.dreamsSlotsToUpdate.push(i), window.dreamsAllSlots.push(i), window.googletag.display(t), !(this.apstag && this.pubId))
      window.googletag.pubads().refresh([i]);
    else {
      if (typeof window.apstag?.fetchBids != "function") {
        window.googletag.pubads().refresh([i]);
        return;
      }
      let r = !1;
      const l = this.bidTimeout || 2e3;
      this.pendingBidsTimeout = setTimeout(() => {
        r || (r = !0, window.googletag.cmd.push(() => {
          window.googletag.pubads().refresh([i]);
        }));
      }, l + 500), window.apstag.fetchBids(
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
          r || (r = !0, clearTimeout(this.pendingBidsTimeout), window.googletag.cmd.push(() => {
            window.apstag.setDisplayBids(), window.googletag.pubads().refresh([i]);
          }));
        }
      );
    }
  });
};
d.styles = Ct(pe);
d.initialized = !1;
d.old_url = "";
d.initialized_aps = !1;
d.navigationListenersAttached = !1;
d._handleNavigation = () => {
  const n = location.href;
  d.old_url !== n && (window.googletag?.destroySlots && window.dreamsAllSlots?.length > 0 && window.googletag.destroySlots(window.dreamsAllSlots), d.old_url = n, window.dreamsAllSlots = [], window.dreamsSlotsToUpdate = [], W.clearCache());
};
g([
  p({ type: String })
], d.prototype, "networkId", 2);
g([
  p({ type: String })
], d.prototype, "adUnit", 2);
g([
  p({ type: String })
], d.prototype, "divId", 2);
g([
  p({ type: String })
], d.prototype, "slot", 2);
g([
  p({ type: Array })
], d.prototype, "mapping", 2);
g([
  p({ type: Array })
], d.prototype, "sizing", 2);
g([
  p({ type: Array })
], d.prototype, "targeting", 2);
g([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "autoTargeting", 2);
g([
  he()
], d.prototype, "resolvedTargeting", 2);
g([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "refresh", 2);
g([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "enableTitle", 2);
g([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "apstag", 2);
g([
  p({ type: String })
], d.prototype, "pubId", 2);
g([
  p({ type: Number })
], d.prototype, "bidTimeout", 2);
g([
  p({ type: String })
], d.prototype, "title", 2);
g([
  p({ type: Boolean })
], d.prototype, "adLoaded", 2);
g([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "trackViewability", 2);
g([
  p({ type: Boolean, reflect: !0 })
], d.prototype, "showSkeleton", 2);
d = g([
  Ot("dreams-ad-engine")
], d);
const $t = {
  enabled: !0,
  addBodyClass: !0,
  bodyClass: "ad-blocker-detected",
  timeout: 1e3
}, U = class U {
  /**
   * Configure the ad block detector
   */
  static configure(t) {
    this.config = { ...$t, ...t };
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
U.config = $t, U.detected = null, U.detecting = null;
let _t = U;
const Y = 3e4, At = {
  enabled: !1,
  interval: 6e4,
  checkVisibility: !0,
  disableOnSinglePost: !0,
  singlePostSelector: "body.single"
}, L = class L {
  /**
   * Configure the refresh manager
   */
  static configure(t) {
    this.config = { ...At, ...t }, this.config.interval < Y && (this.config.interval = Y);
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
    if (!window.googletag?.pubads)
      return !1;
    const e = Date.now(), i = window.lastAdRefresh || 0;
    if (e - i < Y)
      return !1;
    window.lastAdRefresh = e;
    const o = t || window.dreamsSlotsToUpdate || [], r = o.length;
    if (r === 0)
      return !1;
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
L.config = At, L.refreshTimer = null, L.running = !1;
let St = L;
const kt = {
  enabled: "auto",
  prefix: "[DreamsAdEngine]",
  verbose: !1
}, rt = class rt {
  /**
   * Configure the logger
   */
  static configure(t) {
    this.config = { ...kt, ...t };
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
rt.config = kt;
let Tt = rt;
const Et = {
  enabled: !1,
  positions: [],
  minViewportHeight: 768,
  topOffset: 80,
  headerSelector: null,
  smoothTransition: !0,
  transitionDuration: 150
}, O = class O {
  /**
   * Configure the sticky manager
   */
  static configure(t) {
    this.config = { ...Et, ...t };
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
O.config = Et, O.stickyAds = /* @__PURE__ */ new Map(), O.lastScrollTime = 0;
let xt = O;
export {
  _t as AdBlockDetector,
  ue as DEFAULT_SLOTS,
  d as DreamsAdComponent,
  m as DreamsAdConfig,
  S as DreamsAdSkeleton,
  W as DreamsTargetingService,
  Tt as Logger,
  St as RefreshManager,
  xt as StickyManager,
  G as ViewabilityService,
  we as getSkeletonDimensions
};
