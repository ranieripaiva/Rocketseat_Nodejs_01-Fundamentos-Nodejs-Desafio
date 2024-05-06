export async function json(req, res ){ 

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  // transforma todas as respostas de requisições em json
  res.setHeader('Content-type', 'application/json')
}