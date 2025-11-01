import express from "express"
import { PrismaClient } from "@prisma/client";
import { log } from "console";


const port = 3000;
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get("/movies", async (_, res) => {
    try {
        const movies = await prisma.movie.findMany({
            orderBy: {
                title: 'asc'
            },
            include: {
                genres: true,
                languages: true
            }
        })
        return res.status(200).json(movies)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ "error": "Erro ao buscar filmes" })
    }
})


app.post("/movies", async (req, res) => {

    const { title, genre_id, language_id, oscar_count, release_date } = req.body


    try {

        const movieWithSameTitle = await prisma.movie.findFirst({
            where: { title: { equals: title, mode: "insensitive" } },
        })
        if (movieWithSameTitle) {
            return res.status(409).send({ "error": "Já existe um filme cadastrado com esse titulo" })
        }

        await prisma.movie.create({
            data: {
                title,
                genre_id,
                language_id,
                oscar_count,
                release_date: new Date(release_date)
            }
        })
        res.status(201).send({ "message": "Filme cadastrado com sucesso" })

    } catch (e) {
        console.error(e)
        res.status(500).send({ "error": "Erro ao cadastrar filme" })
    }

})

app.put("/movies/:id", async (req, res) => {
    const id = Number(req.params.id);
try{
const movie = await prisma.movie.findUnique({
    where: { id }
}) 
if (!movie){
    return res.status(404).send({ "error": "Filme nao encontrado" })
}

    const data = { ...req.body };
    data.release_date = data.release_date ? new Date(data.release_date) : undefined;
   
        await prisma.movie.update({
            where: { id  },
            data: {
                title: data.title,
                genre_id: data.genre_id,    
                language_id: data.language_id,
                oscar_count: data.oscar_count,
                release_date: data.release_date
            } 
        });
    } catch (error) {
        return res.status(500).send({ "error": "Erro ao atualizar filme" })
    }
        res.status(200).send();
    
})

app.delete("/movies/:id", async (req, res) => {
    const id = Number(req.params.id);
    try{
    const movie = await prisma.movie.findUnique({
        where: { id }    })
        if (!movie){
            return res.status(404).send({ "error": "Filme nao encontrado" })
        }
    await prisma.movie.delete({
        where: {id}
    })
    } catch (error) {
        return res.status(500).send({ "error": "Erro ao deletar filme" })
    }
    res.status(204).send()
})

app.get("/movies/:genreName", async(req, res) => {
    //receber o nome do genero pelos parametros da rota
console.log(req.params.genreName);

    //filtrar os filmes do banco pelo genero 
try{
    const moviesFilteredByGenreName = await prisma.movie.findMany({
        include: {
            genres: true,
            languages: true
        },
        where: {
            genres: {
                name: {
                    equals: req.params.genreName,
                    mode: "insensitive"
                }
            }
        }
    })
   //retornar os filmes filtrados na resposta da rota
    res.status(200).send(moviesFilteredByGenreName);
} catch (error) {
    return res.status(500).send({ "error": "Erro ao filtrar o filme" })
}
 
})

app.listen(port, () => {
    console.log(`Servidor execução na porta ${port}`)
})

