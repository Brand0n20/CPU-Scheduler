export const sjf = ({ processes }) => {

    console.log('Running SJF Algorithm');

    let currentTime = 0;
    let calculations = []
    let waitingTime = 0;

    
    let orderedProcesses = processes.sort((a, b) => a.burstTime - b.burstTime);
    let totalProcesses = processes.length
    
    orderedProcesses.array.forEach(p => {
        if (currentTime < p.arrivalTime) {

        }

        waitingTime += p.burstTime;
    });

};
