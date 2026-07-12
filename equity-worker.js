'use strict';

const RANK_CHARS = '23456789TJQKA';
const SUIT_CHARS = 'shdc';
const CAT_BASE = 759375; // 15^5
const rankByCard = new Uint8Array(52);
const suitByCard = new Uint8Array(52);
const codeToCard = Object.create(null);

for (let rankIndex = 0; rankIndex < 13; rankIndex++) {
  for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
    const cardIndex = rankIndex * 4 + suitIndex;
    rankByCard[cardIndex] = rankIndex + 2;
    suitByCard[cardIndex] = suitIndex;
    codeToCard[`${RANK_CHARS[rankIndex]}${SUIT_CHARS[suitIndex]}`] = cardIndex;
  }
}

const rankCounts = new Uint8Array(15);

function parseCard(code) {
  const card = codeToCard[code];
  if (card === undefined) throw new Error(`不正なカードです: ${code}`);
  return card;
}

function pack(category, a = 0, b = 0, c = 0, d = 0, e = 0) {
  return (((((category * 15 + a) * 15 + b) * 15 + c) * 15 + d) * 15 + e);
}

function straightHigh(mask) {
  for (let high = 14; high >= 6; high--) {
    const needed =
      (1 << high) |
      (1 << (high - 1)) |
      (1 << (high - 2)) |
      (1 << (high - 3)) |
      (1 << (high - 4));
    if ((mask & needed) === needed) return high;
  }
  const wheel =
    (1 << 14) |
    (1 << 5) |
    (1 << 4) |
    (1 << 3) |
    (1 << 2);
  return (mask & wheel) === wheel ? 5 : 0;
}

function topFiveCode(mask) {
  let result = 0;
  let count = 0;
  for (let rank = 14; rank >= 2; rank--) {
    if (mask & (1 << rank)) {
      result = result * 15 + rank;
      count++;
      if (count === 5) return result;
    }
  }
  while (count < 5) {
    result *= 15;
    count++;
  }
  return result;
}

function evaluate7(cards) {
  rankCounts.fill(0);

  let rankMask = 0;
  let suitCount0 = 0, suitCount1 = 0, suitCount2 = 0, suitCount3 = 0;
  let suitMask0 = 0, suitMask1 = 0, suitMask2 = 0, suitMask3 = 0;

  for (let index = 0; index < 7; index++) {
    const card = cards[index];
    const rank = rankByCard[card];
    const suit = suitByCard[card];
    rankCounts[rank]++;
    rankMask |= (1 << rank);

    if (suit === 0) { suitCount0++; suitMask0 |= (1 << rank); }
    else if (suit === 1) { suitCount1++; suitMask1 |= (1 << rank); }
    else if (suit === 2) { suitCount2++; suitMask2 |= (1 << rank); }
    else { suitCount3++; suitMask3 |= (1 << rank); }
  }

  let flushMask = 0;
  if (suitCount0 >= 5) flushMask = suitMask0;
  else if (suitCount1 >= 5) flushMask = suitMask1;
  else if (suitCount2 >= 5) flushMask = suitMask2;
  else if (suitCount3 >= 5) flushMask = suitMask3;

  if (flushMask) {
    const straightFlush = straightHigh(flushMask);
    if (straightFlush) return pack(8, straightFlush);
  }

  let quad = 0;
  for (let rank = 14; rank >= 2; rank--) {
    if (rankCounts[rank] === 4) { quad = rank; break; }
  }
  if (quad) {
    let kicker = 0;
    for (let rank = 14; rank >= 2; rank--) {
      if (rank !== quad && rankCounts[rank]) { kicker = rank; break; }
    }
    return pack(7, quad, kicker);
  }

  let firstTrip = 0;
  let secondTripOrPair = 0;
  for (let rank = 14; rank >= 2; rank--) {
    if (!firstTrip && rankCounts[rank] >= 3) firstTrip = rank;
    else if (firstTrip && !secondTripOrPair && rankCounts[rank] >= 2) {
      secondTripOrPair = rank;
      break;
    }
  }
  if (firstTrip && secondTripOrPair) return pack(6, firstTrip, secondTripOrPair);

  if (flushMask) return 5 * CAT_BASE + topFiveCode(flushMask);

  const straight = straightHigh(rankMask);
  if (straight) return pack(4, straight);

  if (firstTrip) {
    let kicker1 = 0, kicker2 = 0;
    for (let rank = 14; rank >= 2; rank--) {
      if (rank === firstTrip || !rankCounts[rank]) continue;
      if (!kicker1) kicker1 = rank;
      else { kicker2 = rank; break; }
    }
    return pack(3, firstTrip, kicker1, kicker2);
  }

  let pair1 = 0, pair2 = 0;
  for (let rank = 14; rank >= 2; rank--) {
    if (rankCounts[rank] >= 2) {
      if (!pair1) pair1 = rank;
      else { pair2 = rank; break; }
    }
  }
  if (pair1 && pair2) {
    let kicker = 0;
    for (let rank = 14; rank >= 2; rank--) {
      if (rank !== pair1 && rank !== pair2 && rankCounts[rank]) {
        kicker = rank;
        break;
      }
    }
    return pack(2, pair1, pair2, kicker);
  }

  if (pair1) {
    let kicker1 = 0, kicker2 = 0, kicker3 = 0;
    for (let rank = 14; rank >= 2; rank--) {
      if (rank === pair1 || !rankCounts[rank]) continue;
      if (!kicker1) kicker1 = rank;
      else if (!kicker2) kicker2 = rank;
      else { kicker3 = rank; break; }
    }
    return pack(1, pair1, kicker1, kicker2, kicker3);
  }

  return topFiveCode(rankMask);
}

