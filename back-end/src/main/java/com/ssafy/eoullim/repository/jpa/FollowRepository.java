package com.ssafy.eoullim.repository.jpa;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    Optional<FollowEntity> findByChildAndFollowingChild(ChildEntity child, ChildEntity followingChild);
    List<FollowEntity> findByChild(ChildEntity child);

}
