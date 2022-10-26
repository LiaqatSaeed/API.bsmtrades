export const dateFilter = () => {
  const date = new Date();
  let start = date.toLocaleDateString('fr-CA').split('/').join('-');

  let end = new Date(date);
  end.setDate(end.getDate() + 1);
  end = end.toLocaleDateString('fr-CA');

  start = reCreateDate(start);
  end = reCreateDate(end);

  return {
    start,
    end,
  };
};

const reCreateDate = (date) =>
  date
    .split('-')
    .map((item) => item.replace(/^0+/, ''))
    .join('-');
