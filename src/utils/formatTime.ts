export function formatTime(time:number){
    const hours = Math.floor(time/3600);
    const minutes = Math.floor((time%3600)/60);
    const seconds = time%60;
    return `0${hours}:${minutes<10?'0':''}${minutes}:${seconds<10?'0':''}${seconds}`;
}