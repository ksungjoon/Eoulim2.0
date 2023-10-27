class SessionStatus {
  final int? sessionId;

  SessionStatus({this.sessionId});

  factory SessionStatus.fromMap(Map map) {
    return SessionStatus(
      sessionId: map['sessionId'] ?? 0,
    );
  }
}
