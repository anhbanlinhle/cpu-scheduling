import json

def main():
    processes = []
    while True:
        try:
            process_input = input().split()
            if process_input[0].lower() == 'q':
                break
            process = {
                "name": process_input[0],
                "arrive": int(process_input[1]),
                "burst": int(process_input[2]),
                "priority": int(process_input[3])
            }
            processes.append(process)
        except EOFError:
            break

    with open('src/public/data/process.json', 'w') as f:
        json.dump(processes, f, indent=2)

if __name__ == "__main__":
    main()