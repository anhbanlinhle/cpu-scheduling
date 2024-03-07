let sjf = (processes) => {
  processes.sort((a, b) => a.arrive - b.arrive);

  for (let i = 0; i < processes.length; i++) {
    processes[i].processed = false;
  }

  const ganttChart = [];
  let currentTime = 0;
  let processedCount = 0;

  // handle each process
  while (processedCount < processes.length) {
    // find process with min burst time
    let shortestProcessIndex = 0;
    let shortestBurstTime = Infinity;
    // ensure that the process has arrived
    for (let i = 0; i < processes.length; i++) {
      if (processes[i].arrive <= currentTime 
        && processes[i].burst < shortestBurstTime
        && !processes[i].processed) {
        shortestProcessIndex = i;
        shortestBurstTime = processes[i].burst;
      }
    }

    // if no process has arrived, wait
    if (shortestBurstTime === Infinity) {
      ganttChart.push(...Array(processes[processedCount].arrive - currentTime).fill('-'));
      currentTime = processes[processedCount].arrive;
      continue;
    }

    // execute the process
    const { name, burst } = processes[shortestProcessIndex];
    ganttChart.push(...Array(burst).fill(name));
    currentTime += burst;

    const waitTime = Math.max(0, currentTime - processes[shortestProcessIndex].arrive - burst);
    const turnaroundTime = waitTime + burst;

    processes[shortestProcessIndex].responseTime = waitTime;
    processes[shortestProcessIndex].waitTime = waitTime;
    processes[shortestProcessIndex].turnaroundTime = turnaroundTime;
    processes[shortestProcessIndex].completionTime = currentTime;

    // remove finished process
    processes[shortestProcessIndex].processed = true;
    processedCount++;
  }

  // sjf: response time = wait time
  const totalWaitTime = processes.reduce((sum, process) => sum + process.waitTime, 0);
  const averageWaitTime = totalWaitTime / processes.length;
  const averageResponseTime = averageWaitTime;

  const totalTurnaroundTime = processes.reduce((sum, process) => sum + process.turnaroundTime, 0);
  const averageTurnaroundTime = totalTurnaroundTime / processes.length;

  return {
    processes,
    ganttChart,
    averageResponseTime,
    averageTurnaroundTime,
    averageWaitTime,
  };
}

export { sjf };