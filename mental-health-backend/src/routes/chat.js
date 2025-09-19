import express from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import OpenAI from 'openai';

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder' });

const messageSchema = z.object({
  message: z.string().min(1).max(2000),
});

router.use(requireAuth);

router.post('/', async (req, res) => {
  const parsed = messageSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input' });
  const userMessage = parsed.data.message;

  try {
    // Minimal placeholder call - replace with your preferred model
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a supportive CBT-style mental health assistant. Keep responses brief and empathetic.' },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
    const reply = completion.choices?.[0]?.message?.content || 'I am here for you.';
    res.json({ reply });
  } catch (e) {
    console.error('OpenAI error:', e.message);
    // Do not leak details
    res.status(200).json({ reply: 'I am here for you. Let us focus on grounding: try 4-7-8 breathing.' });
  }
});

export default router;


