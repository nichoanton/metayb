const AssemblyLog = require('../models/AssemblyLog');

exports.assembleBike = async (req, res) => {
  const { bikeType } = req.body;
  
  const log = new AssemblyLog({
    user: req.user._id,
    bikeType
  });

  await log.save();
  console.log('Assembly Log:', log); 
  console.log('User:', req.user.username); 
  
  res.json({ message: `${req.user.username}: Logged ${bikeType} assembly` });
};

exports.getLogs = async (req, res) => {
  const { from, to } = req.query;
  const query = {};

  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(new Date(to).setHours(23, 59, 59, 999));
  }

  const logs = await AssemblyLog.find(query).populate('user', 'name email');
  res.json(logs);
};

exports.getAssemblyLogsGrouped = async (req, res) => {
  try {
    const { from, to } = req.query; 

    const query = {};
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const logs = await AssemblyLog.find(query).populate('user', 'username');

    const calculateTotalTime = (hondaCount, yamahaCount, enfieldCount) => {
      const hondaTime = hondaCount * (50 / 60);
      const yamahaTime = yamahaCount * 1;
      const enfieldTime = enfieldCount * (80 / 60);
      return parseFloat((hondaTime + yamahaTime + enfieldTime).toFixed(2));
    };

    const groupedData = {};
    logs.forEach(log => {
      const { user, bikeType, date } = log;
      const formattedDate = new Date(date).toISOString().split('T')[0];

      if (!groupedData[formattedDate]) groupedData[formattedDate] = {};
      if (!groupedData[formattedDate][user.username]) {
        groupedData[formattedDate][user.username] = { Honda: 0, Yamaha: 0, Enfield: 0, totalBikes: 0, totalTime: 0 };
      }

      groupedData[formattedDate][user.username][bikeType] = (groupedData[formattedDate][user.username][bikeType] || 0) + 1; // Initialize if undefined
      groupedData[formattedDate][user.username].totalBikes++;
      const { Honda, Yamaha, Enfield } = groupedData[formattedDate][user.username];
      groupedData[formattedDate][user.username].totalTime = calculateTotalTime(Honda, Yamaha, Enfield);
    });

    res.json(groupedData);
  } catch (error) {
    console.error('Error fetching assembly logs:', error);
    res.status(500).json({ message: 'Error fetching assembly logs', error });
  }
};
