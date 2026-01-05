import { useState } from "react";
import type { MoneyData } from "@/app/routes/app/home";

export const useUserDataStates = () => {
// ユーザーのニックネームを管理
  // 初期値はゲスト
  const [nickname, setNickname] = useState<string>("gest");

  // 選択されたデータを管理
  const [selectedData, setSelectData] = useState<MoneyData>();

  // ユーザーホームデータの状態を管理
  const [userHomeList, setUserHomelist] = useState<MoneyData[]>([]);

  //選択したカテゴリーを管理
  const [selectedCategory, setSelectedCategory] = useState("");
 return {
    nickname,
    setNickname,
    selectedData,
    setSelectData,
    userHomeList,
    setUserHomelist,
    selectedCategory,
    setSelectedCategory
 }
};