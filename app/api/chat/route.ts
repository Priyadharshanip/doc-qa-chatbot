import { NextRequest, NextResponse } from 'next/server'
import { PineconeStore } from '@langchain/pinecone'
import { getIndex } from '@/lib/pinecone'
import { getEmbeddings } from '@/lib/embeddings'
import groq from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { question, docId } = body

    console.log('Chat request:', { question, docId })

    if (!question || !docId) {
      return NextResponse.json(
        { error: `Missing: ${!question ? 'question' : 'docId'}` },
        { status: 400 }
      )
    }

    // 1. Load Pinecone vector store for this document
    const vectorStore = await PineconeStore.fromExistingIndex(getEmbeddings(), {
      pineconeIndex: getIndex(),
      namespace: docId,
    })

    // 2. Find top 5 most relevant chunks
    const relevantDocs = await vectorStore.similaritySearch(question, 5)
    const context = relevantDocs
      .map((d, i) => `[${i + 1}] ${d.pageContent}`)
      .join('\n\n')

    // 3. Ask Groq with the context
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content: `You are a helpful document assistant. Answer questions based ONLY on the provided context.
Always cite your sources using [1], [2], etc.
If the answer is not in the context, say "I couldn't find that in the document."`,
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    })

    const answer = completion.choices[0]?.message?.content || 'No answer generated'

    return NextResponse.json({ answer, sources: relevantDocs.length })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}