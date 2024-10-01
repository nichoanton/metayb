import React from "react";
import BikeLineChart from "../components/Charts/BikeLineChart";
import EmployeeBarChart from "../components/Charts/EmployeeBarChart";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bike Production Data</h2>
        <BikeLineChart />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Employee Work Data</h2>
        <EmployeeBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
