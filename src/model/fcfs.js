let fcfs = (processes) => {
  // sort processes by arrival time
  processes.sort((a, b) => a.arrive - b.arrive);

  const ganttChart = [];
  let currentTime = 0;

  for (const process of processes) {
    const { name, arrive, burst } = process;

    // if has arrived, wait = 0
    // else, wait = current time - arrive
    const waitTime = Math.max(0, currentTime - arrive);

    // TT = WT in queue + burst
    const turnaroundTime = waitTime + burst;

    // check if the process has arrived
    // if not, add a '-' to the gantt chart
    ganttChart.push(...Array(Math.max(0, arrive - currentTime)).fill('-'));
    currentTime += Math.max(0, arrive - currentTime);

    // while bursting, add to gantt chart
    ganttChart.push(...Array(burst).fill(name));

    // update current time for the next process
    currentTime += burst;

    // add process details
    process.responseTime = waitTime;
    process.waitTime = waitTime;
    process.turnaroundTime = turnaroundTime;
    process.completionTime = currentTime;
  }

  // fcfs: response time = wait time
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

export { fcfs };
