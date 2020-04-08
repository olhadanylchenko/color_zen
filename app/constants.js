const borderWidth = 10;
const uniquifyArray = (array) => {
  if (array.length === 0) return null;
  else
    return array.reduce((acc, curval) => {
      if (!acc.includes(curval)) {
        return [...acc, curval];
      } else return acc;
    }, []);
};
