/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
        parent = document.querySelector(".tabheader__items"),
        tabContainers = document.querySelectorAll(".tabcontent"),
        timer = document.querySelector('.timer'),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'); ////tabs

  const tabsHandler = () => {
    const hideContent = (content, cls) => {
      content.forEach(el => {
        el.classList.add("tabcontent_disabled");
        el.classList.remove("fade");
      });
      cls.forEach(el => {
        el.classList.remove("tabheader__item_active");
      });
    };

    const showContent = (content, cls, i = 0) => {
      content[i].classList.remove("tabcontent_disabled");
      content[i].classList.add("tabcontent_active", "fade");
      cls[i].classList.add("tabheader__item_active");
    };

    const toggleTabs = (wrapper, tabs) => {
      wrapper.addEventListener("click", e => {
        let target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
          tabs.forEach((el, i) => {
            if (target === el) {
              hideContent(tabContainers, tabs);
              showContent(tabContainers, tabs, i);
            }
          });
        }
      });
    };

    hideContent(tabContainers, tabs);
    showContent(tabContainers, tabs);
    toggleTabs(parent, tabs);
  }; //// timer


  const setTimer = () => {
    const deadline = '2021-08-08';

    const getTimeRemaining = endTimer => {
      let time = Date.parse(endTimer) - Date.parse(new Date()),
          days = Math.floor(time / 1000 / 60 / 60 / 24),
          hours = Math.floor(time / 1000 / 60 / 60 % 24),
          minutes = Math.floor(time / 100 / 60 % 60),
          seconds = Math.floor(time / 1000 % 60);
      return {
        time,
        days,
        hours,
        minutes,
        hours,
        seconds
      };
    };

    const setNewTime = endTime => {
      let timerInterval = setInterval(updateClock, 1000);
      updateClock();

      function getNull(el) {
        if (el >= 0 && el < 10) {
          return `0${el}`;
        } else return el;
      }

      function updateClock() {
        const t = getTimeRemaining(endTime);
        days.innerHTML = getNull(t.days);
        hours.innerHTML = getNull(t.hours);
        minutes.innerHTML = getNull(t.minutes);
        seconds.innerHTML = getNull(t.seconds);
      }
    };

    setNewTime(deadline);
  }; ///


  tabsHandler();
  setTimer();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map