class Paralelepipedo {

    constructor(comprimento, largura, altura) {
        this.comprimento = comprimento;
        this.largura = largura;
        this.altura = altura;
    }

    calcularArea() {
        return 2 * (
            this.comprimento * this.largura +
            this.comprimento * this.altura +
            this.largura * this.altura
        );
    }

    calcularVolume() {
        return (
            this.comprimento *
            this.largura *
            this.altura
        );
    }

    gerarPassoAPassoArea() {
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>c</strong> = comprimento<br>
            • <strong>l</strong> = largura<br>
            • <strong>h</strong> = altura<br>
            • Existem 3 pares de faces iguais<br><br>

            <strong>Cálculo:</strong><br>
            A = 2(cl + ch + lh)<br>
            A = 2((${this.comprimento})(${this.largura}) + (${this.comprimento})(${this.altura}) + (${this.largura})(${this.altura}))<br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {
        const volume = this.calcularVolume();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>c</strong> = comprimento<br>
            • <strong>l</strong> = largura<br>
            • <strong>h</strong> = altura<br><br>

            <strong>Cálculo:</strong><br>
            V = c × l × h<br>
            V = ${this.comprimento} × ${this.largura} × ${this.altura}<br>
            V = ${volume}
        `;
    }
}