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
}
