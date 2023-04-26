import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

function LineChart({ chartData }: any) {
	return <Line data={chartData} />;
}

export default LineChart;
