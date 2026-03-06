document.addEventListener("DOMContentLoaded", () => {
  // Get UI Elements
  const stateSelect = document.getElementById("state");
  const countySelect = document.getElementById("county");
  const taxForm = document.getElementById("tax-form");
  const resultSection = document.getElementById("result");
  const stateTaxDisplay = document.getElementById("state-tax");
  const countyTaxDisplay = document.getElementById("county-tax");
  const federalTaxDisplay = document.getElementById("federal-tax");
  const medicareTaxDisplay = document.getElementById("medicare-tax");
  const socialSecurityTaxDisplay = document.getElementById(
    "social-security-tax"
  );
  const totalTaxDisplay = document.getElementById("total-tax");
  const annualTaxDisplay = document.getElementById("annual-tax");
  const deductionsInput = document.getElementById("deductions");
  const resetButton = document.getElementById("reset");
  const funFactDisplay = document.getElementById("fun-fact");
  const taxTipDisplay = document.getElementById("tax-tip");

  // Tax Rates
  const federalTaxRate = 0.12,
    medicareTaxRate = 0.0145,
    socialSecurityRate = 0.062;

  const taxData = {
    California: {
      rate: 0.1,
      counties: {
        "Los Angeles": 0.02,
        "San Francisco": 0.025,
        "San Diego": 0.018,
        Sacramento: 0.019,
        Fresno: 0.017,
        Oakland: 0.021,
        Riverside: 0.016,
        Bakersfield: 0.015,
      },
    },
    Texas: {
      rate: 0.06,
      counties: {
        Austin: 0.015,
        Dallas: 0.012,
        Houston: 0.014,
        "San Antonio": 0.013,
        "El Paso": 0.011,
        Plano: 0.0125,
        Arlington: 0.0135,
        FortWorth: 0.0115,
      },
    },
    Florida: {
      rate: 0.05,
      counties: {
        Miami: 0.02,
        Orlando: 0.018,
        Tampa: 0.015,
        Jacksonville: 0.014,
        Tallahassee: 0.012,
        StPetersburg: 0.016,
        Hialeah: 0.0155,
        FortLauderdale: 0.017,
      },
    },
    NewYork: {
      rate: 0.07,
      counties: {
        "New York City": 0.03,
        Buffalo: 0.022,
        Rochester: 0.018,
        Albany: 0.02,
        Syracuse: 0.016,
        Yonkers: 0.021,
        Schenectady: 0.017,
        WhitePlains: 0.018,
      },
    },
    Illinois: {
      rate: 0.065,
      counties: {
        Chicago: 0.03,
        Springfield: 0.02,
        Naperville: 0.018,
        Peoria: 0.017,
        Rockford: 0.016,
        Aurora: 0.0175,
        Joliet: 0.018,
        Evanston: 0.019,
      },
    },
    Michigan: {
      rate: 0.0425,
      counties: {
        Detroit: 0.024,
        "Grand Rapids": 0.015,
        Flint: 0.01,
        Lansing: 0.01,
        "East Lansing": 0.01,
        AnnArbor: 0.016,
        Warren: 0.012,
        SterlingHeights: 0.013,
      },
    },

    Georgia: {
      rate: 0.0575,
      counties: {
        Atlanta: 0.02,
        Savannah: 0.018,
        Macon: 0.017,
        Augusta: 0.016,
        Columbus: 0.015,
      },
    },
    Washington: {
      rate: 0.0,
      counties: {
        Seattle: 0.03,
        Spokane: 0.025,
        Tacoma: 0.02,
        Bellevue: 0.018,
        Olympia: 0.017,
      },
    },
    Arizona: {
      rate: 0.045,
      counties: {
        Maricopa: 0.012,
        Pima: 0.011,
        Yavapai: 0.01,
        Coconino: 0.009,
        Mohave: 0.008,
      },
    },
    Colorado: {
      rate: 0.0463,
      counties: {
        Denver: 0.012,
        ElPaso: 0.011,
        Arapahoe: 0.01,
        Jefferson: 0.009,
        Boulder: 0.008,
      },
    },
    Indiana: {
      rate: 0.0323,
      counties: {
        Marion: 0.012,
        Lake: 0.011,
        Allen: 0.01,
        Hamilton: 0.009,
        StJoseph: 0.008,
      },
    },
    Iowa: {
      rate: 0.0853,
      counties: {
        Polk: 0.012,
        Linn: 0.011,
        Scott: 0.01,
        Johnson: 0.009,
        BlackHawk: 0.008,
      },
    },
    Kansas: {
      rate: 0.057,
      counties: {
        Johnson: 0.012,
        Sedgwick: 0.011,
        Shawnee: 0.01,
        Wyandotte: 0.009,
        Douglas: 0.008,
      },
    },
    Kentucky: {
      rate: 0.05,
      counties: {
        Jefferson: 0.012,
        Fayette: 0.011,
        Kenton: 0.01,
        Boone: 0.009,
        Warren: 0.008,
      },
    },
    Louisiana: {
      rate: 0.06,
      counties: {
        Orleans: 0.012,
        EastBatonRouge: 0.011,
        Jefferson: 0.01,
        Caddo: 0.009,
        Lafayette: 0.008,
      },
    },
    Massachusetts: {
      rate: 0.05,
      counties: {
        Suffolk: 0.012,
        Middlesex: 0.011,
        Worcester: 0.01,
        Essex: 0.009,
        Norfolk: 0.008,
      },
    },
    Minnesota: {
      rate: 0.0985,
      counties: {
        Hennepin: 0.012,
        Ramsey: 0.011,
        Dakota: 0.01,
        Anoka: 0.009,
        Washington: 0.008,
      },
    },
    Missouri: {
      rate: 0.054,
      counties: {
        StLouis: 0.012,
        Jackson: 0.011,
        StCharles: 0.01,
        Greene: 0.009,
        Clay: 0.008,
      },
    },

    NorthCarolina: {
      rate: 0.0525,
      counties: {
        Mecklenburg: 0.012,
        Wake: 0.011,
        Guilford: 0.01,
        Forsyth: 0.009,
        Cumberland: 0.008,
      },
    },
    Ohio: {
      rate: 0.0497,
      counties: {
        Franklin: 0.012,
        Cuyahoga: 0.011,
        Hamilton: 0.01,
        Summit: 0.009,
        Montgomery: 0.008,
      },
    },
    Oregon: {
      rate: 0.09,
      counties: {
        Multnomah: 0.012,
        Washington: 0.011,
        Clackamas: 0.01,
        Lane: 0.009,
        Marion: 0.008,
      },
    },
    Pennsylvania: {
      rate: 0.0307,
      counties: {
        Philadelphia: 0.012,
        Allegheny: 0.011,
        Montgomery: 0.01,
        Bucks: 0.009,
        Delaware: 0.008,
      },
    },
    SouthCarolina: {
      rate: 0.07,
      counties: {
        Greenville: 0.012,
        Richland: 0.011,
        Charleston: 0.01,
        Horry: 0.009,
        Spartanburg: 0.008,
      },
    },
    Tennessee: {
      rate: 0.0,
      counties: {
        Shelby: 0.012,
        Davidson: 0.011,
        Knox: 0.01,
        Hamilton: 0.009,
        Rutherford: 0.008,
      },
    },
    Utah: {
      rate: 0.0495,
      counties: {
        SaltLake: 0.012,
        Utah: 0.011,
        Davis: 0.01,
        Weber: 0.009,
        Washington: 0.008,
      },
    },
    Virginia: {
      rate: 0.0575,
      counties: {
        Fairfax: 0.012,
        PrinceWilliam: 0.011,
        Loudoun: 0.01,
        Chesterfield: 0.009,
        Henrico: 0.008,
      },
    },
    Wisconsin: {
      rate: 0.0765,
      counties: {
        Milwaukee: 0.012,
        Dane: 0.011,
        Waukesha: 0.01,
        Brown: 0.009,
        Racine: 0.008,
      },
    },
    Alabama: {
      rate: 0.05,
      counties: {
        Birmingham: 0.015,
        Montgomery: 0.012,
        Mobile: 0.013,
        Huntsville: 0.014,
        Tuscaloosa: 0.011,
      },
    },
    Alaska: {
      rate: 0.0,
      counties: {
        Anchorage: 0.01,
        Fairbanks: 0.009,
        Juneau: 0.008,
        Sitka: 0.007,
        Ketchikan: 0.006,
      },
    },
    Arkansas: {
      rate: 0.06,
      counties: {
        LittleRock: 0.015,
        Fayetteville: 0.014,
        FortSmith: 0.013,
        Springdale: 0.012,
        Jonesboro: 0.011,
      },
    },
    Connecticut: {
      rate: 0.07,
      counties: {
        Bridgeport: 0.02,
        NewHaven: 0.019,
        Stamford: 0.018,
        Hartford: 0.017,
        Waterbury: 0.016,
      },
    },
    Delaware: {
      rate: 0.055,
      counties: {
        Wilmington: 0.015,
        Dover: 0.014,
        Newark: 0.013,
        Middletown: 0.012,
        Smyrna: 0.011,
      },
    },
    Hawaii: {
      rate: 0.08,
      counties: {
        Honolulu: 0.025,
        Hilo: 0.023,
        Kailua: 0.022,
        PearlCity: 0.021,
        Waipahu: 0.02,
      },
    },
    Idaho: {
      rate: 0.0625,
      counties: {
        Boise: 0.018,
        Meridian: 0.017,
        Nampa: 0.016,
        IdahoFalls: 0.015,
        Pocatello: 0.014,
      },
    },
    Maine: {
      rate: 0.07,
      counties: {
        Portland: 0.02,
        Lewiston: 0.019,
        Bangor: 0.018,
        SouthPortland: 0.017,
        Auburn: 0.016,
      },
    },
    Maryland: {
      rate: 0.06,
      counties: {
        Baltimore: 0.02,
        Columbia: 0.019,
        Germantown: 0.018,
        SilverSpring: 0.017,
        Waldorf: 0.016,
      },
    },
    Mississippi: {
      rate: 0.05,
      counties: {
        Jackson: 0.015,
        Gulfport: 0.014,
        Southaven: 0.013,
        Hattiesburg: 0.012,
        Biloxi: 0.011,
      },
    },
    Montana: {
      rate: 0.0,
      counties: {
        Billings: 0.01,
        Missoula: 0.009,
        GreatFalls: 0.008,
        Bozeman: 0.007,
        Butte: 0.006,
      },
    },
    Nebraska: {
      rate: 0.055,
      counties: {
        Omaha: 0.018,
        Lincoln: 0.017,
        Bellevue: 0.016,
        GrandIsland: 0.015,
        Kearney: 0.014,
      },
    },
    Nevada: {
      rate: 0.0,
      counties: {
        LasVegas: 0.02,
        Henderson: 0.019,
        Reno: 0.018,
        NorthLasVegas: 0.017,
        Sparks: 0.016,
      },
    },
    NewHampshire: {
      rate: 0.0,
      counties: {
        Manchester: 0.015,
        Nashua: 0.014,
        Concord: 0.013,
        Derry: 0.012,
        Dover: 0.011,
      },
    },
    NewMexico: {
      rate: 0.045,
      counties: {
        Albuquerque: 0.018,
        LasCruces: 0.017,
        RioRancho: 0.016,
        SantaFe: 0.015,
        Roswell: 0.014,
      },
    },
    NorthDakota: {
      rate: 0.017,
      counties: {
        Fargo: 0.012,
        Bismarck: 0.011,
        GrandForks: 0.01,
        Minot: 0.009,
        WestFargo: 0.008,
      },
    },
    Oklahoma: {
      rate: 0.05,
      counties: {
        OklahomaCity: 0.02,
        Tulsa: 0.019,
        Norman: 0.018,
        BrokenArrow: 0.017,
        Edmond: 0.016,
      },
    },
    RhodeIsland: {
      rate: 0.06,
      counties: {
        Providence: 0.02,
        Warwick: 0.019,
        Cranston: 0.018,
        Pawtucket: 0.017,
        EastProvidence: 0.016,
      },
    },
    SouthDakota: {
      rate: 0.0,
      counties: {
        SiouxFalls: 0.015,
        RapidCity: 0.014,
        Aberdeen: 0.013,
        Brookings: 0.012,
        Watertown: 0.011,
      },
    },
    Vermont: {
      rate: 0.065,
      counties: {
        Burlington: 0.02,
        SouthBurlington: 0.019,
        Rutland: 0.018,
        Barre: 0.017,
        Montpelier: 0.016,
      },
    },
    WestVirginia: {
      rate: 0.06,
      counties: {
        Charleston: 0.015,
        Huntington: 0.014,
        Morgantown: 0.013,
        Parkersburg: 0.012,
        Wheeling: 0.011,
      },
    },
    Wyoming: {
      rate: 0.0,
      counties: {
        Cheyenne: 0.01,
        Casper: 0.009,
        Laramie: 0.008,
        Gillette: 0.007,
        RockSprings: 0.006,
      },
    },
  };

  // Populate Dropdowns
  Object.keys(taxData).forEach((state) => {
    const option = new Option(state, state);
    stateSelect.add(option);
  });

  stateSelect.addEventListener("change", () => {
    countySelect.innerHTML =
      '<option value="" disabled selected>Select a county</option>';
    Object.keys(taxData[stateSelect.value]?.counties || {}).forEach(
      (county) => {
        const option = new Option(county, county);
        countySelect.add(option);
      }
    );
  });

  // Tax Calculation
  taxForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const income = parseFloat(document.getElementById("income").value);
    const state = stateSelect.value,
      county = countySelect.value;
    const deductions = parseFloat(deductionsInput.value) || 0;

    if (!income || !state || !county)
      return alert("⚠️ Please fill out all fields before calculating.");

    let taxableIncome = Math.max(0, income - deductions);
    if (taxableIncome > 100000) taxableIncome *= 1.05;

    const stateTax = taxableIncome * taxData[state].rate;
    const countyTax = taxableIncome * taxData[state].counties[county];
    const federalTax = taxableIncome * federalTaxRate;
    const medicareTax = taxableIncome * medicareTaxRate;
    const socialSecurityTax = taxableIncome * socialSecurityRate;
    const totalTax =
      stateTax + countyTax + federalTax + medicareTax + socialSecurityTax;

    [
      [stateTaxDisplay, stateTax],
      [countyTaxDisplay, countyTax],
      [federalTaxDisplay, federalTax],
      [medicareTaxDisplay, medicareTax],
      [socialSecurityTaxDisplay, socialSecurityTax],
      [totalTaxDisplay, totalTax],
      [annualTaxDisplay, totalTax],
    ].forEach(([el, value]) => (el.textContent = `$${value.toFixed(2)}`));

    resultSection.classList.remove("hidden");
    resultSection.style.opacity = "0";
    setTimeout(() => (resultSection.style.opacity = "1"), 200);

    // Show Fun Fact & Tip
    funFactDisplay.textContent = [
      "💡 Did you know? The U.S. federal tax code is over 70,000 pages long!",
      "🤑 Some states, like Florida & Texas, have NO state income tax!",
      "🎩 In 1696, England introduced a 'window tax' – people bricked up their windows to avoid paying!",
      "📜 The first U.S. income tax was introduced in 1861 to fund the Civil War.",
      "🍕 In New York, if you buy a whole bagel, it's tax-free. But if it's sliced, you pay tax!",
    ][Math.floor(Math.random() * 5)];

    taxTipDisplay.textContent = [
      "📄 Tip: Keep detailed records of deductible expenses throughout the year.",
      "💼 Max out contributions to tax-deferred retirement accounts (like 401(k) or IRA).",
      "🏠 Deduct mortgage interest if you're a homeowner!",
      "🎁 Donating to charity? Save the receipts—it’s deductible!",
      "👨‍👩‍👧 Claim all dependents and education credits you're eligible for.",
      "💰 Use Flexible Spending Accounts (FSA) to pay for healthcare tax-free.",
    ][Math.floor(Math.random() * 6)];
  });

  // Reset Form
  resetButton.addEventListener("click", () => {
    taxForm.reset();
    resultSection.classList.add("hidden");
  });

  // Tip Carousel
  let tipIndex = 0;
  setInterval(() => {
    const tips = [
      "📄 Tip: Keep detailed records of deductible expenses throughout the year.",
      "💼 Max out contributions to tax-deferred retirement accounts (like 401(k) or IRA).",
      "🏠 Deduct mortgage interest if you're a homeowner!",
      "🎁 Donating to charity? Save the receipts—it’s deductible!",
      "👨‍👩‍👧 Claim all dependents and education credits you're eligible for.",
      "💰 Use Flexible Spending Accounts (FSA) to pay for healthcare tax-free.",
    ];
    taxTipDisplay.textContent = tips[tipIndex];
    tipIndex = (tipIndex + 1) % tips.length;
  }, 6000);
});
