import React from 'react';
import { Button } from 'react-bootstrap';

const ProcessInputTable = ({ processes, pid, arrivalTime, burstTime, setPid, setArrivalTime, setBurstTime, addProcess }) => {
  return (
    <div className="col-md-8">
      {/* Table Section */}
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
  );
};

export default ProcessInputTable;
