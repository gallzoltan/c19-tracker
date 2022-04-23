const baseUrl = 'https://covid-api.mmediagroup.fr/v1';

const covidApi = {
  async getCurrentDatas(ab){
    const response = await fetch(`${baseUrl}/cases?ab=${ab}`);
    if (response.status !== 200) {
      throw 'Error loading Covid current data';
    }
    
    const d = await response.json();
    return d.All;
  }
  

}
export default covidApi;