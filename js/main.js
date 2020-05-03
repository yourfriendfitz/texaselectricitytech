// Define zip Code entry field
let userZipCodeValue = document.getElementById("userZIP").value;
// Define submit button
let usageSubmit = document.getElementById("usageSubmit");
// Define plan list
let planResults = document.getElementById("planResults");

/**
 * Calculates the cost per month.
 *
 * @param monthlyUsageCost The cost for the month give
 * @param plan The plan you want to calculate the cost for
 * @returns the cost per month
 */
function calcMonthCost(monthlyUsageCost, plan) {
  if (monthlyUsageCost == 0) {
    return 0;
  } else if (monthlyUsageCost <= 500) {
    // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
    return (
      ((monthlyUsageCost * plan.price_kwh500) / 500 / 100) * monthlyUsageCost
    );
  } else if (monthlyUsageCost <= 1000) {
    // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
    return (
      ((monthlyUsageCost * plan.price_kwh1000) / 1000 / 100) * monthlyUsageCost
    );
  } else {
    // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
    return (
      ((monthlyUsageCost * plan.price_kwh2000) / 2000 / 100) * monthlyUsageCost
    );
  }
}

// for each plan in array
// make rates for no entry (0), 0-500, 500-1000, 1000-2000, 200+ for each plan and then apply for each month with if statements
// If UsageJan == 0, then JanCost is 0
// elseif 0 < UsageJan < 500 then JanCost = UsageJan * Usage500to1000rate
// do this for each tier and add up totals
// sort array by lowest cost

/**
 * Gets the plans from the powertochoose API from the provided zip code
 *
 * @param userZipCode The zip code to get the plans for
 * @returns a promise of the available plans from the API
 */
function getPlans(userZipCode) {
  let proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  let callAddress = `http://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${userZipCode}`;
  return fetch(proxyUrl + callAddress, {
    cache: "force-cache",
  }).then((response) => response.json());
}

/**
 * Gets the user's monthly cost values by the input
 */
function getUserMonthlyValues() {
  return [
    document.getElementById("usageJan").value,
    document.getElementById("usageFeb").value,
    document.getElementById("usageMar").value,
    document.getElementById("usageApr").value,
    document.getElementById("usageMay").value,
    document.getElementById("usageJun").value,
    document.getElementById("usageJul").value,
    document.getElementById("usageAug").value,
    document.getElementById("usageSep").value,
    document.getElementById("usageOct").value,
    document.getElementById("usageNov").value,
    document.getElementById("usageDec").value,
  ];
}

function getUserAnnualCost() {
  return getUserMonthlyValues().reduce((a, b) => a + b, 0);
}

usageSubmit.addEventListener("click", async () => {
  const availablePlans = await getPlans(
    document.getElementById("userZIP").value
  );

  userMonthlyValues = getUserMonthlyValues();

  // TODO: iterate through every plan
  availablePlans.forEach((plan) => {
    // TODO: iterate through each monthly value inside of each plan
    userMonthlyValues.forEach((monthValue, index) => {
      // TODO: create a card for each month in each plan
    });

    // FIX: display the data
    planResults.innerHTML = `<div class="card">
                                 <div class="card-body">
                                     <h5 class="card-title">${allPlans.data[index].plan_name}</h5>
                                     <h6 class="card-subtitle mb-2 text-muted">${allPlans.data[index].company_name}</h6>
                                     <ul class="list-group list-group-flush">
                                     <li class="list-group-item">Total Estimated Cost: $${totalCost}</li>
                                         <li class="list-group-item"><a href="${allPlans.data[index].fact_sheet}" target="_blank" rel="noopener noreferrer">Plan Fact Sheet</a></li>
                                     </ul>
                                 </div>
                             </div>`;
  });
});
