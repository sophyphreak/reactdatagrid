type Column = {
  defaultWidth: number;
  header: string;
  name: string;
};

const buildColumns = (cols: string, times: number) => {
  const colsArray = cols.split('');

  const columns: Column[] = [];
  for (let i = 0; i < times; i++) {
    for (let j = 0; j < colsArray.length; j++) {
      const letter = colsArray[j];

      if (i === 0) {
        columns.push({
          defaultWidth: 120,
          header: letter.toUpperCase(),
          name: letter,
        });
      } else if (i > 0) {
        columns.push({
          defaultWidth: 120,
          header: `${colsArray[i - 1].toUpperCase()} ${letter.toUpperCase()}`,
          name: `${colsArray[i - 1]}${letter}`,
        });
      }
    }
  }

  return columns;
};

export default buildColumns;
