import "./homePage.scss";

import React from "react";

function HomePage(props) {
	return (
		<div className="home-page grid wide">
			<h2 className="home-page__title">Tổng Quan</h2>
			<div>
				Website giúp người dùng giúp người dùng tạo nhóm để chia sẻ các tài liệu
				hoặc danh sách công việc cần làm giúp các thành viên trong nhóm có thể
				xem hoặc thao tác (thêm, xóa, sửa, ... )
			</div>

			<h3>Group</h3>
			<div>
				Những thành viên trong nhóm mới xem và thao tác được với các Todos và
				Docs của nhóm đó. <br />
				Riêng với nhóm demo, tất cả người dùng đều thuộc vào nhóm này, họ có thể
				xem và thao tác với các Todos và Docs mà không cần đăng nhập
			</div>

			<h3>Doc</h3>
			<div>
				Lưu tài liệu văn bản <br />
				Dữ liệu sẽ được lưu theo tên tài liệu và mỗi tài liệu sẽ có các mục
				riêng
			</div>

			<h3>Todo</h3>
			<div>
				Danh sách các sự kiện được hiển thị trong lịch dựa vào mốc thời gian của
				sự kiện đó. <br />
				Mỗi sự kiện sẽ có một danh sách các công việc có khả năng thay đổi trạng
				thái xong hoặc đã xong
			</div>
			<div></div>
		</div>
	);
}

export default HomePage;
