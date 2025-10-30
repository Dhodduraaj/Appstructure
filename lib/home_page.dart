import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:intl/intl.dart';
import 'auth_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  final TextEditingController nameController = TextEditingController();
  final TextEditingController dobController = TextEditingController();

  String? selectedWork;
  String successMessage = ''; // 👈 Sentence to display after saving

  Future<void> saveDetails() async {
    try {
      final user = _auth.currentUser;
      if (user == null) return;

      final name = nameController.text.trim();
      final dob = dobController.text.trim();
      final work = selectedWork ?? 'Not specified';

      // Save in Firestore
      await _firestore.collection('users').doc(user.uid).set({
        'name': name,
        'dob': dob,
        'work': work,
      });

      // 👇 Update the message and clear fields
      setState(() {
        successMessage =
        "Hi $name! Your details have been saved successfully 🎉";
        nameController.clear();
        dobController.clear();
        selectedWork = null;
      });
    } catch (e) {
      setState(() {
        successMessage = "⚠️ Something went wrong! Please try again.";
      });
    }
  }

  Future<void> logout() async {
    await _auth.signOut();
    if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const AuthPage()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Page'),
        actions: [
          IconButton(
            onPressed: logout,
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: dobController,
                decoration: const InputDecoration(
                    labelText: 'Date of Birth (Tap to select)'),
                readOnly: true,
                onTap: () async {
                  final date = await showDatePicker(
                    context: context,
                    initialDate: DateTime(2000),
                    firstDate: DateTime(1900),
                    lastDate: DateTime.now(),
                  );
                  if (date != null) {
                    dobController.text =
                        DateFormat('dd-MM-yyyy').format(date);
                  }
                },
              ),
              const SizedBox(height: 10),
              DropdownButtonFormField<String>(
                value: selectedWork,
                decoration: const InputDecoration(labelText: 'Work'),
                items: const [
                  DropdownMenuItem(value: 'Student', child: Text('Student')),
                  DropdownMenuItem(value: 'Engineer', child: Text('Engineer')),
                  DropdownMenuItem(value: 'IT Worker', child: Text('IT Worker')),
                ],
                onChanged: (value) => setState(() => selectedWork = value),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: saveDetails,
                child: const Text('Save Details'),
              ),
              const SizedBox(height: 20),

              // 👇 Message shown after saving
              if (successMessage.isNotEmpty)
                Center(
                  child: Text(
                    successMessage,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: Colors.teal,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
