let SIGNAL = 0
let WINDGESCHWINDIGKEIT = 0
let DREHZAHL = 0
let LAUFZEIT = 0
let PULSEINLAUFZEIT = 0
let TIMER = 0
let ANZAHLLICHT = 0
let LICHTSIGNAL = 0
let MESSUNG = 0
let MESSINTERVALL = 10000
let LEDAnzeige = TM1637.create(
DigitalPin.C16,
DigitalPin.C17,
7,
4
)
basic.forever(function () {
    TIMER = input.runningTime()
    PULSEINLAUFZEIT = ANZAHLLICHT
    basic.pause(MESSINTERVALL)
    LAUFZEIT = input.runningTime() - TIMER
    PULSEINLAUFZEIT = ANZAHLLICHT - PULSEINLAUFZEIT
    ANZAHLLICHT = 0
    DREHZAHL = 60000 * PULSEINLAUFZEIT / LAUFZEIT
    WINDGESCHWINDIGKEIT = DREHZAHL * 28
})
basic.forever(function () {
    LEDAnzeige.showNumber(WINDGESCHWINDIGKEIT)
})
basic.forever(function () {
    MESSUNG += 1
    SIGNAL = pins.analogReadPin(AnalogPin.P1)
    if (SIGNAL < 100) {
        if (LICHTSIGNAL == 0) {
            LICHTSIGNAL = 1
            ANZAHLLICHT += 1
        }
    } else {
        LICHTSIGNAL = 0
    }
})
