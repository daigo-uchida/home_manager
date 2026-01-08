import type { MoneyData } from "@/app/routes/app/home";

//編集アイコン押下
export const handleEditClick = (
	moneyData: MoneyData,
	setSelectData: (data: MoneyData) => void,
	setIsEditModalOpen: (open: boolean) => void
) => {
	console.log("編集アイコンが押されました", moneyData);
	setSelectData(moneyData);
	setIsEditModalOpen(true);
};

//編集保存
export const handleUpdateSave = (
	updatedData: MoneyData,
	userHomeList: MoneyData[],
	setUserHomelist: (list: MoneyData[]) => void,
	setIsEditModalOpen: (open: boolean) => void
) => {
	if (!userHomeList) {
		console.error("ユーザーホームリストが未定義です");
		return;
	}
	// 編集されたデータを更新
	const updatedList = userHomeList.map((data) =>
		data.money_id === updatedData.money_id ? updatedData : data
	);
	setUserHomelist(updatedList);
	setIsEditModalOpen(false);
};
