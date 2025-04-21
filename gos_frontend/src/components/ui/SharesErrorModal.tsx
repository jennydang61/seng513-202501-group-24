import "../../../styles/Modal.css";

const SharesErrorModal = () => {
  return (
    <div className="modalOverlay">
      <div className="fundsErrorContent">
        <p className="fundsErrorTitle"><strong>Transaction Failed</strong></p>
        <p className="fundsErrorDescrip"><strong>Insufficient Shares</strong></p>
      </div>
    </div>
  );
};

export default SharesErrorModal;