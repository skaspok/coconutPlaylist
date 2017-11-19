CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `jhi_date` timestamp NULL,
  `song_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_song_id` (`song_id`),
  KEY `fk_comment_user_id` (`user_id`),
  CONSTRAINT `fk_comment_song_id` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`),
  CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `song` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deezer_ref` varchar(255) DEFAULT NULL,
  `jhi_date` timestamp NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_song_comment_id` (`comment_id`),
  CONSTRAINT `fk_song_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
