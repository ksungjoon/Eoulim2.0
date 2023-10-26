import 'package:flutter/material.dart';
import 'package:mobile/screen/session/utils/websocket.dart' as websocket;

class Session extends StatefulWidget {
  const Session({
    super.key,
    required this.title,
  });

  final String title;

  @override
  State<Session> createState() => _SessionState();
}

class _SessionState extends State<Session> {
  final TextEditingController _controller = TextEditingController();
  final client = websocket.stompClient;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Form(
              child: TextFormField(
                controller: _controller,
                decoration: const InputDecoration(labelText: 'Send a message'),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _sendMessage,
        tooltip: 'Send message',
        child: const Icon(Icons.send),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  @override
  void initState() {
    super.initState();
    client.activate();
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      client.send(destination: '/foo/bar', body: _controller.text, headers: {});
    }
  }

  @override
  void dispose() {
    client.deactivate();
    _controller.dispose();
    super.dispose();
  }
}
