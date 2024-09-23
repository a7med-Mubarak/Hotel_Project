import authLogin from "../../../../assets/Auth/login.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_ADMIN_ENDPOINTS } from "../../../../utils/ENDPOINTS";
import { toast } from "react-toastify";
import AuthComponent from "../../../../utils/Reusable/AuthComponent/AuthComponent";

export default function ChangePass() {
  // token
  const token = localStorage.getItem("token");
  interface formValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string; // تعديل الاسم هنا
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" } }); // تعديل الاسم هنا
  const navigate = useNavigate();
  const Submit = async (data: formValues) => {
    try {
      const response = await axios.post(AUTH_ADMIN_ENDPOINTS.CHANGE_PASSWORD, data, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response);
      toast.success("Change password successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const form = () => {
    return (
      <form onSubmit={handleSubmit(Submit)} className="mt-5 md:p-10">
        <div className="gap-4 flex flex-col">
          <h3 className="text-4xl">Change Password</h3>
        </div>
        <div className="mt-10">
          <label htmlFor="OldPassword" className="text-main">
            Enter your Old Password
          </label>
          <TextField
            {...register("oldPassword", { required: true })}
            error={errors.oldPassword ? true : false}
            variant="outlined"
            className="w-full mt-5"
            id="oldPassword"
            label="Enter your Old Password"
            helperText={errors.oldPassword ? "Old password is required" : ""}
          />
        </div>
        <div className="mt-10">
          <label htmlFor="newPassword" className="text-main">
            Enter your New Password
          </label>
          <TextField
            {...register("newPassword", { required: true })}
            error={errors.newPassword ? true : false}
            variant="outlined"
            className="w-full mt-5"
            id="newPassword"
            label="Enter your New Password"
            helperText={errors.newPassword ? "New password is required" : ""}
          />
        </div>
        <div className="mt-10">
          <label htmlFor="confirmPassword" className="text-main">
            Confirm New Password
          </label>
          <TextField
            {...register("confirmPassword", { required: true })} // تعديل الاسم هنا
            error={errors.confirmPassword ? true : false}
            variant="outlined"
            className="w-full mt-5"
            id="confirmPassword"
            label="Confirm New Password"
            helperText={errors.confirmPassword ? "Confirmation password is required" : ""}
          />
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
          Save
        </Button>
      </form>
    );
  };
  return (
    <>
      <AuthComponent
        form={form()}
        image={authLogin}
        imgHeader="Change Password to Roamhome"
        imgText="Homes as unique as you."
      />
    </>
  );
}
