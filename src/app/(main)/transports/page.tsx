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

export default function Transports() {
	const [transports, setTransports] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedTransport, setSelectedTransport] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [startTime, setStartTime] = useState("2023-10-15T10:00:00");
	const [endTime, setEndTime] = useState("2023-10-15T10:00:00");

	useEffect(() => {
		fetch("http://localhost:8084/api/v1/transport/available")
			.then((res) => res.json())
			.then((data) => {
				setTransports(data);

			});
	}, []);

	const onClickBookTour = (transport: any) => {
		setName("");
		setEmail("");
		setNumber("");
		setSelectedTransport(transport);
		setOpen(true);
	}

	const onConfirm = () => {
		const data = {
			transportId: selectedTransport?.transportId,
			customerName: name,
			customerEmail: email,
			numberOfPassengers: number,
			startTime: startTime,
			endTime: endTime,
		};
		
		fetch("http://localhost:8084/api/v1/transport/book", {
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
			<h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Tours</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{/*  */}

				{transports.map((transport) => (
					<div className="bg-background rounded-lg overflow-hidden shadow-lg" key={transport.transportId}>
						<div>
							<img
								src="https://promova.com/content/transportation_vocabulary_09188cbada.png"
								width={600}
								height={400}
								alt="transport"
								className="w-full h-48 object-cover"
								style={{ aspectRatio: "600/400", objectFit: "cover" }}
							/>
							<div className="p-6 flex justify-between">
								<div className="">
									<h3 className="text-xl font-bold mb-2">{transport.type}</h3>
									<p className="text-muted-foreground mb-4">
										{transport.model}
									</p>
								</div>
								<div>
									<p className="text-muted-foreground mb-4">
										Price per hour: ${transport.pricePerHour}
									</p>
									<p className="text-muted-foreground mb-4">
										Location: {transport.location}
									</p>
								</div>
							</div>
							<Button onClick={() => onClickBookTour(transport)} className="w-full">Book Now</Button>
						</div>
					</div>
				))}

				 <Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogDescription>
								<div className="p-6 ">
									<div className="">
										<h3 className="text-xl font-bold mb-2">{selectedTransport?.type}</h3>
										<p className="text-muted-foreground mb-4">
											{selectedTransport?.model}
										</p>
									</div>
									<div>
										<p className="text-muted-foreground mb-4">
											Price per hour: ${selectedTransport?.pricePerHour}
										</p>
										<p className="text-muted-foreground mb-4">
											Location: {selectedTransport?.location}
										</p>
									</div>
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
