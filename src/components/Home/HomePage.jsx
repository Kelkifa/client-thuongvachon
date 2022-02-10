import "./homePage.scss";

import React from "react";

function HomePage(props) {
	return (
		<div className="home-page grid wide">
			<h2 className="home-page__title">Tổng Quan</h2>
			<div>
				Ứng dụng hỗ trợ tạo danh sách các công việc, các tài liệu để nhiều người
				có thể xem và thay đổi chúng
			</div>

			<h2>Hướng dẫn</h2>
			<h3>Group</h3>
			<div>
				Những thành viên trong nhóm mới xem và thao tác được với các Todos và
				Docs của tài liệu trong nhóm đó. <br />
				Riêng với nhóm demo, tất cả người dùng đều thuộc vào nhóm này, họ có thể
				xem và thao tác với các Todos và Dóc mà không cần đăng nhập
			</div>

			<h3>Docs</h3>
			<div>Lưu tài liệu văn bản </div>

			<h3>Todo</h3>
			<div>
				Danh sách các sự kiện được hiển thị trong lịch dựa vào mốc thời gian của
				sự kiện đó. <br />
				Mỗi sự kiện sẽ có một danh sách các công việc có khả năng thay đổi trạng
				thái xong hoặc đã xong
			</div>
		</div>
	);
}

export default HomePage;
