let renderizador3D;
let planificador2D;
let formaAtual = 'cubo';
let modoPiramide = 'altura';

const formaSelector = document.getElementById('forma-selector');
const inputsContainer = document.getElementById('inputs-dinamicos');
const calculoArea = document.getElementById('calculo-area');
const calculoVolume = document.getElementById('calculo-volume');
const titulo3D = document.getElementById('titulo-3d');
const titulo2D = document.getElementById('titulo-2d');

const configuracaoFormas = {
    cilindro: { inputs: [{ nome: 'raio', label: 'Valor do raio', min: 1, step: 1 }, { nome: 'altura', label: 'Valor da altura', min: 1, step: 1 }] },
    cone: { inputs: [{ nome: 'raio', label: 'Valor do raio', min: 1, step: 1 }, { nome: 'altura', label: 'Valor da altura', min: 1, step: 1 }, { nome: 'geratriz', label: 'Valor da geratriz', min: 1, step: 1 }] },
    cubo: { inputs: [{ nome: 'lado', label: 'Altura', min: 1, step: 1 }] },
    esfera: { inputs: [{ nome: 'raio', label: 'Valor do raio', min: 1, step: 1 }] },
    paralelepipedo: { inputs: [{ nome: 'comprimento', label: 'Valor do comprimento', min: 1, step: 1 }, { nome: 'largura', label: 'Valor da largura', min: 1, step: 1 }, { nome: 'altura', label: 'Valor da altura', min: 1, step: 1 }] },
    piramide: { inputs: [{ nome: 'lados', label: 'Quantidade de lados', min: 3, max: 8, step: 1 }, { nome: 'ladoBase', label: 'Valor do lado da base', min: 1, step: 1 }, { nome: 'altura', label: 'Valor da altura', min: 1, step: 1 }] },
    prisma: { inputs: [{ nome: 'lados', label: 'Quantidade de lados', min: 3, max: 8, step: 1 }, { nome: 'ladoBase', label: 'Valor do lado da base', min: 1, step: 1 }, { nome: 'altura', label: 'Valor da altura', min: 1, step: 1 }] }
};

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
        if (config.max !== undefined) input.max = config.max;
        input.step = config.step;
        input.value = config.nome === 'lados' ? 5 : 10;

        if (config.nome === 'lados') {
            input.addEventListener('input', () => {
                let valor = Number(input.value);
                if (!Number.isFinite(valor)) valor = 5;
                valor = Math.round(valor);
                valor = Math.max(3, Math.min(8, valor));
                input.value = valor;
                atualizarTudo();
            });
        } else {
            input.addEventListener('input', atualizarTudo);
        }

        grupo.appendChild(label);
        grupo.appendChild(input);
        inputsContainer.appendChild(grupo);
    });

    if (forma === 'piramide') {
        criarControlePiramide();
    }
}

function criarControlePiramide() {
    const grupo = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = 'Definir por';

    const select = document.createElement('select');
    select.id = 'piramide-modo';

    const opcaoAltura = document.createElement('option');
    opcaoAltura.value = 'altura';
    opcaoAltura.textContent = 'Altura';

    const opcaoApotema = document.createElement('option');
    opcaoApotema.value = 'apotema';
    opcaoApotema.textContent = 'Apótema';

    select.appendChild(opcaoAltura);
    select.appendChild(opcaoApotema);
    select.value = modoPiramide;

    select.addEventListener('change', () => {
        modoPiramide = select.value;

        const input = document.getElementById('input-altura');
        const labelInput = input.previousElementSibling;

        if (modoPiramide === 'altura') {
            labelInput.textContent = 'Valor da altura';
        } else {
            labelInput.textContent = 'Valor do apótema';
        }

        atualizarTudo();
    });

    grupo.appendChild(label);
    grupo.appendChild(select);
    inputsContainer.appendChild(grupo);
}

function obterValores() {
    const valores = {};
    const inputs = inputsContainer.querySelectorAll('input');

    inputs.forEach(input => {
        valores[input.name] = Number(input.value);
    });

    if (formaAtual === 'piramide' && modoPiramide === 'apotema') {
        const apotemaLateral = valores.altura;
        const apotemaBase = valores.ladoBase / (2 * Math.tan(Math.PI / valores.lados));

        if (apotemaLateral <= apotemaBase) {
            valores.altura = NaN;
        } else {
            valores.altura = Math.sqrt(apotemaLateral ** 2 - apotemaBase ** 2);
        }

        valores.apotema = apotemaLateral;
    }

    return valores;
}

function criarForma(forma, valores) {
    switch (forma) {
        case 'cubo': return new Cubo(valores.lado);
        case 'paralelepipedo': return new Paralelepipedo(valores.comprimento, valores.largura, valores.altura);
        case 'cilindro': return new Cilindro(valores.raio, valores.altura);
        case 'cone': return new Cone(valores.raio, valores.altura, valores.geratriz);
        case 'esfera': return new Esfera(valores.raio);
        case 'prisma': return new Prisma(valores.lados, valores.ladoBase, valores.altura);
        case 'piramide': return new Piramide(valores.lados, valores.ladoBase, valores.altura);
        default: return null;
    }
}


function atualizarTudo() {
    if (!formaAtual) return;

    const nomesFormas = { cubo: 'Cubo', paralelepipedo: 'Paralelepípedo', cilindro: 'Cilindro', cone: 'Cone', esfera: 'Esfera', prisma: 'Prisma', piramide: 'Pirâmide' };
    titulo3D.textContent = `${nomesFormas[formaAtual]} 3D`;
    titulo2D.textContent = `${nomesFormas[formaAtual]} planificado`;

    const valores = obterValores();

    if (Object.values(valores).some(valor => !Number.isFinite(valor) || valor <= 0)) return;

    const forma = criarForma(formaAtual, valores);
    if (!forma) return;

    window.formaGeometrica = forma;
    calculoArea.innerHTML = forma.gerarPassoAPassoArea();
    calculoVolume.innerHTML = forma.gerarPassoAPassoVolume();

   
}

formaSelector.addEventListener('change', () => {
    formaAtual = formaSelector.value;
    modoPiramide = 'altura';
    criarInputs(formaAtual);
    atualizarTudo();
});

document.addEventListener('DOMContentLoaded', () => {
    formaAtual = formaSelector.value;
    criarInputs(formaAtual);
    atualizarTudo();

    new p5((p) => {
        p.setup = () => {
            const container = document.getElementById('canvas-3d');
            renderizador3D = new Renderizador3D(p, container); // A classe cuida de criar o Canvas[cite: 12, 13]
        };

        p.draw = () => {
            if (!formaAtual) return;
            const valores = obterValores();
            if (Object.values(valores).some(valor => !Number.isFinite(valor) || valor <= 0)) return;
            renderizador3D.desenhar({ tipo: formaAtual, ...valores });
        };
    });

    new p5((p) => {
        p.setup = () => {
            const container = document.getElementById('canvas-2d');
            planificador2D = new Planificador2D(p, container); // A classe cuida de criar o Canvas[cite: 9, 13]
        };

        p.draw = () => {
            if (!formaAtual) return;
            const valores = obterValores();
            if (Object.values(valores).some(valor => !Number.isFinite(valor) || valor <= 0)) return;
            planificador2D.desenhar({ tipo: formaAtual, ...valores });
        };
    });
});