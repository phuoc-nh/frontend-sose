import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Transport = {
	bookingId: number;
	type: string;
	model: string;
	capacity: number;
	pricePerHour: number;
	availableUnits: number;
	location: string;
	numberOfPassengers: number;
	customerName: string;
	customerEmail: string;
}

export default function TransportCard({transport}: {transport: Transport}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50 px-6 py-4">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg font-semibold">
            Booking #{transport.bookingId}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div className="h-3 w-3" />
            </Button>
          </CardTitle>
          <CardDescription className="text-muted-foreground">{transport.type}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CarIcon className="h-4 w-4" />
            <span>{transport.model}</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-1 text-muted-foreground">
            <UsersIcon className="h-4 w-4" />
            <span>{transport.numberOfPassengers} Passengers</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="font-semibold">Booking Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Price per Hour</span>
                <span>${transport.pricePerHour}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Available Units</span>
                <span>12</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>{transport.location}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer Name</span>
                <span>{transport.customerName}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer Email</span>
                <Link href="#" className="text-blue-600" prefetch={false}>
                  {transport.customerEmail}
                </Link>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
            <div className="font-semibold">Booking Summary</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Time</span>
                <span>10:00 AM</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">End Time</span>
                <span>12:00 PM</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Passengers</span>
                <span>4</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total Price</span>
                <span>$100.00</span>
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


function CarIcon(props) {
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
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