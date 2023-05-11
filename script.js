const laborContainer = document.querySelector('#labor');
const APP_TOKEN = 'Zp1auL6kU6EUlBE4ZBzgqJyG5'; // <- Replace this with your app token
const DATASET_IDENTIFIER = '2z24-2htf'; // <- Replace this with the ID for the data resource that you want to look up

const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$$app_token=${APP_TOKEN}&$query=SELECT%0A%20%20%60intake_date%60%2C%0A%20%20%60language%60%2C%0A%20%20%60request_type%60%2C%0A%20%20%60topic%60%2C%0A%20%20%60outcome%60%2C%0A%20%20%60industry%60`;

let laborDOM = ""

const formatDate = (dateTime) => {
  const dateObject = new Date(dateTime);
  return dateObject.toLocaleString("en-US", {
    dateStyle: "medium",
});
};

console.log(`Fetching url - ${url}`);

fetch(url)
  .then((response) => response.json())
  .then((json) => {
      console.log(json);
      json.forEach(function(labor) {
        laborDOM += `
        <div class="labor-item">
        <div class="labor-topic">${labor.topic}</div>
        <div class="labor-outcome">${labor.outcome}</div>
        <div class="labor-info">${labor.language}<br>
        ${labor.request_type}<br>
        ${formatDate(labor.intake_date)}</div>
        </div>`;
      });
      laborContainer.innerHTML = laborDOM;
  });
  
var acc = document.getElementsByClassName("accordion");
var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {

      this.classList.toggle("active");
  
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  var selects = Array.from(document.getElementsByClassName("selector")).map(
    (selector)=>selector.getElementsByTagName("select")[0])
  
  
  for (var j = 0; j < selects.length; j++) {
    let select = selects[j]
    select.addEventListener("change", function(){
        console.log(select.value)
        // do something after selecting dropdown
      }
    )
  }
  
var submit = document.getElementsByClassName("submit")[0]
  submit.addEventListener("click", function () {
    laborStuff = document.getElementsByClassName("labor-item")
    console.log(laborStuff)
    for (var k=0; k < laborStuff.length; k++){
      laborEntry = laborStuff[k]
      display = []
      for (var j=0; j < selects.length; j++){
        if (selects[j].value != "None"){
          if (selects[j].name == 'topic'){ // Filter by topic
            var text = laborEntry.getElementsByClassName("labor-topic")[0].textContent
            display.push(text == selects[j].value)
          } else if (selects[j].name == 'requesttype'){ // Filter by request type
            var text = laborEntry.getElementsByClassName("labor-info")[0].textContent.split('\n')[0]
            display.push(text == selects[j].value)
          } else if (selects[j].name == 'outcome'){ // Filter by outcome
            var text = laborEntry.getElementsByClassName("labor-outcome")[0].textContent
            display.push(text == selects[j].value)
          }
        } else {
          display.push(true)
        }
      }
      if (display.every(Boolean)){ // display if all values in display are true
        laborEntry.style.display = 'flex'
      } else {
        laborEntry.style.display = 'none'
      }
    }
  })
