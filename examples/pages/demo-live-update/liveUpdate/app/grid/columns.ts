type Column = {
  defaultWidth: number;
  header: string;
  name: string;
};

const buildColumns = (columns: string[]): Column[] => {
  return (
    columns.map((letter: string) => {
      return {
        defaultWidth: 120,
        header: letter.toUpperCase(),
        name: letter,
      };
    }) || []
  );
};

export default buildColumns;
