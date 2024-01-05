let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
    timer = setInterval(updateTime, 10);
    document.getElementById('startStop').textContent = 'Stop';
  } else {
    clearInterval(timer);
    document.getElementById('startStop').textContent = 'Start';
  }
  isRunning = !isRunning;
}

function updateTime() {
  const currentTime = Date.now();
  const elapsedTime = new Date(currentTime - startTime);
  const formattedTime = elapsedTime.toISOString().substr(11, 8);
  document.getElementById('time').textContent = formattedTime;
}

function lap() {
  if (isRunning) {
    const currentTime = Date.now();
    const lapTime = new Date(currentTime - startTime);
    const formattedLapTime = lapTime.toISOString().substr(11, 8);
    laps.push(lapTime);
    const lapsList = document.getElementById('laps');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formattedLapTime}`;
    lapsList.appendChild(lapItem);
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById('time').textContent = '00:00:00';
  document.getElementById('startStop').textContent = 'Start';
  isRunning = false;
  startTime = null;
  laps = [];
  document.getElementById('laps').innerHTML = '';
}
