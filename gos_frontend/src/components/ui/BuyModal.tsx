import "../../../styles/Modal.css";

const BuyModal = ({ buySellTitle, children, onClose }: { buySellTitle: string, children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="modalOverlay">
      <div className="buySellContent">
        <h2 className="buySellTitle">{buySellTitle}</h2>
        <div className="modalBuySellBody">{children}
            <button className="bsCancelButton" onClick={onClose}>Cancel</button>
        </div>
      </div>Buy
    </div>
  );
};

export default BuyModal;
