// --- credits autoscroll -> stoppt beim verlassen, pausiert wenn man selber scrollt
// instant weil bootstrap smooth scroll an hat -> jeder frame hat sonst den vorigen abgebrochen
window.autoScroll = window.autoScroll || {
    raf: 0,
    timer: 0,
    pos: 0,
    last: null,
    speed: 70,

    scroller: function () {
        this.stop()
        document.documentElement.classList.add("noScrollbar")
        window.scrollTo({ top: 0, behavior: "instant" })
        this.pos = 0
        this.onUser = () => this.pause()
        window.addEventListener("wheel", this.onUser, { passive: true })
        window.addEventListener("touchstart", this.onUser, { passive: true })
        window.addEventListener("keydown", this.onUser)
        this.timer = setTimeout(() => this.run(), 1200)
    },

    run: function () {
        this.last = null
        this.pos = window.scrollY
        const step = t => {
            if (this.last !== null) {
                this.pos += (t - this.last) / 1000 * this.speed
            }
            this.last = t
            const max = document.documentElement.scrollHeight - window.innerHeight
            window.scrollTo({ top: this.pos, behavior: "instant" })
            if (this.pos >= max) {
                this.raf = 0
                return
            }
            this.raf = requestAnimationFrame(step)
        }
        this.raf = requestAnimationFrame(step)
    },

    // --- selber scrollen -> kurz warten und dann von da weiter
    pause: function () {
        cancelAnimationFrame(this.raf)
        this.raf = 0
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.run(), 2500)
    },

    stop: function () {
        cancelAnimationFrame(this.raf)
        this.raf = 0
        clearTimeout(this.timer)
        if (this.onUser) {
            window.removeEventListener("wheel", this.onUser)
            window.removeEventListener("touchstart", this.onUser)
            window.removeEventListener("keydown", this.onUser)
            this.onUser = null
        }
        document.documentElement.classList.remove("noScrollbar")
    }
};
