export interface IProfileResponse {
  success: number;
  status: number;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    user_id: number;
    phone: string;
    tickets: [
      {
        ticket_id: number;
        flight_id: number;
        status: string;
        from_location: string;
        to_location: string;
        departure_time: string;
        arrival_time: string;
        duration: number;
        total_seats: number;
      }
    ];
  };
}

export interface IUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  user_id: number;
  phone: string;
  tickets: [
    {
      ticket_id: number;
      flight_id: number;
      status: string;
      from_location: string;
      to_location: string;
      departure_time: string;
      arrival_time: string;
      duration: number;
      total_seats: number;
    }
  ];
}
