/** YYYY-MM-DD without time — Bitrix treats <= end as midnight, missing intraday rows */
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

const TZ_OFFSET_PATTERN = /^[+-]\d{2}:\d{2}$/;

function getTimezoneOffset(): string {
  const fromEnv = process.env.BITRIX24_TIMEZONE_OFFSET?.trim();
  if (fromEnv && TZ_OFFSET_PATTERN.test(fromEnv)) {
    return fromEnv;
  }
  return '+03:00';
}

/**
 * Expand date-only values to full-day bounds in portal timezone (dress-course: +03).
 * Datetime strings (with T or space + time) are passed through unchanged.
 */
export function normalizeCrmDateFilter(value: string, bound: 'start' | 'end'): string {
  const trimmed = value.trim();
  if (!DATE_ONLY.test(trimmed)) {
    return trimmed;
  }
  const tz = getTimezoneOffset();
  return bound === 'start'
    ? `${trimmed}T00:00:00${tz}`
    : `${trimmed}T23:59:59${tz}`;
}

export function buildDateCreateFilter(
  startDate: string,
  endDate?: string
): Record<string, string> {
  const filter: Record<string, string> = {
    '>=DATE_CREATE': normalizeCrmDateFilter(startDate, 'start'),
  };
  if (endDate) {
    filter['<=DATE_CREATE'] = normalizeCrmDateFilter(endDate, 'end');
  }
  return filter;
}
