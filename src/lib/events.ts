import type {Messages} from 'next-intl'

type EventMessages =
  Messages['pages']['index']['sections']['activities']['events']
type EventKey = keyof EventMessages

/** Keys of events with a morning activity (some days open only in the afternoon). */
type MorningEventKey = {
  [K in EventKey]: EventMessages[K] extends {morning: string} ? K : never
}[EventKey]

type Event = {
  key: EventKey
  timestamp: string
}

export function hasMorning(
  event: Event
): event is Event & {key: MorningEventKey} {
  return event.key in morningEventKeys
}

// Derived from the message type, so tsc fails if this drifts from messages/*.json.
const morningEventKeys: Record<MorningEventKey, true> = {
  '5/12': true,
  '6/12': true,
  '12/12': true,
  '13/12': true,
  '19/12': true,
  '20/12': true,
  '24/12': true,
  '25/12': true,
  '26/12': true,
  '27/12': true,
  '28/12': true,
  '29/12': true,
  '30/12': true,
  '31/12': true,
  '1/1': true,
  '2/1': true
}

const events: Event[] = [
  {key: '4/12', timestamp: '2026-12-04T00:00:00.000Z'},
  {key: '5/12', timestamp: '2026-12-05T00:00:00.000Z'},
  {key: '6/12', timestamp: '2026-12-06T00:00:00.000Z'},
  {key: '12/12', timestamp: '2026-12-12T00:00:00.000Z'},
  {key: '13/12', timestamp: '2026-12-13T00:00:00.000Z'},
  {key: '19/12', timestamp: '2026-12-19T00:00:00.000Z'},
  {key: '20/12', timestamp: '2026-12-20T00:00:00.000Z'},
  {key: '23/12', timestamp: '2026-12-23T00:00:00.000Z'},
  {key: '24/12', timestamp: '2026-12-24T00:00:00.000Z'},
  {key: '25/12', timestamp: '2026-12-25T00:00:00.000Z'},
  {key: '26/12', timestamp: '2026-12-26T00:00:00.000Z'},
  {key: '27/12', timestamp: '2026-12-27T00:00:00.000Z'},
  {key: '28/12', timestamp: '2026-12-28T00:00:00.000Z'},
  {key: '29/12', timestamp: '2026-12-29T00:00:00.000Z'},
  {key: '30/12', timestamp: '2026-12-30T00:00:00.000Z'},
  {key: '31/12', timestamp: '2026-12-31T00:00:00.000Z'},
  {key: '1/1', timestamp: '2027-01-01T00:00:00.000Z'},
  {key: '2/1', timestamp: '2027-01-02T00:00:00.000Z'}
]

const TIME_ZONE = 'Europe/Athens'

/** Today's date in Greek time as YYYY-MM-DD (en-CA formats that way). */
function todayInGreece(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {timeZone: TIME_ZONE}).format(now)
}

const PARADE_DATE = '2026-12-04'

/** Whether the parade is today or still to come, in Greek time. */
export function isParadeUpcoming(now = new Date()): boolean {
  return todayInGreece(now) <= PARADE_DATE
}

export type UpcomingEvent = Event & {isToday: boolean}

/**
 * Events from today onwards, with today's date taken in Greek time. Call this
 * on the server: the index page revalidates periodically, so past days drop
 * off without a redeploy and server and client always render the same list.
 */
export function getUpcomingEvents(now = new Date()): UpcomingEvent[] {
  const today = todayInGreece(now)

  return events
    .filter((event) => event.timestamp.slice(0, 10) >= today)
    .map((event) => ({
      ...event,
      isToday: event.timestamp.slice(0, 10) === today
    }))
}
