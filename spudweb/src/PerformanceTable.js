import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const s3Url = 'https://tatertech.net/data/perf.csv'; // Replace with your actual S3 URL

const PerformanceTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(s3Url, {
          headers: {
            'Content-Type': 'text/csv',
            'Accept': 'text/csv',
          },
        });
        const csvData = response.data;
        console.log('Fetched CSV data:', csvData); // Log the fetched CSV data

        // Parse the CSV data
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            console.log('Parsed CSV data:', result.data); // Log the parsed CSV data
            setHeaders(result.meta.fields);
            setData(result.data);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortTable = (key) => {
    if (!data) return;

    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      sortedData.reverse();
      setSortConfig({ key, direction: 'descending' });
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
    setData(sortedData);
  };

  const renderTableHeader = () => {
    return headers.map((header, index) => (
      <th key={index} onClick={() => sortTable(header)}>
        {header} {sortConfig && sortConfig.key === header ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
      </th>
    ));
  };

  const renderTableData = () => {
    return data.map((row, index) => (
      <tr key={index}>
        {headers.map((header, i) => (
          <td key={i}>{row[header]}</td>
        ))}
      </tr>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Performance Table</h1>
      <table id="performanceTable">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{data && renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default PerformanceTable;
