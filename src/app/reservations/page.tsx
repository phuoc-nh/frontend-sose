// @ts-nocheck
'use client'
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import TourCard from "./(components)/TourCard";
import TransportCard from "./(components)/TransportCard";
import RoomCard from "./(components)/RoomCard";

export default function Tours() {
	const [tours, setTours] = useState([]);
	const [transport, setTransport] = useState([]);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8084/api/v1/tourism/bookings")
			.then((res) => res.json())
			.then((data) => {
				setTours(data);

				console.log(data);
			});
		
		fetch("http://localhost:8084/api/v1/transport/bookings")
			.then((res) => res.json())
			.then((data) => {
				setTransport(data);

				console.log(data);
			});

		fetch("http://localhost:8084/api/v1/accommodation/reservations")
			.then((res) => res.json())
			.then((data) => {
				setRooms(data);
			});
			
	}, []);

	if (!tours.length && !transport.length && !rooms.length) {
		return (
			<div className="flex justify-center items-center h-[100vh]">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">No reservations found</h2>
					<p className="text-muted-foreground">You have not made any reservations yet.</p>
				</div>
			</div>
		)
	}


	return (
		<div className="min-h-[100vh]">
			{tours?.length && <section className="py-12 px-6 md:px-12">
				<h2 className="text-2xl md:text-3xl font-bold mb-8">Reserved Tours</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{tours.map((t) => {
						const tour = {
							name: t.tour.name,
							description: t.tour.description,
							totalPrice: t.totalPrice,
							duration: t.tour.duration,
							numberOfPeople: t.numberOfPeople,
							location: t.tour.location,
							customerName: t.customerName,
							bookingDate: t.bookingDate,
						}

						return (
							<div key={tour.tourId}>
								<TourCard tour={tour} />
							</div>
							
						)
					})}
				</div>
			</section>}
			{transport.length > 0 && <section className="py-12 px-6 md:px-12">
				<h2 className="text-2xl md:text-3xl font-bold mb-8">Reserved Transports</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{transport.map((t) => {
						const transport = {
							bookingId: t.bookingId,
							type: t.transport.type,
							model: t.transport.model,
							capacity: t.transport.capacity,
							pricePerHour: t.transport.pricePerHour,
							availableUnits: t.transport.availableUnits,
							location: t.transport.location,
							numberOfPassengers: t.numberOfPassengers,
							customerName: t.customerName,
							customerEmail: t.customerEmail,
						}

						return (
							<div key={transport.tranportId}>
								<TransportCard transport={transport} />
							</div>
							
						)
					})}
				</div>
			</section>}

			{rooms.length > 0 && <section className="py-12 px-6 md:px-12">
				<h2 className="text-2xl md:text-3xl font-bold mb-8">Reserved Rooms</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{rooms.map((t) => {
						const room = {
							reservationId: t.reservationId,
							name: t.accommodation.name,
							description: t.accommodation.description,
							pricePerNight: t.accommodation.pricePerNight,
							location: t.accommodation.location,
							maxGuests: t.accommodation.maxGuests,
							availableRooms: t.accommodation.availableRooms,
							customerName: t.customerName,
							customerEmail: t.customerEmail,
							checkInDate: t.checkInDate,
							checkOutDate: t.checkOutDate,
							numberOfGuests: t.numberOfGuests,
							totalPrice: t.totalPrice,
							status: t.status,
						}

						return (
							<div key={room.reservationId}>
								<RoomCard room={room} />
							</div>
							
						)
					})}
				</div>
			</section>}
		</div>
		
	);
}
