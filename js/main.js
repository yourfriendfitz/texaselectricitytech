// Define zip Code entry field
let userZipCodeValue = document.getElementById("userZIP").value;
// Define submit button
let usageSubmit = document.getElementById("usageSubmit");
// Define plan list
let planResults = document.getElementById("planResults");

/**
 * Calculates the cost per month.
 *
 * @param monthlyUsage The usage for the month given
 * @param plan The plan you want to calculate the cost for
 * @returns the cost per month
 */
function calcMonthCost(monthlyUsage, plan) {
  if (monthlyUsage == 0) {
    return 0;
  } else if (monthlyUsage <= 500) {
    // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
    return ((monthlyUsage * plan.price_kwh500) / 500 / 100) * monthlyUsage;
  } else if (monthlyUsage <= 1000) {
    // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
    return ((monthlyUsage * plan.price_kwh1000) / 1000 / 100) * monthlyUsage;
  } else {
    // usage in KwH times 500 Kwh cost (in cents) divided by 500 KwH = rate for usage in cents / 100 * usage = cost for usage in dollars
    return ((monthlyUsage * plan.price_kwh2000) / 2000 / 100) * monthlyUsage;
  }
}

/**
 * Gets the plans from the powertochoose API from the provided zip code
 *
 * @param userZipCode The zip code to get the plans for
 * @returns a promise of the available plans from the API
 */
async function getPlans(userZipCode) {
  let proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  let callAddress = `http://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${userZipCode}`;

  const response = await fetch(proxyUrl + callAddress, {
    cache: "force-cache",
  });
  return await response.json();
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

  // iterate through every plan
  Array.prototype.forEach.call(availablePlans.data, (plan) => {
    // iterate through each monthly value inside of each plan
    Array.prototype.forEach.call(userMonthlyValues, (month) => {
      console.log(calcMonthCost(month, plan));
      // console.log(getUserAnnualCost(plan)); // this still isn't woring - it's adding all the values up across all plans
    });
    planCard = `<div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">${plan.plan_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${
                                      plan.company_name
                                    }</h6>
                                    <ul class="list-group list-group-flush">
                                      <li class="list-group-item">January Estimated Cost: $${calcMonthCost(
                                        usageJan.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">February Estimated Cost: $${calcMonthCost(
                                        usageFeb.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">March Estimated Cost: $${calcMonthCost(
                                        usageMar.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">April Estimated Cost: $${calcMonthCost(
                                        usageApr.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">May Estimated Cost: $${calcMonthCost(
                                        usageMay.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">June Estimated Cost: $${calcMonthCost(
                                        usageJun.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">July Estimated Cost: $${calcMonthCost(
                                        usageJul.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">August Estimated Cost: $${calcMonthCost(
                                        usageAug.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">September Estimated Cost: $${calcMonthCost(
                                        usageSep.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">October Estimated Cost: $${calcMonthCost(
                                        usageOct.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">November Estimated Cost: $${calcMonthCost(
                                        usageNov.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item">December Estimated Cost: $${calcMonthCost(
                                        usageDec.value,
                                        plan
                                      )}</li>
                                      <li class="list-group-item"><a href="${
                                        plan.fact_sheet
                                      }" target="_blank" rel="noopener noreferrer">Plan Fact Sheet</a></li>
                                    </ul>
                                </div>
                              </div>`;
  });
  planResults.innerHTML = planCard;
});
