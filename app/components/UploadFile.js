"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData) {
    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const fs = require('fs').promises;
    await fs.writeFile(`./public/infopacks/${file.name}`, buffer);

    // Assuming revalidatePath is a function you have defined elsewhere
    revalidatePath("/");
}