class Cone {

    constructor(raio, altura, geratriz) {
        this.raio = raio;
        this.altura = altura;
        this.geratriz = geratriz;
    }

    calcularArea() {
        return Math.PI * this.raio * (this.raio + this.geratriz);
    }

    calcularVolume() {
        return (Math.PI * (this.raio ** 2) * this.altura) / 3;
    }

    gerarPassoAPassoArea() {
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da base do cone<br>
            • <strong>g</strong> = geratriz do cone<br>
            • <strong>πr²</strong> = área da base circular<br>
            • <strong>πrg</strong> = área da superfície lateral<br><br>

            <strong>Cálculo:</strong><br>
            A = πr² + πrg<br>
            A = πr(r + g)<br>
            A = π(${this.raio})(${this.raio} + ${this.geratriz})<br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {
        const volume = this.calcularVolume();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da base do cone<br>
            • <strong>h</strong> = altura perpendicular à base<br>
            • <strong>πr²</strong> = área da base circular<br><br>

            <strong>Cálculo:</strong><br>
            V = (πr²h) / 3<br>
            V = (π(${this.raio})²(${this.altura})) / 3<br>
            V = ${volume}
        `;
    }
}