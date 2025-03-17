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

    // Decrease the width to make the image thinner, while maintaining the aspect ratio
    const scaleFactor = 0.8; // Set this to a value between 0 and 1 to make the image thinner (but not too small)
    let scaledWidth = imageWidth * scaleFactor; // Reduce the width, but not too much
    let scaledHeight = (scaledWidth / imageWidth) * imageHeight; // Adjust height based on the aspect ratio

    // Ensure the image fits within the page width and height
    if (scaledWidth > pdfWidth) {
      scaledWidth = pdfWidth; // Limit the width to the PDF page width
      scaledHeight = (scaledWidth / imageWidth) * imageHeight; // Adjust height to maintain aspect ratio
    }

    if (scaledHeight > pdfHeight) {
      const scaleFactorForHeight = pdfHeight / scaledHeight;
      scaledWidth *= scaleFactorForHeight;
      scaledHeight = pdfHeight;
    }

    pdf.addImage(data, 'PNG', 0, 0, scaledWidth, scaledHeight);
    pdf.save('ProcessResults.pdf')


  }

    return (
      <div className="col-md-8">
      <div  ref={printRef}>
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
      {/* Export Button */}
      <Button variant="secondary" className="mt-3" onClick={handleDownloadPdf}>
          Export to PDF
      </Button>
    </div>
    )
}