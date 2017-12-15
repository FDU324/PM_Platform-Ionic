import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'myDatePipe' })
export class MyDatePipe implements PipeTransform {
    transform(value: number): string {
        const show = new Date(value);
        const difference = (Date.now() - value) / 1000;     // 秒数
        const hour = show.getHours() < 10 ? '0' + show.getHours() : show.getHours();
        const minutes = show.getMinutes() < 10 ? '0' + show.getMinutes() : show.getMinutes();

        if (difference > 31536000) {     // >1年
            return show.getFullYear() + '年' + (show.getMonth() + 1) + '月' + show.getDate() + '日 ' + hour + ':' + minutes;
        } else if (difference > 86400) {           // 1日< show < 1年
            return (show.getMonth() + 1) + '月' + show.getDate() + '日 ' + hour + ':' + minutes;
        } else {          // 当日
            return hour + ':' + minutes;
        }

    }
}