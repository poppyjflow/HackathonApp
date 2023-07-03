import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditUserForm from '../components/EditUserForm';
import EmailToggle from '../components/EmailToggle';
import { Button } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Switch }from '@mui/material';
import DeleteUser from '../components/DeleteUser';


const Settings = () => {
  const navigate = useNavigate()
  const [user, setUser] = useOutletContext();

  const handleNavigation = () => {
    navigate('/profile')
    return
  }
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    setUser({ auth: '', user: '' });
  };

  return (
    <Box height='100%'>
    <Card sx={{ maxWidth: '100%', height: 'auto', paddingTop: '1em'}}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          User Settings
        </Typography>
      </CardContent>
    </Card>

    <EmailToggle />

    <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Change Organization
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send a request to have your organization changed.
          </Typography>
          <Button onClick={handleNavigation} variant='contained' color='error' sx={{marginTop: '1em'}}>Edit</Button>
        </CardContent>
    </Card>

    {/* <EditUserForm /> */}
    <DeleteUser props={{user, handleLogout}}/>

    <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Logout
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Terminate user session.
          </Typography>
          <Button onClick={handleLogout} variant='contained' color='error' sx={{marginTop: '1em'}}>Logout</Button>
        </CardContent>
    </Card>
    </Box>
  );
};

export default Settings;
