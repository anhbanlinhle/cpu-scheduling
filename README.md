# cpu-scheduling
Simple server-side rendering webpage to illustrate CPU scheduling Gantt chart
Suporting algorithms:

- First Come First Serve
- Shortest Job First
- Shortest Remaining Time First
- Non-preemptive Priority (_both priority order_)
- Preemptive Priority (_both priority order_)
- Round Robin (_custom Qtime_)

## Prerequisite

To install required packages, run:

```sh
npm install
```

## Usage

To start running server, run:

```sh
npm start
```

GUI is ready on __localhost:1111__

## Data

To customize input processes, modify [process.json](src/public/data/process.json)