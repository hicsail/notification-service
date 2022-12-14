import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EmailTemplate } from '../common/emailTemplate';

export interface ForgotPasswordProps {
    link: string;
}

export default function (props: ForgotPasswordProps) {

    return (
      <EmailTemplate title="Password Reset" subheader="You are receiving this email because you requested a password reset.">
        <Box
            sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            <br></br>
            <br></br>
            <div>You may reset your password following the link below</div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href={props.link}
                >
                    Reset Password
                </Button>
            </Box>
            <br></br>
            <div>If you did not request a PW reset, please ignore this email </div>
        </Box>
      </EmailTemplate>
    )
}
