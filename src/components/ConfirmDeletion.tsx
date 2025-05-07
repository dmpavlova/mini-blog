import type { FC } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title = "Подтверждение", message = "Вы уверены, что хотите удалить этот пост?" }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;