import React, { useState } from 'react';
import Cards from './cards';
import { VerifyButton } from './buttonstyles';
import { cardContainer, card } from './cardstyles';
import { titleContainer, title } from './homestyles';

const generatePermutations = (arr, perm = [], result = []) => {
  if (arr.length === 0) {
    result.push(perm);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const current = arr.slice();
    const nextNum = current.splice(i, 1)[0];
    generatePermutations(current, [...perm, nextNum], result);
  }
};

const getNums = () => {
  let nums = [];
  for (let i = 0; i < 4; i++) {
    const rand = Math.floor(Math.random() * 13) + 1; // random 1 to 13
    nums.push(rand);
  }
  return nums;
};

const verifyPermutation = (nums) => {
  const ops = ['+', '-', '*', '/'];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        const expression = `(${nums[0]} ${ops[i]} ${nums[1]}) ${ops[j]} (${nums[2]} ${ops[k]} ${nums[3]})`;
        if (eval(expression) === 24) {
          return true;
        }
      }
    }
  }
  return false;
};

const verifyNums = (nums) => {
  const perms = [];
  generatePermutations(nums, [], perms);
  // Loop through each permutation
  for (const perm of perms) {
    // console.log(perm); // Print each permutation as a separate array
    if (verifyPermutation(perm)) return true;
  }
  return false;
};

const App = () => {
  const [nums, setNums] = useState([]);
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    const canMake24 = verifyNums(nums);
    setResult(canMake24);
  };

  const resetVerify = () => {
    setResult(null);
  };

  const generateNewNums = () => {
    const newNums = getNums();
    setNums(newNums);
    resetVerify();
  };

  return (
    <div>
      <div style={titleContainer}>
        <h1 style={title}>24</h1>
        <div style={cardContainer}>
          <div style={card}>{nums[0]}</div>
          <div style={card}>{nums[1]}</div>
          <div style={card}>{nums[2]}</div>
          <div style={card}>{nums[3]}</div>
        </div>

        <VerifyButton onVerify={handleVerify} />
        {result !== null && <p>{result ? 'Can make 24' : "Doesn't work"}</p>}
        <button onClick={generateNewNums}>Generate New Numbers</button>
      </div>
    </div>
  );
};

export default App;
