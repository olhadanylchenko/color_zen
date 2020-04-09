const borderWidth = 25;
const uniquifyArray = (array) => {
  if (array.length === 0) return null;
  else
    return array.reduce((acc, curval) => {
      if (!acc.includes(curval)) {
        return [...acc, curval];
      } else return acc;
    }, []);
};

const friction = 0.5;

const red = "rgb(226, 56, 56)";
const blue = "rgb(137,230,254)";
const purple = "rgb(151, 57, 153)";
const green = "rgb(94, 189, 62)";
const yellow = "rgb(255, 185, 0)";
const orange = "rgb(247, 130, 0)";
const pink = "rgb(254, 127, 156)";
