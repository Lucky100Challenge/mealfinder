import Image from 'next/image'

const sponsors = [
  '/z.jpg',
  '/sponsors/sponsor2.png',
  '/sponsors/sponsor3.png',
  // Add more sponsor images
]

const SponsorSection = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Our Sponsors</h2>
      <div className="flex space-x-4">
        {sponsors.map((src, index) => (
          <Image key={index} src={src} alt={`Sponsor ${index + 1}`} width={100} height={100} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="https://example.com/support" className="text-blue-500 hover:underline">
          Want your image here? Support the challenge
        </a>
      </div>
    </div>
  )
}

export default SponsorSection