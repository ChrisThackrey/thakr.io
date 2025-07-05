interface ResumeData {
  name: string
  email: string
  phone: string
  linkedin: string
  github: string
  sections: {
    title: string
    content: string[]
  }[]
}

const resumeData: ResumeData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  sections: [
    {
      title: "Experience",
      content: ["Software Engineer at Google (2020-Present)", "Frontend Developer at Facebook (2018-2020)"],
    },
    {
      title: "Education",
      content: [
        "Master of Science in Computer Science, Stanford University (2018)",
        "Bachelor of Science in Computer Science, MIT (2016)",
      ],
    },
    {
      title: "Skills",
      content: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
    },
  ],
}

const ResumePage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-cal">{resumeData.name}</h1>
        <p className="text-gray-600">
          {resumeData.email} | {resumeData.phone}
        </p>
        <p className="text-gray-600">
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="mr-2">
            LinkedIn
          </a>
          |
          <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="ml-2">
            GitHub
          </a>
        </p>
      </div>

      {resumeData.sections.map((section, index) => (
        <div key={index} className="mt-8">
          <h3 className="text-xl font-semibold font-cal">{section.title}</h3>
          <ul className="list-disc list-inside">
            {section.content.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ResumePage
