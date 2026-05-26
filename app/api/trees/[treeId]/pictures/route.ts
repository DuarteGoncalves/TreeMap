import { NextRequest } from 'next/server'
import { saveTreePhoto, getTreePhotos } from '@/lib/storage' // ajusta o path se necessário

// 📸 Upload de foto
export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; treeId: string } }
) {
  try {
    const { userId, treeId } = await params

    const data = await req.formData()
    const file = data.get('file') as File | null

    if (!file) {
      return Response.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    const lat = data.get('lat')
    const lng = data.get('lng')

    const photo = await saveTreePhoto(userId, treeId, file, {
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
    })

    return Response.json({
      success: true,
      photo,
    })
  } catch (err) {
    console.error('Upload error:', err)

    return Response.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    )
  }
}

// 📥 Listar fotos da árvore
export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string; treeId: string } }
) {
  try {
    const { userId, treeId } = await params

    const photos = await getTreePhotos(userId, treeId)

    return Response.json({
      success: true,
      photos,
    })
  } catch (err) {
    console.error('Get photos error:', err)

    return Response.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}
