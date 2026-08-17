class Cubo {

    constructor(lado) {
        this.lado = lado;
    }

    calcularArea() {
        return 6 * (this.lado ** 2);
    }

    calcularVolume() {
        return this.lado ** 3;
    }

    gerarPassoAPassoArea() {
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>l</strong> = aresta (o tamanho do lado do cubo)<br>
            • <strong>6</strong> = quantidade de faces do cubo<br>
            • <strong>l²</strong> = área de uma face (lado × lado)<br><br>

            <strong>Cálculo:</strong><br>
            A = 6 × l²<br>
            A = 6 × ${this.lado}²<br>
            A = 6 × ${this.lado * this.lado}<br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {
        const volume = this.calcularVolume();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>l</strong> = aresta do cubo<br>
            • <strong>l³</strong> = comprimento × largura × altura<br><br>

            <strong>Cálculo:</strong><br>
            V = l³<br>
            V = ${this.lado}³<br>
            V = ${volume}
        `;
    }
}