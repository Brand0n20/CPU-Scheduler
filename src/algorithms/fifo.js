const fifo = ({ processes }) => {
    let currentTime = 0;
    let calculations = [];

    console.log('Running FIFO Algorithm');
    console.log(processes);

    for (let i = 0; i < processes.length; i++) {
        let { arrivalTime, burstTime } = processes[i];

        // Ensure the CPU waits if the process arrives later than the current time
        let startTime = Math.max(currentTime, arrivalTime);

        
        let completionTime = startTime + burstTime;
        let turnaroundTime = completionTime - arrivalTime;
        let waitingTime = turnaroundTime - burstTime;

        // Update current time to track process execution
        currentTime = completionTime;

        calculations.push({
            id: processes[i].id,
            arrivalTime,
            burstTime,
            startTime,
            completionTime,
            turnaroundTime,
            waitingTime
        });
    }

    console.log(calculations);
    return calculations;
};

export default fifo;
