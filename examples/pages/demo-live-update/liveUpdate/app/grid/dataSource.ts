const buildDataSource = (
  records: number,
  cols: string,
  times: number,
  callback?: Function
) => {
  if (callback) {
    return callback();
  }

  const dataSource: any = [];
  const colsArray = cols.split('');

  for (let i = 0; i < records; i++) {
    const result = {
      id: i,
    };

    for (let j = 0; j < times; j++) {
      for (let k = 0; k < colsArray.length; k++) {
        const letter = colsArray[k];

        if (j === 0) {
          result[letter] = letter.toUpperCase() + ' ' + (i + 1);
        } else if (j > 0) {
          result[`${colsArray[j - 1]}${letter}`] = `${colsArray[
            j - 1
          ].toUpperCase()}${letter.toUpperCase()} ${i + 1}`;
        }
      }
    }

    dataSource.push(result);
  }

  return dataSource;
};

export default buildDataSource;
