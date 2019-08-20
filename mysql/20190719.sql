/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : 20190719

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 22/07/2019 15:57:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for student_table
-- ----------------------------
DROP TABLE IF EXISTS `student_table`;
CREATE TABLE `student_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `class` tinyint(4) NOT NULL,
  `name` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_table
-- ----------------------------
INSERT INTO `student_table` VALUES (1, 1, 'min');
INSERT INTO `student_table` VALUES (2, 2, 'hong');
INSERT INTO `student_table` VALUES (3, 1, 'gang');
INSERT INTO `student_table` VALUES (4, 3, 'hua');
INSERT INTO `student_table` VALUES (5, 2, 'liu');
INSERT INTO `student_table` VALUES (6, 2, 'yu');
INSERT INTO `student_table` VALUES (7, 1, 'yin');

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES (1, 'aaa', '111');
INSERT INTO `user_table` VALUES (2, 'bbb', '222');
INSERT INTO `user_table` VALUES (3, 'ccc', '333');
INSERT INTO `user_table` VALUES (4, 'ooo', '112233');
INSERT INTO `user_table` VALUES (5, 'ooo', '112233');
INSERT INTO `user_table` VALUES (6, 'oo11o', '2233d');

SET FOREIGN_KEY_CHECKS = 1;
