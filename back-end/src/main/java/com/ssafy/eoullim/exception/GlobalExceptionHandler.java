package com.ssafy.eoullim.exception;

import com.ssafy.eoullim.dto.response.ErrorResponse;
import com.ssafy.eoullim.dto.response.Response;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.ssafy.eoullim.exception.ErrorCode.*;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(EoullimApplicationException.class)
  public ResponseEntity<ErrorResponse> errorHandler(EoullimApplicationException e) {
    final var errorResponse =
        ErrorResponse.builder()
            .status(e.getErrorCode().getStatus())
            .code(e.getErrorCode().getCode())
            .message(e.getErrorCode().getMessage())   // 클라이언트에게는 에러 코드만.
            //            .message(
            //                String.format(
            //                    "errorCode msg: %s. \n exception msg: %s",
            //                    e.getErrorCode().getMessage(), e.getMessage()))   // 이건 exception과
            // error code를 모두 client에게 보여줌
            .build();
    // 여기서 ERROR CODE 안에 있는 status랑 message, 또한 추가로 exception으로 온 message
    log.error("Error occurs {}", e.getMessage());   // 서버에 exception 메시지 출력
    return ResponseEntity.status(e.getErrorCode().getStatus()).body(errorResponse);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<?> databaseErrorHandler(IllegalArgumentException e) {
    log.error("Error occurs {}", e.toString());
    return ResponseEntity.status(DATABASE_ERROR.getStatus())
        .body(Response.error(DATABASE_ERROR.name()));
  }

  @ExceptionHandler(OpenViduHttpException.class)
  public ResponseEntity<?> openviduErrorHandler(OpenViduHttpException e) {
    log.error("Error occurs {}", e.toString());
    return ResponseEntity.status(OPENVIDU_HTTP_ERROR.getStatus())
        .body(Response.error(OPENVIDU_HTTP_ERROR.name()));
  }

  @ExceptionHandler(OpenViduJavaClientException.class)
  public ResponseEntity<?> openviduErrorHandler(OpenViduJavaClientException e) {
    log.error("Error occurs {}", e.toString());
    return ResponseEntity.status(OPENVIDU_SERVER_ERROR.getStatus())
        .body(Response.error(OPENVIDU_SERVER_ERROR.name()));
  }

  @ExceptionHandler(InterruptedException.class)
  public ResponseEntity<?> InterruptHandler(InterruptedException e) {
    log.error("Error occurs {}", e.toString());
    return ResponseEntity.status(OPENVIDU_SERVER_ERROR.getStatus())
        .body(Response.error(OPENVIDU_SERVER_ERROR.name()));
  }
}
