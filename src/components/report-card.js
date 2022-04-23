export default class ReportCard extends HTMLElement {
  datas = {current: 0, update: ''};

  constructor() {
    super();
  }
  
  connectedCallback() {
    this.render();
  }

  setDatas(datas){
    this.datas = datas;
    this.render();
  }

  render(){
    this.innerHTML = `
      <h4>${this.getAttribute('title')}</h4>
      <span style="font-size: 1.5em;">${this.datas.current}</span><br/>
      <span style="font-size: 1em;">${this.datas.update}</span>
    `;
  }
}