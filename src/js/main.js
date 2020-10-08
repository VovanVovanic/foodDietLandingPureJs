window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    parent = document.querySelector(".tabheader__items"),
    tabContainers = document.querySelectorAll(".tabcontent"),
    timer = document.querySelector(".timer"),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    close = document.querySelector("[data-close]"),
    modalBtn = document.querySelectorAll("[data-modal"),
    modal = document.querySelector(".modal");

  ////tabs
  const tabsHandler = () => {
    const hideContent = (content, cls) => {
      content.forEach((el) => {
        el.classList.add("tabcontent_disabled");
        el.classList.remove("fade");
      });
      cls.forEach((el) => {
        el.classList.remove("tabheader__item_active");
      });
    };
    const showContent = (content, cls, i = 0) => {
      content[i].classList.remove("tabcontent_disabled");
      content[i].classList.add("tabcontent_active", "fade");
      cls[i].classList.add("tabheader__item_active");
    };

    const toggleTabs = (wrapper, tabs) => {
      wrapper.addEventListener("click", (e) => {
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
  };

  //// timer
  const setTimer = () => {
    const deadline = "2021-08-08";
    const getTimeRemaining = (endTimer) => {
      let time = Date.parse(endTimer) - Date.parse(new Date()),
        days = Math.floor(time / 1000 / 60 / 60 / 24),
        hours = Math.floor((time / 1000 / 60 / 60) % 24),
        minutes = Math.floor((time / 100 / 60) % 60),
        seconds = Math.floor((time / 1000) % 60);

      return {
        time,
        days,
        hours,
        minutes,
        hours,
        seconds,
      };
    };
    const setNewTime = (endTime) => {
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
  };

  ///modals
  const modalsHandler = (modalBtn, modal, close) => {
    let timeout = setTimeout(onOpen, 3000);
    function onOpen() {
      modal.classList.toggle("show");
      clearTimeout(timeout);
      document.body.style.overflow = "hidden";
    }
    function onClose() {
      modal.classList.toggle("show");
      document.body.style.overflow = "auto";
    }

    modalBtn.forEach((el) => {
      el.addEventListener("click", () => {
        onOpen();
      });
    });

    modal.addEventListener("click", (e) => {
      let target = e.target;
      if ((target = close || target.classList.contains("show"))) {
        onClose();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modal.classList.contains("show")) {
        onClose();
      }
    });

    function onBottomScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        onOpen();
        window.removeEventListener("scroll", onBottomScroll);
      }
    }
    window.addEventListener("scroll", onBottomScroll);
  };

  ///render menu
  class RenderMenu {
    constructor(src, alt, title, descr, price, parentNode, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentNode);
      this.classes = classes;
      this.currencyTransfer = 0.87;
      this.priceToEU();
    }

    priceToEU() {
      this.price = this.price * this.currencyTransfer;
    }
    render() {
      const elem = document.createElement("div");
      if (!this.classes.length) {
        const initClass = "menu__item";
        elem.classList.add(initClass);
      } else {
        this.classes.forEach((cls) => elem.classList.add(cls));
      }
      elem.innerHTML = `
                    <img src=${this.src}alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price.toFixed(2)}</span> EU/день</div>
                    </div>
                      `;
      this.parent.append(elem)
    }
  }
  new RenderMenu(
    "img/tabs/vegy.jpg ",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    10,
    '.menu .container'
  ).render();

    new RenderMenu(
      "img/tabs/elite.jpg ",
      "elite",
      "Меню “Премиум”",
      "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
      14,
      ".menu .container"
  ).render();
  
      new RenderMenu(
        "img/tabs/post.jpg ",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        7,
        ".menu .container"
      ).render();


  tabsHandler();
  setTimer();
  modalsHandler(modalBtn, modal, close);
});
