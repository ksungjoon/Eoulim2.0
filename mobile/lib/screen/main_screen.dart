import 'package:flutter/material.dart';
import 'package:transitioned_indexed_stack/transitioned_indexed_stack.dart';
import 'package:mobile/screen/session_screen.dart';

class Main extends StatefulWidget {
  const Main({Key? key}) : super(key: key);

  @override
  State<Main> createState() => _MainState();
}

class _MainState extends State<Main> {
  // this is used to control the current index of the bottom navigation bar, and the current index of the FadeIndexedStack
  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        bottomNavigationBar: _buildBottomSheet(),
        body: FadeIndexedStack(
          sizing: StackFit.expand,
          beginOpacity: 0.5,
          endOpacity: 1.0,
          curve: Curves.easeInOut,
          duration: const Duration(milliseconds: 250),
          index: currentIndex,
          children: <Widget>[
            Container(
              child: Session(title: "123123123"),
            ),
            Container(
              color: Colors.blue,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomSheet() {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: (index) {
        setState(() {
          currentIndex = index;
        });
      },
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'New',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.people),
          label: 'Friends',
        ),
      ],
    );
  }
}
