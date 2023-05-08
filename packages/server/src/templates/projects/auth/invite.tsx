import { FC } from 'react';
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { BasicCard } from '../../layouts/basic-card';

export interface InviteProps {
  link: string;
  project?: {
    name?: string;
    logo?: string;
    homepage?: string;
  };
}

const Invite: FC<InviteProps> = (props) => {
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
      <Typography>You have been invited to join {props.project?.name}!</Typography>
      <Typography>To get started, simply follow the link below and create your account:</Typography>
      <Button component='a' fullWidth variant='contained' href={props.link} target='_blank' sx={{ mt: 2, mb: 1 }} disableElevation>
        Create Account
      </Button>
    </BasicCard>
  );
};

export default Invite;
