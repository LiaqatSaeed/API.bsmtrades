import PostTrade from '../Model/PostTrades';
import size from 'lodash/size';
import map from 'lodash/map';
import includes from 'lodash/includes';
import filter from 'lodash/filter';

export const BulkUpdateLiveTrade = (req, res, next) => {
  const tradeList = req.listLiveTrades;
  recursiveTrading({
    tradeList,
    index: 0,
    res,
    next,
  });
};

const recursiveTrading = async ({ tradeList, index, res, next }) => {
  if (size(tradeList) >= index + 1) {
    // get DB list
    let dbDataList = await PostTrade.find({});

    // Check If item in DB Trading Type is wordOrder
    let liveTicketId = map(tradeList, ({ ticket_id }) => ticket_id);
    let listOfWorkOrders = map(
      filter(
          dbDataList,
        ({ ticket_id, trading_type }) =>
          trading_type === 'wordOrder' && includes(liveTicketId, ticket_id)
      ),
      ({ ticket_id }) => ticket_id
    );

    if (size(listOfWorkOrders) > 0) {
        await PostTrade.deleteMany({ ticket_id: { $in: listOfWorkOrders }  });
    }


    let dbList = await PostTrade.find({});
    dbList = map(dbList, ({ ticket_id }) => ticket_id);

    // differnce from live trade list

    let listToCreateToDB = filter(
      tradeList,
      ({ ticket_id }) => !includes(dbList, ticket_id)
    );

    if (size(listToCreateToDB) > 0) {
      // Item not in DB but in LiveTrades . Create In DB
      listToCreateToDB = map(listToCreateToDB, (item) => ({
        ...item,
        trading_type: 'opened',
      }));
      let response = await PostTrade.collection.insertMany(listToCreateToDB);
    }

    // get DB list with updated inserts
    let upgradedDBList = await PostTrade.find({});
    const liveTradesIds = map(tradeList, ({ ticket_id }) => ticket_id);

    const filterFromDBList = filter(
      upgradedDBList,
      ({ ticket_id, trading_type }) =>
        trading_type !== 'closed' && !includes(liveTradesIds, ticket_id)
    );

    if (size(filterFromDBList) > 0) {
      // Item removed from live list but exist in DB. Update it to Closed
      let closedItemListIds = map(
        filterFromDBList,
        ({ ticket_id }) => ticket_id
      );
      PostTrade;
      var bulk = PostTrade.collection.initializeOrderedBulkOp();
      bulk
        .find({ ticket_id: { $in: closedItemListIds } })
          .update({ $set: { trading_type: 'closed', profit: "", swap: 0, close_time: "", close_price: "" } });
      let response = await bulk.execute();
    }

    res.send('Saved');
  } else {
    res.send('done');
  }
};

const recurrsiveUpdate = ({ res, listOfWorkOrders }) => {};

const findTicket = async ({ ticket_id }) => {
  const trade = await LiveTrades.findOne({ ticket_id });

  return trade;
};
