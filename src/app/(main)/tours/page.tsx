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
	'https://wildlifetours.com.au/wp-content/uploads/great-ocean-road-tour-2.webp',
	"https://media.licdn.com/dms/image/D4D12AQHsv_EMoAG8bg/article-cover_image-shrink_720_1280/0/1682017374465?e=2147483647&v=beta&t=H6XsdSythkDLzO5_CeRpGhKc5--Hs95SvkuG446vscY",
	'https://currumbinsanctuary.com.au/application/files/5016/8629/0780/TT_WEB_Side.png',
]

export default function Tours() {
	const [tours, setTours] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedTour, setSelectedTour] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");

	useEffect(() => {
		fetch("http://localhost:8084/api/v1/tourism/tours")
			.then((res) => res.json())
			.then((data) => {
				setTours(data);

				console.log(data);
			});
	}, []);

	const onClickBookTour = (tour: any) => {
		setName("");
		setEmail("");
		setNumber("");
		setSelectedTour(tour);
		setOpen(true);
	}

	const onConfirm = () => {
		const data = {
			tourId: selectedTour?.tourId,
			customerName: name,
			customerEmail: email,
			numberOfPeople: number
		}

		fetch("http://localhost:8084/api/v1/tourism/book", {
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

				{tours.map((tour, id) => (
					<div className="bg-background rounded-lg overflow-hidden shadow-lg" key={tour.tourId}>
						<div>
							<img
								src={IMAGES[id % IMAGES.length]}
								width={600}
								height={400}
								alt="tour"
								className="w-full h-48 object-cover"
								style={{ aspectRatio: "600/400", objectFit: "cover" }}
							/>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-2">{tour.name}</h3>
								<p className="text-muted-foreground mb-4">
									{tour.description}
								</p>
								<Button onClick={() => onClickBookTour(tour)} className="w-full">Book Now</Button>
							</div>
						</div>
					</div>
				))}

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>{selectedTour?.name}</DialogTitle>
							<DialogDescription>
								{selectedTour?.description}
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
