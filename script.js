function main() {

    //1. Trovo e assegno la tela

    //salvo la "tela" nella costante "canvas"
    const canvas = document.querySelector('#canvas');

    //renderer è visualizzatore del materiale nella tela, WebGLRenderer usa WebGL per il disegn 3d sulla tela
    const renderer = new THREE.WebGLRenderer({ canvas });
    console.log(renderer)


    //2. "Accendo" la camera

    const fov = 75;
    //field of view 75 gradi

    //rapporto tra altezza e largezza della tela
    const aspect = 2;

    //near , far i punti piu visino e lontano, tutto quello che è fupri non si vedrà in scena
    const near = 0.1;
    const far = 5;

    //fov, aspect, near e far rappresentano "frustum"


    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    //3. Aggiungo la scena, tutto quello voglio disegnare bisogna aggiungere in scena

    const scene = new THREE.Scene()

    //4. Creo BoxGeometry che contiente i dati per disegnare cuboide, tutto quello chi vogliamo disegnare ha bisogno di geometriaper definire i vertici del oggetto 3D
    const boxWidth = 1;
    const boxHeight = 1;

    //profondità
    const boxDepth = 1;

    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

    //5. Creo il materiale  e il colore per la figura
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })

    //6. Uniamo la geometria e il materiale per disegnare  oggetto
    // const cube = new THREE.Mesh(geometry, material)

    //7. Aggiungo l'oggetto in scena
    // scene.add(cube)

    //8.Visualizzo la scena con la funzione render() a cui passo la scena e la camera
    // renderer.render(scene, camera)

    //9.Animazione

    // function render(time) {
    //     time *= 0.001;

    //     cube.rotation.x = time;
    //     cube.rotation.y = time;

    //     renderer.render(scene, camera);

    //     requestAnimationFrame(render)

    // }
    // requestAnimationFrame(render)

    //10. luce

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4)

    scene.add(light)


    //11. funzione per crere i cubi
    function makeInstace(geometry, color, positionX) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube)

        cube.position.x = positionX;

        return cube
    }
    const cubes = [
        makeInstace(geometry, 0x44aa88, 0),
        makeInstace(geometry, 0x8844aa, -2),
        // makeInstace(geometry, 0xaa8844, 2)
    ]

    function render(time){
        time *= 0.001;

        cubes.forEach((cube, ndx)=>{
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;

            renderer.render(scene, camera)
            requestAnimationFrame(render)
        }
        
        )
    }
    requestAnimationFrame(render)

}


    main()