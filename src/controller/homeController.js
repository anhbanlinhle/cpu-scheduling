import { json } from 'body-parser';

let home = async (req, res) => {
  let processes = {
    processes: [
    {
      name: 'P1',
      arrive: 0,
      burst: 0,
      priority: 0,
      responseTime: 0,
      turnaroundTime: 0,
      waitTime: 0,
    },
    {
      name: 'P2',
      arrive: 0,
      burst: 0,
      priority: 0,
      responseTime: 0,
      turnaroundTime: 0,
      waitTime: 0,
    },
    {
      name: 'P3',
      arrive: 0,
      burst: 0,
      priority: 0,
      responseTime: 0,
      turnaroundTime: 0,
      waitTime: 0,
    },
    {
      name: 'P4',
      arrive: 0,
      burst: 0,
      priority: 0,
      responseTime: 0,
      turnaroundTime: 0,
      waitTime: 0,
    },
    {
      name: 'P5',
      arrive: 0,
      burst: 0,
      priority: 0,
      responseTime: 0,
      turnaroundTime: 0,
      waitTime: 0,
    }
    ],
    ganttChart: [
      'P1', 'P2', 'P3', 'P4', 'P5'
    ],
    averageResponseTime: 0.0,
    averageTurnaroundTime: 0.0,
    averageWaitTime: 0.0
  }
  return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart})
}

let calculate = async (req, res) => {
  console.log(req.body);
  return res.send(req.body)
}

module.exports = {
  home, calculate
}