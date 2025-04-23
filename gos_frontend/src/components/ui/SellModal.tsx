import "../../../styles/Modal.css";

// for sell button in stocks page
const SellModal = ({ buySellTitle, children, onClose }: { buySellTitle: string, children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="modalOverlay">
      <div className="buySellContent">
        <h2 className="buySellTitle">{buySellTitle}</h2>
        <div className="modalBuySellBody">{children}
            <button className="bsCancelButton" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SellModal;