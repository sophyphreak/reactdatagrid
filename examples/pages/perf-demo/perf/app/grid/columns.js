const buildColumns = (columns) => {
    if (!columns) {
        return [];
    }
    return columns.map((letter) => {
        return {
            defaultWidth: 120,
            header: letter.toUpperCase(),
            name: letter,
        };
    });
};
export default buildColumns;
