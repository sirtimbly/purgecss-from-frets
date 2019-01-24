
var changeCase = require("change-case");
var doublePattern = /\$\$\((.?)\)/g;
var singlePattern = /\.(\w.+)(\.h\(|\.|;)/g;

class PurgeFromFrets {
  static extract(content) {
    var selectors = [];
    var doubles = [];
    var doubleInProgress;
    while ((doubleInProgress = doublePattern.exec(content)) != null) {
      doubles.push(...doubleInProgress[1].split("."));
    }
    // console.log("Found $$ selectors:" + doubles.join(", "));
    selectors.push(...doubles);
    var singles = [];
    var singlesInProgress;
    while ((singlesInProgress = singlePattern.exec(content)) != null) {
      singles.push(...singlesInProgress[1].split("."));
    }
    selectors.push(...singles);
    selectors = selectors.map(x => x.trim().replace(/[^-_a-z0-9]/i, ""));
    selectors = selectors.map(x => changeCase.paramCase(x));
    selectors = selectors.filter(x => !(["base-styles", "", " ", ].includes(x) || x.length <= 1))
    // console.log(selectors);
    // selectors = selectors.map(x => {
    //   var matches = x.match(/(m|mx|my|mt|mb|ml|mr|p|px|py|pt|pl|pb|pr)(\d)/)
    //   if (matches && matches.length === 3 ) {
    //     return `${matches[1]}-${matches[2]}`;
    //   } else {
    //     return x;
    //   }
    // })

    console.log(selectors.join(", "));
    // console.log("Found Selectors in file: " + selectors.length);
    return selectors;
  }
}
module.exports = PurgeFromFrets;
