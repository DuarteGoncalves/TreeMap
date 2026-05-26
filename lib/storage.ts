import fs from 'fs/promises'
import path from 'path'
import { Tree, TreePhoto } from '@/types'

const basePath =
  process.env.DATA_STORAGE_PATH || path.join(process.cwd(), 'data')

function getUserDir(userId = 'default') {
  return path.join(basePath, userId)
}

function getTreesPath(userId = 'default') {
  return path.join(getUserDir(userId), 'trees.json')
}

function getTreeDir(userId = 'default', treeId: string) {
  return path.join(getUserDir(userId), 'trees', treeId)
}

export async function getTrees(userId = 'default'): Promise<Tree[]> {
  try {
    const filePath = getTreesPath(userId)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function saveTrees(userId = 'default', trees: Tree[]) {
  const userDir = getUserDir(userId)
  await fs.mkdir(userDir, { recursive: true })

  const filePath = getTreesPath(userId)
  await fs.writeFile(filePath, JSON.stringify(trees, null, 2))
}

export async function getTreePhotos(
  userId: string,
  treeId: string
): Promise<TreePhoto[]> {
  const treeDir = getTreeDir(userId, treeId)

  try {
    const files = await fs.readdir(treeDir)

    const photos = files
      .filter((f) => f.endsWith('.jpg'))
      .map(async (filename) => {
        const metaPath = path.join(treeDir, filename + '.json')

        try {
          const meta = await fs.readFile(metaPath, 'utf-8')
          return JSON.parse(meta) as TreePhoto
        } catch {
          // fallback se não houver metadata
          return {
            filename,
            path: path.join(treeDir, filename),
            createdAt: new Date().toISOString(),
          } as TreePhoto
        }
      })

    return await Promise.all(photos)
  } catch {
    return []
  }
}

export async function saveTreePhoto(
  userId: string,
  treeId: string,
  file: File,
  metadata?: { lat?: number; lng?: number }
): Promise<TreePhoto> {
  const treeDir = getTreeDir(userId, treeId)
  await fs.mkdir(treeDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}.jpg`
  const filepath = path.join(treeDir, filename)

  await fs.writeFile(filepath, buffer)

  const photo: TreePhoto = {
    filename,
    path: filepath,
    createdAt: new Date().toISOString(),
    ...metadata,
  }

  // guardar metadata opcional
  await fs.writeFile(filepath + '.json', JSON.stringify(photo, null, 2))

  return photo
}
