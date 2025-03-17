import { Button } from "react-bootstrap"
import { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const OutputTable = ({ calculations, algorithm }) => {

  const printRef = useRef(null)

  const handleDownloadPdf = async () => {
    const element = printRef.current
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
    })

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;

    // Scale the image to fit the page, while maintaining aspect ratio
    const aspectRatio = imageWidth / imageHeight;
    const scaledWidth = pdfWidth;
    const scaledHeight = pdfWidth / aspectRatio;

    if (scaledHeight > pdfHeight) {
      scaledHeight = pdfHeight;
      scaledWidth = pdfHeight * aspectRatio;
    }

    pdf.addImage(data, 'PNG', 0, 0, scaledWidth, scaledHeight);
    pdf.save('ProcessResults.pdf')


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
      <Button variant="secondary" className="mt-3" onClick={handleDownloadPdf}>
          Export to PDF
      </Button>
    </div>
    )
}