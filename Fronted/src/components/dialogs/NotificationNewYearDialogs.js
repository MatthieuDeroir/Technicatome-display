import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

function NotificationNewYearDialog({ open, onClose, onToggle }) {

  const handleToggle = () => {
    onToggle(true);
    onClose(); 
  };
  const handleToggleCancel = () => {
    onToggle(false);
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer l'action</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voulez-vous remettre à zéro le compteur d'accident de l'année pour la nouvelle année ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggleCancel} color="secondary">
          Non
        </Button>
        <Button onClick={handleToggle} color="secondary">
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationNewYearDialog;