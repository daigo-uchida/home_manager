import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "@/components/ui/header";
import "@/components/styles/home.css";

import { FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";

import ModalModel from "@/components/ui/ModalModel";
import EditMoneyForm from "@/features/home/EditMoneyForm";
import AddMoneyForm from "@/features/home/AddMoneyForm";
import { MdOutlineExitToApp } from "react-icons/md";
import DeleteModal from "@/features/home/DeleteModal";
import CategoryFilter from "@/features/home/CategoryDatafilter";
import { useModalStates } from "@/hooks/modalStates";
import { useUserDataStates } from "@/hooks/userDataStates";
import { handleEditClick, handleUpdateSave } from "@/logics/EditUserdatalogic";

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
    setIsEditModalOpen,
    setIsAddModalOpen,
    setIsDeleteModalOpen,
  } = useModalStates();

  // ナビゲーションフック
  const navigate = useNavigate();

  //ユニークなcategoryの一覧
  const categorys = Array.from(
    new Set(userHomeList && userHomeList.map((c) => c.category))
  );

  // 新規追加ボタン押下
  const handleAddMoney = () => {
    console.log("新規追加ボタンが押されました");
    setIsAddModalOpen(true);
  };

  // 新規保存の追加ボタン押下
  const handleAddMoneySave = (newData: MoneyData) => {
    console.log(newData);
    if (!userHomeList) {
      setUserHomelist([newData]);
      setIsAddModalOpen(false);
      console.log("新しい" + userHomeList);
      return;
    } else {
      setUserHomelist([...userHomeList, newData]);
      setIsAddModalOpen(false);
      alert("新しい出費データを作成しました");
      console.log("追加データ" + newData);
    }
  };

  const handleDeleteMoney = (Deletemoney: MoneyData) => {
    console.log("削除アイコンが押されました", Deletemoney);
    // 削除モーダルを開く
    setSelectData(Deletemoney);
    setIsDeleteModalOpen(true);
  };
  // ログアウト関数
  const logout = () => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("nickname");
    navigate("/");
  };

  //カテゴリーフィルター
  const showUserData = selectedCategory
    ? userHomeList.filter((c) => c.category === selectedCategory)
    : userHomeList;

  // ユーザーデータを取得するためのuseEffect
  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const nickname = sessionStorage.getItem("nickname");

    setNickname(nickname || "ゲスト");
    if (!user_id) {
      alert("ユーザーIDが見つかりません。ログインしてください。");
      logout();
      return;
    }
    console.log("ユーザーID:", user_id);
    const apiUrl = "/api/home_manager/view/" + user_id;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length === 0) {
            console.log("データが存在しません");
            setUserHomelist([]);
          }
          setUserHomelist(response.data);
        } else {
          console.error("データの取得に失敗しました", response.status);
          alert("データの取得に失敗しました。再度ログインしてください。");
          logout();
        }
      })
      .catch((error) => {
        console.error("データの取得中にエラーが発生しました", error);
        alert(
          "データの取得中にエラーが発生しました。再度ログインしてください。"
        );
        logout();
      });
  }, []);
  return (
    <>
      <Header />
      <MdOutlineExitToApp
        className="logout-icon"
        onClick={() => logout()}
        size={50}
      />
      <div className="mypege">
        <h2>ようこそ、{nickname}さん</h2>
      </div>

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
                        onClick={() => handleEditClick(moneyData)}
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
      {/* 編集モーダル */}
      <ModalModel
        isOpen={editModalIsOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {selectedData && (
          <EditMoneyForm moneyData={selectedData} onSave={handleUpdateSave} />
        )}
      </ModalModel>
      {/* 新規追加モーダル */}
      <ModalModel
        isOpen={addModalIsOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
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
        onClose={() => setIsDeleteModalOpen(false)}
      >
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
