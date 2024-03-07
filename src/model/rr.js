function rr(processes, timeQuantum) {
  let results = [...processes].sort((a, b) => a.arrive - b.arrive);
  for (let i = 0; i < results.length; i++) {
    results[i].remainingTime = results[i].burst
  }

  let ganttChart = [];
  let currentTime = 0;
  let queue = [];

  while (results.length > 0 || queue.length > 0) {
    // add arrived processes to queue
    while (results.length > 0 && results[0].arrive <= currentTime) {
      queue.push(results.shift());
    }

    // if no process ready, wait 
    if (queue.length === 0) {
      let nextArrival = results.reduce((min, process) => Math.min(min, process.arrive), Infinity);
      let waitingTime = nextArrival - currentTime;
      ganttChart.push(...Array(waitingTime).fill(' '));
      currentTime = nextArrival;
      continue;
    }

    // get next process from queue
    let currentProcess = queue.shift();
    if (currentProcess.responseTime === undefined) {
      currentProcess.responseTime = currentTime - currentProcess.arrive;
    }

    // execute process for qtime / remaining burst time
    let executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
    ganttChart.push(...Array(executionTime).fill(currentProcess.name));
    currentTime += executionTime;

    // add processes that arrived while the current process was running
    while (results.length > 0 && results[0].arrive <= currentTime) {
      queue.push(results.shift());
    }

    // update remaining burst time
    currentProcess.remainingTime -= executionTime;

    // if not finished, add back to queue
    if (currentProcess.remainingTime > 0) {
      queue.push(currentProcess);
    } else {
      let turnaroundTime = currentTime - currentProcess.arrive;
      let waitTime = turnaroundTime - currentProcess.burst;
      currentProcess.turnaroundTime = turnaroundTime;
      currentProcess.waitTime = waitTime;
      currentProcess.completionTime = currentTime;
    }
  }

  const totalWaitTime = processes.reduce((sum, process) => sum + process.waitTime, 0);
  const averageWaitTime = totalWaitTime / processes.length;
  const averageTurnaroundTime = processes.reduce((sum, process) => sum + process.turnaroundTime, 0) / processes.length;
  const averageResponseTime = processes.reduce((sum, process) => sum + process.responseTime, 0) / processes.length;

  return {
    processes,
    ganttChart,
    averageResponseTime,
    averageTurnaroundTime,
    averageWaitTime,
  };
}

export { rr };