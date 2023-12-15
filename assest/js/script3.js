window.addEventListener('load', () => {
    const inputs = document.querySelectorAll("input")
    const result = document.querySelector(".result")
    const figure = document.querySelector(".figure")



    //start audio
    const audio_error = document.createElement("audio");
    audio_error.src = "../assest/music/failure-drum-sound-effect-2-7184.mp3";

    const audio_success = document.createElement("audio");
    audio_success.src = "../assest/music/piglevelwin2mp3-14800.mp3";

    const audio_fire = document.createElement("audio");
    audio_fire.src = "../assest/music/firework-show-short-64657.mp3";

    const music = document.createElement("audio");
    music.src = "../assest/music/music3.mp3";
    //  music.autoplay = true;
    music.addEventListener('ended', () => {
        music.currentTime = 0
        music.play()
    })

    //end audio



    //start root var
    let root = document.querySelector(':root')
    let task = parseInt(getComputedStyle(root).getPropertyValue('--task'))
    //end root var

    //start button
    const reset = document.querySelector(".reset")
    const run = document.querySelector(".run")
    const start_btn = document.querySelector(".start .btn")
    const error_btn = document.querySelector(".error .btn")
    const message = document.getElementById('message')
    // const help_btn = document.querySelector(".help .btn")
    // const hint_btn = document.querySelector(".hint")

    //end button

    let code, l, v;
    let solve = []

    //start algo


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



    const sleep = ms => {
        return new Promise(resolve => setTimeout(() => resolve(), ms))
    }
    let compile_python = (code, out) => {

        Sk.configure({
            output: (text) => {
                // output += text
                // console.log(text)
                out.textContent += text
            },
            execLimit: 1000
        });
        Sk.misceval.asyncToPromise(() => {
            return Sk.importMainWithBody("<stdin>", false, code, true);
        }).catch((err) => {
            if (err instanceof Sk.builtin.TimeLimitError) { out.innerHTML = "يوجد حلقة غير منتهية" }
            else out.innerHTML = "الكود خاطىء"
        });
    }

    let isNum = (i) => {
        return !isNaN(i) && i !== ""
    }

    let isL_op = (i) => {
        return i === '>' || i === '<' || i === '=='
    }

    let isVar = (i) => {
        if (task === 1) {
            return i === 'length' || i === 'width' || i === 'area'
        }
        else if (task === 2) {
            return i === 'r' || i === 'area'

        }
        else if (task === 3) {
            return i === 'base' || i === 'height' || i === 'area'
        }
        else if (task === 5) {
            return i === 'number' || i === 'i'

        }
    }


    let isM_op = (i) => {
        return i === '+' || i === '-' || i === '*' || i === '/'
    }

    let isComplete = () => {
        for (let i = 0; i < inputs.length; i += 1) {
            if (inputs[i].value === "") return false
        }
        return true
    }


    let isLogic = () => {
        if (task === 1) {
            if (!isNum(inputs[0].value)) {
                return [false, " في السطر الاول طول المستطيل يجب ان يكون رقم"]
            }

            if (!isNum(inputs[1].value)) {
                return [false, " في السطر الثاني عرض المستطيل يجب ان يكون رقم"]
            }

            if (!isM_op(inputs[2].value)) {
                return [false, " في السطر الثالث يجب ادخال عملية حسابية مثل الضرب"]
            }

            if (!isVar(inputs[3].value)) {
                return [false, "في السطر الرابع يجب أن ادخال اسم المتغير صحيح"]
            }
            return [true]
        }
        else if (task === 2) {
            if (!isNum(inputs[0].value)) {
                return [false, " في السطر الاول نصف قطر الدائرة يجب ان يكون رقم"]
            }

            if (!isM_op(inputs[1].value)) {
                return [false, " في السطر الثاني يجب ادخال عملية حسابية مثل الضرب"]
            }

            if (!isVar(inputs[2].value)) {
                return [false, "في السطر الثالث يجب أن ادخال اسم المتغير صحيح"]
            }
            return [true]
        }
        else if (task === 3) {
            if (!isNum(inputs[0].value)) {
                return [false, " في السطر الاول طول قاعدة المثلث يجب ان يكون رقم"]
            }

            if (!isNum(inputs[1].value)) {
                return [false, " في السطر الثاني ارتفاع المثلث يجب ان يكون رقم"]
            }

            if (!isM_op(inputs[2].value)) {
                return [false, " في السطر الثالث يجب ادخال عملية حسابية مثل الضرب"]
            }

            if (!isVar(inputs[3].value)) {
                return [false, "في السطر الرابع يجب أن ادخال اسم المتغير صحيح"]
            }
            return [true]
        }
        else if (task === 4) {
            if (!isNum(inputs[0].value)) {
                return [false, " في السطر الاول عمر داروين يجب ان يكون رقم"]
            }

            if (!isNum(inputs[1].value)) {
                return [false, " في السطر الثاني عمر غامبول يجب ان يكون رقم"]
            }

            if (!isL_op(inputs[2].value)) {
                return [false, " في السطر الثالث يجب ادخال عملية مقارنة مثل > (اكبر) "]
            }

            if (!isL_op(inputs[3].value)) {
                return [false, " في السطر الخامس يجب ادخال عملية مقارنة مثل > (اكبر) "]
            }

            return [true]
        }
        else if (task === 5) {
            if (!isNum(inputs[0].value)) {
                return [false, " في السطر الاول طول حلقة التكرار يجب ان يكون رقم"]
            }

            if (!isVar(inputs[1].value)) {
                return [false, "في السطر الرابع يجب أن ادخال اسم المتغير صحيح"]
            }

            if (!isNum(inputs[2].value)) {
                return [false, " في السطر السادس عملية الزيادة يجب ان يكون رقم"]
            }

            return [true]
        }
    }

    let compile = () => {
        if (task === 1) {
            code =
                `
length=${inputs[0].value}
width=${inputs[1].value}
area=length ${inputs[2].value} width
print(" مساحة المستطيل تساوي :    ")
print(${inputs[3].value})
`
            // console.log(code)

        }
        else if (task === 2) {
            code =
                `
r=${inputs[0].value}
area=r ${inputs[1].value} 3.14
print(" مساحة الدائرة تساوي :    ")
print(${inputs[2].value})
`
        }

        else if (task === 3) {
            code =
                `
base=${inputs[0].value}
height=${inputs[1].value}
area=(base * height)${inputs[2].value} 2
print(" مساحة المثلث تساوي :    ")
print(${inputs[3].value})
`
            // console.log(code)

        }

        else if (task === 4) {
            code =
                `
darwen_age=${inputs[0].value}
gambal_age=${inputs[1].value}
if darwen_age ${inputs[2].value} gambal_age  :
   print(" داروين اكبر من غامبول    ")
elif darwen_age ${inputs[3].value} gambal_age  :
   print(" غامبول أكبر من داروين    ")
else : print("${inputs[4].value}")
`
            // console.log(code)
        }

        else if (task === 5) {
            if (inputs[0].value >= 100) inputs[0].value = 6
            code =

                `
number=${inputs[0].value}
i=0
print("بدأت الحلقة")
while i < ${inputs[1].value} :
   print(i)
   i+=${inputs[2].value}
print("انتهت الحلقة")
`
            console.log(code)

        }

        result.innerHTML = ""
        compile_python(code, result)
    }


    inputs.forEach(i => {
        i.addEventListener("input", () => {
            result.innerHTML = ""
            if (isComplete() && isLogic()[0]) {
                compile()
            }
        })
    })

    let isValid = () => {
        if (task === 1) {
            if (inputs[0].value <= 2) {
                return [false, " في السطر الاول طول المستطيل يجب ان يكون مناسب حتى يحجز الغيمة عن غامبول"]
            }

            if (inputs[0].value >= 5) {
                return [false, " في السطر الاول طول المستطيل يجب ان يكون مناسب حتى يحجز الغيمة عن غامبول"]
            }

            if (inputs[1].value <= 1) {
                return [false, " في السطر الثاني عرض المستطيل يجب ان يكون مناسب حتى يحجز الغيمة بعيدا عن داروين"]
            }

            if (inputs[1].value >= 3) {
                return [false, " في السطر الثاني عرض المستطيل يجب ان يكون مناسب حتى يحجز الغيمة بعيدا عن داروين"]
            }

            if (inputs[2].value !== '*') {
                return [false, " في السطر الثالث يجب ادخال عملية الضرب لأننا نريد حساب مساحة المستطيل ومساحة المستطيل تساوي الطول ضرب العرض"]
            }

            if (inputs[3].value !== 'area') {
                return [false, "في السطر الرابع يجب أن يكون اسم المتغير هو area لأننا نريد طباعة مساحة المستطيل فقط"]
            }
            return [true]
        }
        else if (task === 2) {
            if (inputs[0].value <= 2) {
                return [false, " في السطر الاول نصف قطر الدائرة يجب ان يكون مناسب حتى يحجز الغيمة عن غامبول"]
            }

            if (inputs[0].value >= 5) {
                return [false, " في السطر الاول نصف قطر الدائرة يجب ان يكون مناسب حتى يحجز الغيمة عن غامبول"]
            }

            if (inputs[1].value !== '*') {
                return [false, " في السطر الثاني يجب ادخال عملية الضرب لأننا نريد حساب مساحة الدائرة ومساحة الدائرة تساوي 3,14 ضرب نصف قطر الدائرة"]
            }

            if (inputs[2].value !== 'area') {
                return [false, "في السطر الرابع يجب أن يكون اسم المتغير هو area لأننا نريد طباعة مساحة الدائرة فقط"]
            }
            return [true]
        }
        else if (task === 3) {
            if (inputs[0].value <= 5) {
                return [false, " في السطر الاول طول قاعدة المثلث يجب ان يكون مناسب حتى يحجز الغيمة عن غامبول"]
            }

            if (inputs[0].value >= 10) {
                return [false, " في السطر الاول طول ارتفاع المثلث يجب ان يكون مناسب حتى يحجز الغيمة عن غامبول"]
            }

            if (inputs[1].value <= 2) {
                return [false, " في السطر الثاني عرض المستطيل يجب ان يكون مناسب حتى يحجز الغيمة بعيدا عن داروين"]
            }

            if (inputs[2].value !== '/') {
                return [false, " في السطر الثالث يجب ادخال عملية القسمة لأن مساحة المثلث تساوي طول القاعدة ضرب الارتفاع على 2"]
            }

            if (inputs[3].value !== 'area') {
                return [false, "في السطر الخامس يجب أن يكون اسم المتغير هو area لأننا نريد طباعة مساحة الدائرة فقط"]
            }
            return [true]
        }
        else if (task === 4) {
            console.log(inputs[2].value)
            if (inputs[2].value !== '>') {
                return [false, " في السطر الثالث يجب ان يكون عمر داروين اكبر من عمر غامبول"]
            }

            if (inputs[3].value !== '<') {
                return [false, " في السطر الخامس يجب ان يكون عمر غامبول اصغر من عمر داروين "]
            }

            return [true]
        }
        else if (task === 5) {
            if (inputs[0].value !== '6') {
                return [false, " في السطر الاول يجب ان يكون طول الحلقة مناسب لطباعة الاعداد من 0 وحتى 5"]
            }

            if (inputs[1].value !== 'number') {
                return [false, " في السطر الرابع يجب ادخال اسم المتغير الصحيح"]
            }

            if (inputs[2].value !== '1') {
                return [false, " في السطر السادس يجب ادخال الرقم 1 لأننا نريد طباعة الاعداد بحيث يكون الفرق بين اي عددين متتالين هو 1"]
            }

            return [true]
        }
    }

    //end algo



    //stat change figure
    if (task == 1) {
        console.log(task)
        inputs[0].addEventListener("input", () => {
            figure.style.width = `${100 * inputs[0].value}px`
        })
        inputs[1].addEventListener("input", () => {
            figure.style.height = `${100 * inputs[1].value}px`
        })
    }
    else if (task == 2) {
        console.log(task)
        inputs[0].addEventListener("input", () => {
            figure.style.width = `${100 * inputs[0].value}px`
            figure.style.height = `${100 * inputs[0].value}px`

        })
    }
    else if (task == 3) {
        console.log(task)
        var triangle = document.getElementById("triangle");
        var triangleBase = document.querySelectorAll("input")[0].value * 100 || 100;
        var triangleHeight = document.querySelectorAll("input")[1].value * 100 || 100;
        // console.log(triangleBase, triangleHeight)

        inputs[0].addEventListener("input", () => {
            var triangleBase = document.querySelectorAll("input")[0].value * 100 || 100;
            var triangleHeight = document.querySelectorAll("input")[1].value * 100 || 100;
            // console.log(triangleBase, triangleHeight)
            triangle.setAttribute("points", "200,50 " + (200 + triangleBase / 2) + "," + (50 + triangleHeight) + " " + (200 - triangleBase / 2) + "," + (50 + triangleHeight));
        })
        inputs[1].addEventListener("input", () => {
            var triangleBase = document.querySelectorAll("input")[0].value * 100 || 100;
            var triangleHeight = document.querySelectorAll("input")[1].value * 100 || 100;
            // console.log(triangleBase, triangleHeight)
            triangle.setAttribute("points", "200,50 " + (200 + triangleBase / 2) + "," + (50 + triangleHeight) + " " + (200 - triangleBase / 2) + "," + (50 + triangleHeight));
        })

    }
    //end change figure

    let init = () => {
        result.innerHTML = ""
        music.autoplay = true;
        inputs.forEach(i => {
            i.value = ""
        })

    }
    init()


    //start handle btn
    reset.addEventListener("click", () => {
        init()
    })

    run.addEventListener("click", () => {
        // console.log(isLogic()[0])
        if (isComplete()) {
            l = isLogic()
            if (l[0]) {
                v = isValid()
                if (v[0]) {
                    (async () => {
                        music.pause()
                        audio_success.play()
                        await sleep(2000)
                        document.querySelector(".next").style.display = "flex"
                        canvas.style.display = 'flex'
                        loop()
                        audio_fire.play()
                    })()
                }

                else {
                    message.innerHTML = v[1]
                    document.querySelector(".error").style.display = "flex"
                    music.pause()
                    audio_error.play()
                }
            }

            else {
                message.innerHTML = l[1]
                document.querySelector(".error").style.display = "flex"
                music.pause()
                audio_error.play()            }
        }
        else {
            message.innerHTML = "يجب عليك ملأ جميع الفراغات"
            document.querySelector(".error").style.display = "flex"
            music.pause()
            audio_error.play()
        }

    })


    start_btn.addEventListener("click", () => {
        document.querySelector(".start").style.display = "none"
    })


    error_btn.addEventListener("click", () => {
        document.querySelector(".error").style.display = "none"
        music.play()
    })

    // help_btn.addEventListener("click", () => {
    //     document.querySelector(".help").style.display = "none"
    // })

    // hint_btn.addEventListener("click", () => {
    //     document.querySelector(".help").style.display = "block"
    // })

    //end  handle btn

})
