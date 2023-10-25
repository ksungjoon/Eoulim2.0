package com.ssafy.eoullim.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
  // Common Error
  INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Z001", "Invalid token"),
  FORBIDDEN_NO_PERMISSION(HttpStatus.FORBIDDEN, "Z002", "Invalid Permission"),
  INVALID_DATA(HttpStatus.BAD_REQUEST, "Z003", "Invalid data"),

  // Server Error
  CONNECTION_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S001", "API Connection error occurs"),
  DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S002", "Database error occurs"),

  // SSE Error
  NOTIFICATION_CONNECT_ERROR(
      HttpStatus.INTERNAL_SERVER_ERROR, "A001", "Connect to notification occurs error"),

  // Child Error
  CHILD_NOT_FOUND(HttpStatus.NOT_FOUND, "C001", "Child not found"),
  CHILD_ANIMON_NOT_FOUND(HttpStatus.NOT_FOUND, "C002", "Child and Animon Relation not found"),

  // Open API Error (School)
  DATA_NOT_FOUND(HttpStatus.NOT_FOUND, "A001", "Data not found"),

  // Friend Error
  DUPLICATED_FRIEND(HttpStatus.BAD_REQUEST, "F001", "Duplicated friend relationship"),

  // User Error
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "User not found"),
  DUPLICATED_NAME(HttpStatus.BAD_REQUEST, "U002", "Duplicated user name"),
  FORBIDDEN_INVALID_PASSWORD(HttpStatus.FORBIDDEN, "U003", "Invalid password"),

  // OpenVidu Error
  MATCH_NOT_FOUND(HttpStatus.NOT_FOUND, "O001", "Match not found"),
  MATCH_CONFLICT(HttpStatus.CONFLICT, "O002", "Match Conflict"),
  OPENVIDU_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "O003", "Openvidu server error occurs"),
  OPENVIDU_HTTP_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "O004", "Openvidu http error occurs");

  private final HttpStatus status;
  private final String code; // 네이버에서 쓰는 에러 코드. 찾기 쉬움
  private final String message;
}
