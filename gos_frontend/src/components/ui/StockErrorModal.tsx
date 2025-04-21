import "../../../styles/Modal.css";

const StockErrorModal = () => {
  return (
    <div className="modalOverlay">
      <div className="fundsErrorContent">
        <p className="fundsErrorTitle"><strong>Transaction Failed</strong></p>
        <p className="fundsErrorDescrip"><strong>Stock Not Found</strong></p>
      </div>
    </div>
  );
};

export default StockErrorModal;