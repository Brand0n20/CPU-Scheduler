export const stcf = ({ processes }) => {
    // Sort processes by arrival time initially
    let orderedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completed = 0;
    let waitingTime = 0;
    let turnAroundTime = 0;
    let calculations = []

    // creating new version of processes array but with additional properties
    let remainingProcesses = orderedProcesses.map(p => ({
        ...p,
        remainingTime: p.burstTime, // Keep track of remaining execution time
        startTime: null,  // Track when the process first starts executing
        completionTime: null, // Track when the process completes
    }));

    let ganttChart = [];

    while (completed < orderedProcesses.length) {
        // Select the process with the shortest remaining time that has arrived
        // ensures that only processes that have already arrived are considered.
        // Also ensures that only processes that still need execution are considered.
        let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);

        //The process with the smallest remaining execution time comes first in the sorted list.
        let currentProcess = availableProcesses.sort((a, b) => a.remainingTime - b.remainingTime)[0];

        if (!currentProcess) {
            // No process is available, so move time forward
            ganttChart.push({ time: currentTime, pid: 'Idle' });
            currentTime++;
            continue;
        }

        // If the process is starting for the first time, set the start time
        if (currentProcess.startTime === null) {
            currentProcess.startTime = currentTime;
        }

        // Execute the process for 1 unit of time
        currentProcess.remainingTime--;
        ganttChart.push({ time: currentTime, pid: currentProcess.pid });

        // If process is completed
        if (currentProcess.remainingTime === 0) {
            completed++;
            currentProcess.completionTime = currentTime + 1;
            currentProcess.turnAroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
            currentProcess.waitingTime = currentProcess.turnAroundTime - currentProcess.burstTime;

            waitingTime += currentProcess.waitingTime;
            turnAroundTime += currentProcess.turnAroundTime;

            calculations.push({
                id: currentProcess.id,
                arrivalTime: currentProcess.arrivalTime,
                burstTime: currentProcess.burstTime,
                waitingTime: currentProcess.waitingTime,
                turnaroundTime: currentProcess.turnAroundTime,
                completionTime: currentProcess.completionTime,
            });
            
        }

        // Move time forward
        currentTime++;
    }

    // Calculate average waiting time and average turnaround time
    let averageWaitingTime = waitingTime / orderedProcesses.length;
    let averageTurnAroundTime = turnAroundTime / orderedProcesses.length;

    return calculations
};
