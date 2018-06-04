function Level() {
var Level=new LevelData().getLevelData();
var w = 2*200;
var h= (Math.sqrt(3)/2)*200;
    //tu wygeneruj meshe levelu na podstawie danych z poprzedniego pliku
    //i zwróć je do sceny
    var container=new THREE.Object3D()
 for(var i=0;i<Level.size;i++){
    for(var j=0;j<Level.size;j++){

        if(i%2==1){
            var hex=new Hex().getHex()
            hex.position.set(w*(3/4)*i,0,(2*h*j)+h)
            container.add(hex)
        }else{
            var hex=new Hex().getHex()
            hex.position.set(w*(3/4)*i,0,2*h*j)
            container.add(hex)
        }
        
    }

 }
 this.getLevel=function(){
     return container;
 }
 }
 