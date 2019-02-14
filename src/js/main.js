const app = new PIXI.Application({
    view: document.getElementById("pixiCanvas"),
    width: 1024,
    height: 1280,
    transparent: true
});

let vibrating = false

const app2 = new PIXI.Application({
    view: document.getElementById("backgroundCanvas"),
    width: 1280,
    height: 720
})

let manifest = [
    {
        "key": "fox",
        "url": "dist/img/fox.jpg"
    },
    {
        "key": "winter",
        "url": "dist/img/winter.jpg"
    },
    {
        "key": "displacement",
        "url": "dist/img/displacement.png"
    }


]


function loadAssets(){
    app.loader.add(manifest)
    app.loader.load(onAssetsLoaded)
}

function onAssetsLoaded(loader, resources){
    console.log(resources)

    setupFox()

    app.ticker.add((e) => update(e))
}

function setupFox(){
    let fox = new PIXI.Sprite(app.loader.resources.fox.texture)
    fox.interactive = true;

    fox.position.x = -200

    app.loader.resources.displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    
    let filter = new PIXI.filters.RGBSplitFilter()
    let filter2 = new PIXI.filters.GlitchFilter()

    fox.on('mouseover', function(){
        vibrating = true
        fox.filters = [filter, filter2]
    });
    fox.on('mouseout', function(){
        vibrating = false
        fox.filters = []
    });

    app.stage.addChild(fox)
}


function update(e){

}

function resize(e){
    let canvasAspect = app2.screen.width / app2.screen.height
    let screenAspect = window.innerWidth / window.innerHeight
    let scale = 1

    if (screenAspect > canvasAspect) {
        //screen is wider than canvas. we need to match the width of the screen
        scale = window.innerWidth / app2.screen.width
    } else {
        //screen is taller than canvas. we need to match the height of the screen
        scale = window.innerHeight / app2.screen.height
    }

    app2.view.style.transform = "scale(" + scale + ")"
}




window.onload = function(){
    window.addEventListener("resize", resize)
    resize()
    loadAssets()
}