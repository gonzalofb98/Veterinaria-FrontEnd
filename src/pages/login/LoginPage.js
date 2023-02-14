import { Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../../Components/Login/LoginComponent';
import SignUpComponent from '../../Components/SignUp/SignUpComponent';


export default function LoginPage() {
    const navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate('/signup');
    };
    return (
        <div >
            <LoginComponent />
            <Grid sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} container>
                <Grid item>
                    <Link onClick={
                        handleSignUpClick
                    } variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}