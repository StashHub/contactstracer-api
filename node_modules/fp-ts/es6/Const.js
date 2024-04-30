var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { identity, unsafeCoerce } from './function';
import { pipeable } from './pipeable';
/**
 * @since 2.0.0
 */
export var URI = 'Const';
/**
 * @since 2.0.0
 */
export var make = unsafeCoerce;
/**
 * @since 2.0.0
 */
export function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
/**
 * @since 2.0.0
 */
export var getEq = identity;
/**
 * @since 2.6.0
 */
export var getOrd = identity;
/**
 * @since 2.6.0
 */
export var getBounded = identity;
/**
 * @since 2.6.0
 */
export var getSemigroup = identity;
/**
 * @since 2.6.0
 */
export var getMonoid = identity;
/**
 * @since 2.6.0
 */
export var getSemiring = identity;
/**
 * @since 2.6.0
 */
export var getRing = identity;
/**
 * @since 2.6.0
 */
export var getHeytingAlgebra = identity;
/**
 * @since 2.6.0
 */
export var getBooleanAlgebra = identity;
/**
 * @since 2.0.0
 */
export function getApply(S) {
    return {
        URI: URI,
        _E: undefined,
        map: const_.map,
        ap: function (fab, fa) { return make(S.concat(fab, fa)); }
    };
}
/**
 * @since 2.0.0
 */
export function getApplicative(M) {
    return __assign(__assign({}, getApply(M)), { of: function () { return make(M.empty); } });
}
/**
 * @since 2.0.0
 */
export var const_ = {
    URI: URI,
    map: unsafeCoerce,
    contramap: unsafeCoerce,
    bimap: function (fea, f) { return make(f(fea)); },
    mapLeft: function (fea, f) { return make(f(fea)); }
};
var _a = pipeable(const_), contramap = _a.contramap, map = _a.map;
export { 
/**
 * @since 2.0.0
 */
contramap, 
/**
 * @since 2.0.0
 */
map };
