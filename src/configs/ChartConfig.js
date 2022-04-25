const ChartConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Cases",
        data: cases,
        fill: true,
        borderColor: "#FFF",
        backroundColor: "#FFF",
        borderWitdth: 1
      },
      {
        label: "Recovered",
        data: recovered,
        fill: false,
        borderColor: "#009688",
        backroundColor: "#009688",
        borderWitdth: 1
      },
      {
        label: "Deaths",
        data: deaths,
        fill: false,
        borderColor: "#f44336",
        backroundColor: "#f44336",
        borderWitdth: 1
      }
    ],
    labels: null
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
}
export default ChartConfig;