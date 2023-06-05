import merge from 'lodash/merge';
import { useState ,useEffect} from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

import { useDispatch, useSelector } from './../../../../redux/store';
import { usersYear } from './../../../../redux/admin';

// ----------------------------------------------------------------------

// const CHART_DATA = [
//   {
//     year: 2019,
//     data: [
//       { name: 'Active', data: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
//       { name: 'blocked', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
//     ],
//   },
//   {
//     year: 2020,
//     data: [
//       { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
//       { name: 'America', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
//     ],
//   },
//   {
//     year: 2021,
//     data: [
//       { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
//       { name: 'America', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
//     ],
//   },
// ];

export default function AppAreaInstalled() {
  const dispatch = useDispatch();
  const { usersyear, isLoading } = useSelector((state) => state.admin);

  const [_usersyear, setChartData] = useState([]);

  const [seriesData, setSeriesData] = useState(2019);


  useEffect(() => {
    dispatch(usersYear());
  }, [dispatch]);

  useEffect(() => {
    setChartData(usersyear);
    console.log(usersyear, 'usersyear');
  }, [usersyear]);

  const CHART_DATA = [
    {
      year: 2019,
      data: [
        { name: 'Active', data: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: 'blocked', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      ],
    },
    {
      year: 2020,
      data: [
        { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
        { name: 'America', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
      ],
    },
    {
      year: 2021,
      data: [
        { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
        { name: 'America', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 148, 148, 148] },
      ],
    },
  ];
  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  });

  return (
    <Card>
      <CardHeader
        title="Total IHold Users"
        subheader=""
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
