import { Box, Grid, Typography,Link} from '@mui/material';
import brand from "../../../../assets/logo.svg"
export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'dark', color: '#000',padding:10 }}>
    <Grid container spacing={15}>
      <Grid item xs={12} sm={4} md={3}>
        <div className="m-1">
        <img src={brand} alt="Logo" />
        </div>
        <Typography style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}}>
          We kaboom your beauty holiday instantly and memorably.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={3 }>
        <Typography variant="h6" style={{color:"rgba(21, 44, 91, 1)"}} gutterBottom>For Beginners</Typography>
        <Link style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} href="#" color="inherit">New Account</Link><br />
        <Link style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} href="#" color="inherit">Start Booking a Room</Link><br />
        <Link style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} href="#" color="inherit">Use Payments</Link>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="h6" gutterBottom style={{color:"rgba(21, 44, 91, 1)"}}>Explore Us</Typography>
        <Link style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} href="#" color="inherit">Our Careers</Link><br />
        <Link style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} href="#" color="inherit">Privacy</Link><br />
        <Link style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} href="#" color="inherit">Terms & Conditions</Link>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="h6" gutterBottom style={{color:"rgba(21, 44, 91, 1)"}}>Connect Us</Typography>
        <Typography style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} variant="subtitle1">support@staycation.id</Typography>
        <Typography style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} variant="subtitle1">021 – 2208 – 1996</Typography>
        <Typography style={{color:"rgba(176, 176, 176, 1)",textDecoration:"none"}} variant="subtitle1">Staycation, Kemang, Jakarta</Typography>
      </Grid>
    </Grid>
  </Box>
  )
}
