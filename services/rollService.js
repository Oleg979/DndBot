const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const roll = (edges, times) => {
  let res = [];
  for (let i = 0; i < times; i++) {
    res.push(getRandomInt(1, edges));
  }
  return res;
};
module.exports = roll;
