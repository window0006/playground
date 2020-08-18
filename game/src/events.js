
var EventEmitter = function () {
  this._events = this._events || null;
}
EventEmitter.prototype = {
  emit: function () {
    var type = arguments[0];
    if (type === "error") {
      if (!this._events || !this._events.error || ((this._events.error instanceof Array) && !this._events.error.length)) {
        if (arguments[1] instanceof Error) {
          throw arguments[1];
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
      }
    }
    if (!this._events) {
      return false;
    }
    var handler = this._events[type];
    if (!handler) {
      return false;
    }
    if (typeof handler == "function") {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          var l = arguments.length;
          var args = new Array(l - 1);
          for (var i = 1; i < l; i++) {
            args[i - 1] = arguments[i];
          }
          handler.apply(this, args);
      }
      return true;
    } else {
      if (handler instanceof Array) {
        var l = arguments.length;
        var args = new Array(l - 1);
        for (var i = 1; i < l; i++) {
          args[i - 1] = arguments[i];
        }
        var listeners = handler.slice();
        for (var i = 0, l = listeners.length; i < l; i++) {
          listeners[i].apply(this, args);
        }
        return true;
      } else {
        return false;
      }
    }
  },
  on: function (type, listener) {
    if ("function" !== typeof listener) {
      throw new Error("addListener only takes instances of Function");
    }
    if (!this._events) {
      this._events = {};
    }
    this.emit("newListener", type, typeof listener.listener === "function" ? listener.listener : listener);
    if (!this._events[type]) {
      this._events[type] = listener;
    } else {
      if (this._events[type] instanceof Array) {
        this._events[type].push(listener);
      } else {
        this._events[type] = [this._events[type], listener];
      }
    }
    return this;
  },
  once: function (type, listener) {
    if ("function" !== typeof listener) {
      throw new Error(".once only takes instances of Function");
    }
    var self = this;

    function g() {
      self.removeListener(type, g);
      listener.apply(this, arguments);
    }
    g.listener = listener;
    self.on(type, g);
    return this;
  },
  removeListener: function (type, listener) {
    if ("function" !== typeof listener) {
      throw new Error("removeListener only takes instances of Function");
    }
    if (!this._events || !this._events[type]) {
      return this;
    }
    var list = this._events[type];
    if (list instanceof Array) {
      var position = -1;
      for (var i = 0, length = list.length; i < length; i++) {
        if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }
      if (position < 0) {
        return this;
      }
      list.splice(position, 1);
      if (list.length == 0) {
        delete this._events[type];
      }
    } else {
      if (list === listener || (list.listener && list.listener === listener)) {
        delete this._events[type];
      }
    }
    return this;
  },
  removeAllListeners: function (type) {
    if (arguments.length === 0) {
      this._events = {};
      return this;
    }
    if (type && this._events && this._events[type]) {
      this._events[type] = null;
    }
    return this;
  },
  listeners: function (type) {
    if (!this._events) {
      this._events = {};
    }
    if (!this._events[type]) {
      this._events[type] = [];
    }
    if (!(this._events[type] instanceof Array)) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  }
};

export default EventEmitter;
