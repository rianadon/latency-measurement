const $ = (...args) => document.querySelector(...args)
const $$ = (...args) => document.querySelectorAll(...args)

const DIVISIONS = 1000

const SIZE = Math.ceil(Math.sqrt(DIVISIONS))

function pad(s) {
    if (String(s).length == 1) return '0' + s
    else return s
}

$('#squarehead').innerHTML = '<th></th>'
for (let i = 0; i < SIZE; i++) {
    $('#squarehead').innerHTML += `<th>${pad(i)}</th>`
}

for (let r = 0; r < SIZE; r++) {
    let html = `<tr><th>${pad(r)}</th>`
    for (let c = 0; c < SIZE; c++) {
        const i = r * SIZE + c
        if (i >= DIVISIONS) break

        html += '<td>■</td>'
    }
    $('#squarebody').innerHTML += html
}

const elements = Array.from($$('td'))
if (elements.length != DIVISIONS) alert('JS went oppsies')

let lasttime = 1000
let maxdelay = 0
let mindelay = 1000

let diffsum = 0
let diffi = 0

setInterval(() => {
    const millis = Date.now() % 1000
    if (millis < lasttime) {
        elements.forEach(e => e.style.opacity = 0)
        lasttime = 0
    }

    const diff = millis - lasttime
    if (diff < mindelay) mindelay = diff
    if (diff > maxdelay) maxdelay = diff
    diffsum += diff
    diffi += 1

    for (let i = lasttime; i < millis; i++) {
        elements[i].style.opacity = (diffi % 2 + 1) / 2
    }
    lasttime = millis
}, 1)

setInterval(() => {
    $('#time').innerHTML = (new Date()).toLocaleTimeString()
}, 100)

setInterval(() => {
    $('#diffavg').innerHTML = (diffsum / diffi).toFixed(2)
    $('#diffmax').innerHTML = maxdelay
    $('#diffmin').innerHTML = mindelay
}, 1000)
