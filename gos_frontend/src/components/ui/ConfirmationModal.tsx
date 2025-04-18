import "../../../styles/Modal.css";

const ConfirmationModal = () => {
  return (
    <div className="modalOverlay">
      <div className="confirmationBody">
        {/* Google Material Check Icon*/}
        <span className="material-symbols-outlined">check_circle</span>
        <p><strong>Transaction Complete</strong></p>
      </div>
    </div>
  );
};

export default ConfirmationModal;