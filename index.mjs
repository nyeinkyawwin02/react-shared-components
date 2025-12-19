import se from "axios";
import he from "sweetalert2";
import I, { Toaster as Ee } from "react-hot-toast";
import { useState as T, useEffect as Q, Component as De, useMemo as k, useRef as ye, useCallback as F } from "react";
import { jsxs as c, Fragment as J, jsx as r } from "react/jsx-runtime";
import n from "prop-types";
import { Table as Re, TableHeader as Me, TableColumn as Te, TableBody as fe, Spinner as X, TableRow as Be, TableCell as Se, Pagination as Pe, Button as q, Modal as oe, ModalContent as le, ModalHeader as ie, ModalBody as ce, ModalFooter as de, Select as xe, SelectItem as ee, Input as $e, Autocomplete as ke, AutocompleteItem as je } from "@nextui-org/react";
import { useLocation as Ie, Link as Oe } from "react-router-dom";
import * as Z from "xlsx";
import { saveAs as Ae } from "file-saver";
import { X as re, Upload as ge } from "lucide-react";
import { GiCancel as Ue } from "react-icons/gi";
import { BiPlusCircle as Ve } from "react-icons/bi";
import { create as ze } from "zustand";
const Er = (t) => new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(t), Dr = (t, e) => Number(t.page) * Number(t.limit) + e + 1 - Number(t.limit), _e = ({ text: t = "", limit: e = 20 }) => t.length > e ? t.slice(0, e) + "..." : t, qe = (t) => ({ status: !0, data: t }), H = (t = "", e) => ({ status: !1, message: t, data: e }), We = void 0, Rr = se.create({
  baseURL: We,
  headers: {
    "Content-Type": "application/json"
  }
}), Ke = (t) => (t.interceptors.request.use(
  (e) => {
    var o;
    const a = localStorage.getItem("@account_token"), s = localStorage.getItem("@account_authenticatedUser");
    let l = {};
    try {
      l = s ? JSON.parse(s) : {};
    } catch (m) {
      console.error("Error parsing user data:", m);
    }
    if (a) {
      e.headers.Authorization = `Bearer ${a}`;
      const m = ((o = l.relatedBranch) == null ? void 0 : o._id) || l.relatedBranch;
      m && (e.params = {
        ...e.params,
        relatedBranch: m
      }, ["post", "put", "patch"].includes(e.method) && (e.data instanceof FormData ? (e.data.has("relatedBranch") ? e.data.get("relatedBranch") || e.data.set("relatedBranch", m) : e.data.append("relatedBranch", m), !e.data.has("createdBy") || !e.data.get("createdBy") ? e.data.append("createdBy", l._id || l.id) : e.data.get("createdBy") || e.data.set("createdBy", l._id || l.id)) : e.data = {
        ...e.data,
        createdBy: l._id || l.id,
        relatedBranch: m
      }));
    }
    return e;
  },
  (e) => Promise.reject(e)
), t), U = (t = void 0) => {
  const e = se.create({
    baseURL: t,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Ke(e);
}, Mr = U(), te = async (t, e = {}, a = U()) => {
  var s, l;
  try {
    return (await a.get(t, { params: e })).data;
  } catch (o) {
    return o.status == "404" ? {
      isSuccess: !0,
      data: []
    } : {
      success: !1,
      data: [],
      message: (l = (s = o == null ? void 0 : o.response) == null ? void 0 : s.data) == null ? void 0 : l.message
    };
  }
}, Tr = async (t, e, a, s, l = U()) => {
  await l.post(t, e, a).then(function(o) {
    return he.fire({
      title: "Successful!",
      text: `Check your ${s} for password!`,
      icon: "success",
      showConfirmButton: !1,
      timer: 4e3
    }), o.data.data;
  }).catch(function(o) {
    he.fire({
      title: "Something Wrong!",
      text: o.response.data.message,
      icon: "warning",
      showConfirmButton: !1,
      timer: 2e3
    });
  });
}, ue = async (t, e, a = {}, s, l = U()) => {
  try {
    const o = await l.post(t, e, a);
    return o.data.isSuccess && (t.split("?")[0] === "auth/login" ? I.success("Login successfully!") : I.success(`The ${s} had been created successfully!`)), o.data;
  } catch (o) {
    return I.error(o.response.data.message), H(o.response.data.message, []);
  }
}, Br = async (t, e, a = {}, s, l = U()) => await ue(
  t,
  e,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...a
  },
  s,
  l
), we = async (t, e, a, s, l, o = U()) => {
  try {
    const m = await o.put(t + e, a, s);
    return m.data.isSuccess ? I.success("Saved Your Changes!") : I.error("Something Wrong!"), m.data;
  } catch (m) {
    return I.error(m.response.data.message), H(m.response.data.message, []);
  }
}, Sr = async (t, e, a, s = {}, l, o = U()) => await we(
  t,
  e,
  a,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...s
  },
  l,
  o
), Ze = async (t, e, a = {}, s = U()) => await te(t + e, a, s), He = async (t, e, a, s = U()) => {
  try {
    return (await s.delete(t + e)).data.isSuccess && I.success(`The ${a} had been deleted successfully!`), !0;
  } catch (l) {
    return I.error(l.response.data.message), !1;
  }
}, Pr = (t) => {
  const e = [], a = [];
  if (t.forEach(
    ({
      condition: s,
      label: l,
      customMsg: o = "",
      isRequired: m = !1,
      isCustom: C = !1
    }) => {
      s && (m && e.push(l), C && a.push(o));
    }
  ), e.length > 0) {
    const s = `These field(s) are required to fill: ${e.join(", ")}`;
    return H(s);
  }
  if (a.length > 0) {
    const s = `Validation Error: ${a.join(`,
`)}`;
    return H(s);
  }
  return qe();
};
function be(t) {
  return typeof t == "string" ? t.trim() : t;
}
function G(t) {
  if (!t || typeof t != "object")
    return be(t);
  if (Array.isArray(t))
    return t.map((a) => G(a));
  const e = {};
  for (const [a, s] of Object.entries(t))
    e[a] = typeof s == "object" ? G(s) : be(s);
  return e;
}
const $r = (t = {}) => {
  t.title = t.title ? "CELC | " + t.title : "CELC", t.metaDescription = t.metaDescription || "School Management System Developed by Future Wave Team", document.title = t.title, document.querySelector('meta[name="description"]').setAttribute("content", t.metaDescription);
}, Y = {
  total: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 10
}, Ge = [10, 25, 50, 100];
function kr(t, e = 500) {
  const [a, s] = T(t);
  return Q(() => {
    const l = setTimeout(() => {
      s(t);
    }, e);
    return () => {
      clearTimeout(l);
    };
  }, [t, e]), a;
}
function Qe({
  columns: t = [],
  data: e = [],
  pagination: a = { total: 0, totalPages: 1 },
  filter: s = { page: 1, limit: 10 },
  isLoading: l = !1,
  isError: o = !1,
  errorMsg: m = "",
  onFilterChange: C,
  emptyMessage: E = "No data to display",
  ariaLabel: v = "Data Table"
}) {
  const i = (h) => {
    C({
      name: h.target.name,
      value: parseFloat(h.target.value)
    });
  }, b = (h) => {
    C({
      name: "page",
      value: parseFloat(h)
    });
  };
  return /* @__PURE__ */ c(J, { children: [
    /* @__PURE__ */ c("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ c("span", { className: "text-default-400 text-small", children: [
        "Total ",
        (a == null ? void 0 : a.total) || 0,
        " items"
      ] }),
      /* @__PURE__ */ c(
        "label",
        {
          htmlFor: "limit",
          className: "flex items-center text-default-400 text-small",
          children: [
            "Rows per page:",
            /* @__PURE__ */ r(
              "select",
              {
                id: "limit",
                name: "limit",
                className: "bg-transparent outline-none text-default-400 text-small",
                value: s.limit,
                onChange: i,
                children: Ge.map((h) => /* @__PURE__ */ r("option", { value: h, children: h }, h))
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c(
      Re,
      {
        isHeaderSticky: !0,
        "aria-label": v,
        bottomContent: /* @__PURE__ */ r("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ r(
          Pe,
          {
            isCompact: !0,
            showControls: !0,
            showShadow: !0,
            color: "primary",
            page: s.page,
            total: (a == null ? void 0 : a.totalPages) || 1,
            onChange: b
          }
        ) }),
        children: [
          /* @__PURE__ */ r(Me, { children: t.map((h) => /* @__PURE__ */ r(Te, { children: h.label }, h.key)) }),
          l ? /* @__PURE__ */ r(fe, { emptyContent: /* @__PURE__ */ r(X, {}) }) : /* @__PURE__ */ r(fe, { emptyContent: o ? m : E, children: e == null ? void 0 : e.map((h, g) => /* @__PURE__ */ r(Be, { children: t.map((p) => /* @__PURE__ */ r(Se, { children: p.render ? p.render(h, g) : h[p.key] }, p.key)) }, h._id || g)) })
        ]
      }
    )
  ] });
}
Qe.propTypes = {
  columns: n.arrayOf(
    n.shape({
      key: n.string.isRequired,
      label: n.string.isRequired,
      render: n.func
    })
  ).isRequired,
  data: n.array,
  pagination: n.shape({
    total: n.number,
    totalPages: n.number
  }),
  filter: n.shape({
    page: n.number,
    limit: n.number
  }),
  isLoading: n.bool,
  isError: n.bool,
  errorMsg: n.string,
  onFilterChange: n.func.isRequired,
  emptyMessage: n.string,
  ariaLabel: n.string
};
const ae = (t) => {
  const {
    isLoading: e = !1,
    isDisabled: a = !1,
    className: s = "",
    label: l = "",
    children: o,
    ...m
  } = t;
  return /* @__PURE__ */ c(q, { className: `w-full ${s}`, disabled: a, ...m, children: [
    e ? /* @__PURE__ */ r(X, { color: "white" }) : l,
    o
  ] });
};
ae.propTypes = {
  isLoading: n.bool,
  isDisabled: n.bool,
  className: n.string,
  label: n.string,
  children: n.any
};
const Je = ({
  header: t = "Header",
  title: e = "Title",
  cancelText: a = "No",
  confirmText: s = "Yes",
  size: l = "lg",
  isOpen: o = !1,
  isBtnDisabled: m = !1,
  classNames: C = {},
  children: E,
  onClose: v,
  onKeyDown: i
}) => /* @__PURE__ */ r(
  oe,
  {
    backdrop: "blur",
    size: l,
    isOpen: o,
    onClose: v,
    closeButton: !0,
    classNames: C,
    children: /* @__PURE__ */ r(le, { children: () => /* @__PURE__ */ c(J, { children: [
      /* @__PURE__ */ r(ie, { className: "flex flex-col gap-1", children: t }),
      /* @__PURE__ */ c(ce, { children: [
        /* @__PURE__ */ r("p", { children: e }),
        E
      ] }),
      /* @__PURE__ */ c(de, { children: [
        /* @__PURE__ */ r(
          ae,
          {
            color: "default",
            variant: "light",
            onPress: v,
            isDisabled: m,
            children: a
          }
        ),
        /* @__PURE__ */ r(
          ae,
          {
            color: "danger",
            onKeyDown: i,
            onPress: i,
            isDisabled: m,
            children: s
          }
        )
      ] })
    ] }) })
  }
);
Je.propTypes = {
  header: n.string,
  title: n.string,
  cancelText: n.string,
  confirmText: n.string,
  size: n.string,
  isOpen: n.bool,
  isBtnDisabled: n.bool,
  classNames: n.any,
  children: n.any,
  onClose: n.func,
  onKeyDown: n.func
};
const Xe = ({ className: t = "" }) => /* @__PURE__ */ r("div", { className: `flex justify-center items-center ${t}`, children: /* @__PURE__ */ r(X, {}) });
Xe.propTypes = {
  className: n.string
};
class Ye extends De {
  constructor(e) {
    super(e), this.state = { hasError: !1, error: null };
  }
  static getDerivedStateFromError(e) {
    return { hasError: !0, error: e };
  }
  componentDidCatch(e, a) {
    console.error("Error caught by boundary:", e, a);
  }
  render() {
    var e;
    return this.state.hasError ? /* @__PURE__ */ r("div", { className: "flex items-center justify-center min-h-screen bg-gray-50", children: /* @__PURE__ */ c("div", { className: "text-center space-y-4 p-8 bg-white rounded-lg shadow-lg max-w-md", children: [
      /* @__PURE__ */ r("div", { className: "text-red-500 text-6xl", children: "⚠️" }),
      /* @__PURE__ */ r("h1", { className: "text-2xl font-bold text-gray-800", children: "Something went wrong" }),
      /* @__PURE__ */ r("p", { className: "text-gray-600", children: ((e = this.state.error) == null ? void 0 : e.message) || "An unexpected error occurred" }),
      /* @__PURE__ */ r(
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
Ye.propTypes = {
  children: n.node.isRequired
};
const er = "my-1 w-full p-3 flex items-center gap-2 border border-gray-200 text-base rounded-lg transition-all duration-300", rr = ({ path: t, title: e, icon: a }) => {
  const s = Ie(), l = k(() => {
    const o = s.pathname.split("?")[0].replace(/\/$/, ""), m = t.replace(/\/$/, "");
    return o === m || o.startsWith(m + "/") ? "bg-red-50 text-red-900 font-semibold border-red-900" : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-800 hover:border-red-200";
  }, [s.pathname, t]);
  return /* @__PURE__ */ c(Oe, { to: t, className: `${er} ${l}`, children: [
    a && /* @__PURE__ */ r("span", { className: "flex-shrink-0", children: a }),
    e && /* @__PURE__ */ r("span", { className: "truncate", children: e })
  ] });
};
rr.propTypes = {
  path: n.string.isRequired,
  title: n.string.isRequired,
  icon: n.node
};
function jr() {
  return /* @__PURE__ */ r("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ c("div", { className: "text-center space-y-4", children: [
    /* @__PURE__ */ r(X, { size: "lg", color: "primary" }),
    /* @__PURE__ */ r("p", { className: "text-gray-500 text-sm", children: "Loading..." })
  ] }) });
}
const ne = ({
  className: t = "w-6 h-6",
  filled: e = !1,
  ...a
}) => e ? /* @__PURE__ */ c(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    ...a,
    children: [
      /* @__PURE__ */ r(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.83366 18.3335C4.72859 18.3335 3.66878 17.8945 2.88738 17.1131C2.10598 16.3317 1.66699 15.2719 1.66699 14.1668V11.6668C1.66699 11.4458 1.75479 11.2339 1.91107 11.0776C2.06735 10.9213 2.27931 10.8335 2.50033 10.8335C2.72134 10.8335 2.9333 10.9213 3.08958 11.0776C3.24586 11.2339 3.33366 11.4458 3.33366 11.6668V14.1668C3.33366 14.8299 3.59705 15.4658 4.06589 15.9346C4.53473 16.4034 5.17062 16.6668 5.83366 16.6668H14.167C14.83 16.6668 15.4659 16.4034 15.9348 15.9346C16.4036 15.4658 16.667 14.8299 16.667 14.1668V11.6668C16.667 11.4458 16.7548 11.2339 16.9111 11.0776C17.0673 10.9213 17.2793 10.8335 17.5003 10.8335C17.7213 10.8335 17.9333 10.9213 18.0896 11.0776C18.2459 11.2339 18.3337 11.4458 18.3337 11.6668V14.1668C18.3337 15.2719 17.8947 16.3317 17.1133 17.1131C16.3319 17.8945 15.2721 18.3335 14.167 18.3335H5.83366Z",
          fill: "#2563EB"
        }
      ),
      /* @__PURE__ */ r(
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
    className: t,
    ...a,
    children: [
      /* @__PURE__ */ r(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.83366 18.3335C4.72859 18.3335 3.66878 17.8945 2.88738 17.1131C2.10598 16.3317 1.66699 15.2719 1.66699 14.1668V11.6668C1.66699 11.4458 1.75479 11.2339 1.91107 11.0776C2.06735 10.9213 2.27931 10.8335 2.50033 10.8335C2.72134 10.8335 2.9333 10.9213 3.08958 11.0776C3.24586 11.2339 3.33366 11.4458 3.33366 11.6668V14.1668C3.33366 14.8299 3.59705 15.4658 4.06589 15.9346C4.53473 16.4034 5.17062 16.6668 5.83366 16.6668H14.167C14.83 16.6668 15.4659 16.4034 15.9348 15.9346C16.4036 15.4658 16.667 14.8299 16.667 14.1668V11.6668C16.667 11.4458 16.7548 11.2339 16.9111 11.0776C17.0673 10.9213 17.2793 10.8335 17.5003 10.8335C17.7213 10.8335 17.9333 10.9213 18.0896 11.0776C18.2459 11.2339 18.3337 11.4458 18.3337 11.6668V14.1668C18.3337 15.2719 17.8947 16.3317 17.1133 17.1131C16.3319 17.8945 15.2721 18.3335 14.167 18.3335H5.83366Z",
          fill: "#2563EB"
        }
      ),
      /* @__PURE__ */ r(
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
), Ir = () => /* @__PURE__ */ c(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ r("g", { clipPath: "url(#clip0_131_4167)", children: /* @__PURE__ */ r(
        "path",
        {
          d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z",
          fill: "white"
        }
      ) }),
      /* @__PURE__ */ r("defs", { children: /* @__PURE__ */ r("clipPath", { id: "clip0_131_4167", children: /* @__PURE__ */ r("rect", { width: "24", height: "24", fill: "white" }) }) })
    ]
  }
), Ce = ({
  className: t = "w-6 h-6",
  filled: e = !1,
  ...a
}) => e ? /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: t,
    ...a,
    children: /* @__PURE__ */ r(
      "path",
      {
        fillRule: "evenodd",
        d: "M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z",
        clipRule: "evenodd"
      }
    )
  }
) : /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: t,
    ...a,
    children: /* @__PURE__ */ r(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      }
    )
  }
), ve = ({ className: t = "w-6 h-6" }) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: t,
    children: /* @__PURE__ */ r(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      }
    )
  }
);
ne.propTypes = Ce.propTypes = ve.propTypes = {
  className: n.string,
  filled: n.bool
};
function tr(t, e) {
  const a = URL.createObjectURL(t), s = document.createElement("a");
  s.href = a, s.download = e, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(a);
}
function ar(t) {
  if (!t) return null;
  const e = t.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  return e && e[1] ? e[1].replace(/['"]/g, "") : null;
}
function Or({ url: t, className: e = "", file: a }) {
  const [s, l] = T(0), [o, m] = T(!1);
  async function C() {
    var v;
    m(!0), l(0);
    try {
      const i = await se.get(t, {
        responseType: "blob",
        onDownloadProgress: (g) => {
          if (g.lengthComputable || g.total) {
            const p = g.total || 0, f = p ? Math.round(g.loaded * 100 / p) : 0;
            l(f);
          } else
            l((p) => Math.min(p + 5, 99));
        }
      }), b = i.headers["content-disposition"] || i.headers["Content-Disposition"], h = ar(b) || new URL(t).pathname.split("/").pop() || "download";
      tr(i.data, h), l(100);
    } catch (i) {
      console.error("Download error", i);
      const b = (v = i == null ? void 0 : i.response) != null && v.data ? "Server responded with an error" : i.message || "Unknown error";
      alert(`Download failed: ${b}`);
    } finally {
      setTimeout(
        () => {
          m(!1), setTimeout(() => l(0), 300);
        },
        s >= 100 ? 600 : 200
      );
    }
  }
  const E = k(() => {
    var v;
    return a ? a instanceof File ? a.name || "" : ((v = Object.keys(a)) == null ? void 0 : v.length) > 0 ? a.originalname : "File name" : "File name";
  }, [a]);
  return /* @__PURE__ */ c("div", { className: `w-full max-w-sm ${e}`, children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        className: `w-full border-2 border-dotted border-[#2563EB] input-field-wrapper justify-between ${o ? "bg-slate-300 text-slate-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"} duration-300 transition`,
        onClick: C,
        disabled: o,
        "aria-live": "polite",
        "aria-busy": o,
        "aria-disabled": o,
        children: [
          /* @__PURE__ */ r("span", { className: "w-full cursor-pointer text-[#898989] flex justify-start items-center gap-3 bg-current truncate", children: o ? /* @__PURE__ */ c("span", { children: [
            "Downloading… ",
            s,
            "%"
          ] }) : E }),
          /* @__PURE__ */ r("span", { type: "button", children: /* @__PURE__ */ r(ve, {}) })
        ]
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: "mt-3 h-3 bg-slate-100 rounded-md overflow-hidden",
        "aria-hidden": !o,
        children: /* @__PURE__ */ r(
          "div",
          {
            className: "h-full rounded-md shadow-inner transform transition-all duration-200 ease-out",
            style: { width: `${o ? s : 0}%` }
          }
        )
      }
    )
  ] });
}
const nr = ({ text: t = "" }) => /* @__PURE__ */ r("p", { className: "cursor-help", title: t, children: _e({ text: t }) });
nr.propTypes = {
  text: n.string
};
const sr = ({
  condition: t = !0,
  text: e = "Text",
  className: a = ""
}) => /* @__PURE__ */ r(
  "span",
  {
    className: `${t ? "w-[100px] opacity-100" : "w-0 opacity-0"} text-wrap duration-700 transition-all overflow-hidden ${a}`,
    children: e
  }
);
sr.propTypes = {
  condition: n.bool,
  text: n.string,
  className: n.string
};
const or = ({ children: t }) => /* @__PURE__ */ c("div", { className: "w-[96%] mx-auto  p-4  rounded-lg", children: [
  /* @__PURE__ */ r(Ee, {}),
  t
] });
or.propTypes = {
  children: n.node.isRequired
};
const Ar = ({
  itemsToExport: t,
  onClose: e,
  onExportSuccess: a
}) => {
  const [s, l] = T(!1), o = () => {
    l(!0);
    try {
      const m = [
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
      ], C = t.map((g) => [
        g.code,
        g.name,
        g.qty,
        g.fromUnit,
        g.toUnit,
        g.totalUnit,
        g.sellingMMK,
        g.purchaseMMK,
        g.unit,
        g.type,
        g.openingQty,
        g.purchaseQty,
        g.usedQty,
        g.closingQty,
        g.branch
      ]), E = [m, ...C], v = Z.utils.aoa_to_sheet(E), i = Z.utils.book_new();
      Z.utils.book_append_sheet(i, v, "Selected Inventory");
      const b = Z.write(i, { bookType: "xlsx", type: "array" }), h = new Blob([b], {
        type: "application/octet-stream"
      });
      Ae(h, "selected_inventory.xlsx"), a(t);
    } catch (m) {
      console.error("Error exporting Excel file:", m), alert("Failed to export Excel file. Please try again.");
    } finally {
      l(!1), e();
    }
  };
  return /* @__PURE__ */ r(oe, { isOpen: !0, onClose: e, children: /* @__PURE__ */ r(le, { children: (m) => /* @__PURE__ */ c(J, { children: [
    /* @__PURE__ */ r(ie, { className: "flex flex-col gap-1", children: "Export Selected Items" }),
    /* @__PURE__ */ c(ce, { children: [
      /* @__PURE__ */ c("p", { children: [
        "You are about to export ",
        /* @__PURE__ */ r("strong", { children: t.length }),
        " ",
        "selected items to an Excel file."
      ] }),
      /* @__PURE__ */ r("p", { children: "Do you want to proceed?" })
    ] }),
    /* @__PURE__ */ c(de, { children: [
      /* @__PURE__ */ r(
        q,
        {
          color: "danger",
          variant: "light",
          onPress: m,
          isDisabled: s,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ r(
        q,
        {
          color: "primary",
          onPress: o,
          isLoading: s,
          isDisabled: t.length === 0,
          children: s ? "Exporting..." : "Export"
        }
      )
    ] })
  ] }) }) });
}, Ur = ({ onClose: t, onImportSuccess: e }) => {
  const [a, s] = T(null), [l, o] = T(""), [m, C] = T(""), [E, v] = T(!1), i = (h) => {
    const g = h.target.files[0];
    s(g);
  }, b = () => {
  };
  return /* @__PURE__ */ r(oe, { isOpen: !0, onClose: t, children: /* @__PURE__ */ r(le, { children: (h) => /* @__PURE__ */ c(J, { children: [
    /* @__PURE__ */ r(ie, { className: "flex flex-col gap-1", children: "Import from Excel" }),
    /* @__PURE__ */ c(ce, { children: [
      /* @__PURE__ */ c(
        xe,
        {
          variant: "bordered",
          label: "Select",
          placeholder: "Select Type",
          className: "mb-4",
          children: [
            /* @__PURE__ */ r(ee, { value: "product", children: "Product" }, "product"),
            /* @__PURE__ */ r(ee, { value: "item", children: "Items" }, "item")
          ]
        }
      ),
      /* @__PURE__ */ r(
        $e,
        {
          type: "file",
          variant: "bordered",
          label: "Select Excel File",
          onChange: i,
          accept: ".xlsx, .xls"
        }
      ),
      l && /* @__PURE__ */ c("p", { className: "text-gray-600 text-sm mt-2", children: [
        "Selected: ",
        l
      ] })
    ] }),
    /* @__PURE__ */ c(de, { children: [
      /* @__PURE__ */ r(
        q,
        {
          color: "danger",
          variant: "light",
          onPress: h,
          isDisabled: E,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ r(
        q,
        {
          color: "primary",
          onPress: b,
          isLoading: E,
          isDisabled: !a,
          children: "Import"
        }
      )
    ] })
  ] }) }) });
}, lr = ({ children: t, className: e = "" }) => /* @__PURE__ */ r("div", { className: `w-full ${e}`, children: t });
lr.propTypes = {
  children: n.any,
  className: n.string
};
const ir = ({ children: t, className: e = "" }) => /* @__PURE__ */ r("div", { className: `grid grid-cols-1 md:grid-cols-2 gap-4 ${e}`, children: t });
ir.propTypes = {
  children: n.any,
  className: n.string
};
const cr = ({
  label: t = "File Upload",
  value: e,
  id: a,
  onChange: s,
  accept: l = "image/*",
  isDisabled: o = !1,
  showPreview: m = !0,
  maxSizeMB: C = 5,
  ...E
}) => {
  const [v, i] = T(null), [b, h] = T(""), [g, p] = T(!1), f = ye(0);
  Q(() => {
    if (!e) {
      i(null);
      return;
    }
    if (e instanceof File) {
      const x = URL.createObjectURL(e);
      return i(x), () => URL.revokeObjectURL(x);
    }
    e != null && e.url && i(e.url);
  }, [e]);
  const y = k(() => e ? e instanceof File ? e.name : e != null && e.originalname ? e.originalname : "File uploaded" : null, [e]), N = k(() => e ? e instanceof File ? e.type.startsWith("image/") : e != null && e.originalname ? /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(e.originalname) : !1 : !1, [e]), P = F(
    (x) => {
      if (x.size / 1048576 > C)
        return h(`File size must be less than ${C}MB`), !1;
      if (l && l !== "*") {
        const B = l.split(",").map((L) => L.trim()), u = x.type, M = "." + x.name.split(".").pop();
        if (!B.some((L) => L.endsWith("/*") ? u.startsWith(L.replace("/*", "")) : L === u || L === M))
          return h(`File type not accepted. Accepted: ${l}`), !1;
      }
      return h(""), !0;
    },
    [l, C]
  ), V = F(
    (x) => {
      var B;
      const R = (B = x.target.files) == null ? void 0 : B[0];
      R && P(R) && s({ name: x.target.name, value: R });
    },
    [s, P]
  ), O = F(
    (x) => {
      x.stopPropagation(), i(null), h(""), s({ name: a, value: null });
      const R = document.getElementById(a);
      R && (R.value = "");
    },
    [s, a]
  ), W = F((x) => {
    x.preventDefault(), x.stopPropagation(), f.current++, x.dataTransfer.items && x.dataTransfer.items.length > 0 && p(!0);
  }, []), $ = F((x) => {
    x.preventDefault(), x.stopPropagation(), f.current--, f.current === 0 && p(!1);
  }, []), z = F((x) => {
    x.preventDefault(), x.stopPropagation();
  }, []), A = F(
    (x) => {
      if (x.preventDefault(), x.stopPropagation(), p(!1), f.current = 0, o) return;
      const R = x.dataTransfer.files;
      if (R && R.length > 0) {
        const B = R[0];
        P(B) && s({ name: a, value: B });
      }
    },
    [o, s, a, P]
  );
  return /* @__PURE__ */ c("div", { className: "space-y-3", children: [
    /* @__PURE__ */ r(
      "div",
      {
        onDragEnter: W,
        onDragOver: z,
        onDragLeave: $,
        onDrop: A,
        className: `
          relative border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${o ? "opacity-50 cursor-not-allowed bg-default-50" : "cursor-pointer hover:border-primary-400"}
          ${g && !o ? "border-primary-500 bg-primary-50 scale-[1.02] shadow-lg" : b ? "border-danger bg-danger-50/30" : e ? "border-success-300 bg-success-50/30" : "border-default-300 bg-white"}
        `,
        children: /* @__PURE__ */ c(
          "label",
          {
            htmlFor: a,
            className: `
            relative block w-full p-6
            ${o ? "cursor-not-allowed" : "cursor-pointer"}
          `,
            children: [
              g && !o && /* @__PURE__ */ c("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-xl z-10 pointer-events-none", children: [
                /* @__PURE__ */ r(ne, { className: "w-12 h-12 text-primary-500 animate-bounce" }),
                /* @__PURE__ */ r("p", { className: "text-primary-600 font-semibold mt-3", children: "Drop your file here" })
              ] }),
              e ? /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ c("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
                  /* @__PURE__ */ r("div", { className: "p-2 rounded-lg bg-success-100", children: /* @__PURE__ */ r(Ce, { className: "w-6 h-6 text-success-600" }) }),
                  /* @__PURE__ */ c("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ r("p", { className: "text-sm font-medium text-default-700 truncate", children: y }),
                    /* @__PURE__ */ r("p", { className: "text-xs text-default-500", children: "Ready to upload" })
                  ] })
                ] }),
                /* @__PURE__ */ r(
                  "button",
                  {
                    type: "button",
                    onClick: O,
                    disabled: o,
                    className: `
                  p-2 rounded-lg hover:bg-danger-50 
                  text-danger-500 transition-all
                  hover:scale-110 transform
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex-shrink-0
                `,
                    "aria-label": "Remove file",
                    children: /* @__PURE__ */ r(re, { className: "w-5 h-5" })
                  }
                )
              ] }) : /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center gap-3 py-4", children: [
                /* @__PURE__ */ r("div", { className: "p-4 rounded-full bg-default-100", children: /* @__PURE__ */ r(ne, { className: "w-8 h-8 text-default-500" }) }),
                /* @__PURE__ */ c("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ r("p", { className: "text-base font-semibold text-default-700", children: t }),
                  /* @__PURE__ */ c("p", { className: "text-sm text-default-500", children: [
                    "Drag and drop or",
                    " ",
                    /* @__PURE__ */ r("span", { className: "text-primary-500 font-medium", children: "browse" })
                  ] }),
                  /* @__PURE__ */ r("p", { className: "text-xs text-default-400", children: l === "image/*" ? `PNG, JPG, GIF, WEBP up to ${C}MB` : `Max file size: ${C}MB` })
                ] })
              ] }),
              /* @__PURE__ */ r(
                "input",
                {
                  id: a,
                  name: a,
                  type: "file",
                  onChange: V,
                  className: "hidden",
                  accept: l,
                  disabled: o,
                  "aria-describedby": b ? `${a}-error` : void 0,
                  ...E
                }
              )
            ]
          }
        )
      }
    ),
    b && /* @__PURE__ */ c("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-danger-50 border border-danger-200", children: [
      /* @__PURE__ */ r(
        "svg",
        {
          className: "w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          children: /* @__PURE__ */ r(
            "path",
            {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
              clipRule: "evenodd"
            }
          )
        }
      ),
      /* @__PURE__ */ r("p", { id: `${a}-error`, className: "text-sm text-danger-700 font-medium", children: b })
    ] }),
    m && v && N && /* @__PURE__ */ c("div", { className: "relative rounded-xl overflow-hidden border-2 border-default-200 group", children: [
      /* @__PURE__ */ r(
        "img",
        {
          src: v,
          alt: "Preview",
          className: "w-full h-64 object-cover",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ c("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300", children: [
        /* @__PURE__ */ r("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: /* @__PURE__ */ r("p", { className: "text-white text-sm font-medium truncate", children: y }) }),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: O,
            disabled: o,
            className: `
                absolute top-3 right-3 p-2 rounded-full 
                bg-danger-500 text-white shadow-xl
                hover:bg-danger-600 hover:scale-110
                transform transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `,
            "aria-label": "Remove image",
            children: /* @__PURE__ */ r(re, { className: "w-5 h-5" })
          }
        )
      ] })
    ] })
  ] });
};
cr.propTypes = {
  label: n.string,
  value: n.oneOfType([n.instanceOf(File), n.object]),
  id: n.string.isRequired,
  onChange: n.func.isRequired,
  accept: n.string,
  isDisabled: n.bool,
  showPreview: n.bool,
  maxSizeMB: n.number
};
const dr = ({
  label: t = "Upload Images",
  value: e = [],
  id: a,
  onChange: s,
  accept: l = "image/*",
  isDisabled: o = !1,
  maxFiles: m = 10,
  maxSizeMB: C = 5,
  ...E
}) => {
  const [v, i] = T([]), [b, h] = T(""), [g, p] = T(!1), f = ye(0);
  Q(() => {
    if (!e || e.length === 0) {
      i([]);
      return;
    }
    const u = [], M = [];
    return e.forEach((w, L) => {
      if (w instanceof File) {
        const S = URL.createObjectURL(w);
        u.push({
          id: `${w.name}-${L}`,
          url: S,
          name: w.name,
          size: w.size,
          type: w.type
        }), M.push(() => URL.revokeObjectURL(S));
      } else w != null && w.url && u.push({
        id: w._id || `existing-${L}`,
        url: w.url,
        name: w.originalname || w.name,
        size: w.size,
        type: w.mimetype || w.type
      });
    }), i(u), () => {
      M.forEach((w) => w());
    };
  }, [e]);
  const y = F(
    (u) => {
      if (u.size / 1048576 > C)
        return h(`File "${u.name}" is too large. Max size: ${C}MB`), !1;
      if (l && l !== "*") {
        const w = l.split(",").map((j) => j.trim()), L = u.type, S = "." + u.name.split(".").pop();
        if (!w.some((j) => j.endsWith("/*") ? L.startsWith(j.replace("/*", "")) : j === L || j === S))
          return h(`File "${u.name}" type not accepted`), !1;
      }
      return !0;
    },
    [l, C]
  ), N = F(
    (u) => {
      const M = Array.isArray(e) ? e : [], w = Array.from(u);
      if (M.length + w.length > m) {
        h(`Maximum ${m} files allowed`);
        return;
      }
      const L = w.filter((S) => y(S));
      if (L.length > 0) {
        h("");
        const S = [...M, ...L];
        s({ name: a, value: S });
      }
    },
    [e, a, s, m, y]
  ), P = F(
    (u) => {
      u.target.files && u.target.files.length > 0 && N(u.target.files);
    },
    [N]
  ), V = F(
    (u, M) => {
      M.stopPropagation();
      const L = (Array.isArray(e) ? e : []).filter(
        (S, K) => K !== u
      );
      if (s({ name: a, value: L }), h(""), L.length === 0) {
        const S = document.getElementById(a);
        S && (S.value = "");
      }
    },
    [e, s, a]
  ), O = F(
    (u) => {
      u.stopPropagation(), s({ name: a, value: [] }), h("");
      const M = document.getElementById(a);
      M && (M.value = "");
    },
    [s, a]
  ), W = F((u) => {
    u.preventDefault(), u.stopPropagation(), f.current++, u.dataTransfer.items && u.dataTransfer.items.length > 0 && p(!0);
  }, []), $ = F((u) => {
    u.preventDefault(), u.stopPropagation(), f.current--, f.current === 0 && p(!1);
  }, []), z = F((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), A = F(
    (u) => {
      u.preventDefault(), u.stopPropagation(), p(!1), f.current = 0, !o && u.dataTransfer.files && u.dataTransfer.files.length > 0 && N(u.dataTransfer.files);
    },
    [o, N]
  ), x = (u) => {
    if (u === 0) return "0 Bytes";
    const M = 1024, w = ["Bytes", "KB", "MB", "GB"], L = Math.floor(Math.log(u) / Math.log(M));
    return Math.round(u / Math.pow(M, L) * 100) / 100 + " " + w[L];
  }, R = Array.isArray(e) ? e.length : 0, B = m - R;
  return /* @__PURE__ */ c("div", { className: "space-y-3", children: [
    /* @__PURE__ */ r(
      "div",
      {
        onDragEnter: W,
        onDragOver: z,
        onDragLeave: $,
        onDrop: A,
        className: `
          relative border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${o || B === 0 ? "opacity-50 cursor-not-allowed bg-default-50" : "cursor-pointer hover:border-primary-400"}
          ${g && !o && B > 0 ? "border-primary-500 bg-primary-50 scale-[1.02] shadow-lg" : b ? "border-danger bg-danger-50/30" : R > 0 ? "border-success-300 bg-success-50/30" : "border-default-300 bg-white"}
        `,
        children: /* @__PURE__ */ c(
          "label",
          {
            htmlFor: a,
            className: `
            relative block w-full p-6
            ${o || B === 0 ? "cursor-not-allowed" : "cursor-pointer"}
          `,
            children: [
              g && !o && B > 0 && /* @__PURE__ */ c("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-primary-500/10 rounded-xl z-10 pointer-events-none", children: [
                /* @__PURE__ */ r(ge, { className: "w-12 h-12 text-primary-500 animate-bounce" }),
                /* @__PURE__ */ r("p", { className: "text-primary-600 font-semibold mt-3", children: "Drop your files here" })
              ] }),
              /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center gap-3 py-4", children: [
                /* @__PURE__ */ r("div", { className: "p-4 rounded-full bg-default-100", children: /* @__PURE__ */ r(ge, { className: "w-8 h-8 text-default-500" }) }),
                /* @__PURE__ */ c("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ r("p", { className: "text-base font-semibold text-default-700", children: t }),
                  /* @__PURE__ */ c("p", { className: "text-sm text-default-500", children: [
                    "Drag and drop or",
                    " ",
                    /* @__PURE__ */ r("span", { className: "text-primary-500 font-medium", children: "browse" })
                  ] }),
                  /* @__PURE__ */ r("p", { className: "text-xs text-default-400", children: l === "image/*" ? `PNG, JPG, GIF, WEBP up to ${C}MB each` : `Max ${C}MB per file` }),
                  /* @__PURE__ */ c("p", { className: "text-xs font-medium text-default-600 mt-2", children: [
                    R,
                    " / ",
                    m,
                    " files selected"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ r(
                "input",
                {
                  id: a,
                  name: a,
                  type: "file",
                  onChange: P,
                  className: "hidden",
                  accept: l,
                  disabled: o || B === 0,
                  multiple: !0,
                  "aria-describedby": b ? `${a}-error` : void 0,
                  ...E
                }
              )
            ]
          }
        )
      }
    ),
    b && /* @__PURE__ */ c("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-danger-50 border border-danger-200", children: [
      /* @__PURE__ */ r(
        "svg",
        {
          className: "w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          children: /* @__PURE__ */ r(
            "path",
            {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
              clipRule: "evenodd"
            }
          )
        }
      ),
      /* @__PURE__ */ r("p", { id: `${a}-error`, className: "text-sm text-danger-700 font-medium", children: b })
    ] }),
    v.length > 0 && /* @__PURE__ */ c("div", { className: "space-y-3", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ c("h4", { className: "text-sm font-semibold text-default-700", children: [
          "Selected Files (",
          v.length,
          ")"
        ] }),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: O,
            disabled: o,
            className: "text-xs text-danger-500 hover:text-danger-600 font-medium transition-colors disabled:opacity-50",
            children: "Clear All"
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: v.map((u, M) => /* @__PURE__ */ r(
        "div",
        {
          className: "relative group rounded-xl overflow-hidden border-2 border-default-200 bg-white hover:border-primary-300 transition-all",
          children: /* @__PURE__ */ c("div", { className: "aspect-square relative", children: [
            /* @__PURE__ */ r(
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
                /* @__PURE__ */ r("p", { className: "text-white text-xs font-medium truncate", children: u.name }),
                /* @__PURE__ */ r("p", { className: "text-white/80 text-xs", children: x(u.size) })
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: (w) => V(M, w),
                  disabled: o,
                  className: `
                        absolute top-2 right-2 p-1.5 rounded-full 
                        bg-danger-500 text-white shadow-xl
                        hover:bg-danger-600 hover:scale-110
                        transform transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `,
                  "aria-label": `Remove ${u.name}`,
                  children: /* @__PURE__ */ r(re, { className: "w-4 h-4" })
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
dr.propTypes = {
  label: n.string,
  value: n.array,
  id: n.string.isRequired,
  onChange: n.func.isRequired,
  accept: n.string,
  isDisabled: n.bool,
  maxFiles: n.number,
  maxSizeMB: n.number
};
const ur = (t, e) => {
  const [a, s] = T(t);
  return Q(() => {
    const l = setTimeout(() => {
      s(t);
    }, e);
    return () => {
      clearTimeout(l);
    };
  }, [t, e]), [a];
}, mr = (t) => {
  const {
    className: e = {},
    value: a = "",
    options: s = [],
    optionValue: l = "value",
    optionLabel: o = "label",
    onChange: m,
    isCustomOptionLabel: C = !1,
    customLabelFunc: E = () => {
    },
    type: v = "select",
    isSearchable: i = !1,
    isAddable: b = !1,
    addURL: h = "",
    needSort: g = !0,
    selectionMode: p = "single",
    onRemove: f = () => {
    },
    ...y
  } = t, [N, P] = T(""), [V] = ur(N, 300), [O, W] = T(""), $ = F(
    (d) => typeof d == "string" ? d : C ? E(d) : d[o] || "",
    [o, C, E]
  ), z = F(
    (d) => typeof d == "string" ? d : d[l] || d._id || d.id || d.value,
    [l]
  ), A = k(() => !s || s.length === 0 ? [] : g ? [...s].sort((d, D) => {
    const _ = $(d), Fe = $(D);
    return _.localeCompare(Fe, void 0, { sensitivity: "base" });
  }) : [...s], [s, g, $]), x = k(() => {
    if (!V.trim()) return null;
    try {
      return new RegExp(V.trim().split("").join(".*"), "i");
    } catch {
      return new RegExp(
        V.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }
  }, [V]), R = k(() => !i || !x ? A : A.filter((d) => {
    const D = $(d);
    return x.test(D);
  }), [A, x, i, $]), B = k(() => v === "autocomplete" && b && R.length === 0 && N.trim() && h, [v, b, R.length, N, h]), u = k(() => {
    const d = R.map((D) => ({
      key: z(D),
      label: $(D),
      option: D,
      isCreateOption: !1
    }));
    return B && d.push({
      key: "create-new",
      label: `Create New: ${N.trim()}`,
      option: N.trim(),
      isCreateOption: !0
    }), d;
  }, [
    R,
    B,
    N,
    z,
    $
  ]), M = F(
    (d) => {
      m({ name: d.target.name, value: d.target.value });
    },
    [m]
  ), w = F(async () => {
    if (!h || !N.trim()) return !1;
    try {
      return await ue(
        h,
        {
          name: N.trim()
        },
        {},
        "value"
      );
    } catch (d) {
      return console.error("Error creating at ", h, d), { isSuccess: !1 };
    }
  }, [h, N]), L = F(
    async (d, D) => {
      if (D === "create-new") {
        const _ = await w();
        _.isSuccess && (d.value = _.data._id, d.needRefresh = !0);
      }
      P(""), m(d);
    },
    [w, m]
  ), S = F(
    (d) => {
      if (v === "autocomplete")
        if (p === "multiple")
          if (d == "create-new") {
            const D = {
              name: y.name,
              value: N
            };
            L(D, d);
          } else
            W(d);
        else {
          const D = {
            name: y.name,
            value: d
          };
          L(D, d);
        }
    },
    [y.name, p, v, N, L]
  ), K = F((d) => {
    P(d);
  }, []), j = k(() => Array.isArray(a) ? a : [a], [a, p]), me = k(
    () => ({
      trigger: "bg-white border-gray-300 hover:border-gray-400",
      popoverContent: "bg-white border border-gray-200 shadow-lg",
      listbox: "bg-white",
      base: "bg-white",
      ...typeof e == "object" ? e : {}
    }),
    [e]
  ), pe = k(() => {
    const { name: d, ...D } = y;
    return {
      variant: "bordered",
      selectedKeys: j,
      name: d,
      selectionMode: p,
      ...D
    };
  }, [j, p, y]), Ne = () => {
    const d = {
      name: y.name,
      value: O
    };
    L(d, O);
  }, Le = (d) => {
    const D = A.findIndex(
      (_) => z(_) == d
    );
    return D != -1 ? $(A[D]) : "Not Set";
  };
  return v === "autocomplete" ? /* @__PURE__ */ c("div", { className: `${b && h ? "flex flex-col gap-3" : ""}`, children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: `${b && h ? "flex gap-3 items-end justify-between" : ""}`,
        children: [
          /* @__PURE__ */ r(
            ke,
            {
              label: "Search options",
              placeholder: "Search or Choose options",
              allowsCustomValue: !0,
              classNames: me,
              onInputChange: K,
              onSelectionChange: S,
              items: u,
              ...pe,
              children: (d) => /* @__PURE__ */ r(
                je,
                {
                  className: "hover:bg-gray-50",
                  textValue: d.label,
                  children: d.isCreateOption ? /* @__PURE__ */ c("span", { children: [
                    "Create New: ",
                    /* @__PURE__ */ r("strong", { children: d.option })
                  ] }) : d.label || "Not Set"
                },
                d.key
              )
            }
          ),
          b && h && /* @__PURE__ */ c(
            q,
            {
              className: "flex gap-2 items-center justify-between py-6 font-semibold",
              disabled: !O,
              onPress: () => O && Ne(),
              children: [
                /* @__PURE__ */ r(Ve, {}),
                " Add"
              ]
            }
          )
        ]
      }
    ),
    p == "multiple" && j.length > 0 && /* @__PURE__ */ r("div", { className: "flex gap-3 items-center flex-wrap", children: j.map((d, D) => /* @__PURE__ */ c(
      "div",
      {
        className: "flex items-center gap-3 p-2 text-sm rounded-lg border-2",
        children: [
          /* @__PURE__ */ r("p", { children: Le(d) }),
          /* @__PURE__ */ r(
            "span",
            {
              className: "hover:cursor-pointer",
              onClick: () => f(D),
              children: /* @__PURE__ */ r(Ue, {})
            }
          )
        ]
      },
      D + "-" + d
    )) })
  ] }) : /* @__PURE__ */ r(
    xe,
    {
      classNames: me,
      onChange: M,
      items: u,
      ...pe,
      children: (d) => /* @__PURE__ */ r(
        ee,
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
mr.propTypes = {
  className: n.oneOfType([n.string, n.object]),
  value: n.any,
  options: n.array,
  optionValue: n.string,
  optionLabel: n.string,
  onChange: n.func.isRequired,
  isCustomOptionLabel: n.bool,
  customLabelFunc: n.func,
  type: n.oneOf(["select", "autocomplete"]),
  isSearchable: n.bool,
  isAddable: n.bool,
  addURL: n.string,
  needSort: n.bool,
  selectionMode: n.oneOf(["single", "multiple"]),
  onRemove: n.func
};
function Vr({
  entityName: t,
  baseUrl: e,
  listUrl: a,
  defaultForm: s = {},
  defaultFilter: l = { keyword: "", limit: 10, page: 1 },
  validateForm: o,
  preparePayload: m = (i) => i,
  transformFetchedData: C = (i) => i,
  customMethods: E = {},
  overrides: v = {}
}) {
  return ze((i, b) => {
    const h = {
      // Filter management
      setFilter: (p, f) => i(() => ({
        filter: {
          ...b().filter,
          [p]: f
        }
      })),
      clearFilter: () => i(() => ({
        filter: { ...l }
      })),
      // Form management
      setForm: ({ name: p, value: f }) => i(() => ({
        form: {
          ...b().form,
          [p]: f
        }
      })),
      setEditData: (p) => i(() => ({
        editData: p,
        form: p
      })),
      clearFormData: () => i(() => ({
        editData: {},
        formErrors: {},
        form: { ...s },
        isFormError: !1,
        isFormLoading: !1
      })),
      // Data operations
      fetchData: async (p = {}) => {
        b().clearData(), i({ isLoading: !0 });
        try {
          const f = await te(a, p);
          if (f.isSuccess) {
            const { data: y, pagination: N } = f;
            i({
              data: y,
              pagination: N || { ...Y }
            });
          }
        } catch (f) {
          i({ errorMsg: f.message, isError: !0 });
        } finally {
          i({ isLoading: !1 });
        }
      },
      createRecord: async (p) => {
        if (o) {
          const f = o(p);
          if (f) {
            i({ formErrors: f, isFormError: !0 });
            const y = typeof f == "object" ? Object.values(f)[0] : "Validation failed";
            return I.error(y), !1;
          }
        }
        i({ isFormLoading: !0 });
        try {
          const f = G(p), y = m(f), N = await ue(e, y, {}, t);
          return N.isSuccess ? (i({
            data: [...b().data, N.data],
            isFormError: !1,
            isFormLoading: !1
          }), !0) : (i({
            formErrors: N.errors,
            isFormError: !0,
            isFormLoading: !1
          }), !1);
        } catch (f) {
          return i({ formErrors: f, isFormError: !0, isFormLoading: !1 }), !1;
        }
      },
      fetchRecord: async (p) => {
        b().clearData(), i({ isLoading: !0 });
        try {
          const f = await Ze(e, p);
          if (f.isSuccess) {
            const y = C(f.data);
            i({
              editData: { ...y },
              form: { ...y }
            });
          } else
            i({ isError: !0, errorMsg: f.message });
        } catch (f) {
          return i({ isError: !0, errorMsg: f.message }), !1;
        } finally {
          i({ isLoading: !1 });
        }
      },
      updateRecord: async (p, f) => {
        if (o) {
          const y = o(f);
          if (y) {
            i({ formErrors: y, isFormError: !0 });
            const N = typeof y == "object" ? Object.values(y)[0] : "Validation failed";
            return I.error(N), !1;
          }
        }
        i({ isFormLoading: !0 });
        try {
          const y = G(f), N = m(y), P = await we(e, p, N, {}, t);
          return P.isSuccess ? (i({ isFormError: !1, isFormLoading: !1 }), !0) : (i({
            formErrors: P.errors,
            isFormError: !0,
            isFormLoading: !1
          }), !1);
        } catch (y) {
          return i({ formErrors: y, isFormError: !0, isFormLoading: !1 }), !1;
        }
      },
      deleteRecord: async (p) => {
        i({ isDeleting: !0 });
        try {
          return await He(e, p, t), i({ isDeleting: !1 }), !0;
        } catch {
          return i({ isDeleting: !1 }), !1;
        }
      },
      fetchDataOptions: async (p = {}) => {
        i({ isFilterLoading: !0, dataFilters: [], isFilterError: !0 });
        try {
          const f = await te(a + "/filter-options", p);
          if (f.isSuccess) {
            const { data: y } = f;
            i({ dataFilters: y, isFilterError: !1 });
          }
        } catch (f) {
          i({ filterErrorMsg: f.message, isFilterError: !0 });
        } finally {
          i({ isFilterLoading: !1 });
        }
      },
      clearData: () => i(() => ({
        data: [],
        pagination: { ...Y },
        errorMsg: "",
        isError: !1,
        isLoading: !0
      }))
    }, g = {};
    return Object.keys(h).forEach((p) => {
      v[p] ? g[p] = v[p](i, b, h[p]) : g[p] = h[p];
    }), {
      // State
      data: [],
      dataFilters: [],
      pagination: { ...Y },
      filter: { ...l },
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
      ...g,
      // Custom methods
      ...typeof E == "function" ? E(i, b) : E
    };
  });
}
export {
  sr as AnimateSideText,
  ae as Button,
  or as Container,
  Qe as DataTable,
  He as Delete,
  ve as DownloadIcon,
  Tr as EmailWithPost,
  Ye as ErrorBoundary,
  Ar as ExportExcelSelectedDialog,
  Or as FileDownloader,
  cr as FileInput,
  lr as FormField,
  ir as FormRow,
  te as Get,
  Ze as GetDetail,
  Ce as ImageIcon,
  Ur as ImportExcel,
  Xe as Loading,
  Je as ModalBox,
  dr as MultiFileInput,
  rr as NavLinkItem,
  jr as PageLoader,
  ue as Post,
  Br as PostWithFormData,
  Ir as SearchIcon,
  mr as SelectOption,
  nr as TextTruncator,
  we as Update,
  Sr as UpdateWithFormData,
  ne as UploadIcon,
  Pr as ValidateForm,
  Rr as api,
  Mr as apiInstance,
  Vr as createCrudStore,
  U as customAxios,
  Y as defaultPagination,
  H as errorResponse,
  Er as formatNumber,
  Dr as getTableRowIndex,
  _e as getTruncatedText,
  Ge as perPageOptions,
  G as sanitizeObject,
  $r as seo,
  qe as successResponse,
  kr as useDebounce
};
//# sourceMappingURL=index.mjs.map
