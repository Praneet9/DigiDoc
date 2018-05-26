-- MySQL dump 10.16  Distrib 10.2.8-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: DMA
-- ------------------------------------------------------
-- Server version	10.2.8-MariaDB

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointment` (
  `Patient_p_id` int(11) NOT NULL,
  `Doctor_d_id` int(11) NOT NULL,
  `a_date` date DEFAULT NULL,
  PRIMARY KEY (`Patient_p_id`,`Doctor_d_id`),
  KEY `fk_Patient_has_Doctor_Doctor1_idx` (`Doctor_d_id`),
  KEY `fk_Patient_has_Doctor_Patient1_idx` (`Patient_p_id`),
  CONSTRAINT `fk_Patient_has_Doctor_Doctor1` FOREIGN KEY (`Doctor_d_id`) REFERENCES `doctor` (`d_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patient_has_Doctor_Patient1` FOREIGN KEY (`Patient_p_id`) REFERENCES `patient` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `d_id` int(11) NOT NULL AUTO_INCREMENT,
  `d_fname` varchar(45) NOT NULL,
  `d_lname` varchar(45) NOT NULL,
  `d_qualification` varchar(45) NOT NULL,
  `d_specialities` varchar(45) NOT NULL,
  `d_rating` varchar(45) DEFAULT NULL,
  `d_phone` varchar(45) NOT NULL,
  `d_email` varchar(45) NOT NULL,
  `d_dob` varchar(45) NOT NULL,
  PRIMARY KEY (`d_id`),
  UNIQUE KEY `d_email` (`d_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
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
  CONSTRAINT `fk_Test_Patient` FOREIGN KEY (`p_id`) REFERENCES `patient` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `l_email` varchar(45) DEFAULT NULL,
  `l_password` varchar(128) DEFAULT NULL,
  `l_role` enum('Doctor','Patient') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_fname` varchar(45) NOT NULL,
  `p_lname` varchar(45) NOT NULL,
  `p_dob` varchar(45) NOT NULL,
  `p_phone` varchar(45) NOT NULL,
  `p_gender` varchar(45) NOT NULL,
  `p_email` varchar(45) NOT NULL,
  PRIMARY KEY (`p_id`),
  UNIQUE KEY `p_email` (`p_email`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resolves`
--

DROP TABLE IF EXISTS `resolves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resolves` (
  `t_id` int(11) NOT NULL,
  `d_id` int(11) NOT NULL,
  `r_date` varchar(45) NOT NULL,
  `r_purpose` varchar(45) NOT NULL,
  PRIMARY KEY (`t_id`,`d_id`),
  KEY `fk_Test_has_Doctor_Doctor1_idx` (`d_id`),
  KEY `fk_Test_has_Doctor_Test1_idx` (`t_id`),
  CONSTRAINT `fk_Test_has_Doctor_Doctor1` FOREIGN KEY (`d_id`) REFERENCES `doctor` (`d_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Test_has_Doctor_Test1` FOREIGN KEY (`t_id`) REFERENCES `event` (`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resolves`
--

LOCK TABLES `resolves` WRITE;
/*!40000 ALTER TABLE `resolves` DISABLE KEYS */;
/*!40000 ALTER TABLE `resolves` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-15 15:50:24
