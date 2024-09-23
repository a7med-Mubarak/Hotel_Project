import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Modal from "@mui/material/Modal";
import delimg from "../../../../../assets/Auth/Email.png";
import {
  ADS_ADMIN_ENDPOINTS,
} from "../../../../../utils/ENDPOINTS";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({  }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "rgba(226, 229, 235, 1)",
    color: "black",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Room {
  _id: number;
  page: number;
  size: number;
  name: string;
  roomNumber: number;
    images: string;
    capacity: number;
    price: number;
    discount: number;
    category: string;
  room: {
    roomNumber: number;
    images: string;
    capacity: number;
    price: number;
    discount: number;
    category: string;
  };
}


export default function Ads() {
  const nav = useNavigate();
  const [idRoom, setIdRoom] = React.useState<number | undefined>(undefined);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openmodal, setOpenmodal] = React.useState(false);
  const [rows, setRows] = React.useState<Room[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState<Room | null>(null);
  const [page, setPage] = React.useState<number>(1); // الصفحة الحالية
  const [searchname, setsearchname] = React.useState("");
  const token = localStorage.getItem("token");


    // const [selectedFacility, setSelectedFacility] = React.useState<string>(""); // إضافة حالة لتخزين القيمة المحددة
  // const handleFacilityChange = (event: SelectChangeEvent<string>) => {
  //   setSelectedFacility(event.target.value); // تعيين القيمة المحددة
  // };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: Room
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // modal delete
  const handleModalClose = () => setOpenmodal(false);
  const handleModalOpen = (_id: number) => {
    setIdRoom(_id);
    setOpenmodal(true);
  };
  // modal delete
  const handleModal2Close = () => setOpenmodal(false);
  const handleModal2Open = (_id: number) => {
    setIdRoom(_id);
    setOpenmodal(true);
  };




  const getAds = async (pageNo: number, pageSize: number, name: string) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(ADS_ADMIN_ENDPOINTS.getAds, {
        headers: {
          Authorization: `${token}`,
        },
        params: { page: pageNo, size: pageSize, roomNumber: name },
      });

      setRows(response.data.data.ads); // تخزين الغرف
      console.log(response.data.data.ads); // تخزين الغرف
      // لا نحتاج لتعيين المصفوفة هنا لـ page، بل نحتفظ بالصفحة الحالية
      // نقوم بتعيين `pageNo` فقط:
      setPage(pageNo); // تحديث الصفحة الحالية
    } catch (error) {
      console.error("Failed: ", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // delete
  const deleteRoom = async (_id: number) => {
    try {
      await axios.delete(ADS_ADMIN_ENDPOINTS.delete(_id), {
        // تعديل هنا
        headers: {
          Authorization: `${token}`,
        },
      });
      setRows(rows?.filter((room) => room._id !== _id) || []);
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Failed to delete room:", error);
      toast.error("Failed to delete room");
    }
  };

  // search
  const searchbyname = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
    setsearchname(input.target.value);
    getAds(1, 2, input.target.value);
  };

  React.useEffect(() => {
    getAds(1, 2, "");
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
            Ads Table Details
          </Typography>
          <Typography variant="h4" fontSize={"14px"} fontWeight={"400"}>
            You can check all details
          </Typography>
        </Box>
        <Box className="btn">
          <Button
            onClick={() => nav("/dashboard/create-ads")}
            variant="contained"
            color="warning"
            sx={{
              color: "white",
              px: 5,
              py: 2,
              bgcolor: "rgba(32, 63, 199, 1)",
              borderRadius: "8px",
            }}
            startIcon={<AddIcon />}
          >
            Add New Ads
          </Button>
        </Box>
      </Box>

      <Box
        component="form"
        sx={{ "& > :not(style)": { mb: 3, mx: 1 } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={searchbyname}
        />
      </Box>

      {/* modal delete */}
      <Modal
        open={openmodal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign={"center"}>
          <img src={delimg} alt="dleteImage" style={{ margin: "auto" }} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Delete This Ads Room ?
          </Typography>
          <Typography id="modal-modal-description">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </Typography>
          <Button
            style={{
              backgroundColor: "rgba(32, 63, 199, 1)",
              color: "#fff",
              margin: "10px 5px",
            }}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "rgba(32, 63, 199, 1)", color: "#fff" }}
            onClick={() => {
              deleteRoom(idRoom || 0);
              handleModalClose();
            }}
          >
            Confirm Delete
          </Button>
        </Box>
      </Modal>
      {/* modal Add */}
      <Modal
        open={openmodal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign={"center"}>
          <img src={delimg} alt="dleteImage" style={{ margin: "auto" }} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Delete This Ads Room ?
          </Typography>
          <Typography id="modal-modal-description">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </Typography>
          <Button
            style={{
              backgroundColor: "rgba(32, 63, 199, 1)",
              color: "#fff",
              margin: "10px 5px",
            }}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "rgba(32, 63, 199, 1)", color: "#fff" }}
            onClick={() => {
              deleteRoom(idRoom || 0);
              handleModalClose();
            }}
          >
            Confirm Delete
          </Button>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              textAlign: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Room Name</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.length > 0 ? (
                rows.map((item, id) => (
                  <StyledTableRow key={id}>
                    {" "}
                    {/* استخدم _id كقيمة فريدة لـ key */}
                    <StyledTableCell component="th" scope="row">
                      {item.room.roomNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        src={item.room.images}
                        alt="room"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.room.capacity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.room.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.room.discount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, item)}
                      >
                        <MoreVertIcon style={{ color: "#000" }} />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={
                          Boolean(anchorEl) &&
                          selectedRow?.roomNumber === item.roomNumber
                        }
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            nav(`/dashboard/rooms/${item.roomNumber}`);
                            handleClose();
                          }}
                        >
                          <VisibilityIcon
                            style={{
                              marginRight: "5px",
                              color: "rgba(32, 63, 199, 1)",
                            }}
                          />
                          View
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            nav(`/dashboard/rooms/edit/${item.roomNumber}`);
                            handleClose();
                          }}
                        >
                          <EditIcon
                            style={{
                              marginRight: "5px",
                              color: "rgba(32, 63, 199, 1)",
                            }}
                          />
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleModalOpen(item._id);
                            handleClose();
                          }}
                        >
                          <DeleteIcon
                            style={{
                              marginRight: "5px",
                              color: "rgba(32, 63, 199, 1)",
                            }}
                          />
                          Delete
                        </MenuItem>
                      </Menu>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} align="center">
                    No rooms available
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={10}
          page={page}
          onChange={(event, value) => {
            setPage(value); // تحديث الصفحة بناءً على القيمة الجديدة
            getAds(value, 2, searchname); // تمرير قيمة البحث الحالية إذا كانت موجودة
          }}
        />
      </Stack>
    </>
  );
}
