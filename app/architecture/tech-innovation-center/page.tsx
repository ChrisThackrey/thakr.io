import Image from "next/image"
import Link from "next/link"
import { BookingCTA } from "@/components/booking-cta"

export default function TechInnovationCenterPage() {
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
        <h1 className="text-4xl font-bold mb-4">Tech Innovation Center</h1>
        <p className="text-lg text-gray-600 mb-6">
          A cutting-edge facility designed to foster collaboration and innovation in the technology sector.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src="/images/architecture/project2.png"
            alt="Tech Innovation Center - Main View"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            The Tech Innovation Center was designed as a hub for technology startups, established companies, and
            research institutions. The architecture reflects the innovative nature of the work happening inside, with
            flexible spaces that can adapt to changing needs and technologies.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Location</h3>
              <p>Austin, Texas</p>
            </div>
            <div>
              <h3 className="font-medium">Year</h3>
              <p>2022</p>
            </div>
            <div>
              <h3 className="font-medium">Size</h3>
              <p>45,000 sq ft</p>
            </div>
            <div>
              <h3 className="font-medium">Type</h3>
              <p>Commercial</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Design Approach</h2>
        <p className="mb-4">
          The design approach prioritized creating an environment that stimulates creativity and collaboration. The
          building features a central atrium that serves as the heart of the facility, surrounded by various types of
          workspaces ranging from private offices to open collaborative areas.
        </p>
        <p>Key features include:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Smart building systems that optimize energy use and comfort</li>
          <li>Modular interior spaces that can be reconfigured as needed</li>
          <li>State-of-the-art digital infrastructure</li>
          <li>Indoor green spaces and biophilic design elements</li>
          <li>Maker spaces and prototyping labs</li>
        </ul>
      </div>

      <BookingCTA />
    </div>
  )
}
