-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 15, 2024 lúc 03:30 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web_do_an`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `noiDung` text NOT NULL,
  `trangThai` varchar(255) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoicedetails`
--

CREATE TABLE `invoicedetails` (
  `id` int(11) NOT NULL,
  `invoiceID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL,
  `trangThai` varchar(255) NOT NULL,
  `tongTien` decimal(10,2) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `invoicedetails`
--

INSERT INTO `invoicedetails` (`id`, `invoiceID`, `productID`, `soLuong`, `trangThai`, `tongTien`, `ngayTao`, `ngaySua`) VALUES
(32, 27, 1, 7, '', 7000.00, '2024-01-05 08:23:38', '2024-01-05 15:11:35'),
(40, 27, 1, 4, '', 4000.00, '2024-01-05 13:34:43', '2024-01-05 15:10:10'),
(41, 27, 1, 2, '', 2000.00, '2024-01-05 14:34:16', '2024-01-05 15:26:07'),
(42, 27, 1, 3, '', 3000.00, '2024-01-05 15:15:29', '2024-01-05 15:48:10'),
(44, 1, 1, 12, '', 12000.00, '2024-01-06 02:13:00', '2024-01-06 02:13:00'),
(45, 1, 1, 1, '', 1000.00, '2024-01-06 02:19:25', '2024-01-06 02:19:25'),
(46, 1, 1, 5, '', 5000.00, '2024-01-06 02:23:35', '2024-01-06 02:23:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `tongTien` decimal(10,2) DEFAULT NULL,
  `diaChiGiaoHang` text NOT NULL,
  `trangThai` varchar(255) NOT NULL,
  `phuongThucThanhToan` varchar(255) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `invoices`
--

INSERT INTO `invoices` (`id`, `userID`, `tongTien`, `diaChiGiaoHang`, `trangThai`, `phuongThucThanhToan`, `ngayTao`, `ngaySua`) VALUES
(1, 1, 18000.00, 'a', 'a', 'a', '2024-01-04 16:54:32', '2024-01-06 02:23:36'),
(27, 1, 16000.00, 'a', 'CTT', 'COD', '2024-01-05 10:02:43', '2024-01-05 15:48:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `promotionID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `moTa` text NOT NULL,
  `heDieuHanh` varchar(255) NOT NULL,
  `anh` varchar(255) NOT NULL,
  `donGia` decimal(10,2) NOT NULL,
  `baoHanh` varchar(255) NOT NULL,
  `mauSac` varchar(255) NOT NULL,
  `soLuong` int(11) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `promotionID`, `supplierID`, `ten`, `moTa`, `heDieuHanh`, `anh`, `donGia`, `baoHanh`, `mauSac`, `soLuong`, `ngayTao`, `ngaySua`) VALUES
(1, 1, 1, 'IPHONE 11 PROMAX', 'd', 'd', 'a', 1000.00, 'a', 'a', 94, '2024-01-04 16:54:00', '2024-01-06 02:23:35'),
(2, 1, 1, 'XIAOMI JX', 'abc', 'a', 'a', 2500.00, 'a', 'a', 150, '2024-01-06 02:17:30', '2024-01-06 02:17:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `noiDung` varchar(255) NOT NULL,
  `tuNgay` date NOT NULL,
  `denNgay` date NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`id`, `code`, `noiDung`, `tuNgay`, `denNgay`, `ngayTao`, `ngaySua`) VALUES
(1, 1, 'a', '2024-01-10', '2024-01-18', '2024-01-04 16:52:55', '2024-01-05 02:56:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `code`) VALUES
(1, 'a');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shoppings`
--

CREATE TABLE `shoppings` (
  `id` int(11) NOT NULL,
  `invoiceID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `diaChi` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `suppliers`
--

INSERT INTO `suppliers` (`id`, `ten`, `diaChi`, `email`, `sdt`, `ngayTao`, `ngaySua`) VALUES
(1, 'a', 'a', 'a@gmail.com', '1540', '2024-01-04 16:52:17', '2024-01-04 16:52:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `roleID` int(11) NOT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngaySua` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `hoten`, `email`, `sdt`, `matKhau`, `roleID`, `ngayTao`, `ngaySua`) VALUES
(1, 'Hu', 'hu@gmail.com', '014521', '123', 1, '2024-01-04 16:51:48', '2024-01-04 16:51:48');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- Chỉ mục cho bảng `invoicedetails`
--
ALTER TABLE `invoicedetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`),
  ADD KEY `invoiceID` (`invoiceID`);

--
-- Chỉ mục cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `promotionID` (`promotionID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `shoppings`
--
ALTER TABLE `shoppings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceID` (`invoiceID`),
  ADD KEY `userID` (`userID`);

--
-- Chỉ mục cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleID` (`roleID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `invoicedetails`
--
ALTER TABLE `invoicedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT cho bảng `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `shoppings`
--
ALTER TABLE `shoppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `invoicedetails`
--
ALTER TABLE `invoicedetails`
  ADD CONSTRAINT `invoicedetails_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `invoicedetails_ibfk_2` FOREIGN KEY (`invoiceID`) REFERENCES `invoices` (`id`);

--
-- Các ràng buộc cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`promotionID`) REFERENCES `promotions` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`);

--
-- Các ràng buộc cho bảng `shoppings`
--
ALTER TABLE `shoppings`
  ADD CONSTRAINT `shoppings_ibfk_1` FOREIGN KEY (`invoiceID`) REFERENCES `invoices` (`id`),
  ADD CONSTRAINT `shoppings_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
