export class Calendar {
  constructor(year, month) {
    this.longDaysArr = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    this.year = year;
    this.month = month;
    this.currentMonthWithDayObj = this.createCurrentMonthWithDayObj();
    this.prevMonthWithDayObj = this.createPrevMonthWithDayObj();
    this.nextMonthWithDayObj = this.createNextMonthWithDayObj();
    return {
      calendar: this.create(),
      month: this.currentMonthWithDayObj[0].month,
      year: this.year,
    };
  }

  createDaysArr = (y, m) => [...Array(new Date(y, m + 1, 0).getDate()).keys()].map((i) => i + 1);

  removeLiteral = (arr) => arr.filter((i) => i.type !== 'literal');

  formatDateArr = (arr) =>
    arr.reduce((acc, cur) => {
      acc[cur.type] = cur.value;
      return acc;
    }, {});

  daysArrWithObj = (arr, y, m) =>
    arr
      .map((i) =>
        new Intl.DateTimeFormat('en-us', {
          month: 'short',
          weekday: 'long',
          day: '2-digit',
        }).formatToParts(new Date(y, m, i))
      )
      .map((i) => this.formatDateArr(this.removeLiteral(i)));

  createCurrentMonthWithDayObj = () =>
    this.daysArrWithObj(this.createDaysArr(this.year, this.month), this.year, this.month);

  createPrevMonthWithDayObj = () => {
    const firstDayOfCurrentMonth = this.currentMonthWithDayObj[0];
    const prevMonthWeekdaysArr = [...this.longDaysArr].slice(
      0,
      this.longDaysArr.indexOf(firstDayOfCurrentMonth.weekday)
    );
    const prevMonthDaysArr = !prevMonthWeekdaysArr.length
      ? []
      : this.createDaysArr(this.year, this.month - 1).slice(-prevMonthWeekdaysArr.length);

    const prevMonthWithDayObj = this.daysArrWithObj(prevMonthDaysArr, this.year, this.month - 1);
    return prevMonthWithDayObj;
  };
  createNextMonthWithDayObj = () => {
    const lastDayOfCurrentMonth = this.currentMonthWithDayObj.at(-1);
    const nextMonthWeekdaysArr = [...this.longDaysArr].slice(
      this.longDaysArr.indexOf(lastDayOfCurrentMonth.weekday) + 1
    );
    const nextMothDaysArr = this.createDaysArr(this.year, this.month + 1).slice(
      0,
      nextMonthWeekdaysArr.length
    );
    const nextMonthWithDayObj = this.daysArrWithObj(nextMothDaysArr, this.year, this.month + 1);
    return nextMonthWithDayObj;
  };
  create = () => [
    ...this.prevMonthWithDayObj,
    ...this.currentMonthWithDayObj,
    ...this.nextMonthWithDayObj,
  ];
}

const getMonth = (n) => new Date(2021, n).toLocaleString('en-us', { month: 'long' });
export const monthsArr = [...Array(12).keys()].map(getMonth);

export const getYearsArr = (n = 3) => {
  const year = new Date().getFullYear();
  return [...Array(n * 2 + 1).keys()].reduce((acc, cur) => {
    cur === n ? acc.push(year) : acc.push(year - n + cur);
    return acc;
  }, []);
};
