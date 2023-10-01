export function dateCalc (timeDifference)  {
    let viewTime;

    if (timeDifference / 1000 < 60) {
        return viewTime = {
          number: timeDifference / 1000,
          text: 'seconds'
        }
      } else if (timeDifference / 1000 < 3600) {
        return viewTime = {
          number: timeDifference / 1000 / 60,
          text: 'minutes'
        }
      } else if (timeDifference / 1000 < 86400) {
        return viewTime = {
          number: timeDifference / 1000 / 60 / 60,
          text: 'hours'
        }
      } else if (timeDifference / 1000 < (86400 *31)) {
        return viewTime = {
          number: timeDifference / 1000 / 60 / 60 / 24,
          text: 'days'
        }
      } else{
        return viewTime = {
          number: timeDifference / 1000 / (86400 *31),
          text: 'monthes'
        }
      }
}

export function formatDate(milliseconds){
  const date = new Date(milliseconds);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}