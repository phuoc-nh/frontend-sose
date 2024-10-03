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

const IMAGES = [
	"https://images.squarespace-cdn.com/content/v1/5a87961cbe42d637c54cab93/1624434019659-PGWM75DXZFNRKDY6LCBL/cheap-accommodation-traveling.jpg",
	'https://cf.bstatic.com/xdata/images/hotel/max1024x768/479154047.jpg?k=3cf5c783e2c2d1b1cc10110fecd94bfd15635162d2907aa359e1fa982f48da2e&o=&hp=1',
	'https://cdn.sanity.io/images/faycjvmy/production/6da71099d0557b9ec975629cd12bd01bdfcec558-3500x2330.jpg/201899-56%20(1).jpg?rect=0,181,3500,1969&w=320&h=180&fit=min&auto=format'
]

export default function Accommodation() {
	const [accommodations, setAccommodations] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedAccommodation, setSelectedAccommodation] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [startTime, setStartTime] = useState("2023-10-15");
	const [endTime, setEndTime] = useState("2023-10-15");

	useEffect(() => {
		fetch("http://localhost:8084/api/v1/accommodation/available")
			.then((res) => res.json())
			.then((data) => {
				setAccommodations(data);

				console.log(data);
			});
	}, []);

	const onClickBookAccommodation = (accommodation: any) => {
		setName("");
		setEmail("");
		setNumber("");
		setSelectedAccommodation(accommodation);
		setOpen(true);
	}


	const onConfirm = () => {
		const data = {
			accommodationId: selectedAccommodation?.accommodationId,
			customerName: name,
			customerEmail: email,
			numberOfGuests: number,
			checkInDate: startTime,
			checkOutDate: endTime,
		};
	
		
		fetch("http://localhost:8084/api/v1/accommodation/reserve", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setOpen(false);
			});
	}

	return (
		<section className="py-12 px-6 md:px-12">
			<h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Accommodations</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

				{accommodations.map((accommodation, id) => (
					<div className="bg-background rounded-lg overflow-hidden shadow-lg" key={accommodation.accommodationId}>
						<div>
							<img
								src={IMAGES[id % IMAGES.length]}
								width={600}
								height={400}
								alt="accommodation"
								className="w-full h-48 object-cover"
								style={{ aspectRatio: "600/400", objectFit: "cover" }}
							/>
							<div className="p-6">
								<div className="p-6 flex justify-between">
									<div className="">
										<h3 className="text-xl font-bold mb-2">{accommodation.name}</h3>
										<p className="text-muted-foreground mb-4">
											{accommodation.description}
										</p>
									</div>
									<div>
										<p className="text-muted-foreground mb-4">
											Price per night: ${accommodation.pricePerNight}
										</p>
										<p className="text-muted-foreground mb-4">
											Location: {accommodation.location}
										</p>
									</div>
								</div>
								<Button onClick={() => onClickBookAccommodation(accommodation)} className="w-full">Book Now</Button>
							</div>
						</div>
					</div>
				))}

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogDescription>
							<div className="">
										<h3 className="text-xl font-bold mb-2">{selectedAccommodation?.name}</h3>
										<p className="text-muted-foreground mb-4">
											{selectedAccommodation?.description}
										</p>
									</div>
									<div>
										<p className="text-muted-foreground mb-4">
											Price per night: ${selectedAccommodation?.pricePerNight}
										</p>
										<p className="text-muted-foreground mb-4">
											Location: {selectedAccommodation?.location}
										</p>
									</div>
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									className="col-span-3"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input
									id="email"
									className="col-span-3"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="number" className="text-right">
									Number of people
								</Label>
								<Input
									id="number"
									className="col-span-3"
									value={number}
									onChange={(e) => setNumber(e.target.value)}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="startTime" className="text-right">
									Start time
								</Label>
								<Input
									id="startTime"
									className="col-span-3"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="endTime" className="text-right">
									End time
								</Label>
								<Input
									id="endTime"
									className="col-span-3"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit" onClick={() => onConfirm()}>Confirm</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
