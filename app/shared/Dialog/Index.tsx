'use client';
import React from 'react';
import Modal from 'react-modal';

export const Dialog: React.FC<DialogProps> = (props) => {
  const { isOpen, onClose, children } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="modal"
      aria={{
        labelledby: 'heading',
        describedby: 'full_description'
      }}
      style={{
        overlay: overlayStyle,
        content: contentStyle
      }}
    >
      {children}
    </Modal>
  );
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
} as React.CSSProperties;

const contentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '240px'
} as React.CSSProperties;

interface DialogProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
