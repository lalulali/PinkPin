(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/TechSmith/PinkPin/src/services/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Authentication service for Pink Pin Merchant App
 * Handles login, logout, token validation, and session management
 */ __turbopack_context__.s([
    "authService",
    ()=>authService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Constants
const MOCK_CREDENTIALS = {
    email: 'demo@pinkpin.com',
    password: 'demo123'
};
const TOKEN_KEY = 'pinkpin_auth_token';
const USER_KEY = 'pinkpin_auth_user';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
;
/**
 * Generate a mock JWT-like token for session management
 */ function generateToken(user) {
    const header = btoa(JSON.stringify({
        alg: 'HS256',
        typ: 'JWT'
    }));
    const now = Date.now();
    const payload = btoa(JSON.stringify({
        sub: user.id,
        email: user.email,
        name: user.name,
        iat: now,
        exp: now + SESSION_DURATION_MS
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
}
/**
 * Decode token payload without verification (for client-side use)
 */ function decodeToken(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        return JSON.parse(atob(parts[1]));
    } catch  {
        return null;
    }
}
/**
 * Check if token is expired
 */ function isTokenExpired(expiresAt) {
    return new Date() > expiresAt;
}
/**
 * Create AuthToken object from user
 */ function createAuthToken(user) {
    const now = new Date();
    return {
        token: generateToken(user),
        expiresAt: new Date(now.getTime() + SESSION_DURATION_MS),
        createdAt: now
    };
}
/**
 * Validate mock credentials
 */ function validateCredentials(credentials) {
    // Check CAPTCHA verification
    if (!credentials.captchaVerified) {
        return {
            valid: false,
            error: 'CAPTCHA verification required'
        };
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
        return {
            valid: false,
            error: 'Please enter a valid email address'
        };
    }
    // Check mock credentials
    if (credentials.email.toLowerCase() === MOCK_CREDENTIALS.email.toLowerCase() && credentials.password === MOCK_CREDENTIALS.password) {
        const user = {
            id: 'merchant-001',
            email: credentials.email.toLowerCase(),
            name: 'Demo Merchant'
        };
        return {
            valid: true,
            user
        };
    }
    return {
        valid: false,
        error: 'Invalid email or password'
    };
}
/**
 * Store token securely in localStorage
 */ function storeToken(token) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}
/**
 * Retrieve token from localStorage
 */ function getStoredToken() {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    try {
        const token = JSON.parse(stored);
        // Convert date strings back to Date objects
        token.expiresAt = new Date(token.expiresAt);
        token.createdAt = new Date(token.createdAt);
        return token;
    } catch  {
        return null;
    }
}
/**
 * Store user in localStorage
 */ function storeUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
/**
 * Retrieve user from localStorage
 */ function getStoredUser() {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch  {
        return null;
    }
}
/**
 * Clear all auth data from localStorage
 */ function clearAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}
/**
 * Update token expiration on activity (refresh session)
 */ function refreshSession() {
    const token = getStoredToken();
    if (!token || isTokenExpired(token.expiresAt)) {
        return false;
    }
    // Extend session by updating expiration
    const user = getStoredUser();
    if (user) {
        const newToken = createAuthToken(user);
        storeToken(newToken);
        return true;
    }
    return false;
}
const authService = {
    /**
   * Authenticate user with credentials
   */ async login (credentials) {
        // Simulate network delay
        await new Promise((resolve)=>setTimeout(resolve, 500));
        const result = validateCredentials(credentials);
        if (!result.valid || !result.user) {
            throw new Error(result.error || 'Authentication failed');
        }
        const authToken = createAuthToken(result.user);
        // Store auth data
        storeToken(authToken);
        storeUser(result.user);
        return {
            user: result.user,
            token: authToken.token
        };
    },
    /**
   * Logout user and clear session
   */ logout () {
        clearAuthData();
    },
    /**
   * Validate current token
   */ async validateToken () {
        const token = getStoredToken();
        if (!token) return false;
        // Check if token is expired
        if (isTokenExpired(token.expiresAt)) {
            clearAuthData();
            return false;
        }
        // Validate token structure
        const payload = decodeToken(token.token);
        if (!payload) {
            clearAuthData();
            return false;
        }
        // Verify token matches stored user
        const user = getStoredUser();
        if (!user || user.id !== payload.sub) {
            clearAuthData();
            return false;
        }
        return true;
    },
    /**
   * Get current authenticated user
   */ getCurrentUser () {
        return getStoredUser();
    },
    /**
   * Get current token
   */ getToken () {
        const token = getStoredToken();
        return token?.token || null;
    },
    /**
   * Check if user is authenticated
   */ isAuthenticated () {
        return this.validateTokenSync();
    },
    /**
   * Synchronous token validation (for route protection)
   */ validateTokenSync () {
        const token = getStoredToken();
        if (!token) return false;
        if (isTokenExpired(token.expiresAt)) return false;
        return true;
    },
    /**
   * Refresh session on user activity
   */ refreshOnActivity () {
        refreshSession();
    },
    /**
   * Get session expiration time
   */ getSessionExpiration () {
        const token = getStoredToken();
        return token?.expiresAt || null;
    },
    /**
   * Get time remaining until session expires (in milliseconds)
   */ getTimeUntilExpiry () {
        const token = getStoredToken();
        if (!token) return 0;
        const remaining = token.expiresAt.getTime() - Date.now();
        return Math.max(0, remaining);
    }
};
const __TURBOPACK__default__export__ = authService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthContext",
    ()=>AuthContext,
    "AuthProvider",
    ()=>AuthProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/authService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
/**
 * AuthContext - React Context for authentication state management
 */ 'use client';
;
;
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    // Initialize auth state from storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": async ()=>{
                    try {
                        const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].validateToken();
                        if (isValid) {
                            const user = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
                            const token = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getToken();
                            setState({
                                user,
                                token,
                                isAuthenticated: true,
                                isLoading: false,
                                error: null
                            });
                        } else {
                            setState({
                                "AuthProvider.useEffect.initializeAuth": (prev)=>({
                                        ...prev,
                                        isLoading: false
                                    })
                            }["AuthProvider.useEffect.initializeAuth"]);
                        }
                    } catch  {
                        setState({
                            "AuthProvider.useEffect.initializeAuth": (prev)=>({
                                    ...prev,
                                    isLoading: false
                                })
                        }["AuthProvider.useEffect.initializeAuth"]);
                    }
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
        }
    }["AuthProvider.useEffect"], []);
    // Set up activity listeners to refresh session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const refreshOnActivity = {
                "AuthProvider.useEffect.refreshOnActivity": ()=>{
                    if (state.isAuthenticated) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].refreshOnActivity();
                    }
                }
            }["AuthProvider.useEffect.refreshOnActivity"];
            // Refresh on various user activities
            window.addEventListener('mousemove', refreshOnActivity);
            window.addEventListener('keypress', refreshOnActivity);
            window.addEventListener('click', refreshOnActivity);
            window.addEventListener('scroll', refreshOnActivity);
            return ({
                "AuthProvider.useEffect": ()=>{
                    window.removeEventListener('mousemove', refreshOnActivity);
                    window.removeEventListener('keypress', refreshOnActivity);
                    window.removeEventListener('click', refreshOnActivity);
                    window.removeEventListener('scroll', refreshOnActivity);
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        state.isAuthenticated
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (credentials)=>{
            setState({
                "AuthProvider.useCallback[login]": (prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    })
            }["AuthProvider.useCallback[login]"]);
            try {
                const { user, token } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login(credentials);
                setState({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Login failed';
                setState({
                    "AuthProvider.useCallback[login]": (prev)=>({
                            ...prev,
                            isLoading: false,
                            error: errorMessage
                        })
                }["AuthProvider.useCallback[login]"]);
                throw error;
            }
        }
    }["AuthProvider.useCallback[login]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
            setState({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        }
    }["AuthProvider.useCallback[logout]"], []);
    const validateToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[validateToken]": async ()=>{
            const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].validateToken();
            if (!isValid && state.isAuthenticated) {
                // Token expired or invalid, clear state
                setState({
                    "AuthProvider.useCallback[validateToken]": (prev)=>({
                            ...prev,
                            isAuthenticated: false,
                            user: null,
                            token: null
                        })
                }["AuthProvider.useCallback[validateToken]"]);
            }
            return isValid;
        }
    }["AuthProvider.useCallback[validateToken]"], [
        state.isAuthenticated
    ]);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[clearError]": ()=>{
            setState({
                "AuthProvider.useCallback[clearError]": (prev)=>({
                        ...prev,
                        error: null
                    })
            }["AuthProvider.useCallback[clearError]"]);
        }
    }["AuthProvider.useCallback[clearError]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[value]": ()=>({
                ...state,
                login,
                logout,
                validateToken,
                clearError
            })
    }["AuthProvider.useMemo[value]"], [
        state,
        login,
        logout,
        validateToken,
        clearError
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/context/AuthContext.tsx",
        lineNumber: 139,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "+AuZk8vf4W0/t7s3LZFXvqB/joE=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const __TURBOPACK__default__export__ = AuthContext;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/providers/QueryProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
'use client';
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 3
        }
    }
});
function QueryProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/providers/QueryProvider.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = QueryProvider;
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/stores/offlineStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOfflineStore",
    ()=>useOfflineStore
]);
/**
 * Offline Store - Manages offline state and queued orders
 * Stores orders that were created while offline for sync when connectivity restored
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
;
const useOfflineStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set, get)=>({
        isOnline: ("TURBOPACK compile-time truthy", 1) ? navigator.onLine : "TURBOPACK unreachable",
        queuedOrders: [],
        isSyncing: false,
        syncError: undefined,
        setOnlineStatus: (isOnline)=>{
            set({
                isOnline
            });
        },
        addQueuedOrder: (order)=>{
            const queuedOrder = {
                ...order,
                queuedAt: new Date(),
                syncAttempts: 0
            };
            set((state)=>({
                    queuedOrders: [
                        ...state.queuedOrders,
                        queuedOrder
                    ]
                }));
        },
        removeQueuedOrder: (orderId)=>{
            set((state)=>({
                    queuedOrders: state.queuedOrders.filter((order)=>order.id !== orderId)
                }));
        },
        updateQueuedOrder: (orderId, updates)=>{
            set((state)=>({
                    queuedOrders: state.queuedOrders.map((order)=>order.id === orderId ? {
                            ...order,
                            ...updates
                        } : order)
                }));
        },
        getQueuedOrders: ()=>{
            return get().queuedOrders;
        },
        setIsSyncing: (isSyncing)=>{
            set({
                isSyncing
            });
        },
        setSyncError: (error)=>{
            set({
                syncError: error
            });
        },
        clearQueuedOrders: ()=>{
            set({
                queuedOrders: []
            });
        },
        incrementSyncAttempts: (orderId)=>{
            set((state)=>({
                    queuedOrders: state.queuedOrders.map((order)=>order.id === orderId ? {
                            ...order,
                            syncAttempts: order.syncAttempts + 1
                        } : order)
                }));
        },
        setLastSyncError: (orderId, error)=>{
            set((state)=>({
                    queuedOrders: state.queuedOrders.map((order)=>order.id === orderId ? {
                            ...order,
                            lastSyncError: error
                        } : order)
                }));
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/services/storage/LocalStorageAdapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocalStorageAdapter",
    ()=>LocalStorageAdapter
]);
const ORDERS_KEY = 'pink_pin_orders';
const MERCHANTS_KEY = 'pink_pin_merchants';
const OUTLETS_KEY = 'pink_pin_outlets';
class LocalStorageAdapter {
    async getOrders() {
        const data = localStorage.getItem(ORDERS_KEY);
        if (!data) return [];
        const orders = JSON.parse(data);
        return orders.map((order)=>({
                ...order,
                createdAt: new Date(order.createdAt),
                updatedAt: new Date(order.updatedAt)
            }));
    }
    async getOrderById(id) {
        const orders = await this.getOrders();
        const order = orders.find((o)=>o.id === id);
        return order || null;
    }
    async createOrder(order) {
        const orders = await this.getOrders();
        const newOrder = {
            ...order,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt)
        };
        orders.push(newOrder);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        return newOrder;
    }
    async updateOrder(id, updates) {
        const orders = await this.getOrders();
        const index = orders.findIndex((o)=>o.id === id);
        if (index === -1) throw new Error(`Order ${id} not found`);
        const updatedOrder = {
            ...orders[index],
            ...updates,
            updatedAt: new Date()
        };
        orders[index] = updatedOrder;
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        return updatedOrder;
    }
    async deleteOrder(id) {
        const orders = await this.getOrders();
        const filtered = orders.filter((o)=>o.id !== id);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
    }
    async getMerchant(id) {
        const data = localStorage.getItem(MERCHANTS_KEY);
        if (!data) return null;
        const merchants = JSON.parse(data);
        const merchant = merchants.find((m)=>m.id === id);
        return merchant || null;
    }
    async getOutlets() {
        const data = localStorage.getItem(OUTLETS_KEY);
        if (!data) return [];
        const outlets = JSON.parse(data);
        return outlets.map((outlet)=>({
                ...outlet,
                createdAt: new Date(outlet.createdAt)
            }));
    }
    async getOutletById(id) {
        const outlets = await this.getOutlets();
        const outlet = outlets.find((o)=>o.id === id);
        return outlet || null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStorageAdapter",
    ()=>getStorageAdapter,
    "setStorageAdapter",
    ()=>setStorageAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$LocalStorageAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/LocalStorageAdapter.ts [app-client] (ecmascript)");
;
let storageAdapter = null;
function getStorageAdapter() {
    if (!storageAdapter) {
        storageAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$LocalStorageAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocalStorageAdapter"]();
    }
    return storageAdapter;
}
function setStorageAdapter(adapter) {
    storageAdapter = adapter;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/services/offlineService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Offline Service - Manages offline detection and queue synchronization
 * Handles online/offline status detection and automatic sync when connectivity restored
 */ __turbopack_context__.s([
    "clearOfflineQueue",
    ()=>clearOfflineQueue,
    "getQueuedOrdersCount",
    ()=>getQueuedOrdersCount,
    "initializeOfflineDetection",
    ()=>initializeOfflineDetection,
    "isOnline",
    ()=>isOnline,
    "queueOrderForSync",
    ()=>queueOrderForSync,
    "syncQueuedOrders",
    ()=>syncQueuedOrders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/stores/offlineStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
;
;
const OFFLINE_QUEUE_KEY = 'pink_pin_offline_queue';
const MAX_SYNC_ATTEMPTS = 3;
function initializeOfflineDetection() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Set initial online status
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].setState({
        isOnline: navigator.onLine
    });
    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // Restore queued orders from localStorage on initialization
    restoreQueuedOrdersFromStorage();
    return ()=>{
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
}
/**
 * Handle online event - attempt to sync queued orders
 */ async function handleOnline() {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].setState({
        isOnline: true
    });
    await syncQueuedOrders();
}
/**
 * Handle offline event
 */ function handleOffline() {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].setState({
        isOnline: false
    });
}
function queueOrderForSync(order) {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].getState();
    store.addQueuedOrder(order);
    persistQueuedOrdersToStorage();
}
async function syncQueuedOrders() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].getState();
    const queuedOrders = store.getQueuedOrders();
    if (queuedOrders.length === 0) {
        return;
    }
    store.setIsSyncing(true);
    store.setSyncError(undefined);
    const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
    let successCount = 0;
    let failureCount = 0;
    for (const queuedOrder of queuedOrders){
        try {
            // Check if max sync attempts exceeded
            if (queuedOrder.syncAttempts >= MAX_SYNC_ATTEMPTS) {
                store.setLastSyncError(queuedOrder.id, `Failed to sync after ${MAX_SYNC_ATTEMPTS} attempts`);
                failureCount++;
                continue;
            }
            // Attempt to sync the order
            const { queuedAt, syncAttempts, lastSyncError, ...orderData } = queuedOrder;
            await adapter.createOrder(orderData);
            // Remove from queue on success
            store.removeQueuedOrder(queuedOrder.id);
            successCount++;
        } catch (error) {
            store.incrementSyncAttempts(queuedOrder.id);
            store.setLastSyncError(queuedOrder.id, error instanceof Error ? error.message : 'Unknown error');
            failureCount++;
        }
    }
    // Persist updated queue to storage
    persistQueuedOrdersToStorage();
    // Update sync status
    if (failureCount > 0) {
        store.setSyncError(`Synced ${successCount} orders. ${failureCount} orders failed to sync.`);
    }
    store.setIsSyncing(false);
}
/**
 * Persist queued orders to localStorage
 */ function persistQueuedOrdersToStorage() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].getState();
    const queuedOrders = store.getQueuedOrders();
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queuedOrders));
}
/**
 * Restore queued orders from localStorage
 */ function restoreQueuedOrdersFromStorage() {
    try {
        const data = localStorage.getItem(OFFLINE_QUEUE_KEY);
        if (data) {
            const queuedOrders = JSON.parse(data);
            const store = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].getState();
            queuedOrders.forEach((order)=>{
                store.addQueuedOrder(order);
            });
        }
    } catch (error) {
        console.error('Failed to restore queued orders from storage:', error);
    }
}
function clearOfflineQueue() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].getState();
    store.clearQueuedOrders();
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
}
function isOnline() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return navigator.onLine;
}
function getQueuedOrdersCount() {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"].getState();
    return store.getQueuedOrders().length;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OfflineIndicator",
    ()=>OfflineIndicator,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * OfflineIndicator - Displays offline status and queued orders information
 * Shows when app is offline and number of orders pending sync
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/stores/offlineStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function OfflineIndicator() {
    _s();
    const { isOnline, queuedOrders, isSyncing, syncError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"])();
    const [showDetails, setShowDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (isOnline && queuedOrders.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `rounded-lg shadow-lg p-4 max-w-sm cursor-pointer transition-all ${isOnline ? 'bg-blue-50 border border-blue-200' : 'bg-yellow-50 border border-yellow-200'}`,
            onClick: ()=>setShowDetails(!showDetails),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                !isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-yellow-800",
                                    children: "You are offline"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                isOnline && queuedOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-blue-800",
                                    children: isSyncing ? 'Syncing orders...' : `${queuedOrders.length} order${queuedOrders.length !== 1 ? 's' : ''} pending sync`
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        queuedOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: `w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`,
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                showDetails && queuedOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 pt-4 border-t border-gray-200 space-y-2",
                    children: [
                        queuedOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 p-2 bg-white rounded border border-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-gray-700",
                                                    children: order.id
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500",
                                                    children: order.recipient.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                order.syncAttempts > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-yellow-600",
                                                    children: [
                                                        "Attempt ",
                                                        order.syncAttempts,
                                                        "/",
                                                        3
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 23
                                                }, this),
                                                order.lastSyncError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-600 text-xs",
                                                    children: order.lastSyncError
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this)
                            }, order.id, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this)),
                        syncError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700",
                            children: syncError
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                            lineNumber: 104,
                            columnNumber: 15
                        }, this),
                        isSyncing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-xs text-blue-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, this),
                                "Syncing..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                            lineNumber: 110,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(OfflineIndicator, "PnUfy7v1h4zEuQ0Bgyk4OrZHUc8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$offlineStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOfflineStore"]
    ];
});
_c = OfflineIndicator;
const __TURBOPACK__default__export__ = OfflineIndicator;
var _c;
__turbopack_context__.k.register(_c, "OfflineIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/OfflineInitializer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OfflineInitializer",
    ()=>OfflineInitializer,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$offlineService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/offlineService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OfflineIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/OfflineIndicator.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * OfflineInitializer - Client component that initializes offline detection
 * Must be rendered in a client component context
 */ 'use client';
;
;
;
function OfflineInitializer() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OfflineInitializer.useEffect": ()=>{
            const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$offlineService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeOfflineDetection"])();
            return cleanup;
        }
    }["OfflineInitializer.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OfflineIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineIndicator"], {}, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OfflineInitializer.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_s(OfflineInitializer, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = OfflineInitializer;
const __TURBOPACK__default__export__ = OfflineInitializer;
var _c;
__turbopack_context__.k.register(_c, "OfflineInitializer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_TechSmith_PinkPin_src_d130cc0b._.js.map