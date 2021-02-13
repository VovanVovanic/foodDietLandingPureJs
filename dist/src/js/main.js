

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    parent = document.querySelector(".tabheader__items"),
    tabsContent = document.querySelectorAll(".tabcontent");

  const hideContent = (content, cls) => {
    content.forEach((el) => {
      el.classList.add("tabcontent_disabled");
      el.classList.remove("fade");
    });
    cls.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  };
  const showContent = (content, cls, item = 0) => {
    content[item].classList.remove("tabcontent_disabled");
    content[item].classList.add("tabcontent_active", "fade");
    cls[item].classList.add("tabheader__item_active");
  };

  const getTab = (tabContainer, tabsItms) => {
    tabContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.classList.contains("tabheader__item")) {
        tabsItms.forEach((el, i) => {
          if (target === el) {
            hideContent(tabsContent, tabs);
            showContent(tabsContent, tabs, i);
          }
        });
      }
    });
  };

  hideContent(tabsContent, tabs);
  showContent(tabsContent, tabs);
  getTab(parent, tabs);

  //////// timer

  const deadline = "2022-05-12";

  const getTimeRemaining = (endTime) => {
    const time = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(time / (1000 * 60 * 60 * 24)),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((time / 1000 / 60) % 60),
      seconds = Math.floor((time / 1000) % 60);
    return {
      total: time,
      days,
      hours,
      minutes,
      seconds,
    };
  };
  const setTime = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerInterval = setInterval(updateClock, 1000);

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

  const modalBtn = document.querySelectorAll("[data-modal]");
  const closeBtn = document.querySelector("[data-close]");
  const modal = document.querySelector(".modal");

  function onOpen() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearTimeout(timeout);
  }

  function onClose() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "auto";
  }


  const onModalHandler = (trigger, close, modal) => {
    // let timeout = setTimeout(onOpen, 3000);
    trigger.forEach((el) => {
      el.addEventListener("click", () => {
        onOpen();
      });
    });

    modal.addEventListener("click", (e) => {
      let target = e.target;
      if (target === close || target === modal) {
        onClose();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modal.classList.contains("modal")) {
        onClose();
      }
    });

    function onScrollHandler() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        onOpen();
        window.removeEventListener("scroll", onScrollHandler);
      }
    }
    window.addEventListener("scroll", onScrollHandler);
  };

  class MenuCard {
    constructor(src, alt, title, descr, price, parentNode, ...classes) {
      (this.src = src),
        (this.alt = alt),
        (this.title = title),
        (this.descr = descr),
        (this.price = price),
        (this.parent = document.querySelector(parentNode)),
        this.classes = classes,
        (this.transfer = 0.85),
        this.changeToEU();
    }
    changeToEU() {
      this.price = this.price * this.transfer;
    }
    render() {
      const elem = document.createElement("div");
      if (!this.classes.length) {
        const defult = 'menu__item'
        elem.classList.add(defult)
      }
      else {
        this.classes.forEach((newClass) =>
          elem.classList.add(newClass, defult)
        );
      }
      elem.innerHTML = `
                    
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price.toFixed(2)}</span> EU/daily</div>
                    </div>
               
      `;
      this.parent.append(elem);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Menu "Fitness"',
    'Menu "Fitness" -Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ducimus ut adipisci nam tempora eaque, laboriosam atque repellendus iusto! Eum ut incidunt laboriosam dolores nemo, necessitatibus commodi magnam hic voluptatum.',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Menu “Premium”",
    " Menu “Premium”Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ducimus ut adipisci nam tempora eaque, laboriosam atque repellendus iusto! Eum ut incidunt laboriosam dolores nemo, necessitatibus commodi magnam hic voluptatum.",
    12,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Menu "Low kcal"',
    "Menu “Low kcal” -Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ducimus ut adipisci nam tempora eaque, laboriosam atque repellendus iusto! Eum ut incidunt laboriosam dolores nemo, necessitatibus commodi magnam hic voluptatum.",
    7,
    ".menu .container"
  ).render();

  //// forms
  
  const messages = {
    spinner: "img/spinner.svg",
    success: "Thank you. We ll call your back as soon as possible",
    error: "An error appeared",
  };


  const forms = document.querySelectorAll('form').forEach((el) => {
    bindPostForm(el)
  })
  
  const postForm = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    console.log(res)
    return await res.json()
  }
  function bindPostForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      let statusMessage = document.createElement("img");
      statusMessage.src = messages.spinner;
      statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
