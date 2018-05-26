-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: DMA
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Appointment`
--

DROP TABLE IF EXISTS `Appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Appointment` (
  `Patient_p_id` int(11) NOT NULL,
  `Doctor_d_id` int(11) NOT NULL,
  `a_date` date DEFAULT NULL,
  PRIMARY KEY (`Patient_p_id`,`Doctor_d_id`),
  KEY `fk_Patient_has_Doctor_Doctor1_idx` (`Doctor_d_id`),
  KEY `fk_Patient_has_Doctor_Patient1_idx` (`Patient_p_id`),
  CONSTRAINT `fk_Patient_has_Doctor_Doctor1` FOREIGN KEY (`Doctor_d_id`) REFERENCES `Doctor` (`d_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patient_has_Doctor_Patient1` FOREIGN KEY (`Patient_p_id`) REFERENCES `Patient` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointment`
--

LOCK TABLES `Appointment` WRITE;
/*!40000 ALTER TABLE `Appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Doctor`
--

DROP TABLE IF EXISTS `Doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Doctor` (
  `d_id` int(11) NOT NULL AUTO_INCREMENT,
  `d_fname` varchar(45) NOT NULL,
  `d_lname` varchar(45) NOT NULL,
  `d_qualification` varchar(45) NOT NULL,
  `d_specialities` varchar(45) NOT NULL,
  `d_rating` varchar(45) DEFAULT NULL,
  `d_phone` varchar(45) NOT NULL,
  `d_email` varchar(45) NOT NULL,
  `d_dob` varchar(45) NOT NULL,
  PRIMARY KEY (`d_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctor`
--

LOCK TABLES `Doctor` WRITE;
/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Event` (
  `t_id` int(11) NOT NULL,
  `d_id` int(11) DEFAULT NULL,
  `t_date` date NOT NULL,
  `t_injury` varchar(45) NOT NULL,
  `t_images` varchar(45) DEFAULT NULL,
  `t_complications` varchar(45) DEFAULT NULL,
  `p_id` int(11) NOT NULL,
  `t_location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`t_id`,`p_id`),
  KEY `fk_Test_Patient_idx` (`p_id`),
  CONSTRAINT `fk_Test_Patient` FOREIGN KEY (`p_id`) REFERENCES `Patient` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login`
--

DROP TABLE IF EXISTS `Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Login` (
  `l_email` varchar(45) DEFAULT NULL,
  `l_password` varchar(128) DEFAULT NULL,
  `l_role` enum('Doctor','Patient') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login`
--

LOCK TABLES `Login` WRITE;
/*!40000 ALTER TABLE `Login` DISABLE KEYS */;
/*!40000 ALTER TABLE `Login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `Patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Patient` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_fname` varchar(45) NOT NULL,
  `p_lname` varchar(45) NOT NULL,
  `p_dob` varchar(45) NOT NULL,
  `p_phone` varchar(45) NOT NULL,
  `p_gender` varchar(45) NOT NULL,
  `p_email` varchar(45) NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resolves`
--

DROP TABLE IF EXISTS `Resolves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Resolves` (
  `t_id` int(11) NOT NULL,
  `d_id` int(11) NOT NULL,
  `r_date` varchar(45) NOT NULL,
  `r_purpose` varchar(45) NOT NULL,
  PRIMARY KEY (`t_id`,`d_id`),
  KEY `fk_Test_has_Doctor_Doctor1_idx` (`d_id`),
  KEY `fk_Test_has_Doctor_Test1_idx` (`t_id`),
  CONSTRAINT `fk_Test_has_Doctor_Doctor1` FOREIGN KEY (`d_id`) REFERENCES `Doctor` (`d_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Test_has_Doctor_Test1` FOREIGN KEY (`t_id`) REFERENCES `Event` (`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resolves`
--

LOCK TABLES `Resolves` WRITE;
/*!40000 ALTER TABLE `Resolves` DISABLE KEYS */;
/*!40000 ALTER TABLE `Resolves` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-12 14:53:16
