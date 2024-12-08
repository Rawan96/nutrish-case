# Nutrish Case Solution

This repository contains the solution to the Nutrish case challenge, where the goal is to fetch nutritional data from Examine.com and integrate it into a chatbot using the Vercel AI SDK.

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Approach to the Problem](#approach-to-the-problem)
- [Challenges Faced and Solutions](#challenges-faced-and-solutions)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)

## Project Overview

The goal of this project is to build a system that enables an AI chatbot to fetch nutritional information from Examine.com. The chatbot, powered by the Vercel AI SDK, can answer queries about various supplements by retrieving data from Examine.com in real time.

### Key Features:

1. **Data Fetching**: A script that takes a supplement name (e.g., "creatine") as input and retrieves the corresponding data from Examine.com, such as nutritional benefits, recommended dosages, and other relevant details.
2. **API Response Format**: The data is structured into a clean and readable JSON format, suitable for integration into the chatbot.
3. **Chatbot Integration**: The chatbot uses the Vercel AI SDK to interact with the data-fetching tool, providing users with answers based on real-time data from Examine.com.

This solution is built to be modular, scalable, and easy to extend, providing a foundation for future enhancements, such as expanding the data sources or improving the AI’s understanding of complex queries.

## Setup Instructions

Follow these steps to set up and run the project:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18 or higher)
- **TypeScript**
- **Git** for cloning the repository

### Steps to Set Up:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/nutrish-case.git
   cd nutrish-case

   ```

2. **Install dependencies**:
   In the project directory, install all necessary dependencies by running:

   ```bash
   npm install
   ```

3. **Start the server**:
   To start the server, run the following command:

   ```bash
   npm start
   Once the server is running, go to the following link in your browser:
   http://localhost:3000/api/creatine
   ```

## Approach to the Problem

### Step 1: Fetching Data from Examine.com

The first step in this solution is fetching nutritional data dynamically from Examine.com for a specific supplement or article. Since Examine.com does not provide a public API, I used a web scraping approach to retrieve the necessary information. Here's how the process works:

1. **Web Scraping with Puppeteer and Cheerio**:

   - I use **Puppeteer** to launch a headless browser and fetch the HTML content of the specific page on Examine.com based on the user’s query.
   - **Cheerio** is then used to parse the HTML content and extract relevant details like supplement benefits, recommended dosages, and other information such as summary and sections from the page.

2. **Fetching Dynamic Data**:

   - The `fetchDynamicData` function receives a query (e.g., a supplement name like "creatine") and a type (defaulted to "supplements").
   - The URL for the specific page on Examine.com is dynamically constructed, and the page is fetched using Puppeteer.
   - Once the page content is loaded, Cheerio extracts the necessary details, and the data is returned in a structured JSON format.

3. **Handling Errors**:
   - If the page can't be fetched or the content is missing, the system gracefully handles errors and returns appropriate responses to the user.

### Step 2: Chatbot Integration

The second part of the solution integrates the data-fetching functionality into an AI-powered chatbot, built using the Vercel AI SDK.

1. **Custom AI Tool**:

   - I created a custom tool within the AI chatbot, which uses the `fetchDynamicData` function to retrieve nutritional data from Examine.com based on the user’s query.
   - The tool receives a query and type parameter, fetches the data, and formats the result in a conversational manner for the user.

By using Puppeteer for scraping and Cheerio for parsing, combined with the AI chatbot’s capabilities, this solution offers a seamless way to fetch and deliver detailed nutritional information from Examine.com.

## Challenges Faced and Solutions

### 1. Handling Data Fetching from Examine.com

- **Challenge**: Examine.com doesn’t provide a formal API, so scraping the data required working around potential issues such as dynamically loaded content and varying page structures.
- **Solution**: To handle this, I used `puppeteer` for fetching the HTML content of Examine.com pages. Since the site has dynamic content, `puppeteer` allows rendering the page before scraping the necessary data. I then used `cheerio` to parse the HTML and extract the relevant details, such as supplement information. By carefully inspecting the page’s DOM structure, I pinpointed the necessary elements to extract.

### 3. Integrating with Vercel AI SDK

- **Challenge**: Integrating the data-fetching tool with the Vercel AI SDK was initially tricky, as it required understanding the SDK’s architecture and ensuring that the tool works seamlessly within the AI system.
- **Solution**: To resolve this, I created a custom tool using Vercel’s SDK, which serves as a bridge between the AI chatbot and the `fetchDynamicData` function. This integration allows the chatbot to dynamically fetch data from Examine.com based on user input and return it in a structured format, making the user interaction smooth and intuitive.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side logic and handling requests.
- **TypeScript**: Provides type safety and enhanced maintainability.
- **Vercel AI SDK**: A framework for building and deploying AI-powered tools.
- **Cheerio**: A lightweight HTML parser for web scraping and extracting data.
- **Puppeteer**: A library for headless browsing, used to render dynamic content from web pages.
