import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export const deepReadDir = async (dirPath) =>
  await Promise.all(
    (
      await readdir(dirPath, { withFileTypes: true })
    ).map(async (dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory() ? await deepReadDir(path) : path;
    })
  );
