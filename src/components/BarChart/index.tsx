import React from 'react';
import { Bar } from "react-chartjs-2";

type TypeCharData = {
  chartData: any;
}

export const BarChart: React.FunctionComponent<TypeCharData> = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center", color: 'black'}}>Invoices Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Total Invoices between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};