import LiveBalance from '../Model/LiveBalances';
import LiveBalanceHistory from '../Model/LiveBalanceHistory';

export const manageHistory = async (req, res) => {
  //
  let today = new Date();

  today.setDate(today.getDate());
  //
  today = today.toLocaleDateString() + ' 00:00';
  today = new Date(today);
  let nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate());
  nextDay = nextDay.toLocaleDateString() + ' 24:00';
  nextDay = new Date(nextDay);

  // const makeQuery = [
  //   {
  //     $match: {
  //       created_date: { $gte: today, $lte: nextDay },
  //       account_user_name: account_user_name,
  //     },
  //   },
  // ];

  // get Previous Record ID to delete

  const { account } = req.live_balance_obj;


  console.log('account', account, req.live_balance_obj, today, nextDay)

  // Empty Table
  await LiveBalance.deleteMany({
    created_date: { $gte: today, $lte: nextDay },
    account
  });

  // Save New Record
  var live_balance_obj = new LiveBalance({ ...req.live_balance_obj });
  live_balance_obj.save((err, result) => {
    if (err) res.status(500).send(err);

    res.json({ data: result });
  });
};

export const recordHistory = async (req, res) => {
  try {
    const { query } = req;

    let today = new Date();

    today.setDate(today.getDate());

    today = today.toLocaleDateString() + ' 00:00';
    today = new Date(today);
    let nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate());
    nextDay = nextDay.toLocaleDateString() + ' 24:00';
    nextDay = new Date(nextDay);

    today.setDate(today.getDate());

    let response = await LiveBalance.aggregate([
      {
        $match: { created_date: { $gte: today, $lte: nextDay } },
      },
    ]);

    console.log(response);

    let liveBalanceHistoryData = await LiveBalanceHistory.collection.insertMany(response)

    res.send({ data: liveBalanceHistoryData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};
