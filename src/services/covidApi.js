const baseUrl = 'https://covid-api.mmediagroup.fr/v1';

const covidApi = {
  
  async getCurrentDatas(ab) {
    const response = await fetch(`${baseUrl}/cases?ab=${ab}`);
    if (response.status !== 200) {
      throw 'Error loading Covid current data';
    }
    
    const d = await response.json();
    return d.All;
  },

  async getHistoryAllState(ab) {
    const urls = [
      `${baseUrl}/history?ab=${ab}&status=confirmed`,
      `${baseUrl}/history?ab=${ab}&status=recovered`,
      `${baseUrl}/history?ab=${ab}&status=deaths`
    ];
    const response = Promise.all(
      urls.map( url => fetch(url).then(res => res.json()) )
    );
    
    return await response;
  }

}
export default covidApi;