import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Room = {
	reservationId: number;
	name: string;
	description: string;
	pricePerNight: number;
	location: string;
	maxGuests: number;
	availableRooms: number;
	customerName: string;
	customerEmail: string;
	checkInDate: string;
	checkOutDate: string;
	numberOfGuests: number;
	totalPrice: number;
	status: string;
}


export default function RoomCard({room}: {room: Room}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50 px-6 py-4">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg font-semibold">
            Booking #{room.reservationId}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div className="h-3 w-3" />
            </Button>
          </CardTitle>
          <CardDescription className="text-muted-foreground">Accommodation: {room.name}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <LocateIcon className="h-4 w-4" />
            <span>{room.location}</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-1 text-muted-foreground">
            <UsersIcon className="h-4 w-4" />
            <span>{room.numberOfGuests} Guests</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="font-semibold">Accommodation Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span>Deluxe Room</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Description</span>
                <span>{room.description}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Price per Night</span>
                <span>${room.pricePerNight}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Available Rooms</span>
                <span>{room.availableRooms}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer Name</span>
                <span>{room.customerName}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer Email</span>
                <Link href="#" className="text-blue-600" prefetch={false}>
                  {room.customerEmail}
                </Link>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
            <div className="font-semibold">Booking Summary</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Check-in Date</span>
                <span>{room.checkInDate}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Check-out Date</span>
                <span>{room.checkOutDate}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Guests</span>
                <span>{room.numberOfGuests}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total Price</span>
                <span>${room.pricePerNight}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarCheckIcon className="h-4 w-4" />
              <span>Confirmed</span>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CalendarCheckIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
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
  )
}


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}