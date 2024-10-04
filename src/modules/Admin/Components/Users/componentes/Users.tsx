import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Pagination, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BASE_AUTH_ADMIN,
} from "../../../../../utils/ENDPOINTS";
interface User {
  _id: number;
  email: string;
  userName: string;
  phoneNumber: number;
  country: string;
  profileImage: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[] | null>([]);
  const [page, setPage] = useState<number>(1);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: " rgba(226, 229, 235, 1)",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const getUsers = async (pageNo: number, pageSize: number) => {
    try {
      const response = await axios.get(BASE_AUTH_ADMIN, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
        params: { page: pageNo, size: pageSize },
      });
      setUsers(response.data.data.users);
    } catch (error: object) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(1, 10);
  }, []);
  return (
    <>
      <Box sx={{ px: 2, py: 1 ,marginBottom: "40px" }}>
        <Typography variant="h4"> Booking Table Details</Typography>
        <Typography variant="h6"> Booking Table Details</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>UserName </StyledTableCell>
              <StyledTableCell align="right">Image </StyledTableCell>
              <StyledTableCell align="right">Emaill </StyledTableCell>
              <StyledTableCell align="right">Phone Number </StyledTableCell>
              <StyledTableCell align="right">Country </StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {user.userName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <img
                    src={user.profileImage}
                    alt="user img"
                    style={{ width: "60px ", height: "60px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{user.country}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: "30px" }}>
        <Pagination
          count={10}
          page={page}
          onChange={(event, value: number) => {
            setPage(value);
            getUsers(value, 10);
          }}
        />
      </Box>
    </>
  );
}
