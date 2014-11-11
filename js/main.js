//Iniciamos el enchant o 
//es un mode de llamar las librerias
enchant();

//cuando cargue el documento evento load
window.onload = function()
{
	
	
	// Punto de inicio crear el juego
	// heredando de la clase Game
	var Juego = new Game(320, 440);
	
	//Precargar los recursos
	Juego.preload('res/BG.png', 'res/penguinSheet.png', 'res/Ice.png');
	//recurso nuevo
	//Juego.preload('res/BG.png', 'res/penguinSheet.png');
	
	//Settings del juego
	Juego.fps = 30;
	Juego.scale = 1;/**/
	
	Juego.onload = function()
	{
		//cuando cargue el juego alojado <Juego>
		console.log("Listo!!");
		
		
		//instancio la clase que se creo al final
		var laEscena = new EscenaJuego();
		
		//se integra la nueva instancia de EscenaJuego
		//al juego
		Juego.pushScene(laEscena);
		
		
		
		
		
		/*
		//variables de los nodos
		var escena, texto, fondo;
		
		//se pone la escena en la variable
		escena = new Scene();
		
		//se pone la etiqueta de texto
		texto = new Label("Hola, Oceano!!!");
		
		//se pone el fondo
		fondo = new Sprite(320, 440);
		//se le agrega la imagen que termino de precargar
		fondo.image = Juego.assets['res/BG.png'];
		
		
		//ligar a la escena
		escena.addChild(fondo);
		escena.addChild(texto);
		
		//ligar escena al juego
		Juego.pushScene(escena);
		*/
		
	}
	
	//incio del juego
	Juego.start();
	
	//clase nueva llamada EscenaJuego que en el
	//interior crea un objeto Scene es decir una escena
	var EscenaJuego = Class.create(Scene, {
		//the main gameplay scene
		initialize: function()
		{
		

			
			var Juego, Etiqueta, Fondo, Pinguinito;
			
			//constructor de una superClase
			Scene.apply(this);
			
			//acceso al singleton
			Juego = Game.instance;
			
			//crear los childs
			
			//se crea el texto
			Etiqueta = new Label("GO!!");
			
			
			//se aplica el fondo por medio de un sprite
			Fondo = new Sprite(320, 440);
			//se liga la imagen ya precargada en el inicio
			//al sprite Fondo
			//Fondo.image = Juego.assets['res/BG.png'];
			
			//FondoAlternativo
			Fondo.image = Juego.assets['res/BG.png'];
			
			
			//funcion de eventos
			this.addEventListener(Event.TOUCH_START, this.manipToqueControl);
			
			
			//evento update para los cubos de hielo
			this.addEventListener(Event.ENTER_FRAME, this.update);
			
			
			//temporizador de aparación de los cubos
			this.generateIceTimer = 0;
			
			/*
			//***********************
			//pinguinito
			Pinguinito = new Sprite(30,43);
			Pinguinito.image = Juego.assets['res/penguinSheet.png'];
			Pinguinito.x = Juego.width/2 - Pinguinito.width/2;
			Pinguinito.y = 280/*;*/
			//*********************************/
			
			Pinguinito = new Penguin();
			Pinguinito.x = Juego.width/2 - Pinguinito.width/2;
			Pinguinito.y = 280;
			this.Pinguinito = Pinguinito;//se modifica el mismo objeto
											//quitnadole el "this"
			
			//add childs el fondo, el texto y el pinguinito
			this.addChild(Fondo);
			this.addChild(Etiqueta);
			this.addChild(Pinguinito);
			

			
		},
		
		update: function(evt)
		{
			//checkear si se debe crear obstaculo o no
			this.generateIceTimer += evt.elapsed * 0.001;
			if (this.generateIceTimer >= 0.5)
			{
				var ice;
				this.generateIceTimer -= 0.5;
				ice = new Hielo(Math.floor(Math.random()*3));
				this.addChild(ice);
			}
		},
		
		manipToqueControl: function(evt)
		{
			
		
		
			//se declara el ancho del carril y el nombre del carril izq/cen/der
			var carrilAncho, carril, numeroCarriles;
			numeroCarriles = 3;
			
			//el ancho del carril es x = anchoLienzo/numeroCarriles
			carrilAncho = 320/numeroCarriles;
			
			
			//formula para saber en que carril esta de la forma
			//cordenada x/anchototal que da el número de veces y con ellos el carril			
			carril = Math.floor(evt.x/carrilAncho);
			
			//creacion de rango de canal -
			//menos de dos y mayor de cero = 0,1,2
			carril = Math.max(Math.min(2, carril), 0);
			
			
			//envio de datos de posición al pinguinito
			//Aunque la clase base se llama "Penguin" la clase que se 
			//llama es <Pinguinito> (dentro de esta escena) que es la instancia de "Penguin"
			this.Pinguinito.cambiarDeCarril(carril);
			
			
			
			//console.log(evt.x + "+" + carril + "+" + carrilAncho);
		}
		
		
		
		
		
		
	})
	
	var Penguin = Class.create(Sprite, {//Type clase construc Sprite
		//el jugador principal, el pinguino
		initialize: function(){
			//llamar a la super clase contructora
			Sprite.apply(this, [30, 43]);//el tamaño es solo medio Spr
			this.image = Game.instance.assets['res/penguinSheet.png'];
			
			//animar
			this.animationDuration = 0;//variable animación
				//se agrega el evento ENTER_FRAME a la función upAnim
			this.addEventListener(Event.ENTER_FRAME, this.updateAnimation)
		},
		
		updateAnimation: function(evt)
		{//función o método para crear la animacion
			
			//
			this.animationDuration += evt.elapsed * 0.001;
			if (this.animationDuration >= 0.25)
			{
				this.frame = (this.frame + 1) % 2;
				this.animationDuration -=0.25
			}
		},
		
		cambiarDeCarril: function(carril)
		{
			//
			var targetX = 160 - this.width/2 + (carril-1)*90;
			
			//
			this.x = targetX;
		}
	});
	
	
	/*,*/
	
	//cubito de hielo
	var Hielo = Class.create(Sprite, {
		//el obstaculo del pinguino
		initialize: function(carril)
		{
			// llamado a al superclase constructora
			Sprite.apply(this, [48, 49]);
			
			this.image = Game.instance.assets['res/Ice.png'];
			this.rotationSpeed = 0;
			this.setCarril(carril);
			this.addEventListener(Event.ENTER_FRAME, this.update);
			
		},
		
		//funciòn de refresco para el cubo de hielo
		setCarril: function(carril)
		{
			//
			var jueguito, distancia;
			jueguito = Game.instance;
			distance = 90;
			
			
			this.rotationSpeed = Math.random() * 100 - 50;
			
			this.x = jueguito.width/2 - this.width/2 + (carril- 1) * distance;
			this.y = -this.height;
			this.rotation = Math.floor(Math.random() * 360);
		},
		
		update: function(evt)
		{
			var ySpeed, jueguito;
			
			jueguito = Game.instance;
			
			ySpeed = 300;
			
			this.y += ySpeed * evt.elapsed * 0.001;
			this.rotation += this.rotationSpeed * evt.elapsed * 0.001;
			
			if(this.y > jueguito.height)
			{
				this.parentNode.removeChild(this);
			}
	
		}
	});
	
	
}








