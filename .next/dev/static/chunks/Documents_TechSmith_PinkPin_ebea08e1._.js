(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/TechSmith/PinkPin/src/components/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtectedRoute",
    ()=>ProtectedRoute,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * ProtectedRoute - Route wrapper that checks authentication
 * Redirects unauthenticated users to login page with preserved return URL
 */ 'use client';
;
;
;
function ProtectedRoute({ children }) {
    _s();
    const { isAuthenticated, isLoading, validateToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Validate token on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            if (!isLoading && !isAuthenticated) {
                validateToken();
            }
        }
    }["ProtectedRoute.useEffect"], [
        isLoading,
        isAuthenticated,
        validateToken
    ]);
    // Redirect to login if not authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            if (!isLoading && !isAuthenticated) {
                const returnUrl = encodeURIComponent(pathname);
                router.push(`/login?returnTo=${returnUrl}`);
            }
        }
    }["ProtectedRoute.useEffect"], [
        isLoading,
        isAuthenticated,
        pathname,
        router
    ]);
    // Show loading state while checking authentication
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED0577] mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ProtectedRoute.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Checking authentication..."
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ProtectedRoute.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ProtectedRoute.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ProtectedRoute.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this);
    }
    // If not authenticated, don't render (redirect will happen)
    if (!isAuthenticated) {
        return null;
    }
    // Render protected content
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ProtectedRoute, "me9ItpU23wpukqFbq199sHBYYxY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ProtectedRoute;
const __TURBOPACK__default__export__ = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * Header - Navigation header with logo, user menu, and logout button
 * Responsive design for mobile, tablet, and desktop
 */ 'use client';
