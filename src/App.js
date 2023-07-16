import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
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

// total # solutions
const getNumSolutions = (nums) => {
  let numSolutions = 0;
  const perms = [];
  generatePermutations(nums, [], perms);
  perms.forEach((perm) => {
    console.log('testing perm: ' + perm);
    if (testOnePerm(perm)) numSolutions++;
  });
  console.log('num solutions: ' + numSolutions);
  return numSolutions;
};

// check if one solution exists
const testOnePerm = (nums) => {
  const ops = ['+', '-', '*', '/', '**'];
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
  console.log('no solution');
  return false;
};

const getLevel = (numSolutions) => {
  if (numSolutions === 0) return 0; // unsolvable
  else if (numSolutions >= 5) return 1; // easy
  else if (numSolutions >= 3) return 2; // medium
  else return 3; // hard (1 solution or unsolveable)
};

const App = () => {
  const [nums, setNums] = useState([]);
  const [result, setResult] = useState(null);
  const [userExpr, setUserExpr] = useState('');
  const [textValue, setTextValue] = useState('');
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [streak, setStreak] = useState(0);

  localStorage.setItem('streak', '0'); // store in local storage

  useEffect(() => {
    // retrieve from local storage
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(Number(storedStreak));
    }
  }, []);

  //   update level
  // useEffect(() => {
  //   const newLevel = getLevel(getNumSolutions(nums));
  //   setLevel(newLevel);
  //   console.log('new level: ' + newLevel);
  // }, [nums]);

  const checkAllNumsIncluded = () => {
    const extractIntegers = (expression) => {
      const regex = /\d+/g; // Regular expression to match one or more digits
      const matches = expression.match(regex); // Array of matched digits
      const integers = matches ? matches.map(Number) : []; // Convert matched strings to numbers
      return integers;
    };

    const integers = extractIntegers(userExpr).sort();
    console.log('integers: ' + integers);
    console.log('nums: ' + nums.sort());
    return integers.every((elem, idx) => elem === nums.sort()[idx]);
  };

  const handleVerify = () => {
    try {
      if (eval(userExpr) === 24 && checkAllNumsIncluded()) {
        setResult(true);
        const newStreak = streak + 1;
        localStorage.setItem('streak', newStreak.toString());
        setStreak(newStreak);
        console.log('new streak = ' + newStreak);
      } else {
        setResult(false);
      }
    } catch (e) {
      if (userExpr.toLowerCase() === 'x') {
        if (level === 0) {
          setResult(true);
          const newStreak = streak + 1;
          localStorage.setItem('streak', newStreak.toString());
          setStreak(newStreak);
          console.log('new streak = ' + newStreak);
        }
      } else {
        setResult(false);
      }
    }
  };

  const handleInput = (expr) => {
    setUserExpr(expr);
  };

  const generateNewNums = () => {
    setStarted(true);
    const newNums = getNums();
    setNums(newNums);
    setTextValue('');
    setResult(null);
    const newLevel = getLevel(getNumSolutions(newNums));
    setLevel(newLevel);
    console.log('new level: ' + newLevel);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Play 24!</h1>
      <div style={styles.streakContainer}>
        <div style={styles.streak}>Streak: {streak}</div>
      </div>
      <div style={styles.levelContainer}>
        <div style={styles.level}>
          {started && (
            <Box
              sx={{
                display: 'inline',
                backgroundColor:
                  level === 0 || level === 3
                    ? '#f44336' // Red color
                    : level === 2
                    ? '#ffc107' // Amber color
                    : '#4caf50', // Green color
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              {level === 0 || level === 3
                ? 'Difficult'
                : level === 2
                ? 'Medium'
                : 'Easy'}
            </Box>
          )}
        </div>
      </div>
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
          label="Fill in expression or x"
          variant="outlined"
          value={textValue}
          InputProps={{ readOnly: !started }}
          onChange={(e) => {
            setTextValue(e.target.value.toString());
            handleInput(e.target.value.toString());
          }}
        />
      </div>

      <div style={styles.buttonContainer}>
        <Button
          disabled={!started}
          style={styles.verifyButton}
          onClick={handleVerify}
        >
          Verify ✔️
        </Button>

        <Button style={styles.generateButton} onClick={generateNewNums}>
          {started ? 'Generate 🔄 ' : 'Generate New Numbers 🔄 '}
        </Button>
      </div>

      <div style={styles.resultContainer}>
        {result !== null && <DisplayResult result={result} />}
      </div>

      <span style={styles.inspiredText}>
        inspired by{' '}
        <a href="https://24.zawie.io" style={{ ...styles.link, color: '#777' }}>
          zawie
        </a>
        &lt;3
      </span>
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
    marginBottom: '20px',
  },
  streakContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '8px 16px',
  },
  streak: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#555',
  },
  levelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  level: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#555',
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
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
  inspiredText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#777',
    marginTop: '200px',
  },
  link: {
    textDecoration: 'underline',
  },
};

export default App;
