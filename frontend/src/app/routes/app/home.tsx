import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "@/components/ui/header";
import "@/components/styles/home.css";

import { FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdPie } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { logout } from "@/logics/common";
import ModalModel from "@/components/ui/ModalModel";
import EditMoneyForm from "@/features/home/EditMoneyForm";
import AddMoneyForm from "@/features/home/AddMoneyForm";
import { MdOutlineExitToApp } from "react-icons/md";
import DeleteModal from "@/features/home/DeleteModal";
import CategoryFilter from "@/features/home/CategoryDatafilter";
import { useModalStates } from "@/hooks/modalStates";
import { useUserDataStates } from "@/hooks/userDataStates";
import { handleUpdateSave } from "@/logics/EditUserdatalogic";
import UserInfo from "@/features/home/UserInfo";
import { paths } from "@/config/paths";
import { FaRegUserCircle } from "react-icons/fa";

export type MoneyData = {
	money_id: number;
	money: number;
	category: string;
	title: string;
	money_comment: string;
};
const Home = () => {
	// ユーザーデータのカスタムhook
	const {
		nickname,
		selectedData,
		userHomeList,
		selectedCategory,
		setSelectData,
		setUserHomelist,
		setNickname,
		setSelectedCategory,
	} = useUserDataStates();
	//モーダルのカスタムhook
	const {
		editModalIsOpen,
		addModalIsOpen,
		deleteModalIsOpen,
		isUserInfoModalOpen,
		setIsEditModalOpen,
		setIsAddModalOpen,
		setIsDeleteModalOpen,
		setIsUserInfoModalOpen,
	} = useModalStates();

	// ナビゲーションフック
	const navigate = useNavigate();

	//ユニークなcategoryの一覧
	const categorys = Array.from(
		new Set((userHomeList ?? []).map((c) => c.category))
	);

	// 新規追加ボタン押下
	const handleAddMoney = () => {
		setIsAddModalOpen(true);
	};

	// 新規保存の追加ボタン押下
	const handleAddMoneySave = (newData: MoneyData) => {
		if (!userHomeList) {
			setUserHomelist([newData]);
			setIsAddModalOpen(false);

			return;
		} else {
			setUserHomelist([...userHomeList, newData]);
			setIsAddModalOpen(false);
			alert("新しい出費データを作成しました");
			return;
		}
	};

	const handleDeleteMoney = (Deletemoney: MoneyData) => {
		// 削除モーダルを開く
		setSelectData(Deletemoney);
		setIsDeleteModalOpen(true);
	};

	// 編集アイコン押下
	const handleEditClick = (
		moneyData: MoneyData,
		setSelectData: (data: MoneyData) => void,
		setIsEditModalOpen: (open: boolean) => void
	) => {
		setSelectData(moneyData);
		setIsEditModalOpen(true);
	};
	//カテゴリーフィルター
	const list = userHomeList ?? [];
	const showUserData = selectedCategory
		? list.filter((c) => c.category === selectedCategory)
		: list;

	//ユーザーデータを取得するためのuseEffect;
	useEffect(() => {
		const user_id = sessionStorage.getItem("user_id");
		const nickname = sessionStorage.getItem("nickname");
		setNickname(nickname || "ゲスト");
		if (!user_id) {
			alert("ユーザーIDが見つかりません。ログインしてください。");
			logout(navigate);
			return;
		}
		const apiUrl = "/api/home_manager/view/" + user_id + "/";
		axios
			.get(apiUrl, {
				headers: { Authorization: `Token ${sessionStorage.getItem("token")}` },
			})
			.then((response) => {
				if (response.status === 200) {
					if (response.data.length === 0) {
						setUserHomelist([]);
					}

					const data = Array.isArray(response.data) ? response.data : [];
					setUserHomelist(data);
				} else {
					alert("データの取得に失敗しました。再度ログインしてください。");
					logout(navigate);
				}
			})
			.catch((error) => {
				alert(
					"データの取得中にエラーが発生しました。再度ログインしてください。"
				);
				logout(navigate);
			});
	}, []);

	return (
		<>
			<Header />
			<MdOutlineExitToApp
				className="logout-icon"
				onClick={() => logout(navigate)}
				size={50}
			/>
			<div className="mypege">
				<h2>ようこそ、{nickname}さん</h2>
			</div>
			<div
				onClick={() => setIsUserInfoModalOpen(true)}
				className="user-info-section">
				<FaRegUserCircle className="user-info-icon" size={40} />
				<h3 className="user-nickname">{nickname}</h3>
			</div>
			{/* ユーザー情報モーダル */}
			<ModalModel
				isOpen={isUserInfoModalOpen}
				onClose={() => setIsUserInfoModalOpen(false)}>
				<UserInfo
					nickname={sessionStorage.getItem("nickname")}
					user_id={sessionStorage.getItem("user_id")}
				/>
			</ModalModel>

			<h3>最近の支出</h3>
			{/* userHomeListが存在していたら表示する */}
			<div className="home-space">
				{/* カテゴリーフィルター */}
				<CategoryFilter
					categorys={categorys}
					onCategoryChange={setSelectedCategory}
				/>

				<div className="home-data">
					{showUserData && showUserData.length != 0 ? (
						// 支出データがある場合表示
						showUserData.map((moneyData, index) => (
							<div key={index}>
								<div className="home-box">
									{/* 支出データの表示 */}
									<h4>{moneyData.title}</h4>

									<p>金額: {moneyData.money}円</p>
									<p>カテゴリー:{moneyData.category}</p>
									{moneyData.money_comment && (
										<p>コメント: {moneyData.money_comment}</p>
									)}
									<div className="actions-button">
										{/* 編集ボタン */}
										<div className="editbutton">
											<FaPen
												style={{ color: "white" }}
												onClick={() =>
													handleEditClick(
														moneyData,
														setSelectData,
														setIsEditModalOpen
													)
												}
											/>
										</div>
										{/* 削除ボタン */}
										<div className="trash-button">
											<FaTrash
												style={{ color: "white" }}
												onClick={() => handleDeleteMoney(moneyData)}
											/>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						// 支出データが存在しない場合
						<div> 支出データが存在しません </div>
					)}
				</div>
			</div>
			{/* 新規追加ボタン */}
			<IoIosAddCircle className="addbutton" onClick={() => handleAddMoney()} />

			{/* グラフ表示ボタン */}
			<IoMdPie
				className="graphbutton"
				onClick={() =>
					navigate(paths.graph.getHref(), {
						state: { usehomelist: showUserData },
					})
				}
			/>

			{/* 編集モーダル */}
			<ModalModel
				isOpen={editModalIsOpen}
				onClose={() => setIsEditModalOpen(false)}>
				{selectedData && (
					<EditMoneyForm
						moneyData={selectedData}
						onSave={(updated) =>
							handleUpdateSave(
								updated,
								userHomeList,
								setUserHomelist,
								setIsEditModalOpen
							)
						}
					/>
				)}
			</ModalModel>
			{/* 新規追加モーダル */}
			<ModalModel
				isOpen={addModalIsOpen}
				onClose={() => setIsAddModalOpen(false)}>
				<AddMoneyForm
					moneyData={{
						money_id: 0, // 新規作成なので0に設定
						money: 0,
						category: "",
						title: "",
						money_comment: "",
					}}
					onSave={handleAddMoneySave}
				/>
			</ModalModel>

			{/* 出費データ削除確認 */}
			<ModalModel
				isOpen={deleteModalIsOpen}
				onClose={() => setIsDeleteModalOpen(false)}>
				{selectedData && (
					<DeleteModal
						moneyData={selectedData}
						onClose={() => setIsDeleteModalOpen(false)}
						onDeleted={() =>
							setUserHomelist(
								userHomeList.filter((d) => d.money_id != selectedData.money_id)
							)
						}
					/>
				)}
			</ModalModel>
		</>
	);
};
export default Home;
