'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactUseGesture = require('react-use-gesture');
var reactSpring = require('react-spring');
var styled = _interopDefault(require('styled-components'));
var reactDom = require('react-dom');

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

var Card = /*#__PURE__*/React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size,
      _ref$rate = _ref.rate,
      rate = _ref$rate === void 0 ? 1 : _ref$rate,
      _ref$space = _ref.space,
      space = _ref$space === void 0 ? 0 : _ref$space,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$dark = _ref.dark,
      dark = _ref$dark === void 0 ? false : _ref$dark,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "" : _ref$color,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 0 : _ref$max,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      props = objectWithoutPropertiesLoose(_ref, ["children", "size", "rate", "space", "style", "dark", "color", "max", "min"]);

  var _useSpring = reactSpring.useSpring(function () {
    return {
      xyz: [0, 0, 0]
    };
  }),
      xyz = _useSpring[0].xyz,
      set = _useSpring[1];

  var styleCard = React.useMemo(function () {
    var minHeight = min || size * 500;
    var maxHeight = max || null;
    return _extends_1({
      margin: space + "px auto " + space + "px auto",
      padding: 0,
      position: "relative",
      width: "min(80%," + size * 500 + "px)",
      borderRadius: size * 25,
      overflow: "hidden"
    }, minHeight && {
      minHeight: minHeight
    }, {
      background: dark ? "#212121" : "#fff"
    }, maxHeight && {
      maxHeight: maxHeight
    }, {
      color: color || dark ? "#818181" : "#000"
    });
  }, [size, space, color, dark, max, min]);

  var calc = function calc(x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    return [(x - window.innerWidth / 2) / size / 250, // -1 ~ 1
    (y - window.innerHeight / 2) / size / 250, // -1 ~ 1
    rate];
  };

  var bind = reactUseGesture.useGesture({
    onDrag: function onDrag(_ref2) {
      var event = _ref2.event;
      return event == null ? void 0 : event.stopPropagation();
    },
    onHover: function onHover(_ref3) {
      var hovering = _ref3.hovering;
      return !hovering && set({
        xyz: [0, 0, 0]
      });
    },
    onMove: function onMove(_ref4) {
      var _ref4$xy = _ref4.xy,
          x = _ref4$xy[0],
          y = _ref4$xy[1];
      return set({
        xyz: calc(x, y)
      });
    }
  });
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({
    style: _extends_1({
      boxShadow: xyz.to(function (x, y, z) {
        return [0.5 - x * 2 + "rem", //offset-x     : -1.5 ~ 0.5 ~ 2.5
        1.5 - y * 2 + "rem", //offset-y     : -0.5 ~ 1.5 ~ 3.5
        1.5 + z + "rem", //blur-radius  : 1.5 =hover=> 2.5
        z - 0.5 + "rem", //spread-radius:-0.5 =hover=> 0.5
        "hsl(200 50% 20% / " + (15 + z * 5) + "%)"].join(' ');
      }),
      transform: xyz.to(function (x, y, z) {
        return ["perspective(" + size * 50 + "px)", "rotateX(" + -y / 10 + "deg)", //-0.1 ~ 0.1
        "rotateY(" + x / 10 + "deg)", //-0.1 ~ 0.1
        "scale(" + (1 + z / 10) + ")"].join(' ');
      }),
      zIndex: xyz.to(function (x, y, z) {
        return x * y * z > 0 ? 1 : 0;
      })
    }, styleCard, style)
  }, bind(), _extends_1({}, props, {
    ref: ref,
    children: children
  })));
});

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var taggedTemplateLiteralLoose = _taggedTemplateLiteralLoose;

