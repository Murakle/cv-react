import React, {Component} from "react";
import "./DoughnutChart.css";
import {Chart, registerables} from 'chart.js';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';


export default class DoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tooltipEl: null,
        };
    }

    chartRef = React.createRef();
    data = {
        labels: ["Java", "HTML/CSS", "JS", "C/C++", "C#", "Python/Jupiter", "Other"],
        datasets: [
            {
                label: "Lines of code",
                data: [5000, 4000, 1230, 2000, 3000, 1000, 2200],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.4)",
                    "rgba(54, 162, 235, 0.4)",
                    "rgba(255, 206, 86, 0.4)",
                    "rgba(75, 192, 192, 0.4)",
                    "rgba(153, 102, 255, 0.4)",
                    "rgba(255, 159, 64, 0.4)",
                    "rgba(0, 0, 0, 0.4)",
                ],
                hoverBackgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(0, 0, 0, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(0, 0, 0, 1)",
                ],
                // circumference: 180,
            },
        ],
    };

    componentDidMount() {
        // console.log(this);
        Chart.register(...registerables);
        const myChartRef = this.chartRef.current.getContext("2d");
        const options = {
            method: "GET",
            url: "http://46.173.214.190/cv/git-stats-ready",
            // url: "https://cv-sails.herokuapp.com/cv/git-stats-ready",
        }
        axios.request(options)
            .then(res => res.data)
            .then(
                (result) => {

                    this.setState({isLoaded: true});
                    const languages = result;
                    const amountOfLanguages = 6;
                    // TODO "other" label
                    this.data.labels = languages.map(lang => lang.lang).slice(0, amountOfLanguages);
                    this.data.datasets[0].data = languages.map(lang => lang.amount).slice(0, amountOfLanguages);
                    new Chart(myChartRef, {
                        type: 'doughnut',
                        data: this.data,
                        options: {
                            cutout: '110',
                            responsive: true,
                            maintainceAspectRatio: false,
                            borderWidth: 2,
                            borderRadius: 15,
                            borderAlign: 'outer',
                            // offset: 1,
                            plugins: {
                                tooltip: {
                                    enabled: false,
                                    external: function (tooltipModel) {
                                        // Tooltip Element

                                        let tooltipEl = document.getElementById('chartjs-tooltip');

                                        // Create element on first render
                                        const parent = document.querySelector(".doughnut-chart-container");
                                        if (tooltipModel.tooltip.opacity === 0) {
                                            tooltipEl.style.opacity = '0';
                                            return;
                                        }
                                        if (!parent)
                                            return;
                                        if (!tooltipEl) {
                                            tooltipEl = document.createElement('div');
                                            tooltipEl.id = 'chartjs-tooltip';
                                            tooltipEl.innerHTML = '<div></div>';
                                            parent.appendChild(tooltipEl);
                                        }


                                        if (tooltipModel.tooltip.body[0]) {
                                            const lang = tooltipModel.tooltip.dataPoints[0].label;
                                            const amount = tooltipModel.tooltip.dataPoints[0].parsed;
                                            let sum = 0;
                                            tooltipModel.tooltip.dataPoints[0].dataset.data.forEach(item => sum += item);
                                            const percent = Math.floor(amount / sum * 100);
                                            tooltipEl.innerHTML = `<h3>${lang}</h3>\n<p class="tooltip-percent">${percent} %</p>\n<p class="tooltip-amount">${amount} Bytes</p>\n`;
                                        }

                                        // console.log(tooltipModel.tooltip);
                                        // console.log(tooltipModel.tooltip.labelColors[0].hoverB);
                                        const color = tooltipModel.tooltip.dataPoints[0].dataset.hoverBackgroundColor[tooltipModel.tooltip.dataPoints[0].dataIndex];
                                        tooltipEl.style.backgroundColor = color + '';
                                        // getHoverColor()
                                        // tooltipEl.style.position = 'relative';

                                        tooltipEl.style.marginTop = tooltipModel.chart.chartArea.top + 'px';

                                        const radius = tooltipModel.tooltip.dataPoints[0].element.innerRadius;
                                        const margin = 10;
                                        tooltipEl.style.width = (radius * 2 - margin * 2) + 'px';
                                        tooltipEl.style.height = (radius * 2 - margin * 2) + 'px';
                                        tooltipEl.style.borderRadius = '50%';
                                        tooltipEl.style.borderColor = tooltipModel.tooltip.labelColors[0].borderColor + '';
                                        tooltipEl.style.opacity = '1';
                                        tooltipEl.style.position = 'absolute';
                                        tooltipEl.style.pointerEvents = 'none';
                                        // this._chart.canvas

                                    }
                                }
                            }

                        }
                    });
                },

                (error) => {
                    console.log(error);
                    this.setState({isLoaded: true});
                    this.setState({error: error});
                }
            );

    }

    render() {

        const message = this.state.error ? <h3>Error: {this.state.error.message}</h3> : (
            !this.state.isLoaded ? <h3>Загрузка...<CircularProgress/></h3> : <h3>Git stats</h3>);
        return (
            <div>
                {message}
                <CircularProgress/>
                <div className="doughnut-chart-container">
                    <canvas
                        id="myChart"
                        ref={this.chartRef}
                    />
                </div>
            </div>
        );

    }
}
