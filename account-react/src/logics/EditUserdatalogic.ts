  
import type { MoneyData } from "@/app/routes/app/home";
import { useModalStates } from "@/hooks/modalStates";
import { userDataStates } from "@/hooks/userDataStates";

const { userHomeList, setUserHomelist } = userDataStates();

  //編集アイコン押下
  export const handleEditClick = (moneyData: MoneyData) => {
    console.log("編集アイコンが押されました", moneyData);
    userDataStates().setSelectData(moneyData);
    useModalStates().setIsEditModalOpen(true);
  };

  //編集保存
  export const handleUpdateSave = (updatedData: MoneyData) => {
    if (!userHomeList) {
      console.error("ユーザーホームリストが未定義です");
      return;
    }
    // 編集されたデータを更新
    const updatedList = userHomeList.map((data) =>
      data.money_id === updatedData.money_id ? updatedData : data
    );
    setUserHomelist(updatedList);
    useModalStates().setIsEditModalOpen(false);
  };