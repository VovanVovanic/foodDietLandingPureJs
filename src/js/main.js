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
    modalBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    forms = document.querySelectorAll('form');

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

let timeout = setTimeout(onOpen, 3000);
function onOpen() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  clearTimeout(timeout);
  document.body.style.overflow = "hidden";
}
function onClose() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}
  const modalsHandler = (modalBtn, modal, close) => {

    modalBtn.forEach((el) => {
      el.addEventListener("click", () => {
        onOpen();
      });
    });

    modal.addEventListener("click", (e) => {
      let target = e.target;
      if ((target === close || target === modal)) {
        onClose()
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
                    <img src=${this.src} alt=${this.alt}>
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

  const onMenuBuild = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Couldnt fetch to ${res.url}`)
    }

    return await res.json()
  }
  onMenuBuild("https://foodlanding-ebb10.firebaseio.com/db/menu.json")
  .then((data) => {
    data.forEach(({ altimg, descr, img, price, title }) => {
      console.log(img)
        new RenderMenu(
          img,
          altimg,
          title,
          descr,
          price,
          ".menu .container"
        ).render();
    })
  })

  ////forms
  const formHandler = (myForms) => {
    const message = {
      loading: 'img/spinner.svg',
      success: function(name) {
        return `Thank for your order, ${name}. We ll call your back as soon as possible`
      },
      error: 'An error appeared'
    }
    const postForm = async (url, formData) =>{
      const res = await fetch(
        url,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: formData
        }
      );
      return await res.json()
    }
    myForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        let spinner = document.createElement('img');
        spinner.src = message.loading;
        spinner.style.cssText = `
        margin: 0 auto;
        display: block
        `
        form.insertAdjacentElement('afterend', spinner)
        const formData = new FormData(form)
        const formObj = {}
        formData.forEach((key, val) => {
          formObj[val]=key
        })
          postForm("https://foodlanding-ebb10.firebaseio.com/db/requests.json", JSON.stringify(formObj))
            .then((data) => {
              spinner.remove();
              onMessageHandler(message.success(formObj.name));
              form.reset();
            })
            .catch((e) => {
              onMessageHandler(message.error);
            });
        
      })
    })
    function onMessageHandler(msg) {
      const prevModal = document.querySelector('.modal__dialog')
      prevModal.classList.add('hide')
      onOpen()
      const textMsg = document.createElement('div')
      textMsg.classList.add('modal__dialog')
      textMsg.innerHTML = `
            <div class="modal__content">
                <div class="modal__title">${msg}</div>
            </div>
      `
      document.querySelector('.modal').append(textMsg)
      setTimeout(() => {
        prevModal.classList.remove('hide')
        textMsg.remove()
        onClose()
      }, 3000)
      
  }
  }


  tabsHandler();
  setTimer();
  modalsHandler(modalBtn, modal, close);
  formHandler(forms)
});

