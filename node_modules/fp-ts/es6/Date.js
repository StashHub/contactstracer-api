import { eqNumber, contramap } from './Eq';
/**
 * Returns the current `Date`
 *
 * @since 2.0.0
 */
export var create = function () { return new Date(); };
/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
export var now = function () { return new Date().getTime(); };
/**
 * @since 2.6.0
 */
export var eqDate = contramap(function (x) { return x.getDate(); })(eqNumber);
/**
 * @since 2.6.0
 */
export var eqMonth = contramap(function (x) { return x.getMonth(); })(eqNumber);
/**
 * @since 2.6.0
 */
export var eqYear = contramap(function (x) { return x.getFullYear(); })(eqNumber);
