import { useState } from "react"
const fifo = ( { processes }) => {

    let currentTime = 0;
    let finishTimes = []

    console.log('Running FIFO Algorithm')
    console.log(processes)
    for (let process of processes) {
        
        let startTime = currentTime;
        let finishTime = startTime + process.burstTime;
        let turnaroundTime = finishTime = process.burstTime;
        let waitingTime = turnaroundTime - process.burstTime
    }

    console.log(finishTimes)
    return 
}

export default fifo