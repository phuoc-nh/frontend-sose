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

export default function Tours() {
	const [tours, setTours] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8084/api/v1/tourism/tours")
			.then((res) => res.json())
			.then((data) => {
				setTours(data);

				console.log(data);
			});
	}, []);

	

	return (
		<section className="py-12 px-6 md:px-12">
			<h2 className="text-2xl md:text-3xl font-bold mb-8">Reserved Tours</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{tours.map((tour) => (
					<div className="bg-background rounded-lg overflow-hidden shadow-lg" key={tour.tourId}>
						<div>
							<img
								src="https://media.licdn.com/dms/image/D4D12AQHsv_EMoAG8bg/article-cover_image-shrink_720_1280/0/1682017374465?e=2147483647&v=beta&t=H6XsdSythkDLzO5_CeRpGhKc5--Hs95SvkuG446vscY"
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

				
			</div>
		</section>
	);
}
