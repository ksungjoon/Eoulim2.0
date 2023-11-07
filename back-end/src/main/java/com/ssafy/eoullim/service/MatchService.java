package com.ssafy.eoullim.service;

import com.ssafy.eoullim.model.Match;
import com.ssafy.eoullim.service.impl.AlarmService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.util.List;

public interface MatchService {
  Match startRandom(Long childId, Long userId);

  Match startFriend(
      Long childId,
      String childName,
      Long friendId,
      AlarmService alarmService,
      String existSessionId,
      Long userId);

  Recording stopRandom(
      String sessionId, List<Integer> guideSeq, List<String> timeline, RecordService recordService)
      throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException;

  Recording stopFriend(String sessionId, RecordService recordService)
      throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException;
}
