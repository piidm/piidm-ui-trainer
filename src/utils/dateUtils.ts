/**
 * Utility functions for handling dates and timezone conversions
 * These functions help preserve the user's intended local time when working with assignments
 */

/**
 * Converts a datetime-local string to ISO string while preserving the local time
 * This prevents timezone shifts when storing the date
 * @param datetimeLocalString - String in format "2024-12-25T14:30"
 * @returns ISO string that represents the same local time
 */
export const convertLocalDateTimeToISO = (datetimeLocalString: string): string => {
  const localDate = new Date(datetimeLocalString);
  // Offset the timezone difference to preserve the intended local time
  const offsetMs = localDate.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(localDate.getTime() - offsetMs);
  return adjustedDate.toISOString();
};

/**
 * Converts a stored ISO date string back to local datetime format for editing
 * This reverses the conversion done when storing the date
 * @param isoDateString - ISO date string from storage
 * @returns String in format "2024-12-25T14:30" representing the original local time
 */
export const convertISOToLocalDateTime = (isoDateString: string): string => {
  const storedDate = new Date(isoDateString);
  // Add timezone offset to get the original intended local time
  const offsetMs = storedDate.getTimezoneOffset() * 60000;
  const localDate = new Date(storedDate.getTime() + offsetMs);
  return localDate.toISOString().slice(0, 16);
};

/**
 * Gets the original intended local date from a stored ISO string
 * @param isoDateString - ISO date string from storage
 * @returns Date object representing the original local time
 */
export const getLocalDateFromStoredISO = (isoDateString: string): Date => {
  const storedDate = new Date(isoDateString);
  // Add timezone offset to get the original intended local time
  const offsetMs = storedDate.getTimezoneOffset() * 60000;
  return new Date(storedDate.getTime() + offsetMs);
};

/**
 * Formats a stored ISO date string to display the original local date
 * @param isoDateString - ISO date string from storage
 * @returns Formatted date string
 */
export const formatStoredDateToLocal = (isoDateString: string): string => {
  const localDate = getLocalDateFromStoredISO(isoDateString);
  return localDate.toLocaleDateString();
};

/**
 * Formats a stored ISO date string to display the original local time
 * @param isoDateString - ISO date string from storage
 * @returns Formatted time string
 */
export const formatStoredTimeToLocal = (isoDateString: string): string => {
  const localDate = getLocalDateFromStoredISO(isoDateString);
  return localDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Compares a datetime-local input with current time for validation
 * @param datetimeLocalString - String in format "2024-12-25T14:30"
 * @returns true if the input date is in the future
 */
export const isDateTimeInFuture = (datetimeLocalString: string): boolean => {
  const inputDate = new Date(datetimeLocalString);
  const now = new Date();
  
  // Remove seconds and milliseconds for fair comparison
  const inputTime = new Date(
    inputDate.getFullYear(), 
    inputDate.getMonth(), 
    inputDate.getDate(), 
    inputDate.getHours(), 
    inputDate.getMinutes()
  );
  const nowTime = new Date(
    now.getFullYear(), 
    now.getMonth(), 
    now.getDate(), 
    now.getHours(), 
    now.getMinutes()
  );
  
  return inputTime > nowTime;
};