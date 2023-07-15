import React, { useState } from 'react';
import Cards from './cards';
import { VerifyButton, GenerateButton } from './buttonstyles';
import { cardContainer, card } from './cardstyles';
import {
  titleContainer,
  title,
  resultContainer,
  result,
  inputContainer,
} from './homestyles';
import DisplayResult from './displayResult';
import { Button, TextField } from '@mui/material';

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

const generateHint = (nums) => {
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

const App = () => {
  const [nums, setNums] = useState([]);
  const [result, setResult] = useState(null);
  const [userExpr, setUserExpr] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleVerify = () => {
    if (eval(userExpr) === 24) {
      console.log('YES!');
      setResult(true);
    } else {
      console.log('NO, ', eval(userExpr));
      setResult(false);
    }
  };

  const handleInput = (expr) => {
    setUserExpr(expr);
  };

  const generateNewNums = () => {
    const newNums = getNums();
    setNums(newNums);
    setTextValue('');
    setResult(null); // reset result
  };

  return (
    <div>
      <div style={titleContainer}>
        <h1 style={title}>Play 24!</h1>
        <div style={cardContainer}>
          <div style={card}>{nums[0]}</div>
          <div style={card}>{nums[1]}</div>
          <div style={card}>{nums[2]}</div>
          <div style={card}>{nums[3]}</div>
        </div>

        <div style={{ margin: '20px 20px 20px 20px' }}>
          <inputContainer>
            <TextField
              id="outlined-basic"
              label="Fill in expression"
              variant="outlined"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value.toString());
                handleInput(e.target.value.toString());
              }}
            />
          </inputContainer>
        </div>

        <Button
          style={{
            backgroundColor: '#f44336', // Green color
            color: 'white',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            margin: '10px',
          }}
          onClick={handleVerify}
        >
          Click to verify!
        </Button>

        <Button
          style={{
            backgroundColor: '#4caf50', // Green color
            color: 'white',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            margin: '10px',
          }}
          onClick={generateNewNums}
        >
          Generate New Numbers
        </Button>
        <div>{result !== null && <DisplayResult result={result} />}</div>
      </div>
    </div>
  );
};

export default App;
