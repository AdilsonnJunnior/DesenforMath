class Esfera {

    constructor(raio) {
        this.raio = raio;
    }

    calcularArea() {
        return 4 * Math.PI * (this.raio ** 2);
    }

    calcularVolume() {
        return (4 * Math.PI * (this.raio ** 3)) / 3;
    }

    gerarPassoAPassoArea() {
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da esfera<br>
            • <strong>4πr²</strong> = fórmula da área da superfície da esfera<br><br>

            <strong>Cálculo:</strong><br>
            A = 4πr²<br>
            A = 4π(${this.raio})²<br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {
        const volume = this.calcularVolume();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da esfera<br>
            • <strong>4/3</strong> = constante da fórmula do volume da esfera<br><br>

            <strong>Cálculo:</strong><br>
            V = (4πr³) / 3<br>
            V = (4π(${this.raio})³) / 3<br>
            V = ${volume}
        `;
    }
}