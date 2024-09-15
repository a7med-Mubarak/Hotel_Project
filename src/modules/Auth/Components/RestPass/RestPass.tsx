import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from "axios"
import { AUTH_ADMIN_ENDPOINTS } from "../../../../utils/ENDPOINTS"
import { toast } from "react-toastify"
import AuthComponent from "../../../../utils/Reusable/AuthComponent/AuthComponent"
import { Box, Typography } from "@mui/material"
import LockResetIcon from "@mui/icons-material/LockReset"
import authReset from "../../../../assets/Auth/reset.png"

interface ResetPasswordFormValues {
  email: string
  password: string
  confirmPassword: string
  seed: string
}

export default function ResetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>()
  const navigate = useNavigate()

  const Submit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      const response = await axios.post(AUTH_ADMIN_ENDPOINTS.RESET_PASSWORD, {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        seed: data.seed,
      })
      toast.success("Password reset successfully")
      navigate("/login")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred")
    }
  }

  const form = () => {
    return (
      <form onSubmit={handleSubmit(Submit)} className="mt-5 md:p-10">
        <div className="gap-4 flex flex-col">
          <h3 className="text-6xl">Reset Password</h3>
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
          <label htmlFor="email" className="text-main">
            Email Address
          </label>
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            variant="outlined"
            className="w-full mt-2"
            id="email"
            label="Please type here ..."
            helperText={errors.email?.message}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="seed" className="text-main">
            OTP
          </label>
          <TextField
            {...register("seed", { required: "Reset Code is required" })}
            error={!!errors.seed}
            variant="outlined"
            className="w-full mt-2"
            id="seed"
            label="Please type here ..."
            helperText={errors.seed?.message}
          />
        </div>

        <div className="mt-6">
          <label htmlFor="password" className="text-main">
            Password
          </label>
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={!!errors.password}
            variant="outlined"
            className="w-full mt-2"
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
            className="w-full mt-2"
            id="confirmPassword"
            type="password"
            label="Please type here ..."
            helperText={errors.confirmPassword?.message}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          className="w-full"
          color="primary"
          sx={{
            mt: 4,
            backgroundColor: "var(--btn-color)",
          }}
        >
          Reset Password
        </Button>
      </form>
    )
  }

  return (
    <AuthComponent
      form={form()}
      image={authReset}
      imgHeader="Reset Your Password"
      imgText="Secure your account with a new password."
    />
  )
}
