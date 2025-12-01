-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: home_manager
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts_user`
--

DROP TABLE IF EXISTS `accounts_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user`
--

LOCK TABLES `accounts_user` WRITE;
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` VALUES ('pbkdf2_sha256$1000000$SJ2qzL6DVw1pIp0RjFh0ZZ$k8ie8r6gHi47waF/4pe19pabu/DH4fpqd2/4oCBzBxw=','2025-12-01 04:49:53.886339',1,1,'admin','daigo.densiaddress@gmail.com','','',1,1),('pbkdf2_sha256$1000000$JKURycL31jJebL3LaSrB8b$m5l1Tz7r8tQgAGzRFSuX3VpXRDRp+9R+MEt97MwkgqA=',NULL,0,2,'testuser01','hogehoge@gmail.com','hogest','',1,0);
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user_groups`
--

DROP TABLE IF EXISTS `accounts_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_groups_user_id_group_id_59c0b32f_uniq` (`user_id`,`group_id`),
  KEY `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` (`group_id`),
  CONSTRAINT `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `accounts_user_groups_user_id_52b62117_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user_groups`
--

LOCK TABLES `accounts_user_groups` WRITE;
/*!40000 ALTER TABLE `accounts_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user_user_permissions`
--

DROP TABLE IF EXISTS `accounts_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq` (`user_id`,`permission_id`),
  KEY `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` (`permission_id`),
  CONSTRAINT `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `accounts_user_user_p_user_id_e4f0a161_fk_accounts_` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user_user_permissions`
--

LOCK TABLES `accounts_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `accounts_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add home_money',7,'add_home_money'),(26,'Can change home_money',7,'change_home_money'),(27,'Can delete home_money',7,'delete_home_money'),(28,'Can view home_money',7,'view_home_money'),(29,'Can add Token',8,'add_token'),(30,'Can change Token',8,'change_token'),(31,'Can delete Token',8,'delete_token'),(32,'Can view Token',8,'view_token'),(33,'Can add Token',9,'add_tokenproxy'),(34,'Can change Token',9,'change_tokenproxy'),(35,'Can delete Token',9,'delete_tokenproxy'),(36,'Can view Token',9,'view_tokenproxy');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('6d2128debb69ac0eef66836965c5eaddbfd44abf','2025-10-31 02:18:41.763904',2);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-06-20 05:24:36.982875','2','testuser01 - 2 - 2131 - 21312 - 12312',3,'',7,1),(2,'2025-06-20 05:24:48.747576','1','testuser01 - 1 - 213 - 123 - 123',3,'',7,1),(3,'2025-06-20 07:03:33.205181','2','testuser01',2,'[{\"changed\": {\"fields\": [\"Nickname\"]}}]',6,1),(4,'2025-06-23 01:30:45.449002','6','testuser01 - 6 - 324 - 324 - 234',3,'',7,1),(5,'2025-06-23 01:30:48.596379','5','testuser01 - 5 - 324 - 234 - 324',3,'',7,1),(6,'2025-06-23 01:30:51.170843','4','testuser01 - 4 - 食費 - 夕食 - 1000',3,'',7,1),(7,'2025-06-23 01:30:53.834914','3','testuser01 - 3 - 交通費 - 定期代 - 12000',3,'',7,1),(8,'2025-07-02 06:50:57.373500','29','admin - 29 - 娯楽 - test - 4',1,'[{\"added\": {}}]',7,1),(9,'2025-07-02 06:51:10.590069','29','testuser01 - 29 - 娯楽 - test - 4',2,'[{\"changed\": {\"fields\": [\"User id\"]}}]',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (6,'accounts','user'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(8,'authtoken','token'),(9,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(7,'home_manager','home_money'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-06-20 04:58:21.768998'),(2,'contenttypes','0002_remove_content_type_name','2025-06-20 04:58:21.913331'),(3,'auth','0001_initial','2025-06-20 04:58:22.455685'),(4,'auth','0002_alter_permission_name_max_length','2025-06-20 04:58:22.573437'),(5,'auth','0003_alter_user_email_max_length','2025-06-20 04:58:22.582951'),(6,'auth','0004_alter_user_username_opts','2025-06-20 04:58:22.593778'),(7,'auth','0005_alter_user_last_login_null','2025-06-20 04:58:22.605823'),(8,'auth','0006_require_contenttypes_0002','2025-06-20 04:58:22.610446'),(9,'auth','0007_alter_validators_add_error_messages','2025-06-20 04:58:22.624230'),(10,'auth','0008_alter_user_username_max_length','2025-06-20 04:58:22.636501'),(11,'auth','0009_alter_user_last_name_max_length','2025-06-20 04:58:22.651931'),(12,'auth','0010_alter_group_name_max_length','2025-06-20 04:58:22.677200'),(13,'auth','0011_update_proxy_permissions','2025-06-20 04:58:22.686335'),(14,'auth','0012_alter_user_first_name_max_length','2025-06-20 04:58:22.703970'),(15,'accounts','0001_initial','2025-06-20 04:58:23.187610'),(16,'admin','0001_initial','2025-06-20 04:58:23.536739'),(17,'admin','0002_logentry_remove_auto_add','2025-06-20 04:58:23.549386'),(18,'admin','0003_logentry_add_action_flag_choices','2025-06-20 04:58:23.568176'),(19,'authtoken','0001_initial','2025-06-20 04:58:23.812148'),(20,'authtoken','0002_auto_20160226_1747','2025-06-20 04:58:23.844328'),(21,'authtoken','0003_tokenproxy','2025-06-20 04:58:23.852507'),(22,'authtoken','0004_alter_tokenproxy_options','2025-06-20 04:58:23.862641'),(23,'home_manager','0001_initial','2025-06-20 04:58:24.022128'),(24,'home_manager','0002_rename_user_id_home_money_user','2025-06-20 04:58:24.177285'),(25,'home_manager','0003_rename_user_home_money_user_id','2025-06-20 04:58:24.314281'),(26,'home_manager','0004_alter_home_money_user_id','2025-06-20 04:58:24.643749'),(27,'sessions','0001_initial','2025-06-20 04:58:24.729330');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1effndxvw3xnz53ep3wd5b1hlyfl4vm8','.eJxVjDsOwjAQBe_iGlle_6GkzxmsXX9wANlSnFSIu0OkFNC-mXkvFnBba9hGXsKc2IUBO_1uhPGR2w7SHdut89jbuszEd4UfdPCpp_y8Hu7fQcVRv7VMGrWPCpwQDlF6NAaKgLMmsIW8J5lAW1Ime4o5gwJwZJVOUWGJyN4fzRo34A:1vPvrF:1jxGSeZSeBbqY_1SpGhF9IHS_niD15dQdsRlJcVBGL4','2025-12-15 04:49:53.890389'),('8v749o6o6npr64r8rxahobi9stjp89br','.eJxVjDsOwjAQBe_iGlle_6GkzxmsXX9wANlSnFSIu0OkFNC-mXkvFnBba9hGXsKc2IUBO_1uhPGR2w7SHdut89jbuszEd4UfdPCpp_y8Hu7fQcVRv7VMGrWPCpwQDlF6NAaKgLMmsIW8J5lAW1Ime4o5gwJwZJVOUWGJyN4fzRo34A:1uSTqi:Mo1PMtY69tjUEHHEvGJKLVTL8uC4gFO8FkK1kkIvMMk','2025-07-04 04:59:36.855918'),('h0th56kc60mlihrrdh04fb9j8qkidex5','.eJxVjDsOwjAQBe_iGlle_6GkzxmsXX9wANlSnFSIu0OkFNC-mXkvFnBba9hGXsKc2IUBO_1uhPGR2w7SHdut89jbuszEd4UfdPCpp_y8Hu7fQcVRv7VMGrWPCpwQDlF6NAaKgLMmsIW8J5lAW1Ime4o5gwJwZJVOUWGJyN4fzRo34A:1v4ZfV:W6jWCAnjxrwov1Hsx0dydHlKLpK_3H11YBhl1-jfYEU','2025-10-17 06:53:29.312464'),('mjbn6aiaf6d702boxs70xn7ymmm3h9lg','.eJxVjDsOwjAQBe_iGlle_6GkzxmsXX9wANlSnFSIu0OkFNC-mXkvFnBba9hGXsKc2IUBO_1uhPGR2w7SHdut89jbuszEd4UfdPCpp_y8Hu7fQcVRv7VMGrWPCpwQDlF6NAaKgLMmsIW8J5lAW1Ime4o5gwJwZJVOUWGJyN4fzRo34A:1ua2TJ:m3msgDJ1znj3dv0fXUgzULdZZCK5cxQV1hBUYCpu1Ic','2025-07-25 01:22:41.894447'),('og6uegs3b059vn2zpm4pppujypzpwxlp','.eJxVjDsOwjAQBe_iGlle_6GkzxmsXX9wANlSnFSIu0OkFNC-mXkvFnBba9hGXsKc2IUBO_1uhPGR2w7SHdut89jbuszEd4UfdPCpp_y8Hu7fQcVRv7VMGrWPCpwQDlF6NAaKgLMmsIW8J5lAW1Ime4o5gwJwZJVOUWGJyN4fzRo34A:1ubux7:xI-WLwvfctElUEE3O7L2K6BOttJcCwzbp4UZcEN2ebA','2025-07-30 05:45:13.358132');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_manager_home_money`
--

DROP TABLE IF EXISTS `home_manager_home_money`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_manager_home_money` (
  `money_id` int NOT NULL AUTO_INCREMENT,
  `money` int NOT NULL,
  `category` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `money_comment` varchar(100) NOT NULL,
  `user_id_id` varchar(30) NOT NULL,
  PRIMARY KEY (`money_id`),
  KEY `home_manager_home_mo_user_id_id_92a692d3_fk_accounts_` (`user_id_id`),
  CONSTRAINT `home_manager_home_mo_user_id_id_92a692d3_fk_accounts_` FOREIGN KEY (`user_id_id`) REFERENCES `accounts_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_manager_home_money`
--

LOCK TABLES `home_manager_home_money` WRITE;
/*!40000 ALTER TABLE `home_manager_home_money` DISABLE KEYS */;
INSERT INTO `home_manager_home_money` VALUES (63,123,'123','123','213123','testuser01'),(64,12423,'食費','食費のやつ','あああああ','testuser01'),(65,12423,'食費','食費のやつ','あああああ','testuser01'),(66,12423,'食費','食費のやつ','あああああ','testuser01'),(67,12423,'食費','食費のやつ','あああああ','testuser01'),(68,12423,'食費','食費のやつ','あああああ','testuser01');
/*!40000 ALTER TABLE `home_manager_home_money` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-01 15:52:33
