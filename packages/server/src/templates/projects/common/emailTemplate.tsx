import { FC } from 'react';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';

export interface EmailTemplateProps {
  title: string;
  subheader: string;
  children: any;
  footer?: string;
}

export const EmailTemplate: FC<EmailTemplateProps> = (props: EmailTemplateProps) => {
  return(
    <Container component="main" maxWidth="xs">
      <Card>
        <CardHeader title = {props.title} subheader = {props.subheader} />

        {props.children}
      </Card>
    </Container>
  )
}
