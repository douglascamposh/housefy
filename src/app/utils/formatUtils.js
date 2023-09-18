export const convertFormatDate=(date)=> {
    const parts = date.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const dateFormatNew = `${day}-${month}-${year}`;
    return dateFormatNew;
}