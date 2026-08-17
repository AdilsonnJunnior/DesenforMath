class Piramide {

    constructor(lados, ladoBase, altura) {
        this.lados = lados;
        this.ladoBase = ladoBase;
        this.altura = altura;
    }

    calcularPerimetroBase() {
        return this.lados * this.ladoBase;
    }

    calcularApotemaBase() {
        return this.ladoBase /
            (2 * Math.tan(Math.PI / this.lados));
    }

    calcularAreaBase() {
        const perimetro = this.calcularPerimetroBase();
        const apotema = this.calcularApotemaBase();

        return (perimetro * apotema) / 2;
    }

    calcularApotemaLateral() {
        const apotemaBase = this.calcularApotemaBase();

        return Math.sqrt(
            this.altura ** 2 +
            apotemaBase ** 2
        );
    }

    calcularArea() {
        const areaBase = this.calcularAreaBase();
        const perimetro = this.calcularPerimetroBase();
        const apotemaLateral = this.calcularApotemaLateral();

        const areaLateral =
            (perimetro * apotemaLateral) / 2;

        return areaBase + areaLateral;
    }

    calcularVolume() {
        const areaBase = this.calcularAreaBase();

        return (areaBase * this.altura) / 3;
    }

    gerarPassoAPassoArea() {

        const perimetro = this.calcularPerimetroBase();
        const apotemaBase = this.calcularApotemaBase();
        const areaBase = this.calcularAreaBase();
        const apotemaLateral = this.calcularApotemaLateral();
        const area = this.calcularArea();

        return `
            <strong>O que é cada parte?</strong><br>
            • <strong>n</strong> = quantidade de lados da base<br>
            • <strong>l</strong> = lado da base<br>
            • <strong>h</strong> = altura da pirâmide<br>
            • <strong>ap</strong> = apótema da base<br>
            • <strong>g</strong> = apótema lateral da pirâmide<br><br>

            <strong>Perímetro da base:</strong><br>
            P = n × l<br>
            P = ${this.lados} × ${this.ladoBase}<br>
            P = ${perimetro}<br><br>

            <strong>Área da base:</strong><br>
            A<sub>base</sub> = (P × ap) / 2<br>
            A<sub>base</sub> = ${areaBase}<br><br>

            <strong>Apótema lateral:</strong><br>
            g = √(h² + ap²)<br>
            g = √(${this.altura}² + ${apotemaBase}²)<br>
            g = ${apotemaLateral}<br><br>

            <strong>Área lateral:</strong><br>
            A<sub>lateral</sub> = (P × g) / 2<br><br>

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
            • <strong>A<sub>base</sub></strong> = área da base da pirâmide<br>
            • <strong>h</strong> = altura perpendicular à base<br><br>

            <strong>Cálculo:</strong><br>
            V = (A<sub>base</sub> × h) / 3<br>
            V = (${areaBase} × ${this.altura}) / 3<br>
            V = ${volume}
        `;
    }
}