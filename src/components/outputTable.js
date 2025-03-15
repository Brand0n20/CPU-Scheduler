export const OutputTable = ({ calculations, algorithm }) => {

    return (
      <div className="col-md-8">
      {/* Table Section */}
      <h4>{algorithm} Results</h4>
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
          </tr>
        </thead>
        <tbody>
          {calculations.map((calc, index) => (
            <tr key={index}>
              <td>{calc.id}</td>
              <td>{calc.arrivalTime}</td>
              <td>{calc.burstTime}</td>
              <td>{calc.completionTime}</td>
              <td>{calc.waitingTime}</td>
              <td>{calc.turnaroundTime}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}