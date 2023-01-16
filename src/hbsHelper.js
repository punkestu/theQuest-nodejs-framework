const showdown = require("showdown");
const converter = new showdown.Converter();

const Handlebars = require("handlebars");

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
  isset: (data, block) => {
    if (data != null) {
      return block.fn(data);
    }
    return block.inverse(data);
  },
  tomd: (data) => {
    console.log(converter.makeHtml(data));
    return new Handlebars.SafeString(converter.makeHtml(data));
  },
  dateFormat: require("handlebars-dateformat"),
};
