class Renderizador3D {

    constructor(p, container) {

        this.p = p;
        this.container = container;

        this.rotX = -0.35;
        this.rotY = 0.5;

        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.dragging = false;

        this.canvas = p.createCanvas(
            container.clientWidth,
            container.clientHeight,
            p.WEBGL
        );

        this.canvas.parent(container);

        this.configurarMouse();
    }


    // ========================================================
    // MOUSE
    // ========================================================

    configurarMouse() {

        this.canvas.mousePressed(() => {

            this.dragging = true;

            this.lastMouseX = this.p.mouseX;
            this.lastMouseY = this.p.mouseY;
        });


        this.canvas.mouseReleased(() => {

            this.dragging = false;
        });
    }


    // ========================================================
    // ESCALA VISUAL
    // ========================================================

    calcularEscala(dimensoes) {

        const p = this.p;

        const maiorDimensao =
            Math.max(...dimensoes);

        if (
            !Number.isFinite(maiorDimensao) ||
            maiorDimensao <= 0
        ) {
            return 1;
        }

        /*
         * Tamanho visual desejado.
         *
         * A forma nunca usa diretamente o valor
         * matemático como quantidade de pixels.
         */
        const tamanhoAlvo =
            Math.min(
                p.width,
                p.height
            ) * 0.65;

        return tamanhoAlvo / maiorDimensao;
    }


    // ========================================================
    // DESENHAR
    // ========================================================

    desenhar(forma) {

        const p = this.p;

        p.background(238);

        p.ambientLight(130);

        p.directionalLight(
            255,
            255,
            255,
            -0.5,
            -0.7,
            -1
        );

        this.atualizarRotacao();

        p.push();

        p.rotateX(this.rotX);
        p.rotateY(this.rotY);

        switch (forma.tipo) {

            case "cubo":
                this.desenharCubo(forma);
                break;

            case "paralelepipedo":
                this.desenharParalelepipedo(forma);
                break;

            case "cilindro":
                this.desenharCilindro(forma);
                break;

            case "cone":
                this.desenharCone(forma);
                break;

            case "esfera":
                this.desenharEsfera(forma);
                break;

            case "prisma":
                this.desenharPrisma(forma);
                break;

            case "piramide":
                this.desenharPiramide(forma);
                break;

            default:

                console.warn(
                    `Forma 3D não suportada: ${forma.tipo}`
                );
        }

        p.pop();
    }


    // ========================================================
    // ROTAÇÃO
    // ========================================================

    atualizarRotacao() {

        if (!this.dragging) {
            return;
        }

        this.rotY +=
            (this.p.mouseX - this.lastMouseX) * 0.01;

        this.rotX -=
            (this.p.mouseY - this.lastMouseY) * 0.01;

        this.lastMouseX = this.p.mouseX;
        this.lastMouseY = this.p.mouseY;
    }


    // ========================================================
    // CUBO
    // ========================================================

    desenharCubo(forma) {

        const p = this.p;

        const lado = forma.lado;

        const escala = (0.7) *
            this.calcularEscala([
                lado
            ]);

        p.fill(120, 170, 230);
        p.noStroke();

        p.box(
            lado * escala 
        );
    }


    // ========================================================
    // PARALELEPÍPEDO
    // ========================================================

    desenharParalelepipedo(forma) {

        const p = this.p;

        const largura =
            forma.largura;

        const altura =
            forma.altura;

        const comprimento =
            forma.comprimento;

        const escala = (0.7) *
            this.calcularEscala([
                largura,
                altura,
                comprimento
            ]);

        p.fill(120, 170, 230);
        p.noStroke();

        p.box(
            comprimento * escala,
            altura * escala,
            largura * escala
        );
    }


    // ========================================================
    // CILINDRO
    // ========================================================

    desenharCilindro(forma) {

        const p = this.p;

        const raio =
            forma.raio;

        const altura =
            forma.altura;

        const escala =
            this.calcularEscala([
                raio * 2,
                altura
            ]);

        p.fill(120, 170, 230);
        p.noStroke();

        p.cylinder(
            raio * escala,
            altura * escala,
            32,
            1
        );
    }


    // ========================================================
    // CONE
    // ========================================================

    desenharCone(forma) {

        const p = this.p;

        const raio =
            forma.raio;

        const altura =
            forma.altura;

        const escala =
            this.calcularEscala([
                raio * 2,
                altura
            ]);

        p.fill(120, 170, 230);
        p.noStroke();

        p.cone(
            raio * escala,
            altura * escala,
            32,
            1
        );
    }


    // ========================================================
    // ESFERA
    // ========================================================

    desenharEsfera(forma) {

        const p = this.p;

        const raio =
            forma.raio;

        const escala =
            this.calcularEscala([
                raio * 2
            ]);

        p.fill(120, 170, 230);
        p.noStroke();

        p.sphere(
            raio * escala,
            32,
            20
        );
    }


    // ========================================================
    // PRISMA
    // ========================================================

