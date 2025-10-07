export function dateFormat(date: string) {
  const optionsDate = {
    year: 'numeric' as const,
    month: 'numeric' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    second: 'numeric' as const,
    hour12: false,
    timeZone: 'Asia/Jerusalem',
  };

  return new Intl.DateTimeFormat('he-IL', optionsDate).format(new Date(date));
}
