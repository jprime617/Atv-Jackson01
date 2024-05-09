const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let livros = [];

app.get('/livros',(req, res) => {
    res.json(livros);
});

app.get('/livros/:nome', (req, res) => { 
    const { nome } = req.params; 
    const livro = livros.find(v => v.nome === nome); 
    if (livro) { 
    res.json(livro); 
    } else { 
    res.status(404).json({ message: 'livro não encontrado.' }); 
    } 
});

app.post('/livros', (req, res) => { 
    const { nome, autor, impressora, ano } = req.body; 
    const livro= { nome, autor, impressora, ano }; 
    livros.push(livro); 
    res.status(201).json({ message: 'livro cadastrado com sucesso.' });
    });

    app.put('/livros/:nome', (req, res) => { 
const { nome } = req.params; 
const { autor, impressora, ano } = req.body; 
const livro= livros.find(v => v.nome === nome); 
if (livro) { 
livro.autor = autor || livro.autor; 
livro.impressora = impressora || livro.impressora; 
livro.ano = ano || livro.ano; 
res.json({ message: 'Informações do livro atualizadas com sucesso.' });
} else {
res.status(404).json({ message: 'livro não encontrado.' }); 
} 
});

        
        app.delete('/livros/:nome', (req, res) => { 
const { nome } = req.params; 
const livroIndex = livros.findIndex(v => v.nome === nome); 
if (livroIndex !== -1) { 
livros.splice(livroIndex, 1); 
res.json({ message: 'livro excluído com sucesso.' }); 
} else { 
res.status(404).json({ message: 'livro não encontrado.' }); 
} 
});


const port = 3000; 
app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`); 
});
            
            
    
    