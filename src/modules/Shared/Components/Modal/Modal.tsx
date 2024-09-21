// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// interface BasicModalProps {
//   open: boolean;
//   handleClose: () => void;
//   ImgSrc: string;
//   Text: string;
// }

// export default function BasicModal({ open, handleClose, ImgSrc, Text }: BasicModalProps) {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <img src={ImgSrc} alt="Modal content" style={{ width: '100%', height: 'auto' }} />
//         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//           {Text}
//         </Typography>
//       </Box>
//     </Modal>
//   );
// }
