import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material'; 
import Grid from '@mui/material/Grid';
import logo from "../../../../assets/Group.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

interface formValues{
  email:string;
  password:string;
}
export default function Login() {
  // send data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <formValues>({ defaultValues:{email:"",password:""}});
  
  const Submit=(data:formValues)=>{
    console.log(data)

  }
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <Stack sx={{padding:"5rem"}}>
            <Typography variant='h6'className='mb-5'>
            Staycation.
            </Typography>
            <Typography variant='h3' sx={{padding:"5px 0"}}>
            Sign in
            </Typography>
            <Typography variant='h6'sx={{marginBottom:"2rem"}}>
            If you don’t have an account register,You can   Register here !
            </Typography>
            <form onSubmit={handleSubmit(Submit)}>
              <Stack spacing={2}>
            <TextField type='email' id="outlined-basic1" label="Email" variant="outlined" 
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email',{
              required:"email is required"
            })} />
            <TextField type='password' id="outlined-basic2" label="Password" variant="outlined"
             error={!!errors.password}
             helperText={errors.password?.message}
            {...register('password',{
              required:"password is required"
            })}/>
            <Button type='submit' variant="contained">Contained</Button>
              </Stack>
            </form>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack>
            <img src={logo} alt="logo"/>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
}
