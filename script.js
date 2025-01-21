const conversions = {
    length: {
        units: ["meters", "kilometers", "miles", "inches", "feet"],
        convert: {
            meters: (value) => value,
            kilometers: (value) => value / 1000,
            miles: (value) => value / 1609.344,
            inches: (value) => value * 39.3701,
            feet: (value) => value * 3.28084,
        }
    },
    weight: {
        units: ["grams", "kilograms", "pounds", "ounces"],
        convert: {
            grams: (value) => value,
            kilograms: (value) => value / 1000,
            pounds: (value) => value / 453.592,
            ounces: (value) => value * 0.035274,
        }
    },
    temperature: {
        units: ["Celsius", "Fahrenheit", "Kelvin"],
        convert: {
            Celsius: (value) => value,
            Fahrenheit: (value) => (value * 9/5) + 32,
            Kelvin: (value) => value + 273.15,
        }
    }
};

// Initialize with the default conversion type (length)
let currentConversionType = "length";

function updateConversionOptions() {
    currentConversionType = document.getElementById("conversionType").value;
    populateUnitSelectors();
    convertUnit(); // Reconvert when conversion type changes
}

function populateUnitSelectors() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    const units = conversions[currentConversionType].units;
    
    // Clear previous options
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";
    
    units.forEach(unit => {
        const optionFrom = document.createElement("option");
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        fromUnitSelect.appendChild(optionFrom);
        
        const optionTo = document.createElement("option");
        optionTo.value = unit;
        optionTo.textContent = unit;
        toUnitSelect.appendChild(optionTo);
    });
}

function convertUnit() {
    const inputValue = document.getElementById("numberInput").value;
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    // If no input, don't convert
    if (!inputValue) {
        document.getElementById("result").textContent = "Please enter a number to convert.";
        return;
    }
    
    const valueInBaseUnit = conversions[currentConversionType].convert[fromUnit](parseFloat(inputValue));
    const convertedValue = conversions[currentConversionType].convert[toUnit](valueInBaseUnit);
    
    document.getElementById("result").textContent = `${inputValue} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
}

// Initialize the page with length conversion options
window.onload = function() {
    populateUnitSelectors();
};
