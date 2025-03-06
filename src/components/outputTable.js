export const OutputTable = ({ calculations }) => {
    return (
        <div className="col-md-8">
      {/* Table Section */}
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
          {calculations.map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.completionTime}</td>
              <td>{p.waitingTime}</td>
              <td>{p.turnaroundTime}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}