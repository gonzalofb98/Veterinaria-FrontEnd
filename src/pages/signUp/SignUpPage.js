import { Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignUpComponent from '../../Components/SignUp/SignUpComponent';


export default function SignUpPage(props) {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <div >
            <SignUpComponent tipo={props.tipo} />
            <Grid sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} container>
                <Grid item>
                    <Link onClick={
                        handleLoginClick
                    } variant="body2">
                        {"Already have an account? Sign in"}
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}