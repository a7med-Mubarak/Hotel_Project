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
import { ADS_ADMIN_ENDPOINTS, ROOM_ADMIN_ENDPOINTS } from "../../../../../utils/ENDPOINTS";

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

    // Append discount
    if (data.discount !== undefined) {
      formData.append("discount", data.discount.toString());
    } else {
      toast.error("Discount is required");
      return;
    }

    try {
      const res = await axios.post(ADS_ADMIN_ENDPOINTS.createAds, formData, {
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
            label="Discount"
            variant="outlined"
            placeholder="Discount"
            {...register("discount", { required: "Discount is required" })}
            error={!!errors.discount}
            helperText={errors.discount?.message}
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
