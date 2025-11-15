import { LineChart } from '@mui/x-charts/LineChart';
import { XAxis } from '@mui/x-charts/models';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';


import {
  dateAxisFormatter,
  percentageFormatter,
  usUnemploymentRate,
} from '../tempDataSet.ts'


const xAxis: XAxis<'time'>[] = [
  {
    dataKey: 'date',
    scaleType: 'time',
    valueFormatter: dateAxisFormatter,
  },
];
const yAxis = [
  {
    valueFormatter: percentageFormatter,
  },
];
const series = [
  {
    dataKey: 'rate',
    showMark: false,
    valueFormatter: percentageFormatter,
    color: '#FF0000'
  },
];
export default function GridDemo() {
  return (
    <LineChart
      dataset={usUnemploymentRate}
      xAxis={xAxis}
      yAxis={yAxis}
      series={series}
      height={300}
      grid={{ vertical: true, horizontal: true }}
      sx={{
        [`& .${chartsGridClasses.line}`]: {
          stroke: '#999',  
          strokeDasharray: '5 3',
          strokeWidth: 2,
        },
      }}
      />
  );
}
