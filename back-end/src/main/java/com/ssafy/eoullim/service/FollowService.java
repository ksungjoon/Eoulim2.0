package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Follow;
import com.ssafy.eoullim.model.Status;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.FollowEntity;
import com.ssafy.eoullim.repository.ChildCacheRepository;
import com.ssafy.eoullim.repository.jpa.ChildRepository;
import com.ssafy.eoullim.repository.jpa.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {

  private final FollowRepository followRepository;
  private final ChildRepository childRepository;
  private final ChildCacheRepository childCacheRepository;

  public void create(Long childId, Long friendId) {

    if (childId.equals(friendId))
      throw new IllegalArgumentException("id가 같은 child끼리는 친구 할 수 없음."); // childId와 friendId가 같은 경우

    ChildEntity child =
        childRepository
            .findById(childId)
            .orElseThrow(() -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
    ChildEntity friend =
        childRepository
            .findById(friendId)
            .orElseThrow(() -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));

    followRepository
        .findByChildAndFollowingChild(child, friend) // 이미 좋아요 누른 친구인 경우
        .ifPresent(
            it -> {
              throw new EoullimApplicationException(ErrorCode.DUPLICATED_FRIEND);
            });

    followRepository.save(FollowEntity.of(child, friend));
  }

  public List<Follow> getFollowsByChild(Child child) {
    List<FollowEntity> followEntities = followRepository.findByChild(ChildEntity.of(child));
    return followEntities.stream().map(Follow::fromEntity).collect(Collectors.toList());
  }
}
