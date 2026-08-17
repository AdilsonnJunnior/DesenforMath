class Planificador2D {

    constructor(p, container) {
        this.p = p;
        this.container = container;

        this.canvas = p.createCanvas(
            container.clientWidth,
            container.clientHeight
        );

        this.canvas.parent(container);
    }

    desenhar(forma) {

        const p = this.p;

        p.background(238);

        if (forma.tipo !== 'cubo') {
            return;
        }

        const lado = forma.lado;
        const escala = Math.min(
            (p.width * 0.7) / (lado * 4),
            (p.height * 0.7) / (lado * 3)
        );

        const tamanho = lado * escala;

        const x = (p.width - tamanho * 4) / 2;
        const y = (p.height - tamanho * 3) / 2;

        p.stroke(40);
        p.strokeWeight(2);
        p.fill(210, 220, 235);

        // Face central
        p.rect(
            x + tamanho,
            y + tamanho,
            tamanho,
            tamanho
        );

        // Face superior
        p.rect(
            x + tamanho,
            y,
            tamanho,
            tamanho
        );

        // Face inferior
        p.rect(
            x + tamanho,
            y + tamanho * 2,
            tamanho,
            tamanho
        );

        // Face esquerda
        p.rect(
            x,
            y + tamanho,
            tamanho,
            tamanho
        );

        // Face direita
        p.rect(
            x + tamanho * 2,
            y + tamanho,
            tamanho,
            tamanho
        );

        // Sexta face
        p.rect(
            x + tamanho * 3,
            y + tamanho,
            tamanho,
            tamanho
        );
    }
}