CyberOps Command: Operations & Forecasting Dashboard
An interactive, futuristic dashboard for visualizing and analyzing operational efficiency and forecasting demand. Built with React, TypeScript, and Tailwind CSS, this application provides a "CyberOps" command center interface to monitor key order fulfillment metrics. It features animated backgrounds, glowing UI elements, and a responsive layout to create an immersive user experience.

![Operations Dashboard]([images/operations_dashboard.png](https://1drv.ms/i/c/96ba7930e3fa1138/EWdlYOJUR0tEnUyorfQADtcB7o1Bk-B8FEhYBZSRj_xK6Q?e=RC3uXo))

 Features
Interactive Dashboard: A single-pane view of critical metrics in a sci-fi inspired interface.
Key Metrics: Track Total Orders, Service-Level Compliance, and Average Processing Time with visually distinct "Metric Pods".
Demand Forecasting: Visualize historical order volume against a simulated future forecast using an animated Recharts line chart.
Categorical Analysis: An interactive donut chart displays order distribution by category, allowing for quick insights.
Dynamic Filtering: Filter the entire dashboard's data by product category (Electronics, Apparel, etc.) or view an aggregation of all data.
Detailed Data View: A separate "Order Details" tab presents a sortable and paginated table for inspecting individual orders.
Futuristic UI/UX: A unique theme with an animated grid background, glowing effects, and custom-styled components to create a command center feel.
Responsive Design: Fully responsive layout optimized for various screen sizes, from large monitors to mobile devices.
Build-less Setup: Uses ES modules via esm.sh for a rapid, zero-config development experience.
 Tech Stack
Framework: React 19
Language: TypeScript
Styling: Tailwind CSS
Charting: Recharts
Icons: Font Awesome
Module Loading: esm.sh CDN (via import maps)
 Getting Started
This project is designed to run directly in a modern browser without a complex build process, thanks to import maps.
Prerequisites
You only need a local web server to serve the files correctly. You can use any simple server, such as the Live Server extension for VS Code, or Python's built-in server.
Installation & Running
Clone the repository:
Generated bash

Bash
Start a local web server in the project's root directory.
Using the Live Server VS Code Extension:
Install the Live Server extension.
Right-click on index.html and select "Open with Live Server".
Using Python:
Generated bash
# For Python 3
python -m http.server

# For Python 2
python -m SimpleHTTPServer
Use code with caution.
Bash
Open your browser and navigate to http://localhost:5500 (for Live Server) or http://localhost:8000 (for Python's server), or the port your server is running on.
 Code Structure
The project follows a standard React component-based architecture.
Generated code
/
├── components/           # Reusable React components
│   ├── AnalysisSection.tsx
│   ├── CategoryDonutChart.tsx
│   ├── DataPanel.tsx
│   ├── Footer.tsx
│   ├── ForecastChart.tsx
│   ├── Header.tsx
│   ├── MetricPod.tsx
│   ├── OrderTable.tsx
│   └── Tabs.tsx
│
├── constants.ts          # Mock data and constant values
├── types.ts              # TypeScript type definitions and interfaces
├── App.tsx               # Main application component, state management
├── index.html            # Main HTML file with import maps and styles
├── index.tsx             # React entry point
