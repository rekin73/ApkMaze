function Player() {

    var container = new THREE.Object3D()

    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
        color: 0x222222,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.8,
        
    });

    var player = new THREE.Mesh(geometry, material); // player sześcian

    

    var axes = new THREE.AxesHelper(100) // osie do kontroli kierunku ruchu
    
    player.add(axes)
    
    container.add(player)
    var geometry2 = new THREE.SphereGeometry(30, 10, 10);
    var geometry3 = new THREE.SphereGeometry(10, 10, 10);
    var material2 = new THREE.MeshBasicMaterial({
        color: 0xAA0000,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: false
    });

    var point = new THREE.Mesh(geometry2, material2); // player sześcian
    
    //funkcja zwracająca kontener
    this.getPlayerCont = function () {
        return container
    }

    //funkcja zwracająca playera
    this.getPlayerMesh = function () {
        return player
    }

    this.getPointMesh = function () {
        return point
    }
    this.getFollowerMesh = function () {
        return new THREE.Mesh(geometry3,material2);
    }
}