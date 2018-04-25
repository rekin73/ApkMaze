function Main() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        95,
        innerWidth / innerHeight,
        0.1,
        1000
    );
    
    
    var movement = false;
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#root").append(renderer.domElement);
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    camera.position.set(150, 150, 150)
    camera.lookAt(scene.position);
    $(document).keydown(function (e) {
        console.log(e.which)
    })
    var plane = new THREE.PlaneGeometry(3000, 3000, 100, 100);
    var materialP = new THREE.MeshBasicMaterial({
        //specular: 0xffffff,
        //shininess: 50,
        side: THREE.DoubleSide,
        color: 0x1111111,
        wireframe: true,
    })
    var plansza = new THREE.Mesh(plane, materialP);
    plansza.name="plansza"
    scene.add(plansza);
    plansza.rotateX(Math.PI / 2);
//Hexagon Test:
    //var hexagon=new Hex();
    //scene.add(hexagon.getHex());
    var level=new Level();
    scene.add(level.getLevel())
//Hex Test;
    var player = new Player();
    
    //scene.add(player.getPlayerCont())
    
    console.log(player)
    

    var pointer = player.getPointMesh()
    //scene.add(pointer)
    //console.log(point)
    var follower=player.getFollowerMesh();
    //scene.add(follower);
    
    var clickedVect; // wektor określający punkt kliknięcia
    var directionVect; // wektor określający kierunek ruchu playera
var clck;
console.log(player.getPlayerCont().position.clone().distanceTo(scene.position))
    $(document).mousedown(function (event) {
        var raycastedObjects=[scene.getObjectByName("plansza")]
        var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y)
        // wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        console.log(scene.children)
        var intersects = raycaster.intersectObjects(raycastedObjects);

        //player.getPlayerMesh().rotation.y = angle

        if (intersects.length > 0) {
            clickedVect = intersects[0].point
            clck=clickedVect
            console.log(clickedVect)
            directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
            console.log(directionVect)
            movement = true;
            console.log(player.getPlayerCont().position.clone().distanceTo(clickedVect))
            pointer.position.copy( intersects[ 0 ].point );
            
            if(player.getPlayerCont().position.clone().distanceTo(clickedVect)==0){
                movement=false;
            }
            //funkcja normalize() przelicza współrzędne x,y,z wektora na zakres 0-1
            //jest to wymagane przez kolejne funkcje	
        }

        var angle = Math.atan2(
            player.getPlayerCont().position.clone().x - clickedVect.x,
            player.getPlayerCont().position.clone().z - clickedVect.z
        )

        player.getPlayerMesh().rotation.y = angle-Math.PI;
    })

    function render() {
        plane.receiveShadow = true;
        plansza.castShadow = true;
        //camera.lookAt(scene.position)
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        //con.rotation.y= $("#obrot").val()/180*Math.PI;
        /*
        camera.position.x = player.getPlayerCont().position.x
        camera.position.z = player.getPlayerCont().position.z + 200
        camera.position.y = player.getPlayerCont().position.y + 200
        camera.lookAt(player.getPlayerCont().position)
        */
        camera.lookAt(scene.position)
//console.log(movement)
         if (movement)
        player.getPlayerCont().translateOnAxis(directionVect, 10) // 5 - speed
        //console.log(player.getPlayerCont().position.clone().distanceTo(clck))
        if(player.getPlayerCont().position.clone().distanceTo(clck)<=10){
            movement=false
        } 
        
    }
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
orbitControl.addEventListener('change', function () {
    renderer.render(scene, camera)
});
    render();
}