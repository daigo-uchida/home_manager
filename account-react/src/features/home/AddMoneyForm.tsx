import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "@/components/styles/form.css";
import { MoneyData } from "@/app/routes/app/home";

type AddMoneyFormProps = {
  moneyData: MoneyData;
  onSave: (newData: AddMoneyFormProps["moneyData"]) => void;
};

const AddMoneyForm: React.FC<AddMoneyFormProps> = ({ moneyData, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MoneyData>({
    mode: "onSubmit",
  });
  //送信ボタン押下時起動
  const onSubmit: SubmitHandler<MoneyData> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/home_manager/register/",
        {
          user_id: sessionStorage.getItem("user_id"),
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("データ送信成功:", response.data);
      alert("新しい出費データを作成しました");
      onSave(response.data);
      reset(); // フォームをリセット
    } catch (error) {
      console.error("データ送信エラー:", error);
      alert("支出データの作成に失敗しました");
    }
  };
  return (
    <>
      <h2>新規支出登録</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="inputtext">
        <label>出費 : </label>
        <input
          type="number"
          placeholder="金額"
          {...register("money", {
            required: "金額は必須です",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "1円以上を入力してください",
            },
          })}
        />
        {errors.money && (
          <p style={{ color: "red", fontSize: "10px" }}>
            {errors.money.message}
          </p>
        )}

        <label>タイトル :</label>
        <input
          type="text"
          placeholder="20文字以内"
          {...register("title", {
            required: "タイトルは必須です",
            maxLength: {
              value: 20,
              message: "タイトルは20文字以内で入力してください",
            },
          })}
        />
        {errors.title && (
          <p style={{ color: "red", fontSize: "10px" }}>
            {errors.title.message}
          </p>
        )}

        <label>カテゴリー : </label>
        <input
          type="text"
          placeholder="20文字以内"
          {...register("category", {
            required: "カテゴリーは必須です",
            maxLength: {
              value: 20,
              message: "カテゴリーは20文字以内で入力してください",
            },
          })}
        />
        {errors.category && (
          <p style={{ color: "red", fontSize: "10px" }}>
            {errors.category.message}
          </p>
        )}

        <label>コメント : </label>
        <textarea
          placeholder="100文字以内"
          className="textAria"
          {...register("money_comment", {
            maxLength: {
              value: 100,
              message: "コメントは100文字以内で入力してください",
            },
          })}
        />
        {errors.money_comment && (
          <p style={{ color: "red", fontSize: "10px" }}>
            {errors.money_comment.message}
          </p>
        )}

        <button type="submit" className="submitButton">
          新規追加
        </button>
      </form>
    </>
  );
};

export default AddMoneyForm;
