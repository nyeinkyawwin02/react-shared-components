import ce from "axios";
import { useState as S, useEffect as J, Component as Te, useMemo as I, useRef as Le, useCallback as F } from "react";
import { jsxs as d, Fragment as X, jsx as t } from "react/jsx-runtime";
import a from "prop-types";
import { Table as Pe, TableHeader as ke, TableColumn as Ie, TableBody as we, Spinner as Y, TableRow as $e, TableCell as je, Pagination as Ae, Button as K, Modal as de, ModalContent as ue, ModalHeader as me, ModalBody as pe, ModalFooter as he, Select as Ee, SelectItem as ne, Input as Ue, Autocomplete as Oe, AutocompleteItem as Ve } from "@nextui-org/react";
import { useLocation as qe, Link as ze } from "react-router-dom";
import xe, { Toaster as Ke } from "react-hot-toast";
import * as _ from "xlsx";
import { saveAs as He } from "file-saver";
import { X as ae, Upload as ve } from "lucide-react";
import { GiCancel as We } from "react-icons/gi";
import { BiPlusCircle as Ze } from "react-icons/bi";
import { create as _e } from "zustand";
const jr = (r) => new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(r), Ar = (r, e) => Number(r.page) * Number(r.limit) + e + 1 - Number(r.limit), Ge = ({ text: r = "", limit: e = 20 }) => r.length > e ? r.slice(0, e) + "..." : r, Qe = (r) => ({ status: !0, data: r }), G = (r = "", e) => ({ status: !1, message: r, data: e }), ee = {}, Ce = {
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
  ...Ce,
  ...r,
  headers: {
    ...Ce.headers,
    ...r.headers || {}
  }
}), Je = (r) => {
  try {
    typeof window < "u" && window.toast ? window.toast.success(r) : import("react-hot-toast").then(({ default: e }) => e.success(r)).catch(() => console.log("✓", r));
  } catch {
    console.log("✓", r);
  }
}, Xe = (r) => {
  try {
    typeof window < "u" && window.toast ? window.toast.error(r) : import("react-hot-toast").then(({ default: e }) => e.error(r)).catch(() => console.error("✗", r));
  } catch {
    console.error("✗", r);
  }
}, Ye = (r) => r.onSuccess || Je, er = (r) => r.onError || Xe, rr = (r) => {
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
}, re = {}, tr = (r) => (e) => {
  var i;
  const n = localStorage.getItem(r.tokenKey), s = localStorage.getItem(r.userKey);
  let o = {};
  try {
    o = s ? JSON.parse(s) : {};
  } catch (c) {
    console.error("Error parsing user data:", c);
  }
  if (n && (e.headers.Authorization = `Bearer ${n}`, r.includeBranchLogic)) {
    const c = ((i = o.relatedBranch) == null ? void 0 : i._id) || o.relatedBranch;
    if (c && (e.params = {
      ...e.params,
      relatedBranch: c
    }, ["post", "put", "patch"].includes(e.method)))
      if (e.data instanceof FormData)
        e.data.has("relatedBranch") ? e.data.get("relatedBranch") || e.data.set("relatedBranch", c) : e.data.append("relatedBranch", c), r.includeCreatedBy && (!e.data.has("createdBy") || !e.data.get("createdBy") ? e.data.append("createdBy", o._id || o.id) : e.data.get("createdBy") || e.data.set("createdBy", o._id || o.id));
      else {
        const f = {
          relatedBranch: c
        };
        r.includeCreatedBy && (f.createdBy = o._id || o.id), e.data = {
          ...e.data,
          ...f
        };
      }
  }
  return r.transformRequest ? r.transformRequest(e, o, n) : e;
}, Ur = (r) => (e) => {
  const n = localStorage.getItem(r.tokenKey);
  return n && (e.headers.Authorization = `Bearer ${n}`), e;
}, nr = (r, e) => (r.interceptors.request.use(
  e.requestInterceptor || tr(e),
  (n) => Promise.reject(n)
), e.responseInterceptor ? r.interceptors.response.use(
  e.responseInterceptor,
  e.errorInterceptor || ((n) => Promise.reject(n))
) : e.errorInterceptor && r.interceptors.response.use(
  (n) => n,
  e.errorInterceptor
), r), se = (r = {}) => {
  rr(r);
  const e = fe(r), n = ce.create({
    baseURL: e.baseURL,
    headers: e.headers
  });
  return nr(n, e);
}, V = (r) => r ? se({ baseURL: r }) : se(), ar = typeof import.meta < "u" && (re != null && re.VITE_API_BASE_URL) ? void 0 : "http://localhost:3000", Or = ce.create({
  baseURL: ar,
  headers: {
    "Content-Type": "application/json"
  }
}), Vr = se(), W = (r, e = {}) => {
  if (e.showNotification === !1) return;
  const n = fe(e.apiConfig), s = e.onSuccess || Ye(n), o = e.customSuccessMessage || r;
  s(o);
}, O = (r, e = {}) => {
  if (e.showNotification === !1) return;
  const n = fe(e.apiConfig), s = e.onError || er(n), o = e.customErrorMessage || r;
  s(o);
}, oe = async (r, e = {}, n = V(), s = {}) => {
  var o, i;
  try {
    return (await n.get(r, { params: e })).data;
  } catch (c) {
    if (c.status == "404")
      return {
        isSuccess: !0,
        data: []
      };
    const f = ((i = (o = c == null ? void 0 : c.response) == null ? void 0 : o.data) == null ? void 0 : i.message) || "Request failed";
    return O(f, s), {
      success: !1,
      data: [],
      message: f
    };
  }
}, qr = async (r, e, n, s, o = V(), i = {}) => {
  var c, f;
  try {
    const y = await import("sweetalert2").catch(() => null), b = await o.post(r, e, n);
    return y != null && y.default ? y.default.fire({
      title: "Successful!",
      text: `Check your ${s} for password!`,
      icon: "success",
      showConfirmButton: !1,
      timer: 4e3
    }) : W(`Check your ${s} for password!`, i), b.data.data;
  } catch (y) {
    const b = await import("sweetalert2").catch(() => null), l = ((f = (c = y.response) == null ? void 0 : c.data) == null ? void 0 : f.message) || "Request failed";
    b != null && b.default ? b.default.fire({
      title: "Something Wrong!",
      text: l,
      icon: "warning",
      showConfirmButton: !1,
      timer: 2e3
    }) : O(l, i);
  }
}, ge = async (r, e, n = {}, s, o = V(), i = {}) => {
  var c, f;
  try {
    const y = await o.post(r, e, n);
    return y.data.isSuccess && (r.split("?")[0] === "auth/login" ? W("Login successfully!", i) : W(`The ${s} had been created successfully!`, i)), y.data;
  } catch (y) {
    const b = ((f = (c = y.response) == null ? void 0 : c.data) == null ? void 0 : f.message) || "Request failed";
    return O(b, i), G(b, []);
  }
}, zr = async (r, e, n = {}, s, o = V(), i = {}) => await ge(
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
  i
), Fe = async (r, e, n, s, o, i = V(), c = {}) => {
  var f, y;
  try {
    const b = await i.put(r + e, n, s);
    return b.data.isSuccess ? W("Saved Your Changes!", c) : O("Something Wrong!", c), b.data;
  } catch (b) {
    const l = ((y = (f = b.response) == null ? void 0 : f.data) == null ? void 0 : y.message) || "Update failed";
    return O(l, c), G(l, []);
  }
}, Kr = async (r, e, n, s = {}, o, i = V(), c = {}) => await Fe(
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
  i,
  c
), sr = async (r, e, n = {}, s = V(), o = {}) => await oe(r + e, n, s, o), or = async (r, e, n, s = V(), o = {}) => {
  var i, c;
  try {
    return (await s.delete(r + e)).data.isSuccess && W(`The ${n} had been deleted successfully!`, o), !0;
  } catch (f) {
    const y = ((c = (i = f.response) == null ? void 0 : i.data) == null ? void 0 : c.message) || "Delete failed";
    return O(y, o), !1;
  }
}, Hr = (r, e = {}) => {
  const n = [], s = [];
  if (r.forEach(
    ({
      condition: o,
      label: i,
      customMsg: c = "",
      isRequired: f = !1,
      isCustom: y = !1
    }) => {
      o && (f && n.push(i), y && s.push(c));
    }
  ), n.length > 0) {
    const o = `These field(s) are required to fill: ${n.join(", ")}`;
    return O(o, e), G(o);
  }
  if (s.length > 0) {
    const o = `Validation Error: ${s.join(`,
`)}`;
    return O(o, e), G(o);
  }
  return Qe();
};
function Ne(r) {
  return typeof r == "string" ? r.trim() : r;
}
function Q(r) {
  if (!r || typeof r != "object")
    return Ne(r);
  if (Array.isArray(r))
    return r.map((n) => Q(n));
  const e = {};
  for (const [n, s] of Object.entries(r))
    e[n] = typeof s == "object" ? Q(s) : Ne(s);
  return e;
}
const Wr = (r = {}) => {
  r.title = r.title ? "CELC | " + r.title : "CELC", r.metaDescription = r.metaDescription || "School Management System Developed by Future Wave Team", document.title = r.title, document.querySelector('meta[name="description"]').setAttribute("content", r.metaDescription);
}, te = {
  total: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 10
}, lr = [10, 25, 50, 100];
function Zr(r, e = 500) {
  const [n, s] = S(r);
  return J(() => {
    const o = setTimeout(() => {
      s(r);
    }, e);
    return () => {
      clearTimeout(o);
    };
  }, [r, e]), n;
}
function ir({
  columns: r = [],
  data: e = [],
  pagination: n = { total: 0, totalPages: 1 },
  filter: s = { page: 1, limit: 10 },
  isLoading: o = !1,
  isError: i = !1,
  errorMsg: c = "",
  onFilterChange: f,
  emptyMessage: y = "No data to display",
  ariaLabel: b = "Data Table"
}) {
  const l = (h) => {
    f({
      name: h.target.name,
      value: parseFloat(h.target.value)
    });
  }, x = (h) => {
    f({
      name: "page",
      value: parseFloat(h)
    });
  };
  return /* @__PURE__ */ d(X, { children: [
    /* @__PURE__ */ d("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ d("span", { className: "text-default-400 text-small", children: [
        "Total ",
        (n == null ? void 0 : n.total) || 0,
        " items"
      ] }),
      /* @__PURE__ */ d(
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
                onChange: l,
                children: lr.map((h) => /* @__PURE__ */ t("option", { value: h, children: h }, h))
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d(
      Pe,
      {
        isHeaderSticky: !0,
        "aria-label": b,
        bottomContent: /* @__PURE__ */ t("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ t(
          Ae,
          {
            isCompact: !0,
            showControls: !0,
            showShadow: !0,
            color: "primary",
            page: s.page,
            total: (n == null ? void 0 : n.totalPages) || 1,
            onChange: x
          }
        ) }),
        children: [
          /* @__PURE__ */ t(ke, { children: r.map((h) => /* @__PURE__ */ t(Ie, { children: h.label }, h.key)) }),
          o ? /* @__PURE__ */ t(we, { emptyContent: /* @__PURE__ */ t(Y, {}) }) : /* @__PURE__ */ t(we, { emptyContent: i ? c : y, children: e == null ? void 0 : e.map((h, w) => /* @__PURE__ */ t($e, { children: r.map((p) => /* @__PURE__ */ t(je, { children: p.render ? p.render(h, w) : h[p.key] }, p.key)) }, h._id || w)) })
        ]
      }
    )
  ] });
}
ir.propTypes = {
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
    children: i,
    ...c
  } = r;
  return /* @__PURE__ */ d(K, { className: `w-full ${s}`, disabled: n, ...c, children: [
    e ? /* @__PURE__ */ t(Y, { color: "white" }) : o,
    i
  ] });
};
le.propTypes = {
  isLoading: a.bool,
  isDisabled: a.bool,
  className: a.string,
  label: a.string,
  children: a.any
};
const cr = ({
  header: r = "Header",
  title: e = "Title",
  cancelText: n = "No",
  confirmText: s = "Yes",
  size: o = "lg",
  isOpen: i = !1,
  isBtnDisabled: c = !1,
  classNames: f = {},
  children: y,
  onClose: b,
  onKeyDown: l
}) => /* @__PURE__ */ t(
  de,
  {
    backdrop: "blur",
    size: o,
    isOpen: i,
    onClose: b,
    closeButton: !0,
    classNames: f,
    children: /* @__PURE__ */ t(ue, { children: () => /* @__PURE__ */ d(X, { children: [
      /* @__PURE__ */ t(me, { className: "flex flex-col gap-1", children: r }),
      /* @__PURE__ */ d(pe, { children: [
        /* @__PURE__ */ t("p", { children: e }),
        y
      ] }),
      /* @__PURE__ */ d(he, { children: [
        /* @__PURE__ */ t(
          le,
          {
            color: "default",
            variant: "light",
            onPress: b,
            isDisabled: c,
            children: n
          }
        ),
        /* @__PURE__ */ t(
          le,
          {
            color: "danger",
            onKeyDown: l,
            onPress: l,
            isDisabled: c,
            children: s
          }
        )
      ] })
    ] }) })
  }
);
cr.propTypes = {
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
const dr = ({ className: r = "" }) => /* @__PURE__ */ t("div", { className: `flex justify-center items-center ${r}`, children: /* @__PURE__ */ t(Y, {}) });
dr.propTypes = {
  className: a.string
};
class ur extends Te {
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
    return this.state.hasError ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center min-h-screen bg-gray-50", children: /* @__PURE__ */ d("div", { className: "text-center space-y-4 p-8 bg-white rounded-lg shadow-lg max-w-md", children: [
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
ur.propTypes = {
  children: a.node.isRequired
};
const mr = "my-1 w-full p-3 flex items-center gap-2 border border-gray-200 text-base rounded-lg transition-all duration-300", pr = ({ path: r, title: e, icon: n }) => {
  const s = qe(), o = I(() => {
    const i = s.pathname.split("?")[0].replace(/\/$/, ""), c = r.replace(/\/$/, "");
    return i === c || i.startsWith(c + "/") ? "bg-red-50 text-red-900 font-semibold border-red-900" : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-800 hover:border-red-200";
  }, [s.pathname, r]);
  return /* @__PURE__ */ d(ze, { to: r, className: `${mr} ${o}`, children: [
    n && /* @__PURE__ */ t("span", { className: "flex-shrink-0", children: n }),
    e && /* @__PURE__ */ t("span", { className: "truncate", children: e })
  ] });
};
pr.propTypes = {
  path: a.string.isRequired,
  title: a.string.isRequired,
  icon: a.node
};
function _r() {
  return /* @__PURE__ */ t("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ d("div", { className: "text-center space-y-4", children: [
    /* @__PURE__ */ t(Y, { size: "lg", color: "primary" }),
    /* @__PURE__ */ t("p", { className: "text-gray-500 text-sm", children: "Loading..." })
  ] }) });
}
const ie = ({
  className: r = "w-6 h-6",
  filled: e = !1,
  ...n
}) => e ? /* @__PURE__ */ d(
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
) : /* @__PURE__ */ d(
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
), Gr = () => /* @__PURE__ */ d(
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
), Re = ({
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
), De = ({ className: r = "w-6 h-6" }) => /* @__PURE__ */ t(
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
ie.propTypes = Re.propTypes = De.propTypes = {
  className: a.string,
  filled: a.bool
};
function hr(r, e) {
  const n = URL.createObjectURL(r), s = document.createElement("a");
  s.href = n, s.download = e, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(n);
}
function fr(r) {
  if (!r) return null;
  const e = r.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  return e && e[1] ? e[1].replace(/['"]/g, "") : null;
}
function Qr({ url: r, className: e = "", file: n }) {
  const [s, o] = S(0), [i, c] = S(!1);
  async function f() {
    var b;
    c(!0), o(0);
    try {
      const l = await ce.get(r, {
        responseType: "blob",
        onDownloadProgress: (w) => {
          if (w.lengthComputable || w.total) {
            const p = w.total || 0, g = p ? Math.round(w.loaded * 100 / p) : 0;
            o(g);
          } else
            o((p) => Math.min(p + 5, 99));
        }
      }), x = l.headers["content-disposition"] || l.headers["Content-Disposition"], h = fr(x) || new URL(r).pathname.split("/").pop() || "download";
      hr(l.data, h), o(100);
    } catch (l) {
      console.error("Download error", l);
      const x = (b = l == null ? void 0 : l.response) != null && b.data ? "Server responded with an error" : l.message || "Unknown error";
      alert(`Download failed: ${x}`);
    } finally {
      setTimeout(
        () => {
          c(!1), setTimeout(() => o(0), 300);
        },
        s >= 100 ? 600 : 200
      );
    }
  }
  const y = I(() => {
    var b;
    return n ? n instanceof File ? n.name || "" : ((b = Object.keys(n)) == null ? void 0 : b.length) > 0 ? n.originalname : "File name" : "File name";
  }, [n]);
  return /* @__PURE__ */ d("div", { className: `w-full max-w-sm ${e}`, children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: `w-full border-2 border-dotted border-[#2563EB] input-field-wrapper justify-between ${i ? "bg-slate-300 text-slate-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"} duration-300 transition`,
        onClick: f,
        disabled: i,
        "aria-live": "polite",
        "aria-busy": i,
        "aria-disabled": i,
        children: [
          /* @__PURE__ */ t("span", { className: "w-full cursor-pointer text-[#898989] flex justify-start items-center gap-3 bg-current truncate", children: i ? /* @__PURE__ */ d("span", { children: [
            "Downloading… ",
            s,
            "%"
          ] }) : y }),
          /* @__PURE__ */ t("span", { type: "button", children: /* @__PURE__ */ t(De, {}) })
        ]
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: "mt-3 h-3 bg-slate-100 rounded-md overflow-hidden",
        "aria-hidden": !i,
        children: /* @__PURE__ */ t(
          "div",
          {
            className: "h-full rounded-md shadow-inner transform transition-all duration-200 ease-out",
            style: { width: `${i ? s : 0}%` }
          }
        )
      }
    )
  ] });
}
const gr = ({ text: r = "" }) => /* @__PURE__ */ t("p", { className: "cursor-help", title: r, children: Ge({ text: r }) });
gr.propTypes = {
  text: a.string
};
const br = ({
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
br.propTypes = {
  condition: a.bool,
  text: a.string,
  className: a.string
};
const yr = ({ children: r }) => /* @__PURE__ */ d("div", { className: "w-[96%] mx-auto  p-4  rounded-lg", children: [
  /* @__PURE__ */ t(Ke, {}),
  r
] });
yr.propTypes = {
  children: a.node.isRequired
};
const Jr = ({
  itemsToExport: r,
  onClose: e,
  onExportSuccess: n
}) => {
  const [s, o] = S(!1), i = () => {
    o(!0);
    try {
      const c = [
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
      ], f = r.map((w) => [
        w.code,
        w.name,
        w.qty,
        w.fromUnit,
        w.toUnit,
        w.totalUnit,
        w.sellingMMK,
        w.purchaseMMK,
        w.unit,
        w.type,
        w.openingQty,
        w.purchaseQty,
        w.usedQty,
        w.closingQty,
        w.branch
      ]), y = [c, ...f], b = _.utils.aoa_to_sheet(y), l = _.utils.book_new();
      _.utils.book_append_sheet(l, b, "Selected Inventory");
      const x = _.write(l, { bookType: "xlsx", type: "array" }), h = new Blob([x], {
        type: "application/octet-stream"
      });
      He(h, "selected_inventory.xlsx"), n(r);
    } catch (c) {
      console.error("Error exporting Excel file:", c), alert("Failed to export Excel file. Please try again.");
    } finally {
      o(!1), e();
    }
  };
  return /* @__PURE__ */ t(de, { isOpen: !0, onClose: e, children: /* @__PURE__ */ t(ue, { children: (c) => /* @__PURE__ */ d(X, { children: [
    /* @__PURE__ */ t(me, { className: "flex flex-col gap-1", children: "Export Selected Items" }),
    /* @__PURE__ */ d(pe, { children: [
      /* @__PURE__ */ d("p", { children: [
        "You are about to export ",
        /* @__PURE__ */ t("strong", { children: r.length }),
        " ",
        "selected items to an Excel file."
      ] }),
      /* @__PURE__ */ t("p", { children: "Do you want to proceed?" })
    ] }),
    /* @__PURE__ */ d(he, { children: [
      /* @__PURE__ */ t(
        K,
        {
          color: "danger",
          variant: "light",
          onPress: c,
          isDisabled: s,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ t(
        K,
        {
          color: "primary",
          onPress: i,
          isLoading: s,
          isDisabled: r.length === 0,
          children: s ? "Exporting..." : "Export"
        }
      )
    ] })
  ] }) }) });
}, Xr = ({ onClose: r, onImportSuccess: e }) => {
  const [n, s] = S(null), [o, i] = S(""), [c, f] = S(""), [y, b] = S(!1), l = (h) => {
    const w = h.target.files[0];
    s(w);
  }, x = () => {
  };
  return /* @__PURE__ */ t(de, { isOpen: !0, onClose: r, children: /* @__PURE__ */ t(ue, { children: (h) => /* @__PURE__ */ d(X, { children: [
    /* @__PURE__ */ t(me, { className: "flex flex-col gap-1", children: "Import from Excel" }),
    /* @__PURE__ */ d(pe, { children: [
      /* @__PURE__ */ d(
        Ee,
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
        Ue,
        {
          type: "file",
          variant: "bordered",
          label: "Select Excel File",
          onChange: l,
          accept: ".xlsx, .xls"
        }
      ),
      o && /* @__PURE__ */ d("p", { className: "text-gray-600 text-sm mt-2", children: [
        "Selected: ",
        o
      ] })
    ] }),
    /* @__PURE__ */ d(he, { children: [
      /* @__PURE__ */ t(
        K,
        {
          color: "danger",
          variant: "light",
          onPress: h,
          isDisabled: y,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ t(
        K,
        {
          color: "primary",
          onPress: x,
          isLoading: y,
          isDisabled: !n,
          children: "Import"
        }
      )
    ] })
  ] }) }) });
}, wr = ({ children: r, className: e = "" }) => /* @__PURE__ */ t("div", { className: `w-full ${e}`, children: r });
wr.propTypes = {
  children: a.any,
  className: a.string
};
const xr = ({ children: r, className: e = "" }) => /* @__PURE__ */ t("div", { className: `grid grid-cols-1 md:grid-cols-2 gap-4 ${e}`, children: r });
xr.propTypes = {
  children: a.any,
  className: a.string
};
const vr = ({
  label: r = "File Upload",
  value: e,
  id: n,
  onChange: s,
  accept: o = "image/*",
  isDisabled: i = !1,
  showPreview: c = !0,
  maxSizeMB: f = 5,
  ...y
}) => {
  const [b, l] = S(null), [x, h] = S(""), [w, p] = S(!1), g = Le(0);
  J(() => {
    if (!e) {
      l(null);
      return;
    }
    if (e instanceof File) {
      const C = URL.createObjectURL(e);
      return l(C), () => URL.revokeObjectURL(C);
    }
    e != null && e.url && l(e.url);
  }, [e]);
  const v = I(() => e ? e instanceof File ? e.name : e != null && e.originalname ? e.originalname : "File uploaded" : null, [e]), L = I(() => e ? e instanceof File ? e.type.startsWith("image/") : e != null && e.originalname ? /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(e.originalname) : !1 : !1, [e]), P = F(
    (C) => {
      if (C.size / 1048576 > f)
        return h(`File size must be less than ${f}MB`), !1;
      if (o && o !== "*") {
        const B = o.split(",").map((E) => E.trim()), m = C.type, M = "." + C.name.split(".").pop();
        if (!B.some((E) => E.endsWith("/*") ? m.startsWith(E.replace("/*", "")) : E === m || E === M))
          return h(`File type not accepted. Accepted: ${o}`), !1;
      }
      return h(""), !0;
    },
    [o, f]
  ), U = F(
    (C) => {
      var B;
      const D = (B = C.target.files) == null ? void 0 : B[0];
      D && P(D) && s({ name: C.target.name, value: D });
    },
    [s, P]
  ), j = F(
    (C) => {
      C.stopPropagation(), l(null), h(""), s({ name: n, value: null });
      const D = document.getElementById(n);
      D && (D.value = "");
    },
    [s, n]
  ), H = F((C) => {
    C.preventDefault(), C.stopPropagation(), g.current++, C.dataTransfer.items && C.dataTransfer.items.length > 0 && p(!0);
  }, []), k = F((C) => {
    C.preventDefault(), C.stopPropagation(), g.current--, g.current === 0 && p(!1);
  }, []), q = F((C) => {
    C.preventDefault(), C.stopPropagation();
  }, []), A = F(
    (C) => {
      if (C.preventDefault(), C.stopPropagation(), p(!1), g.current = 0, i) return;
      const D = C.dataTransfer.files;
      if (D && D.length > 0) {
        const B = D[0];
        P(B) && s({ name: n, value: B });
      }
    },
    [i, s, n, P]
  );
  return /* @__PURE__ */ d("div", { className: "space-y-3", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onDragEnter: H,
        onDragOver: q,
        onDragLeave: k,
        onDrop: A,
        className: `
          relative border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${i ? "opacity-50 cursor-not-allowed bg-default-50" : "cursor-pointer hover:border-primary-400"}
          ${w && !i ? "border-primary-500 bg-primary-50 scale-[1.02] shadow-lg" : x ? "border-danger bg-danger-50/30" : e ? "border-success-300 bg-success-50/30" : "border-default-300 bg-white"}
        `,
        children: /* @__PURE__ */ d(
          "label",
          {
            htmlFor: n,
            className: `
            relative block w-full p-6
            ${i ? "cursor-not-allowed" : "cursor-pointer"}
          `,
            children: [
              w && !i && /* @__PURE__ */ d("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-xl z-10 pointer-events-none", children: [
                /* @__PURE__ */ t(ie, { className: "w-12 h-12 text-primary-500 animate-bounce" }),
                /* @__PURE__ */ t("p", { className: "text-primary-600 font-semibold mt-3", children: "Drop your file here" })
              ] }),
              e ? /* @__PURE__ */ d("div", { className: "flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ d("div", { className: "flex items-center gap-3 flex-1 min-w-0 overflow-hidden", children: [
                  /* @__PURE__ */ t("div", { className: "p-2 rounded-lg bg-success-100 flex-shrink-0", children: /* @__PURE__ */ t(Re, { className: "w-6 h-6 text-success-600" }) }),
                  /* @__PURE__ */ d("div", { className: "flex-1 min-w-0 overflow-hidden", children: [
                    /* @__PURE__ */ t("p", { className: "text-sm font-medium text-default-700 truncate", children: v }),
                    /* @__PURE__ */ t("p", { className: "text-xs text-default-500", children: "Ready to upload" })
                  ] })
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: j,
                    disabled: i,
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
              ] }) : /* @__PURE__ */ d("div", { className: "flex flex-col items-center justify-center gap-3 py-4", children: [
                /* @__PURE__ */ t("div", { className: "p-4 rounded-full bg-default-100", children: /* @__PURE__ */ t(ie, { className: "w-8 h-8 text-default-500" }) }),
                /* @__PURE__ */ d("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ t("p", { className: "text-base font-semibold text-default-700", children: r }),
                  /* @__PURE__ */ d("p", { className: "text-sm text-default-500", children: [
                    "Drag and drop or",
                    " ",
                    /* @__PURE__ */ t("span", { className: "text-primary-500 font-medium", children: "browse" })
                  ] }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-default-400", children: o === "image/*" ? `PNG, JPG, GIF, WEBP up to ${f}MB` : `Max file size: ${f}MB` })
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
                  disabled: i,
                  "aria-describedby": x ? `${n}-error` : void 0,
                  ...y
                }
              )
            ]
          }
        )
      }
    ),
    x && /* @__PURE__ */ d("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-danger-50 border border-danger-200", children: [
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
      /* @__PURE__ */ t("p", { id: `${n}-error`, className: "text-sm text-danger-700 font-medium", children: x })
    ] }),
    c && b && L && /* @__PURE__ */ d("div", { className: "relative rounded-xl overflow-hidden border-2 border-default-200 group", children: [
      /* @__PURE__ */ t(
        "img",
        {
          src: b,
          alt: "Preview",
          className: "w-full h-64 object-cover",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300", children: [
        /* @__PURE__ */ t("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: /* @__PURE__ */ t("p", { className: "text-white text-sm font-medium truncate", children: v }) }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: j,
            disabled: i,
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
vr.propTypes = {
  label: a.string,
  value: a.oneOfType([a.instanceOf(File), a.object]),
  id: a.string.isRequired,
  onChange: a.func.isRequired,
  accept: a.string,
  isDisabled: a.bool,
  showPreview: a.bool,
  maxSizeMB: a.number
};
const Cr = ({
  label: r = "Upload Images",
  value: e = [],
  id: n,
  onChange: s,
  accept: o = "image/*",
  isDisabled: i = !1,
  maxFiles: c = 10,
  maxSizeMB: f = 5,
  ...y
}) => {
  const [b, l] = S([]), [x, h] = S(""), [w, p] = S(!1), g = Le(0);
  J(() => {
    if (!e || e.length === 0) {
      l([]);
      return;
    }
    const m = [], M = [];
    return e.forEach((N, E) => {
      if (N instanceof File) {
        const T = URL.createObjectURL(N);
        m.push({
          id: `${N.name}-${E}`,
          url: T,
          name: N.name,
          size: N.size,
          type: N.type
        }), M.push(() => URL.revokeObjectURL(T));
      } else N != null && N.url && m.push({
        id: N._id || `existing-${E}`,
        url: N.url,
        name: N.originalname || N.name,
        size: N.size,
        type: N.mimetype || N.type
      });
    }), l(m), () => {
      M.forEach((N) => N());
    };
  }, [e]);
  const v = F(
    (m) => {
      if (m.size / 1048576 > f)
        return h(`File "${m.name}" is too large. Max size: ${f}MB`), !1;
      if (o && o !== "*") {
        const N = o.split(",").map(($) => $.trim()), E = m.type, T = "." + m.name.split(".").pop();
        if (!N.some(($) => $.endsWith("/*") ? E.startsWith($.replace("/*", "")) : $ === E || $ === T))
          return h(`File "${m.name}" type not accepted`), !1;
      }
      return !0;
    },
    [o, f]
  ), L = F(
    (m) => {
      const M = Array.isArray(e) ? e : [], N = Array.from(m);
      if (M.length + N.length > c) {
        h(`Maximum ${c} files allowed`);
        return;
      }
      const E = N.filter((T) => v(T));
      if (E.length > 0) {
        h("");
        const T = [...M, ...E];
        s({ name: n, value: T });
      }
    },
    [e, n, s, c, v]
  ), P = F(
    (m) => {
      m.target.files && m.target.files.length > 0 && L(m.target.files);
    },
    [L]
  ), U = F(
    (m, M) => {
      M.stopPropagation();
      const E = (Array.isArray(e) ? e : []).filter(
        (T, Z) => Z !== m
      );
      if (s({ name: n, value: E }), h(""), E.length === 0) {
        const T = document.getElementById(n);
        T && (T.value = "");
      }
    },
    [e, s, n]
  ), j = F(
    (m) => {
      m.stopPropagation(), s({ name: n, value: [] }), h("");
      const M = document.getElementById(n);
      M && (M.value = "");
    },
    [s, n]
  ), H = F((m) => {
    m.preventDefault(), m.stopPropagation(), g.current++, m.dataTransfer.items && m.dataTransfer.items.length > 0 && p(!0);
  }, []), k = F((m) => {
    m.preventDefault(), m.stopPropagation(), g.current--, g.current === 0 && p(!1);
  }, []), q = F((m) => {
    m.preventDefault(), m.stopPropagation();
  }, []), A = F(
    (m) => {
      m.preventDefault(), m.stopPropagation(), p(!1), g.current = 0, !i && m.dataTransfer.files && m.dataTransfer.files.length > 0 && L(m.dataTransfer.files);
    },
    [i, L]
  ), C = (m) => {
    if (m === 0) return "0 Bytes";
    const M = 1024, N = ["Bytes", "KB", "MB", "GB"], E = Math.floor(Math.log(m) / Math.log(M));
    return Math.round(m / Math.pow(M, E) * 100) / 100 + " " + N[E];
  }, D = Array.isArray(e) ? e.length : 0, B = c - D;
  return /* @__PURE__ */ d("div", { className: "space-y-3", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onDragEnter: H,
        onDragOver: q,
        onDragLeave: k,
        onDrop: A,
        className: `
          relative border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${i || B === 0 ? "opacity-50 cursor-not-allowed bg-default-50" : "cursor-pointer hover:border-primary-400"}
          ${w && !i && B > 0 ? "border-primary-500 bg-primary-50 scale-[1.02] shadow-lg" : x ? "border-danger bg-danger-50/30" : D > 0 ? "border-success-300 bg-success-50/30" : "border-default-300 bg-white"}
        `,
        children: /* @__PURE__ */ d(
          "label",
          {
            htmlFor: n,
            className: `
            relative block w-full p-6
            ${i || B === 0 ? "cursor-not-allowed" : "cursor-pointer"}
          `,
            children: [
              w && !i && B > 0 && /* @__PURE__ */ d("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-primary-500/10 rounded-xl z-10 pointer-events-none", children: [
                /* @__PURE__ */ t(ve, { className: "w-12 h-12 text-primary-500 animate-bounce" }),
                /* @__PURE__ */ t("p", { className: "text-primary-600 font-semibold mt-3", children: "Drop your files here" })
              ] }),
              /* @__PURE__ */ d("div", { className: "flex flex-col items-center justify-center gap-3 py-4", children: [
                /* @__PURE__ */ t("div", { className: "p-4 rounded-full bg-default-100", children: /* @__PURE__ */ t(ve, { className: "w-8 h-8 text-default-500" }) }),
                /* @__PURE__ */ d("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ t("p", { className: "text-base font-semibold text-default-700", children: r }),
                  /* @__PURE__ */ d("p", { className: "text-sm text-default-500", children: [
                    "Drag and drop or",
                    " ",
                    /* @__PURE__ */ t("span", { className: "text-primary-500 font-medium", children: "browse" })
                  ] }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-default-400", children: o === "image/*" ? `PNG, JPG, GIF, WEBP up to ${f}MB each` : `Max ${f}MB per file` }),
                  /* @__PURE__ */ d("p", { className: "text-xs font-medium text-default-600 mt-2", children: [
                    D,
                    " / ",
                    c,
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
                  onChange: P,
                  className: "hidden",
                  accept: o,
                  disabled: i || B === 0,
                  multiple: !0,
                  "aria-describedby": x ? `${n}-error` : void 0,
                  ...y
                }
              )
            ]
          }
        )
      }
    ),
    x && /* @__PURE__ */ d("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-danger-50 border border-danger-200", children: [
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
      /* @__PURE__ */ t("p", { id: `${n}-error`, className: "text-sm text-danger-700 font-medium", children: x })
    ] }),
    b.length > 0 && /* @__PURE__ */ d("div", { className: "space-y-3", children: [
      /* @__PURE__ */ d("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ d("h4", { className: "text-sm font-semibold text-default-700", children: [
          "Selected Files (",
          b.length,
          ")"
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: j,
            disabled: i,
            className: "text-xs text-danger-500 hover:text-danger-600 font-medium transition-colors disabled:opacity-50",
            children: "Clear All"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: b.map((m, M) => /* @__PURE__ */ t(
        "div",
        {
          className: "relative group rounded-xl overflow-hidden border-2 border-default-200 bg-white hover:border-primary-300 transition-all",
          children: /* @__PURE__ */ d("div", { className: "aspect-square relative", children: [
            /* @__PURE__ */ t(
              "img",
              {
                src: m.url,
                alt: m.name,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
              /* @__PURE__ */ d("div", { className: "absolute bottom-0 left-0 right-0 p-2", children: [
                /* @__PURE__ */ t("p", { className: "text-white text-xs font-medium truncate", children: m.name }),
                /* @__PURE__ */ t("p", { className: "text-white/80 text-xs", children: C(m.size) })
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: (N) => U(M, N),
                  disabled: i,
                  className: `
                        absolute top-2 right-2 p-1.5 rounded-full 
                        bg-danger-500 text-white shadow-xl
                        hover:bg-danger-600 hover:scale-110
                        transform transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `,
                  "aria-label": `Remove ${m.name}`,
                  children: /* @__PURE__ */ t(ae, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        },
        m.id
      )) })
    ] })
  ] });
};
Cr.propTypes = {
  label: a.string,
  value: a.array,
  id: a.string.isRequired,
  onChange: a.func.isRequired,
  accept: a.string,
  isDisabled: a.bool,
  maxFiles: a.number,
  maxSizeMB: a.number
};
const Nr = (r, e) => {
  const [n, s] = S(r);
  return J(() => {
    const o = setTimeout(() => {
      s(r);
    }, e);
    return () => {
      clearTimeout(o);
    };
  }, [r, e]), [n];
}, Lr = (r) => {
  const {
    className: e = {},
    value: n = "",
    options: s = [],
    optionValue: o = "value",
    optionLabel: i = "label",
    onChange: c,
    isCustomOptionLabel: f = !1,
    customLabelFunc: y = () => {
    },
    type: b = "select",
    isSearchable: l = !1,
    isAddable: x = !1,
    addURL: h = "",
    needSort: w = !0,
    selectionMode: p = "single",
    onRemove: g = () => {
    },
    ...v
  } = r, [L, P] = S(""), [U] = Nr(L, 300), [j, H] = S(""), k = F(
    (u) => typeof u == "string" ? u : f ? y(u) : u[i] || "",
    [i, f, y]
  ), q = F(
    (u) => typeof u == "string" ? u : u[o] || u._id || u.id || u.value,
    [o]
  ), A = I(() => !s || s.length === 0 ? [] : w ? [...s].sort((u, R) => {
    const z = k(u), Be = k(R);
    return z.localeCompare(Be, void 0, { sensitivity: "base" });
  }) : [...s], [s, w, k]), C = I(() => {
    if (!U.trim()) return null;
    try {
      return new RegExp(U.trim().split("").join(".*"), "i");
    } catch {
      return new RegExp(
        U.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }
  }, [U]), D = I(() => !l || !C ? A : A.filter((u) => {
    const R = k(u);
    return C.test(R);
  }), [A, C, l, k]), B = I(() => b === "autocomplete" && x && D.length === 0 && L.trim() && h, [b, x, D.length, L, h]), m = I(() => {
    const u = D.map((R) => ({
      key: q(R),
      label: k(R),
      option: R,
      isCreateOption: !1
    }));
    return B && u.push({
      key: "create-new",
      label: `Create New: ${L.trim()}`,
      option: L.trim(),
      isCreateOption: !0
    }), u;
  }, [
    D,
    B,
    L,
    q,
    k
  ]), M = F(
    (u) => {
      c({ name: u.target.name, value: u.target.value });
    },
    [c]
  ), N = F(async () => {
    if (!h || !L.trim()) return !1;
    try {
      return await ge(
        h,
        {
          name: L.trim()
        },
        {},
        "value"
      );
    } catch (u) {
      return console.error("Error creating at ", h, u), { isSuccess: !1 };
    }
  }, [h, L]), E = F(
    async (u, R) => {
      if (R === "create-new") {
        const z = await N();
        z.isSuccess && (u.value = z.data._id, u.needRefresh = !0);
      }
      P(""), c(u);
    },
    [N, c]
  ), T = F(
    (u) => {
      if (b === "autocomplete")
        if (p === "multiple")
          if (u == "create-new") {
            const R = {
              name: v.name,
              value: L
            };
            E(R, u);
          } else
            H(u);
        else {
          const R = {
            name: v.name,
            value: u
          };
          E(R, u);
        }
    },
    [v.name, p, b, L, E]
  ), Z = F((u) => {
    P(u);
  }, []), $ = I(() => Array.isArray(n) ? n : [n], [n, p]), be = I(
    () => ({
      trigger: "bg-white border-gray-300 hover:border-gray-400",
      popoverContent: "bg-white border border-gray-200 shadow-lg",
      listbox: "bg-white",
      base: "bg-white",
      ...typeof e == "object" ? e : {}
    }),
    [e]
  ), ye = I(() => {
    const { name: u, ...R } = v;
    return {
      variant: "bordered",
      selectedKeys: $,
      name: u,
      selectionMode: p,
      ...R
    };
  }, [$, p, v]), Me = () => {
    const u = {
      name: v.name,
      value: j
    };
    E(u, j);
  }, Se = (u) => {
    const R = A.findIndex(
      (z) => q(z) == u
    );
    return R != -1 ? k(A[R]) : "Not Set";
  };
  return b === "autocomplete" ? /* @__PURE__ */ d("div", { className: `${x && h ? "flex flex-col gap-3" : ""}`, children: [
    /* @__PURE__ */ d(
      "div",
      {
        className: `${x && h ? "flex gap-3 items-end justify-between" : ""}`,
        children: [
          /* @__PURE__ */ t(
            Oe,
            {
              label: "Search options",
              placeholder: "Search or Choose options",
              allowsCustomValue: !0,
              classNames: be,
              onInputChange: Z,
              onSelectionChange: T,
              items: m,
              ...ye,
              children: (u) => /* @__PURE__ */ t(
                Ve,
                {
                  className: "hover:bg-gray-50",
                  textValue: u.label,
                  children: u.isCreateOption ? /* @__PURE__ */ d("span", { children: [
                    "Create New: ",
                    /* @__PURE__ */ t("strong", { children: u.option })
                  ] }) : u.label || "Not Set"
                },
                u.key
              )
            }
          ),
          x && h && /* @__PURE__ */ d(
            K,
            {
              className: "flex gap-2 items-center justify-between py-6 font-semibold",
              disabled: !j,
              onPress: () => j && Me(),
              children: [
                /* @__PURE__ */ t(Ze, {}),
                " Add"
              ]
            }
          )
        ]
      }
    ),
    p == "multiple" && $.length > 0 && /* @__PURE__ */ t("div", { className: "flex gap-3 items-center flex-wrap", children: $.map((u, R) => /* @__PURE__ */ d(
      "div",
      {
        className: "flex items-center gap-3 p-2 text-sm rounded-lg border-2",
        children: [
          /* @__PURE__ */ t("p", { children: Se(u) }),
          /* @__PURE__ */ t(
            "span",
            {
              className: "hover:cursor-pointer",
              onClick: () => g(R),
              children: /* @__PURE__ */ t(We, {})
            }
          )
        ]
      },
      R + "-" + u
    )) })
  ] }) : /* @__PURE__ */ t(
    Ee,
    {
      classNames: be,
      onChange: M,
      items: m,
      ...ye,
      children: (u) => /* @__PURE__ */ t(
        ne,
        {
          className: "hover:bg-gray-50",
          textValue: u.label,
          children: u.label || "Not Set"
        },
        u.key
      )
    }
  );
};
Lr.propTypes = {
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
function Yr({
  entityName: r,
  baseUrl: e,
  listUrl: n,
  defaultForm: s = {},
  defaultFilter: o = { keyword: "", limit: 10, page: 1 },
  validateForm: i,
  preparePayload: c = (l) => l,
  transformFetchedData: f = (l) => l,
  customMethods: y = {},
  overrides: b = {}
}) {
  return _e((l, x) => {
    const h = {
      // Filter management
      setFilter: (p, g) => l(() => ({
        filter: {
          ...x().filter,
          [p]: g
        }
      })),
      clearFilter: () => l(() => ({
        filter: { ...o }
      })),
      // Form management
      setForm: ({ name: p, value: g }) => l(() => ({
        form: {
          ...x().form,
          [p]: g
        }
      })),
      setEditData: (p) => l(() => ({
        editData: p,
        form: p
      })),
      clearFormData: () => l(() => ({
        editData: {},
        formErrors: {},
        form: { ...s },
        isFormError: !1,
        isFormLoading: !1
      })),
      // Data operations
      fetchData: async (p = {}) => {
        x().clearData(), l({ isLoading: !0 });
        try {
          const g = await oe(n, p);
          if (g.isSuccess) {
            const { data: v, pagination: L } = g;
            l({
              data: v,
              pagination: L || { ...te }
            });
          }
        } catch (g) {
          l({ errorMsg: g.message, isError: !0 });
        } finally {
          l({ isLoading: !1 });
        }
      },
      createRecord: async (p) => {
        if (i) {
          const g = i(p);
          if (g) {
            l({ formErrors: g, isFormError: !0 });
            const v = typeof g == "object" ? Object.values(g)[0] : "Validation failed";
            return xe.error(v), !1;
          }
        }
        l({ isFormLoading: !0 });
        try {
          const g = Q(p), v = c(g), L = await ge(e, v, {}, r);
          return L.isSuccess ? (l({
            data: [...x().data, L.data],
            isFormError: !1,
            isFormLoading: !1
          }), !0) : (l({
            formErrors: L.errors,
            isFormError: !0,
            isFormLoading: !1
          }), !1);
        } catch (g) {
          return l({ formErrors: g, isFormError: !0, isFormLoading: !1 }), !1;
        }
      },
      fetchRecord: async (p) => {
        x().clearData(), l({ isLoading: !0 });
        try {
          const g = await sr(e, p);
          if (g.isSuccess) {
            const v = f(g.data);
            l({
              editData: { ...v },
              form: { ...v }
            });
          } else
            l({ isError: !0, errorMsg: g.message });
        } catch (g) {
          return l({ isError: !0, errorMsg: g.message }), !1;
        } finally {
          l({ isLoading: !1 });
        }
      },
      updateRecord: async (p, g) => {
        if (i) {
          const v = i(g);
          if (v) {
            l({ formErrors: v, isFormError: !0 });
            const L = typeof v == "object" ? Object.values(v)[0] : "Validation failed";
            return xe.error(L), !1;
          }
        }
        l({ isFormLoading: !0 });
        try {
          const v = Q(g), L = c(v), P = await Fe(e, p, L, {}, r);
          return P.isSuccess ? (l({ isFormError: !1, isFormLoading: !1 }), !0) : (l({
            formErrors: P.errors,
            isFormError: !0,
            isFormLoading: !1
          }), !1);
        } catch (v) {
          return l({ formErrors: v, isFormError: !0, isFormLoading: !1 }), !1;
        }
      },
      deleteRecord: async (p) => {
        l({ isDeleting: !0 });
        try {
          return await or(e, p, r), l({ isDeleting: !1 }), !0;
        } catch {
          return l({ isDeleting: !1 }), !1;
        }
      },
      fetchDataOptions: async (p = {}) => {
        l({ isFilterLoading: !0, dataFilters: [], isFilterError: !0 });
        try {
          const g = await oe(n + "/filter-options", p);
          if (g.isSuccess) {
            const { data: v } = g;
            l({ dataFilters: v, isFilterError: !1 });
          }
        } catch (g) {
          l({ filterErrorMsg: g.message, isFilterError: !0 });
        } finally {
          l({ isFilterLoading: !1 });
        }
      },
      clearData: () => l(() => ({
        data: [],
        pagination: { ...te },
        errorMsg: "",
        isError: !1,
        isLoading: !0
      }))
    }, w = {};
    return Object.keys(h).forEach((p) => {
      b[p] ? w[p] = b[p](l, x, h[p]) : w[p] = h[p];
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
      ...w,
      // Custom methods
      ...typeof y == "function" ? y(l, x) : y
    };
  });
}
export {
  br as AnimateSideText,
  le as Button,
  yr as Container,
  ir as DataTable,
  or as Delete,
  De as DownloadIcon,
  qr as EmailWithPost,
  ur as ErrorBoundary,
  Jr as ExportExcelSelectedDialog,
  Qr as FileDownloader,
  vr as FileInput,
  wr as FormField,
  xr as FormRow,
  oe as Get,
  sr as GetDetail,
  Re as ImageIcon,
  Xr as ImportExcel,
  dr as Loading,
  cr as ModalBox,
  Cr as MultiFileInput,
  pr as NavLinkItem,
  _r as PageLoader,
  ge as Post,
  zr as PostWithFormData,
  Gr as SearchIcon,
  Lr as SelectOption,
  gr as TextTruncator,
  Fe as Update,
  Kr as UpdateWithFormData,
  ie as UploadIcon,
  Hr as ValidateForm,
  Or as api,
  Vr as apiInstance,
  se as createApiClient,
  Yr as createCrudStore,
  tr as createDefaultRequestInterceptor,
  Ur as createSimpleRequestInterceptor,
  V as customAxios,
  Ce as defaultConfig,
  te as defaultPagination,
  G as errorResponse,
  jr as formatNumber,
  er as getErrorHandler,
  Ye as getSuccessHandler,
  Ar as getTableRowIndex,
  Ge as getTruncatedText,
  fe as mergeConfig,
  lr as perPageOptions,
  Q as sanitizeObject,
  Wr as seo,
  Qe as successResponse,
  Zr as useDebounce
};
//# sourceMappingURL=index.mjs.map
