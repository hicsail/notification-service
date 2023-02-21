import { Card, CardContent, Container } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface BasicCardProps {
  children: ReactNode;
}

export const BasicCard: FC<BasicCardProps> = ({ children }) => {
  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ mt: 10 }}>
        <CardContent>{children}</CardContent>
      </Card>
    </Container>
  );
};
