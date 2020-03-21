input.onButtonPressed(Button.A, function () {
    jasno = Math.min(jasno + 1, 7)
    LED.intensity(jasno)
})
input.onButtonPressed(Button.B, function () {
    jasno = Math.max(jasno - 1, 1)
    LED.intensity(jasno)
})
let sekunda = 0
let minuta = 0
let godzina = 0
let LED: TM1637.TM1637LEDs = null
let jasno = 0
jasno = 1
basic.showIcon(IconNames.Heart)
let zegar = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
LED = TM1637.create(
    DigitalPin.P8,
    DigitalPin.P9,
    jasno,
    4
)
LED.showNumber(8888)
LED.showDP(5, true)
basic.pause(1000)
LED.clear()
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    godzina = zegar.getHour()
    if (godzina > 9) {
        LED.showbit(Math.floor(godzina / 10), 0)
        LED.showbit(godzina % 10, 1)
    } else {
        LED.showbit(0, 0)
        LED.showbit(godzina, 1)
    }
    minuta = zegar.getMinute()
    if (minuta > 9) {
        LED.showbit(Math.floor(minuta / 10), 2)
        LED.showbit(minuta % 10, 3)
    } else {
        LED.showbit(0, 2)
        LED.showbit(minuta, 3)
    }
    sekunda = zegar.getSecond()
    if (sekunda % 2 == 1) {
        LED.showDP(5, true)
    } else {
        LED.showDP(5, false)
    }
    basic.pause(100)
})
