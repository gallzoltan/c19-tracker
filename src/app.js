import './scss/style.scss'
import './scss/loader.scss'
import covidApi from './services/covidApi';
import ReportCard from './components/ReportCard.js'
import CountryList from './components/CountryList';

const loader = document.querySelector("#loading");

window.addEventListener('DOMContentLoaded', () => {   
  loadComponents(); 
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
});

const loadComponents = () => {
  customElements.define("report-card", ReportCard);
  customElements.define("country-list", CountryList);
}

const renderCurrentDatas = (ab) => {
  const cardConfirmed = document.getElementById('confirmed');
  const cardRecovered = document.getElementById('recovered');
  const cardDeaths= document.getElementById('deaths');
  loadCurrentData(ab).then(res => {
    const local = Intl.NumberFormat('hu-HU');
    cardConfirmed.setDatas({current: local.format(res.confirmed), update: res.updated});
    cardRecovered.setDatas({current: local.format(res.recovered), update: res.updated});
    cardDeaths.setDatas({current: local.format(res.deaths), update: res.updated});
    hideLoading();
  });
}

const loadCurrentData = async (ab) => {
  try {
    const result = await covidApi.getCurrentDatas(ab); 
    //console.log(result);
    return result;
  } catch (e) {
    console.error('Error loading current Covid data', e);
    throw e;
  }
}

const displayLoading = () => {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 10000);
}

const hideLoading = () => {
  loader.classList.remove("display");
}