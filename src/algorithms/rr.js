export const rr = ({ processes, timeQuantum }) => {
    let ordered = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let queue = [];
    let currentTime = 0, index = 0;
    let calculations = [];

    while (queue.length > 0 || index < ordered.length) {
        // Add all arrived processes to the queue
        while (index < ordered.length && ordered[index].arrivalTime <= currentTime) {
            queue.push({ ...ordered[index], remainingTime: ordered[index].burstTime });
            index++;
        }

        // If no process is ready, jump to the next arrival time
        if (queue.length === 0) {
            currentTime = ordered[index].arrivalTime;
            continue;
        }

        let process = queue.shift();  // Dequeue first process
        let executeTime = Math.min(timeQuantum, process.remainingTime);
        process.remainingTime -= executeTime;
        currentTime += executeTime;

        // Add newly arrived processes while running
        while (index < ordered.length && ordered[index].arrivalTime <= currentTime) {
            queue.push({ ...ordered[index], remainingTime: ordered[index].burstTime });
            index++;
        }

        process.remainingTime > 0 ? queue.push(process) : calculations.push({
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            completionTime: currentTime
        });
    }

    return calculations.map(p => {
        let turnaroundTime = p.completionTime - p.arrivalTime; // Define it first
        return {
            ...p,
            turnaroundTime, 
            waitingTime: turnaroundTime - p.burstTime 
        };
    });
    
};
