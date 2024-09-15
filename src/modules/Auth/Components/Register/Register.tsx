import React, { useState } from "react"
import authRegister from "../../../../assets/Auth/register.png"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { PORTAL_AUTH_ENDPOINTS } from "../../../../utils/ENDPOINTS"
import { toast } from "react-toastify"
import AuthComponent from "../../../../utils/Reusable/AuthComponent/AuthComponent"
import { Grid, Box, Typography } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

interface FormValues {
  email: string
  password: string
  userName: string
  phoneNumber: string
  country: string
  confirmPassword: string
  profileImage: File | null
}

const ImageUpload: React.FC<{
  onChange: (file: File | null) => void
  error?: string
}> = ({ onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onChange(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file" className="w-full">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2, width: "100%" }}
        >
          Upload Profile Image
        </Button>
      </label>
      {preview && (
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <img
            src={preview}
            alt="Profile preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  )
}

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()
  const navigate = useNavigate()

  const Submit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("userName", data.userName)
      formData.append("phoneNumber", data.phoneNumber)
      formData.append("country", data.country)
      formData.append("confirmPassword", data.confirmPassword)
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage)
      }

      const response = await axios.post(
        PORTAL_AUTH_ENDPOINTS.REGISTER,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      localStorage.setItem("token", response.data.data.token)
      toast.success("Registered successfully")
      navigate("/Dashboard")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred")
    }
  }

  const form = () => {
    return (
      <form onSubmit={handleSubmit(Submit)} className="mt-5 md:p-10">
        <div className="gap-4 flex flex-col">
          <h3 className="text-6xl">Sign up</h3>
          <p>
            If you already have an account register
            <br /> You can{" "}
            <Link
              className="font-bold hover:underline transition-all duration-300 text-red-500"
              to={"/login"}
            >
              Login here
            </Link>
            !
          </p>
        </div>
        <div className="mt-6">
          <label htmlFor="userName" className="text-main">
            User Name
          </label>
          <TextField
            {...register("userName", { required: "User Name is required" })}
            error={!!errors.userName}
            variant="outlined"
            className="w-full mt-5"
            id="userName"
            label="Please type here ..."
            helperText={errors.userName?.message}
          />
        </div>
        <div className="mt-6">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label htmlFor="phoneNumber" className="text-main">
                Phone Number
              </label>
              <TextField
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                error={!!errors.phoneNumber}
                variant="outlined"
                className="w-full mt-5"
                id="phoneNumber"
                label="Please type here ..."
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="Country" className="text-main">
                Country
              </label>
              <TextField
                {...register("country", { required: "Country is required" })}
                error={!!errors.country}
                variant="outlined"
                className="w-full mt-5"
                id="Country"
                label="Please type here ..."
                helperText={errors.country?.message}
              />
            </Grid>
          </Grid>
        </div>
        <div className="mt-6">
          <label htmlFor="email" className="text-main">
            Email Address
          </label>
          <TextField
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            variant="outlined"
            className="w-full mt-5"
            id="email"
            label="Please type here ..."
            helperText={errors.email?.message}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="password" className="text-main">
            Password
          </label>
          <TextField
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            variant="outlined"
            className="w-full mt-5"
            id="password"
            type="password"
            label="Please type here ..."
            helperText={errors.password?.message}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="confirmPassword" className="text-main">
            Confirm Password
          </label>
          <TextField
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            error={!!errors.confirmPassword}
            variant="outlined"
            className="w-full mt-5"
            id="confirmPassword"
            type="password"
            label="Please type here ..."
            helperText={errors.confirmPassword?.message}
          />
        </div>
        <Controller
          name="profileImage"
          control={control}
          rules={{ required: "Profile Image is required" }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <ImageUpload onChange={onChange} error={error?.message} />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          className="w-full"
          color="primary"
          sx={{
            mt: 1,
            backgroundColor: "var(--btn-color)",
          }}
        >
          Sign up
        </Button>
      </form>
    )
  }

  return (
    <AuthComponent
      form={form()}
      image={authRegister}
      imgHeader="Sign up to Roamhome"
      imgText="Homes as unique as you."
    />
  )
}
