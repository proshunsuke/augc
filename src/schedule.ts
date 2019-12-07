import KeyakiSchedule from "./keyakiSchedule";
import dayjs from "dayjs";

export default class Schedule {
    setSchedule = () => {
        const keyakiSchedule = new KeyakiSchedule();

        const beginningOfThisMonth = dayjs().startOf('month');
        const beginningOfNexYearMonth = dayjs().startOf('month').add(1, 'year');
        let targetDate = beginningOfThisMonth;

        while (targetDate.isBefore(beginningOfNexYearMonth)) {
            keyakiSchedule.setSchedule(targetDate);
            targetDate = targetDate.add(1, 'month');
        }
    }
}
