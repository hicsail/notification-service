import React, { FC } from 'react';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

export interface EmailTemplateProps {
  title: string;
  subheader: string;
  footer?: string;
  children?: React.ReactNode;
}

export const EmailTemplate: FC<EmailTemplateProps> = (props) => {
  const theme = useTheme();

  return(
    <Container component="main" sx={{ bgcolor: theme.palette.background.default }} maxWidth="md">
      <Card sx={{ bgcolor: theme.palette.background.paper }}>
        <CardHeader title = {props.title} subheader = {props.subheader} />

        {props.children}
      </Card>
    </Container>
  )
}
