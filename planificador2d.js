class Planificador2D {
    constructor(p, container) {
        this.p = p;
        this.container = container;
        const largura = container.clientWidth || 400;
        const altura = container.clientHeight || 300;
        this.canvas = p.createCanvas(largura, altura);
        this.canvas.parent(container);
    }

    desenharAresta(x1, y1, x2, y2, tipo) {
        const p = this.p;
        p.noFill();
        p.stroke(tipo === 'base' ? p.color(220, 50, 50) : p.color(50, 100, 220));
        p.strokeWeight(3);
        p.line(x1, y1, x2, y2);
    }

    desenhar(forma) {
        const p = this.p;
        p.background(238);
        p.noStroke();
        p.fill(210, 220, 235);

        const tipo = forma?.tipo;

        if (tipo === 'cubo') {
    const lado = forma.lado;
    const escala = Math.min((p.width * 0.7) / (4 * lado), (p.height * 0.7) / (3 * lado));
    const s = lado * escala;
    const x = (p.width - s * 4) / 2;
    const y = (p.height - s * 3) / 2;

    const faces = [
        [x + s, y, s, s],
        [x, y + s, s, s],
        [x + s, y + s, s, s],
        [x + s * 2, y + s, s, s],
        [x + s * 3, y + s, s, s],
        [x + s, y + s * 2, s, s]
    ];

    p.noStroke();
    p.fill(210, 220, 235);
    faces.forEach(f => p.rect(...f));

    p.noFill();
    p.stroke(50, 100, 220);
    p.strokeWeight(3);
    faces.forEach(f => p.rect(...f));

} else if (tipo === 'paralelepipedo') {
    const comprimento = forma.comprimento;
    const largura = forma.largura;
    const altura = forma.altura;
    const escala = Math.min((p.width * 0.7) / (2 * comprimento + 2 * largura), (p.height * 0.7) / (2 * comprimento + altura));

    const c = comprimento * escala;
    const l = largura * escala;
    const a = altura * escala;
    const totalLargura = l + c + l + c;
    const totalAltura = c + a + c;
    const x = (p.width - totalLargura) / 2;
    const y = (p.height - totalAltura) / 2;

    const faces = [
        [x + l, y, c, c],
        [x, y + c, l, a],
        [x + l, y + c, c, a],
        [x + l + c, y + c, l, a],
        [x + l + c + l, y + c, c, a],
        [x + l, y + c + a, c, c]
    ];

    p.noStroke();
    p.fill(210, 220, 235);
    faces.forEach(f => p.rect(...f));

    p.noFill();
    p.stroke(50, 100, 220);
    p.strokeWeight(3);
    faces.forEach(f => p.rect(...f));

        } else if (tipo === 'cilindro') {
            const raio = forma.raio;
            const altura = forma.altura;
            const diametro = raio * 2;
            const circunferencia = 2 * Math.PI * raio;
            const escala = Math.min((p.width * 0.7) / circunferencia, (p.height * 0.7) / (diametro * 2 + altura));

            const d = diametro * escala;
            const largura = circunferencia * escala;
            const h = altura * escala;
            const x = (p.width - largura) / 2;
            const y = (p.height - (d + h + d)) / 2;
            const cx = x + largura / 2;
            const cy1 = y + d / 2;
            const cy2 = y + d + h + d / 2;

            p.circle(cx, cy1, d);
            p.rect(x, y + d, largura, h);
            p.circle(cx, cy2, d);

            p.noFill();
            p.stroke(220, 50, 50);
            p.strokeWeight(3);
            p.circle(cx, cy1, d);
            p.circle(cx, cy2, d);
            p.line(x, y + d, x + largura, y + d);
            p.line(x, y + d + h, x + largura, y + d + h);

            p.stroke(50, 100, 220);
            p.line(x, y + d, x, y + d + h);
            p.line(x + largura, y + d, x + largura, y + d + h);

        } else if (tipo === 'prisma') {
            const lados = forma.lados;
            const ladoBase = forma.ladoBase;
            const altura = forma.altura;
            const raio = ladoBase / (2 * Math.sin(Math.PI / lados));
            const perimetro = lados * ladoBase;
            const alturaBase = raio * 2;
            const escala = Math.min((p.width * 0.7) / perimetro, (p.height * 0.7) / (alturaBase * 2 + altura));

            const lado = ladoBase * escala;
            const h = altura * escala;
            const r = raio * escala;
            const hb = alturaBase * escala;
            const largura = perimetro * escala;
            const x = (p.width - largura) / 2;
            const y = (p.height - (hb * 2 + h)) / 2;

            for (let i = 0; i < lados; i++) {
                p.rect(x + i * lado, y + hb, lado, h);
            }

            const centroX = p.width / 2;
            const centroYSuperior = y + hb / 2;
            const centroYInferior = y + hb + h + hb / 2;
            const superior = [];
            const inferior = [];

            for (let i = 0; i < lados; i++) {
                const a1 = -Math.PI / 2 + i * (2 * Math.PI / lados);
                const a2 = Math.PI / 2 + i * (2 * Math.PI / lados);
                superior.push({ x: centroX + Math.cos(a1) * r, y: centroYSuperior + Math.sin(a1) * r });
                inferior.push({ x: centroX + Math.cos(a2) * r, y: centroYInferior + Math.sin(a2) * r });
            }

            p.beginShape();
            superior.forEach(v => p.vertex(v.x, v.y));
            p.endShape(p.CLOSE);

            p.beginShape();
            inferior.forEach(v => p.vertex(v.x, v.y));
            p.endShape(p.CLOSE);

            for (let i = 0; i < lados; i++) {
                const j = (i + 1) % lados;
                this.desenharAresta(superior[i].x, superior[i].y, superior[j].x, superior[j].y, 'base');
                this.desenharAresta(inferior[i].x, inferior[i].y, inferior[j].x, inferior[j].y, 'base');
            }

            for (let i = 1; i < lados; i++) {
                this.desenharAresta(x + i * lado, y + hb, x + i * lado, y + hb + h, 'dobra');
            }

            for (let i = 0; i < lados; i++) {
                this.desenharAresta(x + i * lado, y + hb, x + (i + 1) * lado, y + hb, 'base');
                this.desenharAresta(x + i * lado, y + hb + h, x + (i + 1) * lado, y + hb + h, 'base');
            }

            this.desenharAresta(x, y + hb, x, y + hb + h, 'dobra');
            this.desenharAresta(x + largura, y + hb, x + largura, y + hb + h, 'dobra');
        }
    }
}
