import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { ROOM_ADMIN_ENDPOINTS } from "../../../../../utils/ENDPOINTS";

interface Facility {
  name: string; // Adjust based on your API response structure
  _id: number; // Ensure this aligns with your API
}

interface Room {
  roomNumber: number;
  imgs: FileList;
  capacity: number;
  price: number;
  discount: number;
  category: string;
  _id?: number;
  name: string;
  facilities: string[];
}

export default function CreateUser() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Room>();

  const createRoom = async (data: Room) => {
    console.log("Submitted Data:", data);

    const formData = new FormData();

    // Append room number
    if (data.roomNumber !== undefined) {
      formData.append("roomNumber", data.roomNumber.toString());
    } else {
      toast.error("Room number is required");
      return;
    }

    // Append price
    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
    } else {
      toast.error("Price is required");
      return;
    }

    // Append capacity
    if (data.capacity !== undefined) {
      formData.append("capacity", data.capacity.toString());
    } else {
      toast.error("Capacity is required");
      return;
    }

    // Append discount
    if (data.discount !== undefined) {
      formData.append("discount", data.discount.toString());
    } else {
      toast.error("Discount is required");
      return;
    }

    // Handle imgs
    if (data.imgs && data.imgs.length > 0) {
      Array.from(data.imgs).forEach((img, index) => {
        formData.append(`imgs`, img);
      });
    } else {
      toast.error("Please upload an image");
      return;
    }

    // Handling facilities
    console.log("Facilities Data:", data.facilities);

    // Handling facilities
    // Handling facilities
    if (Array.isArray(data.facilities) && data.facilities.length > 0) {
      data.facilities.forEach((facilityId) => {
        formData.append("facilities[]", facilityId); // Append the ID of the facility
      });
    } else {
      toast.error("Facilities are required");
      return;
    }

    try {
      const res = await axios.post(ROOM_ADMIN_ENDPOINTS.createRooms, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res);
      toast.success("Room created successfully!");
      // nav('dashboard/Room'); // Navigate to rooms page after success
    } catch (error) {
      console.error(error);
      toast.error("Failed to create room");
    }
  };

  const [facilities, setFacilities] = React.useState<Facility[]>([]);

  const fetchFacilities = async () => {
    try {
      let res = await axios.get(ROOM_ADMIN_ENDPOINTS.facility, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setFacilities(res.data.data.facilities);
      console.log(res.data.data.facilities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFacilities();
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
          <Typography variant="h2" fontSize="20px" fontWeight="600">
            Rooms Table Details
          </Typography>
          <Typography variant="h4" fontSize="14px" fontWeight="400">
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
        <Box mb="5px">
          <TextField
            fullWidth
            label="Room Number"
            type="text"
            variant="outlined"
            placeholder="Room Number"
            {...register("roomNumber", { required: "Room number is required" })}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}
          />
        </Box>
        <Box mb="5px">
          <TextField
            fullWidth
            type="text"
            label="Price"
            variant="outlined"
            placeholder="Price"
            {...register("price", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Box>
        <Box mb="5px">
          <TextField
            fullWidth
            type="text"
            label="Capacity"
            variant="outlined"
            placeholder="Capacity"
            {...register("capacity", { required: "Capacity is required" })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
          />
        </Box>
        <Box mb="5px">
          <TextField
            fullWidth
            type="text"
            label="Discount"
            variant="outlined"
            placeholder="Discount"
            {...register("discount", { required: "Discount is required" })}
            error={!!errors.discount}
            helperText={errors.discount?.message}
          />
        </Box>
        <Box mb="5px">
          <Controller
            name="facilities"
            control={control}
            defaultValue={[]} // Ensure default is an empty array
            rules={{ required: "Facilities are required" }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Facilities
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Facilities"
                  multiple
                  value={field.value || []} // Ensure value is always an array
                  onChange={(e) => {
                    const value = e.target.value; // This is an array for multiple selects
                    field.onChange(
                      typeof value === "string" ? value.split(",") : value
                    ); // Handle case when multiple values are selected
                  }}
                >
                  {facilities.map((facility) => (
                    <MenuItem key={facility._id} value={facility._id}>
                      {facility.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <Box mb="5px">
          <Controller
            name="imgs"
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
