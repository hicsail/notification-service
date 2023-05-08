import { FC } from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { BasicCard } from '../../layouts/basic-card';

export interface PasswordUpdatedProps {
  project?: {
    name?: string;
    logo?: string;
    homepage?: string;
  };
}

const PasswordUpdated: FC<PasswordUpdatedProps> = (props) => {
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
      <Typography variant='h6'>Password update successful</Typography>
      <Typography>The password for your {props.project?.name} has been successfully changed. If you didn't make this change, please let us your project administrator know immediately.</Typography>
    </BasicCard>
  );
};

export default PasswordUpdated;
