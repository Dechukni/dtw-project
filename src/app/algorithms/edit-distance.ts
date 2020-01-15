export class EditDistance {
  static run(s1: Array<string>, s2: Array<string>) {
    const dist = [];

    for (let i = 0; i < s2.length + 1; i++) {
      dist.push([]);
      for (let j = 0; j < s1.length + 1; j++) {
        dist[i].push(0);
      }
    }
    for (let i = 0; i < s1.length + 1; i++) {
      dist[0][i] = i;
    }
    for (let i = 0; i < s2.length + 1; i++) {
      dist[i][0] = i;
    }

    for (let j = 0; j < s1.length; j++) {
      for (let i = 0; i < s2.length; i++) {
        let n;
        if (s1[j] === s2[i]) {
          n = 0;
        } else {
          n = 1;
        }
        dist[i + 1][j + 1] = Math.min(dist[i][j] + n, dist[i][j + 1] + 1, dist[i + 1][j] + 1);
      }
    }

    return {
      matrix: dist,
      distance: dist[s2.length][s1.length],
    };
  }

  static getPath(matrix: Array<number[]>) {
    const path = [];
    path.push([matrix.length - 1, matrix[0].length - 1]);

    let i = matrix.length - 1;
    let j = matrix[0].length - 1;

    while (i > 0 || j > 0) {
      const minValue = Math.min(
        matrix[i - 1] && matrix[i - 1][j] ? matrix[i - 1][j] : Infinity,
        matrix[i - 1] && matrix[i - 1][j - 1] ? matrix[i - 1][j - 1] : Infinity,
        matrix[i][j - 1] ? matrix[i][j - 1] : Infinity
      );

      if (matrix[i - 1] && matrix[i - 1][j - 1] && matrix[i - 1][j - 1] === minValue) {
        i = i - 1;
        j = j - 1;
      } else if (matrix[i - 1] && matrix[i - 1][j] && matrix[i - 1][j] === minValue) {
        i = i - 1;
      } else if (matrix[i][j - 1] && matrix[i][j - 1] === minValue) {
        j = j - 1;
      }

      path.push([i, j]);
    }

    return path.reverse();
  }
}
