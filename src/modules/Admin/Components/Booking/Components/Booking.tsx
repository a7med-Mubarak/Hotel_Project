import { Box, Button, Modal, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { AUTH_ADMIN_ENDPOINTS } from '../../../../../utils/ENDPOINTS';
import { toast } from 'react-toastify';

export default function Booking() {
  const [BookingData, setBookingData] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const GetBooking = async (pageNo = 1, pageSize = 2, nameInput = "") => {
    try {
      const response = await axios.get(AUTH_ADMIN_ENDPOINTS.Booking, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          pageNumber: pageNo,
          pageSize: pageSize,
          userName: nameInput
        }
      });
      setBookingData(response.data.data.booking);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  React.useEffect(() => {
    GetBooking(1, 4);
  }, []);

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    handleOpen();
  };

  return (
    <div className='ms-32 mt-24 mr-10'>
      <div>
        <h4>Booking Table Details</h4>
        <h5>You can check all details</h5>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Start Date</StyledTableCell>
              <StyledTableCell align="right">End Date</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="right">User</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {BookingData ? (
              BookingData.map((Booking: any) => (
                <StyledTableRow key={Booking._id}>
                  <StyledTableCell component="th" scope="row">
                    {Booking.room ? Booking.room.roomNumber : 'No Room Assigned'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(Booking.startDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(Booking.endDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">{Booking.totalPrice}</StyledTableCell>
                  <StyledTableCell align="right">{Booking.user.userName}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => handleViewBooking(Booking)}>👁️ View</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedBooking ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Booking Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Room: {selectedBooking.room ? selectedBooking.room.roomNumber : 'No Room Assigned'}
              </Typography>
              <Typography>
                Start Date: {new Date(selectedBooking.startDate).toLocaleDateString()}
              </Typography>
              <Typography>
                End Date: {new Date(selectedBooking.endDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Total Price: {selectedBooking.totalPrice ?? 'No Price Available'}
              </Typography>
              <Typography>
                Total Price: {selectedBooking.user.userName ?? 'No user Available'}
              </Typography>
            </>
          ) : (
            <Typography>Loading Booking Details...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
