class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO' }, { especie: 'MACACO' }, { especie: 'MACACO' }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA' }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO' }] },
        ];

        const especificacoes = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };

        // Verifica se o animal e a quantidade são válidos
        if (!especificacoes[animal]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        // Calcula o espaço necessário
        const espacoNecessario = quantidade * especificacoes[animal].tamanho;

        // Filtra e mapeia os recintos viáveis
        const recintosViaveis = recintos.filter(recinto => {
            const especificacao = especificacoes[animal];
            const biomaRecinto = recinto.bioma;
            const biomasValidos = especificacao.bioma;
            const tamanhoTotal = recinto.tamanhoTotal;
            const espacoOcupado = recinto.animais.reduce((total, a) => total + especificacoes[a.especie].tamanho, 0);
            const biomaEhValido = Array.isArray(biomasValidos) ? biomasValidos.includes(biomaRecinto) : biomaRecinto === biomasValidos;

            // Verifica se o bioma do recinto é válido e se há espaço suficiente
            return biomaEhValido && (tamanhoTotal - espacoOcupado) >= espacoNecessario;
        }).map(recinto => {
            const tamanhoTotal = recinto.tamanhoTotal;
            const espacoOcupado = recinto.animais.reduce((total, a) => total + especificacoes[a.especie].tamanho, 0);
            const espacoLivre = tamanhoTotal - espacoOcupado - espacoNecessario;

            return {
                numero: recinto.numero,
                espacoLivre,
                espacoTotal: tamanhoTotal
            };
        });

        // Ordena os recintos viáveis pelo número do recinto
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        // Mapeia para a string esperada
        const recintosViaveisFormatados = recintosViaveis.map(recinto => 
            `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        );

        // Retorna os recintos viáveis ou uma mensagem de erro
        if (recintosViaveisFormatados.length > 0) {
            return { recintosViaveis: recintosViaveisFormatados };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo };