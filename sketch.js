// ============================================================
// ESTADO DA APLICAÇÃO
// ============================================================

let renderizador3D;
let planificador2D;
let formaAtual = 'cubo';

const formaSelector = document.getElementById('forma-selector');
const inputsContainer = document.getElementById('inputs-dinamicos');
const calculoArea = document.getElementById('calculo-area');
const calculoVolume = document.getElementById('calculo-volume');

const configuracaoFormas = {
    cubo: { inputs: [{ nome: 'lado', label: 'Lado', min: 1, step: 0.1 }] },
    paralelepipedo: { inputs: [{ nome: 'comprimento', label: 'Comprimento', min: 1, step: 0.1 }, { nome: 'largura', label: 'Largura', min: 1, step: 0.1 }, { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }] },
    cilindro: { inputs: [{ nome: 'raio', label: 'Raio', min: 1, step: 0.1 }, { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }] },
    cone: { inputs: [{ nome: 'raio', label: 'Raio', min: 1, step: 0.1 }, { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }, { nome: 'geratriz', label: 'Geratriz', min: 1, step: 0.1 }] },
    esfera: { inputs: [{ nome: 'raio', label: 'Raio', min: 1, step: 0.1 }] },
    prisma: { inputs: [{ nome: 'lados', label: 'Lados da base', min: 3, max: 8, step: 1 }, { nome: 'ladoBase', label: 'Lado da base', min: 1, step: 0.1 }, { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }] },
    piramide: { inputs: [{ nome: 'lados', label: 'Lados da base', min: 3, max: 8, step: 1 }, { nome: 'ladoBase', label: 'Lado da base', min: 1, step: 0.1 }, { nome: 'altura', label: 'Altura', min: 1, step: 0.1 }] }
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
            input.addEventListener('keydown', e => e.preventDefault());
            input.addEventListener('paste', e => e.preventDefault());
        }

        input.addEventListener('input', atualizarTudo);
        grupo.appendChild(label);
        grupo.appendChild(input);
        inputsContainer.appendChild(grupo);
    });
}

function obterValores() {
    const valores = {};
    const inputs = inputsContainer.querySelectorAll('input');
    inputs.forEach(input => {
        valores[input.name] = Number(input.value);
    });
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
    const valores = obterValores();
    if (Object.values(valores).some(v => !Number.isFinite(v) || v <= 0)) return;

    const forma = criarForma(formaAtual, valores);
    if (!forma) return;

    window.formaGeometrica = forma;
    calculoArea.innerHTML = forma.gerarPassoAPassoArea();
    calculoVolume.innerHTML = forma.gerarPassoAPassoVolume();
}

formaSelector.addEventListener('change', () => {
    formaAtual = formaSelector.value;
    criarInputs(formaAtual);
    atualizarTudo();
});

// Inicialização das instâncias isoladas do p5.js
document.addEventListener('DOMContentLoaded', () => {
    formaAtual = formaSelector.value;
    criarInputs(formaAtual);
    atualizarTudo();

    // Instância 3D (WEBGL)
    new p5((p) => {
        p.setup = () => {
            const container = document.getElementById('canvas-3d');
            const c = p.createCanvas(container.clientWidth || 400, container.clientHeight || 300, p.WEBGL);
            c.parent(container);
            renderizador3D = new Renderizador3D(p, container);
        };
        p.draw = () => {
            if (!formaAtual) return;
            const valores = obterValores();
            if (Object.values(valores).some(v => !Number.isFinite(v) || v <= 0)) return;
            renderizador3D.desenhar({ tipo: formaAtual, ...valores });
        };
    });

    // Instância 2D (Tradicional)
    new p5((p) => {
        p.setup = () => {
            const container = document.getElementById('canvas-2d');
            const c = p.createCanvas(container.clientWidth || 400, container.clientHeight || 300);
            c.parent(container);
            planificador2D = new Planificador2D(p, container);
        };
        p.draw = () => {
            if (!formaAtual) return;
            const valores = obterValores();
            if (Object.values(valores).some(v => !Number.isFinite(v) || v <= 0)) return;
            planificador2D.desenhar({ tipo: formaAtual, ...valores });
        };
    });
});