function _templateObject2() {
  var data = taggedTemplateLiteralLoose(["\n    position: relative;\n    text-align: center;\n    fontSize: ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteralLoose(["\n    position: relative;\n    left: 0;\n    bottom: 0;\n    height: auto;\n    background: #212121;\n    min-width: 100%;\n    borderRadius: ", ";\n    padding     : ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Wrap = styled.div(_templateObject(), function (_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size;
  return size * 25 + "px " + size * 25 + "px 0px 0px";
}, function (_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 1 : _ref2$size;
  return "0px " + size * 50 + "px " + size * 25 + "px " + size * 50 + "px";
});
var Item = styled.div(_templateObject2(), function (_ref3) {
  var size = _ref3.size;
  return ~~(size * 50) + "px";
});
var Foot = /*#__PURE__*/React__default.forwardRef(function (_ref4, ref) {
  var children = _ref4.children,
      _ref4$size = _ref4.size,
      _ref4$style = _ref4.style,
      style = _ref4$style === void 0 ? {} : _ref4$style,
      props = objectWithoutPropertiesLoose(_ref4, ["children", "size", "style"]);

  return /*#__PURE__*/React__default.createElement(Wrap, _extends_1({}, props, {
    ref: ref,
    style: style
  }), React.Children.map(children, function (child) {
    return /*#__PURE__*/React__default.createElement(Item, null, child);
  }));
});

function _templateObject$1() {
  var data = taggedTemplateLiteralLoose(["\n    position: relative;\n    display: grid;\n    margin: ", "px auto 0 auto;\n    width: ", "px;\n    height: ", "px;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Item$1 = styled(reactSpring.animated.div)(_templateObject$1(), function (props) {
  return props.size * 50;
}, function (props) {
  return props.size * 250;
}, function (props) {
  return props.size * 250;
});
var Grow = /*#__PURE__*/React__default.forwardRef(function (_ref, forwardRef) {
  var _ref$onView = _ref.onView,
      onView = _ref$onView === void 0 ? null : _ref$onView,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "spinner-grow" : _ref$className;
  var fn = React.useRef();
  var ref = React.useRef(null);
  React__default.useImperativeHandle(forwardRef, function () {
    return ref.current;
  });
  React.useEffect(function () {
    fn.current = onView;
  }, [onView]);
  return /*#__PURE__*/React__default.createElement(Item$1, {
    ref: ref,
    size: size,
    className: className
  });
});

function _templateObject$2() {
  var data = taggedTemplateLiteralLoose(["\n    fontSize:size*50,\n    color: ", ";\n    width:", ",\n    height: auto;\n    margin: auto;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Item$2 = styled.div(_templateObject$2(), function (props) {
  return props.color;
}, function (_ref) {
  var size = _ref.size;
  return "max(70vw, 100vw - " + size * 200 + "px)";
});
var Head = /*#__PURE__*/React__default.forwardRef(function (_ref2, ref) {
  var children = _ref2.children,
      _ref2$dark = _ref2.dark,
      dark = _ref2$dark === void 0 ? false : _ref2$dark,
      _ref2$size = _ref2.size,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      props = objectWithoutPropertiesLoose(_ref2, ["children", "dark", "size", "style"]);

  var color = props.color || dark ? "#818181" : "#000";
  return /*#__PURE__*/React__default.createElement(Item$2, _extends_1({
    children: children,
    ref: ref,
    style: style,
    color: color
  }, props));
});

function _templateObject$3() {
  var data = taggedTemplateLiteralLoose(["\n    top: 0px;\n    right: 0px;\n    padding: 0px;\n    text-align: center;\n    user-select: none;\n    color: ", ";\n    width: ", "px;\n    height: ", "px;\n    font-size: ", "px;\n    border-radius: ", "px;\n    background: ", ";\n\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var Item$3 = styled(reactSpring.animated.div)(_templateObject$3(), function (props) {
  return props.color;
}, function (_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size;
  return size * 50;
}, function (_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 1 : _ref2$size;
  return size * 50;
}, function (_ref3) {
  var _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 1 : _ref3$size;
  return size * 50;
}, function (_ref4) {
  var _ref4$size = _ref4.size,
      size = _ref4$size === void 0 ? 1 : _ref4$size;
  return size * 50;
}, function (props) {
  return props.background;
});
var Icon = /*#__PURE__*/React__default.forwardRef(function (_ref5, ref) {
  var _ref5$fa = _ref5.fa,
      fa = _ref5$fa === void 0 ? "" : _ref5$fa,
      _ref5$fab = _ref5.fab,
      fab = _ref5$fab === void 0 ? "" : _ref5$fab,
      _ref5$dark = _ref5.dark,
      dark = _ref5$dark === void 0 ? false : _ref5$dark,
      _ref5$circ = _ref5.circ,
      circ = _ref5$circ === void 0 ? true : _ref5$circ,
      _ref5$size = _ref5.size,
      size = _ref5$size === void 0 ? 1 : _ref5$size,
      _ref5$onOpen = _ref5.onOpen,
      children = _ref5.children,
      props = objectWithoutPropertiesLoose(_ref5, ["fa", "fab", "dark", "circ", "size", "onOpen", "children"]);

  var _useSpring = reactSpring.useSpring(function () {
    return {
      xys: [0, 0, 0]
    };
  }),
      xys = _useSpring[0].xys,
      set = _useSpring[1];

  var bind = reactUseGesture.useMove(function (_ref6) {
    var _ref6$vxvy = _ref6.vxvy,
        vx = _ref6$vxvy[0],
        vy = _ref6$vxvy[1],
        last = _ref6.last;
    return set({
      xys: [vx, vy, last ? 0 : 1]
    });
  });
  var color = React.useMemo(function () {
    return props.color || circ ? dark ? "#818181" : "#fff" : "#212121";
  }, [props.color, circ, dark]);
  var className = React.useMemo(function () {
    return props.className + fa ? " fas fa-" + fa : fab ? " fab fa-" + fab : "";
  }, [props.className, fa, fab]);
  var background = circ ? "#212121" : "";
  return /*#__PURE__*/React__default.createElement(Item$3, _extends_1({
    style: {
      filter: xys.to(function (x, y, s) {
        return ["drop-shadow(" + (0.1 + x) + "rem", // -x~0.5~x
        0.5 + y + "rem", // -y~1.5~y
        1 - s / 2 + "rem", // 1 =hover=> 0.5
        "rgba(0,0,0, " + (0.5 + s / 20) + "))" // 0.50 =hover=> 0.55
        ].join(' ');
      }),
      transform: xys.to(function (x, y, s) {
        return ["perspective(" + size * 50 + "px)", "rotateX(" + -y + "deg)", //-1 ~ 1
        "rotateY(" + x + "deg)", //-1 ~ 1
        "scale(" + (1 + s / 10) + ")" // 1 ~ 1.1
        ].join(' ');
      })
    }
  }, {
    background: background,
    children: children,
    className: className,
    color: color,
    size: size,
    ref: ref
  }, bind(), props));
});

// ************************* 👌 FOR Components 👌 ************************* //
var topUp = function topUp(text) {
  if (text === void 0) {
    text = "";
  }

  return "" + text.charAt(0).toUpperCase() + "" + text.slice(1).toLowerCase();
};
var clamp = function clamp(x, min, max) {
  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = 1;
  }

  return x < min ? min : x > max ? max : x;
};
var range = function range(x, min, max) {
  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = 1;
  }

  return min < x && x < max;
};
var swap = function swap(arr, ind, row) {
  var ret = [].concat(arr.slice(0, ind), arr.slice(ind + 1, arr.length));
  return [].concat(ret.slice(0, row), arr.slice(ind, ind + 1), ret.slice(row));
}; // ************************* 🍭 helpers 🍭 ************************* //
// * This function is fork of react-spring
// * Code : https://github.com/pmndrs/react-spring/blob/master/src/shared/helpers.ts
// ************************* *************** ************************* //

var is = {
  arr: Array.isArray,
  obj: function obj(a) {
    return Object.prototype.toString.call(a) === '[object Object]';
  },
  fun: function fun(a) {
    return typeof a === 'function';
  },
  str: function str(a) {
    return typeof a === 'string';
  },
  num: function num(a) {
    return typeof a === 'number';
  },
  und: function und(a) {
    return a === void 0;
  },
  nul: function nul(a) {
    return a === null;
  },
  set: function set(a) {
    return a instanceof Set;
  },
  map: function map(a) {
    return a instanceof Map;
  },
  equ: function equ(a, b) {
    if (typeof a !== typeof b) return false;
    if (is.str(a) || is.num(a)) return a === b;
    if (is.obj(a) && is.obj(b) && Object.keys(a).length + Object.keys(b).length === 0) return true;
    var i;

    for (i in a) {
      if (!(i in b)) return false;
    }

    for (i in b) {
      if (a[i] !== b[i]) return false;
    }

    return is.und(i) ? a === b : true;
  }
};
function merge(target, lowercase) {
  if (lowercase === void 0) {
    lowercase = true;
  }

  return function (object) {
    return (is.arr(object) ? object : Object.keys(object)).reduce(function (acc, element) {
      var key = lowercase ? element[0].toLowerCase() + element.substring(1) : element;
      acc[key] = target(key);
      return acc;
    }, target);
  };
} // ************************* 🍡 join-url 🍡 ************************* //
// * This function is fork of join-url/urljoin
// * Code : https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
// ************************* *************** ************************* //

function joinURL() {
  for (var _len = arguments.length, strArray = new Array(_len), _key = 0; _key < _len; _key++) {
    strArray[_key] = arguments[_key];
  }

  var resultArray = [];
  if (strArray.length === 0) return '';
  if (typeof strArray[0] !== 'string') throw new TypeError('Url must be string.');
  if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) strArray[0] = strArray.shift() + strArray[0];
  if (strArray[0].match(/^file:\/\/\//)) strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');else strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
  strArray = strArray.filter(function (str) {
    return str !== "";
  });

  for (var i = 0; i < strArray.length; i++) {
    var _str = strArray[i];
    if (typeof _str === 'number') _str = String(_str);
    if (typeof _str !== 'string') throw new TypeError(_str + " must be a string. Received " + typeof _str);
    if (_str === '') continue;
    if (i > 0) _str = _str.replace(/^[\/]+/, ''); //eslint-disable-line

    if (i < strArray.length - 1) _str = _str.replace(/[\/]+$/, ''); //eslint-disable-line
    else _str = _str.replace(/[\/]+$/, '/'); //eslint-disable-line

    resultArray.push(_str);
  }

  var str = resultArray.join('/');
  str = str.replace(/\/(\?|&|#[^!])/g, '$1');
  var parts = str.split('?');
  str = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&');
  return str;
}

var equalPathname = function equalPathname() {
  for (var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++) {
    urls[_key] = arguments[_key];
  }

  return urls.map(function (u) {
    return typeof u === "string" ? new URL(u) : u;
  }).map(function (u) {
    return u && joinURL(u.pathname, "/");
  }).every(function (u, _, self) {
    return u === self[0];
  });
};
var pageConfig = {
  onChange: null
};
var defaultPage = {
  id: window.location.pathname.split('/').filter(function (v) {
    return v;
  }).find(function (_, i) {
    return i === 1;
  }) || "",
  isHome: window.location.pathname.split('/').filter(function (v) {
    return v;
  }).length > 1,
  isLocal: window.location.hostname === "localhost",
  protocol: window.location.protocol || "",
  hostname: window.location.hostname || "",
  portname: window.location.port || "",
  pathname: window.location.pathname || "",
  search: window.location.search || "",
  hash: window.location.hash || "",
  language: window.navigator.language || "ja",
  urls: [new URL(window.location.href)]
};
var joinPage = function joinPage(page) {
  var protocol = page.protocol,
      hostname = page.hostname,
      portname = page.portname,
      _page$pathname = page.pathname,
      pathname = _page$pathname === void 0 ? "" : _page$pathname,
      _page$search = page.search,
      search = _page$search === void 0 ? "" : _page$search,
      _page$hash = page.hash,
      hash = _page$hash === void 0 ? "" : _page$hash;
  var arr = [protocol, hostname, portname, pathname, search, hash];

  var getp = function getp(port) {
    return port ? ":" + port : "";
  };

  var geti = function geti(i, n) {
    if (i === void 0) {
      i = 0;
    }

    return n instanceof Array ? i < n.length ? n[i] : n[n.length - 1] : n;
  };

  if (arr.every(function (v) {
    return typeof v === "string";
  })) return joinURL(protocol + "//" + hostname + getp(portname) + "/", pathname, search);
  var maxLength = arr.map(function (v) {
    return v instanceof Array ? v.length : 1;
  }).reduce(function (a, b) {
    return a > b ? a : b;
  });
  return [].concat(Array(maxLength)).map(function (_, i) {
    return joinURL(geti(i, protocol) + "//" + geti(i, hostname) + getp(geti(i, portname)) + "/", geti(i, pathname), geti(i, search));
  });
};
var normPage = function normPage(page) {
  var state = _extends_1({}, page); //Page<T>


  Object.entries(state).sort(function (_ref) {
    var _ = _ref[0],
        val = _ref[1];
    return typeof val === "function" ? 1 : -1;
  }).forEach(function (_ref2) {
    var key = _ref2[0],
        val = _ref2[1];
    return state[key] = typeof val === "function" ? val(state) : val;
  });
  var urls = joinPage(state);
  return _extends_1({}, state, {
    urls: urls instanceof Array ? urls.map(function (u) {
      return typeof u === "string" ? new URL(u) : u;
    }) : [typeof urls === "string" ? new URL(urls) : urls]
  });
};

var usePage = function usePage(props, //BasicProps<Page<T>>,
config) {
  if (config === void 0) {
    config = {};
  }

  if (typeof props === "function") props = props();
  if (typeof config === "function") config = config();
  var pageRef = React.useRef(_extends_1({}, defaultPage, props));
  var confRef = React.useRef(_extends_1({}, pageConfig, config));

  var _useState = React.useState(normPage(pageRef.current)),
      page = _useState[0],
      set = _useState[1];

  var setPage = React.useCallback(function (state) {
    if (typeof state === "function") state = state(pageRef.current);
    pageRef.current = _extends_1({}, pageRef.current, state);
    set(function (pre) {
      var newPage = normPage(pageRef.current);
      if (pre.pathname === newPage.pathname) return newPage;
      window.history.pushState('', '', newPage.pathname instanceof Array ? newPage.pathname[0] || '' : newPage.pathname || '');
      return newPage;
    });
  }, [set]);
  React.useEffect(function () {
    var onChange = confRef.current.onChange;
    typeof onChange === "function" && onChange();
  }, [page.id]);
  return [page, setPage];
};

var treesPaths = {
  Close: "M717.5 589.5q-10.5 10.5 -25.5 10.5t-26 -10l-154 -155l-154 155q-11 10 -26 10t-25.5 -10.5t-10.5 -25.5t11 -25l154 -155l-154 -155q-11 -10 -11 -25t10.5 -25.5t25.5 -10.5t26 10l154 155l154 -155q11 -10 26 -10t25.5 10.5t10.5 25t-11 25.5l-154 155l154 155 q11 10 11 25t-10.5 25.5zM888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0z",
  Minus: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0 q0 -15 -11 -25.5t-25 -10.5z",
  Plus: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184 q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z",
  Eye: "M963 384q0 14 -21 62q-26 65 -61 109q-57 71 -139 112q-99 50 -230 50t-231 -50q-80 -41 -138 -112q-34 -43 -61 -109q-21 -48 -21 -62v0v0v0v0q0 -14 21 -62q27 -66 61 -109q57 -71 139 -112q100 -50 230 -50t230 50q81 41 139 112q35 44 62 109q20 48 20 62v0v0v0v0z M889 384q-25 -77 -64 -126h-1q-46 -59 -114 -93q-85 -42 -198.5 -42t-198.5 42q-67 34 -114 93q-40 49 -65 126q25 77 65 126q47 59 114 93q85 43 199 43t198 -43q67 -33 114 -93q40 -49 65 -126zM512 558q-72 0 -122.5 -50.5t-50.5 -122.5t50.5 -122.5t122.5 -50.5 t122.5 50.5t50.5 122.5t-50.5 122.5t-122.5 50.5zM614 385q0 -42 -30 -72t-72 -30t-72 30t-30 72t30 72t72 30t72 -30t30 -72z"
};

var treesConfig = {
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};
function useTrees(props) {
  var _props$open = props.open,
      open = _props$open === void 0 ? true : _props$open,
      _props$visible = props.visible,
      visible = _props$visible === void 0 ? true : _props$visible,
      _props$immediate = props.immediate,
      immediate = _props$immediate === void 0 ? true : _props$immediate,
      springconfig = props.springconfig;

  var _useState = React.useState({
    open: open,
    visible: visible,
    immediate: immediate
  }),
      state = _useState[0],
      set = _useState[1];

  var bind = reactUseGesture.useGesture({
    onClick: function onClick() {
      return set && set(function (p) {
        return {
          open: !p.open,
          immediate: false
        };
      });
    }
  });
  var spring = reactSpring.useSpring({
    immediate: state.immediate,
    config: _extends_1({}, reactSpring.config.default, springconfig || treesConfig),
    from: {
      height: 0,
      opacity: 0,
      transform: 'translate3d(20px,0,0)'
    },
    to: {
      height: state.open ? 'auto' : 0,
      opacity: state.open ? 1 : 0,
      transform: state.open ? 'translate3d(0px,0,0)' : 'translate3d(20px,0,0)'
    }
  });
  var path = React.useMemo(function () {
    return treesPaths[props.children ? state.open ? 'Minus' : 'Plus' : 'Close'];
  }, [props.children, state.open]);
  React.useEffect(function () {
    set(function (p) {
      return visible !== p.visible ? _extends_1({}, p, {
        visible: visible
      }) : p;
    });
  }, [visible]);
  return [spring, bind, path];
}

function _templateObject5() {
  var data = taggedTemplateLiteralLoose(["\n    width: 1em;\n    height: 1em;\n    cursor: pointer;\n    margin-right: 10;\n    verticalAlign: middle;\n    font-size: ", "px;\n    color: ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = taggedTemplateLiteralLoose(["\n    display: inline-block;\n    verticalAlign: middle;\n    font-size: ", "px;\n    color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = taggedTemplateLiteralLoose(["\n    font-size: 0.6em;\n    font-family: monospace;\n    text-transform: uppercase;\n    white-space: nowrap;\n    vertical-align: middle;\n    marginRight: ", ";\n    color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = taggedTemplateLiteralLoose(["\n    font-size: ", "px;\n    will-Cchange: transform, opacity, height;\n    margin-left: 6;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = taggedTemplateLiteralLoose(["\n    padding: 4px 0px 0px 0px;\n    position: relative;\n    overflow: hidden;\n    vertical-align: middle;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    border-left: ", ";\n    padding: ", ";\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}

var TreesTop = styled(reactSpring.animated.div)(_templateObject$4(), function (props) {
  return "1px dashed #" + (props.dark ? 818181 : 212121);
}, function (props) {
  return "4px 0px 0px " + props.size * 25 + "px";
});
var TreesMain = styled(reactSpring.animated.div)(_templateObject2$1(), function (props) {
  return props.size * 50;
});
var TreesType = styled(reactSpring.animated.span)(_templateObject3(), function (props) {
  return props.type ? 10 : 0;
}, function (props) {
  return props.color;
});
var TreesCont = styled(reactSpring.animated.div)(_templateObject4(), function (props) {
  return props.size * 50;
}, function (props) {
  return props.color;
});
var TreesIcon = styled.svg(_templateObject5(), function (props) {
  return props.size * 50;
}, function (props) {
  return props.color;
});
function Trees(props) {
  var content = props.content,
      type = props.type,
      _props$depth = props.depth,
      depth = _props$depth === void 0 ? 0 : _props$depth,
      _props$root = props.root,
      root = _props$root === void 0 ? 1 : _props$root,
      _props$size = props.size,
      size = _props$size === void 0 ? 1.5 : _props$size,
      _props$dark = props.dark,
      dark = _props$dark === void 0 ? false : _props$dark,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$viewBox = props.viewBox,
      viewBox = _props$viewBox === void 0 ? "64 -65 897 897" : _props$viewBox;

  var _useTrees = useTrees(props),
      spring = _useTrees[0],
      bind = _useTrees[1],
      path = _useTrees[2];

  var color = React.useMemo(function () {
    return dark ? "#818181" : "#212121";
  }, [dark]);
  var main = React.useMemo(function () {
    return React.Children.map(props.children, function (child) {
      var _ref, _ref$props;

      var grand = React.Children.toArray((_ref = child) == null ? void 0 : (_ref$props = _ref.props) == null ? void 0 : _ref$props.children) || [];
      return props.children && /*#__PURE__*/React__default.createElement(Trees, _extends_1({}, props, {
        depth: depth + 1,
        topStyle: {},
        open: depth < root,
        children: grand.length > 1 ? grand.slice(1) : null,
        immediate: false,
        content: grand.length > 1 ? grand[0] : child
      }));
    });
  }, [props, depth, root]);
  return /*#__PURE__*/React__default.createElement(TreesTop, {
    style: style,
    size: size
  }, !content ? null : /*#__PURE__*/React__default.createElement(TreesIcon, _extends_1({
    color: color,
    size: size,
    viewBox: viewBox
  }, bind()), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    d: path
  }))), /*#__PURE__*/React__default.createElement(TreesType, {
    color: color,
    type: type
  }, type), /*#__PURE__*/React__default.createElement(TreesCont, {
    color: color,
    size: size
  }, content), /*#__PURE__*/React__default.createElement(TreesMain, _extends_1({
    depth: depth,
    size: size
  }, {
    style: spring
  }), main));
}
 // <TreesTggl {...{...props, set, icon, opacity:children?.length?1:.3}}/>

var Modal = function Modal(_ref) {
  var _ref$open = _ref.open,
      open = _ref$open === void 0 ? false : _ref$open,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? null : _ref$onClose,
      _ref$dark = _ref.dark,
      dark = _ref$dark === void 0 ? false : _ref$dark,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size,
      children = _ref.children,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "" : _ref$color,
      props = objectWithoutPropertiesLoose(_ref, ["open", "onClose", "dark", "size", "children", "color"]);

  var width = React.useMemo(function () {
    return 500 * size;
  }, [size]);

  var _useSpring = reactSpring.useSpring(function () {
    return {
      x: 0,
      y: -width,
      scale: 0
    };
  }),
      s = _useSpring[0],
      set = _useSpring[1];

  var bind = reactUseGesture.useGesture({
    onHover: function onHover(_ref2) {
      var hovering = _ref2.hovering;
      return set({
        scale: hovering ? 0.9 : 1
      });
    },
    onDrag: function onDrag(_ref3) {
      var last = _ref3.last,
          down = _ref3.down,
          _ref3$vxvy = _ref3.vxvy,
          vx = _ref3$vxvy[0],
          vy = _ref3$vxvy[1],
          _ref3$movement = _ref3.movement,
          mx = _ref3$movement[0],
          my = _ref3$movement[1],
          cancel = _ref3.cancel;
      if ((my < -width * .5 || width * .5 < my) && cancel) cancel();
      if (!last) return set({
        x: down ? mx : 0,
        y: down ? my : 0
      });
      return Math.pow(mx, 2) < Math.pow(width, 2) / 4 && Math.pow(vx, 2) + Math.pow(vy, 2) < 10 ? set({
        x: 0,
        y: 0,
        scale: 1
      }) : set({
        x: vx * width,
        y: (vy - 1) * width,
        scale: 0
      }) && onClose && setTimeout(function () {
        return onClose();
      }, Math.pow(vx, 2) + Math.pow(vy, 2));
    }
  });
  var root = React.useMemo(function () {
    return document.getElementById('root');
  }, []);
  var style = React.useMemo(function () {
    return _extends_1({
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      top: 0,
      height: "100%",
      position: "fixed",
      alignItems: "center",
      transition: "1s",
      color: color || dark ? "#212121" : "#000",
      zIndex: 200,
      background: "rgba(" + (dark ? "80,80,80" : "0,0,0") + ",.5)"
    }, props.style);
  }, [dark, color, props.style]);
  React.useEffect(function () {
    open && set({
      x: 0,
      y: 0,
      scale: 1
    });
  }, [open, set]);
  return open ? /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default.createElement("div", {
    style: style,
    onClick: function onClick() {
      return onClose && onClose();
    }
  }, /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({
    style: _extends_1({
      position: "relative"
    }, s)
  }, bind(), {
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }), children)), root) : null;
};

var background = function background(_ref) {
  var _ref$r = _ref.r,
      r = _ref$r === void 0 ? 0 : _ref$r,
      _ref$g = _ref.g,
      g = _ref$g === void 0 ? 0 : _ref$g,
      _ref$b = _ref.b,
      b = _ref$b === void 0 ? 0 : _ref$b,
      _ref$a = _ref.a,
      a = _ref$a === void 0 ? .1 : _ref$a,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? true : _ref$debug;
  return debug ? {
    background: "rgba(" + [r, g, b, a].join(',') + ")"
  } : {};
};

var styles = {
  cont: {
    position: "relative",
    width: "100%",
    zIndex: 0,
    margin: "auto"
  },
  main: {
    position: "relative",
    width: "100%",
    zIndex: 0
  },
  side: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    margin: "auto"
  },
  btn: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
};
var NotesSide = function NotesSide(_ref2) {
  var children = _ref2.children,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 1 : _ref2$size,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? 0 : _ref2$height,
      x = _ref2.x,
      _ref2$debug = _ref2.debug,
      debug = _ref2$debug === void 0 ? false : _ref2$debug;
  return x.to(function (px) {
    return Math.pow(px, 2) <= 0;
  }) ? null : /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    children: children,
    style: _extends_1({}, styles.side, {
      height: height
    }, background({
      b: 255,
      debug: debug
    }), {
      y: 0,
      x: x.to(function (px) {
        return -px + (px > 0 ? -.5 : .5) * (size * 500);
      }),
      scale: x.to(function (px) {
        return Math.pow(px, 2) / 4 > Math.pow(size, 2) ? 1 : (px > 0 ? px : -px) / size;
      }),
      width: x.to(function (px) {
        return px > 0 ? px * 2 : -px * 2;
      }),
      display: x.to(function (px) {
        return px ? "inline" : "none";
      })
    })
  });
};
var NotesItem = function NotesItem(_ref3) {
  var children = _ref3.children,
      x = _ref3.x;
  return !children ? null : /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({}, styles.btn, {
      display: x.to(function (px) {
        return px < 0 ? "inline" : "none";
      })
    })
  }, children, " ");
};
var Notes = function Notes(_ref4) {
  var _ref5;

  var _ref4$order = _ref4.order,
      order = _ref4$order === void 0 ? null : _ref4$order,
      _ref4$grandren = _ref4.grandren,
      _ref4$debug = _ref4.debug,
      debug = _ref4$debug === void 0 ? false : _ref4$debug,
      _ref4$right = _ref4.right,
      right = _ref4$right === void 0 ? null : _ref4$right,
      _ref4$left = _ref4.left,
      left = _ref4$left === void 0 ? null : _ref4$left,
      _ref4$depth = _ref4.depth,
      depth = _ref4$depth === void 0 ? 0 : _ref4$depth,
      _ref4$space = _ref4.space,
      space = _ref4$space === void 0 ? 0 : _ref4$space,
      _ref4$size = _ref4.size,
      size = _ref4$size === void 0 ? 1 : _ref4$size,
      _ref4$style = _ref4.style,
      style = _ref4$style === void 0 ? {} : _ref4$style,
      props = objectWithoutPropertiesLoose(_ref4, ["order", "grandren", "debug", "right", "left", "depth", "space", "size", "style"]);

  var _useState = React.useState(((_ref5 = props == null ? void 0 : props.children) == null ? void 0 : _ref5.length) || 1),
      length = _useState[0],
      setLength = _useState[1];

  var _useState2 = React.useState(props.height || size * 500 * length),
      height = _useState2[0],
      setHeight = _useState2[1];

  var _useState3 = React.useState(Array(length).fill(false)),
      isOpen = _useState3[0],
      setIsOpen = _useState3[1];

  var orderRef = React.useRef(order || [].concat(Array(length)).map(function (_, i) {
    return i;
  }));
  var heightRef = React.useRef(Array(length).fill(size * 500));
  var targetRef = React.useRef(null);
  var setPosition = React.useCallback(function () {
    var _targetRef$current;

    if (props.height) return setHeight(props.height);
    var childs = Array.from((targetRef == null ? void 0 : (_targetRef$current = targetRef.current) == null ? void 0 : _targetRef$current.children) || []);
    heightRef.current = [].concat(childs).map(function (c) {
      return c.clientHeight || 0;
    });
    props.children && setHeight([].concat(heightRef.current, [0]).reduce(function (a, b) {
      return a + b;
    }) || size * 500 * length);
  }, [size, length, props.height, props.children]);
  React.useEffect(function () {
    var _ref6;

    var len = ((_ref6 = props.children) == null ? void 0 : _ref6.length) || 1;
    setLength(len);
    setIsOpen(Array(len).fill(false));
    if (orderRef.current.length === len) return;
    orderRef.current = order || [].concat(Array(len)).map(function (_, i) {
      return i;
    });
    heightRef.current = Array(len).fill(size * 500);
  }, [size, order, props.children]); //  *************************  ➊ React Springs  *************************  //

  var getY = function getY(_ref7) {
    var _ref7$pre = _ref7.pre,
        pre = _ref7$pre === void 0 ? 0 : _ref7$pre,
        _ref7$arr = _ref7.arr,
        arr = _ref7$arr === void 0 ? orderRef.current : _ref7$arr;
    return pre < 1 ? 0 : [].concat(arr.slice(0, pre).map(function (i) {
      return heightRef.current[i];
    }), [0]).reduce(function (a, b) {
      return a + b;
    });
  };

  var getF = function getF(_ref8) {
    var _ref8$i = _ref8.i,
        i = _ref8$i === void 0 ? -1 : _ref8$i,
        _ref8$x = _ref8.x,
        x = _ref8$x === void 0 ? 0 : _ref8$x,
        _ref8$s = _ref8.s,
        s = _ref8$s === void 0 ? 1.0 : _ref8$s;
    return function (j) {
      if (j === void 0) {
        j = 0;
      }

      return {
        x: j === i ? x : 0,
        y: getY({
          pre: orderRef.current.indexOf(j)
        }),
        scale: j === i ? s : 1
      };
    };
  };

  var getG = React.useCallback(function (_ref9) {
    var _ref9$i = _ref9.i,
        i = _ref9$i === void 0 ? -1 : _ref9$i,
        _ref9$arr = _ref9.arr,
        arr = _ref9$arr === void 0 ? orderRef.current : _ref9$arr,
        _ref9$pre = _ref9.pre,
        pre = _ref9$pre === void 0 ? -1 : _ref9$pre,
        _ref9$mx = _ref9.mx,
        mx = _ref9$mx === void 0 ? 0 : _ref9$mx,
        _ref9$my = _ref9.my,
        my = _ref9$my === void 0 ? 0 : _ref9$my,
        _ref9$down = _ref9.down,
        down = _ref9$down === void 0 ? false : _ref9$down;
    return function (j) {
      return down && j === i ? {
        scale: 0.9,
        x: mx,
        y: getY({
          pre: pre
        }) + my
      } : {
        scale: 1.0,
        x: 0,
        y: getY({
          pre: arr.indexOf(j),
          arr: arr
        })
      };
    };
  }, []);

  var _useSprings = reactSpring.useSprings(length, getG({})),
      springs = _useSprings[0],
      set = _useSprings[1];

  var bind = reactUseGesture.useGesture({
    onClick: function onClick() {
      return setTimeout(function () {
        setPosition();
        set(getG({}));
      }, 1);
    },
    onDrag: function onDrag(_ref10) {
      var down = _ref10.down,
          cancel = _ref10.cancel,
          _ref10$movement = _ref10.movement,
          mx = _ref10$movement[0],
          my = _ref10$movement[1],
          startTime = _ref10.startTime,
          last = _ref10.last,
          _ref10$args = _ref10.args,
          i = _ref10$args[0],
          _ref10$vxvy = _ref10.vxvy,
          vx = _ref10$vxvy[0],
          vy = _ref10$vxvy[1],
          timeStamp = _ref10.timeStamp;
      if (!last && cancel && timeStamp - startTime < 1) cancel();
      var pre = orderRef.current.indexOf(i);
      var row = clamp(Math.round(pre + my / size * 500), 0, length - 1);
      var arr = swap(orderRef.current, pre, row);
      if (!down) orderRef.current = arr;
      if (!last) return set(getG({
        i: i,
        arr: arr,
        pre: pre,
        mx: mx,
        my: my,
        down: down
      }));
      var x = (mx < 0 ? -1 : 1) * size * 50; // * 2 // window.innerWidth/2 -

      var op = Math.pow(mx, 2) < .1 || Math.pow(x, 2) < Math.pow(mx, 2) * 2 || Math.pow(vx, 2) + Math.pow(vy, 2) > 1 ? !isOpen[i] : isOpen[i];
      setIsOpen(function (p) {
        var _Object$assign;

        return [].concat(Object.assign([], (_Object$assign = {}, _Object$assign[i] = !p[i], _Object$assign)));
      });
      setTimeout(function () {
        setPosition();
        set(getF({
          i: i,
          s: op ? 1 : 1
        }));
      }, 1); //TODO: s is .9?
    }
  }); //  *************************  ➋ Child Render  *************************  //

  var children = React.useMemo(function () {
    return React.Children.map(props.children, function (child) {
      var _ref11, _ref11$props;

      var grand = React.Children.toArray((_ref11 = child) == null ? void 0 : (_ref11$props = _ref11.props) == null ? void 0 : _ref11$props.children) || []; //count(child.props.children) || 0

      return grand.length > 1 && depth === 0 ?
      /*#__PURE__*/
      // TODO for depth > 0
      React__default.cloneElement(child, {
        children: grand[0],
        grandren: /*#__PURE__*/React__default.createElement(Notes, _extends_1({}, props, {
          depth: depth + 1,
          children: grand.slice(1)
        }))
      }) : child;
    });
  }, [depth, props]);
  React.useEffect(function () {
    var resize = function resize() {
      return  (setPosition(), set(getG({})));
    };

    window.addEventListener('resize', resize);
    resize();
    return function () {
      return window.removeEventListener('resize', resize);
    };
  }, [setPosition, set, getG]);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: targetRef,
    style: _extends_1({}, styles.cont, {
      height: height
    }, style, background({
      r: 255,
      debug: debug
    }))
  }, springs.map(function (_ref12, key) {
    var _key, _key$props;

    var x = _ref12.x,
        y = _ref12.y,
        scale = _ref12.scale;
    return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({
      key: key
    }, bind(key), {
      style: {
        x: x,
        y: y,
        position: "absolute",
        width: "100%"
      }
    }), /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
      style: _extends_1({}, styles.main, {
        scale: scale,
        padding: space
      }, background({
        g: 255,
        debug: debug
      }))
    }, children[key]), /*#__PURE__*/React__default.createElement(NotesSide, {
      x: x,
      size: size,
      debug: debug,
      height: heightRef.current[key]
    }, /*#__PURE__*/React__default.createElement(NotesItem, {
      x: x
    }, right), /*#__PURE__*/React__default.createElement(NotesItem, {
      x: x
    }, left)), isOpen[key] ? ((_key = children[key]) == null ? void 0 : (_key$props = _key.props) == null ? void 0 : _key$props.grandren) || '' : '');
  }));
};

