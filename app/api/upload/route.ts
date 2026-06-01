import { NextRequest, NextResponse } from 'next/server'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { PineconeStore } from '@langchain/pinecone'
import { getIndex } from '@/lib/pinecone'
import { getEmbeddings } from '@/lib/embeddings'
import { extractText, getDocumentProxy } from 'unpdf'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 1. Parse PDF text using unpdf
    const buffer = await file.arrayBuffer()
    const pdf = await getDocumentProxy(new Uint8Array(buffer))
    const { text } = await extractText(pdf, { mergePages: true })

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 400 })
    }

    // 2. Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const docId = crypto.randomUUID()

    const docs = await splitter.createDocuments(
      [text],
      [{ docId, fileName: file.name }]
    )

    // 3. Embed chunks and store in Pinecone
    const embeddings = getEmbeddings()
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: getIndex(),
      namespace: docId,
    })

    return NextResponse.json({
      docId,
      fileName: file.name,
      chunks: docs.length,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}