function Level() {
var Level=new LevelData().getLevelData();

    //tu wygeneruj meshe levelu na podstawie danych z poprzedniego pliku
    //i zwróć je do sceny
    var container=new THREE.Object3D()
 for(var i=0;i<Level.size;i++){
    for(var j=0;j<Level.size;j++){
        var hex=new Hex().getHex()
        hex.position.set(300*(Math.sqrt(3)/2)*i,0,300*(Math.sqrt(3)/2)*i)
        container.add(hex)
    }

 }
 this.getLevel=function(){
     return container;
 }
 }
 