import 'dart:async';
import 'dart:convert';

import 'package:mobile/utils/session/websocket.dart';
import 'package:stomp_dart_client/stomp.dart';
import 'package:stomp_dart_client/stomp_config.dart';
import 'package:stomp_dart_client/stomp_frame.dart';

import 'package:mobile/models/session/my_guide_status.dart';
import 'package:mobile/models/session/session_status.dart';

class WebSocketProvider {
  void onConnect(StompFrame frame) {
    print("연결시도");
    subscribe(sessionId, "animon");
    subscribe(sessionId, "guide");
    subscribe(sessionId, "leave-session");
  }

  late StompClient client;

  WebSocketProvider() {
    client = StompClient(
      config: StompConfig(
        url: 'wss://k9c103.p.ssafy.io/ws',
        onConnect: onConnect,
        beforeConnect: () async {
          print('waiting to connect...');
          await Future.delayed(const Duration(milliseconds: 200));
          print('connecting...');
        },
        onWebSocketError: (dynamic error) => print(error.toString()),
        onStompError: (d) => print('error stomp'),
      ),
    );
  }

  void subscribe(String sessionId, String topic) {
    client.subscribe(
        destination: '/topic/$sessionId/$topic',
        callback: (response) {
          Map<String, dynamic> result = json.decode(response.body!);
          if (topic == "animon") {
            print("animon");
            print(result);
          } else if (topic == "guide") {
            print("guide");
            print(result);
          } else if (topic == "leave-session") {
            print("leave-session");
            print(result);
          } else {
            print("nothing");
          }
        });
  }

  void send(
    String sessionId,
    String topic,
    Map<String, dynamic> message,
  ) {
    client.send(
        destination: '/app/$sessionId/$topic',
        body: json.encode(message),
        headers: {});
    print("successfully send message");
  }
}
