# cpu-scheduling
Simple server-side rendering webpage to illustrate CPU scheduling Gantt chart

![](src/public/img/demo.png)

Supporting algorithms:

- `First Come First Serve`
- `Shortest Job First`
- `Shortest Remaining Time First`
- `Non-preemptive Priority` (_both priority order_)
- `Preemptive Priority` (_both priority order_)
- `Round Robin` (_custom Qtime_)

## Prerequisite

To install required packages, run:

```sh
npm install
```

## Usage

To start server, run:

```sh
npm start
```

GUI is ready on __localhost:1111__

## Data

To manually customize input processes, modify [process.json](src/public/data/process.json)

Or run [process_gen.py](process_gen.py)

```sh
python3 process_gen.py
```

To input processes from terminal on each line: `<process name> <arrive time> <burst time> <priority>`

Press <kbd>q</kbd> to close
