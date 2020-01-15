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
      distance: dtwDist[s1.length][s2.length],
    };
  }

  static format(array: Array<number[]>) {
    return array.slice(1, array.length)
      .map(cur => cur.slice(1, cur.length));
  }

  static getPath(matrix: Array<number[]>) {
    const path = [];
    path.push([matrix[0].length - 1, matrix.length - 1]);

    let i = matrix.length - 1;
    let j = matrix[0].length - 1;

    while (i > 0 || j > 0) {
      const minValue = Math.min(
        matrix[i - 1] && (!!matrix[i - 1][j] || matrix[i - 1][j] === 0) ? matrix[i - 1][j] : Infinity,
        matrix[i - 1] && (!!matrix[i - 1][j - 1] || matrix[i - 1][j - 1] === 0) ? matrix[i - 1][j - 1] : Infinity,
        (!!matrix[i][j - 1] || matrix[i][j - 1] === 0) ? matrix[i][j - 1] : Infinity
      );

      if (matrix[i - 1] && (!!matrix[i - 1][j - 1] || matrix[i - 1][j - 1] === 0) && matrix[i - 1][j - 1] === minValue) {
        i = i - 1;
        j = j - 1;
      } else if (matrix[i - 1] && (!!matrix[i - 1][j] || matrix[i - 1][j] === 0) && matrix[i - 1][j] === minValue) {
        i = i - 1;
      } else if ((!!matrix[i][j - 1] || matrix[i][j - 1] === 0) && matrix[i][j - 1] === minValue) {
        j = j - 1;
      }

      path.push([j, i]);
    }

    return path.reverse();
  }
}
