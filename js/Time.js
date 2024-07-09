export class GetTime {

    constructor(time) {
        this.setTime = new Date(time);
        this.temp = [86400, 3600, 60];
    }

    getDiff() {
        let n = Date.now();
        let m = this.setTime.valueOf();
        let seconds = m - n;
        seconds = Math.trunc(seconds / 1000);
        let arr = [], done = false;
        if (seconds < 0) arr = [0, 0, 0, 0], done = true;
        else {
            this.temp.forEach(x => {
                let t = Math.trunc(seconds / x);
                arr.push(t);
                seconds %= x;
            });
            arr.push(seconds);
        }
        return {
            day: arr[0],
            hour: arr[1],
            minute: this.num(arr[2]),
            second: this.num(arr[3]),
            msg: this.msg(done),
            done: done
        }
    }

    num(n){
        if(n < 10) return '0'+n;
        return n;
    }

    msg(x){
        if(x) return `Time's Up`;
        return `Show starts in`;
    }
}