class ReportCard extends HTMLElement {
  datas = {current: 123, changed: +0};

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
      <span style="font-size: 1em;">${this.datas.changed}</span>
    `;
  }
}

customElements.define("report-card", ReportCard);