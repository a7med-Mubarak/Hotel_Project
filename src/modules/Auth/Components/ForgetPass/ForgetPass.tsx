import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from "axios"
import { AUTH_ADMIN_ENDPOINTS } from "../../../../utils/ENDPOINTS"
import { toast } from "react-toastify"
import AuthComponent from "../../../../utils/Reusable/AuthComponent/AuthComponent"
import authReset from "../../../../assets/Auth/forget.png"

interface ForgetPasswordFormValues {
  email: string
}

export default function ForgetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormValues>()
  const navigate = useNavigate()

  const Submit: SubmitHandler<ForgetPasswordFormValues> = async (data) => {
    try {
      const response = await axios.post(AUTH_ADMIN_ENDPOINTS.FORGOT_PASSWORD, {
        email: data.email,
      })
      toast.success("OTP sent successfully, please check your email")
      navigate("/ResetPass")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred")
    }
  }

  const form = () => {
    return (
      <form onSubmit={handleSubmit(Submit)} className="mt-5 md:p-10">
        <div className="gap-4 flex flex-col">
          <h3 className="text-6xl">Forget Password</h3>
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
