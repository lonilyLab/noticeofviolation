const laborContainer = document.querySelector('#labor');
const APP_TOKEN = 'Zp1auL6kU6EUlBE4ZBzgqJyG5'; // <- Replace this with your app token
const DATASET_IDENTIFIER = '2z24-2htf'; // <- Replace this with the ID for the data resource that you want to look up

const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$$app_token=${APP_TOKEN}&$query=SELECT%0A%20%20%60intake_date%60%2C%0A%20%20%60language%60%2C%0A%20%20%60request_type%60%2C%0A%20%20%60topic%60%2C%0A%20%20%60outcome%60%2C%0A%20%20%60industry%60`;

let laborDOM = ""

const formatDate = (dateTime) => {
  const dateObject = new Date(dateTime);
  return dateObject.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
});
};

console.log(`Fetching url - ${url}`);

fetch(url)
  .then((response) => response.json())
  .then((json) => {
      console.log(json);
      json.forEach(function(labor) {
        laborDOM += `<li>${labor.language} ${formatDate(labor.intake_date)} ${labor.request_type} ${labor.topic} ${labor.outcome}</li>`;
      });
      laborContainer.innerHTML = laborDOM;
  });