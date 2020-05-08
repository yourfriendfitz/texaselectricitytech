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
    // if usage is 0 set cost to 0
    return 0;
  } else if (monthlyUsage <= 500) {
    // if usage is less than 500, calculate rate of change from 0 to 500 kWh and apply to usage
    return (
      (((plan.price_kwh500 - 0) / (500 - 0)) * monthlyUsage * monthlyUsage) /
      100
    );
  } else if (monthlyUsage <= 1000) {
    // if usage is less than 1000, calculate rate of change from 500 to 1000 kWh and apply to usage
    return (
      (((monthlyUsage - 500) *
        ((plan.price_kwh1000 - plan.price_kwh500) / (1000 - 500)) +
        plan.price_kwh500) *
        monthlyUsage) /
      100
    );
  } else {
    // if usage is more than 1000, calculate rate of change from 1000 to 2000 kWh and apply to usage
    return (
      (((monthlyUsage - 1000) *
        ((plan.price_kwh2000 - plan.price_kwh1000) / (2000 - 1000)) +
        plan.price_kwh1000) *
        monthlyUsage) /
      100
    );
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

  return await fetch(proxyUrl + callAddress, {
    cache: "force-cache",
  })
    .then((response) => response.json())
    .then((body) => body.data);
}

/**
 * Gets the user's monthly cost values by the input
 */
function getUserMonthlyValues() {
  return [
    {
      name: "Jan",
      value: document.getElementById("usageJan").value,
    },
    {
      name: "Feb",
      value: document.getElementById("usageFeb").value,
    },
    {
      name: "Mar",
      value: document.getElementById("usageMar").value,
    },
    {
      name: "Apr",
      value: document.getElementById("usageApr").value,
    },
    {
      name: "May",
      value: document.getElementById("usageMay").value,
    },
    {
      name: "Jun",
      value: document.getElementById("usageJun").value,
    },
    {
      name: "Jul",
      value: document.getElementById("usageJul").value,
    },
    {
      name: "Aug",
      value: document.getElementById("usageAug").value,
    },
    {
      name: "Sep",
      value: document.getElementById("usageSep").value,
    },
    {
      name: "Oct",
      value: document.getElementById("usageOct").value,
    },
    {
      name: "Nov",
      value: document.getElementById("usageNov").value,
    },
    {
      name: "Dec",
      value: document.getElementById("usageDec").value,
    },
  ];
}

/**
 * Calculates total cost per plan by taking user monthly usage, passing to calcMonthCost, and reducing to total
 *
 * @param userTotalPlanCost an array of all monthly costs reduced to total cost
 * @param plan the plan you want to calculate the total cost for
 * @returns reducted total cost per plan based on user monthly usage values
 */

function getUserTotalCost(plan) {
  userTotalPlanCost = [];
  getUserMonthlyValues().forEach((monthlyUsage) => {
    //adjust calc for new object
    userTotalPlanCost.push(calcMonthCost(monthlyUsage, plan));
  });
  return [userTotalPlanCost].reduce((acc, cur) => acc + cur, 0);
}

/**
 * Generate HTML elements for each plan
 */
