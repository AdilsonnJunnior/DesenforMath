class Cone {
    constructor(raio, altura, geratriz) {
        this.raio = raio;
        this.altura = altura;
        this.geratriz = geratriz;

        if (!Number.isFinite(this.geratriz) || this.geratriz <= 0) {
            this.geratriz = Math.sqrt(this.raio ** 2 + this.altura ** 2);
        }
    }

    calcularGeratriz() {
        return Math.sqrt(this.raio ** 2 + this.altura ** 2);
    }

    calcularAreaBase() {
        return Math.PI * this.raio ** 2;
    }

    calcularAreaLateral() {
        return Math.PI * this.raio * this.geratriz;
    }

    calcularArea() {
        return this.calcularAreaBase() + this.calcularAreaLateral();
    }

    calcularVolume() {
        return (this.calcularAreaBase() * this.altura) / 3;
    }

    gerarPassoAPassoArea() {
        const areaBase = this.calcularAreaBase();
        const areaLateral = this.calcularAreaLateral();
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>r</strong> = raio da base<br>
            • <strong>h</strong> = altura do cone<br>
            • <strong>g</strong> = geratriz<br><br>

            <strong>Área da base:</strong><br>
            A<sub>base</sub> = π × r²<br>
            A<sub>base</sub> = ${areaBase}<br><br>

            <strong>Área lateral:</strong><br>
            A<sub>lateral</sub> = π × r × g<br>
            A<sub>lateral</sub> = ${areaLateral}<br><br>

            <strong>Área total:</strong><br>
            A = A<sub>base</sub> + A<sub>lateral</sub><br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {
        const areaBase = this.calcularAreaBase();
        const volume = this.calcularVolume();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>A<sub>base</sub></strong> = área da base<br>
            • <strong>h</strong> = altura do cone<br><br>

            <strong>Cálculo:</strong><br>
            V = (A<sub>base</sub> × h) / 3<br>
            V = (${areaBase} × ${this.altura}) / 3<br>
            V = ${volume}
        `;
    }
}