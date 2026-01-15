import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/ui/header";
import { logout } from "@/logics/common";
import { useUserDataStates } from "@/hooks/userDataStates";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

export type MoneyData = {
	money_id: number;
	money: number;
	category: string;
	title: string;
	money_comment: string;
};
// グラフの色リスト
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Graph = () => {
	const { setNickname } = useUserDataStates();
	// 選択中のカテゴリを管理
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const usehomelist =
		(location.state as { usehomelist?: MoneyData[] })?.usehomelist || [];

	useEffect(() => {
		console.log("Graphコンポーネントがマウントされました");
		setSelectedCategory(null);
		const user_id = sessionStorage.getItem("user_id");
		const nickname = sessionStorage.getItem("nickname");

		setNickname(nickname || "ゲスト");

		if (!user_id) {
			alert("ユーザーIDが見つかりません。ログインしてください。");
			logout(navigate);
			return;
		}

		if (!usehomelist || usehomelist.length === 0) {
			console.log("データが渡されていません");
		}

		console.log(usehomelist);
	}, []);

	// データをカテゴリごとに集計
	const chartData = useMemo(() => {
		if (!usehomelist || usehomelist.length === 0) {
			return [];
		}

		const aggregated = usehomelist.reduce((acc, curr) => {
			const existing = acc.find(
				(item: { name: string; value: number }) => item.name === curr.category
			);
			if (existing) {
				existing.value += curr.money;
			} else {
				acc.push({ name: curr.category, value: curr.money });
			}
			return acc;
		}, [] as { name: string; value: number }[]);

		return aggregated;
	}, [usehomelist]);
	// 円グラフのセクションクリック時の処理
	const handlePieClick = (data: { name: string }) => {
		setSelectedCategory(data.name === selectedCategory ? null : data.name);
	};

	// 選択中のカテゴリの詳細データを取得
	const selectedDetails = useMemo(() => {
		if (!selectedCategory) return [];
		return usehomelist.filter((item) => item.category === selectedCategory);
	}, [selectedCategory, usehomelist]);

	return (
		<>
			<Header />
			<div style={{ width: "100%", padding: "20px" }}>
				<h2>カテゴリー別支出</h2>
				{chartData.length > 0 ? (
					<>
						<div style={{ width: "100%", height: 400 }}>
							<ResponsiveContainer width="100%" height="100%" minWidth={0}>
								<PieChart>
									<Pie
										data={chartData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={100}
										fill="#8884d8"
										paddingAngle={5}
										dataKey="value"
										onClick={handlePieClick}
										label={(entry) => {
											const percent = entry.percent || 0;
											return `${entry.name} ${(percent * 100).toFixed(0)}%`;
										}}>
										{chartData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
												style={{ cursor: "pointer" }}
												opacity={
													selectedCategory === null ||
													selectedCategory === entry.name
														? 1
														: 0.3
												}
											/>
										))}
									</Pie>
									<Tooltip
										formatter={(value) => {
											const numValue =
												typeof value === "number" ? value : Number(value);
											return [`¥${numValue.toLocaleString()}`, "金額"];
										}}
									/>
									<Legend
										onClick={(e) => handlePieClick({ name: e.value as string })}
										wrapperStyle={{ cursor: "pointer" }}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>

						{/* 選択中のカテゴリの詳細表示 */}
						{selectedCategory && (
							<div style={{ marginTop: "30px" }}>
								<h3>
									{selectedCategory} の内訳
									<button
										onClick={() => setSelectedCategory(null)}
										style={{
											marginLeft: "15px",
											padding: "5px 10px",
											cursor: "pointer",
											color: "white",
											backgroundColor: "#000000",
											border: "none",
											borderRadius: "5px",
											fontWeight: "bold",
											fontSize: "15px",
										}}>
										✕ 閉じる
									</button>
								</h3>
								<table
									style={{
										width: "100%",
										borderCollapse: "collapse",
										marginTop: "10px",
									}}>
									<thead>
										<tr style={{ backgroundColor: "#f0f0f0" }}>
											<th style={{ padding: "10px", border: "1px solid #ddd" }}>
												タイトル
											</th>
											<th style={{ padding: "10px", border: "1px solid #ddd" }}>
												金額
											</th>
											<th style={{ padding: "10px", border: "1px solid #ddd" }}>
												コメント
											</th>
										</tr>
									</thead>
									<tbody>
										{selectedDetails.map((item) => (
											<tr key={item.money_id}>
												<td
													style={{ padding: "10px", border: "1px solid #ddd" }}>
													{item.title}
												</td>
												<td
													style={{
														padding: "10px",
														border: "1px solid #ddd",
														textAlign: "right",
													}}>
													¥{item.money.toLocaleString()}
												</td>
												<td
													style={{ padding: "10px", border: "1px solid #ddd" }}>
													{item.money_comment}
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr
											style={{
												backgroundColor: "#f9f9f9",
												fontWeight: "bold",
											}}>
											<td style={{ padding: "10px", border: "1px solid #ddd" }}>
												合計
											</td>
											<td
												style={{
													padding: "10px",
													border: "1px solid #ddd",
													textAlign: "right",
												}}>
												¥
												{selectedDetails
													.reduce((sum, item) => sum + item.money, 0)
													.toLocaleString()}
											</td>
											<td style={{ padding: "10px", border: "1px solid #ddd" }}>
												{selectedDetails.length}件
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
						)}
					</>
				) : (
					<p>データがありません。</p>
				)}
			</div>
		</>
	);
};

export default Graph;
