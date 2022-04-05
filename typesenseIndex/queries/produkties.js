const qs = require('qs');

const query = qs.stringify({
  fields: ['title', 'slug'],
  // populate: {
  //   image: {
  //     fields: ['hash'],
  //   },
  // },
}, {
  encodeValuesOnly: true,
});

module.exports = query