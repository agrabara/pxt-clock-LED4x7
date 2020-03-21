input.onButtonPressed(Button.A, function () {
    brightness = Math.min(brightness + 1, 7)
    LED.intensity(brightness)
    pins.analogWritePin(AnalogPin.P12, 1023)
})
input.onButtonPressed(Button.B, function () {
    brightness = Math.max(brightness - 1, 1)
    LED.intensity(brightness)
    pins.analogWritePin(AnalogPin.P12, 0)
})
let LED: TM1637.TM1637LEDs = null
let brightness = 0
brightness = 1
LED = TM1637.create(
    DigitalPin.P8,
    DigitalPin.P9,
    brightness,
    4
)
let zegar = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
basic.forever(function () {
    LED.showbit(Math.floor(zegar.getHour() / 10), 0)
    LED.showbit(zegar.getHour() % 10, 1)
    LED.showbit(Math.floor(zegar.getMinute() / 10), 2)
    LED.showbit(zegar.getMinute() % 10, 3)
    if (zegar.getSecond() % 2 == 0) {
        LED.showDP(5, true)
    } else {
        LED.showDP(5, false)
    }
    if (Math.floor(zegar.getSecond() / 10) % 2 == 0) {
        pins.analogWritePin(AnalogPin.P12, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P12, 0)
    }
    basic.pause(100)
})
 