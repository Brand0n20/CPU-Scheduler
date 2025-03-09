# CPU Scheduling Simulator

## Overview
The **CPU Scheduling Simulator** is a web-based application that allows users to simulate various CPU scheduling algorithms. The simulator provides an interactive way to visualize how different scheduling techniques handle process execution based on arrival time and burst time.

## Features
- **Random Process Generation**: Generates processes with random PIDs, arrival times, and burst times.
- **Scheduling Algorithms**:
  - First Come, First Served (FIFO)
  - Shortest Job First (SJF)
  - Shortest Time to Completion First (STCF)
  - Round Robin (RR) with customizable time quantum
  - Multi-Level Feedback Queue (MLFQ)
- **Process Table**: Displays generated processes in an organized table.
- **Results Table**: Shows calculated scheduling results for better analysis.
- **Visualizations**: Utilizes Chart.js to represent scheduling performance.
- **Export Results**: Allows users to download scheduling reports in PDF format.

## Technologies Used
- **React.js / Next.js** - Frontend framework
- **Bootstrap** - Styling and UI components
- **Chart.js** - Graphs and visualizations
- **jsPDF** - Export results as a PDF

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/cpu-scheduler-simulator.git
   cd cpu-scheduler-simulator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Usage
1. Click **Generate Random Process** to create random CPU processes.
2. Select a **Scheduling Algorithm** from the dropdown menu.
3. Click **Calculate** to simulate the chosen algorithm.
4. View the results in the **Output Table** and visualizations.
5. Export results as a **PDF** if needed.

## Future Improvements
- Add priority-based scheduling.
- Enhance visualization animations.
- Implement real-time simulation controls.

## Contributing
Feel free to fork the repository and submit pull requests!

## License
This project is licensed under the MIT License.

