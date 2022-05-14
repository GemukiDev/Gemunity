# Gemunity (v0.2)

## Novedades en la versión v0.2

- Se ha añadido el componente `RectangleRenderer` que sirve para pintar rectángulos de colores sin necesidad de cargar sprites.
- Se ha añadido la clase `Matrix` para trabajar con matrices bidimensionales.
- Se ha añadido el método `FixedUpdate` a los objetos que extienden `MonoBehaviour` y la propiedad `fixedDeltaTime` a la clase estática `Time`.

## Introducción

Gemunity es un motor de videojuegos 2D escrito en JavaScript para ejecutarse en navegadores.

Gemunity está **inspirado en Unity**, por lo qué la filosofía de diseño y muchas de las funcionalidades se escriben igual. Las funcionalidades están limitadas pero son sufientes para hacer una gran cantidad de juegos.

La ventaja de Gemunity es su simplicidad, su parecido con Unity y el bajo peso de su núcleo (tan sólo 100kb).

## ¿Cómo funciona Gemunity?

El motor consta de dos partes:

- Los **Scripts de comportamiento**: son componentes propios del juego como SpriteRenderer o Collider2D, pero también puedes escribir scripts personalizados.
- La **definición del juego**: en el archivo *game.js* deberás iniciar el motor, cargar los recursos y decirle qué objetos existirán al iniciar el juego.

## ¿Cómo se lanza un juego de Gemunity?

Debes correr el juego abriendo el `index.html` desde un servidor. Lo más sencillo para el desarrollo es instalar la extensión ***Live Server*** de Visual Studio Code.

Para publicarlo, puedes subirlo a una Web propia o a diversas plataformas como Itch.io.

## ¿Se puede usar Gemunity sin servidor local?

Sí, pero tendrás que empaquetarlo con alguna herramienta como `Webpack`. Lo distribuyo sin empaquetar, de forma que las clases sean fácilmente legibles.

## ¿Cómo se usa Gemunity?

Debes escribir el código de iniciación de tu juego en el archivo `game.js`.

El motor está escrito con sintaxis de módulos de JavaScript, de modo que puedes importar componentes muy fácilmente. Simplemente carga los que necesites desde el módulo principal de `Gemunity`:

    import { Gemunity, Resources, Sprite, GameObject } from "./core/Gemunity.js";

Si escribes componentes propios en un archivo separado (lo que es muy recomendable), también deberás importarlos:

    import { MyComponent } from "./user/MyComponent.js";

## ¿Cómo se crean GameObjects?

Gemunity no tiene una interfaz de desarrollo, por hecho he hecho que crear GameObjects por programación sea super fácil. Simplemente debes usar el constructor *new GameObject()* y pasarle 3 parámetros:

- El **nombre** que va a tener el GameObject.
- Un nuevo objeto **Transform** con sus coordenadas iniciales.
- Una función que actúa como **provider de componentes**. Esto es una función que reciba el propio objeto como parámetro y devuelva una lista de componentes. Esto es así porque, para crear un componente, es necesario que ya esté instanciado el GameObject.

        new GameObject(
            "dino",
            new Transform(new Vector3(-4, 0)),
            (obj) => [
                new DinoController(obj),
                new SpriteRenderer(obj, Resources.GetSprite("dino"))
            ]
        )

## ¿Cómo se usan los transforms?

Todo GameObject debe incluir un `Transform`. Este transform acepta hasta 3 parámetros. El primero, la posición, es un `Vector3`, mientras que el segundo y tercero (rotación y escala) son números. Esto es así, a diferencia de Unity, porque estamos ante un motor 2d.

Todos los parámetros son opcionales, siendo sus valores por defecto: `{position: (0,0,0), rotation: 0, scale: 1}`. Las unidades de la rotación son grados.

Para voltear sprites, en vez de rotarlos o poner escalas negativas, conviene usar las propiedades `flipX` y `flipY` del `SpriteRenderer`.

## ¿Cómo se utilizan recursos?

Debes precargar todos los recursos multimedia antes de iniciar el juego. Gemunity acepta imágenes (jpg, png y svg) así como archivos de audio.

Para cargar recursos define un array con todas las imágenes y otro con todos los sonidos. Luego inicia el motor y espera a que se carguen todos. Durante este tiempo, Gemunity mostrará una barra de carga que se puede personalizar utilizando CSS. Una vez estén cargados, ya puedes iniciar el juego.

    const spriteList = [
        new Sprite("dino", "resources/img/dino.png")
    ];
    const audioList = [
        new Sprite("jump", "resources/sound/jump.mp3")
    ];
    Gemunity.Init();
    Promise.all([
        Resources.LoadSprites(spriteList),
        Resources.LoadAudios(audioList)
    ]).then(() => {
        Gemunity.ShowWellcome();
    });

## ¿Cómo se inicia el juego?