var styles$1 = {
  pill: {
    position: "absolute",
    padding: "0px",
    zIndex: 1,
    transform: "translate(-50%,-50%)"
  }
};
var Pills = function Pills(_ref) {
  var _ref$position = _ref.position,
      position = _ref$position === void 0 ? {
    x: 0,
    y: 0,
    r: Math.PI / 4
  } : _ref$position,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 0 : _ref$depth,
      _ref$rate = _ref.rate,
      rate = _ref$rate === void 0 ? 1.414 : _ref$rate,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size,
      _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
      props = objectWithoutPropertiesLoose(_ref, ["position", "depth", "rate", "size", "isOpen"]);

  var length = React.useMemo(function () {
    var _ref2;

    return ((_ref2 = props == null ? void 0 : props.children) == null ? void 0 : _ref2.length) || 1;
  }, [props]);
  var childPos = React.useRef(Array(length).fill(position));
  var fn = React.useCallback(function () {
    return function (i) {
      if (i === void 0) {
        i = 0;
      }

      var r = position.r / 2 + Math.PI / 2 * ((length - i - 1) * 10 + 1) / ((length - 1) * 10 + 2) - Math.PI / 8;
      var x = isOpen ? 50 * rate * size * Math.cos(r) : 0;
      var y = isOpen ? -50 * rate * size * Math.sin(r) : 0;
      childPos.current[i] = {
        x: x,
        y: -y,
        r: r
      };
      return {
        x: x,
        y: y,
        scale: isOpen ? 1 : 0
      };
    };
  }, [isOpen, length, position.r, rate, size]);

  var _useSprings = reactSpring.useSprings(length, fn()),
      springs = _useSprings[0],
      set = _useSprings[1];

  var _useState = React.useState(Array(length).fill(false)),
      childHub = _useState[0],
      setChildHub = _useState[1];

  var setHub = React.useCallback(function (e, key) {
    setChildHub(function (p) {
      var _Object$assign;

      return Object.assign([], p, (_Object$assign = {}, _Object$assign[key] = !p[key], _Object$assign));
    });
    e.stopPropagation();
  }, []);
  var children = React.useMemo(function () {
    return React.Children.map(props.children, function (child, key) {
      var _ref3, _ref3$props;

      set(fn());
      return child && ((_ref3 = child) == null ? void 0 : (_ref3$props = _ref3.props) == null ? void 0 : _ref3$props.children) ? /*#__PURE__*/React__default.cloneElement(child, {
        children: /*#__PURE__*/React__default.createElement(Pills, _extends_1({
          key: key,
          isOpen: isOpen && childHub[key],
          depth: depth + 1,
          position: childPos.current[key],
          rate: rate * (1 + (depth + 1) * 0.2),
          fontSize: 50 * size / (1 + (depth + 1) * 0.2)
        }, child.props || {}))
      }) : child;
    });
  }, [childHub, depth, fn, isOpen, props.children, rate, set, size]);
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "fixed",
      left: position.x,
      bottom: position.y
    }
  }, springs.map(function (spring, key) {
    return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
      key: depth + "-" + key,
      style: _extends_1({}, spring, styles$1.pill),
      onClick: function onClick(e) {
        return setHub(e, key);
      }
    }, children[key]);
  }));
};

