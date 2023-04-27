let code = document.getElementById('code')
let boxs = document.querySelectorAll('.box')
let drag = null
let solve = document.getElementById("solve")
let next = document.querySelector(".next");
let error = document.querySelector(".error");
let hint = document.querySelector(".hint");

// let audio_success = document.querySelector(".audio-success");
// let audio_fire = document.querySelector(".audio-fire");
// let audio_error = document.querySelector(".audio-error")
let help = document.querySelector(".help");
let solver = new Array()

document.querySelectorAll(".help span").forEach(item => {
    solver.push(item.innerHTML)
})


let complete = document.getElementById("complete")
let full = false;


const audio_error = document.createElement("audio");
audio_error.src = "././assist/music/wah-wah-sad-trombone-6347.mp3";

const audio_success = document.createElement("audio");
audio_success.src = "./assist/music/piglevelwin2mp3-14800.mp3";

const audio_fire = document.createElement("audio");
audio_fire.src = "./assist/music/firework-show-short-64657.mp3";

let dragItem = () => {
    let items = document.querySelectorAll('.item')
    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            drag = item
            item.style.opacity = '0.7'
            // item.style.borderRadius= "20px";


        })

        item.addEventListener('dragend', () => {
            drag = null
            item.style.opacity = '1'
        })


        boxs.forEach((box) => {
            // console.log(box.innerHTML)
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
                if (box.innerHTML === "" || box.innerHTML.length === 22) box.append(drag)
                box.style.background = 'transparent'
                box.style.color = '#e47f20'
            })


        })

    })


}
// setInterval(() => {
//     code.innerHTML = " "
//     solution.forEach(sol => {
//         code.innerHTML += sol.innerHTML
//     })
// }, 2000)


dragItem()
setInterval(() => {
    let solution = document.querySelectorAll('.list .box .item')
    if (solution.length === solver.length) full = true;
    code.innerHTML = ""
    solution.forEach(sol => {
        code.innerHTML += sol.innerHTML
    })


    if (code.innerHTML === solve.innerHTML) {
        console.log("yes");
        next.style.display = "flex";
        if (t) audio_success.play();
        t = false;
        setTimeout(() => {
            audio_fire.play();
            // document.getElementById("canvas").style.zIndex = "9999999"
        }, 3000)


    }
    else if (full) {
        console.log("no");
        error.style.display = "flex";
        // audio_error = document.querySelector(".audio-error")
        // audio_error.setAttribute("autoplay", "");
        if (t) audio_error.play();
        t = false;


    }

}, 1000)
// let items = document.querySelectorAll('.drag .dotted .item');
// for (let i = 0; i < items.length; i++) {
//     if (items[i].innerHTML === solver[0]) {
//         console.log("yes")
//         break;
//     }
// }

hint.addEventListener('click', () => {
    var b = false;
    for (var i = 0; i < solver.length; i++) {
        var items1 = document.querySelectorAll('.drag .dotted .item');
        for (var j = 0; j < items1.length; j++) {
            if (items1[j].innerHTML === solver[i]) {
                b = true;
                break;
            }
            // j += 1;
        }
        if (b) {
            var items2 = document.querySelectorAll('.list .dotted');
            //add
            // var r = items2[i].innerHTML.length === 22 ? false : items2[i].innerHTML;
            var r = items2[i].innerHTML;
            items2[i].innerHTML = `<p class="item" draggable="true">${solver[i]}</p>`
            // remove
            // if (r === false)items1[j].innerHTML
            // else items1[j].innerHTML = r;
            // console.log(solver[1])
            items1[j].parentElement.innerHTML = r;
            // items1[j].innerHTML = ""
            b = false;
            dragItem()
            break;
        }
    }
})

// ------------------------------------------------
let close = document.querySelector(".close");
let start_btn = document.querySelector(".start-btn");
let start = document.querySelector(".start");
let t = true;
// console.log(close)


close.addEventListener('click', () => {
    start.style.display = "none";
    setTimeout(() => {
        help.style.left = "10vh"
    }, 3000)

    setInterval(() => {
        setTimeout(() => {
            help.style.left = "10vh"
        }, 0)

        setTimeout(() => {
            help.style.left = "-100%"
        }, 15000)

    }, 25000)
}
)

start_btn.addEventListener('click', () => {
    start.style.display = "none";
    setTimeout(() => {
        help.style.left = "10vh"
    }, 3000)

    setInterval(() => {
        setTimeout(() => {
            help.style.left = "10vh"
        }, 0)

        setTimeout(() => {
            help.style.left = "-100%"
        }, 15000)

    }, 25000)
}
)

complete.addEventListener('click', () => {
    // audio_error = document.querySelector(".audio-error")
    // audio_error.removeAttribute("autoplay");
    console.log('jj')
    t = true;
    full = false;
    error.style.display = "none";
    let del = document.querySelectorAll('.list .box')
    let add = document.querySelectorAll('.drag .box')
    let vector = new Array;
    del.forEach(i => {
        // console.log(i.innerHTML)
        if (i.innerHTML != '') {
            vector.push(i.innerHTML)
            i.innerHTML = ""
        }
    })
    console.log(vector)
    let c = 0;
    add.forEach((i) => {
        console.log(i.innerHTML.length)
        if (i.innerHTML.length <= 22) {
            i.innerHTML = vector[c];
            dragItem()
            c += 1;
        }
    })
}
)


// firework

//  end firework
