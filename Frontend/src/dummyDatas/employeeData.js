const calculateTotalTime = (hondaCount, yamahaCount, enfieldCount) => {
  const hondaTime = hondaCount * (50 / 60);
  const yamahaTime = yamahaCount * 1;
  const enfieldTime = enfieldCount * (80 / 60); 
  const totalTimeInHours = hondaTime + yamahaTime + enfieldTime;

  return parseFloat(totalTimeInHours.toFixed(2));
};

const employeeData = [
  {
    date: "2024-09-01",
    employee: "Nick",
    Honda: 2,
    Yamaha: 1,
    Enfield: 1,
    totalBikes: 4,
    totalTime: calculateTotalTime(2, 1, 1),
  },
  {
    date: "2024-09-01",
    employee: "Anton",
    Honda: 1,
    Yamaha: 1,
    Enfield: 0,
    totalBikes: 2,
    totalTime: calculateTotalTime(1, 1, 0),
  },
  {
    date: "2024-09-02",
    employee: "Max",
    Honda: 3,
    Yamaha: 2,
    Enfield: 1,
    totalBikes: 6,
    totalTime: calculateTotalTime(3, 2, 1),
  },
  {
    date: "2024-09-02",
    employee: "Nicho",
    Honda: 2,
    Yamaha: 1,
    Enfield: 1,
    totalBikes: 4,
    totalTime: calculateTotalTime(2, 1, 1),
  },
  {
    date: "2024-09-03",
    employee: "Nick",
    Honda: 2,
    Yamaha: 2,
    Enfield: 1,
    totalBikes: 5,
    totalTime: calculateTotalTime(2, 2, 1),
  },
  {
    date: "2024-09-03",
    employee: "Max",
    Honda: 2,
    Yamaha: 2,
    Enfield: 2,
    totalBikes: 6,
    totalTime: calculateTotalTime(2, 2, 2),
  },
  {
    date: "2024-09-04",
    employee: "Anton",
    Honda: 3,
    Yamaha: 1,
    Enfield: 2,
    totalBikes: 6,
    totalTime: calculateTotalTime(3, 1, 2),
  },
  {
    date: "2024-09-04",
    employee: "Nick",
    Honda: 3,
    Yamaha: 1,
    Enfield: 3,
    totalBikes: 7,
    totalTime: calculateTotalTime(3, 1, 3),
  },
  {
    date: "2024-09-05",
    employee: "Max",
    Honda: 5,
    Yamaha: 1,
    Enfield: 2,
    totalBikes: 8,
    totalTime: calculateTotalTime(5, 1, 2),
  },
  {
    date: "2024-09-05",
    employee: "Anton",
    Honda: 3,
    Yamaha: 0,
    Enfield: 2,
    totalBikes: 5,
    totalTime: calculateTotalTime(3, 0, 2),
  },
];

export default employeeData;
