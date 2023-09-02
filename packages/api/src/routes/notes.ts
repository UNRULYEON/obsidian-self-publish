import express from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { createId, isCuid } from "@paralleldrive/cuid2";
import db from "../drizzle";
import { notes } from "../drizzle/schema/notes";
import validateBody from "../middleware/validate";
import { NOTE_STATUS } from "../constants";
import auth from "../middleware/auth";

const router = express.Router();

const newNoteSchema = z.object({
  title: z.string(),
  markdown: z.string(),
});

router.get("/note/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isCuid(id)) return res.sendStatus(400);

    const note = await db.select().from(notes).where(eq(notes.id, id));

    if (note.length === 0) return res.sendStatus(404);

    res.json(note);
  } catch (e: any) {
    next(e);
  }
});

router.post("/note", auth, async (req, res, next) => {
  try {
    const { title, markdown } = await validateBody(newNoteSchema, req);

    await db.insert(notes).values({
      id: createId(),
      title,
      markdown,
      status: NOTE_STATUS.UNPUBLISHED,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    res.sendStatus(200);
  } catch (e: any) {
    next(e);
  }
});

const updateNoteSchema = newNoteSchema.deepPartial();

router.patch("/note/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isCuid(id)) return res.sendStatus(400);

    const { title, markdown } = await validateBody(updateNoteSchema, req);

    const result = await db
      .update(notes)
      .set({
        title,
        markdown,
        updatedAt: Date.now(),
      })
      .where(eq(notes.id, id));

    if (result.changes === 0) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (e: any) {
    next(e);
  }
});

router.delete("/note/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isCuid(id)) return res.sendStatus(400);

    const result = await db.delete(notes).where(eq(notes.id, id));

    if (result.changes === 0) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (e: any) {
    next(e);
  }
});

export default router;
