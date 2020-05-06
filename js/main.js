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

function getUserTotalCost(plan) {
  userTotalPlanCost = [];
  getUserMonthlyValues().forEach((monthlyUsage) => {
    //adjust calc for new object
    userTotalPlanCost.push(calcMonthCost(monthlyUsage, plan));
  });
  return [userTotalPlanCost].reduce((acc, cur) => acc + cur, 0);
}

function createPlanElement(plan) {
  return `<div class="card">
                              <div class="card-body">
                                <h5 class="card-title">${plan.plan_name}</h5>
                                  <h6 class="card-subtitle mb-2 text-muted">${plan.company_name}</h6>
                                  <ul class="list-group list-group-flush">
                                  <li class="list-group-item">$${plan.user_calculated_costs.total}</li>
                                    <li class="list-group-item"><a href="${plan.fact_sheet}" target="_blank" rel="noopener noreferrer">Plan Fact Sheet</a></li>
                                  </ul>
                              </div>
                              </div>`;
}

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
  // Generate calculatedPlans onto the page (DOM) for the user to see
  for (plan in calculatedPlans) {
    var newElement = document.createElement("div");
    newElement.id = plan[plan];
    newElement.className = "plan";
    newElement.innerHTML = createPlanElement(calculatedPlans[plan]);
    document.body.appendChild(newElement);
  }
});
