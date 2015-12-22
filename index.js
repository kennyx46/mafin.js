"use strict";

var h = require('./lib/helpers');

function typeClassInstance (typeProto, typeclass) {

}

// data Maybe a = Nothing | Just a
let MaybePrototype = {
  toString () {
    return this.__isJust ? `Just(${this.__value})` : "Nothing";
  },
  valueOf () {
    return this.toString();
  },
  type: "Maybe a",
};

// a -> Maybe a
var Just = function (val) {
  if (h.isUndef(val)) {
    throw new Error("Just data constructor requires 1 argument");
  }
  if (!(h.isInstance(this, Just))) {
    return new Just(val);
  }
  Object.defineProperty(this, '__value', {
    value: val
  })
};

Just.prototype = Object.create(MaybePrototype, {
  __isJust: { value: true }
});
Just.prototype.constructor = Just;

// Maybe a
var Nothing = Object.create(MaybePrototype, {
  __isNothing: { value: true }
});

module.exports = { Just, Nothing, Maybe };


var FunctorTypeClass = {
  // fmap :: (a->b) -> f a -> f b
  fmap () {
    throw new Error("You had to implement fmap method");
  }
};

// checking functor laws
// u.fmap(id) == u; (identity)
// u.fmap(comp(f, g)) == u.fmap(g).fmap(f); //(composition)


Object.assign(MaybePrototype, FunctorTypeClass, {
  fmap (fn) {
    if (this.__isJust) {
      return Just(fn(this.__value));
    } else {
      return Nothing;
    }
  }
});


var MonadTypeClass = {
  // unit :: a -> m a
  unit () {
    throw new Error("You had to implement unit method");
  },
  // bind :: m a -> (a -> m b) -> m b
  bind () {
    throw new Error("You had to implement unit method");
  }
};

Object.assign(MaybePrototype, MonadTypeClass, {
  unit (val) {
    return Just(val);
  },
  bind (fn) {
    if (this.__isJust) {
      var res = fn(this.__value);
      if (res && (res.__isJust || res.__isNothing)) {
        return res;
      } else {
        throw new Error("Unspecified behavior");
      }
    } else {
      return Nothing;
    }
  }
});


// checking monad laws
// m.unit(a).bind(f) == f(a); (left identity)
// m.bind(unit) == m; (right identity)
// m.bind(f).bind(g) == m.bind(x => f(x).bind(g)) //(associativity)

