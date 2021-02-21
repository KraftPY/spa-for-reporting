export default {
  getReportsFromAPI() {
    const link = 'https://my-json-server.typicode.com/FrizenVladyslav/vue-test-task/reports'
    return fetch(link)
      .then((res) => res.json())
      .then((data) => data)
  }
}