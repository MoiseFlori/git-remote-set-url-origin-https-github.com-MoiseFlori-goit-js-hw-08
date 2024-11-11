import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');

let timerId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.warning("Please choose a date in the future.");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % day) % hour / minute);
  const seconds = Math.floor(((ms % day) % hour) % minute / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const currentTime = new Date();
  const remainingTime = selectedDate - currentTime;

  if (remainingTime <= 0) {
    clearInterval(timerId);
    document.querySelectorAll('.timer .value').forEach(element => element.textContent = '00');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remainingTime);

 updateTimeDisplay({ days, hours, minutes, seconds });
}

function updateTimeDisplay({ days, hours, minutes, seconds }) {
  
  const timeElements = document.querySelectorAll('.timer .value');


  const timeValues = { days, hours, minutes, seconds };


  timeElements.forEach((element) => {
    const type = element.dataset.type; 
    element.textContent = addLeadingZero(timeValues[type]); 
  });
}

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  startButton.disabled = true;
}
startButton.addEventListener('click', startTimer);