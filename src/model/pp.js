let pp = (processes, order) => {
  processes.sort((a, b) => a.arrive - b.arrive);
  for (let i = 0; i < processes.length; i++) {
    processes[i].remainingTime = processes[i].burst
  }

  let ganttChart = [];
  let currentTime = 0;
  let results = []

  while (processes.length > 0) {
    let highestPriority = null;
    let highestPriorityIndex = null;

    if (order === 'highest') {
      highestPriority = -Infinity;
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].arrive <= currentTime) {
          if (processes[i].priority > highestPriority) {
            highestPriority = processes[i].priority;
            highestPriorityIndex = i;
          }
        }
      }
    }
    else if (order === 'lowest') {
      highestPriority = Infinity;
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].arrive <= currentTime) {
          if (processes[i].priority < highestPriority) {
            highestPriority = processes[i].priority;
            highestPriorityIndex = i;
          }
        }
      }
    }
    

    // if no process ready, wait until next arrival
    if (highestPriorityIndex === null) {
      let nextArrival = processes.reduce((min, process) => Math.min(min, process.arrive), Infinity);
      let waitingTime = nextArrival - currentTime;
      ganttChart.push(...Array(waitingTime).fill(' '));
      currentTime = nextArrival;
      continue;
    }
    // else execute highest priority process
    else {
      // if first time running, record response time
      if (processes[highestPriorityIndex].remainingTime === processes[highestPriorityIndex].burst) {
        processes[highestPriorityIndex].responseTime = currentTime - processes[highestPriorityIndex].arrive;
      }
      // update remaining time and run process
      processes[highestPriorityIndex].remainingTime -= 1;
      ganttChart.push(processes[highestPriorityIndex].name);
      currentTime++;
    }

    // check if current process has finished execution
    if (processes[highestPriorityIndex].remainingTime === 0) {
      // calculate turnaround time and remove the completed process
      let turnaroundTime = currentTime - processes[highestPriorityIndex].arrive;
      processes[highestPriorityIndex].turnaroundTime = turnaroundTime;
      processes[highestPriorityIndex].waitTime = turnaroundTime - processes[highestPriorityIndex].burst;
      processes[highestPriorityIndex].completionTime = currentTime;

      results.push(processes[highestPriorityIndex]);
      processes.splice(highestPriorityIndex, 1);
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
    ganttChart,
    averageResponseTime,
    averageTurnaroundTime,
    averageWaitTime,
  };
}

export { pp };