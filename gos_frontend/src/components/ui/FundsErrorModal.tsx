import "../../../styles/Modal.css";

const FundsErrorModal = () => {
  return (
    <div className="modalOverlay">
      <div className="fundsErrorContent">
        <p className="fundsErrorTitle"><strong>Transaction Failed</strong></p>
        <p className="fundsErrorDescrip"><strong>Insufficient Funds </strong></p>
      </div>
    </div>
  );
};

export default FundsErrorModal;
