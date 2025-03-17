import { Button } from "react-bootstrap"
import exportToPDF from "./exportToPDF"
import { useRef } from "react"

export const OutputTable = ({ calculations, algorithm }) => {

  const printRef = useRef(null)

  const handleDownloadPdf = () => {
    const element = printRef.current
    if (!element) {
      return;
    }
  }

    return (
      <div ref={printRef} className="col-md-8">
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
      {/* Export Button */}
      <Button variant="secondary" className="mt-3" onClick={() => exportToPDF(calculations)}>
          Export to PDF
      </Button>
    </div>
    )
}