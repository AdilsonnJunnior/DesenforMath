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
            p.stroke(50, 180, 80);
            p.stroke(50, 180, 80);
            p.strokeWeight(3);

            p.line(cx, cy1, cx, y + d);
            p.line(cx, cy2, cx, y + d + h);

            p.noStroke();
            p.fill(50, 180, 80);
            p.textSize(16);

            p.text('r', cx + 4, cy1 + d / 10);
            p.text('r', cx + 4, cy2 - d / 10);
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

} else if (tipo === 'piramide') {
    const lados = forma.lados;
    const ladoBase = forma.ladoBase;
    const altura = forma.altura;
    const apotemaBase = ladoBase / (2 * Math.tan(Math.PI / lados));
    const apotemaLateral = Math.sqrt(altura ** 2 + apotemaBase ** 2);
    const area3D = p.width * 0.4;
    const centro3DX = area3D / 2;
    const centro3DY = p.height / 2;
    const raio3D = Math.min(area3D * 0.3, p.height * 0.3);
    const altura3D = Math.min(p.height * 0.3, raio3D * 1.6);
    const base3D = [];

    for (let i = 0; i < lados; i++) {
        const angulo = -Math.PI / 2 + i * (2 * Math.PI / lados);
        base3D.push({ x: centro3DX + Math.cos(angulo) * raio3D, y: centro3DY + Math.sin(angulo) * raio3D * 0.45 });
    }

    const vertice3D = { x: centro3DX, y: centro3DY - altura3D };
    let indiceFrente = 0;
    let maiorY = -Infinity;

    for (let i = 0; i < lados; i++) {
        const atual = base3D[i];
        const proximo = base3D[(i + 1) % lados];
        const meioY = (atual.y + proximo.y) / 2;

        if (meioY > maiorY) {
            maiorY = meioY;
            indiceFrente = i;
        }
    }

    p.fill(225);
    p.stroke(220, 50, 50);
    p.strokeWeight(2);
    p.beginShape();

    for (const ponto of base3D) p.vertex(ponto.x, ponto.y);

    p.endShape(p.CLOSE);

    for (let i = 0; i < lados; i++) {
        if (i === indiceFrente) continue;

        const atual = base3D[i];
        const proximo = base3D[(i + 1) % lados];

        p.fill(225);
        p.stroke(50, 100, 220);
        p.strokeWeight(2);
        p.beginShape();
        p.vertex(vertice3D.x, vertice3D.y);
        p.vertex(atual.x, atual.y);
        p.vertex(proximo.x, proximo.y);
        p.endShape(p.CLOSE);
    }

    p.noFill();
    p.stroke(220, 50, 50);
    p.strokeWeight(2);

    for (let i = 0; i < lados; i++) {
        const atual = base3D[i];
        const proximo = base3D[(i + 1) % lados];
        p.line(atual.x, atual.y, proximo.x, proximo.y);
    }

    p.stroke(50, 100, 220);

    for (let i = 0; i < lados; i++) {
        const atual = base3D[i];
        p.line(vertice3D.x, vertice3D.y, atual.x, atual.y);
    }

    const meioFrente = { x: (base3D[indiceFrente].x + base3D[(indiceFrente + 1) % lados].x) / 2, y: (base3D[indiceFrente].y + base3D[(indiceFrente + 1) % lados].y) / 2 };

    p.stroke(0);
    p.drawingContext.setLineDash([6, 5]);
    p.line(vertice3D.x, vertice3D.y, centro3DX, centro3DY);
    p.drawingContext.setLineDash([]);
    p.noStroke();
    p.fill(0);
    p.circle(centro3DX, centro3DY, 6);
    p.textSize(16);
    p.text('h', centro3DX + 8, (vertice3D.y + centro3DY) / 2);

    const areaX = p.width * 0.4;
    const areaLargura = p.width * 0.6;
    const centroX = areaX + areaLargura / 2;
    const centroY = p.height * 0.55;
    const raioBase = ladoBase / (2 * Math.sin(Math.PI / lados));

    const escala = Math.min((areaLargura * 0.3) / (raioBase * 2), (p.height * 0.3) / (raioBase * 2));
    const raio = raioBase * escala;
    const apotema = apotemaLateral * escala;
    const base = [];

    for (let i = 0; i < lados; i++) {
        const angulo = -Math.PI / 2 + i * (2 * Math.PI / lados);
        base.push({ x: centroX + Math.cos(angulo) * raio, y: centroY + Math.sin(angulo) * raio });
    }

    p.fill(230);
    p.stroke(220, 50, 50);
    p.strokeWeight(2);
    p.beginShape();

    for (const ponto of base) p.vertex(ponto.x, ponto.y);

    p.endShape(p.CLOSE);

    for (let i = 0; i < lados; i++) {
        const atual = base[i];
        const proximo = base[(i + 1) % lados];
        const dx = proximo.x - atual.x;
        const dy = proximo.y - atual.y;
        const comprimento = Math.sqrt(dx * dx + dy * dy);
        const normalX = -dy / comprimento;
        const normalY = dx / comprimento;
        const meioX = (atual.x + proximo.x) / 2;
        const meioY = (atual.y + proximo.y) / 2;
        const paraCentroX = centroX - meioX;
        const paraCentroY = centroY - meioY;
        const ladoNormal = normalX * paraCentroX + normalY * paraCentroY;
        const direcao = ladoNormal < 0 ? 1 : -1;
        const vertice = { x: meioX + normalX * apotema * direcao, y: meioY + normalY * apotema * direcao };

        p.fill(210, 220, 235);
        p.stroke(50, 100, 220);
        p.strokeWeight(2);
        p.beginShape();
        p.vertex(atual.x, atual.y);
        p.vertex(proximo.x, proximo.y);
        p.vertex(vertice.x, vertice.y);
        p.endShape(p.CLOSE);
        p.stroke(220, 50, 50);
        p.line(atual.x, atual.y, proximo.x, proximo.y);
        p.stroke(50, 100, 220);
        p.line(atual.x, atual.y, vertice.x, vertice.y);
        p.line(proximo.x, proximo.y, vertice.x, vertice.y);
        const indiceApotemaBase = 0;
        const pontoMedioBase = { x: (base[indiceApotemaBase].x + base[(indiceApotemaBase + 1) % lados].x) / 2, y: (base[indiceApotemaBase].y + base[(indiceApotemaBase + 1) % lados].y) / 2 };

        p.stroke(50, 180, 80);
        p.strokeWeight(2);
        p.line(centroX, centroY, pontoMedioBase.x, pontoMedioBase.y);

        p.noStroke();
        p.fill(50, 180, 80);
        p.textSize(16);
        p.text('aᵦ', centroX-8, (centroY + pontoMedioBase.y) / 2);

        const indiceApotemaLateral = 2;
        const atualAp = base[indiceApotemaLateral];
        const proximoAp = base[(indiceApotemaLateral + 1) % lados];

        const dxAp = proximoAp.x - atualAp.x;
        const dyAp = proximoAp.y - atualAp.y;
        const comprimentoAp = Math.sqrt(dxAp * dxAp + dyAp * dyAp);

        const normalXAp = -dyAp / comprimentoAp;
        const normalYAp = dxAp / comprimentoAp;

        const meioXAp = (atualAp.x + proximoAp.x) / 2;
        const meioYAp = (atualAp.y + proximoAp.y) / 2;

        const paraCentroXAp = centroX - meioXAp;
        const paraCentroYAp = centroY - meioYAp;
        const ladoNormalAp = normalXAp * paraCentroXAp + normalYAp * paraCentroYAp;
        const direcaoAp = ladoNormalAp < 0 ? 1 : -1;

        const verticeAp = { x: meioXAp + normalXAp * apotema * direcaoAp, y: meioYAp + normalYAp * apotema * direcaoAp };

        p.stroke(50, 180, 80);
        p.line(verticeAp.x, verticeAp.y, meioXAp, meioYAp);

        p.noStroke();
        p.fill(50, 180, 80);
        p.text('aₗ', (verticeAp.x + meioXAp) / 2 + 8, (verticeAp.y + meioYAp) / 2);
    }
}else if (tipo === 'prisma') {
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


        } else if (tipo === 'cone') {
            const raio = forma.raio;
            const altura = forma.altura;
            const geratriz = forma.geratriz;

            const area3D = p.width * 0.4;
            const centro3DX = area3D / 2;
            const centro3DY = p.height / 2;
            const escala3D = Math.min((area3D * 0.3) / (raio * 2), (p.height * 0.3) / (altura + raio * 2));
            
            const raio3D = raio * escala3D;
            const altura3D = altura * escala3D;
            const vertice3D = { x: centro3DX, y: centro3DY - altura3D };
            const centroBase3D = { x: centro3DX, y: centro3DY };

            p.noFill();
            p.stroke(220, 50, 50);
            p.strokeWeight(2);
            p.ellipse(centroBase3D.x, centroBase3D.y, raio3D * 2, raio3D * 0.9);

            p.stroke(50, 100, 220);
            p.line(vertice3D.x, vertice3D.y, centroBase3D.x - raio3D, centroBase3D.y);
            p.line(vertice3D.x, vertice3D.y, centroBase3D.x + raio3D, centroBase3D.y);

            p.stroke(0);
            p.drawingContext.setLineDash([6, 5]);
            p.line(vertice3D.x, vertice3D.y, centroBase3D.x, centroBase3D.y);
            p.drawingContext.setLineDash([]);

            p.noStroke();
            p.fill(0);
            p.textSize(16);
            p.text('h', centro3DX + 8, (vertice3D.y + centro3DY) / 2);

            p.stroke(50, 180, 80);
            p.line(centroBase3D.x, centroBase3D.y, centroBase3D.x + raio3D, centroBase3D.y);

            p.noStroke();
            p.fill(50, 180, 80);
            p.text('r', centroBase3D.x + raio3D / 2 - 4, centroBase3D.y - 8);

            const areaX = p.width * 0.4;
            const areaLargura = p.width * 0.6;
            const centroX = areaX + areaLargura / 2;
            const anguloSetor = (2 * Math.PI * raio) / geratriz;
            const larguraSetor = 2 * geratriz * Math.sin(anguloSetor / 2);
            //const escala = Math.min((areaLargura * 0.3) / Math.max(larguraSetor, 2 * raio), (p.height * 0.3) / (geratriz + 2 * raio));
            const escala = Math.min((areaLargura * 0.4) / Math.max(larguraSetor, 2 * raio), (p.height * 0.4) / (geratriz + 2 * raio));
            const g = geratriz * escala;
            const r = raio * escala;
            //const centroY = (p.height - (g + 2 * r)) / 2;
            const centroY = p.height * 0.55 - (g + 2 * r) / 2;
            const inicio = Math.PI / 2 - anguloSetor / 2;
            const fim = Math.PI / 2 + anguloSetor / 2;

            p.fill(230);
            p.stroke(220, 50, 50);
            p.strokeWeight(2);
            p.beginShape();
            p.vertex(centroX, centroY);
            for (let i = 0; i <= 60; i++) {
                const angulo = inicio + (fim - inicio) * (i / 60);
                p.vertex(centroX + Math.cos(angulo) * g, centroY + Math.sin(angulo) * g);
            }
            p.endShape(p.CLOSE);

            p.stroke(50, 100, 220);
            p.line(centroX, centroY, centroX + Math.cos(inicio) * g, centroY + Math.sin(inicio) * g);
            p.line(centroX, centroY, centroX + Math.cos(fim) * g, centroY + Math.sin(fim) * g);

            const pontoGeratrizX = centroX;
            const pontoGeratrizY = centroY + g;

            p.stroke(50, 180, 80);
            p.line(centroX, centroY, pontoGeratrizX, pontoGeratrizY);

            p.noStroke();
            p.fill(50, 180, 80);
            p.text('g', centroX + 8, centroY + g / 2);

            const baseCentroX = centroX;
            const baseCentroY = centroY + g + r;

            p.fill(230);
            p.stroke(220, 50, 50);
            p.circle(baseCentroX, baseCentroY, r * 2);

            p.stroke(50, 180, 80);
            p.line(baseCentroX, baseCentroY, baseCentroX + r, baseCentroY);

            p.noStroke();
            p.fill(50, 180, 80);
            p.text('r', baseCentroX + r / 2 - 4, baseCentroY - 8);
        }
    }
}
