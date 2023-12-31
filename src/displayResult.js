const DisplayResult = ({ result }) => {
  const textStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
    color: result === true ? 'blue' : 'red',
    backgroundColor: 'white',
  };

  return (
    <div>
      <div style={textStyle}>
        {result === true ? 'Correct!' : 'Nope, try again'}
      </div>
    </div>
  );
};

export default DisplayResult;