function createPlanElement(plan) {
  return `<div class="card h-100" style="width: 21.8rem;">
              <img src="${
                plan.company_logo
              }" class="card-img-top" alt="Card image cap">
                              <div class="card-body">
                                  <h5 class="card-title" id="plan-title">${
                                    plan.plan_name
                                  }</h5>
                                  <h6 class="card-subtitle mb-2 text-muted">${
                                    plan.company_name
                                  }</h6>
                                  </div>
                                  <ul class="list-group list-group-flush">
                                  <li class="list-group-item"><b>Estimated Total Cost:</b> $${plan.user_calculated_costs.total.toFixed(
                                    2
                                  )}</li>
                                  <li class="list-group-item"><b>Minumum Usage Charge?:</b> ${
                                    plan.minimum_usage
                                  }</li>
                                  <li class="list-group-item"><b>New Customers Only?:</b> ${
                                    plan.new_customer
                                  }</li>
                                  <li class="list-group-item"><b>Other Price Details:</b> ${
                                    plan.pricing_details
                                  }</li>
                                  <li class="list-group-item"><b>Promotions:</b> ${
                                    plan.promotions
                                  }</li>
                                  <li class="list-group-item"><b>Renewable Energy:</b> ${
                                    plan.renewable_energy_description
                                  }</li>
                                  <li class="list-group-item">
                                  <button type="button" class="btn btn-outline-info btn-block" data-toggle="modal" data-target="#modal${
                                    plan.plan_id
                                  }">
                                  <i class="fas fa-asterisk"></i> Special Terms
                                  </button>

                                  <!-- Modal -->
                                  <div class="modal fade" id="modal${
                                    plan.plan_id
                                  }" tabindex="-1" role="dialog" aria-labelledby="modal${
    plan.plan_id
  }Label" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="modal${
                                            plan.plan_id
                                          }Label">${
    plan.plan_name
  } Special Terms</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                        ${plan.special_terms}
                                        </div>
                                        <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  </li>
                                    <li class="list-group-item"><a href="${
                                      plan.fact_sheet
                                    }" class="btn btn-outline-info btn-block" target="_blank" rel="noopener noreferrer"><i class="fas fa-search-dollar"></i> Plan Fact Sheet</a></li>
                                  </ul>
                             
                <div class="card-footer border-0">
                <a href="${
                  plan.go_to_plan
                }" class="btn btn-primary btn-block" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-signature"></i> Sign Up On Provider Site</a>
              </div>
            </div>`;
}

/**
 * Gets costs for all plans based on user usage and appends them to the availablePlans array
 *
 * @param calculatedPlans All plans with the monthly and total costs appended to them
 * @returns an array with all plans including all monthly and total costs
 */
function calculateCostsForAllPlans(userMonthlyValues, availablePlans) {
  const calculatedPlans = [];
  // iterate through every plan
  availablePlans.forEach((plan, index) => {
    calculatedPlans.push({
      ...plan, //copy all same values
      user_calculated_costs: {
        total: 0,
        months: [],
      },
    });
    // iterate through each monthly value inside of each plan
    userMonthlyValues.forEach((month) => {
      const monthCalculatedCost = calcMonthCost(month.value, plan);
      calculatedPlans[index].user_calculated_costs.total =
        calculatedPlans[index].user_calculated_costs.total +
        monthCalculatedCost;
      calculatedPlans[index].user_calculated_costs.months.push({
        name: month.name,
        cost: monthCalculatedCost,
      });
    });
  });
  console.log(calculatedPlans);
  return calculatedPlans;
}

/**
 * Upon clicking the button, grab all data inputs and async function to append zip to api for fetch. Then, appy usage cost calculation to all plans and sort by ascending order. Then, iterate through while rendering HTML elements
 *
 * @param topCalculatedPlans calculated plans sorted in ascending order by total cost, sliced
 */

usageSubmit.addEventListener("click", async () => {
  const availablePlans = await getPlans(
    document.getElementById("userZIP").value
  );
  const calculatedPlans = calculateCostsForAllPlans(
    getUserMonthlyValues(),
    availablePlans
  );
  // Sort by user's costs (ascending)
  calculatedPlans.sort(function (a, b) {
    return a.user_calculated_costs.total - b.user_calculated_costs.total;
  });
  // slice all but the 5 lowest cost plans for display
  var topCalculatedPlans = calculatedPlans.slice(0, 9);
  // Generate calculatedPlans onto the page (DOM) for the user to see
  for (plan in topCalculatedPlans) {
    var newElement = document.createElement("div");
    newElement.id = [plan];
    newElement.className = "plan  mb-4";
    newElement.innerHTML = createPlanElement(topCalculatedPlans[plan]);
    planResults.appendChild(newElement);
  }
  var firstPlan = document.getElementById("0");
  var bestBadge = document.createElement("span");
  bestBadge.className = "badge badge-primary";
  bestBadge.innerHTML = "Best Plan";
  firstPlan.insertBefore(bestBadge, firstPlan.firstChild);
});
