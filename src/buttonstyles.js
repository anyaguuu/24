import { Button } from '@mui/material';

export const VerifyButton = () => {
  return (
    <Button
      sx={{
        backgroundColor: '#f44336', // Red color
        color: 'white',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        margin: '10px',
      }}
    >
      Click to verify!
    </Button>
  );
};

export const GenerateButton = () => {
  return (
    <Button
      sx={{
        backgroundColor: '#4caf50', // Green color
        color: 'white',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        margin: '10px',
      }}
    >
      Generate new numbers!
    </Button>
  );
};
