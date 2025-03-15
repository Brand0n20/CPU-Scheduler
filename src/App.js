import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import fifo from './algorithms/fifo';
import { sjf } from './algorithms/sjf';
import { mlfq } from './algorithms/mlfq';
import { rr } from './algorithms/rr';
import { stcf } from './algorithms/stcf';
import InputTable from './components/inputTable';
import { OutputTable } from './components/outputTable';

function App() {
  const [processes, setProcesses] = useState([]);
  const [schedulingMethod, setSchedulingMethod] = useState("FIFO");
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [calculations, setCalculations] = useState([]);

  // Function to generate a random process
  const generateRandomProcess = () => {
    const pid = Math.floor(Math.random() * 1000); // Random PID (0-999)
    const arrivalTime = Math.floor(Math.random() * 101); // Random arrival time (0-100)
    const burstTime = Math.floor(Math.random() * 20) + 1; // Random burst time (1-20)

    setProcesses([
      ...processes,
      { id: pid, arrivalTime, burstTime },
    ]);
  };

  const methodSelected = () => {
    const algorithms = {
      'FIFO': fifo,
      'SJF': sjf,
      'MLFQ': mlfq,
      'Round Robin': rr,
      'STCF': stcf
    };

    let selectedAlgorithm = algorithms[schedulingMethod];
    if (selectedAlgorithm) {
      // pass processes as an object when calling 'selectedAlgorithm'
      const newCalculations = selectedAlgorithm({ processes, timeQuantum }).map((calc) => ({
        ...calc,
        algorithm: schedulingMethod, // Add algorithm name to differentiate results
      }));

      setCalculations(prevCalculations => ({
        ...prevCalculations,
        [schedulingMethod]: newCalculations // Dynimcally update based on algorithm
      }));
    } else {
      alert("Invalid Scheduling Method Selected!");
    }
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container-fluid">
            <span className="navbar-brand">CPU Scheduling Simulator</span>
          </div>
        </nav>
      </header>

      <div className="container mt-4">
        <div className="row">
          {/* Input Table */}
          <InputTable processes={processes} generateRandomProcess={generateRandomProcess}/>

          {/* Scheduling Method Section */}
          <div className="col-md-4">
            <div className="border p-3">
              <h5>Select Scheduling Method</h5>
              <select
                className="form-select"
                value={schedulingMethod}
                onChange={(e) => setSchedulingMethod(e.target.value)}
              >
                <option>FIFO</option>
                <option>SJF</option>
                <option>MLFQ</option>
                <option>Round Robin</option>
                <option>STCF</option>
              </select>

              {/* Time Quantum Input for Round Robin */}
              {schedulingMethod === "Round Robin" && (
                <div className="mt-3">
                  <label>Time Quantum:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={timeQuantum}
                    onChange={(e) => setTimeQuantum(Number(e.target.value))}
                  />
                </div>
              )}
              {/* Calculate Button */}
              <Button variant="primary" className="mt-3" onClick={methodSelected}>
                Calculate
              </Button>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          {/* Displays a new table for each algorithm if it's not empty*/}
        {Object.keys(calculations).map(algorithm => 
        calculations[algorithm].length > 0 && 
        <OutputTable key={algorithm} algorithm={algorithm} calculations={calculations[algorithm]} />
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
