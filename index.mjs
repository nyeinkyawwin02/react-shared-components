import ce from "axios";
import { useState as T, useEffect as J, Component as Be, useMemo as O, useRef as Ne, useCallback as D } from "react";
import { jsxs as c, Fragment as X, jsx as t } from "react/jsx-runtime";
import a from "prop-types";
import { Table as Te, TableHeader as Pe, TableColumn as ke, TableBody as we, Spinner as Y, TableRow as Ie, TableCell as $e, Pagination as Ue, Button as H, Modal as de, ModalContent as ue, ModalHeader as me, ModalBody as pe, ModalFooter as he, Select as Le, SelectItem as ne, Input as Ae, Autocomplete as je, AutocompleteItem as Oe } from "@nextui-org/react";
import { useLocation as Ve, Link as qe } from "react-router-dom";
import { Toaster as ze } from "react-hot-toast";
import * as Z from "xlsx";
import { saveAs as Ke } from "file-saver";
import { X as ae, Upload as xe } from "lucide-react";
import { GiCancel as He } from "react-icons/gi";
import { BiPlusCircle as We } from "react-icons/bi";
import { create as Ge } from "zustand";
const $r = (r) => new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(r), Ur = (r, e) => Number(r.page) * Number(r.limit) + e + 1 - Number(r.limit), Ze = ({ text: r = "", limit: e = 20 }) => r.length > e ? r.slice(0, e) + "..." : r, _e = (r) => ({ status: !0, data: r }), _ = (r = "", e) => ({ status: !1, message: r, data: e }), ee = {}, ve = {
  baseURL: typeof import.meta < "u" && (ee != null && ee.VITE_API_BASE_URL) ? void 0 : "http://localhost:3000",
  tokenKey: "@token",
  userKey: "@authenticatedUser",
  headers: {
    "Content-Type": "application/json"
  },
  includeBranchLogic: !0,
  includeCreatedBy: !0,
  onSuccess: null,
  // Will use default notification handler if not provided
  onError: null
  // Will use default notification handler if not provided
}, fe = (r = {}) => ({
  ...ve,
  ...r,
  headers: {
    ...ve.headers,
    ...r.headers || {}
  }
}), Qe = (r) => {
  try {
    typeof window < "u" && window.toast ? window.toast.success(r) : import("react-hot-toast").then(({ default: e }) => e.success(r)).catch(() => console.log("✓", r));
  } catch {
    console.log("✓", r);
  }
}, Je = (r) => {
  try {
    typeof window < "u" && window.toast ? window.toast.error(r) : import("react-hot-toast").then(({ default: e }) => e.error(r)).catch(() => console.error("✗", r));
  } catch {
    console.error("✗", r);
  }
}, Xe = (r) => r.onSuccess || Qe, Ye = (r) => r.onError || Je, er = (r) => {
  if (r.baseURL && typeof r.baseURL != "string")
    throw new Error("baseURL must be a string");
  if (r.tokenKey && typeof r.tokenKey != "string")
    throw new Error("tokenKey must be a string");
  if (r.userKey && typeof r.userKey != "string")
    throw new Error("userKey must be a string");
  if (r.onSuccess && typeof r.onSuccess != "function")
    throw new Error("onSuccess must be a function");
  if (r.onError && typeof r.onError != "function")
    throw new Error("onError must be a function");
}, re = {}, rr = (r) => (e) => {
  var l;
  const n = localStorage.getItem(r.tokenKey), s = localStorage.getItem(r.userKey);
  let o = {};
  try {
    o = s ? JSON.parse(s) : {};
  } catch (i) {
    console.error("Error parsing user data:", i);
  }
  if (n && (e.headers.Authorization = `Bearer ${n}`, r.includeBranchLogic)) {
    const i = ((l = o.relatedBranch) == null ? void 0 : l._id) || o.relatedBranch;
    if (i && (e.params = {
      ...e.params,
      relatedBranch: i
    }, ["post", "put", "patch"].includes(e.method)))
      if (e.data instanceof FormData)
        e.data.has("relatedBranch") ? e.data.get("relatedBranch") || e.data.set("relatedBranch", i) : e.data.append("relatedBranch", i), r.includeCreatedBy && (!e.data.has("createdBy") || !e.data.get("createdBy") ? e.data.append("createdBy", o._id || o.id) : e.data.get("createdBy") || e.data.set("createdBy", o._id || o.id));
      else {
        const m = {
          relatedBranch: i
        };
        r.includeCreatedBy && (m.createdBy = o._id || o.id), e.data = {
          ...e.data,
          ...m
        };
      }
  }
  return r.transformRequest ? r.transformRequest(e, o, n) : e;
}, Ar = (r) => (e) => {
  const n = localStorage.getItem(r.tokenKey);
  return n && (e.headers.Authorization = `Bearer ${n}`), e;
}, tr = (r, e) => (r.interceptors.request.use(
  e.requestInterceptor || rr(e),
  (n) => Promise.reject(n)
), e.responseInterceptor ? r.interceptors.response.use(
  e.responseInterceptor,
  e.errorInterceptor || ((n) => Promise.reject(n))
) : e.errorInterceptor && r.interceptors.response.use(
  (n) => n,
  e.errorInterceptor
), r), se = (r = {}) => {
  er(r);
  const e = fe(r), n = ce.create({
    baseURL: e.baseURL,
    headers: e.headers
  });
  return tr(n, e);
}, z = (r) => r ? se({ baseURL: r }) : se(), nr = typeof import.meta < "u" && (re != null && re.VITE_API_BASE_URL) ? void 0 : "http://localhost:3000", jr = ce.create({
  baseURL: nr,
  headers: {
    "Content-Type": "application/json"
  }
}), Or = se(), W = (r, e = {}) => {
  if (e.showNotification === !1) return;
  const n = fe(e.apiConfig), s = e.onSuccess || Xe(n), o = e.customSuccessMessage || r;
  s(o);
}, q = (r, e = {}) => {
  if (e.showNotification === !1) return;
  const n = fe(e.apiConfig), s = e.onError || Ye(n), o = e.customErrorMessage || r;
  s(o);
}, oe = async (r, e = {}, n = z(), s = {}) => {
  var o, l;
  try {
    return (await n.get(r, { params: e })).data;
  } catch (i) {
    if (i.status == "404")
      return {
        isSuccess: !0,
        data: []
      };
    const m = ((l = (o = i == null ? void 0 : i.response) == null ? void 0 : o.data) == null ? void 0 : l.message) || "Request failed";
    return q(m, s), {
      success: !1,
      data: [],
      message: m
    };
  }
}, Vr = async (r, e, n, s, o = z(), l = {}) => {
  var i, m;
  try {
    const g = await import("sweetalert2").catch(() => null), f = await o.post(r, e, n);
    return g != null && g.default ? g.default.fire({
      title: "Successful!",
      text: `Check your ${s} for password!`,
      icon: "success",
      showConfirmButton: !1,
      timer: 4e3
    }) : W(`Check your ${s} for password!`, l), f.data.data;
  } catch (g) {
    const f = await import("sweetalert2").catch(() => null), b = ((m = (i = g.response) == null ? void 0 : i.data) == null ? void 0 : m.message) || "Request failed";
    f != null && f.default ? f.default.fire({
      title: "Something Wrong!",
      text: b,
      icon: "warning",
      showConfirmButton: !1,
      timer: 2e3
    }) : q(b, l);
  }
}, ge = async (r, e, n = {}, s, o = z(), l = {}) => {
  var i, m;
  try {
    const g = await o.post(r, e, n);
    return g.data.isSuccess && (r.split("?")[0] === "auth/login" ? W("Login successfully!", l) : W(`The ${s} had been created successfully!`, l)), g.data;
  } catch (g) {
    const f = ((m = (i = g.response) == null ? void 0 : i.data) == null ? void 0 : m.message) || "Request failed";
    return q(f, l), _(f, []);
  }
}, qr = async (r, e, n = {}, s, o = z(), l = {}) => await ge(
  r,
  e,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...n
  },
  s,
  o,
  l
), Ee = async (r, e, n, s, o, l = z(), i = {}) => {
  var m, g;
  try {
    const f = await l.put(r + e, n, s);
    return f.data.isSuccess ? W("Saved Your Changes!", i) : q("Something Wrong!", i), f.data;
  } catch (f) {
    const b = ((g = (m = f.response) == null ? void 0 : m.data) == null ? void 0 : g.message) || "Update failed";
    return q(b, i), _(b, []);
  }
}, zr = async (r, e, n, s = {}, o, l = z(), i = {}) => await Ee(
  r,
  e,
  n,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...s
  },
  o,
  l,
  i
), ar = async (r, e, n = {}, s = z(), o = {}) => await oe(r + e, n, s, o), sr = async (r, e, n, s = z(), o = {}) => {
  var l, i;
  try {
    return (await s.delete(r + e)).data.isSuccess && W(`The ${n} had been deleted successfully!`, o), !0;
  } catch (m) {
    const g = ((i = (l = m.response) == null ? void 0 : l.data) == null ? void 0 : i.message) || "Delete failed";
    return q(g, o), !1;
  }
}, Kr = (r, e = {}) => {
  const n = [], s = [];
  if (r.forEach(
    ({
      condition: o,
      label: l,
      customMsg: i = "",
      isRequired: m = !1,
      isCustom: g = !1
    }) => {
      o && (m && n.push(l), g && s.push(i));
    }
  ), n.length > 0) {
    const o = `These field(s) are required to fill: ${n.join(", ")}`;
    return q(o, e), _(o);
  }
  if (s.length > 0) {
    const o = `Validation Error: ${s.join(`,
`)}`;
    return q(o, e), _(o);
  }
  return _e();
};
function Ce(r) {
  return typeof r == "string" ? r.trim() : r;
}
function Q(r) {
  if (!r || typeof r != "object")
    return Ce(r);
  if (Array.isArray(r))
    return r.map((n) => Q(n));
  const e = {};
  for (const [n, s] of Object.entries(r))
    e[n] = typeof s == "object" ? Q(s) : Ce(s);
  return e;
}
const Hr = (r = {}) => {
  r.title = r.title ? "CELC | " + r.title : "CELC", r.metaDescription = r.metaDescription || "School Management System Developed by Future Wave Team", document.title = r.title, document.querySelector('meta[name="description"]').setAttribute("content", r.metaDescription);
}, te = {
  total: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 10
}, or = [10, 25, 50, 100];
function Wr(r, e = 500) {
  const [n, s] = T(r);
  return J(() => {
    const o = setTimeout(() => {
      s(r);
    }, e);
    return () => {
      clearTimeout(o);
    };
  }, [r, e]), n;
}
function lr({
  columns: r = [],
  data: e = [],
  pagination: n = { total: 0, totalPages: 1 },
  filter: s = { page: 1, limit: 10 },
  isLoading: o = !1,
  isError: l = !1,
  errorMsg: i = "",
  onFilterChange: m,
  emptyMessage: g = "No data to display",
  ariaLabel: f = "Data Table"
}) {
  const b = (p) => {
    m({
      name: p.target.name,
      value: parseFloat(p.target.value)
    });
  }, N = (p) => {
    m({
      name: "page",
      value: parseFloat(p)
    });
  };
  return /* @__PURE__ */ c(X, { children: [
    /* @__PURE__ */ c("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ c("span", { className: "text-default-400 text-small", children: [
        "Total ",
        (n == null ? void 0 : n.total) || 0,
        " items"
      ] }),
      /* @__PURE__ */ c(
        "label",
        {
          htmlFor: "limit",
          className: "flex items-center text-default-400 text-small",
          children: [
            "Rows per page:",
            /* @__PURE__ */ t(
              "select",
              {
                id: "limit",
                name: "limit",
                className: "bg-transparent outline-none text-default-400 text-small",
                value: s.limit,
                onChange: b,
                children: or.map((p) => /* @__PURE__ */ t("option", { value: p, children: p }, p))
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c(
      Te,
      {
        isHeaderSticky: !0,
        "aria-label": f,
        bottomContent: /* @__PURE__ */ t("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ t(
          Ue,
          {
            isCompact: !0,
            showControls: !0,
            showShadow: !0,
            color: "primary",
            page: s.page,
            total: (n == null ? void 0 : n.totalPages) || 1,
            onChange: N
          }
        ) }),
        children: [
          /* @__PURE__ */ t(Pe, { children: r.map((p) => /* @__PURE__ */ t(ke, { children: p.label }, p.key)) }),
          o ? /* @__PURE__ */ t(we, { emptyContent: /* @__PURE__ */ t(Y, {}) }) : /* @__PURE__ */ t(we, { emptyContent: l ? i : g, children: e == null ? void 0 : e.map((p, y) => /* @__PURE__ */ t(Ie, { children: r.map((E) => /* @__PURE__ */ t($e, { children: E.render ? E.render(p, y) : p[E.key] }, E.key)) }, p._id || y)) })
        ]
      }
    )
  ] });
}
lr.propTypes = {
  columns: a.arrayOf(
    a.shape({
      key: a.string.isRequired,
      label: a.string.isRequired,
      render: a.func
    })
  ).isRequired,
  data: a.array,
  pagination: a.shape({
    total: a.number,
    totalPages: a.number
  }),
  filter: a.shape({
    page: a.number,
    limit: a.number
  }),
  isLoading: a.bool,
  isError: a.bool,
  errorMsg: a.string,
  onFilterChange: a.func.isRequired,
  emptyMessage: a.string,
  ariaLabel: a.string
};
const le = (r) => {
  const {
    isLoading: e = !1,
    isDisabled: n = !1,
    className: s = "",
    label: o = "",
    children: l,
    ...i
  } = r;
  return /* @__PURE__ */ c(H, { className: `w-full ${s}`, disabled: n, ...i, children: [
    e ? /* @__PURE__ */ t(Y, { color: "white" }) : o,
    l
  ] });
};
le.propTypes = {
  isLoading: a.bool,
  isDisabled: a.bool,
  className: a.string,
  label: a.string,
  children: a.any
};
const ir = ({
  header: r = "Header",
  title: e = "Title",
  cancelText: n = "No",
  confirmText: s = "Yes",
  size: o = "lg",
  isOpen: l = !1,
  isBtnDisabled: i = !1,
  classNames: m = {},
  children: g,
  onClose: f,
  onKeyDown: b
}) => /* @__PURE__ */ t(
  de,
  {
    backdrop: "blur",
    size: o,
    isOpen: l,
    onClose: f,
    closeButton: !0,
    classNames: m,
    children: /* @__PURE__ */ t(ue, { children: () => /* @__PURE__ */ c(X, { children: [
      /* @__PURE__ */ t(me, { className: "flex flex-col gap-1", children: r }),
      /* @__PURE__ */ c(pe, { children: [
        /* @__PURE__ */ t("p", { children: e }),
        g
      ] }),
      /* @__PURE__ */ c(he, { children: [
        /* @__PURE__ */ t(
          le,
          {
            color: "default",
            variant: "light",
            onPress: f,
            isDisabled: i,
            children: n
          }
        ),
        /* @__PURE__ */ t(
          le,
          {
            color: "danger",
            onKeyDown: b,
            onPress: b,
            isDisabled: i,
            children: s
          }
        )
      ] })
    ] }) })
  }
);
ir.propTypes = {
  header: a.string,
  title: a.string,
  cancelText: a.string,
  confirmText: a.string,
  size: a.string,
  isOpen: a.bool,
  isBtnDisabled: a.bool,
  classNames: a.any,
  children: a.any,
  onClose: a.func,
  onKeyDown: a.func
};
const cr = ({ className: r = "" }) => /* @__PURE__ */ t("div", { className: `flex justify-center items-center ${r}`, children: /* @__PURE__ */ t(Y, {}) });
cr.propTypes = {
  className: a.string
};
class dr extends Be {
  constructor(e) {
    super(e), this.state = { hasError: !1, error: null };
  }
  static getDerivedStateFromError(e) {
    return { hasError: !0, error: e };
  }
  componentDidCatch(e, n) {
    console.error("Error caught by boundary:", e, n);
  }
  render() {
    var e;
    return this.state.hasError ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center min-h-screen bg-gray-50", children: /* @__PURE__ */ c("div", { className: "text-center space-y-4 p-8 bg-white rounded-lg shadow-lg max-w-md", children: [
      /* @__PURE__ */ t("div", { className: "text-red-500 text-6xl", children: "⚠️" }),
      /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-gray-800", children: "Something went wrong" }),
      /* @__PURE__ */ t("p", { className: "text-gray-600", children: ((e = this.state.error) == null ? void 0 : e.message) || "An unexpected error occurred" }),
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
          children: "Reload Page"
        }
      )
    ] }) }) : this.props.children;
  }
}
dr.propTypes = {
  children: a.node.isRequired
};
const ur = "my-1 w-full p-3 flex items-center gap-2 border border-gray-200 text-base rounded-lg transition-all duration-300", mr = ({ path: r, title: e, icon: n }) => {
  const s = Ve(), o = O(() => {
    const l = s.pathname.split("?")[0].replace(/\/$/, ""), i = r.replace(/\/$/, "");
    return l === i || l.startsWith(i + "/") ? "bg-red-50 text-red-900 font-semibold border-red-900" : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-800 hover:border-red-200";
  }, [s.pathname, r]);
  return /* @__PURE__ */ c(qe, { to: r, className: `${ur} ${o}`, children: [
    n && /* @__PURE__ */ t("span", { className: "flex-shrink-0", children: n }),
    e && /* @__PURE__ */ t("span", { className: "truncate", children: e })
  ] });
};
mr.propTypes = {
  path: a.string.isRequired,
  title: a.string.isRequired,
  icon: a.node
};
function Gr() {
  return /* @__PURE__ */ t("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ c("div", { className: "text-center space-y-4", children: [
    /* @__PURE__ */ t(Y, { size: "lg", color: "primary" }),
    /* @__PURE__ */ t("p", { className: "text-gray-500 text-sm", children: "Loading..." })
  ] }) });
}
const ie = ({
  className: r = "w-6 h-6",
  filled: e = !1,
  ...n
}) => e ? /* @__PURE__ */ c(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    className: r,
    ...n,
    children: [
      /* @__PURE__ */ t(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.83366 18.3335C4.72859 18.3335 3.66878 17.8945 2.88738 17.1131C2.10598 16.3317 1.66699 15.2719 1.66699 14.1668V11.6668C1.66699 11.4458 1.75479 11.2339 1.91107 11.0776C2.06735 10.9213 2.27931 10.8335 2.50033 10.8335C2.72134 10.8335 2.9333 10.9213 3.08958 11.0776C3.24586 11.2339 3.33366 11.4458 3.33366 11.6668V14.1668C3.33366 14.8299 3.59705 15.4658 4.06589 15.9346C4.53473 16.4034 5.17062 16.6668 5.83366 16.6668H14.167C14.83 16.6668 15.4659 16.4034 15.9348 15.9346C16.4036 15.4658 16.667 14.8299 16.667 14.1668V11.6668C16.667 11.4458 16.7548 11.2339 16.9111 11.0776C17.0673 10.9213 17.2793 10.8335 17.5003 10.8335C17.7213 10.8335 17.9333 10.9213 18.0896 11.0776C18.2459 11.2339 18.3337 11.4458 18.3337 11.6668V14.1668C18.3337 15.2719 17.8947 16.3317 17.1133 17.1131C16.3319 17.8945 15.2721 18.3335 14.167 18.3335H5.83366Z",
          fill: "#2563EB"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M6.07082 8.41673C5.99421 8.33846 5.93378 8.24586 5.89298 8.14422C5.85218 8.04258 5.83182 7.9339 5.83306 7.82438C5.8343 7.71487 5.85711 7.60667 5.9002 7.50598C5.94328 7.40529 6.00579 7.31408 6.08416 7.23756L9.83416 3.57089C9.98985 3.41871 10.1989 3.3335 10.4167 3.3335C10.6344 3.3335 10.8435 3.41871 10.9992 3.57089L14.7492 7.23756C14.8291 7.31366 14.8931 7.40488 14.9375 7.50592C14.9819 7.60696 15.0057 7.71581 15.0077 7.82615C15.0097 7.9365 14.9897 8.04613 14.949 8.1487C14.9083 8.25126 14.8475 8.34472 14.7704 8.42363C14.6933 8.50254 14.6012 8.56535 14.4996 8.6084C14.398 8.65145 14.2888 8.67388 14.1784 8.6744C14.0681 8.67492 13.9587 8.65352 13.8567 8.61143C13.7547 8.56934 13.662 8.50741 13.5842 8.42923L11.25 6.14673V13.3334C11.25 13.5544 11.1622 13.7664 11.0059 13.9227C10.8496 14.0789 10.6377 14.1667 10.4167 14.1667C10.1956 14.1667 9.98368 14.0789 9.8274 13.9227C9.67112 13.7664 9.58332 13.5544 9.58332 13.3334V6.14673L7.24999 8.42923C7.17172 8.50584 7.07912 8.56627 6.97748 8.60707C6.87584 8.64787 6.76716 8.66823 6.65764 8.66699C6.54813 8.66575 6.43993 8.64294 6.33924 8.59985C6.23855 8.55677 6.14734 8.49426 6.07082 8.41589V8.41673Z",
          fill: "#2563EB"
        }
      )
    ]
  }
) : /* @__PURE__ */ c(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: r,
    ...n,
    children: [
      /* @__PURE__ */ t(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.83366 18.3335C4.72859 18.3335 3.66878 17.8945 2.88738 17.1131C2.10598 16.3317 1.66699 15.2719 1.66699 14.1668V11.6668C1.66699 11.4458 1.75479 11.2339 1.91107 11.0776C2.06735 10.9213 2.27931 10.8335 2.50033 10.8335C2.72134 10.8335 2.9333 10.9213 3.08958 11.0776C3.24586 11.2339 3.33366 11.4458 3.33366 11.6668V14.1668C3.33366 14.8299 3.59705 15.4658 4.06589 15.9346C4.53473 16.4034 5.17062 16.6668 5.83366 16.6668H14.167C14.83 16.6668 15.4659 16.4034 15.9348 15.9346C16.4036 15.4658 16.667 14.8299 16.667 14.1668V11.6668C16.667 11.4458 16.7548 11.2339 16.9111 11.0776C17.0673 10.9213 17.2793 10.8335 17.5003 10.8335C17.7213 10.8335 17.9333 10.9213 18.0896 11.0776C18.2459 11.2339 18.3337 11.4458 18.3337 11.6668V14.1668C18.3337 15.2719 17.8947 16.3317 17.1133 17.1131C16.3319 17.8945 15.2721 18.3335 14.167 18.3335H5.83366Z",
          fill: "#2563EB"
        }
      ),
      /* @__PURE__ */ t(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M6.07082 8.41673C5.99421 8.33846 5.93378 8.24586 5.89298 8.14422C5.85218 8.04258 5.83182 7.9339 5.83306 7.82438C5.8343 7.71487 5.85711 7.60667 5.9002 7.50598C5.94328 7.40529 6.00579 7.31408 6.08416 7.23756L9.83416 3.57089C9.98985 3.41871 10.1989 3.3335 10.4167 3.3335C10.6344 3.3335 10.8435 3.41871 10.9992 3.57089L14.7492 7.23756C14.8291 7.31366 14.8931 7.40488 14.9375 7.50592C14.9819 7.60696 15.0057 7.71581 15.0077 7.82615C15.0097 7.9365 14.9897 8.04613 14.949 8.1487C14.9083 8.25126 14.8475 8.34472 14.7704 8.42363C14.6933 8.50254 14.6012 8.56535 14.4996 8.6084C14.398 8.65145 14.2888 8.67388 14.1784 8.6744C14.0681 8.67492 13.9587 8.65352 13.8567 8.61143C13.7547 8.56934 13.662 8.50741 13.5842 8.42923L11.25 6.14673V13.3334C11.25 13.5544 11.1622 13.7664 11.0059 13.9227C10.8496 14.0789 10.6377 14.1667 10.4167 14.1667C10.1956 14.1667 9.98368 14.0789 9.8274 13.9227C9.67112 13.7664 9.58332 13.5544 9.58332 13.3334V6.14673L7.24999 8.42923C7.17172 8.50584 7.07912 8.56627 6.97748 8.60707C6.87584 8.64787 6.76716 8.66823 6.65764 8.66699C6.54813 8.66575 6.43993 8.64294 6.33924 8.59985C6.23855 8.55677 6.14734 8.49426 6.07082 8.41589V8.41673Z",
          fill: "#2563EB"
        }
      )
    ]
  }
), Zr = () => /* @__PURE__ */ c(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t("g", { clipPath: "url(#clip0_131_4167)", children: /* @__PURE__ */ t(
        "path",
        {
          d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z",
          fill: "white"
        }
      ) }),
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("clipPath", { id: "clip0_131_4167", children: /* @__PURE__ */ t("rect", { width: "24", height: "24", fill: "white" }) }) })
    ]
  }
), Fe = ({
  className: r = "w-6 h-6",
  filled: e = !1,
  ...n
}) => e ? /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: r,
    ...n,
    children: /* @__PURE__ */ t(
      "path",
      {
        fillRule: "evenodd",
        d: "M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z",
        clipRule: "evenodd"
      }
    )
  }
) : /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: r,
    ...n,
    children: /* @__PURE__ */ t(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      }
    )
  }
), Re = ({ className: r = "w-6 h-6" }) => /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: r,
    children: /* @__PURE__ */ t(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      }
    )
  }
);
ie.propTypes = Fe.propTypes = Re.propTypes = {
  className: a.string,
  filled: a.bool
};
function pr(r, e) {
  const n = URL.createObjectURL(r), s = document.createElement("a");
  s.href = n, s.download = e, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(n);
}
function hr(r) {
  if (!r) return null;
  const e = r.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  return e && e[1] ? e[1].replace(/['"]/g, "") : null;
}
function _r({ url: r, className: e = "", file: n }) {
  const [s, o] = T(0), [l, i] = T(!1);
  async function m() {
    var f;
    i(!0), o(0);
    try {
      const b = await ce.get(r, {
        responseType: "blob",
        onDownloadProgress: (y) => {
          if (y.lengthComputable || y.total) {
            const E = y.total || 0, k = E ? Math.round(y.loaded * 100 / E) : 0;
            o(k);
          } else
            o((E) => Math.min(E + 5, 99));
        }
      }), N = b.headers["content-disposition"] || b.headers["Content-Disposition"], p = hr(N) || new URL(r).pathname.split("/").pop() || "download";
      pr(b.data, p), o(100);
    } catch (b) {
      console.error("Download error", b);
      const N = (f = b == null ? void 0 : b.response) != null && f.data ? "Server responded with an error" : b.message || "Unknown error";
      alert(`Download failed: ${N}`);
    } finally {
      setTimeout(
        () => {
          i(!1), setTimeout(() => o(0), 300);
        },
        s >= 100 ? 600 : 200
      );
    }
  }
  const g = O(() => {
    var f;
    return n ? n instanceof File ? n.name || "" : ((f = Object.keys(n)) == null ? void 0 : f.length) > 0 ? n.originalname : "File name" : "File name";
  }, [n]);
  return /* @__PURE__ */ c("div", { className: `w-full max-w-sm ${e}`, children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        className: `w-full border-2 border-dotted border-[#2563EB] input-field-wrapper justify-between ${l ? "bg-slate-300 text-slate-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"} duration-300 transition`,
        onClick: m,
        disabled: l,
        "aria-live": "polite",
        "aria-busy": l,
        "aria-disabled": l,
        children: [
          /* @__PURE__ */ t("span", { className: "w-full cursor-pointer text-[#898989] flex justify-start items-center gap-3 bg-current truncate", children: l ? /* @__PURE__ */ c("span", { children: [
            "Downloading… ",
            s,
            "%"
          ] }) : g }),
          /* @__PURE__ */ t("span", { type: "button", children: /* @__PURE__ */ t(Re, {}) })
        ]
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: "mt-3 h-3 bg-slate-100 rounded-md overflow-hidden",
        "aria-hidden": !l,
        children: /* @__PURE__ */ t(
          "div",
          {
            className: "h-full rounded-md shadow-inner transform transition-all duration-200 ease-out",
            style: { width: `${l ? s : 0}%` }
          }
        )
      }
    )
  ] });
}
const fr = ({ text: r = "" }) => /* @__PURE__ */ t("p", { className: "cursor-help", title: r, children: Ze({ text: r }) });
fr.propTypes = {
  text: a.string
};
const gr = ({
  condition: r = !0,
  text: e = "Text",
  className: n = ""
}) => /* @__PURE__ */ t(
  "span",
  {
    className: `${r ? "w-[100px] opacity-100" : "w-0 opacity-0"} text-wrap duration-700 transition-all overflow-hidden ${n}`,
    children: e
  }
);
gr.propTypes = {
  condition: a.bool,
  text: a.string,
  className: a.string
};
const br = ({ children: r }) => /* @__PURE__ */ c("div", { className: "w-[96%] mx-auto  p-4  rounded-lg", children: [
  /* @__PURE__ */ t(ze, {}),
  r
] });
br.propTypes = {
  children: a.node.isRequired
};
const Qr = ({
  itemsToExport: r,
  onClose: e,
  onExportSuccess: n
}) => {
  const [s, o] = T(!1), l = () => {
    o(!0);
    try {
      const i = [
        "Code",
        "Name",
        "Qty",
        "From Unit",
        "To Unit",
        "Total Unit",
        "Selling (MMK)",
        "Purchase (MMK)",
        "Unit",
        "Type",
        "Opening Qty",
        "Purchase Qty",
        "Used Qty",
        "Closing Qty",
        "Branch"
      ], m = r.map((y) => [
        y.code,
        y.name,
        y.qty,
        y.fromUnit,
        y.toUnit,
        y.totalUnit,
        y.sellingMMK,
        y.purchaseMMK,
        y.unit,
        y.type,
        y.openingQty,
        y.purchaseQty,
        y.usedQty,
        y.closingQty,
        y.branch
      ]), g = [i, ...m], f = Z.utils.aoa_to_sheet(g), b = Z.utils.book_new();
      Z.utils.book_append_sheet(b, f, "Selected Inventory");
      const N = Z.write(b, { bookType: "xlsx", type: "array" }), p = new Blob([N], {
        type: "application/octet-stream"
      });
      Ke(p, "selected_inventory.xlsx"), n(r);
    } catch (i) {
      console.error("Error exporting Excel file:", i), alert("Failed to export Excel file. Please try again.");
    } finally {
      o(!1), e();
    }
  };
  return /* @__PURE__ */ t(de, { isOpen: !0, onClose: e, children: /* @__PURE__ */ t(ue, { children: (i) => /* @__PURE__ */ c(X, { children: [
    /* @__PURE__ */ t(me, { className: "flex flex-col gap-1", children: "Export Selected Items" }),
    /* @__PURE__ */ c(pe, { children: [
      /* @__PURE__ */ c("p", { children: [
        "You are about to export ",
        /* @__PURE__ */ t("strong", { children: r.length }),
        " ",
        "selected items to an Excel file."
      ] }),
      /* @__PURE__ */ t("p", { children: "Do you want to proceed?" })
    ] }),
    /* @__PURE__ */ c(he, { children: [
      /* @__PURE__ */ t(
        H,
        {
          color: "danger",
          variant: "light",
          onPress: i,
          isDisabled: s,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ t(
        H,
        {
          color: "primary",
          onPress: l,
          isLoading: s,
          isDisabled: r.length === 0,
          children: s ? "Exporting..." : "Export"
        }
      )
    ] })
  ] }) }) });
}, Jr = ({ onClose: r, onImportSuccess: e }) => {
  const [n, s] = T(null), [o, l] = T(""), [i, m] = T(""), [g, f] = T(!1), b = (p) => {
    const y = p.target.files[0];
    s(y);
  }, N = () => {
  };
  return /* @__PURE__ */ t(de, { isOpen: !0, onClose: r, children: /* @__PURE__ */ t(ue, { children: (p) => /* @__PURE__ */ c(X, { children: [
    /* @__PURE__ */ t(me, { className: "flex flex-col gap-1", children: "Import from Excel" }),
    /* @__PURE__ */ c(pe, { children: [
      /* @__PURE__ */ c(
        Le,
        {
          variant: "bordered",
          label: "Select",
          placeholder: "Select Type",
          className: "mb-4",
          children: [
            /* @__PURE__ */ t(ne, { value: "product", children: "Product" }, "product"),
            /* @__PURE__ */ t(ne, { value: "item", children: "Items" }, "item")
          ]
        }
      ),
      /* @__PURE__ */ t(
        Ae,
        {
          type: "file",
          variant: "bordered",
          label: "Select Excel File",
          onChange: b,
          accept: ".xlsx, .xls"
        }
      ),
      o && /* @__PURE__ */ c("p", { className: "text-gray-600 text-sm mt-2", children: [
        "Selected: ",
        o
      ] })
    ] }),
    /* @__PURE__ */ c(he, { children: [
      /* @__PURE__ */ t(
        H,
        {
          color: "danger",
          variant: "light",
          onPress: p,
          isDisabled: g,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ t(
        H,
        {
          color: "primary",
          onPress: N,
          isLoading: g,
          isDisabled: !n,
          children: "Import"
        }
      )
    ] })
  ] }) }) });
}, yr = ({ children: r, className: e = "" }) => /* @__PURE__ */ t("div", { className: `w-full ${e}`, children: r });
yr.propTypes = {
  children: a.any,
  className: a.string
};
const wr = ({ children: r, className: e = "" }) => /* @__PURE__ */ t("div", { className: `grid grid-cols-1 md:grid-cols-2 gap-4 ${e}`, children: r });
wr.propTypes = {
  children: a.any,
  className: a.string
};
const xr = ({
  label: r = "File Upload",
  value: e,
  id: n,
  onChange: s,
  accept: o = "image/*",
  isDisabled: l = !1,
  showPreview: i = !0,
  maxSizeMB: m = 5,
  ...g
}) => {
  const [f, b] = T(null), [N, p] = T(""), [y, E] = T(!1), k = Ne(0);
  J(() => {
    if (!e) {
      b(null);
      return;
    }
    if (e instanceof File) {
      const v = URL.createObjectURL(e);
      return b(v), () => URL.revokeObjectURL(v);
    }
    e != null && e.url && b(e.url);
  }, [e]);
  const h = O(() => e ? e instanceof File ? e.name : e != null && e.originalname ? e.originalname : "File uploaded" : null, [e]), F = O(() => e ? e instanceof File ? e.type.startsWith("image/") : e != null && e.originalname ? /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(e.originalname) : !1 : !1, [e]), U = D(
    (v) => {
      if (v.size / 1048576 > m)
        return p(`File size must be less than ${m}MB`), !1;
      if (o && o !== "*") {
        const P = o.split(",").map((R) => R.trim()), u = v.type, B = "." + v.name.split(".").pop();
        if (!P.some((R) => R.endsWith("/*") ? u.startsWith(R.replace("/*", "")) : R === u || R === B))
          return p(`File type not accepted. Accepted: ${o}`), !1;
      }
      return p(""), !0;
    },
    [o, m]
  ), A = D(
    (v) => {
      var P;
      const S = (P = v.target.files) == null ? void 0 : P[0];
      S && U(S) && s({ name: v.target.name, value: S });
    },
    [s, U]
  ), w = D(
    (v) => {
      v.stopPropagation(), b(null), p(""), s({ name: n, value: null });
      const S = document.getElementById(n);
      S && (S.value = "");
    },
    [s, n]
  ), x = D((v) => {
    v.preventDefault(), v.stopPropagation(), k.current++, v.dataTransfer.items && v.dataTransfer.items.length > 0 && E(!0);
  }, []), L = D((v) => {
    v.preventDefault(), v.stopPropagation(), k.current--, k.current === 0 && E(!1);
  }, []), I = D((v) => {
    v.preventDefault(), v.stopPropagation();
  }, []), j = D(
    (v) => {
      if (v.preventDefault(), v.stopPropagation(), E(!1), k.current = 0, l) return;
      const S = v.dataTransfer.files;
      if (S && S.length > 0) {
        const P = S[0];
        U(P) && s({ name: n, value: P });
      }
    },
    [l, s, n, U]
  );
  return /* @__PURE__ */ c("div", { className: "space-y-3", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onDragEnter: x,
        onDragOver: I,
        onDragLeave: L,
        onDrop: j,
        className: `
          relative border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${l ? "opacity-50 cursor-not-allowed bg-default-50" : "cursor-pointer hover:border-primary-400"}
          ${y && !l ? "border-primary-500 bg-primary-50 scale-[1.02] shadow-lg" : N ? "border-danger bg-danger-50/30" : e ? "border-success-300 bg-success-50/30" : "border-default-300 bg-white"}
        `,
        children: /* @__PURE__ */ c(
          "label",
          {
            htmlFor: n,
            className: `
            relative block w-full p-6
            ${l ? "cursor-not-allowed" : "cursor-pointer"}
          `,
            children: [
              y && !l && /* @__PURE__ */ c("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-xl z-10 pointer-events-none", children: [
                /* @__PURE__ */ t(ie, { className: "w-12 h-12 text-primary-500 animate-bounce" }),
                /* @__PURE__ */ t("p", { className: "text-primary-600 font-semibold mt-3", children: "Drop your file here" })
              ] }),
              e ? /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ c("div", { className: "flex items-center gap-3 flex-1 min-w-0 overflow-hidden", children: [
                  /* @__PURE__ */ t("div", { className: "p-2 rounded-lg bg-success-100 flex-shrink-0", children: /* @__PURE__ */ t(Fe, { className: "w-6 h-6 text-success-600" }) }),
                  /* @__PURE__ */ c("div", { className: "flex-1 min-w-0 overflow-hidden", children: [
                    /* @__PURE__ */ t("p", { className: "text-sm font-medium text-default-700 truncate", children: h }),
                    /* @__PURE__ */ t("p", { className: "text-xs text-default-500", children: "Ready to upload" })
                  ] })
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: w,
                    disabled: l,
                    className: `
                  p-2 rounded-lg hover:bg-danger-50 
                  text-danger-500 transition-all
                  hover:scale-110 transform
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex-shrink-0
                `,
                    "aria-label": "Remove file",
                    children: /* @__PURE__ */ t(ae, { className: "w-5 h-5" })
                  }
                )
              ] }) : /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center gap-3 py-4", children: [
                /* @__PURE__ */ t("div", { className: "p-4 rounded-full bg-default-100", children: /* @__PURE__ */ t(ie, { className: "w-8 h-8 text-default-500" }) }),
                /* @__PURE__ */ c("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ t("p", { className: "text-base font-semibold text-default-700", children: r }),
                  /* @__PURE__ */ c("p", { className: "text-sm text-default-500", children: [
                    "Drag and drop or",
                    " ",
                    /* @__PURE__ */ t("span", { className: "text-primary-500 font-medium", children: "browse" })
                  ] }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-default-400", children: o === "image/*" ? `PNG, JPG, GIF, WEBP up to ${m}MB` : `Max file size: ${m}MB` })
                ] })
              ] }),
              /* @__PURE__ */ t(
                "input",
                {
                  id: n,
                  name: n,
                  type: "file",
                  onChange: A,
                  className: "hidden",
                  accept: o,
                  disabled: l,
                  "aria-describedby": N ? `${n}-error` : void 0,
                  ...g
                }
              )
            ]
          }
        )
      }
    ),
    N && /* @__PURE__ */ c("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-danger-50 border border-danger-200", children: [
      /* @__PURE__ */ t(
        "svg",
        {
          className: "w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          children: /* @__PURE__ */ t(
            "path",
            {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
              clipRule: "evenodd"
            }
          )
        }
      ),
      /* @__PURE__ */ t("p", { id: `${n}-error`, className: "text-sm text-danger-700 font-medium", children: N })
    ] }),
    i && f && F && /* @__PURE__ */ c("div", { className: "relative rounded-xl overflow-hidden border-2 border-default-200 group", children: [
      /* @__PURE__ */ t(
        "img",
        {
          src: f,
          alt: "Preview",
          className: "w-full h-64 object-cover",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ c("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300", children: [
        /* @__PURE__ */ t("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: /* @__PURE__ */ t("p", { className: "text-white text-sm font-medium truncate", children: h }) }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: w,
            disabled: l,
            className: `
                absolute top-3 right-3 p-2 rounded-full 
                bg-danger-500 text-white shadow-xl
                hover:bg-danger-600 hover:scale-110
                transform transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `,
            "aria-label": "Remove image",
            children: /* @__PURE__ */ t(ae, { className: "w-5 h-5" })
          }
        )
      ] })
    ] })
  ] });
};
xr.propTypes = {
  label: a.string,
  value: a.oneOfType([a.instanceOf(File), a.object]),
  id: a.string.isRequired,
  onChange: a.func.isRequired,
  accept: a.string,
  isDisabled: a.bool,
  showPreview: a.bool,
  maxSizeMB: a.number
};
const vr = ({
  label: r = "Upload Images",
  value: e = [],
  id: n,
  onChange: s,
  accept: o = "image/*",
  isDisabled: l = !1,
  maxFiles: i = 10,
  maxSizeMB: m = 5,
  ...g
}) => {
  const [f, b] = T([]), [N, p] = T(""), [y, E] = T(!1), k = Ne(0);
  J(() => {
    if (!e || e.length === 0) {
      b([]);
      return;
    }
    const u = [], B = [];
    return e.forEach((C, R) => {
      if (C instanceof File) {
        const $ = URL.createObjectURL(C);
        u.push({
          id: `${C.name}-${R}`,
          url: $,
          name: C.name,
          size: C.size,
          type: C.type
        }), B.push(() => URL.revokeObjectURL($));
      } else C != null && C.url && u.push({
        id: C._id || `existing-${R}`,
        url: C.url,
        name: C.originalname || C.name,
        size: C.size,
        type: C.mimetype || C.type
      });
    }), b(u), () => {
      B.forEach((C) => C());
    };
  }, [e]);
  const h = D(
    (u) => {
      if (u.size / 1048576 > m)
        return p(`File "${u.name}" is too large. Max size: ${m}MB`), !1;
      if (o && o !== "*") {
        const C = o.split(",").map((V) => V.trim()), R = u.type, $ = "." + u.name.split(".").pop();
        if (!C.some((V) => V.endsWith("/*") ? R.startsWith(V.replace("/*", "")) : V === R || V === $))
          return p(`File "${u.name}" type not accepted`), !1;
      }
      return !0;
    },
    [o, m]
  ), F = D(
    (u) => {
      const B = Array.isArray(e) ? e : [], C = Array.from(u);
      if (B.length + C.length > i) {
        p(`Maximum ${i} files allowed`);
        return;
      }
      const R = C.filter(($) => h($));
      if (R.length > 0) {
        p("");
        const $ = [...B, ...R];
        s({ name: n, value: $ });
      }
    },
    [e, n, s, i, h]
  ), U = D(
    (u) => {
      u.target.files && u.target.files.length > 0 && F(u.target.files);
    },
    [F]
  ), A = D(
    (u, B) => {
      B.stopPropagation();
      const R = (Array.isArray(e) ? e : []).filter(
        ($, G) => G !== u
      );
      if (s({ name: n, value: R }), p(""), R.length === 0) {
        const $ = document.getElementById(n);
        $ && ($.value = "");
      }
    },
    [e, s, n]
  ), w = D(
    (u) => {
      u.stopPropagation(), s({ name: n, value: [] }), p("");
      const B = document.getElementById(n);
      B && (B.value = "");
    },
    [s, n]
  ), x = D((u) => {
    u.preventDefault(), u.stopPropagation(), k.current++, u.dataTransfer.items && u.dataTransfer.items.length > 0 && E(!0);
  }, []), L = D((u) => {
    u.preventDefault(), u.stopPropagation(), k.current--, k.current === 0 && E(!1);
  }, []), I = D((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), j = D(
    (u) => {
      u.preventDefault(), u.stopPropagation(), E(!1), k.current = 0, !l && u.dataTransfer.files && u.dataTransfer.files.length > 0 && F(u.dataTransfer.files);
    },
    [l, F]
  ), v = (u) => {
    if (u === 0) return "0 Bytes";
    const B = 1024, C = ["Bytes", "KB", "MB", "GB"], R = Math.floor(Math.log(u) / Math.log(B));
    return Math.round(u / Math.pow(B, R) * 100) / 100 + " " + C[R];
  }, S = Array.isArray(e) ? e.length : 0, P = i - S;
  return /* @__PURE__ */ c("div", { className: "space-y-3", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onDragEnter: x,
        onDragOver: I,
        onDragLeave: L,
        onDrop: j,
        className: `
          relative border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${l || P === 0 ? "opacity-50 cursor-not-allowed bg-default-50" : "cursor-pointer hover:border-primary-400"}
          ${y && !l && P > 0 ? "border-primary-500 bg-primary-50 scale-[1.02] shadow-lg" : N ? "border-danger bg-danger-50/30" : S > 0 ? "border-success-300 bg-success-50/30" : "border-default-300 bg-white"}
        `,
        children: /* @__PURE__ */ c(
          "label",
          {
            htmlFor: n,
            className: `
            relative block w-full p-6
            ${l || P === 0 ? "cursor-not-allowed" : "cursor-pointer"}
          `,
            children: [
              y && !l && P > 0 && /* @__PURE__ */ c("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-primary-500/10 rounded-xl z-10 pointer-events-none", children: [
                /* @__PURE__ */ t(xe, { className: "w-12 h-12 text-primary-500 animate-bounce" }),
                /* @__PURE__ */ t("p", { className: "text-primary-600 font-semibold mt-3", children: "Drop your files here" })
              ] }),
              /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center gap-3 py-4", children: [
                /* @__PURE__ */ t("div", { className: "p-4 rounded-full bg-default-100", children: /* @__PURE__ */ t(xe, { className: "w-8 h-8 text-default-500" }) }),
                /* @__PURE__ */ c("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ t("p", { className: "text-base font-semibold text-default-700", children: r }),
                  /* @__PURE__ */ c("p", { className: "text-sm text-default-500", children: [
                    "Drag and drop or",
                    " ",
                    /* @__PURE__ */ t("span", { className: "text-primary-500 font-medium", children: "browse" })
                  ] }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-default-400", children: o === "image/*" ? `PNG, JPG, GIF, WEBP up to ${m}MB each` : `Max ${m}MB per file` }),
                  /* @__PURE__ */ c("p", { className: "text-xs font-medium text-default-600 mt-2", children: [
                    S,
                    " / ",
                    i,
                    " files selected"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ t(
                "input",
                {
                  id: n,
                  name: n,
                  type: "file",
                  onChange: U,
                  className: "hidden",
                  accept: o,
                  disabled: l || P === 0,
                  multiple: !0,
                  "aria-describedby": N ? `${n}-error` : void 0,
                  ...g
                }
              )
            ]
          }
        )
      }
    ),
    N && /* @__PURE__ */ c("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-danger-50 border border-danger-200", children: [
      /* @__PURE__ */ t(
        "svg",
        {
          className: "w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          children: /* @__PURE__ */ t(
            "path",
            {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
              clipRule: "evenodd"
            }
          )
        }
      ),
      /* @__PURE__ */ t("p", { id: `${n}-error`, className: "text-sm text-danger-700 font-medium", children: N })
    ] }),
    f.length > 0 && /* @__PURE__ */ c("div", { className: "space-y-3", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ c("h4", { className: "text-sm font-semibold text-default-700", children: [
          "Selected Files (",
          f.length,
          ")"
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: w,
            disabled: l,
            className: "text-xs text-danger-500 hover:text-danger-600 font-medium transition-colors disabled:opacity-50",
            children: "Clear All"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: f.map((u, B) => /* @__PURE__ */ t(
        "div",
        {
          className: "relative group rounded-xl overflow-hidden border-2 border-default-200 bg-white hover:border-primary-300 transition-all",
          children: /* @__PURE__ */ c("div", { className: "aspect-square relative", children: [
            /* @__PURE__ */ t(
              "img",
              {
                src: u.url,
                alt: u.name,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ c("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
              /* @__PURE__ */ c("div", { className: "absolute bottom-0 left-0 right-0 p-2", children: [
                /* @__PURE__ */ t("p", { className: "text-white text-xs font-medium truncate", children: u.name }),
                /* @__PURE__ */ t("p", { className: "text-white/80 text-xs", children: v(u.size) })
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: (C) => A(B, C),
                  disabled: l,
                  className: `
                        absolute top-2 right-2 p-1.5 rounded-full 
                        bg-danger-500 text-white shadow-xl
                        hover:bg-danger-600 hover:scale-110
                        transform transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `,
                  "aria-label": `Remove ${u.name}`,
                  children: /* @__PURE__ */ t(ae, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        },
        u.id
      )) })
    ] })
  ] });
};
vr.propTypes = {
  label: a.string,
  value: a.array,
  id: a.string.isRequired,
  onChange: a.func.isRequired,
  accept: a.string,
  isDisabled: a.bool,
  maxFiles: a.number,
  maxSizeMB: a.number
};
const Cr = (r, e) => {
  const [n, s] = T(r);
  return J(() => {
    const o = setTimeout(() => {
      s(r);
    }, e);
    return () => {
      clearTimeout(o);
    };
  }, [r, e]), [n];
}, Nr = (r) => {
  const {
    className: e = {},
    value: n = "",
    options: s = [],
    optionValue: o = "value",
    optionLabel: l = "label",
    onChange: i,
    isCustomOptionLabel: m = !1,
    customLabelFunc: g = () => {
    },
    type: f = "select",
    isSearchable: b = !1,
    isAddable: N = !1,
    addURL: p = "",
    needSort: y = !0,
    selectionMode: E = "single",
    onRemove: k = () => {
    },
    ...h
  } = r, [F, U] = T(""), [A] = Cr(F, 300), [w, x] = T(""), L = D(
    (d) => typeof d == "string" ? d : m ? g(d) : d[l] || "",
    [l, m, g]
  ), I = D(
    (d) => typeof d == "string" ? d : d[o] || d._id || d.id || d.value,
    [o]
  ), j = O(() => !s || s.length === 0 ? [] : y ? [...s].sort((d, M) => {
    const K = L(d), Se = L(M);
    return K.localeCompare(Se, void 0, { sensitivity: "base" });
  }) : [...s], [s, y, L]), v = O(() => {
    if (!A.trim()) return null;
    try {
      return new RegExp(A.trim().split("").join(".*"), "i");
    } catch {
      return new RegExp(
        A.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }
  }, [A]), S = O(() => !b || !v ? j : j.filter((d) => {
    const M = L(d);
    return v.test(M);
  }), [j, v, b, L]), P = O(() => f === "autocomplete" && N && S.length === 0 && F.trim() && p, [f, N, S.length, F, p]), u = O(() => {
    const d = S.map((M) => ({
      key: I(M),
      label: L(M),
      option: M,
      isCreateOption: !1
    }));
    return P && d.push({
      key: "create-new",
      label: `Create New: ${F.trim()}`,
      option: F.trim(),
      isCreateOption: !0
    }), d;
  }, [
    S,
    P,
    F,
    I,
    L
  ]), B = D(
    (d) => {
      i({ name: d.target.name, value: d.target.value });
    },
    [i]
  ), C = D(async () => {
    if (!p || !F.trim()) return !1;
    try {
      return await ge(
        p,
        {
          name: F.trim()
        },
        {},
        "value"
      );
    } catch (d) {
      return console.error("Error creating at ", p, d), { isSuccess: !1 };
    }
  }, [p, F]), R = D(
    async (d, M) => {
      if (M === "create-new") {
        const K = await C();
        K.isSuccess && (d.value = K.data._id, d.needRefresh = !0);
      }
      U(""), i(d);
    },
    [C, i]
  ), $ = D(
    (d) => {
      if (f === "autocomplete")
        if (E === "multiple")
          if (d == "create-new") {
            const M = {
              name: h.name,
              value: F
            };
            R(M, d);
          } else
            x(d);
        else {
          const M = {
            name: h.name,
            value: d
          };
          R(M, d);
        }
    },
    [h.name, E, f, F, R]
  ), G = D((d) => {
    U(d);
  }, []), V = O(() => Array.isArray(n) ? n : [n], [n, E]), be = O(
    () => ({
      trigger: "bg-white border-gray-300 hover:border-gray-400",
      popoverContent: "bg-white border border-gray-200 shadow-lg",
      listbox: "bg-white",
      base: "bg-white",
      ...typeof e == "object" ? e : {}
    }),
    [e]
  ), ye = O(() => {
    const { name: d, ...M } = h;
    return {
      variant: "bordered",
      selectedKeys: V,
      name: d,
      selectionMode: E,
      ...M
    };
  }, [V, E, h]), De = () => {
    const d = {
      name: h.name,
      value: w
    };
    R(d, w);
  }, Me = (d) => {
    const M = j.findIndex(
      (K) => I(K) == d
    );
    return M != -1 ? L(j[M]) : "Not Set";
  };
  return f === "autocomplete" ? /* @__PURE__ */ c("div", { className: `${N && p ? "flex flex-col gap-3" : ""}`, children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: `${N && p ? "flex gap-3 items-end justify-between" : ""}`,
        children: [
          /* @__PURE__ */ t(
            je,
            {
              label: "Search options",
              placeholder: "Search or Choose options",
              allowsCustomValue: !0,
              classNames: be,
              onInputChange: G,
              onSelectionChange: $,
              items: u,
              ...ye,
              children: (d) => /* @__PURE__ */ t(
                Oe,
                {
                  className: "hover:bg-gray-50",
                  textValue: d.label,
                  children: d.isCreateOption ? /* @__PURE__ */ c("span", { children: [
                    "Create New: ",
                    /* @__PURE__ */ t("strong", { children: d.option })
                  ] }) : d.label || "Not Set"
                },
                d.key
              )
            }
          ),
          N && p && /* @__PURE__ */ c(
            H,
            {
              className: "flex gap-2 items-center justify-between py-6 font-semibold",
              disabled: !w,
              onPress: () => w && De(),
              children: [
                /* @__PURE__ */ t(We, {}),
                " Add"
              ]
            }
          )
        ]
      }
    ),
    E == "multiple" && V.length > 0 && /* @__PURE__ */ t("div", { className: "flex gap-3 items-center flex-wrap", children: V.map((d, M) => /* @__PURE__ */ c(
      "div",
      {
        className: "flex items-center gap-3 p-2 text-sm rounded-lg border-2",
        children: [
          /* @__PURE__ */ t("p", { children: Me(d) }),
          /* @__PURE__ */ t(
            "span",
            {
              className: "hover:cursor-pointer",
              onClick: () => k(M),
              children: /* @__PURE__ */ t(He, {})
            }
          )
        ]
      },
      M + "-" + d
    )) })
  ] }) : /* @__PURE__ */ t(
    Le,
    {
      classNames: be,
      onChange: B,
      items: u,
      ...ye,
      children: (d) => /* @__PURE__ */ t(
        ne,
        {
          className: "hover:bg-gray-50",
          textValue: d.label,
          children: d.label || "Not Set"
        },
        d.key
      )
    }
  );
};
Nr.propTypes = {
  className: a.oneOfType([a.string, a.object]),
  value: a.any,
  options: a.array,
  optionValue: a.string,
  optionLabel: a.string,
  onChange: a.func.isRequired,
  isCustomOptionLabel: a.bool,
  customLabelFunc: a.func,
  type: a.oneOf(["select", "autocomplete"]),
  isSearchable: a.bool,
  isAddable: a.bool,
  addURL: a.string,
  needSort: a.bool,
  selectionMode: a.oneOf(["single", "multiple"]),
  onRemove: a.func
};
function Xr({
  entityName: r,
  baseUrl: e,
  listUrl: n,
  defaultForm: s = {},
  defaultFilter: o = { keyword: "", limit: 10, page: 1 },
  validateForm: l,
  preparePayload: i = (N) => N,
  transformFetchedData: m = (N) => N,
  customMethods: g = {},
  overrides: f = {},
  apiMethods: b = {}
}) {
  const {
    Get: N = oe,
    GetDetail: p = ar,
    Post: y = ge,
    Update: E = Ee,
    Delete: k = sr
  } = b;
  return Ge((h, F) => {
    const U = {
      // Filter management
      setFilter: (w, x) => h(() => ({
        filter: {
          ...F().filter,
          [w]: x
        }
      })),
      clearFilter: () => h(() => ({
        filter: { ...o }
      })),
      // Form management
      setForm: ({ name: w, value: x }) => h(() => ({
        form: {
          ...F().form,
          [w]: x
        }
      })),
      setEditData: (w) => h(() => ({
        editData: w,
        form: w
      })),
      clearFormData: () => h(() => ({
        editData: {},
        formErrors: {},
        form: { ...s },
        isFormError: !1,
        isFormLoading: !1
      })),
      // Data operations
      fetchData: async (w = {}) => {
        F().clearData(), h({ isLoading: !0 });
        try {
          const x = await N(n, w);
          if (x.isSuccess) {
            const { data: L, pagination: I } = x;
            h({
              data: L,
              pagination: I || { ...te }
            });
          }
        } catch (x) {
          h({ errorMsg: x.message, isError: !0 });
        } finally {
          h({ isLoading: !1 });
        }
      },
      createRecord: async (w) => {
        if (l) {
          const x = l(w);
          if (x)
            return h({ formErrors: x, isFormError: !0 }), !1;
        }
        h({ isFormLoading: !0 });
        try {
          const x = Q(w), L = i(x), I = await y(e, L, {}, r);
          return I.isSuccess ? (h({
            data: [...F().data, I.data],
            isFormError: !1,
            isFormLoading: !1
          }), !0) : (h({
            formErrors: I.errors,
            isFormError: !0,
            isFormLoading: !1
          }), !1);
        } catch (x) {
          return h({ formErrors: x, isFormError: !0, isFormLoading: !1 }), !1;
        }
      },
      fetchRecord: async (w) => {
        F().clearData(), h({ isLoading: !0 });
        try {
          const x = await p(e, w);
          if (x.isSuccess) {
            const L = m(x.data);
            h({
              editData: { ...L },
              form: { ...L }
            });
          } else
            h({ isError: !0, errorMsg: x.message });
        } catch (x) {
          return h({ isError: !0, errorMsg: x.message }), !1;
        } finally {
          h({ isLoading: !1 });
        }
      },
      updateRecord: async (w, x) => {
        if (l) {
          const L = l(x);
          if (L)
            return h({ formErrors: L, isFormError: !0 }), !1;
        }
        h({ isFormLoading: !0 });
        try {
          const L = Q(x), I = i(L), j = await E(e, w, I, {}, r);
          return j.isSuccess ? (h({ isFormError: !1, isFormLoading: !1 }), !0) : (h({
            formErrors: j.errors,
            isFormError: !0,
            isFormLoading: !1
          }), !1);
        } catch (L) {
          return h({ formErrors: L, isFormError: !0, isFormLoading: !1 }), !1;
        }
      },
      deleteRecord: async (w) => {
        h({ isDeleting: !0 });
        try {
          return (await k(e, w, r)).isSuccess ? (h({ isDeleting: !1 }), !0) : !1;
        } catch {
          return h({ isDeleting: !1 }), !1;
        }
      },
      fetchDataOptions: async (w = {}) => {
        h({ isFilterLoading: !0, dataFilters: [], isFilterError: !0 });
        try {
          const x = await oe(n + "/filter-options", w);
          if (x.isSuccess) {
            const { data: L } = x;
            h({ dataFilters: L, isFilterError: !1 });
          }
        } catch (x) {
          h({ filterErrorMsg: x.message, isFilterError: !0 });
        } finally {
          h({ isFilterLoading: !1 });
        }
      },
      clearData: () => h(() => ({
        data: [],
        pagination: { ...te },
        errorMsg: "",
        isError: !1,
        isLoading: !0
      }))
    }, A = {};
    return Object.keys(U).forEach((w) => {
      f[w] ? A[w] = f[w](h, F, U[w]) : A[w] = U[w];
    }), {
      // State
      data: [],
      dataFilters: [],
      pagination: { ...te },
      filter: { ...o },
      form: { ...s },
      editData: {},
      formErrors: {},
      errorMsg: "",
      filterErrorMsg: "",
      isLoading: !0,
      isError: !1,
      isFilterLoading: !1,
      isFilterError: !1,
      isFormLoading: !1,
      isFormError: !1,
      isDeleting: !1,
      // Methods (base + overridden)
      ...A,
      // Custom methods
      ...typeof g == "function" ? g(h, F) : g
    };
  });
}
export {
  gr as AnimateSideText,
  le as Button,
  br as Container,
  lr as DataTable,
  sr as Delete,
  Re as DownloadIcon,
  Vr as EmailWithPost,
  dr as ErrorBoundary,
  Qr as ExportExcelSelectedDialog,
  _r as FileDownloader,
  xr as FileInput,
  yr as FormField,
  wr as FormRow,
  oe as Get,
  ar as GetDetail,
  Fe as ImageIcon,
  Jr as ImportExcel,
  cr as Loading,
  ir as ModalBox,
  vr as MultiFileInput,
  mr as NavLinkItem,
  Gr as PageLoader,
  ge as Post,
  qr as PostWithFormData,
  Zr as SearchIcon,
  Nr as SelectOption,
  fr as TextTruncator,
  Ee as Update,
  zr as UpdateWithFormData,
  ie as UploadIcon,
  Kr as ValidateForm,
  jr as api,
  Or as apiInstance,
  se as createApiClient,
  Xr as createCrudStore,
  rr as createDefaultRequestInterceptor,
  Ar as createSimpleRequestInterceptor,
  z as customAxios,
  ve as defaultConfig,
  te as defaultPagination,
  _ as errorResponse,
  $r as formatNumber,
  Ye as getErrorHandler,
  Xe as getSuccessHandler,
  Ur as getTableRowIndex,
  Ze as getTruncatedText,
  fe as mergeConfig,
  or as perPageOptions,
  Q as sanitizeObject,
  Hr as seo,
  _e as successResponse,
  Wr as useDebounce
};
//# sourceMappingURL=index.mjs.map