    desenharPrisma(forma) {

        const p = this.p;

        const lados =
            forma.lados;

        const raio = forma.ladoBase / (2 * Math.sin(Math.PI / forma.lados));

        const altura =
            forma.altura;

        const escala =
            this.calcularEscala([
                raio * 2,
                altura
            ]);

        const raioVisual =
            raio * escala;

        const alturaVisual =
            altura * escala;

        const vertices = [];


        // ----------------------------------------------------
        // VÉRTICES DA BASE
        // ----------------------------------------------------

        for (let i = 0; i < lados; i++) {

            const angulo =
                -p.HALF_PI +
                p.TWO_PI * i / lados;

            vertices.push({
                x: p.cos(angulo) * raioVisual,
                z: p.sin(angulo) * raioVisual
            });
        }


        p.noStroke();


        // ----------------------------------------------------
        // FACES LATERAIS
        // ----------------------------------------------------

        for (let i = 0; i < lados; i++) {

            const proximo =
                (i + 1) % lados;

            p.fill(
                100 + i * 12,
                150 + i * 8,
                220
            );

            p.beginShape(p.QUADS);

            p.vertex(
                vertices[i].x,
                -alturaVisual / 2,
                vertices[i].z
            );

            p.vertex(
                vertices[proximo].x,
                -alturaVisual / 2,
                vertices[proximo].z
            );

            p.vertex(
                vertices[proximo].x,
                alturaVisual / 2,
                vertices[proximo].z
            );

            p.vertex(
                vertices[i].x,
                alturaVisual / 2,
                vertices[i].z
            );

            p.endShape(p.CLOSE);
        }


        // ----------------------------------------------------
        // BASE SUPERIOR
        // ----------------------------------------------------

        p.fill(180, 120, 255);

        p.beginShape();

        for (const vertice of vertices) {

            p.vertex(
                vertice.x,
                -alturaVisual / 2,
                vertice.z
            );
        }

        p.endShape(p.CLOSE);


        // ----------------------------------------------------
        // BASE INFERIOR
        // ----------------------------------------------------

        p.fill(100, 200, 200);

        p.beginShape();

        for (const vertice of vertices) {

            p.vertex(
                vertice.x,
                alturaVisual / 2,
                vertice.z
            );
        }

        p.endShape(p.CLOSE);


        this.desenharArestasPrisma(
            vertices,
            alturaVisual
        );
    }


    // ========================================================
    // ARESTAS DO PRISMA
    // ========================================================

    desenharArestasPrisma(vertices, altura) {

        const p = this.p;

        const lados =
            vertices.length;

        p.noFill();
        p.stroke(40);
        p.strokeWeight(2);


        // Arestas das bases

        for (let i = 0; i < lados; i++) {

            const proximo =
                (i + 1) % lados;

            p.line(
                vertices[i].x,
                -altura / 2,
                vertices[i].z,

                vertices[proximo].x,
                -altura / 2,
                vertices[proximo].z
            );

            p.line(
                vertices[i].x,
                altura / 2,
                vertices[i].z,

                vertices[proximo].x,
                altura / 2,
                vertices[proximo].z
            );
        }


        // Arestas verticais

        for (const vertice of vertices) {

            p.line(
                vertice.x,
                -altura / 2,
                vertice.z,

                vertice.x,
                altura / 2,
                vertice.z
            );
        }
    }


    // ========================================================
    // PIRÂMIDE
    // ========================================================

    desenharPiramide(forma) {

        const p = this.p;

        const lados =
            forma.lados;

        const raio = forma.ladoBase / (2 * Math.sin(Math.PI / forma.lados));

        const altura =
            forma.altura;

        const escala =
            this.calcularEscala([
                raio * 2,
                altura
            ]);

        const raioVisual =
            raio * escala;

        const alturaVisual =
            altura * escala;

        const vertices = [];


        // ----------------------------------------------------
        // BASE
        // ----------------------------------------------------

        for (let i = 0; i < lados; i++) {

            const angulo =
                -p.HALF_PI +
                p.TWO_PI * i / lados;

            vertices.push({

                x:
                    p.cos(angulo) *
                    raioVisual,

                y:
                    alturaVisual / 2,

                z:
                    p.sin(angulo) *
                    raioVisual
            });
        }


        // ----------------------------------------------------
        // VÉRTICE SUPERIOR
        // ----------------------------------------------------

        const topo = {

            x: 0,

            y:
                -alturaVisual / 2,

            z: 0
        };


        // ----------------------------------------------------
        // FACES TRIANGULARES
        // ----------------------------------------------------

        p.noStroke();

        for (let i = 0; i < lados; i++) {

            const proximo =
                (i + 1) % lados;

            p.fill(
                100 + i * 15,
                150 + i * 8,
                220
            );

            p.beginShape(p.TRIANGLES);

            p.vertex(
                vertices[i].x,
                vertices[i].y,
                vertices[i].z
            );

            p.vertex(
                vertices[proximo].x,
                vertices[proximo].y,
                vertices[proximo].z
            );

            p.vertex(
                topo.x,
                topo.y,
                topo.z
            );

            p.endShape();
        }


        // ----------------------------------------------------
        // BASE
        // ----------------------------------------------------

        p.fill(180, 120, 255);

        p.beginShape();

        for (const vertice of vertices) {

            p.vertex(
                vertice.x,
                vertice.y,
                vertice.z
            );
        }

        p.endShape(p.CLOSE);


        this.desenharArestasPiramide(
            vertices,
            topo
        );
    }


    // ========================================================
    // ARESTAS DA PIRÂMIDE
    // ========================================================

    desenharArestasPiramide(vertices, topo) {

        const p = this.p;

        const lados =
            vertices.length;

        p.noFill();
        p.stroke(40);
        p.strokeWeight(2);


        // Arestas da base

        for (let i = 0; i < lados; i++) {

            const proximo =
                (i + 1) % lados;

            p.line(
                vertices[i].x,
                vertices[i].y,
                vertices[i].z,

                vertices[proximo].x,
                vertices[proximo].y,
                vertices[proximo].z
            );
        }


        // Arestas laterais

        for (const vertice of vertices) {

            p.line(
                topo.x,
                topo.y,
                topo.z,

                vertice.x,
                vertice.y,
                vertice.z
            );
        }
    }
}