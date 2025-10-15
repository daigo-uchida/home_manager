import axios from "axios";
import React, { useState } from "react";
import "@/components/styles/form.css";
type EditProps = {
  moneyData: {
    money_id: number;
    money: number;
    category: string;
    title: string;
    money_comment: string;
  };
  // 編集フォームに渡すデータの型
  onSave: (updateData: EditProps["moneyData"]) => void;
};

const EditMoneyForm: React.FC<EditProps> = ({ moneyData, onSave }) => {
  const [MoneyData, setMoneyData] = useState(moneyData);

  {
    /*フォームの値が変化したときに動作し値をMoneyDataにコピーする関数*/
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMoneyData({ ...MoneyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ(ページを再読み込みしない)

    const apiPath =
      "http://localhost:8000/home_manager/editMoney/" + moneyData.money_id;
    // APIにデータを送信
    console.log("APIパス:", apiPath);
    console.log(moneyData);
    axios
      .put(apiPath, {
        money_id: moneyData.money_id,
        money: MoneyData.money,
        category: MoneyData.category,
        title: MoneyData.title,
        money_comment: MoneyData.money_comment,
      })
      .then((response) => {
        console.log("データが更新されました", response.data);
        onSave(MoneyData); // 編集されたデータを親コンポーネントに渡す
      })
      .catch((error) => {
        console.error("データの更新に失敗しました", error);
      });
  };
  return (
    <>
      <h2>出費情報編集</h2>
      <br />
      <form onSubmit={handleSubmit} className="inputtext">
        <label>出費 : </label>
        <input
          type="number"
          name="money"
          placeholder="金額"
          value={MoneyData.money}
          onChange={handleChange}
        ></input>
        <br />
        <label>カテゴリー : </label>
        <input
          type="text"
          name="category"
          placeholder="20文字以内"
          value={MoneyData.category}
          onChange={handleChange}
        ></input>
        <br />
        <label>タイトル : </label>
        <input
          type="text"
          name="title"
          placeholder="20文字以内"
          value={MoneyData.title}
          onChange={handleChange}
        ></input>
        <br />
        <label>コメント : </label>
        <textarea
          name="money_comment"
          placeholder="100文字以内"
          value={MoneyData.money_comment}
          onChange={handleChange}
          className="textAria"
        ></textarea>
        <button type="submit" className="submitButton">
          保存
        </button>
      </form>
    </>
  );
};
export default EditMoneyForm;
