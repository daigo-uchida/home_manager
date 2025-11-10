  
import type { MoneyData } from "@/app/routes/app/home";
import { useModalStates } from "@/hooks/modalStates";
import { useUserDataStates } from "@/hooks/userDataStates";



  //編集アイコン押下
  export const handleEditClick = (moneyData: MoneyData) => {
    const {setSelectData } = useUserDataStates();
    const {setIsEditModalOpen } = useModalStates();

    console.log("編集アイコンが押されました", moneyData);
    setSelectData(moneyData);
    setIsEditModalOpen(true);
  };

  //編集保存
  export const handleUpdateSave = (updatedData: MoneyData) => {
    const {userHomeList,setUserHomelist} = useUserDataStates();
    
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