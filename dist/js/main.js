"use strict";

var app = new PIXI.Application({
    view: document.getElementById("pixiCanvas"),
    width: 1024,
    height: 1280,
    transparent: true
});

app.interactive = true;

var app2 = new PIXI.Application({
    view: document.getElementById("backgroundCanvas"),
    width: 1280,
    height: 720
});

var manifest = [{
    "key": "fox",
    "url": "dist/img/fox.jpg"
}, {
    "key": "winter",
    "url": "dist/img/winter.jpg"
}, {
    "key": "displacement",
    "url": "dist/img/displacement.png"
}];

function loadAssets() {
    app.loader.add(manifest);
    app.loader.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources) {
    console.log(resources);

    setupFox();

    app.ticker.add(function (e) {
        return update(e);
    });
}

function setupFox() {
    var fox = new PIXI.Sprite(app.loader.resources.fox.texture);
    fox.interactive = true;

    fox.position.x = -200;

    app.loader.resources.displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    var filter = new PIXI.filters.RGBSplitFilter();

    fox.on('mouseover', function () {
        fox.filters = [filter];
    });
    fox.on('mouseout', function () {
        fox.filters = [];
    });

    // window.addEventListener("mouseover", function(){
    //     console.log(`hello`)
    //     fox.filters = []
    //     // fox.visible = true
    // })

    // window.addEventListener("mouseout", function(){
    //     console.log(`goodbye`)

    //     // fox.visible = true
    // })
    app.stage.addChild(fox);
}

function update(e) {

    if (vibrating) {
        rgbFilter.blue.x = Math.random() * 10 - 5;
        rgbFilter.blue.y = Math.random() * 10 - 5;
        // rgbFilter.green.x = (Math.random()* 10) - 5
        // rgbFilter.green.y = (Math.random()* 10) - 5
        rgbFilter.red.x = Math.random() * 10 - 5;
        rgbFilter.red.y = Math.random() * 10 - 5;
    }

    var temp = rt;
    rt = rt2;
    rt2 = temp;

    rtSprite.texture = rt;

    app2.renderer.render(app2.stage, rt2);
}

function update(e) {}

function resize(e) {
    var canvasAspect = app2.screen.width / app2.screen.height;
    var screenAspect = window.innerWidth / window.innerHeight;
    var scale = 1;

    if (screenAspect > canvasAspect) {
        //screen is wider than canvas. we need to match the width of the screen
        scale = window.innerWidth / app2.screen.width;
    } else {
        //screen is taller than canvas. we need to match the height of the screen
        scale = window.innerHeight / app2.screen.height;
    }

    app2.view.style.transform = "scale(" + scale + ")";
}

window.onload = function () {
    window.addEventListener("resize", resize);
    resize();
    loadAssets();
};
//# sourceMappingURL=main.js.map
