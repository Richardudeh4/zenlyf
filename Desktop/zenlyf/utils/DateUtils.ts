/**
 * DateUtils.ts
 * Utility functions for date and time formatting
 */

/**
 * Formats an ISO date string to a user-friendly date format
 * @param isoDateString - ISO date string (e.g., "2025-03-10T02:30:00.000Z")
 * @param includeTime - Whether to include the time in the formatted string
 * @returns Formatted date string (e.g., "Mar 10, 2025" or "Mar 10, 2025 at 2:30 AM")
 */
export const formatDate = (isoDateString: string, includeTime: boolean = false): string => {
  if (!isoDateString) return '';
  
  try {
    const date = new Date(isoDateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return isoDateString; // Return the original string if the date is invalid
    }
    
    // Format options for date
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    // Format options for time
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    
    // If time should be included, format and append it
    if (includeTime) {
      const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
      return `${formattedDate} at ${formattedTime}`;
    }
    
    return formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error);
    return isoDateString; // Return the original string if there's an error
  }
};

/**
 * Formats an ISO date string to a user-friendly date and time format
 * @param isoDateString - ISO date string (e.g., "2025-03-10T02:30:00.000Z")
 * @returns Formatted date and time string (e.g., "Mar 10, 2025 at 2:30 AM")
 */
export const formatDateTime = (isoDateString: string): string => {
  return formatDate(isoDateString, true);
};
