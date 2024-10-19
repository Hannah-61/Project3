# **Climate Change Visualization Web Application**

A web-based interactive visualization tool that allows users to explore global climate change trends through temperature variations. The application allows filtering temperature data based on seasons and years, visualizing the impact of climate change globally on a map.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [How to Use](#how-to-use)

---

## **Project Overview**

This project is aimed at visualizing the effects of climate change by presenting temperature variations over the years for various countries. Users can filter data by seasons and years, and visualize temperature change on an interactive map using **Leaflet.js**.


The dataset is sourced from Kaggle (https://www.kaggle.com/code/sevgisarac/climate-change/notebook) and contains temperature change data for different countries, measured over decades. The backend is built using **Flask** (Python), and the frontend is based on ** JavaScript** with **Leaflet.js** for map visualizations. Data is stored in a **PostgreSQL** database.

---

## **Features**

- Interactive map visualization of temperature change data.
- Filter data by seasons (Winter, Spring, Summer, Fall) and year.
- Display country-specific temperature changes by clicking on a country.
- Dynamic color updates for countries based on temperature change values.
- RESTful API for fetching climate data.
  
---

## **Technologies Used**

- **Frontend**:
  - **HTML5**, **CSS3**, **JavaScript**
  - **Leaflet.js** (for interactive maps)

- **Backend**:
  - **Flask** (Python web framework)
  - **SQLAlchemy** (for database interaction)
  - **PostgreSQL** (database for storing temperature change data)

- **Others**:
  - **GeoJSON** (for country borders and geographical data)
  - **CSV** (source data from Kaggle)
  - **Python** libraries like `pandas` for data handling

---

## **Getting Started**

Follow these instructions to set up the project locally on your machine.

### **Prerequisites**

Make sure you have the following installed on your system:

- **Python 3.x**
- **PostgreSQL**
- **Git**

### **Installation**

1. **Clone the repository**:

    ```bash
    git clone git@github.com:Hannah-61/Project3.git
    cd Project3
    ```

2. **Set up PostgreSQL database**:

    - Create a new database named `climate_db` in PostgreSQL.
    - Create the necessary tables by running the backend\data_import.py file.

3. **Run Flask server**:

    ```bash
    flask run
    ```

4. **Serve the frontend**:

    Open the `index.html` file in your browser or use a local server to serve it.

---

## **API Endpoints**

Here are the main API endpoints available in the backend:

- **GET /api/data/all-countries?season=&year=**
    - Returns filtered data of temperature changes for all countries based on the selected season and year.
    - Query Parameters:
      - `season`: String (e.g., `"Jun?Jul?Aug"`)
      - `year`: String (e.g., `"2020"`)

---

## **How to Use**

1. **Select a Season and Year**:
   - Use the dropdown selectors to choose a season (e.g., "Winter, Spring, Summer, Fall") and a year (e.g., "2020").

2. **View the Map**:
   - The map will automatically update to display temperature changes for all countries during the selected period. Countries will be shaded with colors representing the severity of temperature change.

---




# **Questions/Discussion**
1. Which ten countries have experienced the greatest temperature increase in the last ten years, and how does this compare to the ten countries with the least change?(Tianyi)
2. Is there a noticeable trend in temperature change over the years? Is there any remarkable trend between the years according to World, annex I countries and non-annex I countries? If there is, can we split these as periods?(Hanife)
3. How does temperature change vary by season, and is there a significant difference between the seasonal trends across the world? (Rahul)
4. conclusion (Sayeda)
