import "../../../styles/Modal.css";

const Modal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>{title}</h2>
        <div className="modalBody">{children}</div>
        <button className="closeButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
