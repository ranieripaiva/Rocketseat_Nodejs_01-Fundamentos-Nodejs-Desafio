import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from './routes.js' 
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url  } = req
  
  await json(req, res)

  /*
  if ( method === 'GET' && url === '/tasks'){
    //return res.end(JSON.stringify(tasks))
    const tasks = database.select('tasks')
    return res.end(JSON.stringify(tasks))
  }

  if ( method === 'POST' && url === '/tasks'){
    const { title, description, created_at } = req.body

    //tasks.push
    const tasks = ({
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at,
      updated_at: null   
    })

    database.insert('tasks', tasks)
    */
    const route = routes.find(route => {
      return route.method === method && route.path.test(url)
    })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)


// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
