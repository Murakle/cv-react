import React, {Component} from "react";
import "./TimeLineChart.css";
import Chart from "react-apexcharts";


export default class TimeLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [

                // School
                {
                    name: 'School',
                    data: [
                        {
                            x: 'Edu',
                            y: [
                                new Date(2007, 8, 1).getTime(),
                                new Date(2018, 5, 31).getTime()
                            ]
                        },
                    ]
                },
                // Uni
                {
                    name: 'University',
                    data: [
                        {
                            x: 'Edu',
                            y: [
                                new Date(2018, 6, 15).getTime(),
                                new Date(2019, 6, 15).getTime()
                            ],
                            fillColor: '#386641'
                        },
                        {
                            x: 'Edu',
                            y: [
                                new Date(2019, 6, 15).getTime(),
                                new Date(2020, 6, 15).getTime()
                            ],
                            fillColor: '#6A994E'
                        },
                        {
                            x: 'Edu',
                            y: [
                                new Date(2020, 6, 15).getTime(),
                                new Date(2021, 6, 15).getTime()
                            ],
                            fillColor: '#A7C957'
                        },
                        {
                            x: 'Edu',
                            y: [
                                new Date(2021, 6, 15).getTime(),
                                new Date(2022, 6, 15).getTime()
                            ],
                            fillColor: '#F2E8CF'
                        },
                    ]
                },
                // sahih
                {
                    name: 'Sahih Invest',
                    data: [
                        {
                            x: 'Work',
                            y: [
                                new Date(2021, 2, 1).getTime(),
                                new Date(2023, 2, 1).getTime()
                            ]
                        },
                    ]
                },
            ],
            options: {
                chart: {
                    type: 'rangeBar',
                    toolbar: {
                        show: false
                    },
                    offsetY: 0,
                    parentHeightOffset: 0
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '66%',
                        rangeBarGroupRows: true
                    }
                },
                xaxis: {
                    type: 'datetime',
                    min: new Date(new Date().setFullYear(new Date().getFullYear() - 4)).getTime(),
                    max: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).getTime()
                },
                annotations: {
                    position: 'front',
                    xaxis: [{
                        x: new Date().getTime(),
                        borderColor: '#999',
                        yAxisIndex: 0,
                        label: {
                            show: true,
                            text: 'Now',
                            style: {
                                color: "#fff",
                                background: '#BC4749'
                            }
                        }
                    }]
                },
                legend: {
                    position: 'top'
                },
                dataLabels: {
                    enabled: true,
                    textAnchor: 'end',
                    formatter: function (value, {seriesIndex, dataPointIndex, w}) {
                        if (w.config.series[seriesIndex].name === 'University') {
                            switch (dataPointIndex) {
                                case 0:
                                    return '1st year';
                                case 1:
                                    return '2nd year';
                                case 2:
                                    return '3rd year';
                                case 3:
                                    return '4th year';
                                default:
                                    return 'xth year';
                            }
                        }
                        return w.config.series[seriesIndex].name;
                    },
                    style: {
                        colors: ['#FFF', function (opts) {
                            const colors = ['#F2E8CF', '#A7C957', '#6A994E', '#386641'];
                            return colors[opts.dataPointIndex];
                        }, "#FFF"]
                    },
                },
                fill: {
                    type: ['solid', 'solid', 'gradient'],
                    gradient: {
                        shadeIntensity: 0,
                        opacityFrom: 1,
                        opacityTo: 0,
                        stops: [0, 100]
                    }
                },
                tooltip: {
                    enabled: true,
                    custom: function({series, seriesIndex, dataPointIndex, w}) {
                        return '<div class="arrow_box">' +
                            '<span>' + w.config.series[seriesIndex].name + '</span>' +
                            '</div>'
                    }
                }
            }
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div style={{display: 'flex', maxWidth: 900}}>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="rangeBar"
                    width="100%"
                    height="150"
                />
            </div>
        );

    }
}
