package org.skaspok.coconutplaylist.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "deezer_ref")
    private String deezerRef;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @ManyToOne
    private User addingUser;

    @OneToMany(mappedBy = "song")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeezerRef() {
        return deezerRef;
    }

    public Song deezerRef(String deezerRef) {
        this.deezerRef = deezerRef;
        return this;
    }

    public void setDeezerRef(String deezerRef) {
        this.deezerRef = deezerRef;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Song date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public User getAddingUser() {
        return addingUser;
    }

    public Song addingUser(User user) {
        this.addingUser = user;
        return this;
    }

    public void setAddingUser(User user) {
        this.addingUser = user;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Song comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Song addComments(Comment comment) {
        this.comments.add(comment);
        comment.setSong(this);
        return this;
    }

    public Song removeComments(Comment comment) {
        this.comments.remove(comment);
        comment.setSong(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Song song = (Song) o;
        if (song.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), song.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", deezerRef='" + getDeezerRef() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
