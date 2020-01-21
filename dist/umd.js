(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global['react-showreel'] = factory(global.React));
}(this, (function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".showreel-container {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n\n.showreel-control {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.showreel-nav-button {\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  width: 2.5rem;\n  height: 2.5rem;\n  margin: 1.25rem;\n  z-index: 2;\n  box-shadow: 0;\n  border: 0;\n}\n\n.showreel-list-container {\n  display: flex;\n  flex-basis: 100%;\n  width: 100%;\n}\n\n.showreel-list-container > * {\n  flex: 0 0 auto;\n}\n";
  styleInject(css);

  var getListContainerTransformCss = function getListContainerTransformCss() {
    var translateX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return "translateX(-".concat(translateX, "px)");
  };

  var getListContainerTransitionCss = function getListContainerTransitionCss() {
    var transitionSpeed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    return "transform ".concat(transitionSpeed, "ms ease 100ms");
  };

  var ListContainer = React.forwardRef(function (_ref, ref) {
    var children = _ref.children,
        transitionSpeed = _ref.transitionSpeed,
        translateX = _ref.translateX,
        handleTransitionEnd = _ref.handleTransitionEnd;
    return React__default.createElement("div", {
      ref: ref,
      className: "showreel-list-container",
      onTransitionEnd: handleTransitionEnd,
      style: {
        transition: getListContainerTransitionCss(transitionSpeed),
        transform: getListContainerTransformCss(translateX)
      }
    }, children);
  });

  var Showreel = function Showreel(_ref2) {
    var children = _ref2.children,
        _ref2$slidesToScroll = _ref2.slidesToScroll,
        slidesToScroll = _ref2$slidesToScroll === void 0 ? 1 : _ref2$slidesToScroll,
        _ref2$slidePage = _ref2.slidePage,
        slidePage = _ref2$slidePage === void 0 ? false : _ref2$slidePage,
        _ref2$infinite = _ref2.infinite,
        infinite = _ref2$infinite === void 0 ? false : _ref2$infinite,
        _ref2$speed = _ref2.speed,
        speed = _ref2$speed === void 0 ? 300 : _ref2$speed;
    var listContainer = React.useRef(null);

    var _useState = React.useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        currentIndex = _useState2[0],
        setCurrentIndex = _useState2[1];

    var _useState3 = React.useState(speed),
        _useState4 = _slicedToArray(_useState3, 2),
        transitionSpeed = _useState4[0],
        setTransitionSpeed = _useState4[1];

    var _useState5 = React.useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        translateX = _useState6[0],
        setTranslateX = _useState6[1];

    var _useState7 = React.useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        displayNextButton = _useState8[0],
        setDisplayNextButton = _useState8[1];

    var _useState9 = React.useState(false),
        _useState10 = _slicedToArray(_useState9, 2),
        lockButtons = _useState10[0],
        setLockButtons = _useState10[1];

    var getIsLastItemNotVisible = React.useCallback(function () {
      console.log('getIsLastItemNotVisible 0');

      if (!listContainer.current) {
        return false;
      }

      var childrenCount = listContainer.current.children.length;
      var lastChild = listContainer.current.children[childrenCount - 1];

      var _listContainer$curren = listContainer.current.getBoundingClientRect(),
          containerWidth = _listContainer$curren.width;

      var _lastChild$getBoundin = lastChild.getBoundingClientRect(),
          left = _lastChild$getBoundin.left,
          width = _lastChild$getBoundin.width;

      console.log('getIsLastItemNotVisible', containerWidth < left + width);
      return containerWidth < left + width;
    }, [listContainer]);
    React.useEffect(function () {
      if (listContainer.current && listContainer.current.children[currentIndex]) {
        var selectedChild = listContainer.current.children[currentIndex];

        if (selectedChild.offsetLeft !== translateX) {
          setLockButtons(true);
          setTranslateX(selectedChild.offsetLeft);
        }
      }
    }, [listContainer, currentIndex]);
    React.useEffect(function () {
      if (listContainer.current && infinite) {
        setCurrentIndex(listContainer.current.children.length / 3);
      }
    }, [listContainer]);
    React.useEffect(function () {
      setDisplayNextButton(getIsLastItemNotVisible());
    }, []);
    console.log('here');
    React.useEffect(function () {
      setTransitionSpeed(speed);
    }, [speed]);
    return React__default.createElement("div", {
      className: "showreel-container"
    }, React__default.createElement("div", {
      className: "showreel-control"
    }, currentIndex !== 0 ? React__default.createElement("button", {
      className: "showreel-nav-button",
      disabled: lockButtons,
      onClick: function onClick() {
        if (slidePage) {
          var childrenCount = listContainer.current.children.length;

          var _listContainer$curren2 = listContainer.current.getBoundingClientRect(),
              containerWidth = _listContainer$curren2.width;

          var index = currentIndex - 1;
          var width = 0;

          while (index > 0 && width < containerWidth) {
            var prevChild = listContainer.current.children[index];

            var _prevChild$getBoundin = prevChild.getBoundingClientRect(),
                prevChildWidth = _prevChild$getBoundin.width;

            width = width + prevChildWidth;

            if (width > containerWidth) {
              break;
            }

            index = index - 1;
          }

          setCurrentIndex(index);
          return;
        }

        var indexToScroll = currentIndex - slidesToScroll;
        setCurrentIndex(indexToScroll < 0 ? 0 : indexToScroll);
      }
    }, "\u2190") : React__default.createElement("div", null), displayNextButton ? React__default.createElement("button", {
      className: "showreel-nav-button",
      disabled: lockButtons,
      onClick: function onClick() {
        if (slidePage) {
          var childrenCount = listContainer.current.children.length;

          var _listContainer$curren3 = listContainer.current.getBoundingClientRect(),
              containerWidth = _listContainer$curren3.width;

          var index = currentIndex;
          var width = 0;

          while (width < containerWidth) {
            var nextChild = listContainer.current.children[index];

            var _nextChild$getBoundin = nextChild.getBoundingClientRect(),
                nextChildWidth = _nextChild$getBoundin.width;

            width = width + nextChildWidth;

            if (width > containerWidth) {
              break;
            }

            index = index + 1;
          }

          setCurrentIndex(index);
          return;
        }

        var indexToScroll = currentIndex + slidesToScroll;
        setCurrentIndex(indexToScroll > listContainer.current.children.length - 1 ? currentIndex + 1 : indexToScroll);
      }
    }, "\u2192") : React__default.createElement("div", null)), React__default.createElement(ListContainer, {
      ref: listContainer,
      translateX: translateX,
      transitionSpeed: transitionSpeed,
      handleTransitionEnd: function handleTransitionEnd() {
        setDisplayNextButton(getIsLastItemVisible());
        setLockButtons(false);

        if (transitionSpeed < 1) {
          setTransitionSpeed(speed);
          return;
        }

        if (infinite) {
          var childCount = listContainer.current.children.length / 3;

          if (currentIndex < childCount) {
            setTransitionSpeed(0.5);
            setCurrentIndex(currentIndex + childCount);
          }

          if (currentIndex > childCount * 2) {
            setTransitionSpeed(0.5);
            setCurrentIndex(currentIndex - childCount);
          }
        }
      }
    }, infinite ? [].concat(_toConsumableArray(children), _toConsumableArray(children), _toConsumableArray(children)) : children));
  };

  return Showreel;

})));
