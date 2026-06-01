import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers'

export const getEmbeddings = () =>
  new HuggingFaceTransformersEmbeddings({
    model: 'Xenova/all-MiniLM-L6-v2',
  })