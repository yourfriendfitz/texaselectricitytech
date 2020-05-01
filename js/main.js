// Define zip Code entry field
let userZIP = document.getElementById("userZIP");
// Define usage entry fields
let usageJan = document.getElementById("usageJan");
let usageFeb = document.getElementById("usageFeb");
let usageMar = document.getElementById("usageMar");
let usageApr = document.getElementById("usageApr");
let usageMay = document.getElementById("usageMay");
let usageJun = document.getElementById("usageJun");
let usageJul = document.getElementById("usageJul");
let usageAug = document.getElementById("usageAug");
let usageSep = document.getElementById("usageSep");
let usageOct = document.getElementById("usageOct");
let usageNov = document.getElementById("usageNov");
let usageDec = document.getElementById("usageDec");
// Define submit button
let usageSubmit = document.getElementById("usageSubmit");
// Define plan list
let planResults = document.getElementById("planResults");

usageSubmit.addEventListener("click", function () {
  let proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  let callAddress = `http://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${userZIP.value}`;
  fetch(proxyUrl + callAddress)
    .then((response) => response.json())
    .then((allPlans) => {
      console.log(allPlans);
      let allPlansHTMLoutput = `<div class="card">
                              <div class="card-body">
                                  <h5 class="card-title">${allPlans.data[0].plan_name}</h5>
                                  <h6 class="card-subtitle mb-2 text-muted">${allPlans.data[0].company_name}</h6>
                                  <ul class="list-group list-group-flush">
                                      <li class="list-group-item"><a href="${allPlans.data[0].fact_sheet}" target="_blank" rel="noopener noreferrer">Plan Fact Sheet</a></li>
                                      
                                  </ul>
                              </div>
                          </div>`;
      planResults.innerHTML = allPlansHTMLoutput;
    });
});
