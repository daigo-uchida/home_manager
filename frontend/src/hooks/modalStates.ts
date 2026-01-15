import { use, useState } from "react";
import { MoneyData } from "@/app/routes/app/home";

export const useModalStates = () => {
	// 選択されたデータを管理
	const [selectedData, setSelectData] = useState<MoneyData>();

	// 編集モーダルの開閉状態を管理
	const [editModalIsOpen, setIsEditModalOpen] = useState(false);

	// 新規追加モーダルの開閉状態を管理
	const [addModalIsOpen, setIsAddModalOpen] = useState(false);

	// 削除モーダルの開閉状態を管理
	const [deleteModalIsOpen, setIsDeleteModalOpen] = useState(false);

	// ユーザーホームデータの状態を管理
	const [userHomeList, setUserHomelist] = useState<MoneyData[]>([]);

	const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

	return {
		selectedData,
		setSelectData,
		editModalIsOpen,
		setIsEditModalOpen,
		addModalIsOpen,
		setIsAddModalOpen,
		deleteModalIsOpen,
		setIsDeleteModalOpen,
		userHomeList,
		setUserHomelist,
		isUserInfoModalOpen,
		setIsUserInfoModalOpen,
	};
};
