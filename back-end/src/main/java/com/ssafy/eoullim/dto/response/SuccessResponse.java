package com.ssafy.eoullim.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.TimeZone;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuccessResponse<T> extends CommonResponse {
  private T data;
  private ZonedDateTime timeStamp;

  public SuccessResponse(String status, String code, T data) {
    super(ZonedDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId()), status, code);
    this.data = data;
  }
}
