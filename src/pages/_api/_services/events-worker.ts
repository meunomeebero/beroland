import axios from "axios";

class EventsWorker {
  private readonly client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_EVENTS_WORKER_URL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${process.env.EVENTS_WORKER_BASIC_AUTH_SECRET}`,
    },
  });

  public async add(userId: number, event = "loot_collected") {
    try {
      await this.client.post("/events", {
        userId,
        event,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export const eventsWorker = new EventsWorker();
