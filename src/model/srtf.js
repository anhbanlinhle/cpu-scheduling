let srtf = (processes) => {
  processes.sort((a, b) => a.arrive - b.arrive);
  for (let i = 0; i < processes.length; i++) {
    processes[i].remainingTime = processes[i].burst
  }

  let ganttChart = [];
  let currentTime = 0;
  let results = []

  while (processes.length > 0) {
    // get shortest burst time process arrived
    let shortestBurstTime = Infinity;
    let shortestProcessIndex = null;
    for (let i = 0; i < processes.length; i++) {
      if (processes[i].arrive <= currentTime) {
        if (processes[i].remainingTime + 1 < shortestBurstTime) {
          shortestBurstTime = processes[i].remainingTime;
          shortestProcessIndex = i;
        }
      }
    }

    // if no process ready, wait until next arrival
    if (shortestProcessIndex === null) {
      let nextArrival = processes.reduce((min, process) => Math.min(min, process.arrive), Infinity);
      let waitingTime = nextArrival - currentTime;
      ganttChart.push(...Array(waitingTime).fill(' '));
      currentTime = nextArrival;
      continue;
    }
    // else execute shortest process
    else {
      // if first time running, record response time
      if (processes[shortestProcessIndex].remainingTime === processes[shortestProcessIndex].burst) {
        processes[shortestProcessIndex].responseTime = currentTime - processes[shortestProcessIndex].arrive;
      }
      // update remaining time and run process
      processes[shortestProcessIndex].remainingTime -= 1;
      ganttChart.push(processes[shortestProcessIndex].name);
      currentTime++;
    }

    // check if current process has finished execution
    if (processes[shortestProcessIndex].remainingTime === 0) {
      // calculate turnaround time and remove the completed process
      let turnaroundTime = currentTime - processes[shortestProcessIndex].arrive;
      processes[shortestProcessIndex].turnaroundTime = turnaroundTime;
      processes[shortestProcessIndex].waitTime = turnaroundTime - processes[shortestProcessIndex].burst;
      processes[shortestProcessIndex].completionTime = currentTime;

      results.push(processes[shortestProcessIndex]);
      processes.splice(shortestProcessIndex, 1);
    }
  }

  // calculate average response time, average turnaround time, and average wait time
  const totalResponseTime = results.reduce((sum, process) => sum + process.responseTime, 0);
  const totalTurnaroundTime = results.reduce((sum, process) => sum + process.turnaroundTime, 0);
  const totalWaitTime = results.reduce((sum, process) => sum + process.waitTime, 0);
  const averageResponseTime = totalResponseTime / results.length;
  const averageTurnaroundTime = totalTurnaroundTime / results.length;
  const averageWaitTime = totalWaitTime / results.length;

  return {
    processes: results,
    ganttChart: ganttChart,
    averageResponseTime,
    averageTurnaroundTime,
    averageWaitTime,
  };
}

export { srtf };