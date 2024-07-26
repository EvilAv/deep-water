const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 600;
const btn = document.querySelector('button');

const ctx = canvas.getContext('2d');
console.log('message')

// looks like we need to store coordinates also
const getMockMap = (size, tileSize) => {
    const arr = [];
    let cnt = 0;
    for (let i = 0; i < size; i++){
        arr.push([]);
        for (let k = 0; k < size; k++){
            arr[i].push({
                value: cnt++, 
                x: k * tileSize,
                y: i * tileSize,
                tileSize: tileSize
            });
        }
    }
    return arr
}
const drawMockMap = (mockMap, startPoint) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'white';
    ctx.font = '15pt Arial'
    for (let line of mockMap){
        for (let tile of line){
            ctx.strokeRect(tile.x - startPoint.x, tile.y - startPoint.y, tile.tileSize, tile.tileSize);
            ctx.strokeText(tile.value, tile.x + tile.tileSize / 2 - startPoint.x, tile.y + tile.tileSize / 2 - startPoint.y)
        }
    }
}

// some optimize func
// const center = {
//     x: canvas.width / 2,
//     y: canvas.height / 2,
// }

// const getCenter = (width, height) => {

// }

// maybe we should update it later and add zoom update right here
const getScreenMap = (map, width, height, startPoint = {
    x: 0,
    y: 0
}) => {
    const res = [];
    for (let y = 0; y < map.length; y++){
        res.push([]);
        const startTile = map[y][0];
        if (startTile.y + startTile.tileSize - startPoint.y < 0){
            continue;
        }
        for (let x = 0; x < map.length; x++){
            const tile = map[y][x];
            if (tile.x + tile.tileSize - startPoint.x < 0){
                continue;
            }

            res[y].push(tile);
            if (tile.x + tile.tileSize - startPoint.x >= width){
                break;
            }
        }
        const endTile = map[y][map.length - 1];
        if (endTile.y + endTile.tileSize - startPoint.y >= height){
            break;
        }
    }
    return res;
}

const mock = getMockMap(200, 70);
console.log(mock)
// drawMockMap(mock);

// kind of poor naming
const startPoint = {
    x: 0, 
    y: 0
}
const prevStartPoint = {
    x: 0,
    y: 0,
}

const curStartPoint = {
    x: null, 
    y: null
}

const pressedPoint = {
    x: NaN,
    y: NaN
}

let isPressed = false;
// let isReadyToNewValue = true;
canvas.addEventListener('mousemove', event => {
    if (isPressed){
        // console.log(event.clientX, event.clientY)
        // console.log('a', event.clientX - prevStartPoint.x, event.clientY - prevStartPoint.y)
        // if (isNewValue)
        // startPoint.x = event.clientX - pressedPoint.x;
        // console.log(event.clientX - pressedPoint.x)
        startPoint.x =  prevStartPoint.x - (event.clientX - pressedPoint.x);
        startPoint.y =  prevStartPoint.y - (event.clientY - pressedPoint.y);
    }
})
canvas.addEventListener('mousedown', event => {
    isPressed = true;
    pressedPoint.x = event.clientX;
    pressedPoint.y = event.clientY;
})
canvas.addEventListener('mouseup', event => {
    isPressed = false;
    prevStartPoint.x = startPoint.x;
    prevStartPoint.y = startPoint.y;
})
canvas.addEventListener('mouseleave', () => {
    isPressed = false;
    prevStartPoint.x = startPoint.x;
    prevStartPoint.y = startPoint.y;
})

function animate() {

    if (startPoint.x !== curStartPoint.x || startPoint.y !== curStartPoint.y){
        // console.log('message')
        curStartPoint.x = startPoint.x;
        curStartPoint.y = startPoint.y;
        const screenMap = getScreenMap(mock, canvas.width, canvas.height, startPoint);
        // isReadyToNewValue = true;
        drawMockMap(screenMap, startPoint)
        // console.log(screenMap)
        // console.log(startPoint)
    }
    // prevStartPoint.x += 10
    requestAnimationFrame(animate);
}

animate()

// it works but need to be refactored