Una vez se hayan cargado todos los recursos, se muestra una pantalla de bienvenida con un botón de jugar. Esto es necesario para asegurarse de que los sonidos funcionan correctamente, pero puede obviarse durante la fase de desarrollo.

Cuando el usuario pulse el botón de *Play*, se llamará al evento ***OnPlay***. Por eso, para iniciar el juego, añadiremos *un callback* al evento *OnPlay* de la siguiente manera:

    Gemunity.OnPlay(() => {
        Game.Create([
            new GameObject("personaje", ...),
            new GameObject("enemigo", ...),
        ])
    });

El fragmento de código `Game.Create()` crea la lista inicial de objetos del juego. En Unity se correspondería con la jerarquía de objetos.

## ¿Cómo funcionan los Componentes?

Igual que en Unity, puedes añadir componentes a los objetos que crees para añadirles funcionalidades.

Todo componente recibe siempre en su `constructor` el objeto al que está asignado y, opcionalmente, algunos parámetros más de configuración. Estos parámetros se corresponden con las opciones que vemos en el inspector de componentes de Unity.

Por ejemplo un `SpriteRenderer` recibe un Sprite y un `Vector2` que define su tamaño:

    new SpriteRenderer(
        obj,
        Resources.GetSprite("suelo"),
        new Vector2(2, 1)
    );

## ¿Cómo puedo ver qué parámetros tiene cada componente?

¡Es muy sencillo! Simplemente busca en la carpeta `build/core` el archivo del componente que buscas y lee el constructor. Ahí encontrarás todos los parámetros que acepta y en qué orden debes pasárselos. Ten en cuenta que muchos son opcionales (los que tienen un valor preasignado), y que no siempre requiere que definas toda la lista.

Veamos por ejemplo el componente `TextRenderer`:

    export class TextRenderer extends Renderer {
        constructor(
            obj,
            text,
            size,
            color,
            fontSize = 16,
            fontFamily = "Arial",
            textAlign = TextAlign.Center,
            fontWeight = FontWeight.Normal,
            fontStyle = FontStyle.Normal,
            wrapping = TextWrap.Fit,
            lineHeight = 1,
            orderInLayer = 0
        ) {
            ...
        }
    }

## ¿Cómo creo nuevos componentes?

Como en Unity, todo componente debe heredar de `MonoBehaviour`. Esta extensión es lo que permite que se llamen a funciones como `Awake`, `Start` o `Update`, de las que Gemunity también consta.

    export class DinoController extends MonoBehaviour {

        // tu código
    }

(Debes incluir la keyword `export` en el caso de que estés escribiendo el componente en un archivo independiente de `game.js`)

Si necesitas configurar tu componente con diversos parámetros debes indicar un constructor. Este constructor debe recibir siempre como primer parámetro el GameObject al que está conectado y debe enviárselo inmediatamente a la clase padre mediante una llamada a `super()`.


    export class DinoController extends MonoBehaviour {

        vel;

        constructor(obj, vel) {
            super(obj);
            this.vel = vel;
        }
    }


## ¿Qué métodos del ciclo de vida tienen los componentes?

Esta es la lista de los métodos del ciclo de vida que puedes usar por el momento:

    Awake()
    Start()
    Update()
    OnDestroy()
    OnCollisionEnter2D(otherCollider)
    OnCollisionStay2D(otherCollider)
    OnCollisionExit2D(otherCollider)


## ¿Cómo se cogen otros componentes del GameObject?

Igual que en Unity puedes llamar a la función GetComponent. La única diferencia aquí es que la sintaxis es algo distinta:

    const spriteRenderer = this.GetComponent(SpriteRenderer)

## ¿Cómo se buscan objetos en escena?

Puedes buscar un objeto en escena de dos maneras. Bien buscándolo por nombre:

    Game.FindObjectByName(name);
    Game.FindObjectsByName(name); // returns array

O bien por componente:

    Game.FindObjectOfType(Camera);
    Game.FindObjectsOfType(Camera); // returns array

## ¿Cómo se crean y destruyen GameObjects?

Igual que en Unity hay que llamar al método `Instantiate` para crearlos:

    GameObject.Instantiate(
        new GameObject(
            "cactus",
            new Transform(new Vector3(10, -0.1)),
            (obj) => [
                new CactusController(obj),
                new SpriteRenderer(obj, Resources.GetSprite("cactus1"), new Vector2(1,1))
            ]
        )
    );

Y a `Destroy` para destruirlos:

    GameObject.Destroy(this.gameObject);

## ¿Cómo se detecta el input del usuario?

Igual que en Unity, puedes usar la clase Input. Ahora mismo tiene un número acotado de eventos y teclas que puedes detectar pero siempre puedes añadir las tuyas de forma personalizada.

    class DinoController extends MonoBehaviour {

        Update() {
            if(Input.GetKeyDown(KeyCode.D)) {
                // move character right
            }
        }
    }

## ¿Cómo se detecta el paso del tiempo?

