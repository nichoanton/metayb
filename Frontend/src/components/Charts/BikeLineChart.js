import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import bikesData from "../../dummyDatas/bikesData";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const BikeLineChart = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const filterDataByDateRange = (data, from, to) => {
    if (from && to) {
      return data.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(from) && entryDate <= new Date(to);
      });
    }
    return data;
  };

  const filteredData = filterDataByDateRange(bikesData, fromDate, toDate);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ marginRight: "20px" }}>
          <label style={{ marginRight: "10px" }}>From: </label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="yyyy-MM-dd"
            maxDate={toDate}
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>To: </label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={fromDate}
            placeholderText="Select end date"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Honda" stroke="#8884d8" />
          <Line type="monotone" dataKey="Yamaha" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Enfield" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BikeLineChart;

// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const BikeLineChart = () => {
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [bikesData, setBikesData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let query = "";
//         if (fromDate && toDate) {
//           query = `?from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`;
//         }
//         const response = await fetch(`/api/bikes/assembly-logs${query}`);
//         const data = await response.json();
//         setBikesData(data);
//       } catch (error) {
//         console.error("Error fetching bike data:", error);
//       }
//     };

//     fetchData();
//   }, [fromDate, toDate]);

//   const filterDataByDateRange = (data, from, to) => {
//     if (from && to) {
//       return Object.keys(data).filter((date) => {
//         const entryDate = new Date(date);
//         return entryDate >= new Date(from) && entryDate <= new Date(to);
//       }).map(date => ({ date, ...data[date] }));
//     }
//     return Object.keys(data).map(date => ({ date, ...data[date] }));
//   };

//   const filteredData = filterDataByDateRange(bikesData, fromDate, toDate);

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <div style={{ marginRight: "20px" }}>
//           <label style={{ marginRight: "10px" }}>From: </label>
//           <DatePicker
//             selected={fromDate}
//             onChange={(date) => setFromDate(date)}
//             dateFormat="yyyy-MM-dd"
//             maxDate={toDate}
//             placeholderText="Select start date"
//           />
//         </div>
//         <div>
//           <label style={{ marginRight: "10px" }}>To: </label>
//           <DatePicker
//             selected={toDate}
//             onChange={(date) => setToDate(date)}
//             dateFormat="yyyy-MM-dd"
//             minDate={fromDate}
//             placeholderText="Select end date"
//           />
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="Honda" stroke="#8884d8" />
//           <Line type="monotone" dataKey="Yamaha" stroke="#82ca9d" />
//           <Line type="monotone" dataKey="Enfield" stroke="#ff7300" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BikeLineChart;

