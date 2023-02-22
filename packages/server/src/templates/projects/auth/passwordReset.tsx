import { FC } from 'react';
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { BasicCard } from '../../layouts/basic-card';

export interface ForgotPasswordProps {
  link: string;
  project?: {
    name?: string;
    logo?: string;
    homepage?: string;
  };
}

const PasswordReset: FC<ForgotPasswordProps> = (props) => {
  return (
    <BasicCard>
      <Box
        component='a'
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        target='_blank'
        href={props.project?.homepage || 'https://sail.bu.edu'}>
        <Avatar sx={{ width: 36, height: 36, mr: 1 }} src={props.project?.logo || 'https://sail.codes/img/s_logo.png'} />
        <Typography component='span' variant='h5'>
          {props.project?.name || 'SAIL'}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography>We've received a request to reset your password. No changes have been made to your account yet.</Typography>
      <Typography>You can reset your password by clicking the link below.</Typography>
      <Button component='a' fullWidth variant='contained' href={props.link} target='_blank' sx={{ mt: 2, mb: 1 }} disableElevation>
        Reset your password
      </Button>
      <Typography>If you didn't request a password reset, you can safely ignore this email.</Typography>
    </BasicCard>
  );
};

export default PasswordReset;
