function sortAscById() {
  return function (elem1, elem2) {
    if (elem1.id < elem2.id) {
      return -1;
    } else if (elem1.id > elem2.id) {
      return 1;
    } else {
      return 0;
    }
  };
}

module.exports = sortAscById;
