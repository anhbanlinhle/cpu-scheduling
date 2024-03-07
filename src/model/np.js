let np = (processes, order) => {
  processes.sort((a, b) => a.arrive - b.arrive);

  for (let i = 0; i < processes.length; i++) {
    processes[i].processed = false;
  }

  const ganttChart = [];
  let currentTime = 0;
  let processedCount = 0;

  while (processedCount < processes.length) {
    let highestPriorityProcessIndex = 0;
    let highestPriority = null;

    if (order === 'highest') {
      highestPriority = -Infinity;
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].arrive <= currentTime && !processes[i].processed) {
          if (processes[i].priority > highestPriority) { 
            highestPriorityProcessIndex = i;
            highestPriority = processes[i].priority;
          }
        }
      }
    }
    else if (order === 'lowest') {
      highestPriority = Infinity;
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].arrive <= currentTime && !processes[i].processed) {
          if (processes[i].priority < highestPriority) {
            highestPriorityProcessIndex = i;
            highestPriority = processes[i].priority;
          }
        }
      }
    }
    

    if (highestPriority === -Infinity || highestPriority === Infinity) {
      // const nextArrival = processes.reduce((min, process) => Math.min(min, process.arrive), Infinity);
      let nextArrival = Infinity;
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].arrive < nextArrival && !processes[i].processed) {
          nextArrival = processes[i].arrive;
        }
      }
      const waitingTime = nextArrival - currentTime;
      ganttChart.push(...Array(waitingTime).fill('-'));
      currentTime = nextArrival;
      continue;
    }

    const { name, burst, priority } = processes[highestPriorityProcessIndex];
    ganttChart.push(...Array(burst).fill(name));
    currentTime += burst;

    const waitTime = Math.max(0, currentTime - processes[highestPriorityProcessIndex].arrive - burst);
    const turnaroundTime = waitTime + burst;

    processes[highestPriorityProcessIndex].responseTime = waitTime;
    processes[highestPriorityProcessIndex].waitTime = waitTime;
    processes[highestPriorityProcessIndex].turnaroundTime = turnaroundTime;
    processes[highestPriorityProcessIndex].completionTime = currentTime;

    processes[highestPriorityProcessIndex].processed = true;
    processedCount++;
  }

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
};

export { np };