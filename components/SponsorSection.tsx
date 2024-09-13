import Image from 'next/image'
import zSponsor from '../images/z.jpg'
import jansSponsor from '../images/jans.jpg'

const sponsors = [
  { src: zSponsor, alt: 'Z Sponsor' },
  { src: jansSponsor, alt: 'Jans Sponsor' },
  // Add more sponsor images
]

const SponsorSection = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Challenge Sponsors</h2>
      <div className="flex space-x-4">
        {sponsors.map((sponsor, index) => (
          <Image 
            key={index} 
            src={sponsor.src}
            alt={sponsor.alt}
            width={100} 
            height={100} 
            className="rounded-full"
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="https://buymeacoffee.com/thatsaasdude" className="text-blue-500 hover:underline">
          Want your image here? Support the challenge
        </a>
      </div>
    </div>
  )
}

export default SponsorSection