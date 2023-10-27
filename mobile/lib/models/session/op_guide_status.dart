class OpGuideStatus {
  final int? opId;
  bool? opGuideStatus;

  OpGuideStatus({this.opId, this.opGuideStatus});

  factory OpGuideStatus.fromMap(Map map) {
    return OpGuideStatus(
      opId: map['opId'] ?? 0,
      opGuideStatus: map['opGuideStatus'] ?? false,
    );
  }
}
