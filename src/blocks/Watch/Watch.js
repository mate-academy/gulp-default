const monthes = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export default function Watch(interval = 1000) {
    const watchElem = document.createElement('div'),
        tInterval = setInterval(() => updateTime(), interval);

    function padStart(num) {
        if (num < 10) {
            return `0${num}`;
        }

        return num;
    }

    function updateTime() {
        const d = new Date(),
            hh = padStart(d.getHours()),
            mm = padStart(d.getMinutes()),
            ss = padStart(d.getSeconds()),
            date = `${d.getDate()} ${monthes[d.getMonth()]}, ${hh}:${mm}:${ss}`;

        watchElem.innerText = date;
    }

    updateTime();
    watchElem.classList.add('watch');
    watchElem.stopWatching = () => clearInterval(tInterval);

    return watchElem;
}
