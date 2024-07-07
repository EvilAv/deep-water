const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 600;
const btn = document.querySelector('button');

const ctx = canvas.getContext('2d');

const getRandomInt = (maxInt) => {
    return Math.floor(Math.random() * maxInt)
}

const getRandomPoint = (width, height) => {
    return [getRandomInt(width), getRandomInt(height)]
}

const getNeighbours = (x, y, width, height) => {
    const res = [];
    if (x > 0){
        res.push([x - 1, y]);
    }
    if (x < width - 1){
        res.push([x + 1, y])
    }
    if (y > 0){
        res.push([x, y - 1]);
    }
    if (y < height - 1){
        res.push([x, y + 1])
    }
    return res;

}

const createEmptyIsland = (width, height) => {
    const tiles = Array.from({length: height}, () => new Array(width).fill(0));
    return {
        tiles, 
        width, 
        height
    }
}

const visualize = (island) => {
    const size = 40;
    let x = size;
    let y = size;
    for (const line  of island.tiles){
        for (const tile of line){
            if (tile === 1) {
                ctx.fillStyle = 'white';
                ctx.fillRect(x, y, size, size);
            }
            x += size
        }
        y += size;
        x = size;
    }
}

const generateIsland = (width, height,) => {
    const island = createEmptyIsland(width, height);
    // const startPoint = getRandomPoint(island.width, island.height);
    const startPoint = [Math.floor(width / 2), Math.floor(height / 2)];
    // console.log('point', startPoint);

    let prevLands = [startPoint];
    let probability = 100;
    let color = 16;

    const temp = () => {
        const neighbours = [];
        for (const land of prevLands){
            // lands.push(land);
            island.tiles[land[0]][land[1]] = 1;
            neighbours.push(...getNeighbours(land[0], land[1], width, height))
        }
        probability -= 19;
        for (const n of neighbours){
            if (island.tiles[n[0]][n[1]] === 1){
                continue;
            }
            if (Math.random() * 100 <= probability){
                prevLands.push(n);
            }
        }
        // console.log(probability)
        
        visualize(island);
        if (probability <= 0){
            return;
        } else {
            setTimeout(temp, 1000)
        }
    }

    temp();

    // for (let i = 0; i < 11; i++){

    //     // const neighbours = getNeighbours(startPoint[0], startPoint[1], width, height);
    //     // console.log('neighbours', neighbours);
    //     // // points.push(...neighbours)
    //     // for (const neighbour of neighbours){
    //     //     if (Math.random() * 10 >= 5){
    //     //         points.push(neighbour)
    //     //     }
    //     // }
    // }

    // for (const point of earth){
    //     island.tiles[point[0]][point[1]] = 1;
    // }
    // island.tiles[point[0]][point[1]] = 1;
    // console.log(points)


}

ctx.fillRect(0, 0, canvas.width, canvas.height);
generateIsland(10, 10)

btn.addEventListener('click',  () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    generateIsland(10, 10)
})



