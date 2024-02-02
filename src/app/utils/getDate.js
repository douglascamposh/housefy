const moment = require('moment');

const generatePaymentDate = (startDay, monthNumber) => {
  const dateList = [];
  const startingDay = moment(startDay);
  
  [...Array(Number(monthNumber))].map((_, index) => {
    const nextDate = startingDay.clone().add(index, 'months');
    let payDay = startingDay.date();
    const nextMonth = nextDate.month();
    const nextYear = nextDate.year();

    const lastDayOfMonth = moment([nextYear, nextMonth]).endOf('month').date();
    if (payDay > lastDayOfMonth) payDay = lastDayOfMonth; 

    const paymentMonthlyDate = moment([nextYear, nextMonth, payDay]);

    if (paymentMonthlyDate.isBefore(startingDay)) paymentMonthlyDate.add(1, 'months');

    dateList.push(paymentMonthlyDate.format('DD-MM-YYYY'));
  });
  return dateList;

}

export default generatePaymentDate;
