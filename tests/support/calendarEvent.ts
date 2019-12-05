import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
// @ts-ignore
import { EventGuestClass } from "./EventGuest";

export class CalendarEventClass implements CalendarEvent {
    addEmailReminder(minutesBefore: number): CalendarEvent {
        throw new Error("Method not implemented.");
    }    addGuest(email: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    addPopupReminder(minutesBefore: number): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    addSmsReminder(minutesBefore: number): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    anyoneCanAddSelf(): boolean {
        throw new Error("Method not implemented.");
    }
    deleteEvent(): void {
        throw new Error("Method not implemented.");
    }
    deleteTag(key: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    getAllDayEndDate(): GoogleAppsScript.Base.Date {
        throw new Error("Method not implemented.");
    }
    getAllDayStartDate(): GoogleAppsScript.Base.Date {
        throw new Error("Method not implemented.");
    }
    getAllTagKeys(): string[] {
        throw new Error("Method not implemented.");
    }
    getColor(): string {
        throw new Error("Method not implemented.");
    }
    getCreators(): string[] {
        throw new Error("Method not implemented.");
    }
    getDateCreated(): GoogleAppsScript.Base.Date {
        throw new Error("Method not implemented.");
    }
    getDescription(): string {
        throw new Error("Method not implemented.");
    }
    getEmailReminders(): number[] {
        throw new Error("Method not implemented.");
    }
    getEndTime(): GoogleAppsScript.Base.Date {
        throw new Error("Method not implemented.");
    }
    getEventSeries(): GoogleAppsScript.Calendar.CalendarEventSeries {
        throw new Error("Method not implemented.");
    }
    getGuestByEmail(email: string): GoogleAppsScript.Calendar.EventGuest {
        throw new Error("Method not implemented.");
    }
    getGuestList(): GoogleAppsScript.Calendar.EventGuest[] {
        return [new EventGuestClass()];
    }
    getId(): string {
        throw new Error("Method not implemented.");
    }
    getLastUpdated(): GoogleAppsScript.Base.Date {
        throw new Error("Method not implemented.");
    }
    getLocation(): string {
        throw new Error("Method not implemented.");
    }
    getMyStatus(): GoogleAppsScript.Calendar.GuestStatus {
        throw new Error("Method not implemented.");
    }
    getOriginalCalendarId(): string {
        throw new Error("Method not implemented.");
    }
    getPopupReminders(): number[] {
        throw new Error("Method not implemented.");
    }
    getSmsReminders(): number[] {
        throw new Error("Method not implemented.");
    }
    getStartTime(): GoogleAppsScript.Base.Date {
        throw new Error("Method not implemented.");
    }
    getTag(key: string): string {
        throw new Error("Method not implemented.");
    }
    getTitle(): string {
        throw new Error("Method not implemented.");
    }
    getVisibility(): GoogleAppsScript.Calendar.Visibility {
        throw new Error("Method not implemented.");
    }
    guestsCanInviteOthers(): boolean {
        throw new Error("Method not implemented.");
    }
    guestsCanModify(): boolean {
        throw new Error("Method not implemented.");
    }
    guestsCanSeeGuests(): boolean {
        throw new Error("Method not implemented.");
    }
    isAllDayEvent(): boolean {
        throw new Error("Method not implemented.");
    }
    isOwnedByMe(): boolean {
        throw new Error("Method not implemented.");
    }
    isRecurringEvent(): boolean {
        throw new Error("Method not implemented.");
    }
    removeAllReminders(): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    removeGuest(email: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    resetRemindersToDefault(): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setAllDayDate(date: GoogleAppsScript.Base.Date): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setAllDayDates(startDate: GoogleAppsScript.Base.Date, endDate: GoogleAppsScript.Base.Date): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setAnyoneCanAddSelf(anyoneCanAddSelf: boolean): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setColor(color: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setDescription(description: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setGuestsCanInviteOthers(guestsCanInviteOthers: boolean): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setGuestsCanModify(guestsCanModify: boolean): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setGuestsCanSeeGuests(guestsCanSeeGuests: boolean): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setLocation(location: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setMyStatus(status: GoogleAppsScript.Calendar.GuestStatus): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setTag(key: string, value: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setTime(startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setTitle(title: string): CalendarEvent {
        throw new Error("Method not implemented.");
    }
    setVisibility(visibility: GoogleAppsScript.Calendar.Visibility): CalendarEvent {
        throw new Error("Method not implemented.");
    }
}