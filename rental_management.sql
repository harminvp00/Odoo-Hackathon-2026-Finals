-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2026 at 05:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_profiles`
--

CREATE TABLE `admin_profiles` (
  `admin_id` bigint(20) NOT NULL,
  `admin_level` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_profiles`
--

INSERT INTO `admin_profiles` (`admin_id`, `admin_level`) VALUES
(7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `attribute_id` int(11) NOT NULL,
  `attribute_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_values`
--

CREATE TABLE `attribute_values` (
  `value_id` int(11) NOT NULL,
  `attribute_id` int(11) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_profiles`
--

CREATE TABLE `customer_profiles` (
  `customer_id` bigint(20) NOT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_profiles`
--

INSERT INTO `customer_profiles` (`customer_id`, `full_name`, `phone`, `created_at`) VALUES
(1, 'Ashish Gokani', '9313158223', '2026-02-01 01:59:58');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `total_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `product_id`, `total_quantity`) VALUES
(1, 1, 3),
(2, 2, 5),
(3, 3, 4),
(4, 4, 4),
(5, 5, 5),
(6, 6, 8),
(7, 7, 7),
(8, 8, 5),
(9, 9, 4),
(10, 10, 9),
(11, 11, 5),
(12, 12, 9),
(13, 13, 3),
(14, 14, 6),
(15, 15, 6),
(16, 16, 5),
(17, 17, 5),
(18, 18, 7),
(19, 19, 9),
(20, 20, 5),
(21, 21, 8),
(22, 22, 4),
(23, 23, 5),
(24, 24, 8),
(25, 25, 5),
(26, 26, 5),
(27, 27, 5);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `transaction_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `transaction_type` enum('IN','OUT','ADJUST') DEFAULT NULL,
  `reference_type` varchar(50) DEFAULT NULL,
  `reference_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `tax_amount` decimal(10,2) DEFAULT NULL,
  `deposit` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` enum('DRAFT','PARTIAL','PAID') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `order_id`, `subtotal`, `tax_amount`, `deposit`, `total`, `status`, `created_at`) VALUES
(2, 2, 9600.00, 1728.00, 0.00, 11328.00, 'DRAFT', '2026-02-01 04:05:42'),
(3, 3, 1500.00, 270.00, 0.00, 1770.00, 'DRAFT', '2026-02-01 04:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pickups`
--

CREATE TABLE `pickups` (
  `pickup_id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `pickup_time` datetime DEFAULT NULL,
  `status` enum('PENDING','COMPLETED') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pickups`
--

INSERT INTO `pickups` (`pickup_id`, `order_id`, `pickup_time`, `status`) VALUES
(2, 2, '2026-02-01 04:05:24', 'COMPLETED'),
(3, 3, '2026-02-01 04:21:19', 'COMPLETED');

-- --------------------------------------------------------

--
-- Table structure for table `pricing_units`
--

CREATE TABLE `pricing_units` (
  `unit_id` int(11) NOT NULL,
  `unit_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricing_units`
--

INSERT INTO `pricing_units` (`unit_id`, `unit_code`) VALUES
(1, 'HOUR'),
(2, 'DAY'),
(3, 'WEEK');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) NOT NULL,
  `vendor_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price_per_day` decimal(10,2) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `vendor_id`, `name`, `description`, `price_per_day`, `status`, `created_at`) VALUES
(1, 2, 'Sony Alpha A7 IV', 'Full-frame mirrorless camera, 33MP, excellent for hybrid shooters.', 2500.00, 'ACTIVE', '2026-02-01 02:34:46'),
(2, 2, 'DJI RS 3 Pro Gimbal', 'Advanced 3-axis stabilizer for cinematic, buttery-smooth footage.', 1200.00, 'ACTIVE', '2026-02-01 02:35:56'),
(3, 2, 'Sigma 24-70mm f/2.8', 'Versatile \"workhorse\" lens for portraits and landscapes.', 800.00, 'ACTIVE', '2026-02-01 02:36:26'),
(4, 2, 'Godox AD600 Pro', 'High-speed outdoor strobe for professional lighting setups.', 1500.00, 'ACTIVE', '2026-02-01 02:37:09'),
(5, 2, 'Rode Wireless GO II', 'Dual-channel wireless microphone system for crystal clear audio.', 600.00, 'ACTIVE', '2026-02-01 02:37:38'),
(6, 3, 'Quechua 4-Person Tent', 'Waterproof, easy-to-assemble tent with a \"Fresh & Black\" interior.', 450.00, 'ACTIVE', '2026-02-01 02:41:44'),
(7, 3, 'North Face Sleeping Bag', 'Rated for -5°C, lightweight and highly compressible.', 250.00, 'ACTIVE', '2026-02-01 02:42:21'),
(8, 3, 'Portable Camping Stove', 'Compact butane stove for quick meals on the trail.', 150.00, 'ACTIVE', '2026-02-01 02:42:48'),
(9, 3, '60L Trekking Rucksack', 'Ergonomic design with rain cover and multiple compartments.', 200.00, 'ACTIVE', '2026-02-01 02:43:13'),
(10, 3, 'LED Camping Lantern', '1000 lumens with rechargeable battery and SOS mode.', 100.00, 'ACTIVE', '2026-02-01 02:43:37'),
(11, 4, 'Classic Navy Tuxedo', 'Slim-fit Italian wool suit including blazer and trousers.', 1800.00, 'ACTIVE', '2026-02-01 02:46:49'),
(12, 4, 'Designer Silk Saree', 'Premium Kanchipuram silk with gold zari work.', 2200.00, 'ACTIVE', '2026-02-01 02:47:28'),
(13, 4, 'Leather Laptop Briefcase', 'Genuine full-grain leather for a sharp professional look.', 400.00, 'ACTIVE', '2026-02-01 02:48:03'),
(14, 4, 'Beaded Evening Gown', 'Floor-length sequined dress for formal cocktail parties.', 3000.00, 'ACTIVE', '2026-02-01 02:48:38'),
(15, 4, 'Statement Necklace Set', 'Kundan-style jewelry set including earrings and tikka.', 700.00, 'ACTIVE', '2026-02-01 02:49:03'),
(16, 5, 'Bosch Impact Drill', 'Powerful 600W motor for masonry, wood, and metal.', 350.00, 'ACTIVE', '2026-02-01 02:53:52'),
(17, 5, 'Karcher Pressure Washer', 'High-pressure water jet for cleaning cars and patios.', 600.00, 'ACTIVE', '2026-02-01 02:54:30'),
(18, 5, 'Aluminum Folding Ladder', '12-foot multi-purpose ladder with anti-skid feet.', 250.00, 'ACTIVE', '2026-02-01 02:55:08'),
(19, 5, 'Electric Lawnmower', 'Cordless mower with adjustable cutting height.', 800.00, 'ACTIVE', '2026-02-01 02:55:35'),
(20, 5, 'Circular Saw', 'Professional wood-cutting saw with adjustable depth.', 500.00, 'ACTIVE', '2026-02-01 02:55:59'),
(21, 6, 'PlayStation 5 (Disc)', 'Next-gen console with DualSense controller and 4K support.', 1100.00, 'ACTIVE', '2026-02-01 02:59:29'),
(22, 6, 'MacBook Pro M3 Max', '14-inch powerhouse for 4K video editing and rendering.', 4500.00, 'ACTIVE', '2026-02-01 03:00:03'),
(23, 6, 'Oculus/Meta Quest 3', 'Standalone VR headset for immersive gaming and training.', 1400.00, 'ACTIVE', '2026-02-01 03:00:30'),
(24, 2, 'Samsung Global', 'It is a very good 200 megapixels camera.', 500.00, 'ACTIVE', '2026-02-01 03:05:57'),
(25, 6, 'Gaming Monitor (240Hz)', '27-inch 1440p screen with 1ms response time.', 900.00, 'ACTIVE', '2026-02-01 03:50:11'),
(26, 6, 'Mechanical Keyboard', 'RGB backlit with Cherry MX Blue switches for tactile typing.', 300.00, 'ACTIVE', '2026-02-01 03:50:51'),
(27, 5, 'Mechanical Keyboard', 'keyboard', 300.00, 'ACTIVE', '2026-02-01 04:21:59');

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `value_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_media`
--

CREATE TABLE `product_media` (
  `media_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `media_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_media`
--

INSERT INTO `product_media` (`media_id`, `product_id`, `media_url`) VALUES
(1, 1, '/uploads/images-1769913286481-88233332.jpg'),
(2, 2, '/uploads/images-1769913356659-455748616.jpg'),
(3, 3, '/uploads/images-1769913386497-898919882.jpg'),
(4, 4, '/uploads/images-1769913429482-191229419.jpg'),
(5, 5, '/uploads/images-1769913458294-224769346.jpg'),
(6, 6, '/uploads/images-1769913704935-353748003.jpg'),
(7, 7, '/uploads/images-1769913741651-168913160.jpg'),
(8, 8, '/uploads/images-1769913768626-716993067.jpg'),
(9, 9, '/uploads/images-1769913793729-189633926.jpg'),
(10, 10, '/uploads/images-1769913817707-385070431.jpg'),
(11, 11, '/uploads/images-1769914009038-633175366.jpg'),
(12, 12, '/uploads/images-1769914048315-837596904.jpg'),
(13, 13, '/uploads/images-1769914083967-160072608.jpg'),
(14, 14, '/uploads/images-1769914118501-412547659.jpg'),
(15, 15, '/uploads/images-1769914143914-253272892.jpg'),
(16, 16, '/uploads/images-1769914432473-887323116.jpg'),
(17, 17, '/uploads/images-1769914470114-362025857.jpg'),
(18, 18, '/uploads/images-1769914508958-126161650.jpg'),
(19, 19, '/uploads/images-1769914535414-601697791.jpg'),
(20, 20, '/uploads/images-1769914559479-709493644.jpg'),
(21, 21, '/uploads/images-1769914769038-6602666.jpg'),
(22, 22, '/uploads/images-1769914803681-317956316.jpg'),
(23, 23, '/uploads/images-1769914830960-14606872.jpg'),
(24, 24, '/uploads/images-1769915157776-289204013.jpg'),
(25, 25, '/uploads/images-1769917811706-276423104.jpg'),
(26, 26, '/uploads/images-1769917851125-788425180.jpg'),
(27, 27, '/uploads/images-1769919719049-612208380.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_pricing`
--

CREATE TABLE `product_pricing` (
  `pricing_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `min_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_pricing`
--

INSERT INTO `product_pricing` (`pricing_id`, `product_id`, `unit_id`, `price`, `min_duration`) VALUES
(1, 1, 2, 2500.00, 1),
(2, 2, 2, 1200.00, 1),
(3, 3, 2, 800.00, 1),
(4, 4, 2, 1500.00, 1),
(5, 5, 2, 600.00, 1),
(6, 6, 2, 450.00, 1),
(7, 7, 2, 250.00, 1),
(8, 8, 2, 150.00, 1),
(9, 9, 2, 200.00, 1),
(10, 10, 2, 100.00, 1),
(11, 11, 2, 1800.00, 1),
(12, 12, 2, 2200.00, 1),
(13, 13, 2, 400.00, 1),
(14, 14, 2, 3000.00, 1),
(15, 15, 2, 700.00, 1),
(16, 16, 2, 350.00, 1),
(17, 17, 2, 600.00, 1),
(18, 18, 2, 250.00, 1),
(19, 19, 2, 800.00, 1),
(20, 20, 2, 500.00, 1),
(21, 21, 2, 1100.00, 1),
(22, 22, 2, 4500.00, 1),
(23, 23, 2, 1400.00, 1),
(24, 24, 2, 2.00, 1),
(25, 25, 2, 900.00, 1),
(26, 26, 2, 300.00, 1),
(27, 27, 2, 300.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `quotations`
--

CREATE TABLE `quotations` (
  `quotation_id` bigint(20) NOT NULL,
  `customer_id` bigint(20) DEFAULT NULL,
  `status` enum('DRAFT','SENT','CONFIRMED') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotations`
--

INSERT INTO `quotations` (`quotation_id`, `customer_id`, `status`, `created_at`) VALUES
(2, 1, 'CONFIRMED', '2026-02-01 04:04:08'),
(3, 1, 'CONFIRMED', '2026-02-01 04:17:10');

-- --------------------------------------------------------

--
-- Table structure for table `quotation_items`
--

CREATE TABLE `quotation_items` (
  `item_id` bigint(20) NOT NULL,
  `quotation_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price_snapshot` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotation_items`
--

INSERT INTO `quotation_items` (`item_id`, `quotation_id`, `product_id`, `start_date`, `end_date`, `quantity`, `price_snapshot`) VALUES
(2, 2, 2, '2026-02-04 16:05:00', '2026-02-08 09:03:00', 2, 9600.00),
(3, 3, 18, '2026-02-03 05:16:00', '2026-02-05 06:16:00', 2, 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `rental_orders`
--

CREATE TABLE `rental_orders` (
  `order_id` bigint(20) NOT NULL,
  `customer_id` bigint(20) DEFAULT NULL,
  `quotation_id` bigint(20) DEFAULT NULL,
  `status` enum('CONFIRMED','ACTIVE','COMPLETED') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rental_orders`
--

INSERT INTO `rental_orders` (`order_id`, `customer_id`, `quotation_id`, `status`, `created_at`) VALUES
(2, 1, 2, 'ACTIVE', '2026-02-01 04:04:23'),
(3, 1, 3, 'COMPLETED', '2026-02-01 04:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `rental_order_items`
--

CREATE TABLE `rental_order_items` (
  `order_item_id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `final_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rental_order_items`
--

INSERT INTO `rental_order_items` (`order_item_id`, `order_id`, `product_id`, `start_date`, `end_date`, `quantity`, `final_price`) VALUES
(2, 2, 2, '2026-02-04 16:05:00', '2026-02-08 09:03:00', 2, 9600.00),
(3, 3, 18, '2026-02-03 05:16:00', '2026-02-05 06:16:00', 2, 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `order_item_id` bigint(20) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `product_id`, `order_item_id`, `start_date`, `end_date`, `quantity`, `created_at`) VALUES
(2, 2, 2, '2026-02-04 16:05:00', '2026-02-08 09:03:00', 2, '2026-02-01 04:04:23'),
(3, 18, 3, '2026-02-03 05:16:00', '2026-02-05 06:16:00', 2, '2026-02-01 04:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `returns`
--

CREATE TABLE `returns` (
  `return_id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `actual_return_time` datetime DEFAULT NULL,
  `late_fee` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `returns`
--

INSERT INTO `returns` (`return_id`, `order_id`, `actual_return_time`, `late_fee`) VALUES
(2, 3, '2026-02-01 04:23:02', 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_code`) VALUES
(1, 'ADMIN'),
(3, 'CUSTOMER'),
(2, 'VENDOR');

-- --------------------------------------------------------

--
-- Table structure for table `system_settings`
--

CREATE TABLE `system_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `status` enum('ACTIVE','BLOCKED') DEFAULT 'ACTIVE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password_hash`, `status`, `created_at`, `updated_at`, `reset_password_token`, `reset_password_expires`) VALUES
(1, 'gokaniashish8@gmail.com', '$2a$10$KGmAik66Z9XHUOqrRqcJzeVfON2z/9rtvAsg7YBDusrFuDGfmD2NW', 'ACTIVE', '2026-02-01 01:59:58', '2026-02-01 01:59:58', NULL, NULL),
(2, 'an1874600@gmail.com', '$2a$10$Os/.WaPjKiGTfhjX15yKXuoJApXNrkpwx.ja.QIy5IowSXHEyAfAW', 'ACTIVE', '2026-02-01 02:28:31', '2026-02-01 02:28:31', NULL, NULL),
(3, 'ashishgokani58@gmail.com', '$2a$10$IGXbKZgBqLyD/4M6Rhhy.uQnoLkoyHNOxQbEQzhqOjJeKhWxtpGu.', 'ACTIVE', '2026-02-01 02:39:46', '2026-02-01 02:39:46', NULL, NULL),
(4, 'harminv251@gmail.com', '$2a$10$e7Hkq/Bp8qAgDi4lLdidXeAolCMLUNDlxckwJqUaoEA7Hc8DJUQ.u', 'ACTIVE', '2026-02-01 02:44:47', '2026-02-01 02:44:47', NULL, NULL),
(5, 'vekariyaharmin96@gmail.com', '$2a$10$lyI7vzkRbFYalGXizDIUqecEbiZJP4VhsiJ8IlDh0bCWTE71P2Cu6', 'ACTIVE', '2026-02-01 02:50:44', '2026-02-01 02:50:44', NULL, NULL),
(6, 'harminv00@gmail.com', '$2a$10$1OvqyRNMW3vLPHtIShASm.IMXqsEgX2di9qvGLO8YczYtXilOkG6G', 'ACTIVE', '2026-02-01 02:56:51', '2026-02-01 02:56:51', NULL, NULL),
(7, 'admin@rentalsys.com', '$2a$10$qiZZ5C8wn0Pxk5DaQ1BzfupOCjcNW.ZII1SM7m8HZ2e52Oy6abb9K', 'ACTIVE', '2026-02-01 03:56:25', '2026-02-01 03:56:25', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_role_id`, `user_id`, `role_id`) VALUES
(1, 1, 3),
(2, 2, 2),
(3, 3, 2),
(4, 4, 2),
(5, 5, 2),
(6, 6, 2),
(7, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_profiles`
--

CREATE TABLE `vendor_profiles` (
  `vendor_id` bigint(20) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `gstin` varchar(20) NOT NULL,
  `business_address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor_profiles`
--

INSERT INTO `vendor_profiles` (`vendor_id`, `company_name`, `gstin`, `business_address`, `created_at`) VALUES
(2, 'Odoo Rentals', '24TXCQU5FNOT1Z', 'Gandhinagar', '2026-02-01 02:28:31'),
(3, 'Adventure Amazon', '24TXCQU5FlKT1Z', 'Mumbai', '2026-02-01 02:39:46'),
(4, 'Formal GPT', '44TCXQU5FlKT1Z', 'Hyderabad', '2026-02-01 02:44:47'),
(5, 'Swift DIY', '2RNGYXCZWF1Z', 'Delhi', '2026-02-01 02:50:44'),
(6, 'Marvel Gaming', 'PMOEM333MI1Z', 'Kolkata', '2026-02-01 02:56:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_profiles`
--
ALTER TABLE `admin_profiles`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`attribute_id`);

--
-- Indexes for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD PRIMARY KEY (`value_id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `customer_profiles`
--
ALTER TABLE `customer_profiles`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Indexes for table `pickups`
--
ALTER TABLE `pickups`
  ADD PRIMARY KEY (`pickup_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pricing_units`
--
ALTER TABLE `pricing_units`
  ADD PRIMARY KEY (`unit_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `value_id` (`value_id`);

--
-- Indexes for table `product_media`
--
ALTER TABLE `product_media`
  ADD PRIMARY KEY (`media_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_pricing`
--
ALTER TABLE `product_pricing`
  ADD PRIMARY KEY (`pricing_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `quotations`
--
ALTER TABLE `quotations`
  ADD PRIMARY KEY (`quotation_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `quotation_items`
--
ALTER TABLE `quotation_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `quotation_id` (`quotation_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `rental_orders`
--
ALTER TABLE `rental_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `rental_order_items`
--
ALTER TABLE `rental_order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_item_id` (`order_item_id`);

--
-- Indexes for table `returns`
--
ALTER TABLE `returns`
  ADD PRIMARY KEY (`return_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_code` (`role_code`);

--
-- Indexes for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD PRIMARY KEY (`setting_key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vendor_profiles`
--
ALTER TABLE `vendor_profiles`
  ADD PRIMARY KEY (`vendor_id`),
  ADD UNIQUE KEY `gstin` (`gstin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_values`
--
ALTER TABLE `attribute_values`
  MODIFY `value_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pickups`
--
ALTER TABLE `pickups`
  MODIFY `pickup_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pricing_units`
--
ALTER TABLE `pricing_units`
  MODIFY `unit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_media`
--
ALTER TABLE `product_media`
  MODIFY `media_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `product_pricing`
--
ALTER TABLE `product_pricing`
  MODIFY `pricing_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `quotation_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quotation_items`
--
ALTER TABLE `quotation_items`
  MODIFY `item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rental_orders`
--
ALTER TABLE `rental_orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rental_order_items`
--
ALTER TABLE `rental_order_items`
  MODIFY `order_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `returns`
--
ALTER TABLE `returns`
  MODIFY `return_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_profiles`
--
ALTER TABLE `admin_profiles`
  ADD CONSTRAINT `admin_profiles_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD CONSTRAINT `attribute_values_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`attribute_id`);

--
-- Constraints for table `customer_profiles`
--
ALTER TABLE `customer_profiles`
  ADD CONSTRAINT `customer_profiles_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD CONSTRAINT `inventory_transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `rental_orders` (`order_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`);

--
-- Constraints for table `pickups`
--
ALTER TABLE `pickups`
  ADD CONSTRAINT `pickups_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `rental_orders` (`order_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_profiles` (`vendor_id`);

--
-- Constraints for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `product_attribute_values_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `product_attribute_values_ibfk_2` FOREIGN KEY (`value_id`) REFERENCES `attribute_values` (`value_id`);

--
-- Constraints for table `product_media`
--
ALTER TABLE `product_media`
  ADD CONSTRAINT `product_media_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `product_pricing`
--
ALTER TABLE `product_pricing`
  ADD CONSTRAINT `product_pricing_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `product_pricing_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `pricing_units` (`unit_id`);

--
-- Constraints for table `quotations`
--
ALTER TABLE `quotations`
  ADD CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_profiles` (`customer_id`);

--
-- Constraints for table `quotation_items`
--
ALTER TABLE `quotation_items`
  ADD CONSTRAINT `quotation_items_ibfk_1` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`quotation_id`),
  ADD CONSTRAINT `quotation_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `rental_orders`
--
ALTER TABLE `rental_orders`
  ADD CONSTRAINT `rental_orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_profiles` (`customer_id`);

--
-- Constraints for table `rental_order_items`
--
ALTER TABLE `rental_order_items`
  ADD CONSTRAINT `rental_order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `rental_orders` (`order_id`),
  ADD CONSTRAINT `rental_order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`order_item_id`) REFERENCES `rental_order_items` (`order_item_id`);

--
-- Constraints for table `returns`
--
ALTER TABLE `returns`
  ADD CONSTRAINT `returns_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `rental_orders` (`order_id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `vendor_profiles`
--
ALTER TABLE `vendor_profiles`
  ADD CONSTRAINT `vendor_profiles_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
