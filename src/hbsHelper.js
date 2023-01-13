module.exports = {
  for: (start, lim, inc, block) => {
    var accum = "";
    for (let i = start; i < lim; i += inc) {
      accum += block.fn(i);
    }

    return accum;
  },
  forn: (n, block) => {
    var accum = "";
    for (let i = 0; i < n; i++) {
      accum += block.fn(i);
    }

    return accum;
  },
};
