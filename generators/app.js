// this is a generator
function* makeRangeIterator(start = 0, end = 100, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

generator = makeRangeIterator();

console.log(generator.next());
console.log(generator.next());