function choose(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  const m = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= m; i++) result = result * (n - m + i) / i;
  return Math.round(result);
}

function createCounter(total) {
  return {
    wins: 0,
    ties: 0,
    losses: 0,
    total,
    processed: 0,
    nextProgress: 0,
    progressStep: Math.max(1, Math.floor(total / 100))
  };
}

function reportProgress(counter, force = false) {
  if (!force && counter.processed < counter.nextProgress) return;
  counter.nextProgress = counter.processed + counter.progressStep;
  self.postMessage({
    type: 'progress',
    processed: counter.processed,
    total: counter.total
  });
}

function compareScores(heroScore, villainScore, counter) {
  if (heroScore > villainScore) counter.wins++;
  else if (heroScore < villainScore) counter.losses++;
  else counter.ties++;
  counter.processed++;
  reportProgress(counter);
}

function availableCards(excluded) {
  const blocked = new Uint8Array(52);
  excluded.forEach(card => blocked[card] = 1);
  const result = [];
  for (let card = 0; card < 52; card++) {
    if (!blocked[card]) result.push(card);
  }
  return result;
}

function calculateFixedVillain(hero, villain, board) {
  const remaining = availableCards([...hero, ...villain, ...board]);
  const missing = 5 - board.length;
  const total = choose(remaining.length, missing);
  const counter = createCounter(total);

  const hero7 = [hero[0], hero[1], 0, 0, 0, 0, 0];
  const villain7 = [villain[0], villain[1], 0, 0, 0, 0, 0];

  for (let i = 0; i < board.length; i++) {
    hero7[i + 2] = board[i];
    villain7[i + 2] = board[i];
  }

  const recordBoard = cards => {
    for (let i = 0; i < cards.length; i++) {
      hero7[board.length + 2 + i] = cards[i];
      villain7[board.length + 2 + i] = cards[i];
    }
    compareScores(evaluate7(hero7), evaluate7(villain7), counter);
  };

  if (missing === 0) {
    recordBoard([]);
  } else if (missing === 1) {
    for (let a = 0; a < remaining.length; a++) recordBoard([remaining[a]]);
  } else if (missing === 2) {
    for (let a = 0; a < remaining.length - 1; a++) {
      for (let b = a + 1; b < remaining.length; b++) {
        recordBoard([remaining[a], remaining[b]]);
      }
    }
  } else if (missing === 5) {
    const n = remaining.length;
    for (let a = 0; a < n - 4; a++) {
      for (let b = a + 1; b < n - 3; b++) {
        for (let c = b + 1; c < n - 2; c++) {
          for (let d = c + 1; d < n - 1; d++) {
            for (let e = d + 1; e < n; e++) {
              recordBoard([remaining[a], remaining[b], remaining[c], remaining[d], remaining[e]]);
            }
          }
        }
      }
    }
  } else {
    throw new Error('このボード枚数には対応していません。');
  }

  reportProgress(counter, true);
  return counter;
}

function calculateRandomVillain(hero, board) {
  const remaining = availableCards([...hero, ...board]);
  const missing = 5 - board.length;

  if (missing === 5) {
    throw new Error('PREFLOP_RANDOM_TOO_LARGE');
  }

  let total = 0;
  if (missing === 0) total = choose(remaining.length, 2);
  else if (missing === 1) total = remaining.length * choose(remaining.length - 1, 2);
  else if (missing === 2) total = choose(remaining.length, 2) * choose(remaining.length - 2, 2);
  else throw new Error('このボード枚数には対応していません。');

  const counter = createCounter(total);
  const hero7 = [hero[0], hero[1], 0, 0, 0, 0, 0];
  const villain7 = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < board.length; i++) {
    hero7[i + 2] = board[i];
    villain7[i + 2] = board[i];
  }

  const compareVillains = (extraBoard, excludedA = -1, excludedB = -1) => {
    for (let i = 0; i < extraBoard.length; i++) {
      hero7[board.length + 2 + i] = extraBoard[i];
      villain7[board.length + 2 + i] = extraBoard[i];
    }
    const heroScore = evaluate7(hero7);

    for (let a = 0; a < remaining.length - 1; a++) {
      if (a === excludedA || a === excludedB) continue;
      for (let b = a + 1; b < remaining.length; b++) {
        if (b === excludedA || b === excludedB) continue;
        villain7[0] = remaining[a];
        villain7[1] = remaining[b];
        compareScores(heroScore, evaluate7(villain7), counter);
      }
    }
  };

  if (missing === 0) {
    compareVillains([]);
  } else if (missing === 1) {
    for (let river = 0; river < remaining.length; river++) {
      compareVillains([remaining[river]], river);
    }
  } else if (missing === 2) {
    for (let turn = 0; turn < remaining.length - 1; turn++) {
      for (let river = turn + 1; river < remaining.length; river++) {
        compareVillains([remaining[turn], remaining[river]], turn, river);
      }
    }
  }

  reportProgress(counter, true);
  return counter;
}

self.onmessage = event => {
  try {
    const hero = event.data.hero.map(parseCard);
    const villain = event.data.villain ? event.data.villain.map(parseCard) : null;
    const board = event.data.board.map(parseCard);

    const counter = villain
      ? calculateFixedVillain(hero, villain, board)
      : calculateRandomVillain(hero, board);

    self.postMessage({
      type: 'result',
      wins: counter.wins,
      ties: counter.ties,
      losses: counter.losses,
      total: counter.total,
      villainMode: villain ? 'fixed' : 'random'
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      code: error.message,
      message: error.message
    });
  }
};
