# SYLVIA UI

We developed an application with the goal of pulling and analyzing stock data.

<hr>

In this project, we implement an API backend using .NET that works as a stand alone console application. As a reach goal we wanted to also implement an interactive frontend using React connecting with Express.js.

## Key Features:

- Add and Remove stock data easily into your database
- View your current database data from a Dashboard with date filters
- Analyze your data with selected charts
- View Real-Time News on Fiance

## Building the API

To build the API open the Sylvia_API repo and follow that README.

## Building the UI

The UI consists of running both the server and the application.

### Running the Server
Navigate to the server directory, open the terminal and run the command. node .\index.js
This will start the server on a specified local port.

### Running the UI Application Locally
From the root directory, open the terminal and run the command. npm start
This will run the application in your localhost.

### Connecting to Database from UI
In the index.js file on the server you will need to update the credentials to access the your database.
Along with the STOCKAPI KEY.

### APIs Used
We are using the AlphaVantage API and the NEWS API.
You will need to setup your own API on both of these sites linked here.

[Alpha Vantage](https://www.alphavantage.co/)
[NEWS API](https://newsapi.org/)

### How to use the UI
You can request data from the Alpha Vantage by clicking the Get Data button in the Navbar and entering the stock data you are requesting. 
This currently will give you the last 100 days of data.

If you want view your stocks then go to the Dashboard Tab, and filter by stock and dates.
When wanting to see all date avaliable just select the function.

### Viewing Analytics
Currently the Analytics tab only shows the past 30 days of a selected stock.
This will show the Min and Max closing price, and the Min and Max Volume.
Specifically in the chart, if you see a red datapoint, this represents that the day's volume was 2x greater than the previous day. If Volume is steady then datapoints will be Blue.

<hr>

## GitHub

[Sylvia App](https://github.com/gyaikhom/huffman)
