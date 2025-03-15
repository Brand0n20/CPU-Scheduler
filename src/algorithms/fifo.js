const Fifo = ({processes}) => {

    let currentTime = 0;
    let calculations = [];

    // Sort processes by arrival time first, then by burst time
    // Ensure processes remains untouched while orderedProcesses gets sorted.
    let orderedProcesses = [...processes].sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return a.burstTime - b.burstTime;
        }
        return a.arrivalTime - b.arrivalTime;
    });

    for (let i = 0; i < orderedProcesses.length; i++) {
        let { arrivalTime, burstTime, id } = orderedProcesses[i];

        let startTime = Math.max(currentTime, arrivalTime);
        let completionTime = startTime + burstTime;
        let turnaroundTime = completionTime - arrivalTime;
        let waitingTime = turnaroundTime - burstTime;

        currentTime = completionTime;

        calculations.push({
            id,
            arrivalTime,
            burstTime,
            waitingTime,
            turnaroundTime,
            completionTime
        });
    }
    return calculations;
};

export default Fifo;
