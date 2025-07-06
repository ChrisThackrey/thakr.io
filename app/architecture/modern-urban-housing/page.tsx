import Image from "next/image"
import Link from "next/link"
import { BookingCTA } from "@/components/booking-cta"

export default function ModernUrbanHousingPage() {
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
        <h1 className="text-4xl font-bold mb-4">Modern Urban Housing</h1>
        <p className="text-lg text-gray-600 mb-6">
          A sustainable urban housing development designed for community living and environmental efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src="/images/architecture/project1.png"
            alt="Modern Urban Housing - Main View"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            This modern urban housing development was designed to address the growing need for sustainable,
            community-focused living spaces in dense urban environments. The project incorporates innovative design
            solutions that maximize space efficiency while creating comfortable living environments.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Location</h3>
              <p>Denver, Colorado</p>
            </div>
            <div>
              <h3 className="font-medium">Year</h3>
              <p>2021</p>
            </div>
            <div>
              <h3 className="font-medium">Size</h3>
              <p>12,500 sq ft</p>
            </div>
            <div>
              <h3 className="font-medium">Type</h3>
              <p>Residential</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Design Approach</h2>
        <p className="mb-4">
          The design approach focused on creating a balance between private living spaces and communal areas that foster
          community interaction. The building&apos;s form responds to its urban context while maximizing natural light and
          ventilation.
        </p>
        <p>Sustainable features include:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Rooftop solar panels providing 40% of the building&apos;s energy needs</li>
          <li>Rainwater collection and greywater recycling systems</li>
          <li>High-performance building envelope with triple-glazed windows</li>
          <li>Shared electric vehicle charging stations</li>
          <li>Community garden spaces</li>
        </ul>
      </div>

      <BookingCTA />
    </div>
  )
}
