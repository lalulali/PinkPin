(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginPage",
    ()=>LoginPage,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/utils/validation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * LoginPage - Authentication page for Pink Pin Merchant App
 * Handles user login with email, password, and CAPTCHA verification
 */ 'use client';
;
;
;
;
function LoginPageContent() {
    _s();
    const { login, isLoading, error: authError, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    // Form state
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [captchaChecked, setCaptchaChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [touched, setTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Get return URL from query params
    const [returnTo, setReturnTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('/dashboard');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginPageContent.useEffect": ()=>{
            // Parse returnTo from URL query params
            const returnParam = searchParams.get('returnTo');
            if (returnParam) {
                try {
                    const decoded = decodeURIComponent(returnParam);
                    // Validate it's a safe URL (internal path)
                    if (decoded.startsWith('/') && !decoded.startsWith('//')) {
                        setReturnTo(decoded);
                    }
                } catch  {
                // Invalid return URL, use default
                }
            }
        }
    }["LoginPageContent.useEffect"], [
        searchParams
    ]);
    // Redirect to intended destination after successful login
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginPageContent.useEffect": ()=>{
            if (isAuthenticated) {
                router.push(returnTo);
            }
        }
    }["LoginPageContent.useEffect"], [
        isAuthenticated,
        returnTo,
        router
    ]);
    // Validate email field
    const validateEmailField = (value)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidationError"])('email', value, 'email');
    };
    // Validate password field
    const validatePasswordField = (value)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$utils$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidationError"])('password', value, 'required');
    };
    // Handle email blur
    const handleEmailBlur = ()=>{
        setTouched((prev)=>({
                ...prev,
                email: true
            }));
        const error = validateEmailField(email);
        setErrors((prev)=>({
                ...prev,
                email: error || undefined
            }));
    };
    // Handle password blur
    const handlePasswordBlur = ()=>{
        setTouched((prev)=>({
                ...prev,
                password: true
            }));
        const error = validatePasswordField(password);
        setErrors((prev)=>({
                ...prev,
                password: error || undefined
            }));
    };
    // Handle email change
    const handleEmailChange = (e)=>{
        const value = e.target.value;
        setEmail(value);
        // Real-time validation if field has been touched
        if (touched.email) {
            const error = validateEmailField(value);
            setErrors((prev)=>({
                    ...prev,
                    email: error || undefined
                }));
        }
    };
    // Handle password change
    const handlePasswordChange = (e)=>{
        const value = e.target.value;
        setPassword(value);
        // Real-time validation if field has been touched
        if (touched.password) {
            const error = validatePasswordField(value);
            setErrors((prev)=>({
                    ...prev,
                    password: error || undefined
                }));
        }
    };
    // Handle form submission
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Validate all fields
        const emailError = validateEmailField(email);
        const passwordError = validatePasswordField(password);
        const captchaError = !captchaChecked ? 'Please verify the CAPTCHA' : undefined;
        setErrors({
            email: emailError || undefined,
            password: passwordError || undefined,
            captcha: captchaError
        });
        // Mark all fields as touched
        setTouched({
            email: true,
            password: true
        });
        // Stop if validation failed
        if (emailError || passwordError || captchaError) {
            return;
        }
        try {
            const credentials = {
                email,
                password,
                captchaVerified: captchaChecked
            };
            await login(credentials);
        // Navigation happens automatically via useEffect when isAuthenticated changes
        } catch  {
        // Error is handled by authError from context
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 mb-2",
                            children: "Pink Pin"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Merchant Order Management"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-semibold text-gray-900 mb-6",
                            children: "Login"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        authError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-700 text-sm",
                                children: authError
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "email",
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Email Address"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "email",
                                            type: "email",
                                            value: email,
                                            onChange: handleEmailChange,
                                            onBlur: handleEmailBlur,
                                            placeholder: "demo@pinkpin.com",
                                            className: `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${errors.email ? 'border-red-300 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-[#ED0577]'}`,
                                            disabled: isLoading
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-red-600",
                                            children: errors.email
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 178,
                                            columnNumber: 32
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "password",
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "password",
                                            type: "password",
                                            value: password,
                                            onChange: handlePasswordChange,
                                            onBlur: handlePasswordBlur,
                                            placeholder: "••••••••",
                                            className: `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${errors.password ? 'border-red-300 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-[#ED0577]'}`,
                                            disabled: isLoading
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, this),
                                        errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-red-600",
                                            children: errors.password
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 200,
                                            columnNumber: 35
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start space-x-3 p-4 border border-gray-300 rounded-md bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "captcha",
                                            type: "checkbox",
                                            checked: captchaChecked,
                                            onChange: (e)=>{
                                                setCaptchaChecked(e.target.checked);
                                                if (e.target.checked) {
                                                    setErrors((prev)=>({
                                                            ...prev,
                                                            captcha: undefined
                                                        }));
                                                }
                                            },
                                            className: "mt-1 w-5 h-5 text-[#ED0577] border-gray-300 rounded focus:ring-[#ED0577] cursor-pointer",
                                            disabled: isLoading
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "captcha",
                                            className: "text-sm text-gray-700 cursor-pointer flex-1",
                                            children: "I'm not a robot"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                errors.captcha && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600",
                                    children: errors.captcha
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                    lineNumber: 222,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "w-full bg-[#ED0577] hover:bg-[#d60668] disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:ring-offset-2",
                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "opacity-25",
                                                        cx: "12",
                                                        cy: "12",
                                                        r: "10",
                                                        stroke: "currentColor",
                                                        strokeWidth: "4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        className: "opacity-75",
                                                        fill: "currentColor",
                                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                                lineNumber: 232,
                                                columnNumber: 19
                                            }, this),
                                            "Logging in..."
                                        ]
                                    }, void 0, true) : 'Login'
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: "Demo Credentials:"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this),
                                    "Email: demo@pinkpin.com",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this),
                                    "Password: demo123"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
            lineNumber: 139,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(LoginPageContent, "XWEMfZ1OpHgrD0EM8BLj0naW3Gs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = LoginPageContent;
function LoginPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
            lineNumber: 262,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginPageContent, {}, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
            lineNumber: 263,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/LoginPage.tsx",
        lineNumber: 262,
        columnNumber: 5
    }, this);
}
_c1 = LoginPage;
const __TURBOPACK__default__export__ = LoginPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "LoginPageContent");
__turbopack_context__.k.register(_c1, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Documents_TechSmith_PinkPin_9730d378._.js.map