;
;
;
function Header({ onMenuToggle, isSidebarOpen }) {
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isUserMenuOpen, setIsUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const userMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close user menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            function handleClickOutside(event) {
                if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                    setIsUserMenuOpen(false);
                }
            }
            if (isUserMenuOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                return ({
                    "Header.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
                })["Header.useEffect"];
            }
        }
    }["Header.useEffect"], [
        isUserMenuOpen
    ]);
    const handleLogout = ()=>{
        logout();
        setIsUserMenuOpen(false);
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white shadow-sm sticky top-0 z-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center h-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onMenuToggle,
                                className: "md:hidden p-2 rounded-md text-gray-600 hover:text-[#ED0577] hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
                                "aria-label": "Toggle sidebar",
                                "aria-expanded": isSidebarOpen,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-[#ED0577] rounded-lg flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-bold text-lg",
                                            children: "P"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-xl font-bold text-[#ED0577]",
                                                children: "Pink Pin"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: "Merchant"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        ref: userMenuRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsUserMenuOpen(!isUserMenuOpen),
                                className: "flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:text-[#ED0577] hover:bg-gray-100 transition-colors min-h-[44px]",
                                "aria-label": "User menu",
                                "aria-expanded": isUserMenuOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-[#ED0577] rounded-full flex items-center justify-center text-white font-semibold text-sm",
                                        children: user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline text-sm font-medium text-gray-700",
                                        children: user?.name || user?.email
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: `w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`,
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            isUserMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 z-30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2 border-b border-[#E5E7EB]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900",
                                                children: user?.name || 'User'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: user?.email
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 118,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#ED0577] transition-colors min-h-[44px] flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 mr-2",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                                lineNumber: 128,
                                                columnNumber: 19
                                            }, this),
                                            "Logout"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Header, "B5ltb0cJzL86g2gN5EvyIdBypY4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * Sidebar - Navigation sidebar with links to main sections
 * Responsive design with mobile drawer and desktop sidebar
 */ 'use client';
;
;
const navLinks = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4V5"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: 'Order History',
        href: '/orders',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: 'Create Order',
        href: '/create-order',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 4v16m8-8H4"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }
];
function Sidebar({ isOpen = false, onClose }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = (href)=>{
        return pathname === href || pathname.startsWith(href + '/');
    };
    const handleLinkClick = ()=>{
        if (onClose) {
            onClose();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 md:hidden z-10",
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-[#E5E7EB] transform transition-transform duration-300 ease-in-out md:translate-x-0 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
                style: {
                    top: '64px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "p-4 space-y-2",
                    children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: link.href,
                            onClick: handleLinkClick,
                            className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${isActive(link.href) ? 'bg-[#ED0577] text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-[#ED0577]'}`,
                            "aria-current": isActive(link.href) ? 'page' : undefined,
                            children: [
                                link.icon,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: link.label
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, link.href, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Sidebar, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
const __TURBOPACK__default__export__ = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainLayout",
    ()=>MainLayout,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/Sidebar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * MainLayout - Layout component for authenticated pages
 * Includes header, sidebar navigation, and responsive layout
 * Responsive design: single column on mobile, sidebar + content on desktop
 */ 'use client';
;
;
;
function MainLayout({ children }) {
    _s();
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleMenuToggle = ()=>{
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleSidebarClose = ()=>{
        setIsSidebarOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                onMenuToggle: handleMenuToggle,
                isSidebarOpen: isSidebarOpen
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                        isOpen: isSidebarOpen,
                        onClose: handleSidebarClose
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 w-full md:w-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 sm:px-6 lg:px-8 py-8",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(MainLayout, "7pDpjxpt81vLgIcSls7O8aGkvA4=");
_c = MainLayout;
const __TURBOPACK__default__export__ = MainLayout;
var _c;
__turbopack_context__.k.register(_c, "MainLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/utils/calculations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Calculation utilities for distance and shipping fees
 */ __turbopack_context__.s([
    "calculateDistance",
    ()=>calculateDistance,
    "calculateShippingFee",
    ()=>calculateShippingFee,
    "formatCurrency",
    ()=>formatCurrency,
    "getShippingRates",
    ()=>getShippingRates,
    "isDistanceValid",
    ()=>isDistanceValid
]);
function calculateDistance(from, to) {
    const R = 6371 // Earth's radius in kilometers
    ;
    const dLat = (to.lat - from.lat) * Math.PI / 180;
    const dLng = (to.lng - from.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    // Round to 1 decimal place
    return Math.round(distance * 10) / 10;
}
function getShippingRates(serviceType) {
    switch(serviceType){
        case 'standard':
            return {
                baseFee: 10000,
                rate: 5000
            };
        case 'express':
            return {
                baseFee: 20000,
                rate: 7500
            };
        case 'same-day':
            return {
                baseFee: 30000,
                rate: 10000
            };
        default:
            return {
                baseFee: 10000,
                rate: 5000
            };
    }
}
function calculateShippingFee(distance, serviceType) {
    const { baseFee, rate } = getShippingRates(serviceType);
    const fee = baseFee + distance * rate;
    return Math.round(fee);
}
function isDistanceValid(distance) {
    return distance <= 3;
}
function formatCurrency(fee) {
    const formatted = (fee / 100).toFixed(2);
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/hooks/useAutoSave.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoSave",
    ()=>useAutoSave
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useAutoSave(data, options) {
    _s();
    const { interval = 30000, storageKey } = options;
    const [lastSavedTime, setLastSavedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Save data to localStorage
    const saveData = (dataToSave)=>{
        try {
            setIsSaving(true);
            localStorage.setItem(storageKey, JSON.stringify(dataToSave));
            setLastSavedTime(new Date());
            setIsSaving(false);
        } catch (error) {
            console.error('Failed to auto-save form data:', error);
            setIsSaving(false);
        }
    };
    // Restore data from localStorage
    const restoreData = ()=>{
        try {
            const stored = localStorage.getItem(storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to restore form data:', error);
            return null;
        }
    };
    // Clear saved data
    const clearSavedData = ()=>{
        try {
            localStorage.removeItem(storageKey);
            setLastSavedTime(null);
        } catch (error) {
            console.error('Failed to clear saved form data:', error);
        }
    };
    // Set up auto-save interval
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAutoSave.useEffect": ()=>{
            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Set new timeout for auto-save
            timeoutRef.current = setTimeout({
                "useAutoSave.useEffect": ()=>{
                    saveData(data);
                }
            }["useAutoSave.useEffect"], interval);
            // Cleanup on unmount
            return ({
                "useAutoSave.useEffect": ()=>{
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                }
            })["useAutoSave.useEffect"];
        }
    }["useAutoSave.useEffect"], [
        data,
        interval
    ]);
    return {
        lastSavedTime,
        isSaving,
        restoreData,
        clearSavedData,
        saveData
    };
}
_s(useAutoSave, "h9ee66lmO7W0+x5XYfKelu2EXhY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormAccordion",
    ()=>FormAccordion,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * FormAccordion - Collapsible accordion form component
 * Manages state for which section is open
 * Provides smooth transitions between sections
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
;
;
function FormAccordion({ sections, defaultOpenSection }) {
    _s();
    const [openSectionId, setOpenSectionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultOpenSection || sections[0]?.id || null);
    const toggleSection = (sectionId)=>{
        setOpenSectionId(openSectionId === sectionId ? null : sectionId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleSection(section.id),
                        className: "w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: section.title
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    section.isValid !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-2 h-2 rounded-full ${section.isValid ? 'bg-green-500' : 'bg-gray-300'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 20,
                                className: `text-gray-600 transition-transform ${openSectionId === section.id ? 'rotate-180' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this),
                    openSectionId === section.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-t border-gray-200 bg-gray-50 animate-in fade-in duration-200",
                        children: section.content
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this)
                ]
            }, section.id, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(FormAccordion, "/P7xgOtvxC6+7eWDuTwodCHmSDQ=");
_c = FormAccordion;
const __TURBOPACK__default__export__ = FormAccordion;
var _c;
__turbopack_context__.k.register(_c, "FormAccordion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/utils/googleMapsLoader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Google Maps API Loader Utility
 * Loads the Google Maps JavaScript API with the geometry library
 */ __turbopack_context__.s([
    "calculateDistance",
    ()=>calculateDistance,
    "createMap",
    ()=>createMap,
    "createMarker",
    ()=>createMarker,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getGoogleMaps",
    ()=>getGoogleMaps,
    "isGoogleMapsLoaded",
    ()=>isGoogleMapsLoaded,
    "loadGoogleMapsAPI",
    ()=>loadGoogleMapsAPI
]);
let loadPromise = null;
let isLoaded = false;
function loadGoogleMapsAPI(options) {
    if (isLoaded && window.google) {
        return Promise.resolve(window.google);
    }
    if (loadPromise) {
        return loadPromise;
    }
    const { apiKey, version = 'weekly', libraries = [
        'geometry'
    ] } = options;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&v=${version}`;
    script.async = true;
    script.defer = true;
    loadPromise = new Promise((resolve, reject)=>{
        // Set up global callback
        window.initGoogleMaps = ()=>{
            isLoaded = true;
            resolve(window.google);
        };
        script.onerror = ()=>{
            reject(new Error('Failed to load Google Maps API'));
        };
        document.head.appendChild(script);
    });
    return loadPromise;
}
function isGoogleMapsLoaded() {
    return isLoaded && !!window.google?.maps;
}
function getGoogleMaps() {
    return window.google || null;
}
function createMap(mapElement, options = {}) {
    const defaultOptions = {
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: 'greedy',
        ...options
    };
    return new google.maps.Map(mapElement, defaultOptions);
}
function createMarker(map, position, options = {}) {
    const defaultOptions = {
        map,
        position,
        clickable: true,
        ...options
    };
    return new google.maps.Marker(defaultOptions);
}
function calculateDistance(origin, destination) {
    if (!window.google?.maps?.geometry?.spherical) {
        // Fallback: haversine formula
        return haversineDistance(origin, destination);
    }
    const from = new google.maps.LatLng(origin.lat, origin.lng);
    const to = new google.maps.LatLng(destination.lat, destination.lng);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    // Convert meters to kilometers
    return distance / 1000;
}
/**
 * Haversine formula for calculating distance between two coordinates
 * Used as fallback when Geometry library is not available
 */ function haversineDistance(coord1, coord2) {
    const R = 6371 // Earth's radius in kilometers
    ;
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function toRad(deg) {
    return deg * (Math.PI / 180);
}
const __TURBOPACK__default__export__ = {
    loadGoogleMapsAPI,
    isGoogleMapsLoaded,
    getGoogleMaps,
    createMap,
    createMarker,
    calculateDistance
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/utils/geocoding.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "geocodeAddress",
    ()=>geocodeAddress,
    "reverseGeocodeCoordinates",
    ()=>reverseGeocodeCoordinates
]);
/**
 * Geocoding utility for converting addresses to coordinates
 * Provides fallback geocoding when map fails to load
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/googleMapsLoader.ts [app-client] (ecmascript)");
;
async function geocodeAddress(address) {
    if (!address || !address.trim()) {
        return Promise.reject({
            message: 'Please enter an address',
            code: 'EMPTY_ADDRESS'
        });
    }
    const google = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoogleMaps"])();
    if (!google?.maps?.Geocoder) {
        return Promise.reject({
            message: 'Geocoding service is not available. Please select a location on the map.',
            code: 'GEOCODER_NOT_AVAILABLE'
        });
    }
    return new Promise((resolve, reject)=>{
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address
        }, (results, status)=>{
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                const result = results[0];
                resolve({
                    coordinates: {
                        lat: result.geometry.location.lat(),
                        lng: result.geometry.location.lng()
                    },
                    formattedAddress: result.formatted_address
                });
            } else {
                reject({
                    message: `Unable to find address: "${address}". Please try a different address or select on the map.`,
                    code: status || 'GEOCODE_FAILED'
                });
            }
        });
    });
}
async function reverseGeocodeCoordinates(lat, lng) {
    const google = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoogleMaps"])();
    if (!google?.maps?.Geocoder) {
        return Promise.reject({
            message: 'Geocoding service is not available.',
            code: 'GEOCODER_NOT_AVAILABLE'
        });
    }
    return new Promise((resolve, reject)=>{
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            location: {
                lat,
                lng
            }
        }, (results, status)=>{
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                const result = results[0];
                resolve({
                    coordinates: {
                        lat,
                        lng
                    },
                    formattedAddress: result.formatted_address
                });
            } else {
                reject({
                    message: 'Unable to determine address for this location.',
                    code: status || 'REVERSE_GEOCODE_FAILED'
                });
            }
        });
    });
}
const __TURBOPACK__default__export__ = {
    geocodeAddress,
    reverseGeocodeCoordinates
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapContainer",
    ()=>MapContainer,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * MapContainer - Interactive Google Map component
 * Displays a map centered on outlet coordinates with zoom level 15
 * Handles map load errors with fallback address input and geocoding
 * Responsive design for mobile devices
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/googleMapsLoader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$geocoding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/geocoding.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function MapContainer({ outlet, deliveryCoordinates, onDeliveryLocationSelect, apiKey = ("TURBOPACK compile-time value", "") || '', className = '' }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const outletMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const deliveryMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const routeLineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [distance, setDistance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fallbackAddress, setFallbackAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isGeocoding, setIsGeocoding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [geocodingError, setGeocodingError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Initialize map
    const initializeMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[initializeMap]": async ()=>{
            if (!mapRef.current) return;
            try {
                setIsLoading(true);
                setError(null);
                // Check if already loaded
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGoogleMapsLoaded"])()) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadGoogleMapsAPI"])({
                        apiKey,
                        libraries: [
                            'geometry'
                        ]
                    });
                }
                const google = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoogleMaps"])();
                if (!google) {
                    throw new Error('Google Maps failed to initialize');
                }
                // Create map instance centered on outlet
                const mapOptions = {
                    center: {
                        lat: outlet.coordinates.lat,
                        lng: outlet.coordinates.lng
                    },
                    zoom: 15,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true,
                    gestureHandling: 'greedy',
                    // Mobile-optimized settings
                    disableDoubleClickZoom: false,
                    keyboardShortcuts: true
                };
                mapInstanceRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMap"])(mapRef.current, mapOptions);
                // Create outlet marker (blue pin)
                outletMarkerRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMarker"])(mapInstanceRef.current, outlet.coordinates, {
                    title: outlet.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: '#3B82F6',
                        fillOpacity: 1,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 3
                    }
                });
                // Add info window for outlet
                const outletInfoWindow = new google.maps.InfoWindow({
                    content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 4px;">${outlet.name}</h3>
            <p style="font-size: 12px; color: #666;">${outlet.address}</p>
          </div>
        `
                });
                outletMarkerRef.current.addListener('click', {
                    "MapContainer.useCallback[initializeMap]": ()=>{
                        outletInfoWindow.open(mapInstanceRef.current, outletMarkerRef.current || undefined);
                    }
                }["MapContainer.useCallback[initializeMap]"]);
                // Add click listener for delivery location selection
                mapInstanceRef.current.addListener('click', {
                    "MapContainer.useCallback[initializeMap]": (event)=>{
                        if (event.latLng && onDeliveryLocationSelect) {
                            const coords = {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            };
                            onDeliveryLocationSelect(coords);
                        }
                    }
                }["MapContainer.useCallback[initializeMap]"]);
                setIsLoading(false);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load map';
                setError({
                    message: errorMessage,
                    timestamp: new Date()
                });
                setIsLoading(false);
            }
        }
    }["MapContainer.useCallback[initializeMap]"], [
        apiKey,
        outlet,
        onDeliveryLocationSelect
    ]);
    // Update delivery marker and route when coordinates change
    const updateDeliveryMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[updateDeliveryMarker]": ()=>{
            if (!mapInstanceRef.current || !deliveryCoordinates) {
                return;
            }
            const google = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoogleMaps"])();
            if (!google) return;
            // Remove existing delivery marker
            if (deliveryMarkerRef.current) {
                deliveryMarkerRef.current.setMap(null);
            }
            // Remove existing route line
            if (routeLineRef.current) {
                routeLineRef.current.setMap(null);
            }
            // Create delivery marker (red pin)
            deliveryMarkerRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMarker"])(mapInstanceRef.current, deliveryCoordinates, {
                title: 'Delivery Location',
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#EF4444',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 3
                }
            });
            // Draw route line between outlet and delivery
            routeLineRef.current = new google.maps.Polyline({
                path: [
                    outlet.coordinates,
                    deliveryCoordinates
                ],
                geodesic: true,
                strokeColor: '#ED0577',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: mapInstanceRef.current
            });
            // Calculate distance
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$googleMapsLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDistance"])(outlet.coordinates, deliveryCoordinates);
            setDistance(dist);
            // Add info window for delivery location
            const deliveryInfoWindow = new google.maps.InfoWindow({
                content: `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="font-weight: 600; margin-bottom: 4px;">Delivery Location</h3>
          <p style="font-size: 12px; color: #666;">${dist.toFixed(1)} km from outlet</p>
        </div>
      `
            });
            deliveryMarkerRef.current.addListener('click', {
                "MapContainer.useCallback[updateDeliveryMarker]": ()=>{
                    deliveryInfoWindow.open(mapInstanceRef.current, deliveryMarkerRef.current || undefined);
                }
            }["MapContainer.useCallback[updateDeliveryMarker]"]);
            // Fit bounds to show both markers
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(outlet.coordinates);
            bounds.extend(deliveryCoordinates);
            mapInstanceRef.current.fitBounds(bounds);
        }
    }["MapContainer.useCallback[updateDeliveryMarker]"], [
        deliveryCoordinates,
        outlet.coordinates
    ]);
    // Initialize map on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapContainer.useEffect": ()=>{
            initializeMap();
        }
    }["MapContainer.useEffect"], [
        initializeMap
    ]);
    // Update delivery marker when coordinates change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapContainer.useEffect": ()=>{
            if (mapInstanceRef.current && deliveryCoordinates) {
                updateDeliveryMarker();
            }
        }
    }["MapContainer.useEffect"], [
        deliveryCoordinates,
        updateDeliveryMarker
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapContainer.useEffect": ()=>{
            return ({
                "MapContainer.useEffect": ()=>{
                    if (outletMarkerRef.current) {
                        outletMarkerRef.current.setMap(null);
                    }
                    if (deliveryMarkerRef.current) {
                        deliveryMarkerRef.current.setMap(null);
                    }
                    if (routeLineRef.current) {
                        routeLineRef.current.setMap(null);
                    }
                }
            })["MapContainer.useEffect"];
        }
    }["MapContainer.useEffect"], []);
    const handleRetry = ()=>{
        initializeMap();
    };
    const handleManualAddressSubmit = async (address)=>{
        if (!address.trim()) {
            setGeocodingError('Please enter an address');
            return;
        }
        setIsGeocoding(true);
        setGeocodingError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$geocoding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geocodeAddress"])(address);
            setFallbackAddress(result.formattedAddress);
            setGeocodingError(null);
            // Call the callback with the geocoded coordinates
            if (onDeliveryLocationSelect) {
                onDeliveryLocationSelect(result.coordinates);
            }
            // Clear the error state to show the map again
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to geocode address';
            setGeocodingError(errorMessage);
        } finally{
            setIsGeocoding(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gray-100 flex items-center justify-center z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 border-4 border-[#ED0577] border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600",
                            children: "Loading map..."
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                    lineNumber: 271,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                lineNumber: 270,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md p-6 max-w-md w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-red-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                        lineNumber: 284,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-gray-900",
                                            children: "Map failed to load"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                            lineNumber: 289,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600 mt-1",
                                            children: error.message
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                            lineNumber: 290,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "fallback-address",
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Enter delivery address manually:"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "fallback-address",
                                                    type: "text",
                                                    placeholder: "e.g., 123 Main St, City, Country",
                                                    value: fallbackAddress,
                                                    onChange: (e)=>setFallbackAddress(e.target.value),
                                                    onKeyDown: (e)=>{
                                                        if (e.key === 'Enter' && !isGeocoding) {
                                                            handleManualAddressSubmit(fallbackAddress);
                                                        }
                                                    },
                                                    disabled: isGeocoding,
                                                    className: "flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleManualAddressSubmit(fallbackAddress),
                                                    disabled: isGeocoding || !fallbackAddress.trim(),
                                                    className: "px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center whitespace-nowrap",
                                                    children: isGeocoding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4 mr-2 animate-spin",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                                                    lineNumber: 323,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Searching..."
                                                        ]
                                                    }, void 0, true) : 'Search'
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this),
                                geocodingError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 bg-red-50 border border-red-200 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-red-700",
                                        children: geocodingError
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                        lineNumber: 337,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                    lineNumber: 336,
                                    columnNumber: 17
                                }, this),
                                fallbackAddress && !geocodingError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 bg-green-50 border border-green-200 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-700",
                                        children: [
                                            "✓ Address found: ",
                                            fallbackAddress
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                        lineNumber: 344,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                    lineNumber: 343,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleRetry,
                            className: "w-full px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] transition-colors min-h-[44px] flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 mr-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                        lineNumber: 355,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                                    lineNumber: 354,
                                    columnNumber: 15
                                }, this),
                                "Retry Loading Map"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                    lineNumber: 281,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapRef,
                className: "w-full h-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden",
                style: {
                    minHeight: '300px'
                },
                role: "application",
                "aria-label": `Map showing ${outlet.name} at ${outlet.address}`
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            distance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 bg-white rounded-lg shadow-md px-3 py-2 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-medium text-gray-700",
                    children: [
                        "Distance: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[#ED0577] font-bold",
                            children: [
                                distance.toFixed(1),
                                " km"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                            lineNumber: 376,
                            columnNumber: 23
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                    lineNumber: 375,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                lineNumber: 374,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-2 z-10 max-w-[200px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium text-gray-500 uppercase",
                        children: "Outlet"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-gray-900 truncate",
                        children: outlet.name
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx",
        lineNumber: 267,
        columnNumber: 5
    }, this);
}
_s(MapContainer, "k6AOk8hqs6PdVcZ8fw6xY5NzPcY=");
_c = MapContainer;
const __TURBOPACK__default__export__ = MapContainer;
var _c;
__turbopack_context__.k.register(_c, "MapContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/utils/formatting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Formatting utilities for display values
 */ __turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatDistance",
    ()=>formatDistance,
    "formatRelativeTime",
    ()=>formatRelativeTime
]);
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
function formatDistance(distance) {
    return `${distance.toFixed(1)} km`;
}
function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(d);
}
function formatDateTime(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(d);
}
function formatRelativeTime(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(d);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SummaryPanel - Live order summary panel
 * Displays order details and totals
 * Pinned on right side (desktop) or below form (mobile)
 */ __turbopack_context__.s([
    "SummaryPanel",
    ()=>SummaryPanel,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/formatting.ts [app-client] (ecmascript)");
;
;
function SummaryPanel({ outletName, recipientName, recipientAddress, itemCount, distance, serviceType, shippingFee, weight, isFragile }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow p-6 sticky top-6 h-fit",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-gray-900 mb-6",
                children: "Order Summary"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    outletName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "From"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: outletName
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    recipientName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "To"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: recipientName
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            recipientAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600 mt-1",
                                children: recipientAddress
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    itemCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Items"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: [
                                    itemCount,
                                    " item",
                                    itemCount !== 1 ? 's' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this),
                    (weight > 0 || isFragile) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Package"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    weight > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-900",
                                        children: [
                                            "Weight: ",
                                            weight,
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this),
                                    isFragile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-red-600 font-medium",
                                        children: "⚠ Fragile"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    distance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Service Type"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900 capitalize",
                                children: serviceType
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600 mt-2",
                                children: [
                                    "Distance: ",
                                    distance.toFixed(1),
                                    " km"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Shipping Fee"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-[#ED0577]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(shippingFee)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = SummaryPanel;
const __TURBOPACK__default__export__ = SummaryPanel;
var _c;
__turbopack_context__.k.register(_c, "SummaryPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutoSaveIndicator",
    ()=>AutoSaveIndicator,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * AutoSaveIndicator - Displays auto-save status and last saved time
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function AutoSaveIndicator({ lastSavedTime, isSaving }) {
    _s();
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutoSaveIndicator.useEffect": ()=>{
            if (isSaving) {
                setDisplayText('Saving...');
                return;
            }
            if (!lastSavedTime) {
                setDisplayText('');
                return;
            }
            // Format the last saved time
            const now = new Date();
            const diffMs = now.getTime() - lastSavedTime.getTime();
            const diffSecs = Math.floor(diffMs / 1000);
            const diffMins = Math.floor(diffSecs / 60);
            if (diffSecs < 60) {
                setDisplayText('Saved just now');
            } else if (diffMins < 60) {
                setDisplayText(`Saved ${diffMins} min${diffMins > 1 ? 's' : ''} ago`);
            } else {
                setDisplayText(`Saved at ${lastSavedTime.toLocaleTimeString()}`);
            }
            // Update display every minute
            const interval = setInterval({
                "AutoSaveIndicator.useEffect.interval": ()=>{
                    const newNow = new Date();
                    const newDiffMs = newNow.getTime() - lastSavedTime.getTime();
                    const newDiffSecs = Math.floor(newDiffMs / 1000);
                    const newDiffMins = Math.floor(newDiffSecs / 60);
                    if (newDiffSecs < 60) {
                        setDisplayText('Saved just now');
                    } else if (newDiffMins < 60) {
                        setDisplayText(`Saved ${newDiffMins} min${newDiffMins > 1 ? 's' : ''} ago`);
                    } else {
                        setDisplayText(`Saved at ${lastSavedTime.toLocaleTimeString()}`);
                    }
                }
            }["AutoSaveIndicator.useEffect.interval"], 60000);
            return ({
                "AutoSaveIndicator.useEffect": ()=>clearInterval(interval)
            })["AutoSaveIndicator.useEffect"];
        }
    }["AutoSaveIndicator.useEffect"], [
        lastSavedTime,
        isSaving
    ]);
    if (!displayText) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 text-sm text-gray-600",
        children: isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: displayText
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4 text-green-600",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: displayText
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(AutoSaveIndicator, "Z72AqRalvcuvuUyHd5OLwsN/cpk=");
_c = AutoSaveIndicator;
const __TURBOPACK__default__export__ = AutoSaveIndicator;
var _c;
__turbopack_context__.k.register(_c, "AutoSaveIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationModal",
    ()=>ConfirmationModal,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * ConfirmationModal - Displays order creation success confirmation with order ID
 * Shows order details and provides redirect option
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function ConfirmationModal({ isOpen, orderId, onClose }) {
    _s();
    // Auto-close after 3 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmationModal.useEffect": ()=>{
            if (isOpen) {
                const timer = setTimeout(onClose, 3000);
                return ({
                    "ConfirmationModal.useEffect": ()=>clearTimeout(timer)
                })["ConfirmationModal.useEffect"];
            }
        }
    }["ConfirmationModal.useEffect"], [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-8 h-8 text-green-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M5 13l4 4L19 7"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center text-gray-900 mb-2",
                    children: "Order Created!"
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600 mb-6",
                    children: "Your order has been successfully created."
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 rounded-lg p-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mb-1",
                            children: "Order ID"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-mono font-bold text-gray-900 break-all",
                            children: orderId
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "w-full px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] transition-colors min-h-[44px]",
                    children: "Continue"
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500 text-center mt-4",
                    children: "Redirecting in 3 seconds..."
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ConfirmationModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ConfirmationModal;
const __TURBOPACK__default__export__ = ConfirmationModal;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * OutletSelection - Form section for selecting outlet
 * Displays outlet selector dropdown/list with outlet details
 * When an outlet is selected, the map is updated to center on that outlet
 */ __turbopack_context__.s([
    "OutletSelection",
    ()=>OutletSelection,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function OutletSelection({ outlets, selectedOutletId, onChange }) {
    const selectedOutlet = outlets.find((o)=>o.id === selectedOutletId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "outlet-select",
                        className: "block text-sm font-medium text-gray-700 mb-2",
                        children: "Select Outlet"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "outlet-select",
                        value: selectedOutletId,
                        onChange: (e)=>onChange(e.target.value),
                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select an outlet"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            outlets.map((outlet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: outlet.id,
                                    children: [
                                        outlet.name,
                                        " - ",
                                        outlet.address
                                    ]
                                }, outlet.id, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            selectedOutlet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-gray-500 uppercase",
                                    children: "Outlet Name"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-900",
                                    children: selectedOutlet.name
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-gray-500 uppercase",
                                    children: "Address"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-700",
                                    children: selectedOutlet.address
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-gray-500 uppercase",
                                    children: "Coordinates"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-700",
                                    children: [
                                        selectedOutlet.coordinates.lat.toFixed(4),
                                        ", ",
                                        selectedOutlet.coordinates.lng.toFixed(4)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: "Select the outlet from which this order will be shipped. The map will center on the selected outlet location."
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = OutletSelection;
const __TURBOPACK__default__export__ = OutletSelection;
var _c;
__turbopack_context__.k.register(_c, "OutletSelection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/utils/validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Validation utilities for form fields and data
 */ __turbopack_context__.s([
    "getValidationError",
    ()=>getValidationError,
    "validateEmail",
    ()=>validateEmail,
    "validatePhone",
    ()=>validatePhone,
    "validateRequired",
    ()=>validateRequired
]);
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePhone(phone) {
    // Accept phone numbers with +, -, spaces, and digits
    const phoneRegex = /^[\d\s\-+()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}
function validateRequired(value) {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    return value !== undefined && value !== null;
}
function getValidationError(_field, value, type) {
    if (type === 'email') {
        if (!validateRequired(value)) return 'This field is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
    } else if (type === 'phone') {
        if (!validateRequired(value)) return 'This field is required';
        if (!validatePhone(value)) return 'Please enter a valid phone number';
    } else if (type === 'required') {
        if (!validateRequired(value)) return 'This field is required';
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecipientForm",
    ()=>RecipientForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * RecipientForm - Form section for recipient information
 * Includes real-time validation for name, phone, email, and address fields
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/validation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function RecipientForm({ name, phone, email, address, onNameChange, onPhoneChange, onEmailChange, errors = {} }) {
    _s();
    const [touched, setTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Validate field on blur
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RecipientForm.useCallback[handleBlur]": (field)=>{
            setTouched({
                "RecipientForm.useCallback[handleBlur]": (prev)=>({
                        ...prev,
                        [field]: true
                    })
            }["RecipientForm.useCallback[handleBlur]"]);
        }
    }["RecipientForm.useCallback[handleBlur]"], []);
    // Get validation error for a field
    const getFieldError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RecipientForm.useCallback[getFieldError]": (field)=>{
            if (!touched[field]) return null;
            switch(field){
                case 'name':
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidationError"])(field, name, 'required');
                case 'phone':
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidationError"])(field, phone, 'phone');
                case 'email':
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidationError"])(field, email, 'email');
                case 'address':
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidationError"])(field, address, 'required');
                default:
                    return null;
            }
        }
    }["RecipientForm.useCallback[getFieldError]"], [
        touched,
        name,
        phone,
        email,
        address
    ]);
    const nameError = getFieldError('name') || errors.name;
    const phoneError = getFieldError('phone') || errors.phone;
    const emailError = getFieldError('email') || errors.email;
    const addressError = getFieldError('address') || errors.address;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "recipient-name",
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Recipient Name *"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "recipient-name",
                        type: "text",
                        placeholder: "Enter recipient name",
                        value: name,
                        onChange: (e)=>onNameChange(e.target.value),
                        onBlur: ()=>handleBlur('name'),
                        className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${nameError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                        "aria-invalid": !!nameError,
                        "aria-describedby": nameError ? 'recipient-name-error' : undefined
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    nameError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "recipient-name-error",
                        className: "text-sm text-red-600 mt-1",
                        children: nameError
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "recipient-phone",
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Phone Number *"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "recipient-phone",
                        type: "tel",
                        placeholder: "Enter phone number (e.g., +1 (555) 123-4567)",
                        value: phone,
                        onChange: (e)=>onPhoneChange(e.target.value),
                        onBlur: ()=>handleBlur('phone'),
                        className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${phoneError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                        "aria-invalid": !!phoneError,
                        "aria-describedby": phoneError ? 'recipient-phone-error' : undefined
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    phoneError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "recipient-phone-error",
                        className: "text-sm text-red-600 mt-1",
                        children: phoneError
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "recipient-email",
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Email Address *"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "recipient-email",
                        type: "email",
                        placeholder: "Enter email address",
                        value: email,
                        onChange: (e)=>onEmailChange(e.target.value),
                        onBlur: ()=>handleBlur('email'),
                        className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                        "aria-invalid": !!emailError,
                        "aria-describedby": emailError ? 'recipient-email-error' : undefined
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    emailError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "recipient-email-error",
                        className: "text-sm text-red-600 mt-1",
                        children: emailError
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "recipient-address",
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Delivery Address *"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "recipient-address",
                        type: "text",
                        placeholder: "Click on the map to select delivery address",
                        value: address,
                        readOnly: true,
                        className: `w-full px-4 py-3 border rounded-lg bg-gray-50 min-h-[44px] cursor-not-allowed ${addressError ? 'border-red-500' : 'border-gray-300'}`,
                        "aria-invalid": !!addressError,
                        "aria-describedby": addressError ? 'recipient-address-error' : undefined
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    addressError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "recipient-address-error",
                        className: "text-sm text-red-600 mt-1",
                        children: addressError
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 mt-2",
                        children: "Click on the map to select the delivery address"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(RecipientForm, "jIXeDZQIqGqxNvOBIyz5PXouOcA=");
_c = RecipientForm;
const __TURBOPACK__default__export__ = RecipientForm;
var _c;
__turbopack_context__.k.register(_c, "RecipientForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ItemsForm",
    ()=>ItemsForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * ItemsForm - Form section for adding items to order
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
;
;
function ItemsForm({ items, onAddItem, onUpdateItem, onRemoveItem }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: "No items added yet"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Item description",
                                    value: item.description,
                                    onChange: (e)=>onUpdateItem(item.id, 'description', e.target.value),
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    placeholder: "Qty",
                                    min: "1",
                                    value: item.quantity,
                                    onChange: (e)=>onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1),
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                                    lineNumber: 44,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onRemoveItem(item.id),
                                className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onAddItem,
                className: "w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 min-h-[44px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    "Add Item"
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: [
                    "Total items: ",
                    items.reduce((sum, item)=>sum + item.quantity, 0)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = ItemsForm;
const __TURBOPACK__default__export__ = ItemsForm;
var _c;
__turbopack_context__.k.register(_c, "ItemsForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PackageForm",
    ()=>PackageForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * PackageForm - Form section for package details
 * Includes validation for numeric values (weight, dimensions)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function PackageForm({ weight, length, width, height, isFragile, onWeightChange, onLengthChange, onWidthChange, onHeightChange, onFragileChange, errors = {} }) {
    _s();
    const [touched, setTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Validate field on blur
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PackageForm.useCallback[handleBlur]": (field)=>{
            setTouched({
                "PackageForm.useCallback[handleBlur]": (prev)=>({
                        ...prev,
                        [field]: true
                    })
            }["PackageForm.useCallback[handleBlur]"]);
        }
    }["PackageForm.useCallback[handleBlur]"], []);
    // Validate numeric value
    const validateNumeric = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PackageForm.useCallback[validateNumeric]": (value, fieldName)=>{
            if (value < 0) {
                return `${fieldName} must be a positive number`;
            }
            if (!Number.isFinite(value)) {
                return `${fieldName} must be a valid number`;
            }
            return null;
        }
    }["PackageForm.useCallback[validateNumeric]"], []);
    // Get validation error for a field
    const getFieldError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PackageForm.useCallback[getFieldError]": (field)=>{
            if (!touched[field]) return null;
            switch(field){
                case 'weight':
                    return validateNumeric(weight, 'Weight');
                case 'length':
                    return validateNumeric(length, 'Length');
                case 'width':
                    return validateNumeric(width, 'Width');
                case 'height':
                    return validateNumeric(height, 'Height');
                default:
                    return null;
            }
        }
    }["PackageForm.useCallback[getFieldError]"], [
        touched,
        weight,
        length,
        width,
        height,
        validateNumeric
    ]);
    const weightError = getFieldError('weight') || errors.weight;
    const lengthError = getFieldError('length') || errors.length;
    const widthError = getFieldError('width') || errors.width;
    const heightError = getFieldError('height') || errors.height;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "package-weight",
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Weight (kg)"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "package-weight",
                        type: "number",
                        placeholder: "0",
                        min: "0",
                        step: "0.1",
                        value: weight,
                        onChange: (e)=>onWeightChange(parseFloat(e.target.value) || 0),
                        onBlur: ()=>handleBlur('weight'),
                        className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${weightError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                        "aria-invalid": !!weightError,
                        "aria-describedby": weightError ? 'package-weight-error' : undefined
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    weightError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "package-weight-error",
                        className: "text-sm text-red-600 mt-1",
                        children: weightError
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-gray-700 mb-2",
                        children: "Dimensions (cm)"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "package-length",
                                        type: "number",
                                        placeholder: "Length",
                                        min: "0",
                                        step: "0.1",
                                        value: length,
                                        onChange: (e)=>onLengthChange(parseFloat(e.target.value) || 0),
                                        onBlur: ()=>handleBlur('length'),
                                        className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm transition-colors ${lengthError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                                        "aria-invalid": !!lengthError,
                                        "aria-describedby": lengthError ? 'package-length-error' : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    lengthError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "package-length-error",
                                        className: "text-xs text-red-600 mt-1",
                                        children: lengthError
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "package-width",
                                        type: "number",
                                        placeholder: "Width",
                                        min: "0",
                                        step: "0.1",
                                        value: width,
                                        onChange: (e)=>onWidthChange(parseFloat(e.target.value) || 0),
                                        onBlur: ()=>handleBlur('width'),
                                        className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm transition-colors ${widthError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                                        "aria-invalid": !!widthError,
                                        "aria-describedby": widthError ? 'package-width-error' : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    widthError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "package-width-error",
                                        className: "text-xs text-red-600 mt-1",
                                        children: widthError
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "package-height",
                                        type: "number",
                                        placeholder: "Height",
                                        min: "0",
                                        step: "0.1",
                                        value: height,
                                        onChange: (e)=>onHeightChange(parseFloat(e.target.value) || 0),
                                        onBlur: ()=>handleBlur('height'),
                                        className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm transition-colors ${heightError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`,
                                        "aria-invalid": !!heightError,
                                        "aria-describedby": heightError ? 'package-height-error' : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    heightError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "package-height-error",
                                        className: "text-xs text-red-600 mt-1",
                                        children: heightError
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "package-fragile",
                className: "flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "package-fragile",
                        type: "checkbox",
                        checked: isFragile,
                        onChange: (e)=>onFragileChange(e.target.checked),
                        className: "w-4 h-4 text-[#ED0577] rounded"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-3 font-medium text-gray-900",
                        children: "Fragile Item"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: "Provide package details for accurate shipping calculations"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(PackageForm, "MQVAmEriWFcUDeFLCmFRRd9/msE=");
_c = PackageForm;
const __TURBOPACK__default__export__ = PackageForm;
var _c;
__turbopack_context__.k.register(_c, "PackageForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ShippingFeeBreakdown - Displays shipping fee calculation breakdown
 * Shows base fee, distance, rate, and total in a clear format
 * Updates in real-time as distance or service type changes
 */ __turbopack_context__.s([
    "ShippingFeeBreakdown",
    ()=>ShippingFeeBreakdown,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/calculations.ts [app-client] (ecmascript)");
;
;
// Format number as Indonesian Rupiah currency
function formatRupiah(amount) {
    return amount.toLocaleString('id-ID');
}
function ShippingFeeBreakdown({ distance, serviceType, shippingFee, className = '' }) {
    const { baseFee, rate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getShippingRates"])(serviceType);
    // Format values for display
    const baseFeeDisplay = formatRupiah(baseFee);
    const rateDisplay = formatRupiah(rate);
    const totalDisplay = formatRupiah(shippingFee);
    const distanceDisplay = distance ? `${distance.toFixed(1)} km` : 'N/A';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white rounded-lg shadow p-6 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Shipping Fee Breakdown"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: "Base Fee:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: [
                                    "Rp ",
                                    baseFeeDisplay
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: "Distance:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: distanceDisplay
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: "Rate per km:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: [
                                    "Rp ",
                                    rateDisplay
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    distance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: "Distance Charge:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: [
                                    "Rp ",
                                    formatRupiah(distance * rate)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t pt-3"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-gray-900",
                                children: "Total Shipping Fee:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg text-[#ED0577]",
                                children: [
                                    "Rp ",
                                    totalDisplay
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-3 bg-gray-50 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Formula:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            " Base Fee + (Distance × Rate per km)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    distance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 mt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Calculation:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            " Rp ",
                            baseFeeDisplay,
                            " + (",
                            distance.toFixed(1),
                            " km × Rp ",
                            rateDisplay,
                            ") = Rp ",
                            totalDisplay
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = ShippingFeeBreakdown;
const __TURBOPACK__default__export__ = ShippingFeeBreakdown;
var _c;
__turbopack_context__.k.register(_c, "ShippingFeeBreakdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DeliveryForm - Form section for delivery information
 * Allows selection of service type and displays distance, shipping fee, and fee breakdown
 */ __turbopack_context__.s([
    "DeliveryForm",
    ()=>DeliveryForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/formatting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$ShippingFeeBreakdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/ShippingFeeBreakdown.tsx [app-client] (ecmascript)");
;
;
;
function DeliveryForm({ serviceType, distance, shippingFee, onServiceTypeChange }) {
    const serviceTypes = [
        'standard',
        'express',
        'same-day'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-gray-700 mb-3",
                        children: "Service Type"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: serviceTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        name: "serviceType",
                                        value: type,
                                        checked: serviceType === type,
                                        onChange: ()=>onServiceTypeChange(type),
                                        className: "w-4 h-4 text-[#ED0577]"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-3 font-medium capitalize text-gray-900",
                                        children: type
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, type, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            distance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600",
                        children: "Distance"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-semibold text-gray-900",
                        children: [
                            distance.toFixed(1),
                            " km"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-gray-50 border border-gray-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600",
                        children: "Shipping Fee"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold text-[#ED0577]",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(shippingFee)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$ShippingFeeBreakdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                distance: distance,
                serviceType: serviceType,
                shippingFee: shippingFee
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: "Select your preferred service type. The shipping fee will be calculated based on distance and service type."
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = DeliveryForm;
const __TURBOPACK__default__export__ = DeliveryForm;
var _c;
__turbopack_context__.k.register(_c, "DeliveryForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderCreationForm",
    ()=>OrderCreationForm,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * OrderCreationForm - Main form for creating new orders with accordion layout
 * Includes outlet selection, recipient info, items, package details, and delivery info
 * Integrates with MapContainer for delivery location selection
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/calculations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useAutoSave$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useAutoSave.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/stores/offlineStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$offlineService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/offlineService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$FormAccordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/FormAccordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$MapContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/MapContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$SummaryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/SummaryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$AutoSaveIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/AutoSaveIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/ConfirmationModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$OutletSelection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/form-sections/OutletSelection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$RecipientForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/form-sections/RecipientForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$ItemsForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/form-sections/ItemsForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$PackageForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/form-sections/PackageForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$DeliveryForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/form-sections/DeliveryForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function OrderCreationForm({ outlets, onSubmit, onCancel, editOrder }) {
    _s();
    const isEditMode = !!editOrder;
    const STORAGE_KEY = isEditMode ? `order-edit-form-${editOrder.id}` : 'order-creation-form-autosave';
    // Initialize form state - use existing order data if editing
    const [formState, setFormState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        outletId: editOrder?.outletId || outlets[0]?.id || '',
        recipientName: editOrder?.recipient.name || '',
        recipientPhone: editOrder?.recipient.phone || '',
        recipientEmail: editOrder?.recipient.email || '',
        recipientAddress: editOrder?.recipient.address || '',
        deliveryCoordinates: editOrder?.recipient.coordinates || null,
        serviceType: editOrder?.delivery.serviceType || 'standard',
        items: editOrder?.items || [],
        weight: editOrder?.package.weight || 0,
        length: editOrder?.package.dimensions.length || 0,
        width: editOrder?.package.dimensions.width || 0,
        height: editOrder?.package.dimensions.height || 0,
        isFragile: editOrder?.package.isFragile || false
    });
    const [distance, setDistance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editOrder?.delivery.distance || null);
    const [shippingFee, setShippingFee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editOrder?.delivery.shippingFee || 0);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showConfirmation, setShowConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [createdOrderId, setCreatedOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { isOnline: appIsOnline } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"])();
    // Set up auto-save
    const { lastSavedTime, isSaving, restoreData, clearSavedData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useAutoSave$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"])(formState, {
        storageKey: STORAGE_KEY,
        interval: 30000
    });
    // Restore form data on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderCreationForm.useEffect": ()=>{
            const savedData = restoreData();
            if (savedData) {
                setFormState(savedData);
                // Recalculate distance and shipping fee if delivery coordinates exist
                if (savedData.deliveryCoordinates) {
                    const selectedOutlet = outlets.find({
                        "OrderCreationForm.useEffect.selectedOutlet": (o)=>o.id === savedData.outletId
                    }["OrderCreationForm.useEffect.selectedOutlet"]);
                    if (selectedOutlet) {
                        const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDistance"])(selectedOutlet.coordinates, savedData.deliveryCoordinates);
                        setDistance(dist);
                        const fee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateShippingFee"])(dist, savedData.serviceType);
                        setShippingFee(fee);
                    }
                }
            }
        }
    }["OrderCreationForm.useEffect"], []);
    const selectedOutlet = outlets.find((o)=>o.id === formState.outletId);
    // Handle delivery location selection from map
    const handleDeliveryLocationSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrderCreationForm.useCallback[handleDeliveryLocationSelect]": (coordinates)=>{
            setFormState({
                "OrderCreationForm.useCallback[handleDeliveryLocationSelect]": (prev)=>({
                        ...prev,
                        deliveryCoordinates: coordinates,
                        recipientAddress: `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
                    })
            }["OrderCreationForm.useCallback[handleDeliveryLocationSelect]"]);
            // Calculate distance and update shipping fee
            if (selectedOutlet) {
                const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDistance"])(selectedOutlet.coordinates, coordinates);
                setDistance(dist);
                // Calculate shipping fee
                const fee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateShippingFee"])(dist, formState.serviceType);
                setShippingFee(fee);
            }
        }
    }["OrderCreationForm.useCallback[handleDeliveryLocationSelect]"], [
        selectedOutlet,
        formState.serviceType
    ]);
    // Handle service type change
    const handleServiceTypeChange = (newServiceType)=>{
        setFormState((prev)=>({
                ...prev,
                serviceType: newServiceType
            }));
        // Recalculate shipping fee with new service type
        if (distance !== null) {
            const fee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateShippingFee"])(distance, newServiceType);
            setShippingFee(fee);
        }
    };
    // Handle item operations
    const handleAddItem = ()=>{
        setFormState((prev)=>({
                ...prev,
                items: [
                    ...prev.items,
                    {
                        id: `item-${Date.now()}`,
                        description: '',
                        quantity: 1
                    }
                ]
            }));
    };
    const handleUpdateItem = (id, field, value)=>{
        setFormState((prev)=>({
                ...prev,
                items: prev.items.map((item)=>item.id === id ? {
                        ...item,
                        [field]: value
                    } : item)
            }));
    };
    const handleRemoveItem = (id)=>{
        setFormState((prev)=>({
                ...prev,
                items: prev.items.filter((item)=>item.id !== id)
            }));
    };
    // Build accordion sections
    const accordionSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderCreationForm.useMemo[accordionSections]": ()=>[
                {
                    id: 'outlet',
                    title: 'Outlet Selection',
                    isValid: !!formState.outletId,
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$OutletSelection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        outlets: outlets,
                        selectedOutletId: formState.outletId,
                        onChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (outletId)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            outletId
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"]
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this)
                },
                {
                    id: 'recipient',
                    title: 'Recipient Information',
                    isValid: !!formState.recipientName && !!formState.recipientPhone && !!formState.recipientEmail && !!formState.deliveryCoordinates,
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$RecipientForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: formState.recipientName,
                        phone: formState.recipientPhone,
                        email: formState.recipientEmail,
                        address: formState.recipientAddress,
                        onNameChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            recipientName: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        onPhoneChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            recipientPhone: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        onEmailChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            recipientEmail: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this)
                },
                {
                    id: 'items',
                    title: 'Items',
                    isValid: formState.items.length > 0,
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$ItemsForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        items: formState.items,
                        onAddItem: handleAddItem,
                        onUpdateItem: handleUpdateItem,
                        onRemoveItem: handleRemoveItem
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                },
                {
                    id: 'package',
                    title: 'Package Details',
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$PackageForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        weight: formState.weight,
                        length: formState.length,
                        width: formState.width,
                        height: formState.height,
                        isFragile: formState.isFragile,
                        onWeightChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            weight: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        onLengthChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            length: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        onWidthChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            width: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        onHeightChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            height: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"],
                        onFragileChange: {
                            "OrderCreationForm.useMemo[accordionSections]": (value)=>setFormState({
                                    "OrderCreationForm.useMemo[accordionSections]": (prev)=>({
                                            ...prev,
                                            isFragile: value
                                        })
                                }["OrderCreationForm.useMemo[accordionSections]"])
                        }["OrderCreationForm.useMemo[accordionSections]"]
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                },
                {
                    id: 'delivery',
                    title: 'Delivery Information',
                    isValid: distance !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDistanceValid"])(distance),
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$form$2d$sections$2f$DeliveryForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        serviceType: formState.serviceType,
                        distance: distance,
                        shippingFee: shippingFee,
                        onServiceTypeChange: handleServiceTypeChange
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 240,
                        columnNumber: 11
                    }, this)
                }
            ]
    }["OrderCreationForm.useMemo[accordionSections]"], [
        formState,
        outlets,
        distance,
        shippingFee,
        errors,
        handleAddItem,
        handleUpdateItem,
        handleRemoveItem,
        handleServiceTypeChange
    ]);
    const handleConfirmOrder = ()=>{
        // Validate form
        if (!formState.recipientName || !formState.recipientPhone || !formState.recipientEmail || !formState.deliveryCoordinates) {
            setErrors({
                form: 'Please fill in all required fields and select a delivery location'
            });
            return;
        }
        if (distance !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDistanceValid"])(distance)) {
            setErrors({
                form: 'Delivery location must be within 3 km radius of the outlet'
            });
            return;
        }
        // Create order object
        const order = {
            id: editOrder?.id || `ORD-${Date.now()}`,
            merchantId: editOrder?.merchantId || 'MERCHANT-001',
            outletId: formState.outletId,
            status: editOrder?.status || 'submitted',
            statusDisplay: editOrder?.statusDisplay || 'Shipment Created',
            invoiceNumber: editOrder?.invoiceNumber || `INV-${Date.now()}`,
            recipient: {
                name: formState.recipientName,
                phone: formState.recipientPhone,
                email: formState.recipientEmail,
                address: formState.recipientAddress,
                coordinates: formState.deliveryCoordinates
            },
            items: formState.items,
            package: {
                weight: formState.weight,
                dimensions: {
                    length: formState.length,
                    width: formState.width,
                    height: formState.height
                },
                isFragile: formState.isFragile
            },
            delivery: {
                serviceType: formState.serviceType,
                distance: distance || 0,
                shippingFee,
                baseFee: 0,
                rate: 0
            },
            createdAt: editOrder?.createdAt || new Date(),
            updatedAt: new Date()
        };
        // Show confirmation modal for new orders only
        if (!isEditMode) {
            setCreatedOrderId(order.id);
            setShowConfirmation(true);
        }
        // Clear auto-save data
        clearSavedData();
        // Submit order after a short delay (for modal display on new orders)
        setTimeout(()=>{
            // If offline, queue the order; otherwise submit normally
            if (!appIsOnline) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$offlineService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queueOrderForSync"])(order);
            }
            onSubmit(order);
        }, isEditMode ? 0 : 500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showConfirmation,
                orderId: createdOrderId,
                onClose: ()=>setShowConfirmation(false)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: !appIsOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 bg-yellow-500 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                            lineNumber: 345,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-yellow-700 font-medium",
                                            children: "Offline Mode"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                            lineNumber: 346,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$AutoSaveIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                lastSavedTime: lastSavedTime,
                                isSaving: isSaving
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$FormAccordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sections: accordionSections,
                        defaultOpenSection: "outlet"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this),
                    distance !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDistanceValid"])(distance) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-red-50 border border-red-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-red-700",
                            children: "Delivery location must be within 3 km radius of the outlet"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this),
                    errors.form && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-red-50 border border-red-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-red-700",
                            children: errors.form
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleConfirmOrder,
                                disabled: distance !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDistanceValid"])(distance),
                                className: "w-full px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors min-h-[44px]",
                                children: isEditMode ? 'Update Order' : 'Confirm Order'
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    clearSavedData();
                                    onCancel();
                                },
                                className: "w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[44px]",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-1 space-y-6",
                children: [
                    selectedOutlet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$MapContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            outlet: selectedOutlet,
                            deliveryCoordinates: formState.deliveryCoordinates,
                            onDeliveryLocationSelect: handleDeliveryLocationSelect,
                            className: "h-[300px]"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$SummaryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        outletName: selectedOutlet?.name,
                        recipientName: formState.recipientName,
                        recipientAddress: formState.recipientAddress,
                        itemCount: formState.items.reduce((sum, item)=>sum + item.quantity, 0),
                        distance: distance,
                        serviceType: formState.serviceType,
                        shippingFee: shippingFee,
                        weight: formState.weight,
                        isFragile: formState.isFragile
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
_s(OrderCreationForm, "WaTqf28W5ZSukXytESrtWn46ARQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useAutoSave$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"]
    ];
});
_c = OrderCreationForm;
const __TURBOPACK__default__export__ = OrderCreationForm;
var _c;
__turbopack_context__.k.register(_c, "OrderCreationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/hooks/useCreateOrder.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateOrder",
    ()=>useCreateOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useCreateOrder() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreateOrder.useMutation": async (order)=>{
                const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
                return adapter.createOrder(order);
            }
        }["useCreateOrder.useMutation"],
        onSuccess: {
            "useCreateOrder.useMutation": ()=>{
                // Invalidate the orders list to trigger a refetch
                queryClient.invalidateQueries({
                    queryKey: [
                        'orders'
                    ]
                });
            }
        }["useCreateOrder.useMutation"]
    });
}
_s(useCreateOrder, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/hooks/useUpdateOrder.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpdateOrder",
    ()=>useUpdateOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useUpdateOrder() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUpdateOrder.useMutation": async ({ id, updates })=>{
                const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
                return adapter.updateOrder(id, updates);
            }
        }["useUpdateOrder.useMutation"],
        onSuccess: {
            "useUpdateOrder.useMutation": (updatedOrder)=>{
                // Invalidate both the specific order and the orders list
                queryClient.invalidateQueries({
                    queryKey: [
                        'orders',
                        updatedOrder.id
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'orders'
                    ]
                });
            }
        }["useUpdateOrder.useMutation"]
    });
}
_s(useUpdateOrder, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/hooks/useOrderById.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOrderById",
    ()=>useOrderById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useOrderById(id) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'orders',
            id
        ],
        queryFn: {
            "useOrderById.useQuery": async ()=>{
                if (!id) return null;
                const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
                return adapter.getOrderById(id);
            }
        }["useOrderById.useQuery"],
        enabled: !!id
    });
}
_s(useOrderById, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateOrderContent",
    ()=>CreateOrderContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OrderCreationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/OrderCreationForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useCreateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useCreateOrder.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUpdateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUpdateOrder.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOrderById$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useOrderById.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/stores/offlineStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function CreateOrderContent({ outlets, isLoading }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const editOrderId = searchParams.get('edit');
    const isEditMode = !!editOrderId;
    const { mutate: createOrder, isPending: isCreating } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useCreateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateOrder"])();
    const { mutate: updateOrder, isPending: isUpdating } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUpdateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateOrder"])();
    const { data: existingOrder, isLoading: isLoadingOrder } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOrderById$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrderById"])(editOrderId || undefined);
    const { isOnline } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"])();
    const handleSubmit = (order)=>{
        if (!isOnline) {
            router.push('/orders');
            return;
        }
        if (isEditMode && existingOrder) {
            updateOrder({
                id: existingOrder.id,
                updates: order
            }, {
                onSuccess: ()=>{
                    router.push('/orders');
                },
                onError: (error)=>{
                    console.error('Failed to update order:', error);
                }
            });
        } else {
            createOrder(order, {
                onSuccess: ()=>{
                    router.push('/orders');
                },
                onError: (error)=>{
                    console.error('Failed to create order:', error);
                }
            });
        }
    };
    const handleCancel = ()=>{
        router.push('/dashboard');
    };
    if (isLoading || isEditMode && isLoadingOrder) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-4 border-[#ED0577] border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    if (isEditMode && !existingOrder) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-700 mb-4",
                        children: "Order not found"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/orders'),
                        className: "px-4 py-2 bg-[#ED0577] text-white rounded-lg hover:bg-[#d9066a] transition-colors",
                        children: "Back to Orders"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-gray-900",
                        children: isEditMode ? 'Edit Order' : 'Create New Order'
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mt-2",
                        children: isEditMode ? 'Update order details below' : 'Click on the map to select a delivery location'
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    !isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-yellow-700 mt-2 text-sm",
                        children: "You are offline. Orders will be queued and synced when connectivity is restored."
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            (isCreating || isUpdating) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-blue-700",
                    children: isUpdating ? 'Updating order...' : 'Creating order...'
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OrderCreationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderCreationForm"], {
                outlets: outlets,
                onSubmit: handleSubmit,
                onCancel: handleCancel,
                editOrder: isEditMode ? existingOrder || undefined : undefined
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(CreateOrderContent, "mKLg8VZOF0U8eCllTszNZj+rO6k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useCreateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateOrder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUpdateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateOrder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOrderById$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrderById"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"]
    ];
});
_c = CreateOrderContent;
var _c;
__turbopack_context__.k.register(_c, "CreateOrderContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateOrderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$MainLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/MainLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$page$2d$components$2f$CreateOrderContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/page-components/CreateOrderContent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function CreateOrderPageContent() {
    _s();
    const [outlets, setOutlets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateOrderPageContent.useEffect": ()=>{
            const loadOutlets = {
                "CreateOrderPageContent.useEffect.loadOutlets": async ()=>{
                    try {
                        const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
                        const loadedOutlets = await adapter.getOutlets();
                        setOutlets(loadedOutlets);
                    } catch (error) {
                        console.error('Failed to load outlets:', error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["CreateOrderPageContent.useEffect.loadOutlets"];
            loadOutlets();
        }
    }["CreateOrderPageContent.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-4 border-[#ED0577] border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
                lineNumber: 34,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
            lineNumber: 33,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$page$2d$components$2f$CreateOrderContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateOrderContent"], {
            outlets: outlets,
            isLoading: isLoading
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(CreateOrderPageContent, "EaHTRE1Qw7zw8xjDAbAOXF37K44=");
_c = CreateOrderPageContent;
function CreateOrderPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProtectedRoute"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$MainLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MainLayout"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateOrderPageContent, {}, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/app/create-order/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c1 = CreateOrderPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "CreateOrderPageContent");
__turbopack_context__.k.register(_c1, "CreateOrderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_TechSmith_PinkPin_ebea08e1._.js.map