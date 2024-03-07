import { json } from 'body-parser'
import fs from 'fs'
import path from 'path'
import { fcfs } from '../model/fcfs'
import { sjf } from '../model/sjf'
import { srtf } from '../model/srtf'
import { np } from '../model/np'
import { pp } from '../model/pp'
import { rr } from '../model/rr'

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
  let prev = { algorithm: 'fcfs'}
  return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: prev})
}

let calculate = async (req, res) => {
  let jsonFile = path.join(__dirname, '../public/data/process1.json')
  const inputData = fs.readFileSync(jsonFile, 'utf8')

  let algorithm = req.body.algorithm

  let processes = {}
  switch (algorithm) {
    case 'fcfs':
      processes = fcfs(JSON.parse(inputData))
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
    case 'sjf':
      processes = sjf(JSON.parse(inputData))
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
    case 'srtf':
      processes = srtf(JSON.parse(inputData))
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
    case 'np':
      processes = np(JSON.parse(inputData), req.body.priority_order)
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
    case 'pp':
      processes = pp(JSON.parse(inputData), req.body.priority_order)
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
    case 'rr':
      processes = rr(JSON.parse(inputData), req.body.quantum_time)
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
    default:
      return res.render('home.ejs', {processes: processes, gantt_chart: processes.ganttChart, prev: req.body})
  }
}

module.exports = {
  home, calculate
}