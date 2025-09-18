import { toast } from "sonner";

export interface Doctor {
  id: string;
  specialty: string;
  name: string;
  location: string;
  contact: string;
  availability: string;
  isBooked: string;
  bookedBy: string;
}

export interface BookingConfirmation {
  status: string;
  message: string;
  doctor_info?: Doctor;
}

export interface ParsedAgentResponse {
  type: "doctor_list" | "booking_confirmation" | "text";
  data: Doctor[] | BookingConfirmation | string;
}

export function parseAgentResponse(content: string): ParsedAgentResponse {
  try {
    const json = JSON.parse(content);

    // Check for doctor list format (array of arrays, or array of objects)
    if (Array.isArray(json) && json.length > 0 && (Array.isArray(json[0]) || typeof json[0] === 'object')) {
      // Assuming the first row is headers if it's an array of arrays
      const doctors: Doctor[] = [];
      const hasHeader = Array.isArray(json[0]) && json[0].includes("ID") && json[0].includes("Specialty");

      const startIndex = hasHeader ? 1 : 0;
      for (let i = startIndex; i < json.length; i++) {
        const row = json[i];
        if (Array.isArray(row) && row.length >= 8) { // Ensure enough columns
          doctors.push({
            id: row[0],
            specialty: row[1],
            name: row[2],
            location: row[3],
            contact: row[4],
            availability: row[5],
            isBooked: row[6],
            bookedBy: row[7],
          });
        } else if (typeof row === 'object' && row !== null) {
          // Handle case where it might be an array of objects directly
          doctors.push({
            id: row.ID,
            specialty: row.Specialty,
            name: row.Name,
            location: row.Location,
            contact: row.Contact,
            availability: row.Availability,
            isBooked: row.IsBooked,
            bookedBy: row.BookedBy,
          });
        }
      }
      if (doctors.length > 0) {
        return { type: "doctor_list", data: doctors };
      }
    }

    // Check for booking confirmation format
    if (json.status && json.message && (json.status === "success" || json.status === "error")) {
      return { type: "booking_confirmation", data: json as BookingConfirmation };
    }

  } catch (e) {
    // Not a JSON string, or not in expected structured format
  }

  return { type: "text", data: content };
}