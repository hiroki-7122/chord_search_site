$(document).ready(function(){
   var radius=Math.PI/2;
   var y=0;
   var scene = new THREE.Scene();
   var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   var renderer = new THREE.WebGLRenderer();
   renderer.setSize( window.innerWidth, window.innerHeight );
   // レンダラの背景色を白に、透明度を100%に設定
   renderer.setClearColor( 0xffffff, 0 );
   document.body.appendChild( renderer.domElement );

   var geometry = new THREE.CubeGeometry(1,1,1);
   var material = new THREE.MeshLambertMaterial( { color: 0x800300} );
   var cube = new THREE.Mesh( geometry, material );
   cube.position.set( 0, 0, 5 );
   scene.add( cube );

   var light = new THREE.SpotLight(0xffffff,2);
   light.position.set( 0, 500, 500 );
   light.target.position.set( 0, 0, 0 );
   scene.add( light );

   var geometry = new THREE.SphereGeometry( 13, 20, 20 );
   var materialSphere = new THREE.MeshLambertMaterial( { color: 0x800300, wireframe: true } );
   var mesh = new THREE.Mesh( geometry, materialSphere );
   mesh.position.set(0,0,5);
   scene.add( mesh );

   var geometry = new THREE.CubeGeometry( 3, 3, 3 );
   var materialbox = new THREE.MeshLambertMaterial( { color: 0x800300} );
   var boxA = new THREE.Mesh( geometry, materialbox );
   boxA.position.set(-15,8,0);
   scene.add( boxA );

   var boxB = new THREE.Mesh( geometry, materialbox );
   boxB.position.set(-20,-8,0);
   scene.add( boxB );

   var boxC = new THREE.Mesh( geometry, materialbox );
   boxC.position.set(10,10,0);
   scene.add( boxC );

   var boxD = new THREE.Mesh( geometry, materialbox );
   boxD.position.set(25,-10,0);
   scene.add( boxD );

   for(i=0;i<=50;i++){
   var geometry = new THREE.CubeGeometry( 5, 5, 20 );
   var materialbox = new THREE.MeshLambertMaterial( { color: 0x9f9f9f,transparent: true,  opacity: 0.5} );
   var  build= new THREE.Mesh( geometry, materialbox );
   build.position.set(Math.random()*100-50, Math.random()*100-50, -Math.random()*100);
   scene.add( build );
 }

   function render() {
       requestAnimationFrame(render);
       cube.rotation.x += 0.1;
       cube.rotation.y += 0.1;
       mesh.rotation.y += 0.01;

       if(y<=20){
       var material = new THREE.LineBasicMaterial( { linewidth: 5, color: 0xffffff } );
       var geometry = new THREE.Geometry();
       geometry.vertices.push(new THREE.Vector3(38, y, -30));
       geometry.vertices.push(new THREE.Vector3(-38, y, -30));
       scene.add( new THREE.Line( geometry, material ) );
       var material = new THREE.LineBasicMaterial( { linewidth: 5, color: 0xffffff } );
       var geometry = new THREE.Geometry();
       geometry.vertices.push(new THREE.Vector3(38, -y, -30));
       geometry.vertices.push(new THREE.Vector3(-38, -y, -30));
       scene.add( new THREE.Line( geometry, material ) );
       y=y+0.05;
     }

       if(cube.position.z>=-30){
       cube.position.z -=0.1;
       mesh.position.z -=0.1;
       boxA.position.z=cube.position.z+5;
       boxB.position.z=cube.position.z+8;
       boxC.position.z=cube.position.z+6;
       boxD.position.z=cube.position.z;
     }else{
       var mouse_x,mouse_y;
       renderer.domElement.addEventListener('mousemove', function(e){
         prevPosition = {x: e.pageX, y: e.pageY};
         mouse_x=prevPosition.x/(window.innerWidth/2)-1;
         mouse_y=prevPosition.y/(window.innerHeight/2)-1;
         //console.log(mouse_x);
         //console.log(mouse_y);
       if(mouse_x<=-0.35 && mouse_x>=-0.6 &&mouse_y<=-0.25 && mouse_y>=-0.5){
           boxA.scale.x=2;
           boxA.scale.y=2;
           boxA.scale.z=2;
           boxA.rotation.x +=0.0001;
           boxA.rotation.y +=0.0001;
          }
          else{
            boxA.scale.x=1;
            boxA.scale.y=1;
            boxA.scale.z=1;
          }
        if(mouse_x<=-0.55 && mouse_x>=-0.8 &&mouse_y<=0.7 && mouse_y>=0.3){
            boxB.scale.x=2;
            boxB.scale.y=2;
            boxB.scale.z=2;
            boxB.rotation.x +=0.0001;
            boxB.rotation.y +=0.0001;
           }
           else{
            boxB.scale.x=1;
            boxB.scale.y=1;
            boxB.scale.z=1;
             }
        if(mouse_x<=0.5 && mouse_x>=0.2 &&mouse_y<=-0.28 && mouse_y>=-0.6){
            boxC.scale.x=2;
            boxC.scale.y=2;
            boxC.scale.z=2;
            boxC.rotation.x -=0.0001;
            boxC.rotation.y -=0.0001;
            }
        else{
            boxC.scale.x=1;
            boxC.scale.y=1;
            boxC.scale.z=1;
            }
        if(mouse_x<=0.8 && mouse_x>=0.5 &&mouse_y<=0.7 && mouse_y>=0.3){
            boxD.scale.x=2;
            boxD.scale.y=2;
            boxD.scale.z=2;
            boxD.rotation.x -=0.0001;
            boxD.rotation.y -=0.0001;
            }
        else{
            boxD.scale.x=1;
            boxD.scale.y=1;
            boxD.scale.z=1;
            }
        },false);
       //ball.position.x=13*Math.cos(radius);
       //ball.position.y=13*Math.sin(radius);
       //radius=radius+(Math.PI/360);
     }
       renderer.render(scene, camera);
   }
   render();
 });
