import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import fifo from './algorithms/fifo'


function App() {

  let process = {
    id: null,
    arrivalTime: null,
    burstTime: null
  }

  const [processes, setProcesses] = useState([]);
  const [pid, setPid] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [schedulingMethod, setSchedulingMethod] = useState("Round Robin");
  const [timeQuantum, setTimeQuantum] = useState(2);

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
    schedulingMethod === 'FIFO'? fifo( {processes}) : console.log('Fifo was not selected')
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
          {/* Table Section */}
          <div className="col-md-8">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Process ID</th>
                  <th>Arrival Time</th>
                  <th>Burst Time</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p, index) => (
                  <tr key={index}>
                    <td>{p.id}</td>
                    <td>{p.arrivalTime}</td>
                    <td>{p.burstTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Input Fields */}
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control"
                placeholder="Process ID"
                value={pid}
                onChange={(e) => setPid(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Arrival Time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Burst Time"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
              />
              <Button variant="primary" onClick={addProcess}>
                Add Process
              </Button>
            </div>
          </div>

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
      </div>
    </div>
  );
}

export default App;
