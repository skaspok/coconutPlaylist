package org.skaspok.coconutplaylist.repository;

import org.skaspok.coconutplaylist.domain.Song;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Song entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SongRepository extends JpaRepository<Song,Long> {

    @Query("select song from Song song where song.addingUser.login = ?#{principal.username}")
    List<Song> findByAddingUserIsCurrentUser();
    
}
