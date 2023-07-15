import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import DisplayResult from './displayResult';

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

const getHint = (nums) => {
  const ops = ['+', '-', '*', '/'];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        const expression = `(${nums[0]} ${ops[i]} ${nums[1]}) ${ops[j]} (${nums[2]} ${ops[k]} ${nums[3]})`;
        if (eval(expression) === 24) {
          console.log('answer exists: ', expression);
          return true;
        }
      }
    }
  }
  console.log('no answer');
  return false;
};

const App = () => {
  const [nums, setNums] = useState([]);
  const [result, setResult] = useState(null);
  const [userExpr, setUserExpr] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleVerify = () => {
    if (eval(userExpr) === 24) {
      setResult(true);
    } else {
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
    setResult(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Play 24!</h1>
      <div style={styles.cardContainer}>
        {nums.map((num, index) => (
          <div key={index} style={styles.card}>
            {num}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
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
      </div>

      <div style={styles.buttonContainer}>
        <Button style={styles.verifyButton} onClick={handleVerify}>
          Verify
        </Button>

        <Button style={styles.generateButton} onClick={generateNewNums}>
          Generate New Numbers
        </Button>
      </div>

      <div style={styles.resultContainer}>
        {result !== null && <DisplayResult result={result} />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '40px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  card: {
    width: '80px',
    height: '80px',
    margin: '0 10px',
    background: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#555',
    borderRadius: '50%',
  },
  inputContainer: {
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  verifyButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    margin: '0 10px',
    minWidth: '150px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  generateButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    margin: '0 10px',
    minWidth: '200px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#1e88e5',
    },
  },
  resultContainer: {
    textAlign: 'center',
  },
};

export default App;
