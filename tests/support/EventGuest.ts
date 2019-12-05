import EventGuest = GoogleAppsScript.Calendar.EventGuest;

export class EventGuestClass implements EventGuest {
    getAdditionalGuests(): number {
        throw new Error("Method not implemented.");
    }    getEmail(): string {
        throw new Error("Method not implemented.");
    }
    getGuestStatus(): GoogleAppsScript.Calendar.GuestStatus {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getStatus(): string {
        throw new Error("Method not implemented.");
    }
}