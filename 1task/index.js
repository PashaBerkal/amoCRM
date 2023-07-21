const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timer = document.querySelector('.timer');

const createTimerAnimator = () => {
  return (seconds) => {

    function getTimeRemaining(endtime) {
      if (endtime <= 0) {
        return {
          'total': 0,
          'hours': 0,
          'minutes': 0,
          'seconds': 0
        };
      };
      const hours = Math.floor(endtime / 60 / 60),
        minutes = Math.floor(endtime / 60) % 60,
        seconds = endtime % 60;
      return {
        'total': endtime,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function getZero(num) {
      if (num < 10) {
        return `0${num}`
      } else {
        return num
      };
    }

    function setClock(endtime) {
      const hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock() {
        const time = getTimeRemaining(endtime--);
        hours.innerHTML = getZero(time.hours);
        minutes.innerHTML = getZero(time.minutes);
        seconds.innerHTML = getZero(time.seconds);
        if (time.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }
    setClock(seconds);

  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  const coppyInputEl = e.target.value;
  if(!!Number(coppyInputEl)){
    console.log(coppyInputEl);
    inputEl.value = coppyInputEl;
  } else {
    inputEl.value = coppyInputEl.slice(0, -1)
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);

  inputEl.value = '';
});