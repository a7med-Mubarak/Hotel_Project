import authLogin from "../../../../assets/Auth/login.png"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AUTH_ADMIN_ENDPOINTS } from "../../../../utils/ENDPOINTS"
import { toast } from "react-toastify"
import AuthComponent from "../../../../utils/Reusable/AuthComponent/AuthComponent"

interface formValues {
  email: string
  password: string
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ defaultValues: { email: "", password: "" } })
  const navigate = useNavigate()
  const Submit = async (data: formValues) => {
    try {
      const response = await axios.post(AUTH_ADMIN_ENDPOINTS.LOGIN, data)
      localStorage.setItem("token", response.data.data.token)
      toast.success("Logged in successfully")
      navigate("/dashboard")
    } catch (error: any) {
      toast.error(error?.response.data.message)
    }
  }
  const form = () => {
    return (
      <form onSubmit={handleSubmit(Submit)} className="mt-5 md:p-10">
        <div className="gap-4 flex flex-col">
          <h3 className="text-6xl">Sign in</h3>
          <p>
            If you don’t have an account register <br /> You can{" "}
            <Link
              className="font-bold hover:underline transition-all duration-300 text-main"
              to={"/register"}
            >
              Register here
            </Link>
            !
          </p>
        </div>
        <div className="mt-10">
          <label htmlFor="email" className="text-main ">
            Email Address
          </label>
          <TextField
            {...register("email", { required: true })}
            error={errors.email ? true : false}
            variant="outlined"
            className="w-full mt-5"
            id="email"
            label="Please type here ..."
            helperText={errors.email ? "Email is required" : ""}
          />
        </div>
        <div className="mt-10">
          <label htmlFor="password" className="text-main ">
            Password
          </label>
          <TextField
            {...register("password", { required: true })}
            error={errors.password ? true : false}
            variant="outlined"
            className="w-full mt-5"
            id="password"
            label="Please type here ..."
            helperText={errors.password ? "Password is required" : ""}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Link
            className="hover:underline transition-all duration-300"
            to={"/forgetPass"}
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="w-full"
          color="primary"
          sx={{
            mt: 5,
            backgroundColor: "var(--btn-color)",
          }}
        >
          Sign in
        </Button>
      </form>
    )
  }
  return (
    <>
      <AuthComponent
        form={form()}
        image={authLogin}
        imgHeader="Sign in to Roamhome"
        imgText="Homes as unique as you."
      />
    </>
  )
}
