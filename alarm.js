let val1 = document.getElementById("val1");
let val2 = document.getElementById("val2");

let submitBtn = document.getElementById("submitBtn");
let form = document.forms["myForm"];
let displayArea = document.querySelector(".disp-area");
let alarmArea = document.querySelector(".alarm-area");
let alarmOn = document.querySelector(".alarmOn");
let remainingTime = document.getElementById("timeLeft");
let alarmTime = document.getElementById("Alarm-time");
let backBtn = document.getElementById("back");
let ringtone = document.getElementById("ringtone");
let ringBell = document.querySelector(".ring");
let offBtn = document.querySelector(".offBtn");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let int = setInterval(() => {
    alarmSetter();
  }, 1000);

  offBtn.addEventListener("click", () => {
    ringtone.pause();
    clearInterval(int);
    showDisplay("success", "Alarm off");
    alarmOn.classList.remove("showAlarm");
    ringBell.classList.remove("ringing");
  });
  backBtn.addEventListener("click", () => {
    clearInterval(int);
    ringBell.classList.remove("ringing");
  });
});

const showDisplay = (className, message) => {
  displayArea.classList.add(className);
  displayArea.innerHTML = message;

  setTimeout(() => {
    displayArea.classList.remove(className);
    displayArea.innerHTML = message;
  }, 1000);
};

const inputChecker = () => {
  val1.addEventListener("keyup", () => {
    let val1Mut = parseInt(val1.value);

    if (val1Mut > 24) {
      showDisplay("error", "Hr value exceeds 24");
      return false;
    }

    if (val1Mut <= 24) {
      return true;
    }
  });

  val2.addEventListener("keyup", () => {
    let val2Mut = parseInt(val2.value);

    if (val2Mut > 59) {
      showDisplay("error", "Min value exceeds 59");
      return false;
    }

    if (val2Mut <= 59) {
      return true;
    }
  });
};
form.addEventListener("keyup", inputChecker);

submitBtn.addEventListener("click", () => {
  let value1 = parseInt(val1.value);
  let value2 = parseInt(val2.value);

  let curTime = Date.now();
  let oneDay = 24 * 60 * 60 * 1000;
  let oneHour = 60 * 60 * 1000;
  let oneMinute = 60 * 1000;
  let oneSecond = 1 * 1000;

  let cur_Day = Math.floor(curTime / oneDay);
  let cur_Hr = Math.floor((curTime % oneDay) / oneHour);
  cur_Hr += 3;
  let cur_Min = Math.floor((curTime % oneHour) / oneMinute);
  let cur_Sec = Math.floor((curTime % oneMinute) / oneSecond);

  let futDate = new Date();
  futDate.setHours(value1, value2);

  let futTime = futDate.getTime();

  let fut_day = Math.floor(futTime / oneDay);
  let fut_hr = Math.floor((futTime % oneDay) / oneHour);
  fut_hr += 3;
  let fut_min = Math.floor((futTime % oneHour) / oneMinute);
  let fut_sec = Math.floor((futTime % oneMinute) / oneSecond);

  let FutureTime = fut_min - cur_Min;

  if (
    value1 !== "" &&
    value2 !== "" &&
    value1 <= 24 &&
    value2 <= 59 &&
    FutureTime >= 0
  ) {
    showDisplay("success", "Alarm set");
    alarmOn.classList.add("showAlarm");
    backBtn.addEventListener("click", () => {
      alarmOn.classList.remove("showAlarm");
      if (ringtone.play()) {
        ringtone.pause();
      }
    });
  } else if (FutureTime < 0) {
    showDisplay("error", "Set a future time");
  } else {
    showDisplay("error", "Check required format");
  }
});

const alarmSetter = () => {
  let value1 = parseInt(val1.value);
  let value2 = parseInt(val2.value);

  let curTime = Date.now();

  if (value1 !== "" && value2 !== "" && value1 <= 24 && value2 <= 59) {
    let oneDay = 24 * 60 * 60 * 1000;
    let oneHour = 60 * 60 * 1000;
    let oneMinute = 60 * 1000;
    let oneSecond = 1 * 1000;

    let cur_Day = Math.floor(curTime / oneDay);
    let cur_Hr = Math.floor((curTime % oneDay) / oneHour);
    cur_Hr += 3;
    let cur_Min = Math.floor((curTime % oneHour) / oneMinute);
    let cur_Sec = Math.floor((curTime % oneMinute) / oneSecond);

    let futDate = new Date();
    futDate.setHours(value1, value2);

    let futTime = futDate.getTime();

    let fut_day = Math.floor(futTime / oneDay);
    let fut_hr = Math.floor((futTime % oneDay) / oneHour);
    fut_hr += 3;
    let fut_min = Math.floor((futTime % oneHour) / oneMinute);
    let fut_sec = Math.floor((futTime % oneMinute) / oneSecond);

    alarmTime.innerHTML = `${fut_hr}${fut_min} Hrs`;
    if (value1 <= 9 && value1.toString().length < 2) {
      alarmTime.innerHTML = `0${fut_hr}${fut_min} Hrs`;
    }
    if (value2.toString().length < 2 && value2 <= 9) {
      alarmTime.innerHTML = `${fut_hr}0${fut_min} Hrs`;
    }
    if (
      value2.toString().length < 2 &&
      value2 <= 9 &&
      value1 <= 9 &&
      value1.toString().length < 2
    ) {
      alarmTime.innerHTML = `0${fut_hr}0${fut_min} Hrs`;
    }

    remainingTime.innerHTML = `${fut_min - cur_Min} min (s)`;
    if (futTime - curTime < 0) {
      remainingTime.innerHTML = `Alarm missed by ${cur_Min - fut_min} min (s)`;
    }

    if (futTime - curTime === 0) {
      remainingTime.innerHTML = "Its Time";
      ringtone.play();
      ringBell.classList.add("ringing");
    }
    if (futTime - curTime < 0) {
      ringtone.pause();
      ringBell.classList.remove("ringing");
    }
  }
};