function Sheet(_ref) {
  var children = _ref.children,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 100 : _ref$height,
      _ref$started = _ref.started,
      started = _ref$started === void 0 ? false : _ref$started,
      _ref$onOpen = _ref.onOpen,
      onOpen = _ref$onOpen === void 0 ? null : _ref$onOpen,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? null : _ref$onClose;

  var _useSpring = reactSpring.useSpring(function () {
    return {
      y: height
    };
  }),
      y = _useSpring[0].y,
      set = _useSpring[1];

  var open = React.useCallback(function (c) {
    if (c === void 0) {
      c = false;
    }

    return onOpen && (onOpen(), set({
      y: 0,
      config: c ? reactSpring.config.wobbly : reactSpring.config.stiff
    }));
  }, [onOpen, set]);
  var close = React.useCallback(function (v) {
    if (v === void 0) {
      v = 0;
    }

    return onClose && (onClose(), set({
      y: height,
      config: _extends_1({}, reactSpring.config.stiff, {
        velocity: v
      })
    }));
  }, [height, onClose, set]);
  var bind = reactUseGesture.useDrag(function (_ref2) {
    var last = _ref2.last,
        _ref2$vxvy = _ref2.vxvy,
        vy = _ref2$vxvy[1],
        _ref2$movement = _ref2.movement,
        mx = _ref2$movement[0],
        my = _ref2$movement[1],
        cancel = _ref2.cancel;
    if (my < -height / 3) cancel && cancel();
    if (last) return (my > height * 0.5 || vy > 2.5) && -100 < mx && mx < 100 ? close(vy) : open(vy > 0);
    set({
      y: my,
      immediate: false,
      config: reactSpring.config.stiff
    });
  }, {
    initial: function initial() {
      return [0, y.get()];
    },
    filterTaps: true,
    bounds: {
      top: 0
    },
    rubberband: true
  });
  var f = React.useRef(function (started) {
    return started ? open() : close();
  });
  React.useEffect(function () {
    f.current(started);
  }, [started]);
  var display = y.to(function (py) {
    if (py === void 0) {
      py = 0;
    }

    return py < height ? 'block' : 'none';
  });
  var style = React.useMemo(function () {
    var bottom = "calc(-100vh + " + (height - 100) + "px)";
    return {
      bottom: bottom,
      left: "2vw",
      width: "96vw",
      height: "calc(100vh + 100px)",
      position: "fixed",
      borderRadius: "4em 4em 0px",
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0)',
      touchAction: "none"
    };
  }, [height]); //console.log('\tRender Sheet');

  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({}, bind(), {
    style: _extends_1({}, style, {
      y: y,
      display: display
    })
  }), children);
}

