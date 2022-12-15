import React, { FC } from 'react';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

export interface EmailTemplateProps {
  title: string;
  subheader?: string;
  footer?: string;
  children?: React.ReactNode;
}


export const EmailTemplate: FC<EmailTemplateProps> = (props) => {
  const theme = useTheme();

  return(
    <Box sx={{bgcolor: theme.palette.background.default, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{maxWidth: 'md', margin: 'auto' }}>
        <Card sx={{ bgcolor: theme.palette.background.paper, padding: theme.spacing(2) }}>
          <CardHeader title = {props.title} subheader = {props.subheader} />
          <Divider />

          {props.children}
        </Card>

        <Divider />
        <div style={{background: theme.palette.background.paper, padding: theme.spacing(2) }}>
          {props.footer}
        </div>
      </Box>
    </Box>
  )
}
