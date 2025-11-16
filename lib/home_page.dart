import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'auth_page.dart';

class HomePage extends StatefulWidget {
  final VoidCallback onThemeToggle;
  const HomePage({super.key, required this.onThemeToggle});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  final TextEditingController nameController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController ideaController = TextEditingController();

  int rating = 1;
  String? selectedWork;
  bool detailsExist = false;
  Map<String, dynamic>? savedData;

  @override
  void initState() {
    super.initState();
    loadUserDetails();
  }

  Future<void> loadUserDetails() async {
    final user = _auth.currentUser;
    if (user == null) return;

    final doc = await _firestore.collection("users").doc(user.uid).get();

    if (doc.exists) {
      setState(() {
        detailsExist = true;
        savedData = doc.data();
      });
    }
  }

  Future<void> saveDetails() async {
    final user = _auth.currentUser;
    if (user == null) return;

    await _firestore.collection("users").doc(user.uid).set({
      "name": nameController.text,
      "dob": dobController.text,
      "work": selectedWork,
      "rating": rating,
      "idea": ideaController.text,
    });

    loadUserDetails();
  }

  Future<void> logout() async {
    await _auth.signOut();
    if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => AuthPage(onThemeToggle: widget.onThemeToggle)),
      );
    }
  }

  Widget detailsCard() {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Your Profile", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            Divider(),
            Text("Name: ${savedData!['name']}"),
            Text("DOB: ${savedData!['dob']}"),
            Text("Work: ${savedData!['work']}"),
            Text("Rating: ${savedData!['rating']} ⭐"),
            if (savedData!["idea"] != "") Text("Suggestion: ${savedData!['idea']}"),
            const SizedBox(height: 15),
            ElevatedButton(
              onPressed: () => setState(() => detailsExist = false),
              child: const Text("Edit Profile"),
            )
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home"),
        actions: [
          IconButton(icon: const Icon(Icons.light_mode), onPressed: widget.onThemeToggle),
          IconButton(icon: const Icon(Icons.logout), onPressed: logout),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: detailsExist
              ? detailsCard()
              : Column(
            children: [
              TextField(controller: nameController, decoration: InputDecoration(labelText: "Name")),
              TextField(controller: dobController, decoration: InputDecoration(labelText: "DOB")),
              DropdownButtonFormField(
                value: selectedWork,
                items: ["Student", "Engineer", "IT Worker"]
                    .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                    .toList(),
                onChanged: (v) => setState(() => selectedWork = v),
                decoration: InputDecoration(labelText: "Work"),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  const Text("Rate App: "),
                  DropdownButton(
                    value: rating,
                    items: [1, 2, 3, 4, 5]
                        .map((e) => DropdownMenuItem(value: e, child: Text("$e")))
                        .toList(),
                    onChanged: (v) => setState(() => rating = v!),
                  )
                ],
              ),
              TextField(controller: ideaController, decoration: InputDecoration(labelText: "Ideas (Optional)")),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: saveDetails, child: const Text("Save Details")),
            ],
          ),
        ),
      ),
    );
  }
}
