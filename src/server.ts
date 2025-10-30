import express from "express"
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express()
const prisma = new PrismaClient

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
            where: { title: {equals: title, mode: "insensitive"} },      
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


app.listen(port, () => {
    console.log(`Servidor execução na porta ${port}`)
})


