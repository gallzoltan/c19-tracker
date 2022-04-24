import countries from '../services/countries.js'

export default class CountryList extends HTMLElement {
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    let option = "";    
    countries.forEach((country, index) => {
      option += `<option value="${country.code}">${country.name}</option>`;
    });
    
    this.innerHTML = `
      <select name="countries" id="countries">
      ${option}
      </select>
    `;
  }
}