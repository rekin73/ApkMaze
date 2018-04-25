function Hex(){
    var radius = 200 // wielkość hexagona, a tym samym całego labiryntu
    const sRadius= radius*(Math.sqrt(3)/2);
    var container = new THREE.Object3D()
var geometry=new THREE.BoxGeometry(radius, 100, 10);
var material= new THREE.MeshBasicMaterial({
    color: 0x222222,
    side: THREE.DoubleSide,
    wireframe: false,
    transparent: true,
    opacity: 0.8
});
    var wall = new THREE.Mesh(geometry, material);
  console.log("ctnPos:"+container.position)
    for (var i = 0; i < 6; i++) {
        var side = wall.clone()
        side.position.x = sRadius*(Math.sin(i*Math.PI/3))
        side.position.z = sRadius*(Math.cos(i*Math.PI/3))    
        side.lookAt(container.position)      
        container.add(side)
        
    }   

//container.add(wall)
    this.getHex = function () {
        return container
    }
}
