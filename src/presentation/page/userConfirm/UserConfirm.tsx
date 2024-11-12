import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress, Grid2 } from '@mui/material';
import OtpInput from '../../components/OTPinput/OtpInput';

const UserConfirm: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    // Lógica para confirmar el código (por ejemplo, hacer una petición a la API)
    setTimeout(() => {
      setIsLoading(false);
      alert(`Code confirmed: ${code}`);
    }, 2000); // Simulación de llamada a la API
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ maxWidth: 400, padding: 3 }}>
        <CardContent sx={{ gap: 2 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Confirm Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Please enter the confirmation code sent to your email.
          </Typography>
          <Grid2>
            {/* <OtpInput /> */}
          </Grid2>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Confirm'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserConfirm;
