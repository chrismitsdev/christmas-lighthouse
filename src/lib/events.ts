import type {Messages} from 'next-intl'
import {isTodayOrFutureDate} from '@/src/lib/utils'

type Event = {
  key: keyof Messages['pages']['index']['sections']['activities']['events']
  timestamp: string
}

export const events: Event[] = [
  {key: '22/11', timestamp: '2025-11-22T00:00:00.000Z'},
  {key: '23/11', timestamp: '2025-11-23T00:00:00.000Z'},
  {key: '29/11', timestamp: '2025-11-29T00:00:00.000Z'},
  {key: '30/11', timestamp: '2025-11-30T00:00:00.000Z'},
  {key: '6/12', timestamp: '2025-12-06T00:00:00.000Z'},
  {key: '7/12', timestamp: '2025-12-07T00:00:00.000Z'},
  {key: '13/12', timestamp: '2025-12-13T00:00:00.000Z'},
  {key: '14/12', timestamp: '2025-12-14T00:00:00.000Z'},
  {key: '20/12', timestamp: '2025-12-20T00:00:00.000Z'},
  {key: '21/12', timestamp: '2025-12-21T00:00:00.000Z'},
  {key: '24/12', timestamp: '2025-12-24T00:00:00.000Z'},
  {key: '25/12', timestamp: '2025-12-25T00:00:00.000Z'},
  {key: '26/12', timestamp: '2025-12-26T00:00:00.000Z'},
  {key: '27/12', timestamp: '2025-12-27T00:00:00.000Z'},
  {key: '28/12', timestamp: '2025-12-28T00:00:00.000Z'},
  {key: '29/12', timestamp: '2025-12-29T00:00:00.000Z'},
  {key: '30/12', timestamp: '2025-12-30T00:00:00.000Z'},
  {key: '31/12', timestamp: '2025-12-31T00:00:00.000Z'},
  {key: '1/1', timestamp: '2026-01-01T00:00:00.000Z'},
  {key: '2/1', timestamp: '2026-01-02T00:00:00.000Z'}
]

export const upcomingEvents = events.filter((event) =>
  isTodayOrFutureDate(event.timestamp)
)
