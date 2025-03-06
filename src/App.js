import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import fifo from './algorithms/fifo'
import InputTable from './components/inputTable'
import { OutputTable } from './components/outputTable'


function App() {

  const [processes, setProcesses] = useState([]);
  const [pid, setPid] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [schedulingMethod, setSchedulingMethod] = useState("Round Robin");
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [calculations, setCalculations] = useState([]);

  const addProcess = () => {
    if (pid && arrivalTime && burstTime) {
      setProcesses([
        ...processes,
        { id: pid, arrivalTime: parseInt(arrivalTime), burstTime: parseInt(burstTime) },
      ]);
      // sets these inputs back to blank
      setPid("");
      setArrivalTime("");
      setBurstTime("");
    }
  };

  const methodSelected = () => {
    if (schedulingMethod === 'FIFO') {
      setCalculations(fifo({ processes }))
    }

  }

  return (
    <div className="App">
      <header>
        <nav className='navbar navbar-dark bg-primary'>
          <div className="container-fluid">
            <span className='navbar-brand'>CPU Scheduling Simulator</span>
          </div>
        </nav>
      </header>

      <div className="container mt-4">
        <div className="row">
          {/* Input Table */}
          <InputTable
            processes={processes}
            pid={pid}
            arrivalTime={arrivalTime}
            burstTime={burstTime}
            setPid={setPid}
            setArrivalTime={setArrivalTime}
            setBurstTime={setBurstTime}
            addProcess={addProcess}
          />
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
      {/* Output Table */}
      {calculations.length > 0 && <OutputTable
      calculations={calculations}
      ></OutputTable>
      }
      </div>
      </div>
    </div>
  );
}

export default App;
