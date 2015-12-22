var comp = (f, g) => x => f(g(x));
var not = (obj) => !obj;
var equals = (arg1, arg2) => arg1 === arg2;
var isUndef = arg => equals(arg, undefined);
var isDef = comp(not, isUndef);
var isInstance = (obj, constructor) => obj instanceof constructor;
var id = x => x;
var konst = x => y => x;

module.exports = {
  comp,
  not,
  equals,
  isUndef,
  isDef,
  isInstance,
  id,
  const: konst
}