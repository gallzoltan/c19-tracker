import './scss/style.scss'
import './scss/loader.scss'
import covidApi from './services/covidApi';
import ReportCard from './components/ReportCard.js'
import CountryList from './components/CountryList';
import Chart from 'chart.js/auto';

const loader = document.querySelector("#loading");
let covid_chart;

window.addEventListener('DOMContentLoaded', () => {   
  registerComponents(); 
  const form = document.getElementById('form'); 
  const submitButton = document.getElementById('submit');  
  
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
})

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
    cardConfirmed.setDatas( { current: local.format(res.confirmed), update: res.updated } );
    cardRecovered.setDatas( { current: local.format(res.recovered), update: res.updated } );
    cardDeaths.setDatas( { current: local.format(res.deaths), update: res.updated } );    
 
    loadHistoryData(ab).then(res => {
      //console.log(res[0].All.dates);
      const confirmed = filterDatas(res[0].All.dates);
      const recovered = filterDatas(res[1].All.dates);
      const deaths = filterDatas(res[2].All.dates);
      renderChart(ctx, confirmed, recovered, deaths);
      hideLoading();
    });    
  });  
}

const filterDatas = (datas) => {
  const from = Date.parse("2022-01-01");
  const to = Date.parse(new Date());
  //delete datas["2022-04-24"];
  //Object.fromEntries(Object.entries(datas).filter(([key]) => key.includes('2022-')));

  return Object.fromEntries(Object.entries(datas).filter(([key]) => (Date.parse(key) > from && Date.parse(key) < to) ));
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

function renderChart(ctx, cases, recovered, deaths) {
  if (typeof covid_chart !== 'undefined') {
    covid_chart.destroy();
  } 
  covid_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Fertőzöttek",
          data: cases,
          fill: true,
          borderColor: "#FFF",
          backroundColor: "#FFF",
          borderWitdth: 1
        },
        {
          label: "Gyógyultak",
          data: recovered,
          fill: false,
          borderColor: "#009688",
          backroundColor: "#009688",
          borderWitdth: 1
        },
        {
          label: "Elhunytak",
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