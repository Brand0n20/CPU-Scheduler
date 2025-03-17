export const sjf = ({ processes }) => {

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
    

    orderedProcesses.forEach((process) => {
        // If the process arrives after the current time, update current time
        if (process.arrivalTime > currentTime) {
            currentTime = process.arrivalTime;
        }

        // Calculate waiting time for the current process
        let waitingTime = currentTime - process.arrivalTime;

        // Calculate completion time
        let completionTime = currentTime + process.burstTime;

        // Calculate turnaround time (completion time - arrival time)
        let turnaroundTime = completionTime - process.arrivalTime;

        // Store calculations for this process
        calculations.push({
            ...process,
            waitingTime,
            turnaroundTime,
            completionTime,
        });

        // Update current time
        currentTime = completionTime;
    });

    // Calculate average waiting time and average turnaround time
    let totalWaitingTime = calculations.reduce((sum, p) => sum + p.waitingTime, 0);
    let totalTurnaroundTime = calculations.reduce((sum, p) => sum + p.turnaroundTime, 0);

    return calculations
};