import { setPageConfig, pageConfig } from '@gaddario98/react-pages';
export * from '@gaddario98/react-pages';
import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useMemo, useEffect, useCallback, memo } from 'react';
import { RefreshControl, View, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { withMemo } from '@gaddario98/utiles';
import { padding, pageLayout, contentLayout, Alert, Image, Paragraph, Button } from '@gaddario98/react-native-ui';
import { FlashList, useMappingHelper } from '@shopify/flash-list';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { RefreshControl as RefreshControl$1, GestureHandlerRootView } from 'react-native-gesture-handler';

const RenderItem = ({ item, index, }) => {
    var _a;
    const { getMappingKey } = useMappingHelper();
    return (jsx(View, { style: {
            padding: 5,
            flex: 1,
        }, children: item }, getMappingKey((_a = item.key) !== null && _a !== void 0 ? _a : "", index)));
};
const ShopifyView = withMemo(({ allContents, handleRefresh, hasQueries, body = [], itemForPage, onEndReached: baseOnEndReached, type, withoutPadding, disableRefreshing, numColumns = 1, }) => {
    var _a;
    const [refreshing, setRefreshing] = useState(false);
    const onLoadRef = useRef(false);
    const [numItems, setNumItems] = useState((_a = itemForPage !== null && itemForPage !== void 0 ? itemForPage : body === null || body === void 0 ? void 0 : body.length) !== null && _a !== void 0 ? _a : 1);
    const visibleItems = useMemo(() => { var _a; return (_a = body === null || body === void 0 ? void 0 : body.slice(0, numItems)) !== null && _a !== void 0 ? _a : []; }, [body, numItems]);
    useEffect(() => {
        const tmp = itemForPage || (body === null || body === void 0 ? void 0 : body.length) || 1;
        if (numItems < tmp)
            setNumItems(tmp);
    }, [body === null || body === void 0 ? void 0 : body.length, itemForPage, numItems]);
    const onEndReached = useCallback(async () => {
        onLoadRef.current = false;
        setTimeout(() => {
            onLoadRef.current = true;
        }, 500);
        if (baseOnEndReached) {
            baseOnEndReached();
        }
        if (!itemForPage || !body || visibleItems.length >= body.length) {
            return;
        }
        setNumItems(visibleItems.length + itemForPage);
    }, [baseOnEndReached, itemForPage, body, visibleItems.length]);
    const handleQueryRefresh = useCallback(async () => {
        if (!disableRefreshing && handleRefresh) {
            setRefreshing(true);
            try {
                handleRefresh();
            }
            finally {
                setRefreshing(false);
            }
        }
    }, [handleRefresh, disableRefreshing]);
    const refreshControl = useMemo(() => hasQueries && !disableRefreshing ? (jsx(RefreshControl, { refreshing: refreshing, onRefresh: handleQueryRefresh })) : undefined, [handleQueryRefresh, hasQueries, refreshing, disableRefreshing]);
    return (jsx(FlashList, { id: "shopify-view", data: visibleItems, numColumns: numColumns !== null && numColumns !== void 0 ? numColumns : 1, masonry: type === "mansoryLayout", renderItem: (props) => jsx(RenderItem, Object.assign({}, props)), refreshControl: refreshControl, contentContainerStyle: {
            padding: withoutPadding ? 0 : padding - 5,
        }, keyExtractor: (item, i) => { var _a; return (_a = item.key) !== null && _a !== void 0 ? _a : i.toString(); }, onEndReached: () => {
            //console.log("onEndReached",onLoadRef.current);
            if (onLoadRef.current) {
                onEndReached();
            }
        }, overrideItemLayout: (layout, item) => {
            var _a, _b;
            layout.span =
                (_b = (_a = allContents === null || allContents === void 0 ? void 0 : allContents.find((el, i) => { var _a; return ((_a = el === null || el === void 0 ? void 0 : el.key) !== null && _a !== void 0 ? _a : i) === item.key; })) === null || _a === void 0 ? void 0 : _a.usedBoxes) !== null && _b !== void 0 ? _b : 1;
        }, 
        //   automaticallyAdjustKeyboardInsets
        // onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator: false, 
        //automaticallyAdjustsScrollIndicatorInsets
        onLayout: (e) => {
            var _a, _b;
            onLoadRef.current = !!((_b = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.layout) === null || _b === void 0 ? void 0 : _b.height);
            //console.log("onLayout",onLoadRef.current);
        } }));
});

const DefaultView = withMemo(({ viewSettings, handleRefresh, hasQueries, children, }) => {
    const [refreshing, setRefreshing] = useState(false);
    const handleQueryRefresh = useCallback(async () => {
        if (!(viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing) && handleRefresh) {
            setRefreshing(true);
            try {
                handleRefresh();
            }
            finally {
                setRefreshing(false);
            }
        }
    }, [handleRefresh, viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing]);
    const refreshControl = useMemo(() => hasQueries && !(viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing) ? (jsx(RefreshControl, { refreshing: refreshing, onRefresh: handleQueryRefresh })) : undefined, [
        handleQueryRefresh,
        hasQueries,
        refreshing,
        viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing,
    ]);
    return (jsx(ScrollView, { contentContainerStyle: [pageLayout, { padding: padding }], refreshControl: refreshControl, id: "default-view", children: children }));
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const DraggableView = withMemo((_a) => {
    var _b;
    var { numColumns, body = [], onReorder, viewSettings, allContents, handleRefresh, onEndReached, hasQueries, itemForPage } = _a, props = __rest(_a, ["numColumns", "body", "onReorder", "viewSettings", "allContents", "handleRefresh", "onEndReached", "hasQueries", "itemForPage"]);
    const [refreshing, setRefreshing] = useState(false);
    const [onEnd, setOnEnd] = useState(true);
    const [numItems, setNumItems] = useState((_b = itemForPage !== null && itemForPage !== void 0 ? itemForPage : body === null || body === void 0 ? void 0 : body.length) !== null && _b !== void 0 ? _b : 1);
    const visibleItems = useMemo(() => { var _a; return (_a = body === null || body === void 0 ? void 0 : body.slice(0, numItems)) !== null && _a !== void 0 ? _a : []; }, [body, numItems]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        const newItems = visibleItems.map((el, i) => ({
            id: `${el.key || i}`,
            element: el,
            originalIndex: i,
        }));
        setItems(newItems);
    }, [visibleItems]);
    useEffect(() => {
        var _a;
        setNumItems((_a = itemForPage !== null && itemForPage !== void 0 ? itemForPage : body === null || body === void 0 ? void 0 : body.length) !== null && _a !== void 0 ? _a : 1);
    }, [body === null || body === void 0 ? void 0 : body.length, itemForPage]);
    const handleDragEnd = useCallback((props) => {
        var _a, _b;
        setItems === null || setItems === void 0 ? void 0 : setItems(props.data);
        onReorder === null || onReorder === void 0 ? void 0 : onReorder(Object.assign(Object.assign({}, props), { data: (_b = (_a = props === null || props === void 0 ? void 0 : props.data) === null || _a === void 0 ? void 0 : _a.filter((item) => {
                const itemDetail = allBodyContent === null || allBodyContent === void 0 ? void 0 : allBodyContent.find((el, i) => `${el.key || i}` === item.id);
                return (!!(itemDetail === null || itemDetail === void 0 ? void 0 : itemDetail.isInDraggableView) || !!(itemDetail === null || itemDetail === void 0 ? void 0 : itemDetail.isDraggable));
            })) !== null && _b !== void 0 ? _b : [] }));
    }, [onReorder]);
    const allBodyContent = useMemo(() => allContents === null || allContents === void 0 ? void 0 : allContents.filter((el) => !el.renderInFooter && !el.renderInHeader), [allContents]);
    const renderDraggableItem = useCallback(({ item, drag, isActive }) => {
        var _a;
        const itemDetail = allBodyContent === null || allBodyContent === void 0 ? void 0 : allBodyContent.find((el, i) => `${el.key || i}` === item.id);
        const isItemDraggable = (_a = itemDetail === null || itemDetail === void 0 ? void 0 : itemDetail.isDraggable) !== null && _a !== void 0 ? _a : false;
        if (!(itemDetail === null || itemDetail === void 0 ? void 0 : itemDetail.isInDraggableView) && !isItemDraggable) {
            return item.element;
        }
        return (jsx(ScaleDecorator, { activeScale: 1, children: jsx(TouchableOpacity, { style: { padding: 5, flex: 1, opacity: isActive ? 0.5 : 1 }, onLongPress: isItemDraggable ? drag : undefined, disabled: isActive, activeOpacity: 1, children: item.element }) }));
    }, [allBodyContent]);
    const handleQueryRefresh = useCallback(async () => {
        if (!(viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing) && handleRefresh) {
            setRefreshing(true);
            try {
                handleRefresh();
            }
            finally {
                setRefreshing(false);
            }
        }
    }, [handleRefresh, viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing]);
    const refreshControl = useMemo(() => hasQueries && !(viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing) ? (jsx(RefreshControl$1, { refreshing: refreshing, onRefresh: handleQueryRefresh })) : undefined, [
        handleQueryRefresh,
        hasQueries,
        refreshing,
        viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.disableRefreshing,
    ]);
    const onEndReachedHandle = useCallback(async () => {
        var _a;
        if (onEndReached) {
            onEndReached();
        }
        if (!itemForPage || !body || visibleItems.length >= body.length) {
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newLength = visibleItems.length + itemForPage;
        const maxLength = (_a = body === null || body === void 0 ? void 0 : body.length) !== null && _a !== void 0 ? _a : 0;
        const tmp = maxLength < newLength ? maxLength : newLength;
        setNumItems(tmp);
    }, [viewSettings, body, visibleItems.length]);
    return (jsx(GestureHandlerRootView, { style: { flex: 1 }, children: jsx(DraggableFlatList, Object.assign({}, props, { data: items, numColumns: numColumns !== null && numColumns !== void 0 ? numColumns : 1, onEndReachedThreshold: 0.3, onDragEnd: handleDragEnd, contentContainerStyle: {
                padding: (viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.withoutPadding) ? 0 : padding - 5,
            }, keyExtractor: (item, index) => { var _a, _b; return (_b = (_a = item.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : index.toString(); }, renderItem: renderDraggableItem, refreshControl: refreshControl, onMomentumScrollBegin: () => setOnEnd(false), onEndReached: () => {
                if (!onEnd) {
                    onEndReachedHandle();
                }
            } })) }));
});

const Element = ({ style, children }) => {
    if (!(children === null || children === void 0 ? void 0 : children.length))
        return null;
    return (jsx(View, { style: [
            contentLayout,
            { height: "auto" },
            style,
        ], children: children }));
};
var Element$1 = memo(Element);

const { width: screenWidth, height } = Dimensions.get('window');
const setReactNativePageConfig = (config) => {
    setPageConfig(Object.assign({ FooterContainer: (_a) => {
            var { children, withoutPadding } = _a, props = __rest(_a, ["children", "withoutPadding"]);
            return (jsx(Element$1, Object.assign({}, props, { withoutPadding: withoutPadding, style: {
                    paddingHorizontal: withoutPadding ? 0 : padding,
                    paddingBottom: withoutPadding ? 0 : padding,
                }, children: children !== null && children !== void 0 ? children : [] })));
        }, HeaderContainer: (_a) => {
            var { children, withoutPadding } = _a, props = __rest(_a, ["children", "withoutPadding"]);
            return (jsx(Element$1, Object.assign({}, props, { withoutPadding: withoutPadding, style: {
                    paddingHorizontal: withoutPadding ? 0 : padding,
                    paddingTop: withoutPadding ? 0 : padding,
                }, children: children !== null && children !== void 0 ? children : [] })));
        }, ItemsContainer: ({ children }) => (jsx(View, { style: [
                contentLayout,
                {
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                },
            ], children: children })), BodyContainer: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return (jsx(DefaultView, Object.assign({}, props, { children: children !== null && children !== void 0 ? children : [] })));
        }, LoaderComponent: ({ loading, message, ns }) => loading && (jsx(Alert, { message: message !== null && message !== void 0 ? message : "Caricamento in corso...", ns: ns, style: {
                position: "relative",
                top: 0,
                marginHorizontal: padding,
                marginTop: padding,
                zIndex: 1000,
                left: 0,
                right: 0,
            }, type: "info", textProps: { loading: true } })), PageContainer: ({ children, id }) => (jsx(SafeAreaView, { style: { flex: 1 }, id: id, children: children }, id)) }, config));
};

const useAuthPageProps = (props) => {
    const authPageProps = useMemo(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
        return ({
            ns: "auth",
            id: "Control",
            contents: [
                {
                    type: "custom",
                    component: (jsx(Image, Object.assign({}, props === null || props === void 0 ? void 0 : props.image, { fallbackSource: (_b = (_a = props.image) === null || _a === void 0 ? void 0 : _a.fallbackSource) !== null && _b !== void 0 ? _b : pageConfig.authPageImage, source: (_d = (_c = props.image) === null || _c === void 0 ? void 0 : _c.source) !== null && _d !== void 0 ? _d : pageConfig.authPageImage, resizeMode: (_f = (_e = props.image) === null || _e === void 0 ? void 0 : _e.resizeMode) !== null && _f !== void 0 ? _f : "contain", contentPosition: "center", style: (_h = (_g = props.image) === null || _g === void 0 ? void 0 : _g.style) !== null && _h !== void 0 ? _h : { width: "auto", flex: 1, margin: 0 } }))),
                    hidden: !((_j = props.image) === null || _j === void 0 ? void 0 : _j.source) && !pageConfig.authPageImage,
                },
                {
                    type: "custom",
                    component: (jsx(Paragraph, Object.assign({}, props.controlText, { description: typeof ((_k = props.controlText) === null || _k === void 0 ? void 0 : _k.description) !== "string"
                            ? Object.assign(Object.assign({}, (_l = props.controlText) === null || _l === void 0 ? void 0 : _l.description), { text: (_p = (_o = (_m = props.controlText) === null || _m === void 0 ? void 0 : _m.description) === null || _o === void 0 ? void 0 : _o.text) !== null && _p !== void 0 ? _p : "controlText", style: [
                                    { textAlign: "center" },
                                    (_s = (_r = (_q = props.controlText) === null || _q === void 0 ? void 0 : _q.description) === null || _r === void 0 ? void 0 : _r.style) !== null && _s !== void 0 ? _s : {},
                                ] }) : ((_u = (_t = props.controlText) === null || _t === void 0 ? void 0 : _t.description) !== null && _u !== void 0 ? _u : "controlText") }))),
                    renderInFooter: true,
                },
                {
                    type: "custom",
                    component: (jsx(Button, Object.assign({}, props.login, { text: (_w = (_v = props.login) === null || _v === void 0 ? void 0 : _v.text) !== null && _w !== void 0 ? _w : "login", ns: "auth", variant: (_y = (_x = props.login) === null || _x === void 0 ? void 0 : _x.variant) !== null && _y !== void 0 ? _y : "contained" }))),
                    renderInFooter: true,
                },
                {
                    type: "custom",
                    component: (jsx(Button, Object.assign({}, props.signup, { text: (_0 = (_z = props.signup) === null || _z === void 0 ? void 0 : _z.text) !== null && _0 !== void 0 ? _0 : "createAccount", ns: "auth", variant: (_2 = (_1 = props.signup) === null || _1 === void 0 ? void 0 : _1.variant) !== null && _2 !== void 0 ? _2 : "outlined", color: (_4 = (_3 = props.signup) === null || _3 === void 0 ? void 0 : _3.color) !== null && _4 !== void 0 ? _4 : "secondary" }))),
                    renderInFooter: true,
                },
                {
                    type: "custom",
                    component: (jsx(Button, Object.assign({}, props.reportProblem, { text: (_6 = (_5 = props.reportProblem) === null || _5 === void 0 ? void 0 : _5.text) !== null && _6 !== void 0 ? _6 : "reportProblem", ns: "settings", variant: (_8 = (_7 = props.reportProblem) === null || _7 === void 0 ? void 0 : _7.variant) !== null && _8 !== void 0 ? _8 : "text", color: (_10 = (_9 = props.reportProblem) === null || _9 === void 0 ? void 0 : _9.color) !== null && _10 !== void 0 ? _10 : "error" }))),
                    renderInFooter: true,
                },
            ],
        });
    }, [props]);
    return authPageProps;
};

export { DefaultView, DraggableView, ShopifyView, setReactNativePageConfig, useAuthPageProps };
//# sourceMappingURL=index.mjs.map
