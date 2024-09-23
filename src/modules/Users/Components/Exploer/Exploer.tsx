import Header from "../../../Shared/Components/Header/Header";
import { Box, Grid, Typography, Paper} from '@mui/material';
// import logo from "../../../../assets/Auth/pic (1).png";
// import logo2 from "../../../../assets/Auth/pic (2).png";
// import logo3 from "../../../../assets/Auth/pic (3).png";
import axios from "axios";
import { ROOM_ADMIN_ENDPOINTS } from "../../../../utils/ENDPOINTS";
import { useEffect, useState } from "react";
export default function Explorer() {
    // token
    const token=localStorage.getItem("token")
    console.log(token)
    const [room, setroom] = useState([])
  const getRooms=async()=>{
    try {
      let res=await axios.get(ROOM_ADMIN_ENDPOINTS.getRooms,{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(res)
    } catch (error) {
      console.log(error)
      
    }
  }
  // useefect
  useEffect(()=>{
    getRooms()
  },[])

  return (
    <>
      <Header />
      <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h3" component="h2"style={{textAlign:"center",color:"rgba(21, 44, 91, 1)",marginBottom:"73px",fontWeight:"600",fontSize:"34px"}}>
      Explore ALL Rooms 
      </Typography>
      <Typography variant="h3" component="h2"style={{color:"rgba(21, 44, 91, 1)",marginBottom:"20px",fontWeight:"500",fontSize:"24px"}}>
      All Rooms 
      </Typography>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* {items.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper elevation={3} sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover',borderRadius:"15px" }} />
                <Typography sx={{
                  position: 'absolute',
                  top: 0,
                  right:0,
                  width: '50%',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 73, 139, 1)',
                  color: '#fff',
                  padding: '8px',
                  borderRadius:"0px 15px 0px 15px"
                }}>
                  {item.price}
                </Typography>
              </Paper>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </>
  );
}
