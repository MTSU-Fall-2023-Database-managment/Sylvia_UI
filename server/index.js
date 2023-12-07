const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const axios = require('axios');

app.use(cors());
app.use(express.json());

const pass = "xxx";
const database = "xxx";
const STOCKAPI = `xxx`;
const datatype = "json";
const outputsize = "compact";

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: pass,
    database: database
});

const mapTableNameToTimeSeries = (tablename) => {
    switch (tablename) {
        case 'rawintraday':
            return 'TIME_SERIES_INTRADAY';
        case 'rawdaily':
            return 'TIME_SERIES_DAILY';
        case 'rawweekly':
            return 'TIME_SERIES_WEEKLY';
        case 'rawmonthly':
            return 'TIME_SERIES_MONTHLY';
        default:
            return null;
    }
};

const mapTimeSeriesToTableName = (timeSeries) => {
    switch (timeSeries) {
        case 'TIME_SERIES_INTRADAY':
            return 'rawintraday';
        case 'TIME_SERIES_DAILY':
            return 'rawdaily';
        case 'TIME_SERIES_WEEKLY':
            return 'rawweekly';
        case 'TIME_SERIES_MONTHLY':
            return 'rawmonthly';
        default:
            return null;
    }
};  // Need to wrap the table below so it knows where to insert the data.

app.post('/api/insertData', async (req, res) => {
    const { symbol, table } = req.body;

    // Determine the correct AlphaVantage endpoint based on the timeSeries
    const timeSeriesKey = mapTimeSeriesToTableName(table);
    console.log(timeSeriesKey);
    console.log(table); // Somehow it's not recognizing the table passed to Alpha Vantage, this will be future development
    if (!timeSeriesKey) {
        return res.status(400).send('Invalid time series type');
    }

    try {
        console.log(`Table: ${table}, Symbol: ${symbol}, API Key: ${STOCKAPI}`);
        // Make a request to the AlphaVantage API
        const apiResponse = await axios.get(`https://www.alphavantage.co/query?function=${table}&symbol=${symbol}&outputsize=${outputsize}&datatype=${datatype}&apikey=${STOCKAPI}`);
        
        // Determine the key for the time series data
        console.log(apiResponse.data);
        const timeSeriesDataKey = Object.keys(apiResponse.data).find(key => key.includes("Time Series"));
        if (!timeSeriesDataKey) {
            throw new Error("Time series data not found in response");
        }

        // Extract the time series data
        const timeSeriesData = apiResponse.data[timeSeriesDataKey];

        // Iterate over the time series data and insert into the database
        Object.entries(timeSeriesData).forEach(([timestamp, dataPoint]) => {
            const query = `INSERT INTO ${timeSeriesKey} (symbol, timestamp, open, high, low, close, volume) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            db.query(
                query,
                [symbol, timestamp, dataPoint['1. open'], dataPoint['2. high'], dataPoint['3. low'], dataPoint['4. close'], dataPoint['5. volume']],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                }
            );
        });

        res.send("Data inserted successfully");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("An error occurred while inserting data");
    }
});

app.get('/api/retrieveData', (req, res) => {
    let { table, symbol, startDate, endDate } = req.query;

    switch (table) {
        case 'Intraday':
            table = 'rawintraday';
            break;
        case 'Daily':
            table = 'rawdaily';
            break;
        case 'Weekly':
            table = 'rawweekly';
            break;
        case 'Monthly':
            table = 'rawmonthly';
            break;
        default:
            return res.status(400).send('Table not recognized');
    }

    let query = `SELECT * FROM ??`;
    let queryParams = [table];

    let conditions = [];

    if (symbol) {
        if (symbol.startsWith('[') && symbol.endsWith(']')) {
            try {
                symbolsArray = JSON.parse(symbol);
                conditions.push(`Symbol IN (?)`);
                queryParams.push(symbolsArray);
            } catch (e) {
                return res.status(400).send("Invalid symbols format");
            }
        } else {
            symbolsArray = symbol.split(',').map(sym => sym.trim());
            conditions.push(`Symbol IN (?)`);
            queryParams.push(symbolsArray);
        }
    }
    if (startDate) {
        conditions.push('TimeStamp >= ?');
        queryParams.push(startDate);
    }
    if (endDate) {
        conditions.push('TimeStamp <= ?');
        queryParams.push(endDate);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while retrieving data");
        } else {
            res.json(result);
            console.log(result);
            console.log("Success");
        }
    });
});

app.post('/api/removeData', (req, res) => {
    const { symbols, timeSeriesTable } = req.body;

    // List of valid time series tables for validation
    const validTables = ['rawintraday', 'rawdaily', 'rawweekly', 'rawmonthly'];

    // Validate the table name
    if (!validTables.includes(timeSeriesTable)) {
        return res.status(400).send('Invalid time series table');
    }

    // Split and sanitize the symbols for multiple value deletion
    const symbolArray = symbols.split(',').map(symbol => {
        let sanitizedSymbol = symbol.trim().toUpperCase();
        if (!/^[A-Z0-9]+$/.test(sanitizedSymbol)) {
            return null;
        }
        return sanitizedSymbol;
    }).filter(Boolean);

    if (symbolArray.length === 0) {
        return res.status(400).send('No valid symbols provided');
    }

    const query = `DELETE FROM ?? WHERE symbol IN (?)`;
    
    db.query(query, [timeSeriesTable, symbolArray], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while removing data");
        } else {
            res.send(`Removed ${result.affectedRows} rows from ${mapTableNameToTimeSeries(timeSeriesTable)}`);
        }
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
