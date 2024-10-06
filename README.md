# Map-project
## README: Mapbox Interactive Map Project

This project showcases a basic interactive map built using Mapbox GL JS. The project allows users to:

* Search for locations and get directions.
* Explore different travel modes (cycling, walking, driving).
* View distance and duration of routes.
* Find nearby restaurants, schools, and parks.

### Files:

1. **mapbox.html**:
   * **Basic HTML Structure**: Contains the HTML code for the map container, sidebar elements, search bar, travel mode buttons, and route information display.
   * **Head Section:**
     * Imports Mapbox GL JS library.
     * Links to external CSS files `mapbox.css` for styling.
   * **Body Section:**
     * **Header:** Displays the project title.
     * **Container:**
       * **Sidebar:** Contains elements for user interaction: search bar, travel mode buttons, feature buttons, route information.
       * **Map Container:**  A `div` with id `map` that will be rendered by Mapbox GL JS.
     * **Footer:** Provides project contact information.
   * **Script Tags:**
     * Imports Mapbox GL JS library.
     * Links to external JavaScript file `mapbox.js` for map functionality.


2. **mapbox.css**:
   * **Styling for the HTML elements:** Applies styles for the sidebar, buttons, search bar, and other elements, defining their layout, appearance, and responsiveness.
   * **Mapbox GL JS styles:** Provides initial styling for the map itself (e.g., default zoom level, background color, etc.)


3. **mapbox.js**:
   * **Map Initialization:** Creates a Mapbox GL JS map instance within the `map` container, setting the initial location, zoom level, and other map configuration options.
   * **Search Functionality:** Handles user input from the search bar, geocodes locations, and displays markers on the map.
   * **Directions Calculation:** Calculates routes using Mapbox Directions API based on user input and selected travel mode.
   * **Route Display:**  Draws the calculated routes on the map using Mapbox GL JS.
   * **Route Information:**  Extracts distance and duration from the calculated route and updates the `distance` and `duration` elements in the sidebar.
   * **Feature Button Functionality:**
     * **Find Restaurants:**  Searches for nearby restaurants using the Mapbox Geocoding API and displays markers on the map.
     * **Find Schools:**  Searches for nearby schools and displays markers.
     * **Find Parks:**  Searches for nearby parks and displays markers.
   * **Travel Mode Handling:**
     * **Cycling, Walking, Driving:**  Changes the travel mode used for route calculation when the corresponding buttons are clicked.
     * **Route Update:** Recalculates and redraws the route when the travel mode changes.

### Usage:

1. Open `mapbox.html` in a web browser.
2. Enter your desired location and optional destination in the search bar.
3. Click the "Search & Get Directions" button to generate a route.
4. Use the travel mode buttons to explore different routes.
5. Use the "Find Nearby" buttons to search for restaurants, schools, or parks in the area.

### Requirements:

* **Web browser:** Modern web browser supporting HTML5 and JavaScript (Chrome, Firefox, Safari, Edge).
* **Mapbox account:** Create a free account on [https://account.mapbox.com/](https://account.mapbox.com/) and obtain a Mapbox access token. You will need to replace the placeholder `your-mapbox-access-token` in `mapbox.js` with your actual token.

### Notes:

* The provided code is a basic example and can be further customized.
* For more advanced functionality and customizations, refer to the [Mapbox GL JS documentation](https://docs.mapbox.com/mapbox-gl-js/api/).
* Consider using a library like `mapbox-gl-geocoder` for a more robust and user-friendly search experience.

**This documentation is a starting point for understanding the project structure and key functionalities.  Feel free to explore the code and add your own features to enhance the map application!**
