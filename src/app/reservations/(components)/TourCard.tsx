import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Tour = {
	name: string;
	description: string;
	totalPrice: number;
	duration: string;
	numberOfPeople: number;
	location: string;
	customerName: string;
	bookingDate: string;
};



export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Card className="w-full max-w-md p-6 grid gap-6">
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <MapPinIcon className="w-6 h-6 text-primary" />
          <div className="text-lg font-semibold">{tour.name}</div>
        </div>
        <p className="text-muted-foreground">
          {tour.description}
        </p>
        <div className="flex items-center gap-4">
          <LocateIcon className="w-5 h-5" />
          <div>{tour.location}</div>
        </div>
        <div className="flex items-center gap-4">
          <ClockIcon className="w-5 h-5" />
          <div>{tour.duration}</div>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Customer</div>
          <div className="font-medium">{tour.customerName}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Guests</div>
          <div className="font-medium">{tour.numberOfPeople}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Total Price</div>
          <div className="font-medium">${tour.totalPrice}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Booking Status</div>
          <div className="font-medium text-green-500">Confirmed</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Booked On</div>
          <div className="font-medium">{tour.bookingDate}</div>
        </div>
      </div>
    </Card>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LocateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