var styles$2 = {
  area: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 1
  },
  cont: {
    position: "fixed",
    top: "2%",
    left: 0,
    zIndex: 1,
    overflowX: "hidden",
    height: "96%"
  },
  icon: {
    position: "absolute",
    transform: "translate(-50%,-50%)"
  },
  item: {
    padding: "10px 10px 10px 32px",
    color: "#818181",
    display: "block"
  }
};

var SidesArea = function SidesArea(_ref) {
  var spring = _ref.spring,
      bind = _ref.bind,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({
    style: _extends_1({}, styles$2.area, {
      width: spring.x.to(function (x) {
        return x > 1 ? "100%" : size * 50 / 2 + "px";
      }),
      background: spring.scale.to(function (s) {
        var rate = spring.x.animation.to / window.innerWidth; //0 ~ 0.5

        return "linear-gradient(90deg,rgba(0,0,0," + (rate + s - 1) + "),rgba(0,0,0,0))";
      })
    })
  }, bind()));
};

var SidesContainer = function SidesContainer(_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 1 : _ref2$size,
      spring = _ref2.spring,
      children = _ref2.children;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({}, styles$2.cont, {
      width: spring.x.to(function (x) {
        return x > 0 ? x : 0;
      }),
      borderRadius: "0px " + 50 * size + "px " + 50 * size + "px 0px",
      background: "#212121"
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      margin: 50 * size + "px 0px 0px 0px",
      position: "absolute"
    }
  }, children));
};

