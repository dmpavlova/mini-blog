import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import PostForm from '../components/PostForm';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  postId: number | null;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, postId }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{ 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          p: 3, 
          maxWidth: 600, 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: "80%",
        }}
      >
        <PostForm postId={postId ?? undefined} onClose={onClose} />
        <Button onClick={onClose} color="primary" variant="outlined" sx={{ marginTop: 2 }}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;