import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './NavigationModal.module.css';

const Backdrop = ({ onClose, types }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalEl = document.getElementById('overlays');

const NavigationModal = ({ onClose, types }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalEl)}

      {ReactDOM.createPortal(
        <ModalOverlay>
          <nav className={styles.nav}>
            {types.map((type) => {
              const toLink = type === 'all' ? '/' : `/types/${type}`;

              return (
                <Link
                  key={uuidv4()}
                  className={styles.link}
                  onClick={onClose}
                  to={toLink}
                >
                  {type}
                </Link>
              );
            })}
          </nav>
          <button className={styles.close} onClick={onClose}>
            CLOSE
          </button>
        </ModalOverlay>,
        portalEl
      )}
    </>
  );
};

export default NavigationModal;
