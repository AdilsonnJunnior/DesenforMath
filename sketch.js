// ============================================================
// ESTADO DA APLICAÇÃO
// ============================================================

let renderizador3D;
let planificador2D;

const formaSelector = document.getElementById('forma-selector');

// Define a forma atual com base no que está selecionado no HTML no momento do carregamento
let formaAtual = formaSelector.value;
const inputsContainer = document.getElementById('inputs-dinamicos');

const calculoArea = document.getElementById('calculo-area');
const calculoVolume = document.getElementById('calculo-volume');


// ============================================================
// CONFIGURAÇÃO DOS INPUTS
// ============================================================

const configuracaoFormas = {

    cubo: {
        inputs: [
            { nome: 'lado', label: 'Lado', min: 1, step: 0.1 }
        ]
    },

    paralelepipedo: {
        inputs: [
            { nome: 'comprimento', label: 'Comprimento', min: 1, step: 0.1 },
            { nome: 'largura', label: 'Largura', min: 1, step: 0.1 },
            { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }
        ]
    },

    cilindro: {
        inputs: [
            { nome: 'raio', label: 'Raio', min: 1, step: 0.1 },
            { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }
        ]
    },

    cone: {
        inputs: [
            { nome: 'raio', label: 'Raio', min: 1, step: 0.1 },
            { nome: 'altura', label: 'Altura', min: 1, step: 0.1 },
            { nome: 'geratriz', label: 'Geratriz', min: 1, step: 0.1 }
        ]
    },

    esfera: {
        inputs: [
            { nome: 'raio', label: 'Raio', min: 1, step: 0.1 }
        ]
    },

    prisma: {
        inputs: [
            { nome: 'lados', label: 'Lados da base', min: 3, max: 8, step: 1 },
            { nome: 'ladoBase', label: 'Lado da base', min: 1, step: 0.1 },
            { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }
        ]
    },

    piramide: {
        inputs: [
            { nome: 'lados', label: 'Lados da base', min: 3, max: 8, step: 1 },
            { nome: 'ladoBase', label: 'Lado da base', min: 1, step: 0.1 },
            { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }
        ]
    }
};


// ============================================================
// CRIA OS INPUTS DA FORMA
// ============================================================

function criarInputs(forma) {

    inputsContainer.innerHTML = '';

    const configuracao = configuracaoFormas[forma];

    configuracao.inputs.forEach(config => {

        const grupo = document.createElement('div');
        const label = document.createElement('label');

        label.textContent = config.label;

        const input = document.createElement('input');

        input.type = 'number';
        input.id = `input-${config.nome}`;
        input.name = config.nome;
        input.min = config.min;

        if (config.max !== undefined) {
            input.max = config.max;
        }

        input.step = config.step;
        input.value = config.nome === 'lados' ? 5 : 10;

        input.addEventListener('keydown', event => {

            if (config.nome !== 'lados') {
                return;
            }

            const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

            if (teclasPermitidas.includes(event.key)) {
                return;
            }

            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
                return;
            }

            const valorAtual = input.value;
            const inicio = input.selectionStart;
            const fim = input.selectionEnd;

            const novoValor = valorAtual.slice(0, inicio) + event.key + valorAtual.slice(fim);

            if (Number(novoValor) > config.max) {
                event.preventDefault();
            }
        });

        input.addEventListener('input', atualizar);

        grupo.appendChild(label);
        grupo.appendChild(input);

        inputsContainer.appendChild(grupo);
    });
}


// ============================================================
// LÊ OS VALORES DOS INPUTS
// ============================================================

function obterValores() {

    const valores = {};
    const inputs = inputsContainer.querySelectorAll('input');

    inputs.forEach(input => {
        valores[input.name] = Number(input.value);
    });

    return valores;
}


// ============================================================
// CRIA A INSTÂNCIA DA FORMA
// ============================================================

function criarForma(forma, valores) {

    switch (forma) {

        case 'cubo':
            return new Cubo(valores.lado);

        case 'paralelepipedo':
            return new Paralelepipedo(valores.comprimento, valores.largura, valores.altura);

        case 'cilindro':
            return new Cilindro(valores.raio, valores.altura);

        case 'cone':
            return new Cone(valores.raio, valores.altura, valores.geratriz);

        case 'esfera':
            return new Esfera(valores.raio);

        case 'prisma':
            return new Prisma(valores.lados, valores.ladoBase, valores.altura);

        case 'piramide':
            return new Piramide(valores.lados, valores.ladoBase, valores.altura);

        default:
            return null;
    }
}


// ============================================================
// ATUALIZA TUDO
// ============================================================

function atualizar() {

    if (!formaAtual) {
        return;
    }

    const valores = obterValores();

    if (Object.values(valores).some(valor => !Number.isFinite(valor) || valor <= 0)) {
        return;
    }

    if ((formaAtual === 'prisma' || formaAtual === 'piramide') && (valores.lados < 3 || valores.lados > 8)) {
        return;
    }

    const forma = criarForma(formaAtual, valores);

    if (!forma) {
        return;
    }

    window.formaGeometrica = forma;

    calculoArea.innerHTML = forma.gerarPassoAPassoArea();
    calculoVolume.innerHTML = forma.gerarPassoAPassoVolume();

    renderizador3D.desenhar({
        tipo: formaAtual,
        ...valores
    });
}


// ============================================================
// TROCA DE FORMA
// ============================================================

formaSelector.addEventListener('change', () => {

    formaAtual = formaSelector.value;

    criarInputs(formaAtual);

    atualizar();
});


// ============================================================
// SETUP DO P5
// ============================================================

function setup() {

    renderizador3D = new Renderizador3D(this, document.getElementById('canvas-3d'));

    formaAtual = formaSelector.value;

    criarInputs(formaAtual);

    atualizar();
}


// ============================================================
// LOOP PRINCIPAL
// ============================================================

function draw() {

    if (!formaAtual) {
        return;
    }

    const valores = obterValores();

    if (Object.values(valores).some(valor => !Number.isFinite(valor) || valor <= 0)) {
        return;
    }

    renderizador3D.desenhar({
        tipo: formaAtual,
        ...valores
    });
}