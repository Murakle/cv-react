import "./App.css";
import DoughnutChart from "./components/DoughnutChart";
import TimeLineChart from "./components/TimeLineChart";
import ChessChart from "./components/ChessChart";

const App = () => {
    return (
        <div>
            <ChessChart/>
            <DoughnutChart/>
            <TimeLineChart/>
        </div>
    );
};
export default App;
