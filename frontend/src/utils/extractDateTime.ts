export function extractTime(dateString : Date) {
    const today = new Date();
    const messageDay = new Date(dateString);
    const year = messageDay.getFullYear();
    const date = messageDay.getDate();
    const month = messageDay.getMonth();
    const hour = padZero(messageDay.getHours());
    const minutes = padZero(messageDay.getMinutes());
    if (year !== today.getFullYear()) {
        return `${date}/${month}/${year} &nbsp ${hour}:${minutes} `
    }else{
        if(month !== today.getMonth() || date !== today.getDate()) {
            return `${date}/${month} &nbsp ${hour}:${minutes}`;
        }else{
            return `${hour}:${minutes}`;
        }
    }
}

function padZero(number : number) {
        return number.toString().padStart(2, '0');
}