const resultsData = [
  {event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 2, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 3, run_1: '90', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 4, run_1: '90', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 5, run_1: '88', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 6, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 7, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 8, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 9, run_1: '90', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 10, run_1: '90', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 11, run_1: '88', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 12, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 13, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 14, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 15, run_1: '90', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 16, run_1: '90', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 17, run_1: '88', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 18, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 19, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 20, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 21, run_1: '90', run_2: '90', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 22, run_1: '90', run_2: '88', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 23, run_1: '88', run_2: '93', run_3: '0', final: '00'},
  {event_id: 1, division_id: 3, rider_id: 24, run_1: '93', run_2: '98', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 25, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 26, run_1: '90', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 27, run_1: '90', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 28, run_1: '88', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 29, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 30, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 31, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 32, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 33, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 34, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 35, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 36, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 37, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 38, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 39, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 40, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 41, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 42, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 43, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 44, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 45, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 46, run_1: '90', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 47, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 48, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 49, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 50, run_1: '88', run_2: '90', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 51, run_1: '93', run_2: '88', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 52, run_1: '90', run_2: '93', run_3: '0', final: '00'},
  { event_id: 1, division_id: 8, rider_id: 53, run_1: '90', run_2: '90', run_3: '0', final: '00'}
];

module.exports = resultsData;