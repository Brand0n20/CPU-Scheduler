const Fifo = ({processes}) => {
    let currentTime = 0;
    let calculations = [];

    console.log('Running FIFO Algorithm');
    console.log(processes);

    for (let i = 0; i < processes.length; i++) {
        let { arrivalTime, burstTime, id } = processes[i];

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

    console.log(calculations);
    return calculations;
};

export default Fifo;
