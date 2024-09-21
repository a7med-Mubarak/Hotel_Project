import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import axios from "axios";
import { ROOM_ADMIN_ENDPOINTS } from "../../../../../utils/ENDPOINTS";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface Facility {
  name: string;
  _id: number;
}
interface Room {
  roomNumber: number;
  images: string;
  capacity: number;
  price: number;
  discount: number;
  Discount: number;
  category: string;
  _id: number;
  name: string;
  facilities: string;
}
export default function CreateUser() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // تأكد من جلب control هنا
  } = useForm<Room>();

  // createroom
  const createRoom = async (data: Room) => {
    console.log("Submitted Data:", data);
  
    const formData = new FormData();
  
    // Check if roomNumber is provided
    if (data.roomNumber !== undefined) {
      formData.append("roomNumber", data.roomNumber.toString());
    } else {
      toast.error("Room number is required");
      return;
    }
  
    // Check if price is provided
    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
    } else {
      toast.error("Price is required");
      return;
    }
  
    // Check if capacity is provided
    if (data.capacity !== undefined) {
      formData.append("capacity", data.capacity.toString());
    } else {
      toast.error("Capacity is required");
      return;
    }
  
    // Check if discount is provided
    if (data.discount !== undefined) {
      formData.append("discount", data.discount.toString());
    } else {
      toast.error("Discount is required");
      return;
    }
  
    // Check if an image is provided
    if (data.images && data.images.length > 0) {
      formData.append("images", data.images[0]);
    } else {
      toast.error("Please upload an image");
      return;
    }
  
    // Check if facilities is provided
    if (data.facilities) {
      formData.append("facilities", data.facilities);
    }
  
    try {
      let res = await axios.post(ROOM_ADMIN_ENDPOINTS.createRooms, formData, {
        headers: {
          Authorization: `${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      toast.success("Room created successfully!");
      nav('/rooms'); // Navigate to rooms page after success
    } catch (error) {
      console.error(error);
      toast.error("Failed to create room");
    }
  };
  


  
  
  
  // facility
  const [getfacility, setgetfacility] = React.useState<Facility[]>([]);
  const facilityRoom = async () => {
    try {
      let res = await axios.get(ROOM_ADMIN_ENDPOINTS.facility, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setgetfacility(res.data.data.facilities);
      console.log(res.data.data.facilities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    facilityRoom(); // لاسترجاع قائمة المنشآت
  }, []);

  return (
    <>
      <Box
        className="pro-main"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", md: "row" }}
        mb={4}
      >
        <Box className="pro-info" mb={{ xs: 2, md: 0 }}>
          <Typography variant="h2" fontSize={"20px"} fontWeight={"600"}>
            Rooms Table Details
          </Typography>
          <Typography variant="h4" fontSize={"14px"} fontWeight={"400"}>
            You can check all details
          </Typography>
        </Box>
      </Box>

      <Container
        component="form"
        maxWidth="md"
        sx={{ p: 5, boxShadow: 3 }}
        onSubmit={handleSubmit(createRoom)}
      >
        <Box mb={"5px"}>
          <TextField
            fullWidth
            label="Room Number"
            type="text"
            variant="outlined"
            placeholder="Room Number"
            {...register("roomNumber", {
              required: "roomNumber is required",
            })}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}

          />
        </Box>

        <Box mb={"5px"}>
          <TextField
            fullWidth
            type="text"
            label="price"
            variant="outlined"
            placeholder="Price"
            {...register("price", {
              required: "price is required",
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Box>

        <Box mb={"5px"}>
          <TextField
            fullWidth
            type="text"
            label="capacity"
            variant="outlined"
            placeholder="capacity"
            {...register("capacity", {
              required: "capacity is required",
            })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
          />
        </Box>

        <Box mb={"5px"}>
          <TextField
            fullWidth
            type="text"
            label="discount"
            variant="outlined"
            placeholder="discount"
            {...register("discount", {
              required: "discount is required",
            })}
            error={!!errors.discount}
            helperText={errors.discount?.message}
          />
        </Box>

        <FormControl fullWidth sx={{marginBottom:"5px"}} error={!!errors.facilities}>
          <InputLabel id="demo-simple-select-label">Facilities</InputLabel>
          <Controller
            name="facilities"
            control={control}
            rules={{ required: "Facilities is required" }}
            render={({ field }) => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="facilities"
                value={field.value}
                onChange={(e) => {
                  console.log("Selected Facility ID:", e.target.value);
                  field.onChange(e.target.value);
                }}
              >
                {getfacility?.map((facility) => (
                  <MenuItem key={facility._id} value={facility.name}>
                    {facility.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.facilities && (
            <FormHelperText>{errors.facilities.message}</FormHelperText>
          )}
        </FormControl>

        <Box mb={"5px"}>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <label
                htmlFor="formFile"
                style={{
                  display: "block",
                  padding: "10px",
                  border: "1px solid green",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Drag & Drop or Choose a Profile Image
                <input
                  type="file"
                  id="formFile"
                  style={{ display: "none" }}
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </label>
            )}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            onClick={() => nav(-1)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: 2 }}
          >
            Save
          </Button>
        </Box>
      </Container>


    </>
  );
}