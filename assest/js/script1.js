window.addEventListener("load", () => {
    const places = document.querySelectorAll('.grid .place')
    const control = document.querySelectorAll('.control_item')
    const hint = document.querySelector('.hint')
    const replay = document.querySelector('.replay')
    const get_solution = document.querySelector('.get_solution')
    const evaluate = document.querySelector('.taskcontent .evaluate')
    const reset = document.querySelector('.taskcontent .reset')

    const message = document.querySelector('.message')
    const star = document.querySelectorAll('.next .rate svg')
    // const do_item = document.querySelectorAll('.do .do-item')
    const btn_add = document.querySelectorAll('.btn_add')





    //start ui
    let start = document.querySelector('.start')
    let error = document.querySelector('.error')
    let next = document.querySelector('.next')
    let close = document.querySelector('.close')
    let start_btn = document.querySelector('.start .btn')
    let error_btn = document.querySelector('.error .btn')
    let next_btn = document.querySelector('.next .btn')
    //end ui

    //start audio
    const audio_success = document.createElement("audio");
    audio_success.src = "../assest/music/level-win-6416.mp3";
    const audio_error = document.createElement("audio");
    audio_error.src = "../assest/music/fail_pegman.mp3";
    const audio_not_arrive = document.createElement("audio");
    audio_not_arrive.src = "../assest/music/wah-wah-sad-trombone-6347.mp3";
    const audio_fire = document.createElement("audio");
    audio_fire.src = "../assest/music/firework-show-short-64657.mp3";
    const music = document.createElement("audio")
    music.src = "../assest/music/music1.mp3"

    music.addEventListener('ended', () => {
        music.currentTime = 0
        music.play()
    })
    music.autoplay = true;

    audio_fire.addEventListener('ended', () => {
        audio_fire.currentTime = 0
        audio_fire.play()
    })
    //end audio



    //start root var
    let root = document.querySelector(':root')
    let task = parseInt(getComputedStyle(root).getPropertyValue('--task'))
    let num_of_movement = parseInt(getComputedStyle(root).getPropertyValue('--num_of_movment'))
    //end root var

    let flower1 = NaN, flower2 = NaN, flower3 = NaN, cloud1 = NaN, cloud2 = NaN, cloud3 = NaN
    let initScore, moveX = NaN, moveY = NaN, place = NaN, movement = [], gStart = NaN, dEnd = NaN, it = undefined;
    let g_index, d_index, f1_index, f2_index, f3_index, c1_index, c2_index, c3_index

    var passed = false
    let wflower = [0, 3, 12, 15]
    let all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    let icloud = [0, 1, 2, 3, 12, 13, 14, 15]
    let if_index = new Array()

    let allCoordinates = [
        { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 200, y: 0 }, { x: 300, y: 0 },
        { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 },
        { x: 0, y: 200 }, { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 },
        { x: 0, y: 300 }, { x: 100, y: 300 }, { x: 200, y: 300 }, { x: 300, y: 300 }
    ]

    let mp = new Map()
    mp.set("left", "<span>&larr;</span>")
    mp.set("right", "<span>&rarr;</span>")
    mp.set("up", "<span>&uarr;</span>")
    mp.set("down", "<span>&darr;</span>")


    let random_cor = Math.floor(Math.random() * 16)
    // random_cor=12



    // gStart = allCoordinates[random_cor]
    // places[random_cor].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`

    // dEnd = allCoordinates[(random_cor + 7) % 16]
    // places[(random_cor + 7) % 16].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`

    //start alguarithm


    // firework
    let select_one = (x, y) => {
        let ran = Math.floor(Math.random() * 2)
        if (ran === 0) return x
        else return y
    }

    // console.log(select_one(4, 5))


    let canvas = document.querySelector('#canvas');
    let c = canvas.getContext('2d');
    let numberOfParticles = 200;
    let density = 5;
    let fireworkGravity = .3;
    let particlesGravity = .5;
    let explosionRadiusRange = { max: 3, min: -3 };
    let fireworkRandomXPathRange = { max: 3, min: -3 };
    let fireworkRadius = 6;
    let particlesLifespan = 10;
    let fireworksArrayLength = 50;
    let particleRadiusRange = { max: 3, min: 1 };
    let fireworkOnXaxis = 2;


    //-------------------------------



    initf();
    class Particle {
        constructor(x, y, firework, color) {
            this.x = x;
            this.y = y;
            this.lifeSpan = random(1000, 50);
            this.firework = firework;
            this.radius = random(particleRadiusRange.max, particleRadiusRange.min);
            this.color = color;
            // ; 
            if (this.firework) {
                this.vx = random(fireworkOnXaxis, -fireworkOnXaxis);
                this.vy = random(-10, -20);
                this.gravity = fireworkGravity;
            } else {
                this.vy = random(explosionRadiusRange.max, explosionRadiusRange.min); // firework radius on Y axis
                this.vx = random(explosionRadiusRange.max, explosionRadiusRange.min); //firework radius on X axis
                this.vy = this.vy * random(3, 2);
                this.vx = this.vx * random(3, 2);
                this.gravity = particlesGravity;
                if (random(600, 1) < 200) {
                    this.vx *= random(2, 1);
                    this.vy *= random(2, 1);
                }

            }

        }

        done() {
            if (this.lifeSpan < 0) {
                return true;
            } else {
                return false;
            }
        }

        draw() {
            //${this.lifeSpan/random(255,10)} the random number gives the particles sparkle effect
            circle(this.x, this.y, this.radius, `rgba(${this.color.red},${this.color.green},${this.color.blue},${this.lifeSpan / random(1000, 10)})`);
            // circle(this.x, this.y,this.radius, `rgba(${this.color.red},${this.color.green},${this.color.blue},${this.lifeSpan/255})` ); 
        }

        update() {
            this.y += this.vy;
            this.x += this.vx;
            this.vy += this.gravity;
            if (this.firework) {
                this.x += random(fireworkRandomXPathRange.max, fireworkRandomXPathRange.min);//Randomize the direction on X axis
                this.radius = random(fireworkRadius, fireworkRadius - fireworkRadius / 2);

            }
            if (!this.firework) {
                this.vy *= .9;
                this.vx *= .9;
                this.lifeSpan -= particlesLifespan;

                // this.vx += random(.5,-.5);
                // this.vy += random(.5,-.5);
                if (this.lifeSpan < 0) {
                    this.done();
                }
            }





        }
    }

    class Firework {
        constructor() {
            this.color = {
                red: random(255, 0),
                green: random(255, 0),
                blue: random(250, 0)
            };

            if (this.color.red <= 150 && this.color.green <= 150 && this.color.blue <= 150) {
                this.rgb = {
                    red: 255,
                    green: this.color.green,
                    blue: this.color.blue
                }
            } else {

                this.rgb = {
                    red: this.color.red,
                    green: 255,
                    blue: this.color.blue
                }
            }

            // random((canvas.width / 2) - 50, canvas.width / 2)
            this.firework = new Particle(select_one(random(20, canvas.width / 4) - 20, random(canvas.width * 3 / 4 + 20, canvas.width - 20)), canvas.height, true, {
                red: 255, green: 255, blue: 255
            });
            this.exploded = false;
            this.particles = [];
        }




        done() {
            if (this.exploded && this.particles.length === 0) {
                return true;

            } else {
                return false;
            }
        }

        explode() {
            for (let i = 0; i < numberOfParticles; i++) {
                this.particles.push(new Particle(this.firework.x, this.firework.y, false, this.rgb));
            }



        }


        update() {
            if (!this.exploded) {
                this.firework.draw();
                this.firework.update();


                if (this.firework.vy > 0) {
                    this.firework.vy = 0;
                    this.exploded = true;
                    this.explode();

                }

            }

            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].draw();
                this.particles[i].update();
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                    //this.done();
                }
            }



        }
    }

    let fireworks = [];

    function loop() {
        requestAnimationFrame(loop);
        // setInterval(loop, 50)
        c.fillStyle = "rgba(0,0,0,0.5)";
        c.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.round(random(0, 100)) < density) {
            fireworks.push(new Firework());
            // fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {

            fireworks[i].update();
            if (fireworks[i].done()) {
            }
        }


        if (fireworks.length >= fireworksArrayLength) {
            fireworks.splice(0, 1);

        }



    }

    window.addEventListener('resize', () => {
        initf();
    });


    // let interval = setInterval(loop, 24); 
    function random(max, min) {
        this.max = max;
        this.min = min;
        let x = Math.random() * (this.max - this.min) + this.min;
        return x;
    }
    function circle(x, y, radius, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;

        c.fillStyle = this.color;

        c.beginPath();

        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
    }
    function initf() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // end firework


    const del_from_arr = (arr, x) => {
        let new_arr = []
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] != x) new_arr.push(arr[i])
        }
        return new_arr
    }

    const generate_random = (l, r) => {
        return Math.floor(Math.random() * (r - l + 1)) + l
    }

    const select_random = (arr) => {
        return arr[generate_random(0, arr.length - 1)]
    }

    const sleep = ms => {
        return new Promise(resolve => setTimeout(() => resolve(), ms))
    }

    const find = (num, arr) => {
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] === num) return true
        }
        return false
    }
    //end alguarithm
    // console.log(select_random([0, 1, 2, 3]))
    // console.log(generate_random(2, 5))


    //start change select
    document.querySelectorAll("select").forEach((i, index) => {
        let selected = document.querySelectorAll(".selected")
        // console.log(selected)
        i.addEventListener("change", () => {
            if (i.value === "left") {
                selected[index].innerHTML = "<span>&larr;</span>"
            }
            else if (i.value === "up") {
                selected[index].innerHTML = "<span>&uarr;</span>"

            }
            else if (i.value === "right") {
                selected[index].innerHTML = "<span>&rarr;</span>"

            }
            else if (i.value === "down") {
                selected[index].innerHTML = "<span>&darr;</span>"

            }
        })
    })
    // end change select

    let init = () => {

        all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

        places.forEach(i => {
            i.innerHTML = ''
        })


        // music.play()
        // setInterval(() => {
        //     music.play()
        // }, 150000);


        if (task == 1) {
            initScore = 3
        }

        else if (task == 2) {
            initScore = 2

            f1_index = (random_cor + 10) % 16

            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`
        }

        else if (task == 3) {
            initScore = 3

            c1_index = (random_cor + 5) % 16
            cloud1 = allCoordinates[c1_index]
            places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`
        }

        else if (task == 4) {
            initScore = 1

            f1_index = (random_cor + 10) % 16
            f2_index = (random_cor + 20) % 16
            f3_index = (random_cor + 5) % 16


            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`

            flower2 = allCoordinates[f2_index]
            places[f2_index].innerHTML = `<img id="flower2" src="../assest/images/flower2.png" alt=""></img>`

            cloud1 = allCoordinates[f3_index]
            places[f3_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`
        }

        else if (task == 5) {
            initScore = 0

            f1_index = (random_cor + 10) % 16
            f2_index = (random_cor + 20) % 16
            f3_index = (random_cor + 30) % 16
            c1_index = (random_cor + 5) % 16
            c2_index = (random_cor + 15) % 16
            c3_index = (random_cor + 25) % 16



            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`

            flower2 = allCoordinates[f2_index]
            places[f2_index].innerHTML = `<img id="flower2" src="../assest/images/flower2.png" alt=""></img>`

            flower3 = allCoordinates[f3_index]
            places[f3_index].innerHTML = `<img id="flower3" src="../assest/images/flower1.png" alt=""></img>`

            cloud1 = allCoordinates[c1_index]
            places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`

            cloud2 = allCoordinates[c2_index]
            places[c2_index].innerHTML = `<img id="cloud2" src="../assest/images/Inkedcloud.png" alt=""></img>`

            cloud3 = allCoordinates[c3_index]
            places[c3_index].innerHTML = `<img id="cloud3" src="../assest/images/Inkedcloud.png" alt=""></img>`
        }

        else if (task == 6) {
            initScore = 3

            if (random_cor === 12) random_cor = 11
            g_index = random_cor
            d_index = (random_cor + 7) % 16

            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]
            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`
        }

        else if (task == 7) {
            initScore = 2

            g_index = wflower[random_cor % 4]
            d_index = Math.abs(wflower[random_cor % 4] - 15)

            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]

            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`

            all = del_from_arr(all, 5)
            all = del_from_arr(all, 6)
            all = del_from_arr(all, 9)
            all = del_from_arr(all, 10)

            all = del_from_arr(all, g_index)
            all = del_from_arr(all, d_index)

            f1_index = all[random_cor % 10]
            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`

        }

        else if (task == 8) {
            initScore = 3
            // console.log(it)

            if (!it) {

                it = generate_random(1, 2)

                if (it === 1) {
                    g_index = select_random([0, 1, 2, 3])
                    d_index = g_index + 12
                    c1_index = g_index + 4 * generate_random(1, 2)

                }

                else {
                    g_index = select_random([12, 13, 14, 15])
                    d_index = g_index - 12
                    c1_index = g_index - 4 * generate_random(1, 2)
                }
                // console.log(g_index, d_index, c1_index)

            }
            // else {

            // }



            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]

            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`

            cloud1 = allCoordinates[c1_index];
            // places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`;

            (async () => {
                while (1) {
                    if (!passed) places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    // console.log("1")
                    await sleep(generate_random(1, 5) * 1000)
                    places[c1_index].innerHTML = ""
                    // console.log("2")
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            // console.log(g_index, d_index, c1_index)
        }

        else if (task == 9) {
            initScore = 0
            // random_cor = 1
            if (random_cor === 0 || random_cor === 7 || random_cor === 1) random_cor += 2
            g_index = wflower[random_cor % 4]
            d_index = Math.abs(wflower[random_cor % 4] - 15)

            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]

            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`

            all = del_from_arr(all, 5)
            all = del_from_arr(all, 6)
            all = del_from_arr(all, 9)
            all = del_from_arr(all, 10)

            all = del_from_arr(all, g_index)
            all = del_from_arr(all, d_index)

            if (d_index === 0 || d_index === 12) {
                all = del_from_arr(all, d_index + 1)
                all = del_from_arr(all, d_index + 2)
                all = del_from_arr(all, d_index + 3)
            }
            else {
                all = del_from_arr(all, d_index - 1)
                all = del_from_arr(all, d_index - 2)
                all = del_from_arr(all, d_index - 3)
            }

            f1_index = all[random_cor % 7]

            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`

            all = del_from_arr(all, f1_index)

            f2_index = all[random_cor % 6]
            flower2 = allCoordinates[f2_index]
            places[f2_index].innerHTML = `<img id="flower2" src="../assest/images/flower2.png" alt=""></img>`

            all = del_from_arr(all, f2_index)

            f3_index = all[random_cor % 5]
            flower3 = allCoordinates[f3_index]
            places[f3_index].innerHTML = `<img id="flower3" src="../assest/images/flower1.png" alt=""></img>`

        }

        else if (task == 10) {
            initScore = 3
            if (!it) {
                it = generate_random(1, 2)

                d_index = select_random([0, 3, 12, 15])
                if (d_index === 0) {
                    c1_index = 1
                    c2_index = 4
                    c3_index = 6
                    g_index = 7
                }

                else if (d_index === 3) {
                    c1_index = 2
                    c2_index = 7
                    c3_index = 5
                    g_index = 4
                }

                else if (d_index === 12) {
                    c1_index = 8
                    c2_index = 13
                    c3_index = 10
                    g_index = 11
                }
                else if (d_index === 15) {
                    c1_index = 11
                    c2_index = 14
                    c3_index = 9
                    g_index = 8
                }
            }

            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]

            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`

            cloud1 = allCoordinates[c1_index];
            cloud2 = allCoordinates[c2_index];
            cloud3 = allCoordinates[c3_index];

            (async () => {
                while (1) {
                    if (!passed) places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c1_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            (async () => {
                while (1) {
                    if (!passed) places[c2_index].innerHTML = `<img id="cloud2" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c2_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            (async () => {
                while (1) {
                    if (!passed) places[c3_index].innerHTML = `<img id="cloud3" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c3_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            // console.log(g_index, d_index, c1_index)
        }

        else if (task == 11) {
            initScore = 1

            g_index = 0
            d_index = 15
            c1_index = 1
            c2_index = 4
            f1_index = 7
            f2_index = 6


            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]

            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`




            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`

            flower2 = allCoordinates[f2_index]
            places[f2_index].innerHTML = `<img id="flower2" src="../assest/images/flower2.png" alt=""></img>`


            cloud1 = allCoordinates[c1_index];
            cloud2 = allCoordinates[c2_index];

            (async () => {
                while (1) {
                    if (!passed) places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c1_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            (async () => {
                while (1) {
                    if (!passed) places[c2_index].innerHTML = `<img id="cloud2" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c2_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();
        }

        else if (task == 12) {
            initScore = 0

            g_index = 0
            d_index = 3
            c1_index = 7
            c2_index = 4
            c3_index = 5
            // c4_index = 2
            f1_index = 8
            f2_index = 12
            f3_index = 14

            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]

            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`




            flower1 = allCoordinates[f1_index]
            places[f1_index].innerHTML = `<img id="flower1" src="../assest/images/flower1.png" alt=""></img>`

            flower2 = allCoordinates[f2_index]
            places[f2_index].innerHTML = `<img id="flower2" src="../assest/images/flower2.png" alt=""></img>`

            flower3 = allCoordinates[f3_index]
            places[f3_index].innerHTML = `<img id="flower3" src="../assest/images/flower1.png" alt=""></img>`

            cloud1 = allCoordinates[c1_index];
            cloud2 = allCoordinates[c2_index];
            cloud3 = allCoordinates[c3_index];

            (async () => {
                while (1) {
                    if (!passed) places[c1_index].innerHTML = `<img id="cloud1" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c1_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            (async () => {
                while (1) {
                    if (!passed) places[c2_index].innerHTML = `<img id="cloud2" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c2_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();

            (async () => {
                while (1) {
                    if (!passed) places[c3_index].innerHTML = `<img id="cloud3" src="../assest/images/Inkedcloud.png" alt=""></img>`
                    await sleep(generate_random(1, 5) * 1000)
                    places[c3_index].innerHTML = ""
                    await sleep(generate_random(2, 4) * 1000)
                }
            })();


        }


        //g and d place
        if (task < 6) {

            g_index = random_cor
            d_index = (random_cor + 7) % 16

            gStart = allCoordinates[g_index]
            dEnd = allCoordinates[d_index]
            places[g_index].innerHTML = `<img id="start" src="../assest/images/gface.png" alt=""></img>`
            places[d_index].innerHTML = `<img id="end" src="../assest/images/dface.png" alt=""></img>`
            document.querySelector('.do').innerHTML = ""
        }

        else {
            document.querySelector('.do').innerHTML = ""
            for (let i = 0; i < num_of_movement; i++)document.querySelector('.do').innerHTML += `<div class="do-item"></div>`
        }


        moveX = gStart.x
        moveY = gStart.y
        place = 0
        movement = []

        // for (let i = 0; i < score; i++) {
        //     star[i].style.fill = "white"
        // }

        score = initScore;

        document.querySelectorAll("select").forEach(i => {
            i.value = 'left'
        })

        document.querySelectorAll(".selected").forEach(i => {
            i.innerHTML = "<span>&larr;</span>"
        })

        // console.log(g_index, " ", d_index, " ", f1_index, " ", f2_index, " ", f3_index)
        if_index = []
    }


    init()

    reset.addEventListener('click', init)

    start_btn.addEventListener('click', () => {
        start.style.display = "none";
        hint.style.display = "block";
    })



    close.addEventListener('click', () => {
        start.style.display = "none";
    })

    error_btn.addEventListener('click', () => {
        error.style.display = "none";
        init()
        music.play()

    });

    document.querySelectorAll("select").length === 1 ? (s1 = 0, s2 = 0) : (s1 = 0, s2 = 1)


    control.forEach(element => {
        element.addEventListener('click', () => {
            if (place < num_of_movement) {
                if (task > 5) {
                    if (element.attributes[1].value === 'while') {
                        document.querySelectorAll('.do .do-item')[place].innerHTML = `<div class="iw control_item">while ${mp.get(document.querySelectorAll("select")[s1].value)} : ${mp.get(document.querySelectorAll("select")[s1].value)}</div>`
                    }
                    else if (element.attributes[1].value === 'if') {
                        document.querySelectorAll('.do .do-item')[place].innerHTML = `<div class="iw control_item">if ${mp.get(document.querySelectorAll("select")[s2].value)} : ${mp.get(document.querySelectorAll("select")[s2].value)}</div>`
                    }
                    else document.querySelectorAll('.do .do-item')[place].innerHTML = element.outerHTML
                }
                else document.querySelector('.do').innerHTML += `<div class="do-item">${element.outerHTML}</div>`


                if (element.attributes[1].value === 'left') {
                    moveX -= 100;
                }

                else if (element.attributes[1].value === 'right') {
                    moveX += 100;
                }

                else if (element.attributes[1].value === 'up') {
                    moveY -= 100;
                }

                else if (element.attributes[1].value === 'down') {
                    moveY += 100;
                }

                else if (element.attributes[1].value === 'while') {


                    if (document.querySelectorAll("select")[s1].value === 'left') {
                        //t = 3
                        while (moveX >= 100) {
                            if ((cloud1 && moveX - 100 === cloud1.x && moveY === cloud1.y) ||
                                (cloud2 && moveX - 100 === cloud2.x && moveY === cloud2.y) ||
                                (cloud3 && moveX - 100 === cloud3.x && moveY === cloud3.y)) break;
                            moveX -= 100; movement.push({ moveX, moveY });
                        }
                    }

                    else if (document.querySelectorAll("select")[s1].value === 'right') {
                        //t = 3
                        while (moveX <= 200) {
                            if ((cloud1 && moveX + 100 === cloud1.x && moveY === cloud1.y) ||
                                (cloud2 && moveX + 100 === cloud2.x && moveY === cloud2.y) ||
                                (cloud3 && moveX + 100 === cloud3.x && moveY === cloud3.y)) break;
                            moveX += 100; movement.push({ moveX, moveY })
                        }
                    }

                    else if (document.querySelectorAll("select")[s1].value === 'up') {
                        //t = 3
                        while (moveY >= 100) {
                            if ((cloud1 && moveY - 100 === cloud1.y && moveX === cloud1.x) ||
                                (cloud2 && moveY - 100 === cloud2.y && moveX === cloud2.x) ||
                                (cloud3 && moveY - 100 === cloud3.y && moveX === cloud3.x)) break;
                            moveY -= 100; movement.push({ moveX, moveY })
                        }
                    }

                    else if (document.querySelectorAll("select")[s1].value === 'down') {
                        //t = 3
                        while (moveY <= 200) {
                            if ((cloud1 && moveY + 100 === cloud1.y && moveX === cloud1.x) ||
                                (cloud2 && moveY + 100 === cloud2.y && moveX === cloud2.x) ||
                                (cloud3 && moveY + 100 === cloud3.y && moveX === cloud3.x)) break;
                            moveY += 100; movement.push({ moveX, moveY })
                        }
                    }
                }

                else if (element.attributes[1].value === 'if') {

                    //document.querySelectorAll("select")[1].value
                    if (document.querySelectorAll("select")[s2].value === 'left') {
                        moveX -= 100;
                    }

                    else if (document.querySelectorAll("select")[s2].value === 'right') {
                        moveX += 100;
                    }

                    else if (document.querySelectorAll("select")[s2].value === 'up') {
                        moveY -= 100;
                    }

                    else if (document.querySelectorAll("select")[s2].value === 'down') {
                        moveY += 100;
                    }
                    if_index.push(movement.length)
                    // console.log({ moveX, moveY })
                }
                movement.push({ moveX, moveY })
            }
            place += 1

        })
    })



    //  places[c1_index].innerHTML = ""


    evaluate.addEventListener('click', () => {
        // console.log(if_index)
        //movement not complete
        if (task > 5 && document.querySelectorAll('.do-item .control_item').length < num_of_movement) {
            music.pause()
            audio_not_arrive.play();
            message.innerHTML = 'يجب عليك تعبئة كافة الحركات المحددة'
            error.style.display = "flex"
        }

        //movement complete
        else {
            (async () => {
                for (let i = 0; i < movement.length; i++) {
                    passed = false
                    if (find(i, if_index)) {
                        k = 0
                        for (let j = 0; j < allCoordinates.length; j += 1) {
                            if (movement[i].moveX === allCoordinates[j].x && movement[i].moveY === allCoordinates[j].y) { k = j; break }
                        }

                        if (document.querySelectorAll('.grid .place')[k].firstChild && document.querySelectorAll('.grid .place')[k].firstChild.attributes[1].value === "../assest/images/Inkedcloud.png") {
                            // console.log(document.querySelectorAll('.grid .place')[k].innerHTML)
                            while (1) {
                                if (document.querySelectorAll('.grid .place')[k].innerHTML == "") {
                                    document.getElementById('start').style.transform = `translate(${movement[i].moveX - gStart.x}px,${movement[i].moveY - gStart.y}px)`
                                    passed = true
                                    break
                                }
                                else await sleep(1000)
                            }
                        }
                        else { document.getElementById('start').style.transform = `translate(${movement[i].moveX - gStart.x}px,${movement[i].moveY - gStart.y}px)`; passed = true }

                    }
                    else document.getElementById('start').style.transform = `translate(${movement[i].moveX - gStart.x}px,${movement[i].moveY - gStart.y}px)`

                    // console.log(passed)
                    //cruch
                    if (
                        movement[i].moveX < 0 ||
                        movement[i].moveY < 0 ||
                        movement[i].moveX > 300 ||
                        movement[i].moveY > 300
                    ) {
                        music.pause()
                        audio_error.play();
                        message.innerHTML = 'حاول عدم الخروج عن حدود المتاهة'
                        await sleep(1000)
                        error.style.display = "flex"
                        break;
                    }

                    //arrive to flower
                    if (flower1 && movement[i].moveX === flower1.x && movement[i].moveY === flower1.y) {
                        score += 1
                        places[f1_index].innerHTML = ""
                    }
                    if (flower2 && movement[i].moveX === flower2.x && movement[i].moveY === flower2.y) {
                        score += 1
                        places[f2_index].innerHTML = ""
                    }
                    if (flower3 && movement[i].moveX === flower3.x && movement[i].moveY === flower3.y) {
                        score += 1
                        places[f3_index].innerHTML = ""
                    }


                    //arrive to cloud
                    if (!passed && (
                        (cloud1 && movement[i].moveX === cloud1.x && movement[i].moveY === cloud1.y) ||
                        (cloud2 && movement[i].moveX === cloud2.x && movement[i].moveY === cloud2.y) ||
                        (cloud3 && movement[i].moveX === cloud3.x && movement[i].moveY === cloud3.y)
                    )
                    ) {
                        music.pause()
                        audio_error.play();
                        message.innerHTML = 'حاول عدم الاستضام بالغيوم ابتعد عنها'
                        await sleep(1000)
                        error.style.display = "flex"
                        break;
                    }


                    //arrive or not arrive to daroen
                    if (i === movement.length - 1) {
                        if (movement[i].moveX === dEnd.x && movement[i].moveY === dEnd.y && (score > initScore || initScore === 3)) {
                            music.pause()
                            audio_success.play();
                            await sleep(1000)
                            for (let i = 0; i < score; i++) {
                                setTimeout(() => {
                                    star[i].style.fill = "#e47f20"
                                }, (i + 1) * 2000);
                            }
                            next.style.display = "flex"
                            canvas.style.display = 'flex'
                            audio_fire.play()
                            loop()

                        }

                        else if (movement[i].moveX === dEnd.x && movement[i].moveY === dEnd.y && score === initScore) {
                            music.pause()
                            audio_not_arrive.play();
                            message.innerHTML = 'حاول جمع بعض الأزهار لا تنسى'
                            await sleep(1000)
                            error.style.display = "flex"
                        }

                        else {
                            music.pause()
                            audio_not_arrive.play();
                            message.innerHTML = 'حاول ايصال غامبول الى داروين'
                            await sleep(1000)
                            error.style.display = "flex"
                        }
                    }
                    await sleep(1000)
                }
            })();
        }
    });

    // (async () => {
    //     while (1) {
    //         if (passed) console.log(1)
    //         else console.log(0)
    //         await sleep(500)
    //     }
    // })()

});

