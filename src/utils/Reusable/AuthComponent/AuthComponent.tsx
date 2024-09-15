import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import logo from "../../../assets/logo.svg"

interface AuthComponentProps {
  form: React.ReactNode
  image: string
  imgHeader: string
  imgText: string
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  form,
  image,
  imgHeader,
  imgText,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} sx={{ position: "relative" }}>
        <div className="pt-5 px-4 md:ps-10">
          <img src={logo} alt="Logo" />
          <div>{form}</div>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            blockSize: "100vh",
            minHeight: "100%",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <img src={image} alt="login" className="h-full w-full p-5" />
          <div className="absolute z-20 bottom-20 left-20 text-white">
            <h3 className="text-4xl font-extrabold">{imgHeader}</h3>
            <p className="text-xl">{imgText}</p>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AuthComponent
