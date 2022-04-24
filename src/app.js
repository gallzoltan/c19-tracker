import './scss/style.scss'
import './scss/loader.scss'
import covidApi from './services/covidApi';
import ReportCard from './components/ReportCard.js'
import CountryList from './components/CountryList';
import Chart from 'chart.js/auto';

const loader = document.querySelector("#loading");

window.addEventListener('DOMContentLoaded', () => {   
  registerComponents(); 
  const form = document.getElementById('form'); 
  const submitButton = document.getElementById('submit');  
  
  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  // ];

  // const data = {
  //   labels: labels,
  //   datasets: [{
  //     label: 'My First dataset',
  //     backgroundColor: 'rgb(255, 99, 132)',
  //     borderColor: 'rgb(255, 99, 132)',
  //     data: [0, 10, 5, 2, 20, 30, 45],
  //   }]
  // };

  // const config = {
  //   type: 'line',
  //   data: data,
  //   options: {}
  // };
  // new Chart(document.getElementById('axes_line_chart'), config);
  displayLoading();    
  renderCurrentDatas('HU'); 

  form.addEventListener('submit', e => {
    e.preventDefault();   
    const countries = document.getElementById('countries');
    submitButton.disabled = true;
    displayLoading();    
    renderCurrentDatas(countries.value);
    submitButton.disabled = false; 
  }); 
});

const registerComponents = () => {
  customElements.define("report-card", ReportCard);
  customElements.define("country-list", CountryList);
}

const renderCurrentDatas = (ab) => {
  const cardConfirmed = document.getElementById('confirmed');
  const cardRecovered = document.getElementById('recovered');
  const cardDeaths= document.getElementById('deaths');
  const ctx = document.getElementById('axes_line_chart').getContext("2d");
  loadCurrentData(ab).then(res => {
    const local = Intl.NumberFormat('hu-HU');
    cardConfirmed.setDatas({current: local.format(res.confirmed), update: res.updated});
    cardRecovered.setDatas({current: local.format(res.recovered), update: res.updated});
    cardDeaths.setDatas({current: local.format(res.deaths), update: res.updated});    

    loadHistoryData(ab).then(res => {
      console.log(res[0].All.dates);
      renderChart(ctx, res[0].All.dates, res[1].All.dates, res[2].All.dates);
      hideLoading();
    });
    
  });  
}

const loadCurrentData = async (ab) => {
  try {
    const result = await covidApi.getCurrentDatas(ab); 
    return result;
  } catch (e) {
    console.error('Error loading current Covid data', e);
    throw e;
  }
}

const loadHistoryData = async (ab) => {
  try {
    const result = await covidApi.getHistoryAllState(ab);
    return result;
  } catch (e) {
    console.error('Error loading history Covid data', e);
    throw e;
  }
}

let covid_chart;
function renderChart(ctx, cases, recovered, deaths) {
  if (typeof covid_chart !== 'undefined') {
    covid_chart.destroy();
  } 
  covid_chart = new Chart(ctx, {
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
  });
}

const displayLoading = () => {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 60000);
}

const hideLoading = () => {
  loader.classList.remove("display");
}