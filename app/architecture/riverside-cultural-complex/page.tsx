import Image from "next/image"
import Link from "next/link"
import { BookingCTA } from "@/components/booking-cta"

export default function RiversideCulturalComplexPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Link href="/architecture" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Architecture Projects
        </Link>
        <h1 className="text-4xl font-bold mb-4">Riverside Cultural Complex</h1>
        <p className="text-lg text-gray-600 mb-6">
          A multi-purpose cultural center that celebrates local heritage while providing modern amenities for the
          community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src="/images/architecture/project3.png"
            alt="Riverside Cultural Complex - Main View"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            The Riverside Cultural Complex is a public facility designed to serve as a cultural hub for the community.
            It houses a museum, performance spaces, educational facilities, and public gathering areas. The design draws
            inspiration from the natural landscape and local cultural heritage.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Location</h3>
              <p>Portland, Oregon</p>
            </div>
            <div>
              <h3 className="font-medium">Year</h3>
              <p>2020</p>
            </div>
            <div>
              <h3 className="font-medium">Size</h3>
              <p>35,000 sq ft</p>
            </div>
            <div>
              <h3 className="font-medium">Type</h3>
              <p>Cultural</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Design Approach</h2>
        <p className="mb-4">
          The design approach for the Riverside Cultural Complex focused on creating a landmark building that respects
          its natural setting along the river while providing flexible spaces for various cultural activities. The
          building's form is inspired by the flowing water of the adjacent river.
        </p>
        <p>Notable features include:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>A sweeping roof form that collects rainwater for landscape irrigation</li>
          <li>Large glass facades that connect interior spaces with the surrounding landscape</li>
          <li>Acoustically optimized performance spaces</li>
          <li>Interactive exhibition areas with cutting-edge technology</li>
          <li>Outdoor amphitheater and sculpture garden</li>
        </ul>
      </div>

      <BookingCTA />
    </div>
  )
}
