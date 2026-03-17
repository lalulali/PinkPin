(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/TechSmith/PinkPin/src/hooks/useOrders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOrders",
    ()=>useOrders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useOrders() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'orders'
        ],
        queryFn: {
            "useOrders.useQuery": async ()=>{
                const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
                return adapter.getOrders();
            }
        }["useOrders.useQuery"]
    });
}
_s(useOrders, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/stores/uiStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUIStore",
    ()=>useUIStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const defaultFilters = {
    dateRange: {
        from: null,
        to: null
    },
    statuses: [],
    outletId: null,
    serviceTypes: [],
    invoiceNumber: ''
};
const defaultSort = {
    field: 'date',
    direction: 'desc'
};
const useUIStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        // Filters
        filters: defaultFilters,
        setFilters: (newFilters)=>set((state)=>({
                    filters: {
                        ...state.filters,
                        ...newFilters
                    }
                })),
        resetFilters: ()=>set({
                filters: defaultFilters
            }),
        // Sort
        sort: defaultSort,
        setSort: (sort)=>set({
                sort
            }),
        // Layout
        layout: 'card',
        setLayout: (layout)=>set({
                layout
            }),
        // Pagination
        currentPage: 1,
        itemsPerPage: 20,
        setCurrentPage: (page)=>set({
                currentPage: page
            }),
        setItemsPerPage: (items)=>set({
                itemsPerPage: items
            }),
        // UI state
        isLoading: false,
        setIsLoading: (loading)=>set({
                isLoading: loading
            }),
        error: null,
        setError: (error)=>set({
                error
            })
    }), {
    name: 'pink-pin-ui-store',
    partialize: (state)=>({
            filters: state.filters,
            sort: state.sort,
            layout: state.layout,
            currentPage: state.currentPage,
            itemsPerPage: state.itemsPerPage
        }),
    merge: (persistedState, currentState)=>({
            ...currentState,
            ...persistedState
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/hooks/useUIStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFilters",
    ()=>useFilters,
    "useLayout",
    ()=>useLayout,
    "usePagination",
    ()=>usePagination,
    "useSort",
    ()=>useSort,
    "useUIState",
    ()=>useUIState,
    "useUIStoreState",
    ()=>useUIStoreState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/stores/uiStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
const useFilters = ()=>{
    _s();
    const filters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useFilters.useStore[filters]": (state)=>state.filters
    }["useFilters.useStore[filters]"]);
    const setFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useFilters.useStore[setFilters]": (state)=>state.setFilters
    }["useFilters.useStore[setFilters]"]);
    const resetFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useFilters.useStore[resetFilters]": (state)=>state.resetFilters
    }["useFilters.useStore[resetFilters]"]);
    return {
        filters,
        setFilters,
        resetFilters,
        setDateRange: (from, to)=>setFilters({
                dateRange: {
                    from,
                    to
                }
            }),
        setStatuses: (statuses)=>setFilters({
                statuses
            }),
        setOutletId: (outletId)=>setFilters({
                outletId
            }),
        setServiceTypes: (serviceTypes)=>setFilters({
                serviceTypes
            }),
        setInvoiceNumber: (invoiceNumber)=>setFilters({
                invoiceNumber
            })
    };
};
_s(useFilters, "OVi1OHUGouIvrt4cxtbs7O1a1Oo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
const useSort = ()=>{
    _s1();
    const sort = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useSort.useStore[sort]": (state)=>state.sort
    }["useSort.useStore[sort]"]);
    const setSort = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useSort.useStore[setSort]": (state)=>state.setSort
    }["useSort.useStore[setSort]"]);
    return {
        sort,
        setSort,
        setSortField: (field)=>setSort({
                ...sort,
                field
            }),
        setSortDirection: (direction)=>setSort({
                ...sort,
                direction
            }),
        toggleSortDirection: ()=>setSort({
                ...sort,
                direction: sort.direction === 'asc' ? 'desc' : 'asc'
            })
    };
};
_s1(useSort, "mqkTJJ/rgwlUfo3phoH/ry8Hyeg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
const useLayout = ()=>{
    _s2();
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useLayout.useStore[layout]": (state)=>state.layout
    }["useLayout.useStore[layout]"]);
    const setLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useLayout.useStore[setLayout]": (state)=>state.setLayout
    }["useLayout.useStore[setLayout]"]);
    return {
        layout,
        setLayout,
        toggleLayout: ()=>setLayout(layout === 'card' ? 'table' : 'card')
    };
};
_s2(useLayout, "IMG7CtgvKmUNUNG3KjbmFeIxZm0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
const usePagination = ()=>{
    _s3();
    const currentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "usePagination.useStore[currentPage]": (state)=>state.currentPage
    }["usePagination.useStore[currentPage]"]);
    const itemsPerPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "usePagination.useStore[itemsPerPage]": (state)=>state.itemsPerPage
    }["usePagination.useStore[itemsPerPage]"]);
    const setCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "usePagination.useStore[setCurrentPage]": (state)=>state.setCurrentPage
    }["usePagination.useStore[setCurrentPage]"]);
    const setItemsPerPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "usePagination.useStore[setItemsPerPage]": (state)=>state.setItemsPerPage
    }["usePagination.useStore[setItemsPerPage]"]);
    return {
        currentPage,
        itemsPerPage,
        setCurrentPage,
        setItemsPerPage,
        nextPage: ()=>setCurrentPage(currentPage + 1),
        previousPage: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
        goToPage: (page)=>setCurrentPage(Math.max(1, page))
    };
};
_s3(usePagination, "zNdLaer2klx1LmVC6NZHPsaDuK0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
const useUIState = ()=>{
    _s4();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useUIState.useStore[isLoading]": (state)=>state.isLoading
    }["useUIState.useStore[isLoading]"]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useUIState.useStore[error]": (state)=>state.error
    }["useUIState.useStore[error]"]);
    const setIsLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useUIState.useStore[setIsLoading]": (state)=>state.setIsLoading
    }["useUIState.useStore[setIsLoading]"]);
    const setError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "useUIState.useStore[setError]": (state)=>state.setError
    }["useUIState.useStore[setError]"]);
    return {
        isLoading,
        error,
        setIsLoading,
        setError,
        clearError: ()=>setError(null)
    };
};
_s4(useUIState, "j1RttztxJjdjEx9ZK8GafYtQVWY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
const useUIStoreState = ()=>{
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])();
};
_s5(useUIStoreState, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$stores$2f$uiStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/hooks/useOutlets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOutlets",
    ()=>useOutlets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/services/storage/index.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useOutlets() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'outlets'
        ],
        queryFn: {
            "useOutlets.useQuery": async ()=>{
                const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$services$2f$storage$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageAdapter"])();
                return adapter.getOutlets();
            }
        }["useOutlets.useQuery"]
    });
}
_s(useOutlets, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterBar",
    ()=>FilterBar,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUIStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOutlets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useOutlets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * FilterBar - Filter controls for order history
 * Includes: date range, status, outlet, service type, invoice number
 */ 'use client';
;
;
;
const statusOptions = [
    {
        value: 'submitted',
        label: 'Shipment Created'
    },
    {
        value: 'waiting',
        label: 'Waiting for Pick Up'
    },
    {
        value: 'closed',
        label: 'Delivery Completed'
    },
    {
        value: 'cancelled',
        label: 'Shipment Cancelled'
    }
];
const serviceTypeOptions = [
    {
        value: 'standard',
        label: 'Standard'
    },
    {
        value: 'express',
        label: 'Express'
    },
    {
        value: 'same-day',
        label: 'Same-Day'
    }
];
function FilterBar({ onFilterChange }) {
    _s();
    const { filters, setDateRange, setStatuses, setOutletId, setServiceTypes, setInvoiceNumber, resetFilters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"])();
    const { data: outlets = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOutlets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOutlets"])();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFilterUpdate = ()=>{
        onFilterChange?.();
    };
    const handleReset = ()=>{
        resetFilters();
        onFilterChange?.();
    };
    const hasActiveFilters = filters.dateRange.from !== null || filters.dateRange.to !== null || filters.statuses.length > 0 || filters.outletId !== null || filters.serviceTypes.length > 0 || filters.invoiceNumber !== '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-gray-200 rounded-lg mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsExpanded(!isExpanded),
                className: "w-full md:hidden flex items-center justify-between px-4 py-3 text-left min-h-[44px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-gray-700",
                        children: [
                            isExpanded ? 'Hide Filters' : 'Show Filters',
                            hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-[#ED0577]",
                                children: "(Active)"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 62,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`,
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${isExpanded || 'hidden md:block'} p-4 space-y-4`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "invoice-search",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Invoice Number"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "invoice-search",
                                placeholder: "Search invoice number...",
                                value: filters.invoiceNumber,
                                onChange: (e)=>{
                                    setInvoiceNumber(e.target.value);
                                    handleFilterUpdate();
                                },
                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px]"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "date-from",
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "From Date"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        id: "date-from",
                                        value: filters.dateRange.from ? new Date(filters.dateRange.from).toISOString().split('T')[0] : '',
                                        onChange: (e)=>{
                                            setDateRange(e.target.value ? new Date(e.target.value) : null, filters.dateRange.to);
                                            handleFilterUpdate();
                                        },
                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "date-to",
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "To Date"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        id: "date-to",
                                        value: filters.dateRange.to ? new Date(filters.dateRange.to).toISOString().split('T')[0] : '',
                                        onChange: (e)=>{
                                            setDateRange(filters.dateRange.from, e.target.value ? new Date(e.target.value) : null);
                                            handleFilterUpdate();
                                        },
                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-2",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: statusOptions.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const newStatuses = filters.statuses.includes(status.value) ? filters.statuses.filter((s)=>s !== status.value) : [
                                                ...filters.statuses,
                                                status.value
                                            ];
                                            setStatuses(newStatuses);
                                            handleFilterUpdate();
                                        },
                                        className: `px-3 py-1.5 text-sm rounded-full transition-colors min-h-[36px] ${filters.statuses.includes(status.value) ? 'bg-[#ED0577] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                        children: status.label
                                    }, status.value, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-2",
                                children: "Service Type"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: serviceTypeOptions.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const newTypes = filters.serviceTypes.includes(service.value) ? filters.serviceTypes.filter((t)=>t !== service.value) : [
                                                ...filters.serviceTypes,
                                                service.value
                                            ];
                                            setServiceTypes(newTypes);
                                            handleFilterUpdate();
                                        },
                                        className: `px-3 py-1.5 text-sm rounded-full transition-colors min-h-[36px] ${filters.serviceTypes.includes(service.value) ? 'bg-[#ED0577] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                        children: service.label
                                    }, service.value, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "outlet-filter",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Outlet"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "outlet-filter",
                                value: filters.outletId || '',
                                onChange: (e)=>{
                                    setOutletId(e.target.value || null);
                                    handleFilterUpdate();
                                },
                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Outlets"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    outlets.map((outlet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: outlet.id,
                                            children: outlet.name
                                        }, outlet.id, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleReset,
                        className: "px-4 py-2 text-sm text-gray-600 hover:text-[#ED0577] transition-colors min-h-[44px] flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 mr-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this),
                            "Clear Filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(FilterBar, "QOxeyuSdpOJywfGGT7ZavPWVtoI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOutlets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOutlets"]
    ];
});
_c = FilterBar;
const __TURBOPACK__default__export__ = FilterBar;
var _c;
__turbopack_context__.k.register(_c, "FilterBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutToggle",
    ()=>LayoutToggle,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUIStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * LayoutToggle - Toggle between card view and table view
 * Implements Requirement 10.8
 */ 'use client';
;
function LayoutToggle() {
    _s();
    const { layout, toggleLayout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-gray-600 hidden sm:inline",
                children: "View:"
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex rounded-lg border border-gray-200 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>layout !== 'card' && toggleLayout(),
                        className: `px-3 py-1.5 text-sm transition-colors min-h-[36px] flex items-center gap-1 ${layout === 'card' ? 'bg-[#ED0577] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`,
                        "aria-label": "Switch to card view",
                        "aria-pressed": layout === 'card',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Card"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>layout !== 'table' && toggleLayout(),
                        className: `px-3 py-1.5 text-sm transition-colors min-h-[36px] flex items-center gap-1 ${layout === 'table' ? 'bg-[#ED0577] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`,
                        "aria-label": "Switch to table view",
                        "aria-pressed": layout === 'table',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 6h16M4 10h16M4 14h16M4 18h16"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Table"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(LayoutToggle, "B9+aqXFAyy8EGuSFoN+eQr28MI0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"]
    ];
});
_c = LayoutToggle;
const __TURBOPACK__default__export__ = LayoutToggle;
var _c;
__turbopack_context__.k.register(_c, "LayoutToggle");
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
"[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * CancelOrderDialog - Confirmation dialog for cancelling an order
 * Displays order details and asks for confirmation before cancelling
 * Implements Requirement 10.11
 */ __turbopack_context__.s([
    "CancelOrderDialog",
    ()=>CancelOrderDialog,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function CancelOrderDialog({ isOpen, invoiceNumber, recipientName, onConfirm, onCancel }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-8 h-8 text-red-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center text-gray-900 mb-2",
                    children: "Cancel Order?"
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600 mb-4",
                    children: "Are you sure you want to cancel this order? This action cannot be undone."
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 rounded-lg p-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Order ID"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-mono font-medium text-gray-900",
                                    children: invoiceNumber
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Recipient"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-gray-900",
                                    children: recipientName
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[44px]",
                            children: "Keep Order"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            className: "flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors min-h-[44px]",
                            children: "Cancel Order"
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = CancelOrderDialog;
const __TURBOPACK__default__export__ = CancelOrderDialog;
var _c;
__turbopack_context__.k.register(_c, "CancelOrderDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderCard",
    ()=>OrderCard,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUpdateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUpdateOrder.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$CancelOrderDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/CancelOrderDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUIStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * OrderCard - Card component for displaying order in card view
 * Shows order ID, status badge, recipient name, distance, shipping fee
 * Action buttons (edit, cancel, see detail) appear on hover
 * Implements Requirement 10.9 and 10.11
 */ 'use client';
;
;
;
;
;
;
// Status badge colors per Requirement 4.7
const statusColors = {
    submitted: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Shipment Created'
    },
    waiting: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'Waiting for Pick Up'
    },
    closed: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Delivery Completed'
    },
    cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Shipment Cancelled'
    }
};
function OrderCard({ order }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showActions, setShowActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCancelDialog, setShowCancelDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const updateOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUpdateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateOrder"])();
    const { filters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"])();
    const { sort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSort"])();
    const { layout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"])();
    const { currentPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"])();
    const statusConfig = statusColors[order.status] || statusColors.submitted;
    // Only allow cancelling orders that are submitted or waiting (not already closed or cancelled)
    const canCancel = order.status === 'submitted' || order.status === 'waiting';
    const handleEdit = (e)=>{
        e.stopPropagation();
        router.push(`/create-order?edit=${order.id}`);
    };
    const handleCancel = async (e)=>{
        e.stopPropagation();
        setShowCancelDialog(true);
    };
    const handleCancelConfirm = async ()=>{
        try {
            await updateOrder.mutateAsync({
                id: order.id,
                updates: {
                    status: 'cancelled',
                    statusDisplay: 'Shipment Cancelled'
                }
            });
            setShowCancelDialog(false);
        } catch (error) {
            console.error('Failed to cancel order:', error);
        }
    };
    const handleSeeDetail = (e)=>{
        e.stopPropagation();
        // Preserve filter and sort state in URL for back button (Requirement 10.12)
        const params = new URLSearchParams();
        params.set('page', String(currentPage));
        if (filters.dateRange.from) params.set('from', filters.dateRange.from.toISOString());
        if (filters.dateRange.to) params.set('to', filters.dateRange.to.toISOString());
        if (filters.statuses.length > 0) params.set('statuses', filters.statuses.join(','));
        if (filters.outletId) params.set('outletId', filters.outletId);
        if (filters.serviceTypes.length > 0) params.set('serviceTypes', filters.serviceTypes.join(','));
        if (filters.invoiceNumber) params.set('invoiceNumber', filters.invoiceNumber);
        params.set('sortField', sort.field);
        params.set('sortDir', sort.direction);
        params.set('layout', layout);
        router.push(`/orders/${order.id}?${params.toString()}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer",
        onMouseEnter: ()=>setShowActions(true),
        onMouseLeave: ()=>setShowActions(false),
        onClick: handleSeeDetail,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Order ID"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-900",
                                children: order.invoiceNumber
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `px-2 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`,
                        children: statusConfig.label
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Recipient"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium text-gray-900",
                        children: order.recipient.name
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 truncate",
                        children: order.recipient.address
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Distance"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: [
                                    order.delivery.distance.toFixed(1),
                                    " km"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Service"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900 capitalize",
                                children: order.delivery.serviceType
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between pt-3 border-t border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Shipping Fee"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-[#ED0577]",
                                children: new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(order.delivery.shippingFee)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Created"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(order.createdAt), 'MMM d, yyyy')
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-0 bg-white/95 rounded-lg flex items-center justify-center gap-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleEdit,
                        className: `px-4 py-2 rounded-md transition-colors min-h-[44px] min-w-[80px] ${order.status === 'submitted' ? 'bg-[#ED0577] text-white hover:bg-[#d9066a]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`,
                        disabled: order.status !== 'submitted',
                        title: order.status !== 'submitted' ? 'Only pending orders can be edited' : '',
                        children: "Edit"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCancel,
                        className: `px-4 py-2 rounded-md transition-colors min-h-[44px] min-w-[80px] ${canCancel ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' : 'border border-gray-200 text-gray-300 cursor-not-allowed'}`,
                        disabled: !canCancel,
                        title: !canCancel ? 'Only pending orders can be cancelled' : '',
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSeeDetail,
                        className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors min-h-[44px] min-w-[80px]",
                        children: "See Detail"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$CancelOrderDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancelOrderDialog"], {
                isOpen: showCancelDialog,
                invoiceNumber: order.invoiceNumber,
                recipientName: order.recipient.name,
                onConfirm: handleCancelConfirm,
                onCancel: ()=>setShowCancelDialog(false)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(OrderCard, "lK+/yLMzvgaQJtTms2hOPQ55RSw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUpdateOrder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateOrder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSort"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"]
    ];
});
_c = OrderCard;
const __TURBOPACK__default__export__ = OrderCard;
var _c;
__turbopack_context__.k.register(_c, "OrderCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderTableRow",
    ()=>OrderTableRow,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUIStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * OrderTableRow - Table row component for displaying order in table view
 * Implements Requirement 10.8
 */ 'use client';
;
;
;
// Status badge colors per Requirement 4.7
const statusColors = {
    submitted: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Shipment Created'
    },
    waiting: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'Waiting for Pick Up'
    },
    closed: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Delivery Completed'
    },
    cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Shipment Cancelled'
    }
};
function OrderTableRow({ order }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const statusConfig = statusColors[order.status] || statusColors.submitted;
    const { filters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"])();
    const { sort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSort"])();
    const { layout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"])();
    const { currentPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"])();
    const handleEdit = (e)=>{
        e.stopPropagation();
        router.push(`/create-order?edit=${order.id}`);
    };
    const handleCancel = async (e)=>{
        e.stopPropagation();
        if (confirm('Are you sure you want to cancel this order?')) {
            console.log('Cancel order:', order.id);
        }
    };
    const handleSeeDetail = (e)=>{
        e.stopPropagation();
        // Preserve filter and sort state in URL for back button (Requirement 10.12)
        const params = new URLSearchParams();
        params.set('page', String(currentPage));
        if (filters.dateRange.from) params.set('from', filters.dateRange.from.toISOString());
        if (filters.dateRange.to) params.set('to', filters.dateRange.to.toISOString());
        if (filters.statuses.length > 0) params.set('statuses', filters.statuses.join(','));
        if (filters.outletId) params.set('outletId', filters.outletId);
        if (filters.serviceTypes.length > 0) params.set('serviceTypes', filters.serviceTypes.join(','));
        if (filters.invoiceNumber) params.set('invoiceNumber', filters.invoiceNumber);
        params.set('sortField', sort.field);
        params.set('sortDir', sort.direction);
        params.set('layout', layout);
        router.push(`/orders/${order.id}?${params.toString()}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors",
        onClick: handleSeeDetail,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-gray-900",
                    children: order.invoiceNumber
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `px-2 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`,
                    children: statusConfig.label
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-gray-900",
                            children: order.recipient.name
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 truncate max-w-[150px]",
                            children: order.recipient.address
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-700",
                    children: [
                        order.delivery.distance.toFixed(1),
                        " km"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#ED0577]",
                    children: new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    }).format(order.delivery.shippingFee)
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-700",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(order.createdAt), 'MMM d, yyyy')
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleEdit,
                            className: "p-1.5 text-gray-500 hover:text-[#ED0577] hover:bg-gray-100 rounded transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center",
                            "aria-label": "Edit order",
                            disabled: order.status !== 'submitted',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCancel,
                            className: "p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center",
                            "aria-label": "Cancel order",
                            disabled: order.status !== 'submitted',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSeeDetail,
                            className: "p-1.5 text-gray-500 hover:text-[#ED0577] hover:bg-gray-100 rounded transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center",
                            "aria-label": "View order details",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(OrderTableRow, "bLsRLMaQGE12O64cLaz8nMeVEiw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSort"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"]
    ];
});
_c = OrderTableRow;
const __TURBOPACK__default__export__ = OrderTableRow;
var _c;
__turbopack_context__.k.register(_c, "OrderTableRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pagination",
    ()=>Pagination,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Pagination - Pagination controls for order list
 * Displays 20 orders per page (Requirement 10.1)
 */ 'use client';
;
function Pagination({ currentPage, totalPages, totalItems, showingStart, showingEnd, onPageChange }) {
    // Generate page numbers to display
    const getPageNumbers = ()=>{
        const pages = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for(let i = 1; i <= totalPages; i++){
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            // Calculate start and end of visible page range
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            // Adjust if at the beginning
            if (currentPage <= 2) {
                end = maxVisiblePages - 1;
            }
            // Adjust if at the end
            if (currentPage >= totalPages - 1) {
                start = totalPages - maxVisiblePages + 2;
            }
            // Add ellipsis if needed
            if (start > 2) {
                pages.push('...');
            }
            // Add visible pages
            for(let i = start; i <= end; i++){
                pages.push(i);
            }
            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pages.push('...');
            }
            // Always show last page
            pages.push(totalPages);
        }
        return pages;
    };
    const pageNumbers = getPageNumbers();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 flex flex-col sm:flex-row items-center justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: [
                    "Showing ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: showingStart
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    " to",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: showingEnd
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    " of",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: totalItems
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    " orders"
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center gap-1",
                "aria-label": "Pagination",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPageChange(currentPage - 1),
                        disabled: currentPage === 1,
                        className: "p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center",
                        "aria-label": "Previous page",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M15 19l-7-7 7-7"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    pageNumbers.map((page, index)=>typeof page === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onPageChange(page),
                            className: `px-3 py-2 rounded-md text-sm font-medium min-w-[36px] min-h-[36px] flex items-center justify-center ${page === currentPage ? 'bg-[#ED0577] text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                            "aria-label": `Page ${page}`,
                            "aria-current": page === currentPage ? 'page' : undefined,
                            children: page
                        }, index, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-2 text-gray-500",
                            children: "..."
                        }, index, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPageChange(currentPage + 1),
                        disabled: currentPage === totalPages,
                        className: "p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center",
                        "aria-label": "Next page",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M9 5l7 7-7 7"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_c = Pagination;
const __TURBOPACK__default__export__ = Pagination;
var _c;
__turbopack_context__.k.register(_c, "Pagination");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * EmptyState - Displayed when no orders match the filter criteria
 * Implements Requirement 10.15
 */ __turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function EmptyState({ title = 'No orders found', description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-12 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-8 h-8 text-gray-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-medium text-gray-900 mb-2",
                children: title
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600 text-center max-w-sm mb-4",
                children: description
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: action.onClick,
                className: "px-4 py-2 bg-[#ED0577] text-white rounded-md hover:bg-[#d9066a] transition-colors min-h-[44px] min-w-[100px] flex items-center justify-center",
                children: action.label
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = EmptyState;
const __TURBOPACK__default__export__ = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderHistory",
    ()=>OrderHistory,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOrders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useOrders.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/hooks/useUIStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$FilterBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/FilterBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$LayoutToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/LayoutToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OrderCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/OrderCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OrderTableRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/OrderTableRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/Pagination.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/TechSmith/PinkPin/src/components/EmptyState.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * OrderHistory - Paginated list of orders with filtering, layout toggle, and empty state
 * Implements Requirements 10.1, 10.8, 10.15
 */ 'use client';
;
;
;
;
;
;
;
;
;
/**
 * Filter orders based on current filter state
 */ function filterOrders(orders, filters) {
    return orders.filter((order)=>{
        // Date range filter
        if (filters.dateRange.from) {
            const orderDate = new Date(order.createdAt);
            if (orderDate < filters.dateRange.from) return false;
        }
        if (filters.dateRange.to) {
            const orderDate = new Date(order.createdAt);
            const endOfDay = new Date(filters.dateRange.to);
            endOfDay.setHours(23, 59, 59, 999);
            if (orderDate > endOfDay) return false;
        }
        // Status filter
        if (filters.statuses.length > 0 && !filters.statuses.includes(order.status)) {
            return false;
        }
        // Outlet filter
        if (filters.outletId && order.outletId !== filters.outletId) {
            return false;
        }
        // Service type filter
        if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(order.delivery.serviceType)) {
            return false;
        }
        // Invoice number filter
        if (filters.invoiceNumber) {
            const searchTerm = filters.invoiceNumber.toLowerCase();
            if (!order.invoiceNumber.toLowerCase().includes(searchTerm)) {
                return false;
            }
        }
        return true;
    });
}
/**
 * Sort orders based on current sort state
 */ function sortOrders(orders, sort) {
    return [
        ...orders
    ].sort((a, b)=>{
        if (sort.field === 'date') {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
        } else {
            // Sort by status - group by status then by date
            const statusOrder = {
                submitted: 0,
                waiting: 1,
                closed: 2,
                cancelled: 3
            };
            const statusCompare = statusOrder[a.status] - statusOrder[b.status];
            if (statusCompare !== 0) {
                return sort.direction === 'asc' ? statusCompare : -statusCompare;
            }
            // Same status, sort by date
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
    });
}
function OrderHistory() {
    _s();
    const { data: orders = [], isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOrders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"])();
    const { filters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"])();
    const { layout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"])();
    const { currentPage, itemsPerPage, setCurrentPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"])();
    const { sort, setSort, toggleSortDirection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSort"])();
    // Filter and sort orders
    const filteredOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderHistory.useMemo[filteredOrders]": ()=>filterOrders(orders, filters)
    }["OrderHistory.useMemo[filteredOrders]"], [
        orders,
        filters
    ]);
    const sortedOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderHistory.useMemo[sortedOrders]": ()=>sortOrders(filteredOrders, sort)
    }["OrderHistory.useMemo[sortedOrders]"], [
        filteredOrders,
        sort
    ]);
    // Paginate orders
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    const paginatedOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderHistory.useMemo[paginatedOrders]": ()=>{
            const start = (currentPage - 1) * itemsPerPage;
            return sortedOrders.slice(start, start + itemsPerPage);
        }
    }["OrderHistory.useMemo[paginatedOrders]"], [
        sortedOrders,
        currentPage,
        itemsPerPage
    ]);
    // Reset to page 1 when filters change
    const handleFilterChange = ()=>{
        setCurrentPage(1);
    };
    // Handle sort click
    const handleSortClick = (field)=>{
        if (sort.field === field) {
            toggleSortDirection();
        } else {
            setSort({
                field,
                direction: 'desc'
            });
        }
    };
    // Calculate showing range
    const showingStart = sortedOrders.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const showingEnd = Math.min(currentPage * itemsPerPage, sortedOrders.length);
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 rounded-lg p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-600",
                    children: "Error loading orders. Please try again."
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                    lineNumber: 127,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 md:p-6 lg:p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Order History"
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mt-1",
                        children: [
                            sortedOrders.length,
                            " ",
                            sortedOrders.length === 1 ? 'order' : 'orders',
                            " total"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$FilterBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterBar"], {
                onFilterChange: handleFilterChange
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$LayoutToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutToggle"], {}, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: "Sort by:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSortClick('date'),
                                className: `px-3 py-1.5 text-sm rounded-md transition-colors min-h-[36px] ${sort.field === 'date' ? 'bg-[#ED0577] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    "Date ",
                                    sort.field === 'date' && (sort.direction === 'asc' ? '↑' : '↓')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSortClick('status'),
                                className: `px-3 py-1.5 text-sm rounded-md transition-colors min-h-[36px] ${sort.field === 'status' ? 'bg-[#ED0577] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    "Status ",
                                    sort.field === 'status' && (sort.direction === 'asc' ? '↑' : '↓')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[#ED0577]"
                }, void 0, false, {
                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this) : sortedOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No orders found",
                description: "Try adjusting your filters or create a new order."
            }, void 0, false, {
                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    layout === 'card' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: paginatedOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OrderCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderCard"], {
                                order: order
                            }, order.id, false, {
                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                lineNumber: 192,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, this),
                    layout === 'table' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-gray-50 border-b border-gray-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Order ID"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 203,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 206,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Recipient"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 209,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Distance"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 212,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Fee"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 215,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Date"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 218,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                                lineNumber: 221,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                        lineNumber: 202,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: paginatedOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$OrderTableRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderTableRow"], {
                                            order: order
                                        }, order.id, false, {
                                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                            lineNumber: 228,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                                    lineNumber: 226,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                            lineNumber: 200,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 199,
                        columnNumber: 13
                    }, this),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$components$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pagination"], {
                        currentPage: currentPage,
                        totalPages: totalPages,
                        totalItems: sortedOrders.length,
                        showingStart: showingStart,
                        showingEnd: showingEnd,
                        onPageChange: setCurrentPage
                    }, void 0, false, {
                        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
                        lineNumber: 237,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/TechSmith/PinkPin/src/page-components/OrderHistory.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(OrderHistory, "+J4mFhq68EOYekZhYKjZXLYrKTI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useOrders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrders"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilters"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayout"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$TechSmith$2f$PinkPin$2f$src$2f$hooks$2f$useUIStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSort"]
    ];
});
_c = OrderHistory;
const __TURBOPACK__default__export__ = OrderHistory;
var _c;
__turbopack_context__.k.register(_c, "OrderHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_TechSmith_PinkPin_src_7e914949._.js.map