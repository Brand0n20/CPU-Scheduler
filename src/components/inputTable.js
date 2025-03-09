import React from 'react';
import { Button } from 'react-bootstrap';

const ProcessInputTable = ({ processes, generateRandomProcess}) => {
  return (
    <div className="col-md-8">
      <h5>Process List</h5>
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
          </tr>
        </thead>
        <tbody>
          {processes.length > 0 ? (
            processes.map((p, index) => (
              <tr key={index}>
                <td>{p.id}</td>
                <td>{p.arrivalTime}</td>
                <td>{p.burstTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No processes generated yet.
              </td>
            </tr>
          )}
        <Button variant="secondary" className="mt-3" onClick={generateRandomProcess}>
              Generate Random Process
            </Button>
        </tbody>
      </table>
    </div>
  );
};

export default ProcessInputTable;
