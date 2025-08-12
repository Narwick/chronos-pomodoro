let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) {
    return;
  }
  isRunning = true;
  const { activeTask, secondsRemaining } = event.data;
  
  const endDate = activeTask.startDate + secondsRemaining * 1000;
  
  const now = Date.now();

  let remainingTime = Math.ceil((endDate - now) / 1000);

  function tick() {
    self.postMessage(remainingTime);

    const now = Date.now();
    remainingTime = Math.floor((endDate - now) / 1000);

    setTimeout(tick, 1000);
  }

  tick();
};
