class Prisma {

    constructor(lados, ladoBase, altura) {
        this.lados = lados;
        this.ladoBase = ladoBase;
        this.altura = altura;
    }

    calcularArea() {
        const perimetroBase = this.lados * this.ladoBase;

        const areaBase = this.calcularAreaBase();

        const areaLateral = perimetroBase * this.altura;

        return (2 * areaBase) + areaLateral;
    }

    calcularVolume() {
        const areaBase = this.calcularAreaBase();

        return areaBase * this.altura;
    }

    calcularAreaBase() {
        // Área de um polígono regular:
        // A = (P × ap) / 2

        const perimetro = this.lados * this.ladoBase;

        const apotema =
            this.ladoBase /
            (2 * Math.tan(Math.PI / this.lados));

        return (perimetro * apotema) / 2;
    }

    calcularApotema() {
        return this.ladoBase /
            (2 * Math.tan(Math.PI / this.lados));
    }

    gerarPassoAPassoArea() {

        const area = this.calcularArea();
        const areaBase = this.calcularAreaBase();
        const apotema = this.calcularApotema();
        const perimetro = this.lados * this.ladoBase;

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>n</strong> = quantidade de lados da base<br>
            • <strong>l</strong> = lado da base<br>
            • <strong>h</strong> = altura do prisma<br>
            • <strong>ap</strong> = apótema da base<br>
            • <strong>P</strong> = perímetro da base<br><br>

            <strong>Cálculo da base:</strong><br>
            P = n × l<br>
            P = ${this.lados} × ${this.ladoBase}<br>
            P = ${perimetro}<br><br>

            A<sub>base</sub> = (P × ap) / 2<br>
            A<sub>base</sub> = ${areaBase}<br><br>

            <strong>Área lateral:</strong><br>
            A<sub>lateral</sub> = P × h<br>
            A<sub>lateral</sub> = ${perimetro} × ${this.altura}<br><br>

            <strong>Área total:</strong><br>
            A = 2 × A<sub>base</sub> + A<sub>lateral</sub><br>
            A = ${area}
        `;
    }

    gerarPassoAPassoVolume() {

        const volume = this.calcularVolume();
        const areaBase = this.calcularAreaBase();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>A<sub>base</sub></strong> = área da base do prisma<br>
            • <strong>h</strong> = altura do prisma<br><br>

            <strong>Cálculo:</strong><br>
            V = A<sub>base</sub> × h<br>
            V = ${areaBase} × ${this.altura}<br>
            V = ${volume}
        `;
    }
}