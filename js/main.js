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

// add another event listener for click to grab inputs from date fields

// for each plan in array
// make rates for no entry (0), 0-500, 500-1000, 1000-2000, 200+ for each plan and then apply for each month with if statements
// If UsageJan == 0, then JanCost is 0
// elseif 0 < UsageJan < 500 then JanCost = UsageJan * Usage500to1000rate
// do this for each tier and add up totals
// sort array by lowest cost

usageSubmit.addEventListener("click", function () {
  let proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  let callAddress = `http://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${userZIP.value}`;
  fetch(proxyUrl + callAddress)
    .then((response) => response.json())
    .then((allPlans) => {
      console.log(allPlans);
      for (index = 0; index < allPlans.data.length; index++) {
        let costJan = 0;
        if (usageJan.value == 0) {
          costJan = 0;
        } else if (usageJan.value <= 500) {
          costJan =
            ((usageJan.value * allPlans.data[index].price_kwh500) / 500 / 100) *
            usageJan.value; // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
        } else if (usageJan <= 1000) {
          costJan =
            ((usageJan.value * allPlans.data[index].price_kwh1000) /
              1000 /
              100) *
            usageJan.value; // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
        } else {
          costJan =
            ((usageJan.value * allPlans.data[index].price_kwh2000) /
              2000 /
              100) *
            usageJan.value; // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
        }

        console.log(costJan);
        console.log(allPlans.data[index].plan_name);
      }

      //   let allPlansHTMLoutput = `<div class="card">
      //                           <div class="card-body">
      //                               <h5 class="card-title">${allPlans.data[0].plan_name}</h5>
      //                               <h6 class="card-subtitle mb-2 text-muted">${allPlans.data[0].company_name}</h6>
      //                               <ul class="list-group list-group-flush">
      //                                   <li class="list-group-item"><a href="${allPlans.data[0].fact_sheet}" target="_blank" rel="noopener noreferrer">Plan Fact Sheet</a></li>

      //                               </ul>
      //                           </div>
      //                       </div>`;
      //   planResults.innerHTML = allPlansHTMLoutput;
    });
});
