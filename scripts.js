function updateTime() {
  const timeElement = document.getElementById('timeElement');
  const currentDate = new Date();

  // Extract hours and minutes
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Convert to 12-hour format
  const isPM = hours >= 12;
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 becomes 12)

  // Format minutes to always show two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Combine hours and minutes without AM/PM
  const formattedTime = `${hours}:${formattedMinutes}`;

  // Update the time element
  timeElement.textContent = formattedTime;
}

// Call the updateTime function every second to keep the time updated
setInterval(updateTime, 1000);

// Initial call to display the time immediately when the page loads
updateTime();

	
	



const apiKey = 'db5a5dd4233284f22f468c35dad5f8ff';

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    updateWeatherInfo(cityName, temperature, description);
    localStorage.setItem('savedCity', cityName);  // Save city name to local storage
  } else {
    console.log('City not found. Please check the city name and try again.');
  }
}

function updateWeatherInfo(cityName, temperature, description) {
  document.getElementById('city-name').textContent = cityName;
  document.getElementById('temperature').textContent = `${temperature}°C`;
  document.getElementById('description').textContent = description;
}

function handleCitySearch() {
  const cityName = document.getElementById('city-input').value;
  if (cityName) {
    getWeather(cityName);
  }
}

// Load saved city weather on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedCity = localStorage.getItem('savedCity');
  if (savedCity) {
    getWeather(savedCity);
  }
});




function showPopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'block';
}

function updateName() {
  var newName = document.getElementById('newName').value;
  document.getElementById('name').textContent = newName;
  // Save the new name to localStorage
  localStorage.setItem('savedName', newName);
  closePopup();
}

function closePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
}

// Function to load the saved name when the page loads
window.onload = function() {
  var savedName = localStorage.getItem('savedName');
  if (savedName) {
    document.getElementById('name').textContent = savedName;
  }
};





const checkbox = document.getElementById('backgroundToggle');

function setBackground() {
    const imageUrl = 'https://picsum.photos/1920/1080/?random&blur';
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
}

function handleCheckboxChange() {
    if (checkbox.checked) {
        localStorage.setItem('backgroundToggle', 'checked');
        setBackground();
    } else {
        localStorage.removeItem('backgroundToggle');
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = '#121212';
    }
}

// Check the localStorage to set the checkbox state on page load
if (localStorage.getItem('backgroundToggle') === 'checked') {
    checkbox.checked = true;
    setBackground();
}

// Add event listener to the checkbox
checkbox.addEventListener('change', handleCheckboxChange);

// Set an interval to change the background every 60 minutes (3600000 milliseconds)
setInterval(() => {
    if (checkbox.checked) {
        setBackground();
    }
}, 3600000);




// Function to convert hex to RGBA with fixed alpha
function hexToRgba(hex, alpha) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');
    
    // Parse r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    // Return RGBA string with fixed alpha
    return `rgba(${r},${g},${b},${alpha})`;
}

// Function to set color and save to localStorage
function setColorAndSave(variableName, hexColor, alpha = 1) {
    let cssVariable = `--${variableName}`;
    let colorValue = alpha === 1 ? hexColor : hexToRgba(hexColor, alpha);
    
    // Update CSS variable
    document.documentElement.style.setProperty(cssVariable, colorValue);
    
    // Save selected color to localStorage
    localStorage.setItem(variableName, hexColor);
}

// Function to initialize colors on page load
function initializeColors() {
    initializeColor('accent');
    initializeColor('srcbar');
}

// Function to initialize specific color on page load
function initializeColor(variableName) {
    // Retrieve selected color from localStorage
    let selectedColor = localStorage.getItem(variableName);
    if (selectedColor) {
        let alpha = variableName === 'accent' ? 1 : 0.329; // Set alpha based on variable
        setColorAndSave(variableName, selectedColor, alpha);
        // Set color picker value to match stored color
        document.getElementById('colorPicker').value = selectedColor;
    }
}

// Event listener for color picker input
document.getElementById('colorPicker').addEventListener('input', function() {
    let hexColor = this.value;
    setColorAndSave('srcbar', hexColor, 0.329); // Always set alpha to 0.329 (33% opacity)
});

// Event listener for button to show color picker
document.getElementById('showColorPicker').addEventListener('click', function() {
    document.getElementById('colorPicker').click();
});

// Call initializeColors() when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeColors();
});
