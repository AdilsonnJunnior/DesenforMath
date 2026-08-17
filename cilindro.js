class Cilindro {

    constructor(raio, altura) {
        this.raio = raio;
        this.altura = altura;
    }

    calcularArea() {
        return 2 * Math.PI * this.raio * (this.raio + this.altura);
    }

    calcularVolume() {
        return Math.PI * (this.raio ** 2) * this.altura;
    }

    gerarPassoAPassoArea() {
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da base do cilindro<br>
            • <strong>h</strong> = altura do cilindro<br>
            • <strong>2πr²</strong> = área das duas bases circulares<br>
            • <strong>2πrh</strong> = área da superfície lateral<br><br>

            <strong>Cálculo:</strong><br>
            A = 2πr² + 2πrh<br>
            A = 2π(${this.raio})² + 2π(${this.raio})(${this.altura})<br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {
        const volume = this.calcularVolume();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da base do cilindro<br>
            • <strong>h</strong> = altura do cilindro<br>
            • <strong>πr²</strong> = área da base circular<br><br>

            <strong>Cálculo:</strong><br>
            V = πr²h<br>
            V = π(${this.raio})²(${this.altura})<br>
            V = ${volume}
        `;
    }
}