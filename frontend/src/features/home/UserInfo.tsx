//ユーザー情報を見るためのコンポーネント
import React from "react";
import "@/components/styles/userInfo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "@/logics/common";

type UserInfoProps = {
	nickname: string | null;
	user_id: string | null;
	onClose?: () => void;
};

const UserInfo: React.FC<UserInfoProps> = ({ nickname, user_id }) => {
	const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
	const navigate = useNavigate();

	const handleDeleteClick = () => {
		setShowDeleteConfirm(true);
	};

	const handleConfirmDelete = () => {
		axios
			.delete(`/api/accounts/delete/${user_id}/`, {
				headers: {
					Authorization: `Token ${sessionStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				alert("ユーザーが削除されました。");

				logout(navigate);
			})
			.catch((error) => {
				alert("ユーザーの削除に失敗しました。");
			});
		console.log("ユーザーを削除:", user_id);

		setShowDeleteConfirm(false);
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	return (
		<div className="user-info-modal">
			<h2>ユーザー情報</h2>
			<p>ニックネーム: {nickname}</p>
			<p>User_id: {user_id}</p>
			<button
				type="button"
				className="user-delete-button"
				onClick={handleDeleteClick}>
				ユーザーを削除
			</button>

			{showDeleteConfirm && (
				<div className="delete-confirm-modal">
					<div className="delete-confirm-content">
						<h3>削除の確認</h3>
						<p>本当に{nickname}を削除しますか?</p>
						<p className="warning-text">この操作は取り消せません。</p>
						<div className="delete-confirm-buttons">
							<button
								type="button"
								className="cancel-button"
								onClick={handleCancelDelete}>
								キャンセル
							</button>
							<button
								type="button"
								className="confirm-delete-button"
								onClick={handleConfirmDelete}>
								削除する
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default UserInfo;
