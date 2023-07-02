import * as React from 'react';
const { useEffect, useState } = React;
import { Typography } from '@mui/material'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

export default function Donut2(props: any) {
  console.log('donut2', props.data, props.data.MemPerc)
  let { data } = props;
  if (!data || !data.MemPerc) {
    return null;
  }

  const [chartData, setChartData] = useState<any>({
    labels: ['Usage', 'Free Space'],
    datasets: [
      {
        label: 'Container Use Ratio',
        data: [0, 0],
        backgroundColor: ['rgb(255, 99, 500)', 'rgb(54, 162, 235)']
      }
    ]
  });

  useEffect(() => {
    const newData: number = parseFloat(data.MemPerc);
    setChartData({
      labels: ['Usage', 'Free space'],
      datasets: [
        {
          label: 'Container Use Ratio',
          data: [newData, 100 - newData],
          backgroundColor: ['rgb(1, 131, 254)', 'rgb(254,124,1)']
        }
      ]
    });
  }, [data.MemPerc]);

  return (
    <>
      <Typography>
        {/* Mem Usage: 1.9% */}
        Mem Usage: {JSON.stringify(data.MemPerc).replace(/"/g, '')}

      </Typography>
     

      <div>
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              }
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    </>
  );
}
