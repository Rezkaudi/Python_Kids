window.addEventListener('load', () => {
    let code = document.getElementById('code')
    let boxs = document.querySelectorAll('.box')
    let drag = null

    let hint = document.querySelector(".hint");
    let help = document.querySelector(".question-hint");
    let evaluate = document.querySelector(".evaluate");
    let delete_all = document.querySelector(".delete");
    const arrow = document.getElementById('arrow')
    let solver = new Array()
    let k_solution = new Array()
    let all_drag = new Array()
    let complete
    const codeing = document.getElementById("code")
    const run = document.querySelector(".run")
    const outputing = document.getElementById("output");


    //start root var
    let root = document.querySelector(':root')
    let task = parseInt(getComputedStyle(root).getPropertyValue('--task'))
    //end root var


    let t = '&#9745;'
    let f = '&#9746;'
    let space = '&emsp;'
    const parser = new DOMParser()
    t = parser.parseFromString(t, 'text/html')
    f = parser.parseFromString(f, 'text/html')
    space = parser.parseFromString(space, 'text/html')

    let task1 = [`print`, `(`, `"`, `ANY`, `"`, `)`]
    let task2 = [`print`, `(`, `NUM`, `)`]
    let task3 = [`VAR`, `=`, `N_S`, `print`, `(`, `VAR`, `)`]
    let task4 = [`VAR`, `=`, `NUM`, `M_OP`, `NUM`, `print`, `(`, `VAR`, `)`]
    let task5 = [`VAR`, `=`, `NUM`, `VAR`, `=`, `NUM`, `VAR`, `=`, `VAR`, `M_OP`, `VAR`, `print`, `(`, `VAR`, `)`]
    let task6 = [`VAR`, `=`, `NUM`, `VAR`, `C_OP`, `NUM`, `print`, `(`, `VAR`, `)`]

    let task7 = [`VAR`, `=`, `5`, `if`, `VAR`, `==`, `5`, `:`, `print`, `(`, `"x=5"`, `)`]
    let task8 = [`VAR`, `=`, `10`, `if`, `VAR`, `&gt;`, `8`, `:`, `print`, `(`, `"ممتاز"`, `)`, `else`, `:`, `print`, `(`, `"جيد"`, `)`]

    let task9 = [`VAR`, `=`, `0`, `while`, `VAR`, `&lt;`, `5`, `:`, `print`, `(`, `"غامبول"`, `)`, `VAR`, `+=`, `1`]
    let task10 = [`x`, `=`, `5`, `while`, `x`, `&gt;`, `0`, `:`, `print`, `(`, `x`, `)`, `x`, `-=`, `1`]


    if (task === 1) solver = task1
    else if (task === 2) solver = task2
    else if (task === 3) solver = task3
    else if (task === 4) solver = task4
    else if (task === 5) solver = task5
    else if (task === 6) solver = task6
    else if (task === 7) solver = task7
    else if (task === 8) solver = task8
    else if (task === 9) solver = task9
    else if (task === 10) solver = task10



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
    let density = 8;
    let fireworkGravity = .3;
    let particlesGravity = .5;
    let explosionRadiusRange = { max: 3, min: -3 };
    let fireworkRandomXPathRange = { max: 3, min: -3 };
    let fireworkRadius = 6;
    let particlesLifespan = 15;
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

    let isN_S = (i) => {
        return !isNaN(i) || i[0] === '"'
    }
    let isNum = (i) => {
        return !isNaN(i)
    }

    let isVar = (i) => {
        return i[0] !== `"` && i !== 'print' && !isL_op(i)
    }


    let isM_op = (i) => {
        return i === '+' || i === '-' || i === '*' || i === '/'
    }



    let isC_op = (i) => {
        return i === '+=' || i === '-=' || i === '*=' || i === '/='
    }


    let isL_op = (i) => {
        return i === '&lt;' || i === '&gt;' || i === '=='
    }




    let shuffleArray = (arr) => {
        const l = arr.length
        for (let i = 0; i < l; i++) {
            const rand = Math.floor(Math.random() * l)
            const current_item = arr[i]
            const random_item = arr[rand]
            arr[i] = random_item
            arr[rand] = current_item
        }
        return arr
    }

    const sleep = ms => {
        return new Promise(resolve => setTimeout(() => resolve(), ms))
    }


    // console.log()



    let Parser = (arr) => {
        for (let i = 0; i < solver.length; i += 1) {
            if (solver[i] === "ANY") continue
            if (solver[i] === "NUM" && isNum(arr[i])) continue
            if (solver[i] === "M_OP" && isM_op(arr[i])) continue
            if (solver[i] === "L_OP" && isL_op(arr[i])) continue
            if (solver[i] === "C_OP" && isC_op(arr[i])) continue
            if (solver[i] === "N_S" && isN_S(arr[i])) continue


            if (solver[i] === "VAR" && isVar(arr[i])) {
                if (task === 3 && arr[0] === arr[5]) continue
                if (task === 4 && arr[0] === arr[7]) continue
                if (task === 5 &&
                    (arr[0] === arr[8] || arr[0] === arr[10]) &&
                    (arr[3] === arr[8] || arr[3] === arr[10]) &&
                    (arr[6] === arr[13])
                ) continue
                if (task === 6 && arr[0] === arr[3] && arr[0] === arr[8]) continue

                if (task === 7 && arr[0] === arr[4]) continue
                if (task === 8 && arr[0] === arr[4]) continue

                if (task === 9 && arr[0] === arr[4] && arr[0] === arr[12]) continue
            }

            if (solver[i] !== arr[i]) return false
        }

        return true
    }


    let helper = async () => {
        let h = document.querySelectorAll('.list .box')
        document.querySelectorAll('.list .box').forEach((i, index) => {
            if (i.innerHTML === "") {
                i.dataset.a = f.body.innerHTML
                i.style.setProperty('--clr', 'red')
            }
            else if (
                (solver[index] === "ANY") ||
                (solver[index] === "NUM" && isNum(i.children[0].innerHTML)) ||
                (solver[index] === "M_OP" && isM_op(i.children[0].innerHTML)) ||
                (solver[index] === "L_OP" && isL_op(i.children[0].innerHTML)) ||
                (solver[index] === "C_OP" && isC_op(i.children[0].innerHTML)) ||
                (solver[index] === "N_S" && isN_S(i.children[0].innerHTML))
            ) {
                i.dataset.a = t.body.innerHTML
                i.style.setProperty('--clr', 'green')
            }

            // i.children[0].innerHTML

            else if (solver[index] === "VAR" && isVar(i.children[0].innerHTML)) {
                if (
                    (task === 3 && index === 5 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||
                    (task === 4 && index === 7 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||

                    (task === 5 && index === 3 && h[0].children[0] && i.children[0].innerHTML === h[0].children[0].innerHTML) ||
                    (task === 5 && index === 6 && h[0].children[0] && i.children[0].innerHTML === h[0].children[0].innerHTML) ||
                    (task === 5 && index === 6 && h[3].children[0] && i.children[0].innerHTML === h[3].children[0].innerHTML) ||
                    (task === 5 && index === 13 && h[6].children[0] && i.children[0].innerHTML !== h[6].children[0].innerHTML) ||

                    (task === 6 && index === 3 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||
                    (task === 6 && index === 8 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||

                    (task === 7 && index === 4 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||
                    (task === 8 && index === 4 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||

                    (task === 9 && index === 4 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) ||
                    (task === 9 && index === 12 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML)

                ) {
                    i.dataset.a = f.body.innerHTML
                    i.style.setProperty('--clr', 'red')
                }



                else if (task === 5 && index === 8 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) {
                    if (h[3].children[0] && i.children[0].innerHTML !== h[3].children[0].innerHTML) {
                        i.dataset.a = f.body.innerHTML
                        i.style.setProperty('--clr', 'red')
                    }
                    else {
                        i.dataset.a = t.body.innerHTML
                        i.style.setProperty('--clr', 'green')
                    }
                }

                else if (task === 5 && index === 10 && h[0].children[0] && i.children[0].innerHTML !== h[0].children[0].innerHTML) {
                    if (h[3].children[0] && i.children[0].innerHTML !== h[3].children[0].innerHTML) {
                        i.dataset.a = f.body.innerHTML
                        i.style.setProperty('--clr', 'red')
                    }
                    else {
                        i.dataset.a = t.body.innerHTML
                        i.style.setProperty('--clr', 'green')
                    }
                }



                else {
                    i.dataset.a = t.body.innerHTML
                    i.style.setProperty('--clr', 'green')
                }

            }



            else if (solver[index] !== i.children[0].innerHTML) {
                i.dataset.a = f.body.innerHTML
                i.style.setProperty('--clr', 'red')
            }
            else {
                i.dataset.a = t.body.innerHTML
                i.style.setProperty('--clr', 'green')
            }
        })



        // "☒"   "☑"

        await sleep(5000)
        document.querySelectorAll('.list .box').forEach(i => {
            i.dataset.a = ""
        })



    }



    let compile_python = (code, out) => {

        Sk.configure({
            output: (text) => {
                // output += text
                out.innerHTML += text
            },
            execLimit: 2000
        });
        Sk.misceval.asyncToPromise(() => {
            return Sk.importMainWithBody("<stdin>", false, code, true);
        }).catch((err) => {
            if (err instanceof Sk.builtin.TimeLimitError) { out.innerHTML = "يوجد حلقة غير منتهية" }
            else out.innerHTML = "الكود خاطىء"
        });
    }

    // console.log()


    // end alguarithm


    document.querySelectorAll(".drag .box .item").forEach(i => {
        all_drag.push(i.innerHTML)
    })
    all_drag = shuffleArray(all_drag)



    //start audio
    const audio_error = document.createElement("audio");
    audio_error.src = "../assest/music/wah-wah-sad-trombone-6347.mp3";

    const audio_success = document.createElement("audio");
    audio_success.src = "../assest/music/piglevelwin2mp3-14800.mp3";

    const audio_fire = document.createElement("audio");
    audio_fire.src = "../assest/music/firework-show-short-64657.mp3";

    const music = document.createElement("audio");
    music.src = "../assest/music/music2.mp3";
    music.autoplay = true;

    music.addEventListener('ended', () => {
        music.currentTime = 0
        music.play()
    })

    audio_fire.addEventListener('ended', () => {
        audio_fire.currentTime = 0
        audio_fire.play()
    })

    //end audio




    // strat ui

    let start_btn = document.querySelector(".start-btn");
    // let close_btn = document.querySelector(".close");
    let error_btn = document.getElementById("complete")

    let start = document.querySelector(".start");
    let next = document.querySelector(".next");
    let error = document.querySelector(".error");

    delete_all.addEventListener('click', () => {
        init()
    })

    // close_btn.addEventListener('click', () => {
    //     start.style.display = "none";
    //     help.style.display = "block"
    // })

    start_btn.addEventListener('click', () => {
        start.style.display = "none";
        help.style.display = "block"
    })

    error_btn.addEventListener('click', () => {
        error.style.display = "none";
        if (complete) init()
    })


    hint.addEventListener('click', () => {
        helper()
    })

    run.addEventListener('click', () => {
        outputing.innerHTML = ""
        let code_copy = codeing.innerHTML.replace(/<br>/gi, "\u000A")
        code_copy = code_copy.replace(/ /gi, "  ")
        code_copy = code_copy.replace(/&lt;/gi, "<")
        code_copy = code_copy.replace(/&gt;/gi, ">")

        // code_copy.toString()
        console.log(code_copy)
        // console.log(space.body.innerHTML)
        compile_python(code_copy, outputing)
    })

    // end ui





    let dragItem = () => {
        let items = document.querySelectorAll('.item')
        items.forEach(item => {
            item.addEventListener('dragstart', () => {
                drag = item
                item.style.opacity = '0.7'
            })

            item.addEventListener('dragend', () => {
                drag = null
                item.style.opacity = '1'
            })

            boxs.forEach((box) => {
                box.addEventListener('dragover', (e) => {
                    e.preventDefault()
                    box.style.background = '#8AD8DA'
                    box.style.color = '#fff'

                })

                box.addEventListener('dragleave', () => {
                    box.style.background = "transparent"
                    box.style.color = '#f00'
                })

                box.addEventListener('drop', () => {
                    if (box.innerHTML === "" || box.innerHTML.length === 30) box.append(drag)
                    box.style.background = 'transparent'
                    box.style.color = '#e47f20'
                })


            })

        })
    }

    //display code

    setInterval(() => {
        code.innerHTML = ""
        for (let i = 0; i < document.querySelectorAll('.list').length; i += 1) {
            // console.log(document.querySelectorAll('.list')[i].children[0].outerHTML)
            let solution = document.querySelectorAll(`.list:nth-child(${2 + i}) .box .item`)
            if (document.querySelectorAll('.list')[i].children[0].outerHTML == "<span> </span>") {
                // console.log("hhhhh")
                code.innerHTML += space.body.innerHTML
            }

            solution.forEach(j => {
                code.innerHTML += j.innerHTML + " "
            })
            if (i + 1 !== document.querySelectorAll('.list').length) code.innerHTML += "<br>"
        }
        if (document.querySelectorAll('.list .box').length === document.querySelectorAll('.list .box .item').length) arrow.style.display = "block"
        else arrow.style.display = "none"

    }, 500)

    //end display code




    //start evaluate

    evaluate.addEventListener("click", () => {
        (async () => {
            k_solution = [], l = 0
            document.querySelectorAll('.list .box .item').forEach(i => {
                k_solution.push(i.innerHTML)
                l += 1
            })

            // console.log(Parser(k_solution))

            //complete all cell
            if (l === document.querySelectorAll('.list .box').length) {
                complete = true
                if (Parser(k_solution)) {
                    music.pause()
                    audio_success.play();
                    await sleep(2000)
                    next.style.display = "flex";

                    canvas.style.display = 'flex'
                    loop()

                    audio_fire.play()

                }

                else {
                    music.pause()
                    audio_error.play();
                    await sleep(1000)
                    error.style.display = "flex";
                }
            }


            //not complete all cell

            else {
                complete = false
                await sleep(1000)
                document.querySelector(".error #title").innerHTML = `لقد نسيت بعض الاماكن فارغة`
                document.querySelector(".error #message").innerHTML = `حاول ملأ جميع الاماكن المربعات الفارغة الموجودة على اليسار لتشكل هذا الكود  :`
                error.style.display = "flex";
            }
        })()
    })

    //end evaluate




    // firework

    //  end firework



    let init = () => {

        document.querySelectorAll('.drag .box').forEach((item, index) => {
            item.innerHTML = `<p class="item" draggable="true">${all_drag[index]}</p>`
        })

        document.querySelectorAll('.list .box').forEach(item => {
            item.innerHTML = ""
        })



        music.play()
        dragItem()


    }

    init()


})
