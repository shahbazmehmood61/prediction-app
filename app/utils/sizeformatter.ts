// write a function which takes numebr and return
// size as kb, mb, gb, tb, pb, eb, zb, yb

export function sizeFormatter(size: number) {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
  );
}

// function sizeFormatter(size: number) {
//   var _a;
//   var i = Math.floor(Math.log(size) / Math.log(1024));
//   return (
//     (size / Math.pow(1024, i)).toFixed(2) +
//     ' ' +
//     ((_a = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]) !== null && _a !== void 0
//       ? _a
//       : 'B')
//   );
// }
