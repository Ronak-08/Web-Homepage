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

	
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const dayOfWeek = days[today.getDay()];
        const dateOfMonth = today.getDate();

        // Format the output as "Sun 21"
        const formattedDate = `${dayOfWeek} ${dateOfMonth}`;

        // Update the HTML element with id="currentDay"
        document.getElementById('currentDay').textContent = formattedDate;
        
        
	



const apiKey = 'db5a5dd4233284f22f468c35dad5f8ff';

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

 

    updateWeatherInfo(cityName, temperature, description, icon);
    localStorage.setItem('savedCity', cityName);  // Save city name to local storage
  } else {
    console.log('City not found. Please check the city name and try again.');
  }
}

function updateWeatherInfo(cityName, temperature, description, icon) {
  document.getElementById('city-name').textContent = cityName;
  document.getElementById('temperature').textContent = `${temperature}°`;
  document.getElementById('description').textContent = description;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById('weather-icon').src = iconUrl;

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
  document.getElementById('overlay').style.display = 'block';
 
  var popup = document.getElementById('popup');
  popup.style.display = 'flex';
}

function updateName() {
  var newName = document.getElementById('newName').value;
  document.getElementById('name').textContent = newName;
  // Save the new name to localStorage
  localStorage.setItem('savedName', newName);
  closePopup();
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
 
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
    document.documentElement.style.backgroundImage = `url(${imageUrl})`;
    document.documentElement.style.backgroundSize = 'cover';
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





// Function to set the color to both the CSS variable and local storage
function setColorAndStore(color) {
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('selectedColor', color);
}

// Event listener for clicking the button to show the color picker


// Event listener for when the color picker value changes
document.getElementById('colorPicker').addEventListener('input', function() {
    let selectedColor = this.value;
    
    // Set the color and store it in local storage
    setColorAndStore(selectedColor);
});

// Check local storage on page load to set the color if it was previously selected
document.addEventListener('DOMContentLoaded', function() {
    let storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
        setColorAndStore(storedColor);
    }
});


// Function to set the color to both the CSS variable and local storage
function setColorAndStor(color) {
    document.documentElement.style.setProperty('--srcbar', color);
    localStorage.setItem('selectedColo', color);
}

// Event listener for clicking the button to show the color picker


// Event listener for when the color picker value changes
document.getElementById('colorPicker').addEventListener('input', function() {
    let hexColor = this.value;
    let rgbaColor = hexToRgba(hexColor, 0.429); // Always set alpha to 0.329 (33% opacity)

    // Set the color and store it in local storage
    setColorAndStor(rgbaColor);
});

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

