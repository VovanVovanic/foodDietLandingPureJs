window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
        parent = document.querySelector(".tabheader__items"),
        tabContainers = document.querySelectorAll(".tabcontent"),
        timer = document.querySelector('.timer'),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds');

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
        const deadline = '2021-08-08'
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
                seconds
            }
        }
  const setNewTime = (endTime) => {
    let  timerInterval = setInterval(updateClock, 1000);
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

    }
    
///
    tabsHandler();
    setTimer()
});