var SidesIcon = function SidesIcon(_ref3) {
  var spring = _ref3.spring,
      bind = _ref3.bind,
      _ref3$circ = _ref3.circ,
      circ = _ref3$circ === void 0 ? false : _ref3$circ,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 1 : _ref3$size;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({}, bind(), {
    style: _extends_1({}, styles$2.icon, spring, {
      top: size * 50,
      left: size * 50
    })
  }), /*#__PURE__*/React__default.createElement(Icon, _extends_1({
    fa: "align-left"
  }, {
    circ: circ,
    size: size
  })));
};

var SidesItem = function SidesItem(_ref4) {
  var children = _ref4.children,
      _ref4$size = _ref4.size,
      size = _ref4$size === void 0 ? 1 : _ref4$size;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({}, styles$2.item, {
      transition: "0.75s",
      fontSize: 50 * size
    }),
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, children);
};

var Sides = function Sides(_temp) {
  var _ref5 = _temp === void 0 ? {} : _temp,
      children = _ref5.children,
      _ref5$width = _ref5.width,
      width = _ref5$width === void 0 ? window.innerWidth / 2 : _ref5$width,
      _ref5$size = _ref5.size,
      size = _ref5$size === void 0 ? 1 : _ref5$size,
      _ref5$onOpen = _ref5.onOpen,
      onOpen = _ref5$onOpen === void 0 ? function () {
    return null;
  } : _ref5$onOpen;

  var opened = React.useRef(false);
  var setOpened = React.useCallback(function (bool) {
    if (bool === void 0) {
      bool = true;
    }

    return  (opened.current = bool, onOpen && onOpen());
  }, [onOpen]);

  var _useSpring = reactSpring.useSpring(function () {
    return {
      x: 0,
      y: 0,
      scale: 1
    };
  }),
      spring = _useSpring[0],
      set = _useSpring[1];

  var open = function open(v) {
    if (v === void 0) {
      v = 0;
    }

    return  (setOpened(true), set({
      x: width,
      y: 0,
      config: v !== 0 ? reactSpring.config.wobbly : reactSpring.config.slow
    }));
  };

  var close = function close(v) {
    if (v === void 0) {
      v = 0;
    }

    return  (setOpened(false), set({
      x: 0,
      y: 0,
      config: _extends_1({}, reactSpring.config.stiff, {
        velocity: v
      })
    }));
  };

  var bind = reactUseGesture.useGesture({
    onHover: function onHover(_ref6) {
      var hovering = _ref6.hovering;
      return set({
        scale: hovering ? 1.2 : 1
      });
    },
    onDrag: function onDrag(_ref7) {
      var last = _ref7.last,
          down = _ref7.down,
          _ref7$vxvy = _ref7.vxvy,
          vx = _ref7$vxvy[0],
          _ref7$movement = _ref7.movement,
          mx = _ref7$movement[0],
          my = _ref7$movement[1],
          cancel = _ref7.cancel;
      if ((my < -width * .5 || width * .5 < my) && cancel) cancel();
      if (!last) return set({
        x: (opened.current ? width : 0) + (down ? mx : 0),
        y: down ? my : 0
      });
      if (!opened.current) return mx === 0 || mx > width * 0.5 || vx > 0.5 ? open(vx) : close(vx);
      if (opened.current) return mx === 0 || mx < -width * 0.5 || vx < -0.5 ? close(vx) : open(vx);
    }
  });
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100
    }
  }, /*#__PURE__*/React__default.createElement(SidesIcon, {
    size: size,
    spring: spring,
    bind: bind
  }), /*#__PURE__*/React__default.createElement(SidesArea, {
    size: size,
    spring: spring,
    bind: bind
  }), /*#__PURE__*/React__default.createElement(SidesContainer, {
    size: size,
    spring: spring,
    bind: bind
  }, /*#__PURE__*/React__default.createElement(Trees, {
    dark: true,
    size: size
  }, React__default.Children.map(children, function (child, key) {
    return /*#__PURE__*/React__default.createElement(SidesItem, {
      size: size,
      key: key
    }, child);
  }))));
};