Detectar cuánto tiempo ha pasado entre fotogramas es indispensable para cualquier juego ya que permite mover los objetos de forma regular dentro del espacio del juego.

En Gemunity existe la clase `Time` que tiene propiedades `time` y `deltaTime` que se pueden usar para esto.

## ¿Qué objetos debe incluir siempre mi juego?

Querrás que tu juego muestre imágenes, ¿no? Por ello es imprescindible que tu juego tenga un componente `Camera`. La cámara recibe como parámetros el id del canvas en que se va a pintar, el color de fondo y un tamaño, que indica el tamaño de la mitad del alto del visor. El ancho se calculará en función del aspectRatio de la ventana del navegador.

    new GameObject(
        "camera",
        new Transform(new Vector3(0, 2)),
        (obj) => [
            new Camera(
                obj,
                "mainCanvas", // canvas id
                new Color(0.5, 0.9, 0.8),
                3 // half of the height
            )
        ]
    )

## ¿Cómo puedo pintar la UI del juego?

Para pintar textos y botones tienes dos opciones:

- Puedes pintar textos usando el componente `TextRenderer`, que pintará un texto dentro de una caja de las dimensiones que le indiques. Este texto es parte del juego y vive en el mismo sistema de coordenadas, pudiendo llevar colliders, animators y demás componentes.
- Para UIs más complejas puedes utilizar símplemente código HTML que se superponga al canvas en el que se dibuja el juego.

## ¿Qué limitaciones tiene JavaScript?

La sintaxis de JavaScript, aunque parecida a la de C#, tiene algunas diferencias que ya habrás notado. Por ejemplo, para extender una clase se utiliza `extends`, en vez de `:` y en los métodos de las clases, las propiedades siempre deben ir precedidas de `this`.

La mayor diferencia es la inexistencia de extensiones de operador, con lo que es imposible hacer cosas como:

    const vectorResultante = vectorInicial - vectorFinal;

Para solucionar esto, las clases Vector3 y Vector2 incluyen métodos para trabajar con todos los operadores. Estos métodos son:

- `v1.Sum(v2)`: suma los vectores y devuelve un nuevo objeto con el resultado.
- `v1.Substract(v2)`: resta `v2` a `v1` y devuelve un nuevo objeto con el resultado.
- `v1.Multiply(num)`: multiplica un vector por un escalar y devuelve el resultado como nuevo objeto.
- `v1.Divide(num)`: divide un vector entre un escalar y devuelve el resultado como nuevo objeto.

Además los vectores se pueden convertir entre sí con los métodos `v2.ToVector3()` y `v3.ToVector2()`, que serían equivalentes a los casting de C#.

Por supuesto los Vectores incluyen muchos más métodos como: `DotProduct()`, `DotDivision()`, `InvertY()`, `InvertX()` y `Rotate()`. También tienen propiedades como: `magnitude`, `sqrMagnitude` y `normalized`.


## ¿Qué funcionalidades trae Gemunity en su versión 0.1?

Gemunity trae los componentes indispensables para hacer juegos 2D. Esta lista irá creciendo con el tiempo y también puedes extender los existentes o crear nuevos.

Ahora mismo incluye la siguiente lista:

Para animar:

    Animator
    AnimatorState

Para imágenes y sonidos:

    AudioClip
    AudioSource
    Sprite
    Resources

Para detectar colisiones:

    BoxCollider2D
    CircleCollider2D
    
Para pintar información a la consola:

    Debug

Para detectar instrucciones del usuario:

    Input
    KeyCode

Para funciones matemáticas:

    Mathf
    Random

Para pintar elementos en pantalla:

    SpriteRenderer
    TextRenderer

Para las coordenadas:

    Transform
    Vector2
    Vector3


## ¿Qué más incluye Gemunity?

Para que todo resulte lo más natural y parecido a Unity que sea posible, he creado algunas funcionalidades renombrando otras existentes.

Por ejemplo, para sacar cosas por consola se puede usar el `console` nativo de JavaScript, pero también la extensión `Debug.Log()` que he creado para asimilar el código.

Además, para crear listas se pueden crear arrays nativos, o la extensión `List`, que tiene los mismos métodos que en Unity:

    const list = new List();
    list.AddRange([1, 2]);
    list.Remove(1);
    Debug.Log(list); // prints [2]

Además también he integrado un sistema de eventos cuya sintaxis es distinta a los eventos de C#, pero que, aún escribiéndose de forma distinta funcionan igual.

Se trata de la clase `EventEmitter`, que permite suscribirse a eventos personalizados:

    export DinoController extends MonoBehaviour {

        static OnCollect: EventEmitter<void> = new EventEmitter();

        OnCollisionEnter(otherCollider) {
            DinoController.OnCollect.Invoke();
        }
    }

    export ScoreController extends MonoBehaviour {

        score = 0;

        Awake() {
            DinoController.OnCollect.AddListener(this.AddScore, this);
        }

        AddScore() {
            this.score++;
        }

    }


