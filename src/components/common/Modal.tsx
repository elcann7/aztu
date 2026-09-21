import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '480px',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop-layer" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="modal-window-card"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top-bar">
          <h3 className="modal-title-text">{title}</h3>
          <button
            type="button"
            className="modal-close-trigger"
            onClick={onClose}
            aria-label="Bağla"
          >
            <X size={15} />
          </button>
        </div>

        <div className="modal-body-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

