import axios from "axios";
import "@/components/styles/deletemodal.css";
import { useState } from "react";

type DeleteModelProps = {
  moneyData: {
    money_id: number;
  };
  onClose: () => void;
  onDeleted?: () => void; // 削除後にリスト再取得などを行う
};

const DeleteModal: React.FC<DeleteModelProps> = ({
  moneyData,
  onClose,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const apiPath =
      "http://localhost:8000/home_manager/deleteMoney/" + moneyData.money_id;
    try {
      await axios.delete(apiPath);
      if (onDeleted) onDeleted();
      onClose();
    } catch (error) {
      setError("支出データの削除に失敗しました");
      console.log("支出データの削除に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>データを削除しますか？</h2>
      {error && <div className="error">{error}</div>}
      <button className="Yesbutton" onClick={handleDelete} disabled={loading}>
        {loading ? "削除中..." : "はい"}
      </button>
      <button className="Nobutton" onClick={onClose} disabled={loading}>
        いいえ
      </button>
    </div>
  );
};

export default DeleteModal;