// Check local storage on page load to set the color if it was previously selected
document.addEventListener('DOMContentLoaded', function() {
    let storedColo = localStorage.getItem('selectedColo');
    if (storedColo) {
        setColorAndStor(storedColo);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('toggle');
    var container = document.querySelector('.bg');

    // Check localStorage for saved state
    var isChecked = localStorage.getItem('newsDisabled') === 'true';
    checkbox.checked = isChecked;
    updateContainerVisibility(isChecked);

    // Function to update container visibility based on checkbox state
    function updateContainerVisibility(disabled) {
        if (disabled) {
            container.style.display = "none";
        } else {
            container.style.display = "block";
        }
    }

    // Event listener for checkbox change
    checkbox.addEventListener('change', function() {
        var isChecked = checkbox.checked;
        localStorage.setItem('newsDisabled', isChecked); // Save state to localStorage
        updateContainerVisibility(isChecked);
    });
});


window.addEventListener('scroll', function() {
        var searchContainer = document.getElementById('searchContainer');

        if (window.pageYOffset > 310) { // Adjust the value if needed
            searchContainer.classList.add('sticky');
            
        
            
        } else {
            searchContainer.classList.remove('sticky');
        }
    });
    
    

let deleteMode = false;

function toggleDeleteMode() {
    deleteMode = !deleteMode;
    const linkContainers = document.querySelectorAll('.link-container');
    linkContainers.forEach(container => {
        const deleteButton = container.querySelector('.delete-button');
        deleteButton.style.display = deleteMode ? 'block' : 'none';
        
        container.classList.toggle('delete-mode', deleteMode);
    });
}

function addLink() {
    const url = document.getElementById('urlInput').value;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.innerHTML = `<img src="${faviconUrl}" alt="icon">`;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.style.display = deleteMode ? 'block' : 'none';
    deleteButton.onclick = function() {
        deleteLink(url);
    };

    const linkContainer = document.createElement('div');
    linkContainer.className = 'link-container';
    linkContainer.appendChild(link);
    linkContainer.appendChild(deleteButton);

    document.getElementById('iconsContainer').appendChild(linkContainer);

    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ url: url });
    localStorage.setItem('links', JSON.stringify(links));

    document.getElementById('urlInput').value = '';
}

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const iconsContainer = document.getElementById('iconsContainer');

    links.forEach(linkData => {
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${linkData.url}`;

        const link = document.createElement('a');
        link.href = linkData.url;
        link.target = '_blank';
        link.innerHTML = `<img src="${faviconUrl}" alt="icon">`;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.style.display = deleteMode ? 'block' : 'none';
        deleteButton.onclick = function() {
            deleteLink(linkData.url);
        };

        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';
        linkContainer.appendChild(link);
        linkContainer.appendChild(deleteButton);

        iconsContainer.appendChild(linkContainer);
    });
}

function deleteLink(url) {
    const iconsContainer = document.getElementById('iconsContainer');
    const linkContainers = iconsContainer.getElementsByClassName('link-container');

    for (let i = 0; i < linkContainers.length; i++) {
        const link = linkContainers[i].getElementsByTagName('a')[0];
        if (link && link.href === url) {
            iconsContainer.removeChild(linkContainers[i]);
            break;
        }
    }

    let links = JSON.parse(localStorage.getItem('links')) || [];
    links = links.filter(linkData => linkData.url !== url);
    localStorage.setItem('links', JSON.stringify(links));
}

window.onload = loadLinks;




const searchEngineSelector = document.getElementById('searchEngine');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Load the previously selected search engine from local storage
    const savedEngine = localStorage.getItem('selectedSearchEngine');
    if (savedEngine) {
      searchEngineSelector.value = savedEngine;
      searchForm.action = savedEngine;
      const selectedOptionText = searchEngineSelector.options[searchEngineSelector.selectedIndex].text.trim();
      searchInput.placeholder = `Search on ${selectedOptionText}...`;
    }

    searchEngineSelector.addEventListener('change', function() {
      const selectedEngine = this.value;
      searchForm.action = selectedEngine;
      const selectedOptionText = this.options[this.selectedIndex].text.trim();
      searchInput.placeholder = `Search on ${selectedOptionText}...`;
      
      // Save the selected search engine to local storage
      localStorage.setItem('selectedSearchEngine', selectedEngine);
    });

    // Ensure form submission works on Enter key press
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        searchForm.submit();
      }
    });




document.getElementById('searchInput').addEventListener('input', function() {
    let query = this.value;

    if (query.length > 0) {
        fetchSuggestions(query);
    } else {
        clearSuggestions();
    }
});

function fetchSuggestions(query) {
    const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&callback=handleSuggestions`;

    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

function handleSuggestions(data) {
    displaySuggestions(data[1]);
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions');
    clearSuggestions();

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('p');
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.addEventListener('click', function() {
            document.getElementById('searchInput').value = suggestion;
            clearSuggestions();
            
            document.getElementById('searchForm').submit(); // Submit the form
      
        });
        suggestionsList.appendChild(suggestionItem);
    });
}

function clearSuggestions() {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '';
}

document.getElementById('searchEngine').addEventListener('change', function() {
    document.getElementById('searchForm').action = this.value;
});





const avatar = document.querySelector('.avatar');
        const fileInput = document.getElementById('file-input');

        // Load image from local storage if it exists
        const storedImage = localStorage.getItem('uploadedAvatar');
        if (storedImage) {
            avatar.src = storedImage;
        }

        avatar.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target.result;
                    avatar.src = result;
                    localStorage.setItem('uploadedAvatar', result); // Save the image to local storage
                };
                reader.readAsDataURL(file);
            }
        });
        
        
    
 function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    document.getElementById("defaultOpen").click();