import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import employeeData from "../../dummyDatas/employeeData";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const EmployeeBarChart = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const uniqueEmployees = [...new Set(employeeData.map(emp => emp.employee))];

  const filterData = () => {
    return employeeData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const isDateInRange = (!fromDate || entryDate >= new Date(fromDate)) && 
                            (!toDate || entryDate <= new Date(toDate));
      return (selectedEmployee ? entry.employee === selectedEmployee : true) && isDateInRange;
    });
  };

  const filteredData = filterData();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ marginRight: "20px" }}>
          <label style={{ marginRight: "10px" }}>Select Employee: </label>
          <select 
            value={selectedEmployee} 
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {uniqueEmployees.map((employee, index) => (
              <option key={index} value={employee}>{employee}</option>
            ))}
          </select>
        </div>
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
        <BarChart 
          data={filteredData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" /> 
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Honda" fill="#8884d8" />
          <Bar dataKey="Yamaha" fill="#82ca9d" />
          <Bar dataKey="Enfield" fill="#ff7300" />
          <Bar dataKey="totalBikes" fill="#000000" />
          <Bar dataKey="totalTime" fill="#ff00ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeBarChart;

// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const EmployeeBarChart = () => {
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [employeeData, setEmployeeData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let query = "";
//         if (fromDate && toDate) {
//           query = `?from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`;
//         }
//         const response = await fetch(`/api/bikes/assembly-logs${query}`);
//         const data = await response.json();
//         console.log('Fetched employee data:', data);
//         setEmployeeData(data);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchData();
//   }, [fromDate, toDate]);

//   const uniqueEmployees = [...new Set(
//     Object.keys(employeeData).flatMap(date =>
//       Object.keys(employeeData[date])
//     )
//   )];

//   const filterData = () => {
//     const filtered = [];
//     Object.keys(employeeData).forEach((date) => {
//       Object.keys(employeeData[date]).forEach((employee) => {
//         if (!selectedEmployee || employee === selectedEmployee) {
//           filtered.push({ date, employee, ...employeeData[date][employee] });
//         }
//       });
//     });
//     return filtered;
//   };

//   const filteredData = filterData();

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <div style={{ marginRight: "20px" }}>
//           <label style={{ marginRight: "10px" }}>Select Employee: </label>
//           <select 
//             value={selectedEmployee} 
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//           >
//             <option value="">All Employees</option>
//             {uniqueEmployees.map((employee, index) => (
//               <option key={index} value={employee}>{employee}</option>
//             ))}
//           </select>
//         </div>
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
//         <BarChart 
//           data={filteredData} 
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" /> 
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Honda" fill="#8884d8" />
//           <Bar dataKey="Yamaha" fill="#82ca9d" />
//           <Bar dataKey="Enfield" fill="#ff7300" />
//           <Bar dataKey="totalBikes" fill="#000000" />
//           <Bar dataKey="totalTime" fill="#ff00ff" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default EmployeeBarChart;
