import LiveBalanceHistory from '../Model/LiveBalanceHistory';

export const manageLiveBalanceHistory = async (req, res) => {
   // Save New Record
  var live_balance_history_obj = new LiveBalanceHistory({ ...req.live_balance_history_obj });
  live_balance_history_obj.save((err, result) => {
    if (err) res.status(500).send(err);

    res.json({ data: result });
  });
};
