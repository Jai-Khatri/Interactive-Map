# Interactive Map Project

## Overview
The **Interactive Map** project is a dynamic, location-based web application built using **React**, **Leaflet**, and **MongoDB**. The app allows users to interact with an interactive map, search for locations, and visualize geospatial data. It's designed to be highly responsive and mobile-friendly, with features like real-time data fetching, role-based access control, and state management using **Zustand**.

## Key Features

- **Interactive Map**: Users can interact with a map powered by **Leaflet** and **React-Leaflet**. Location data is dynamically rendered, and markers are placed on the map for easy visualization.
- **Search Functionality**: The app supports real-time location search with **react-leaflet-search**, making it easy to find and navigate to specific locations.
- **State Management**: **Zustand** is used for efficient state management, allowing smooth UI updates when the map or data changes.
- **Authentication**: Secure login and registration systems are implemented using **JWT**, with role-based access control to restrict certain features for admin users.
- **MongoDB Backend**: Location data is stored in a **MongoDB** database with geospatial queries, ensuring quick and scalable data access.
- **Responsive Design**: The UI is designed with **Tailwind CSS**, ensuring an optimal user experience across mobile, tablet, and desktop devices.

## Technologies

- **React**
- **Leaflet & React-Leaflet**
- **Zustand**
- **Tailwind CSS**
- **MongoDB** (for storing location data)
- **JWT Authentication**

## Installation

To get the project running locally:

### Backend Setup
1. Clone the repo: `git clone https://github.com/Jai-Khatri/Interactive-Map`
2. Navigate to the backend directory.
3. Install dependencies: `npm install`
4. Run the server in development mode: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Conclusion
The **Interactive Map** project provides a robust foundation for location-based applications, with real-time map interaction, user authentication, and an easy-to-use UI. It is designed for scalability and flexibility, making it ideal for future enhancements.

