export class DynamicTimeWarping {
  static run(s1: Array<number>, s2: Array<number>) {
    const dtwDist = [];

    for (let i = 0; i < s1.length + 1; i++) {
      dtwDist.push([]);
      for (let j = 0; j < s2.length + 1; j++) {
        dtwDist[i].push(0);
      }
    }

    for (let i = 0; i < s1.length + 1; i++) {
      dtwDist[i][0] = Infinity;
    }
    for (let i = 0; i < s2.length + 1; i++) {
      dtwDist[0][i] = Infinity;
    }
    dtwDist[0][0] = 0;

    for (let i = 0; i < s1.length; i++) {
      for (let j = 0; j < s2.length; j++) {
        dtwDist[i + 1][j + 1] = Math.abs(s1[i] - s2[j]) +
          Math.min(
            dtwDist[i][j + 1],
            dtwDist[i + 1][j],
            dtwDist[i][j]
          );
      }
    }

    return {
      matrix: this.format(dtwDist),
      distance: dtwDist[s1.length - 1][s2.length - 1],
    };
  }

  static format(array: Array<number[]>) {
    return array.slice(1, array.length)
      .map(cur => cur.slice(1, cur.length));
  }
}