`;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form)
      const objForm = {}
      formData.forEach((key, value) => {
        objForm[key] = value
      })
      postForm(
        "https://foodlanding-ebb10.firebaseio.com/db/requests.json",
        JSON.stringify(objForm)
      )
        .then((data) => {
          console.log(data);
          statusMessage.remove();
          showMessage(messages.success);
          if (!data.ok) {
            showMessage(messages.error);
          }
          form.reset();
        })
        .catch(() => {
          console.log(messages.error);
        });
    })

  
  
    function showMessage(msg) {
      const prevModal = document.querySelector('.modal__dialog')
      prevModal.classList.add("hide");
      onOpen()
      const thanksModal = document.createElement('div')
      thanksModal.classList.add("modal__dialog")
      thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__title">${msg}</div>
            </div>
      `;
      document.querySelector(".modal").append(thanksModal)
      setTimeout(() => {
        prevModal.classList.remove("hide");
        prevModal.classList.add('show')
        thanksModal.remove()
        onClose()
      }, 2000)
      
      
    }
  }
  /// slider
  const sliders = document.querySelectorAll('.offer__slide'),
    sliderContainer = document.querySelector('.offer__slider-inner'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1,
    offset = 0;
  current.textContent = slideIndex
  
  sliderContainer.style.width = 100 * sliders.length + '%'
  sliders.forEach((el) => {
    el.style.width = width
  })
  if (sliders.length < 10) {
    total.textContent = `0${sliders.length}`
  }
  else {
    total.textContent = sliders.length
  }

  const dotsArr = []
  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide', i + 1)
    if (i === 0) {
      dot.classList.add('dot_active')
    }
    dotsArr.push(dot)
    document.querySelector(".carousel-indicators").append(dot);
  }
  next.addEventListener('click', () => {
    if (offset == parseInt(width) * (sliders.length - 1)) {
      offset = 0
    }
    else {
      offset += parseInt(width)
    }
    if (slideIndex == sliders.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`
    }
    else {
      current.textContent = slideIndex
    }
    sliderContainer.style.transform = `translateX(-${offset}px)`
    dotsArr.forEach((el) => {
      el.classList.remove('dot_active')
      dotsArr[slideIndex - 1].classList.add('dot_active')
    })
  })


  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = parseInt(width) * (sliders.length - 1);
      
    }
    else {
      offset -= parseInt(width);
    }
   
    if (slideIndex == 1) {
      slideIndex = sliders.length;
    } else {
      slideIndex--;
    }
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    sliderContainer.style.transform = `translateX(-${offset}px)`;
    dotsArr.forEach((el) => {
      el.classList.remove("dot_active");
      dotsArr[slideIndex - 1].classList.add("dot_active");
    });
  })
  dotsArr.forEach((item) => {
    item.addEventListener('click', (e) => {
      const target = e.target.getAttribute('data-slide')
      dotsArr.forEach((el) => {
        el.classList.remove("dot_active");
        dotsArr[target - 1].classList.add("dot_active");
      });
      
      offset = parseInt(width) * (target - 1);
      sliderContainer.style.transform = `translateX(-${offset}px)`;
      if (target < 10) {
        current.textContent = `0${target}`;
      } else {
        current.textContent = target;
      }

    })
  })
  /// calculator
  const res = document.querySelector(".calculating__result span");
  let gender, height, weight, age, ratio
  if (localStorage.getItem('gender') && localStorage.getItem('ratio')) {
    gender = localStorage.getItem("gender");
    ratio = localStorage.getItem("ratio");
  }
  else {
    gender = 'female'
    ratio = 1.375
    localStorage.setItem('ratio', 1.375)
    localStorage.setItem('gender', 'female')
  }
  const initActiveClass = (selector, activeClass) => {
    const element = document.querySelectorAll(`${selector} div`)
    element.forEach((el) => {
      el.classList.remove(activeClass)
      if (el.getAttribute('id') === localStorage.getItem('gender')) {
        el.classList.add((activeClass))
      }
      if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        el.classList.add(activeClass)
      }
    })
  }
  initActiveClass("#gender", "calculating__choose-item_active");
  initActiveClass(".calculating__choose_big", "calculating__choose-item_active");

  const calcTotal = () => {
      if (!gender || !height || !weight || !age || !ratio) {
        res.textContent = "____";
        return;
      }
      if (gender === "female") {
        res.textContent =
          Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
      } else {
        res.textContent =
          Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
      }
  }
  
  const getStaticDates = (parent, active) => {
    const elements = document.querySelectorAll(`${parent} div`)

    document.querySelector(parent).addEventListener('click', (e) => {
      let target = e.target
      if (target.getAttribute('data-ratio')) {
        ratio = +target.getAttribute('data-ratio')
        localStorage.setItem("ratio", +target.getAttribute("data-ratio"));
      } else {
        gender = target.getAttribute('id')
        localStorage.setItem("gender", target.getAttribute("id"));
      }
      if (target.getAttribute('data-ratio') || target.getAttribute('id')!=='gender') {
        elements.forEach((el) => {
          el.classList.remove(active)
        })
        target.classList.add(active)
      }
      calcTotal();
    })
    
  }

  const getDynamicDates = (selector) => {
    const input = document.querySelector(selector)
    input.addEventListener('input', (e) => {
      let target = e.target.getAttribute('id')
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red'
      
      }
      else {
        input.style.border = 'none'
      }
      switch (target) {
        case 'age': {
          age = parseInt(e.target.value)
        }
          break
        case 'height': {
          height = parseInt(e.target.value)
        }
          break
        case 'weight': {
          weight = parseInt(e.target.value)
        }
      }
      console.log(weight, age, ratio, height, gender)
      calcTotal()
    })
  }

  calcTotal()
  getStaticDates("#gender", "calculating__choose-item_active");
  getStaticDates(".calculating__choose_big", "calculating__choose-item_active");
  getDynamicDates('#age')
  getDynamicDates('#height')
  getDynamicDates('#weight')

  onModalHandler(modalBtn, closeBtn, modal);
  setTime(".timer", deadline);
});
