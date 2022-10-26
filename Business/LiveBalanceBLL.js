import LiveBalance from '../Model/LiveBalances';

export const manageHistory = async (req, res) => {

  // Empty Table
  await LiveBalance.deleteMany({});


  // Save New Record
  var live_balance_obj = new LiveBalance({ ...req.live_balance_obj });
  live_balance_obj.save((err, result) => {
    if (err) res.status(500).send(err);

    res.json({ data: result });
  });

};