function _templateObject2$2() {
  var data = taggedTemplateLiteralLoose(["\n    position: absolute;\n    will-change: transform;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$5() {
  var data = taggedTemplateLiteralLoose(["\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var Wrap$1 = styled(reactSpring.animated.div)(_templateObject$5());
var Item$4 = styled(reactSpring.animated.div)(_templateObject2$2());
function Slide(_ref) {
  var children = _ref.children,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 600 : _ref$width,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? 4 : _ref$visible;
  var len = React.useMemo(function () {
    return children.length > visible ? children.length : visible;
  }, [children, visible]);
  var idx = React.useCallback(function (x) {
    return (x < 0 ? x + len : x) % len;
  }, [len]);
  var getPos = React.useCallback(function (i, firstVis, firstVisIdx) {
    return idx(i - firstVis + firstVisIdx);
  }, [idx]);

  var _useSprings = reactSpring.useSprings(len, function (i) {
    return {
      x: (i < len - 1 ? i : -1) * width
    };
  }),
      springs = _useSprings[0],
      set = _useSprings[1];

  var prev = React.useRef([0, 1]);
  var wheelOffset = React.useRef(0);
  var dragOffset = React.useRef(0);
  var runSprings = React.useCallback(function (xy, vxy) {
    var firstVis = idx(Math.floor(xy / width) % len);
    var firstVisIdx = vxy < 0 ? len - visible : 1;
    set(function (i) {
      var position = getPos(i, firstVis, firstVisIdx);
      var prevPosition = getPos(i, prev.current[0], prev.current[1]);
      var rank = firstVis - (xy < 0 ? len : 0) + position - firstVisIdx;
      var configPos = vxy > 0 ? position : len - position - 1;
      return {
        x: -xy % (width * len) + width * rank,
        immediate: vxy < 0 ? prevPosition > position : prevPosition < position,
        config: {
          tension: (1 + len - configPos) * 100,
          friction: 30 + configPos * 40
        }
      };
    });
    prev.current = [firstVis, firstVisIdx];
  }, [idx, getPos, width, visible, set, len]);
  var bind = reactUseGesture.useGesture({
    onDrag: function onDrag(_ref2) {
      var _ref2$offset = _ref2.offset,
          x = _ref2$offset[0],
          _ref2$vxvy = _ref2.vxvy,
          vx = _ref2$vxvy[0];
      return vx && (dragOffset.current = -x, runSprings(wheelOffset.current - x, -vx));
    },
    onWheel: function onWheel(_ref3) {
      var _ref3$offset = _ref3.offset,
          y = _ref3$offset[1],
          _ref3$vxvy = _ref3.vxvy,
          vy = _ref3$vxvy[1];
      return vy && (wheelOffset.current = y, runSprings(dragOffset.current + y, vy));
    }
  });
  console.log('\t\tRender Slider');
  return /*#__PURE__*/React__default.createElement(Wrap$1, bind(), springs.map(function (_ref4, i) {
    var x = _ref4.x;
    return /*#__PURE__*/React__default.createElement(Item$4, {
      key: i,
      style: {
        x: x
      }
    }, children[i]);
  }));
} // export * from './utils'
// export * from './hooks'

var sample = function sample(a, k, init) {
  return [].concat(a.slice(0, k), k - a.length > 0 ? Array(k - a.length).fill(init || a[0]) : []);
};

function initSplit(o, l, dis) {
  if (o === void 0) {
    o = [];
  }

  if (l === void 0) {
    l = 0;
  }

  if (dis === void 0) {
    dis = 256;
  }

  if (o.length < 1) return Array(l).fill(l > 0 ? 1 / l : l);
  return sample(o, l, -1).map(function (v) {
    if (v === void 0) {
      v = 0;
    }

    return  v > 0 && (v <= 1 ? v : v / dis) || v < 0 && -1 || 0;
  }).map(function (v, _, s) {
    return v >= 0 ? v : 1 - [].concat(s.filter(function (v) {
      return v > 0;
    }), [0]).reduce(function (a, b) {
      return a + b;
    }) / s.filter(function (v) {
      return v < 0;
    }).length;
  });
}
function moveSplit(r, k, mx, s, m, l, dis) {
  if (r === void 0) {
    r = [];
  }

  if (k === void 0) {
    k = 0;
  }

  if (mx === void 0) {
    mx = 0;
  }

  if (s === void 0) {
    s = 1;
  }

  if (m === void 0) {
    m = 0;
  }

  if (l === void 0) {
    l = 0;
  }

  if (dis === void 0) {
    dis = 256;
  }

  return function (i) {
    if (i === void 0) {
      i = 0;
    }

    return [k, k + s].every(function (e) {
      return range(e, -1, l);
    }) ? (i === k || i === k + s) && range(r[i] + mx * s * (i === k ? 1 : -1) / dis, m, r[k] + r[k + s] - m) ? {
      r: r[i] + mx * s * (i === k ? 1 : -1) / dis
    } : null : (i === k || i === k - s) && range(r[i] - mx * s * (i === k ? 1 : -1) / dis, m, r[k] + r[k - s] - m) ? {
      r: r[i] - mx * s * (i === k ? 1 : -1) / dis
    } : null;
  };
}

function useSplit(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? window.innerWidth : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? window.innerHeight : _ref$height,
      _ref$order = _ref.order,
      order = _ref$order === void 0 ? [] : _ref$order,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? false : _ref$vertical;
  var len = React.useMemo(function () {
    return (children == null ? void 0 : children.length) || 0;
  }, [children]);
  var dis = React.useMemo(function () {
    return vertical ? height : width;
  }, [vertical, height, width]);
  var sRef = React.useRef(0);
  var rRef = React.useRef(initSplit(order, len, dis));

  var _useSprings = reactSpring.useSprings(len, function (i) {
    return {
      r: rRef.current[i]
    };
  }),
      s = _useSprings[0],
      _ = _useSprings[1];

  var bind = reactUseGesture.useGesture({
    onDrag: function onDrag(_ref2) {
      var first = _ref2.first,
          last = _ref2.last,
          _ref2$args = _ref2.args,
          key = _ref2$args[0],
          movement = _ref2.movement,
          direction = _ref2.direction;

      var _map = [movement, direction].map(function (xy) {
        return xy[vertical ? 1 : 0];
      }),
          m = _map[0],
          d = _map[1];

      if (sRef.current === 0 || first) sRef.current = sign(d);
      if (sign(d) === sRef.current) _(moveSplit(rRef.current, key, m, sign(d), min, len, dis));
      if (last) rRef.current = s.map(function (s) {
        return s.r.animation.to || 0;
      });
    }
  }); // *************** RENDER *************** //

  var styles = React.useCallback(function (i) {
    var _s$i, _s$i$r, _s$i2, _s$i2$r;

    if (i === void 0) {
      i = 0;
    }

    return _extends_1({}, style, vertical ? {
      width: "100%",
      height: (_s$i = s[i]) == null ? void 0 : (_s$i$r = _s$i.r) == null ? void 0 : _s$i$r.to(function (v) {
        if (v === void 0) {
          v = 0;
        }

        return 100 * v + "%";
      })
    } : {
      height: "100%",
      width: (_s$i2 = s[i]) == null ? void 0 : (_s$i2$r = _s$i2.r) == null ? void 0 : _s$i2$r.to(function (v) {
        if (v === void 0) {
          v = 0;
        }

        return 100 * v + "%";
      })
    }, {
      verticalAlign: "top",
      display: (vertical ? "" : "inline-") + "block"
    });
  }, [vertical, s, style]);
  React.useEffect(function () {
    rRef.current = initSplit(order, len, dis);

    _(function (i) {
      return {
        r: rRef.current[i]
      };
    });
  }, [order, len, dis, _]);
  return [styles, bind];
}

function sign(num) {
  if (num === void 0) {
    num = 0;
  }

  return num < 0 && -1 || num > 0 && 1 || num === 0 && 0 || 0;
}

function _templateObject2$3() {
  var data = taggedTemplateLiteralLoose([""]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = taggedTemplateLiteralLoose(["\n    width: 100%;\n    height: 100%;\n    whiteSpace: nowrap;\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var SplitWrapp = styled(reactSpring.animated.div)(_templateObject$6());
var SplitChild = styled(reactSpring.animated.div)(_templateObject2$3());
function Split(props) {
  var _useSplit = useSplit(props),
      styles = _useSplit[0],
      bind = _useSplit[1];

  return /*#__PURE__*/React__default.createElement(SplitWrapp, {
    style: props.style
  }, React.Children.map(props.children, function (children, key) {
    return /*#__PURE__*/React__default.createElement(SplitChild, _extends_1({
      style: styles(key)
    }, bind(key), {
      key: key,
      children: children
    }));
  }));
}

var styles$3 = {
  top: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 100
  },
  //*dev*/, background:"rgba(0,0,0,.1)"},
  area: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%"
  },
  //*dev*/,background:"rgba(255,0,0,.1)"},
  cont: {
    position: "fixed",
    height: "96%",
    top: "2%",
    right: 0,
    overflowX: "hidden"
  },
  //*dev*/,background:"rgba(0,255,0,.1)"},
  icon: {
    position: "absolute",
    right: 0,
    transform: "translate(-50%,-50%)"
  },
  //*dev*/,background:"rgba(0,0,255,.1)"},
  item: {
    backgroundColor: "#212121",
    color: "#818181",
    display: "inline-block"
  }
};
var TransArea = function TransArea(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size,
      spring = _ref.spring;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({
      width: spring.r.to(function (r) {
        return 50 * size * (Math.cos(r / 90 * Math.PI) + 1.5) + "px";
      }),
      background: spring.scale.to(function (s) {
        return ["linear-gradient(90deg", "rgba(0,0,0,0)", "rgba(0,0,0," + (s - 1) + "))"].join(',');
      })
    }, styles$3.area)
  });
};
var TransIcon = function TransIcon(_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 1 : _ref2$size,
      spring = _ref2.spring,
      _ref2$circ = _ref2.circ,
      circ = _ref2$circ === void 0 ? false : _ref2$circ;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({}, styles$3.icon, {
      top: 50 * size,
      rotateZ: spring.r
    })
  }, /*#__PURE__*/React__default.createElement(Icon, _extends_1({
    fa: "align-justify"
  }, {
    circ: circ,
    size: size
  })));
};
var TransContainer = function TransContainer(_ref3) {
  var children = _ref3.children,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 1 : _ref3$size,
      spring = _ref3.spring;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({}, styles$3.cont, {
      width: spring.r.to(function (r) {
        if (r === void 0) {
          r = 0;
        }

        return 50 * size * (Math.cos(r / 90 * Math.PI) + 1) + "px";
      })
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      margin: "calc(" + 50 * size * 2 + "px - 2%) 0px 0px 0px"
    }
  }, children));
};
var TransItem = function TransItem(_ref4) {
  var children = _ref4.children,
      _ref4$size = _ref4.size,
      size = _ref4$size === void 0 ? 1 : _ref4$size;
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, {
    style: _extends_1({}, styles$3.item, {
      margin: 50 * size / 4 + "px 0px",
      borderRadius: 50 * size + "px 0px  0px " + 50 * size + "px"
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick(e) {
      return e == null ? void 0 : e.stopPropagation();
    },
    style: {
      height: 50 * size,
      margin: "auto " + 50 * size / 2 + "px",
      fontSize: 50 * size,
      zIndex: 1,
      display: "flex",
      alignItems: "center"
    }
  }, children));
};
var Trans = function Trans(_temp) {
  var _ref5 = _temp === void 0 ? {} : _temp,
      children = _ref5.children,
      _ref5$size = _ref5.size,
      size = _ref5$size === void 0 ? 1 : _ref5$size,
      _ref5$onOpen = _ref5.onOpen,
      onOpen = _ref5$onOpen === void 0 ? function () {
    return null;
  } : _ref5$onOpen;

  var opened = React.useRef(false);
  var setOpened = React.useCallback(function (bool) {
    return  (opened.current = bool, onOpen && onOpen());
  }, [onOpen]);

  var _useSpring = reactSpring.useSpring(function () {
    return {
      x: 0,
      y: 0,
      r: 90,
      scale: 1
    };
  }),
      spring = _useSpring[0],
      set = _useSpring[1];

  var getr = function getr(velocity) {
    if (velocity === void 0) {
      velocity = 0;
    }

    var pre = ~~(spring.r.animation.to / 90); //  Math.round( spring.r.animation.to/90 || 0 ) //

    var unit = ((opened.current ? 1 : 0) === pre % 2 ? 0 : 1) ? 0 : 1; //to change:1 no diff:0

    return 90 * (pre + unit * (velocity < 0 ? -1 : 1));
  };

  var open = function open(v) {
    if (v === void 0) {
      v = 0;
    }

    return  (setOpened(true), set({
      r: getr(v),
      config: v !== 0 ? reactSpring.config.wobbly : reactSpring.config.slow
    }));
  };

  var close = function close(v) {
    if (v === void 0) {
      v = 0;
    }

    return  (setOpened(false), set({
      r: getr(v),
      config: _extends_1({}, reactSpring.config.stiff)
    }));
  };

  var onBind = function onBind(_ref6) {
    var _ref6$mx = _ref6.mx,
        mx = _ref6$mx === void 0 ? 0 : _ref6$mx,
        _ref6$vx = _ref6.vx,
        vx = _ref6$vx === void 0 ? 0 : _ref6$vx,
        _ref6$down = _ref6.down,
        down = _ref6$down === void 0 ? false : _ref6$down,
        _ref6$last = _ref6.last,
        last = _ref6$last === void 0 ? false : _ref6$last;
    if (!last) return set({
      r: spring.r.animation.to + (down ? 2 * -mx / size / 500 : 0)
    });
    if (!opened.current) return mx === 0 || mx < -size * 250 || vx < -0.5 ? open(-vx) : close(-vx);
    if (opened.current) return mx === 0 || mx < -size * 250 || vx < -0.5 || 0.5 < vx ? close(-vx) : open(-vx);
  };

  var bind = reactUseGesture.useGesture({
    onHover: function onHover(_ref7) {
      var hovering = _ref7.hovering;
      return set({
        scale: hovering ? 1.2 : 1
      });
    },
    onPinch: function onPinch(_ref8) {
      var last = _ref8.last,
          down = _ref8.down,
          _ref8$offset = _ref8.offset,
          _ = _ref8$offset[0],
          a = _ref8$offset[1];
      return onBind({
        down: down,
        last: last,
        vx: 0,
        mx: a
      });
    },
    onDrag: function onDrag(_ref9) {
      var last = _ref9.last,
          down = _ref9.down,
          _ref9$vxvy = _ref9.vxvy,
          vx = _ref9$vxvy[0],
          _ref9$movement = _ref9.movement,
          mx = _ref9$movement[0];
      return onBind({
        down: down,
        last: last,
        vx: vx,
        mx: mx
      });
    }
  });
  return /*#__PURE__*/React__default.createElement(reactSpring.animated.div, _extends_1({}, bind(), {
    style: styles$3.top
  }), /*#__PURE__*/React__default.createElement(TransIcon, {
    size: size,
    spring: spring
  }), /*#__PURE__*/React__default.createElement(TransArea, {
    size: size,
    spring: spring
  }), /*#__PURE__*/React__default.createElement(TransContainer, {
    size: size,
    spring: spring
  }, React__default.Children.map(children, function (child, key) {
    return /*#__PURE__*/React__default.createElement(TransItem, {
      size: size,
      key: key
    }, child);
  })));
};

exports.Card = Card;
exports.Foot = Foot;
exports.Grow = Grow;
exports.Head = Head;
exports.Icon = Icon;
exports.Modal = Modal;
exports.Notes = Notes;
exports.NotesItem = NotesItem;
exports.NotesSide = NotesSide;
exports.Pills = Pills;
exports.Sheet = Sheet;
exports.Sides = Sides;
exports.Slide = Slide;
exports.Split = Split;
exports.Trans = Trans;
exports.TransArea = TransArea;
exports.TransContainer = TransContainer;
exports.TransIcon = TransIcon;
exports.TransItem = TransItem;
exports.Trees = Trees;
exports.clamp = clamp;
exports.defaultPage = defaultPage;
exports.equalPathname = equalPathname;
exports.initSplit = initSplit;
exports.is = is;
exports.joinPage = joinPage;
exports.joinURL = joinURL;
exports.merge = merge;
exports.moveSplit = moveSplit;
exports.normPage = normPage;
exports.pageConfig = pageConfig;
exports.range = range;
exports.swap = swap;
exports.topUp = topUp;
exports.treesPaths = treesPaths;
exports.usePage = usePage;
exports.useSplit = useSplit;
exports.useTrees = useTrees;
