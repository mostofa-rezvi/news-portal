-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: news
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `newsId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `newsId` (`newsId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`newsId`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Nice.','2026-01-16 13:00:17','2026-01-16 13:00:17',3,5);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `image` varchar(255) DEFAULT 'https://via.placeholder.com/600x400?text=News+Image',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Dhaka Metro Rail Expansion Approved','The government has approved the phase 2 expansion of the Dhaka Metro Rail project, aiming to connect new areas of the city by 2028. This will significantly reduce traffic congestion.','https://images.unsplash.com/photo-1574620583726-1076b13f195d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(2,'National Cricket Team Wins Series','The Tigers have clinched the ODI series against the visiting team with a stunning performance in the final match at Mirpur.','https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(3,'New Startups Booming in Bangladesh','The startup ecosystem in Bangladesh is witnessing rapid growth with fintech and edtech leading the way in attracting foreign investment.','https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(5,'Tech Giants Eye Data Centers in Kaliakair','Several global tech giants are in talks to establish large-scale data centers in the Hi-Tech Park at Kaliakair.','https://images.unsplash.com/photo-1558494949-ef2bb6db8744?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(6,'Education Reform Policy Drafted','A new education policy draft focuses on skill-based learning and digitizing the classroom experience across rural schools.','https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(7,'Export Earnings Hit Record High','Bangladesh\'s export earnings have surpassed all previous records this fiscal year, driven by the RMG sector.','https://images.unsplash.com/photo-1595855779344-99ce8b86851b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(8,'Green Energy Projects Launched','Five new solar power plants were inaugurated today as part of the country\'s commitment to renewable energy transitions.','https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2),(10,'Smart City Pilot Project Started','A smart city pilot project has started in Khulna to improve waste management and traffic control using IoT sensors.','https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','2026-01-16 12:18:18','2026-01-16 12:18:18',2);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','author','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Admin','admin@example.com','$2a$10$huSHpWYRykvog9XosruvVe0ujFoDycSmUSpKhxV5WGjY/PvDd4l.i','admin','2026-01-16 12:18:18','2026-01-16 12:18:18'),(2,'Alice Rahman','alice@example.com','$2a$10$huSHpWYRykvog9XosruvVe0ujFoDycSmUSpKhxV5WGjY/PvDd4l.i','author','2026-01-16 12:18:18','2026-01-16 12:18:18'),(3,'Karim Reader','karim@example.com','$2a$10$huSHpWYRykvog9XosruvVe0ujFoDycSmUSpKhxV5WGjY/PvDd4l.i','user','2026-01-16 12:18:18','2026-01-16 12:18:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-16 19:12:30
