class MyGuideStatus {
  final int? childId;
  bool? myGuideStatus;

  MyGuideStatus({this.childId, this.myGuideStatus});

  factory MyGuideStatus.fromMap(Map map) {
    return MyGuideStatus(
      childId: map['childId'] ?? 0,
      myGuideStatus: map['myGuideStatus'] ?? false,
    );
  }
}
