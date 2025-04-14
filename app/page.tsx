import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Your Health, Our Priority</h1>
          <p className="text-xl mb-8">Comprehensive healthcare solutions at your fingertips</p>
          <Link href="/appointment" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Expert Doctors</h3>
              <p>Access to highly qualified medical professionals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p>Round-the-clock assistance for your healthcare needs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Advanced Technology</h3>
              <p>State-of-the-art medical equipment and facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied patients who trust us with their healthcare needs</p>
          <Link href="/register" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
} 