/*
Navicat MySQL Data Transfer

Source Server         : ljh
Source Server Version : 50513
Source Host           : localhost:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 50513
File Encoding         : 65001

Date: 2018-09-06 13:42:35
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `cmid` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT '0',
  `vcomments` varchar(2000) COLLATE utf8_unicode_ci DEFAULT '0',
  `vtime` varchar(30) COLLATE utf8_unicode_ci DEFAULT '0',
  `vphoto` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  PRIMARY KEY (`cmid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO comments VALUES ('1', '1', '12', '写得好！', '2017,9,5 19:31:55:168', '../../public/images/home-bg.jpg');
INSERT INTO comments VALUES ('2', '1', '2', '太棒了！！！', '2018,8,8 18:50:42:520', '../../public/images/home-bg.jpg');
INSERT INTO comments VALUES ('3', '2', '2', '可以', '2018,8,8 18:50:42:520', '../../public/images/home-bg.jpg');
INSERT INTO comments VALUES ('15', '3', '2', '0', '0', '0');
INSERT INTO comments VALUES ('16', '4', '2', '0', '0', '0');

-- ----------------------------
-- Table structure for `contents`
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL COMMENT '类型表的外键',
  `uid` int(11) NOT NULL COMMENT '用户表的外键',
  `title` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '文章标题',
  `addTime` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '文章添加时间',
  `description` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '描述',
  `content` varchar(2000) CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `comments` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '评论',
  `views` int(11) NOT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '图片路径',
  PRIMARY KEY (`cid`),
  KEY `ttid` (`tid`),
  KEY `cuid` (`uid`),
  CONSTRAINT `cuid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  CONSTRAINT `ttid` FOREIGN KEY (`tid`) REFERENCES `type` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of contents
-- ----------------------------
INSERT INTO contents VALUES ('1', '1', '2', 'We Help You Create Perfect Modern Design', '2018,9,5 19:31:55:168', '测试1', 'Vivamus euismod tempor interdum. Vivamus non scelerisque ex, et interdum leo. In bibendum lacus vitae felis egestas, at consectetur metus facilisis. Morbi tellus dolor, porta dignissim enim sit amet, dapibus sagittis erat. In blandit elit sit amet dui aliquet congue nec vel quam. Integer id tristique libero.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\r\nInteger vestibulum vitae arcu vel consectetur. Morbi nisl enim, elementum eget enim nec, posuere commodo mi. Proin elementum metus et dolor posuere placerat. Proin in sagittis justo. Nulla tincidunt eu velit elementum accumsan.', '', '183', '../../public/images/blog-image1.jpg');
INSERT INTO contents VALUES ('2', '1', '2', 'In pretium tellus et ante accumsan', '2018,9,5 10:31:55:168', '测试2', '测试2', null, '4', '../../public/images/blog-image2.jpg');
INSERT INTO contents VALUES ('3', '1', '2', 'Nam interdum maximus dolor faucibus', '2018,9,5 10:31:55:168', '测试2', '测试2', null, '64', '../../public/images/blog-image3.jpg');
INSERT INTO contents VALUES ('4', '1', '2', 'The ingredients that make a great burger', '2018,9,5 10:31:55:168', '测试2', '测试2', null, '8', '../../public/images/about-image.jpg');
INSERT INTO contents VALUES ('5', '1', '2', 'Vestibulum vel mauris nec ex tempus', '2018,9,5 10:31:55:168', '测试2', '测试2', null, '8', '../../public/images/about-bg.jpg');
INSERT INTO contents VALUES ('6', '1', '2', '测试2', '2018,9,5 10:31:55:168', '测试2', '测试2', null, '0', '../../public/images/8.jpg');
INSERT INTO contents VALUES ('16', '6', '2', '小测试', '2018,9,3 10:31:55:168', '小测试小测试小测试小测试', '小测试小测试小测试小测试小测试小测试小测试小测试', null, '0', '../../public/images/10.jpg');
INSERT INTO contents VALUES ('17', '7', '2', 'zxc', '2018,9,3 10:31:55:168', 'zxczxczxczxczxczxc', 'zxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxczxc', null, '0', '../../public/images/about-sep.jpg');
INSERT INTO contents VALUES ('18', '3', '2', 'vcxvcx', '2018,9,3 10:31:55:168', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', null, '0', '../../public/images/timg.jpg');
INSERT INTO contents VALUES ('19', '3', '2', 'vcxvcx', '2018,9,310:31:55:168', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', 'vcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcxvcx', null, '0', '../../public/images/timg.jpg');
INSERT INTO contents VALUES ('21', '8', '2', 'zc', '2018,9,3 10:31:55:168', '12312', 'zcxzcxz', null, '0', '../../public/images/timg.jpg');

-- ----------------------------
-- Table structure for `type`
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `tname` (`tname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO type VALUES ('3', 'CSS');
INSERT INTO type VALUES ('2', 'HTML5');
INSERT INTO type VALUES ('6', 'JAVA');
INSERT INTO type VALUES ('4', 'JS');
INSERT INTO type VALUES ('7', 'nodejs');
INSERT INTO type VALUES ('8', 'PS');
INSERT INTO type VALUES ('1', '首页');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `pwd` varchar(20) CHARACTER SET utf8 NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `nickname` varchar(20) COLLATE utf8_unicode_ci DEFAULT 'visitor',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('1', 'fpc', 'a', '0', '');
INSERT INTO user VALUES ('2', 'ljh', 'a', '1', '李家豪');
INSERT INTO user VALUES ('3', 'wy', 'a', '0', '');
INSERT INTO user VALUES ('4', 'aaa', 'a', '0', '');
INSERT INTO user VALUES ('5', 'bbb', 'a', '0', '');
INSERT INTO user VALUES ('6', 'ccc', 'a', '0', '');
INSERT INTO user VALUES ('7', 'ddd', 'a', '0', '');
INSERT INTO user VALUES ('8', 'eee', 'b', '0', '');
INSERT INTO user VALUES ('9', 'gwx', 'c', '1', '');
INSERT INTO user VALUES ('10', 'wfx', 'h', '0', '');
INSERT INTO user VALUES ('11', 'a', 'a', '0', '');
INSERT INTO user VALUES ('12', 'pf', 'a', '0', '彭芳');
