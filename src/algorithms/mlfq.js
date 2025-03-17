export const mlfq = ({ processes }) => {
    let queues = [[], [], []]; // Three priority queues
    const timeQuantums = [8, 16, 32]; // Static time quantums
    let ordered = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0, index = 0;
    let calculations = [];

    // while one of the queues is not empty
    while (queues.some(queue => queue.length > 0) || index < ordered.length) {
        // Add arrived processes to the highest priority queue
        while (index < ordered.length && ordered[index].arrivalTime <= currentTime) {
            queues[0].push({ ...ordered[index], remainingTime: ordered[index].burstTime });
            index++;
        }

        let executed = false;
        for (let i = 0; i < queues.length; i++) {
            if (queues[i].length === 0) continue;
            let process = queues[i].shift();
            let executeTime = Math.min(timeQuantums[i], process.remainingTime);
            process.remainingTime -= executeTime;
            currentTime += executeTime;
            executed = true;

            // check if any new p rocesses have arrived at the queue by current Time
            while (index < ordered.length && ordered[index].arrivalTime <= currentTime) {
                queues[0].push({ ...ordered[index], remainingTime: ordered[index].burstTime });
                index++;
            }

            if (process.remainingTime > 0) {
                let nextQueue = Math.min(i + 1, queues.length - 1); // Move to lower (next in the loop) queue if not finished
                queues[nextQueue].push(process);
            } else {
                calculations.push({
                    id: process.id,
                    arrivalTime: process.arrivalTime,
                    burstTime: process.burstTime,
                    completionTime: currentTime
                });
            }
            break; // Ensure only one process runs at a time
        }

        // updated time if no process was executed
        if (!executed) currentTime = ordered[index]?.arrivalTime || currentTime;
    }

    return calculations.map(p => {
        let turnaroundTime = p.completionTime - p.arrivalTime;
        return {
            ...p,
            turnaroundTime,
            waitingTime: turnaroundTime - p.burstTime
        };
    });
};
